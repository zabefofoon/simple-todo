export default async (request) => {
  const blockedIPs = ['123.456.789.101', '234.567.890.123']
  const clientIP = request.headers.get('x-forwarded-for')
  console.log(`Blocked IP: ${clientIP}, ${request.headers.get('referer')}`)

  const blackList = [
    '2001:4430:c194:f904:a86a:4c01:8fd8:7fc5',
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
  ]

  if (blackList.includes(clientIP)) {
    return new Response('Access denied', { status: 403 })
  }
}
