import type { VercelRequest, VercelResponse } from '@vercel/node'

export function setCors(req: VercelRequest, res: VercelResponse) {
  const allowedOrigin = process.env.INVITATION_API_ORIGIN
  const origin = req.headers.origin

  if (allowedOrigin && origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return true
  }

  return false
}

export function requirePost(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return false
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    res.status(405).json({ success: false, message: 'Method not allowed.' })
    return false
  }
  return true
}

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Server environment is not configured.')
  return { url: url.replace(/\/$/, ''), key }
}

export async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = getSupabaseConfig()
  const requestUrl = `${url}/rest/v1/${path}`

  console.log('[supabaseRequest] Target host:', new URL(requestUrl).host)
  console.log('[supabaseRequest] Target path:', new URL(requestUrl).pathname)

  const response = await fetch(requestUrl, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })

  const responseText = await response.text()

  if (!response.ok) {
    console.error('[supabaseRequest] Database error:', response.status, responseText.slice(0, 500))
    throw new Error(`Database request failed (${response.status}).`)
  }

  if (response.status === 204 || !responseText.trim()) {
    return undefined as T
  }

  const contentType = response.headers.get('content-type') || ''

  if (!contentType.toLowerCase().includes('application/json')) {
    console.error('[supabaseRequest] Unexpected content type:', contentType)
    console.error('[supabaseRequest] Response preview:', responseText.slice(0, 200))
    throw new Error('Database returned an unexpected response format.')
  }

  try {
    return JSON.parse(responseText) as T
  } catch {
    console.error('[supabaseRequest] Invalid JSON response.')
    throw new Error('Database returned invalid JSON.')
  }
}
