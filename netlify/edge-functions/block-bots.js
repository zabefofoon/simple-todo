let requestCounts = {} // 요청 횟수 기록
let abnormalBehaviorCounts = {} // 비정상 행동 횟수 기록
const blockIPList = new Set(['3.81.228.87', '193.70.113.250']) // 차단된 IP 목록

export default async (request) => {
  const userAgent = request.headers.get('user-agent')
  const clientIP = request.headers.get('x-forwarded-for')
  const requestLimit = 20 // 5초 동안 최대 허용 요청 횟수
  const abnormalBehaviorLimit = 3 // 비정상 행동 횟수 기준
  const timeWindow = 5000 // 5초 기준
  const abnormalBehaviorWindow = 5 * 60 * 1000 // 5분 기준

  console.log(`${clientIP}, ${request.headers.get('referer')}, ${userAgent}`)

  const currentTime = Date.now()

  // 만료된 항목 정리
  for (const ip in requestCounts) {
    if (currentTime - requestCounts[ip].timestamp > timeWindow) {
      delete requestCounts[ip]
    }
  }

  for (const ip in abnormalBehaviorCounts) {
    if (
      currentTime - abnormalBehaviorCounts[ip].timestamp >
      abnormalBehaviorWindow
    ) {
      delete abnormalBehaviorCounts[ip]
    }
  }

  // 요청 횟수 체크
  if (!requestCounts[clientIP]) {
    requestCounts[clientIP] = { count: 1, timestamp: currentTime }
  } else {
    const timeElapsed = currentTime - requestCounts[clientIP].timestamp

    if (timeElapsed < timeWindow) {
      requestCounts[clientIP].count++

      // 1차 조건: 5초 동안 20번 이상 요청 시 비정상 행동으로 기록
      if (requestCounts[clientIP].count > requestLimit) {
        if (!abnormalBehaviorCounts[clientIP]) {
          abnormalBehaviorCounts[clientIP] = {
            count: 1,
            timestamp: currentTime,
          }
        } else {
          abnormalBehaviorCounts[clientIP].count++
          abnormalBehaviorCounts[clientIP].timestamp = currentTime
        }

        // 2차 조건: 5분 동안 비정상 행동 3회 이상 시 IP 차단
        if (abnormalBehaviorCounts[clientIP].count >= abnormalBehaviorLimit) {
          blockIPList.add(clientIP)
        }

        // 비정상 행동으로 기록된 후에는 초기화
        requestCounts[clientIP] = { count: 1, timestamp: currentTime }
      }
    } else {
      requestCounts[clientIP] = { count: 1, timestamp: currentTime }
    }
  }

  // 차단 목록에 있는 IP 확인
  if (blockIPList.has(clientIP)) {
    return new Response('Access denied', { status: 403 })
  }
}
