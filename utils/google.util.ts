import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { H3Event } from 'h3'
import { FetchError } from 'ofetch'

export default {
  createOauthClient(event: H3Event) {
    const cookies = parseCookies(event)
    const refreshToken = cookies['x-google-refresh-token']
    const accessToken = cookies['x-google-access-token']

    const oauthClient = new OAuth2Client({
      clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
    })

    oauthClient.credentials.access_token = accessToken
    oauthClient.credentials.refresh_token = refreshToken
    return oauthClient
  },

  // 특정 이름의 폴더가 있는지 확인하는 함수
  async findFolder(auth: OAuth2Client, folderName: string) {
    const drive = google.drive({ version: 'v3', auth })

    try {
      const res = await drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
      })

      const files = res.data.files
      if (files && files.length > 0) {
        // console.log(`Folder found: ${files[0].name} (ID: ${files[0].id})`)
        return files[0].id ?? ''
      } else {
        // console.log('Folder not found.')
        return
      }
    } catch (error) {
      console.error('Error finding folder:', error)
      throw error
    }
  },

  // 폴더를 생성하는 함수
  async createFolder(auth: OAuth2Client, folderName: string) {
    const drive = google.drive({ version: 'v3', auth })

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }

    try {
      const folder = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      })
      // console.log(`Folder created: ${folderName} (ID: ${folder.data.id})`)
      return folder.data.id // 생성된 폴더의 ID 반환
    } catch (error) {
      console.error('Error creating folder:', error)
      throw error
    }
  },

  // 파일 이름으로 파일 ID를 검색하는 함수
  async getFileIdByName(auth: OAuth2Client, fileName: string) {
    const drive = google.drive({ version: 'v3', auth })

    try {
      const res = await drive.files.list({
        q: `name='${fileName}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
      })

      const files = res.data.files
      if (files && files.length > 0) {
        // console.log(`Found file: ${files[0].name} (ID: ${files[0].id})`)
        return files[0].id // 파일 ID 반환
      } else {
        // console.log('No file found with that name.')
        return
      }
    } catch (error) {
      console.error('Error retrieving file ID:', error)
      throw error
    }
  },

  async deleteFiles(auth: OAuth2Client, fileIds: string[]) {
    const drive = google.drive({ version: 'v3', auth })

    for (const fileId of fileIds) {
      try {
        drive.files.delete({
          fileId: fileId, // 삭제할 파일의 ID
        })
        // console.log(`File with ID ${fileId} has been deleted.`)
      } catch (error) {
        console.error(`Error deleting file with ID ${fileId}:`, error)
      }
    }
  },

  async listFilesInFolder(auth: OAuth2Client, folderId: string) {
    const drive = google.drive({ version: 'v3', auth })

    try {
      // 폴더 안의 파일들을 검색
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`, // 폴더 ID로 검색
        fields: 'files(id, name)', // ID와 이름만 반환
        spaces: 'drive',
      })

      const files = res.data.files
      if (files && files.length > 0) {
        return files.map((file) => file.id) // 파일 ID 목록 반환
      } else {
        console.log('No files found in the folder.')
        return []
      }
    } catch (error) {
      console.error('Error retrieving files from folder:', error)
      throw error
    }
  },

  throwSheetError(e: FetchError) {
    console.error(e)
    if (e.status === 404) {
      return {
        status: e.status,
        message: 'no spreadsheet',
      }
    } else if (e.status === 401) {
      return {
        status: e.status,
        message: 'neet login',
      }
    } else {
      return {
        status: e.status,
        message: 'server error',
      }
    }
  },
}
