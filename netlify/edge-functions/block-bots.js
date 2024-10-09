export default async (request) => {
  const blockedIPs = ['123.456.789.101', '234.567.890.123']
  const clientIP = request.headers.get('x-forwarded-for')
  console.log(`Blocked IP: ${clientIP}, ${request.headers.get('referer')}`)
}
