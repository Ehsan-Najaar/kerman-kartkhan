// app/api/ip/route.js

export async function GET(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded || 'Unknown IP'

  return Response.json({ ip })
}
