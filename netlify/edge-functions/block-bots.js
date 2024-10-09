export default async (request) => {
  const blockedIPs = ['123.456.789.101', '234.567.890.123']
  const clientIP = request.headers.get('x-forwarded-for')
  const referer = request.headers.get('referer')
  console.log(`Blocked IP: ${clientIP}, ${request.headers.get('referer')}`)

  const blackIPList = [
    '18.208.159.85',
    '54.90.216.175',
    '64.233.172.132',
    '64.233.172.133',
    '64.233.172.134',
    '64.233.172.135',
    '64.233.172.136',
    '64.233.172.137',
    '64.233.172.138',
    '64.233.172.139',
    '64.233.172.140',
    '64.233.172.141',
    '54.86.217.87',
  ]

  const blackRefererList = ['--memoku.netlify.app/']

  if (blackIPList.includes(clientIP) || blackRefererList.includes(referer)) {
    return new Response('Access denied', { status: 403 })
  }
}
