import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requirePost, supabaseRequest } from './_lib/http.js'

type RsvpRow = {
  id: string
  attendance: string
  message: string | null
  created_at: string
  guests: {
    name: string
    type: string
  } | null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Pastikan method request adalah POST
  if (!requirePost(req, res)) return

  const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : ''

  // 2. Verifikasi Passcode Admin
  if (passcode !== 'harapan-fy') {
    return res.status(401).json({ success: false, message: 'Passcode admin salah!' })
  }

  try {
    // 3. Query PostgREST Supabase dengan Join ke tabel guests
    const rsvps = await supabaseRequest<RsvpRow[]>(
      'rsvps?select=id,attendance,message,created_at,guests(name,type)&order=created_at.desc',
    )

    return res.status(200).json({
      success: true,
      rsvps,
    })
  } catch (error) {
    console.error('Error fetching admin RSVPs:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch RSVP list right now.',
    })
  }
}
