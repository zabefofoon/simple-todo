import { GoogleSpreadsheet } from 'google-spreadsheet'
import { google } from 'googleapis'
import { createRouter, defineEventHandler, useBase } from 'h3'
import { FetchError } from 'ofetch'
import stream from 'stream'
import { Tag } from '~/models/Tag'
import { Todo } from '~/models/Todo'
import etcUtil, { generateUniqueId } from '~/utils/etc'
import googleUtil from '~/utils/google.util'

const router = createRouter()

const domain = import.meta.dev
  ? 'http://localhost:3000'
  : 'https://memoku.netlify.app'

router.get(
  '/auth/google',
  defineEventHandler(async () => {
    const oauth2Client = new google.auth.OAuth2(
      import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
      `${domain}/api/auth/google/callback`
    )

    return oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope, you can pass it as a string
      scope: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    })
  })
)

router.get(
  '/auth/google/callback',
  defineEventHandler(async (event) => {
    const query = getQuery(event)
    const oauth2Client = new google.auth.OAuth2(
      import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
      `${domain}/api/auth/google/callback`
    )

    const { tokens } = await oauth2Client.getToken(query.code?.toString() ?? '')

    oauth2Client.setCredentials(tokens)

    if (tokens.refresh_token) {
      setCookie(event, 'x-google-refresh-token', tokens.refresh_token, {
        expires: etcUtil.getCookieExpiresNYears(100),
      })
    }
    if (tokens.access_token) {
      setCookie(event, 'x-google-access-token', tokens.access_token, {
        expires: etcUtil.getCookieExpiresNDays(3),
      })
    }

    const url = tokens.refresh_token
      ? `/google-auth?accessToken=${tokens.access_token}&refreshToken=${
          tokens.refresh_token || ''
        }`
      : `/google-auth?accessToken=${tokens.access_token}`

    return sendRedirect(event, url)
  })
)

router.post(
  '/spreadsheet/create',
  defineEventHandler(async (event) => {
    const oauthClient = googleUtil.createOauthClient(event)

    const spreadsheetId = await googleUtil.getFileIdByName(
      googleUtil.createOauthClient(event),
      'MEMOKU_DATA'
    )

    if (spreadsheetId) {
      return {
        status: 200,
        message: '',
        result: spreadsheetId,
      }
    }

    try {
      const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(
        oauthClient,
        { title: 'MEMOKU_DATA', locale: 'en' }
      )

      await newDoc.addSheet({
        title: 'todos',
        headerValues: [
          'id',
          'upto',
          'date',
          'description',
          'tagId',
          'time',
          'created',
          'done',
          'modified',
          'images',
          'linked',
        ],
      })

      const sheet = newDoc.sheetsByTitle['todos']

      await sheet.addRow({
        id: generateUniqueId(),
        upto: '',
        date: '',
        description: 'Welcome Google Linked!',
        tagId: '',
        time: '',
        created: new Date().getTime(),
        done: '',
        modified: new Date().getTime(),
        images: '',
        linked: 'google',
      })

      return {
        status: 200,
        message: '',
        result: newDoc.spreadsheetId,
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Server Error',
      }
    }
  })
)

router.get(
  '/spreadsheet/rows',
  defineEventHandler(async (event) => {
    const { sheetId } = getQuery(event)
    // const isImageCleaned = getCookie(event, 'x-image-cleaned')

    const oauthClient = googleUtil.createOauthClient(event)

    try {
      const doc = new GoogleSpreadsheet(sheetId?.toString() ?? '', oauthClient)
      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['todos']

      const rows = await sheet.getRows()

      // if (!isImageCleaned) {
      //   const folderId = await googleUtil.findFolder(
      //     oauthClient,
      //     'MEMOKU_IMAGES'
      //   )

      //   if (folderId) {
      //     const imageIds = rows
      //       .map((row) => row.get('images'))
      //       .flatMap((item) => item.match(/(?<=id=)[^&]+/gi))

      //     const list = await googleUtil.listFilesInFolder(oauthClient, folderId)
      //     const noUsedImages = list.filter(
      //       (item): item is string => !imageIds.includes(item)
      //     )

      //     googleUtil.deleteFiles(oauthClient, noUsedImages)
      //   }

      //   setCookie(event, 'x-image-cleaned', 'true', {
      //     maxAge: 60 * 60 * 24,
      //   })
      // }

      return {
        status: 200,
        message: '',
        result: rows.map((row) => row.toObject()),
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.post(
  '/spreadsheet/rows',
  defineEventHandler(async (event) => {
    const { todo, sheetId } = await readBody(event)

    const oauthClient = googleUtil.createOauthClient(event)

    try {
      const doc = new GoogleSpreadsheet(sheetId, oauthClient)
      const result = Object.entries(todo).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          if (key !== 'images') acc[key] = `${value}`
          return acc
        },
        {}
      )

      const images = []
      if (todo.images.length) {
        const folderId =
          (await googleUtil.findFolder(oauthClient, 'MEMOKU_IMAGES')) ||
          (await googleUtil.createFolder(oauthClient, 'MEMOKU_IMAGES'))

        if (folderId) {
          const drive = google.drive({
            version: 'v3',
            auth: oauthClient,
          })

          for (const image of todo.images) {
            const res = await drive.files.create({
              requestBody: {
                name: `${generateUniqueId()}.webp`,
                mimeType: 'image/webp',
                parents: [folderId],
              },
              media: {
                mimeType: 'image/webp',
                body: new stream.PassThrough().end(
                  Buffer.from(image.split(',')[1], 'base64')
                ),
              },
            })

            // 파일을 공개적으로 공유
            await drive.permissions.create({
              fileId: res.data.id ?? '',
              requestBody: {
                role: 'reader',
                type: 'anyone',
              },
            })

            // 공유 가능한 URL 반환
            const fileUrl = `https://drive.google.com/thumbnail?id=${res.data.id}&sz=w1280`
            images.push(fileUrl)
          }
        }
      }

      result.images = images.join(',')

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['todos']
      await sheet.addRow(result)

      return {
        status: 200,
        message: '',
        result: todo,
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.put(
  '/spreadsheet/row',
  defineEventHandler(async (event) => {
    const { todo, sheetId, index } = await readBody<{
      todo: Todo
      sheetId: string
      index: number
    }>(event)

    const oauthClient = googleUtil.createOauthClient(event)

    try {
      const doc = new GoogleSpreadsheet(sheetId, oauthClient)

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['todos']

      const rows = await sheet.getRows({
        offset: index,
        limit: 1,
      })

      Object.entries(todo).forEach(([key, value]) => {
        if (key !== 'images') rows[0].set(key, `${value}`)
      })

      const todoImages = todo.images ?? []
      const images: string[] = todoImages.filter((image) =>
        image.match('drive.google.com')
      )
      const notDriveImages: string[] = todoImages.filter(
        (image) => !image.match('drive.google.com')
      )
      if (notDriveImages.length) {
        const folderId =
          (await googleUtil.findFolder(oauthClient, 'MEMOKU_IMAGES')) ||
          (await googleUtil.createFolder(oauthClient, 'MEMOKU_IMAGES'))

        if (folderId) {
          const drive = google.drive({
            version: 'v3',
            auth: oauthClient,
          })

          for (const image of notDriveImages) {
            const res = await drive.files.create({
              requestBody: {
                name: `${generateUniqueId()}.webp`,
                mimeType: 'image/webp',
                parents: [folderId],
              },
              media: {
                mimeType: 'image/webp',
                body: new stream.PassThrough().end(
                  Buffer.from(image.split(',')[1], 'base64')
                ),
              },
            })

            // 파일을 공개적으로 공유
            await drive.permissions.create({
              fileId: res.data.id ?? '',
              requestBody: {
                role: 'reader',
                type: 'anyone',
              },
            })

            // 공유 가능한 URL 반환
            const fileUrl = `https://drive.google.com/thumbnail?id=${res.data.id}&sz=w1280`
            images.push(fileUrl)
          }
        }
      }

      rows[0].set('images', images.join(','))

      if (index === -1) {
        todo.images = images.join(',')
        await sheet.addRow(todo)

        return {
          status: 200,
          message: 'Uploaded',
          result: [],
        }
      }

      await rows[0].save()

      return {
        status: 200,
        message: '',
        result: rows.map((row) => row.toObject()),
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.put(
  '/spreadsheet/row/done',
  defineEventHandler(async (event) => {
    const { sheetId, updates } = await readBody(event)

    const oauthClient = googleUtil.createOauthClient(event)

    try {
      const doc = new GoogleSpreadsheet(sheetId, oauthClient)

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['todos']

      for (const update of updates) {
        const { index, done } = update
        const rows = await sheet.getRows({
          offset: index,
          limit: 1,
        })

        if (rows[0].get('id') === 'id')
          return {
            status: 404,
            message: 'Not Found',
            result: [],
          }

        rows[0].set('done', done)
        await rows[0].save()
      }

      return {
        status: 200,
        message: '',
        result: '',
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.delete(
  '/spreadsheet/row',
  defineEventHandler(async (event) => {
    const { sheetId, indexes } = await readBody(event)

    const oauthClient = googleUtil.createOauthClient(event)

    try {
      const doc = new GoogleSpreadsheet(sheetId, oauthClient)

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['todos']

      for (const index of indexes) {
        const rows = await sheet.getRows({
          offset: index,
          limit: 1,
        })

        if (rows[0].get('id') === 'id')
          return {
            status: 404,
            message: 'Not Found',
            result: [],
          }

        await rows[0].delete()
      }

      return {
        status: 200,
        message: '',
        result: '',
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.post(
  '/spreadsheet/tags',
  defineEventHandler(async (event) => {
    const { tags, sheetId } = await readBody<{ tags: Tag[]; sheetId: string }>(
      event
    )

    const oauthClient = googleUtil.createOauthClient(event)
    try {
      const doc = new GoogleSpreadsheet(sheetId, oauthClient)

      await doc.loadInfo()
      const sheet = doc.sheetsByTitle['tags']
      if (sheet) {
        const rows = await sheet.getRows()
        const rowIds = rows.map((row) => row.toObject().id)
        const filteredTags = tags.filter((tag) => !rowIds.includes(tag.id))
        await sheet.addRows(filteredTags)

        return {
          status: 200,
          message: '',
          result: [...filteredTags, ...rows.map((row) => row.toObject())],
        }
      } else {
        const newSheet = await doc.addSheet({
          title: 'tags',
          headerValues: ['id', 'color', 'label'],
        })
        await newSheet.addRows(tags)
        return {
          status: 200,
          message: '',
          result: tags,
        }
      }
    } catch (e) {
      return googleUtil.throwSheetError(e as FetchError)
    }
  })
)

router.post(
  '/alarm',
  defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    await $fetch(`${process.env.VITE_ALARM_SERVER}`, {
      method: 'post',
      body,
    })
    return 'registed'
  })
)

router.delete(
  '/alarm',
  defineEventHandler(async (event) => {
    const { deviceId, todoId } = getQuery(event)
    await $fetch(`${process.env.VITE_ALARM_SERVER}`, {
      method: 'delete',
      params: { deviceId, todoId },
    })
    return 'unregisted'
  })
)

export default useBase('/api', router.handler)
