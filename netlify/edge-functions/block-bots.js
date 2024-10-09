export default async (request) => {
  const blockedIPs = ['123.456.789.101', '234.567.890.123']
  const clientIP = request.headers.get('x-forwarded-for')
  const referer = request.headers.get('referer')
  const userAgent = request.headers.get('user-agent')
  console.log(
    `Blocked IP: ${clientIP}, ${request.headers.get('referer')}, ${userAgent}`
  )

  const blackIPList = ['3.81.228.87']

  const blackRefererList = ['--memoku.netlify.app/']

  const blackAgentList = ['Amazonbot']

  if (
    blackIPList.includes(clientIP) ||
    blackRefererList.includes(referer) ||
    userAgent.includes(blackAgentList)
  ) {
    return new Response('Access denied', { status: 403 })
  }
}
