import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requirePost, supabaseRequest } from './_lib/http.js'

type GuestRow = {
  id: string
  name: string
  type: 'person' | 'couple' | 'family'
  greeting: string | null
  dress_code_enabled: boolean
  dress_code_label: string | null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requirePost(req, res)) return

  const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : ''

  if (!passcode || passcode.length > 80) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter a valid invitation code.' })
  }

  try {
    const code = encodeURIComponent(passcode.toUpperCase())
    const guests = await supabaseRequest<GuestRow[]>(
      `guests?select=id,name,type,greeting,dress_code_enabled,dress_code_label&passcode=eq.${code}&active=eq.true&limit=1`,
    )
    const guest = guests[0]

    if (!guest) {
      return res.status(404).json({ success: false, message: 'Invitation code was not found.' })
    }

    // Never return the passcode or internal database fields.
    return res.status(200).json({
      success: true,
      guest: {
        id: guest.id,
        name: guest.name,
        type: guest.type,
        greeting: guest.greeting,
        dressCode: guest.dress_code_enabled
          ? { enabled: true, label: guest.dress_code_label || 'Berkain' }
          : { enabled: false, label: null },
      },
    })
  } catch (error) {
    console.error('[verify-passcode] Error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to verify invitation right now.',
    })
  }
}
