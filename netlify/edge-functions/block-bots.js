export default async (request) => {
  const clientIP = request.headers.get('x-forwarded-for')
  const referer = request.headers.get('referer')
  const userAgent = request.headers.get('user-agent')
  console.log(`${clientIP}, ${request.headers.get('referer')}, ${userAgent}`)

  const blockIPList = ['3.81.228.87', '193.70.113.250']

  const blockRefererList = ['--memoku.netlify.app/']

  const blackAgentList = ['Amazonbot']

  if (
    blockIPList.includes(clientIP) ||
    blockRefererList.includes(referer) ||
    userAgent.includes(blackAgentList)
  ) {
    return new Response('Access denied', { status: 403 })
  }
}
