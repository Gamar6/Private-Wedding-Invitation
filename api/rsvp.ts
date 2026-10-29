import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requirePost, supabaseRequest } from './_lib/http.js'

type GuestRow = { id: string; name: string }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requirePost(req, res)) return

  const passcode =
    typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : ''
  const attendance = req.body?.attendance
  const message =
    typeof req.body?.message === 'string' ? req.body.message.trim() : ''

  if (!passcode || passcode.length > 80) {
    return res.status(400).json({ success: false, message: 'Invalid invitation code.' })
  }
  if (attendance !== 'attending' && attendance !== 'not_attending') {
    return res.status(400).json({ success: false, message: 'Choose an attendance status.' })
  }
  if (message.length > 1000) {
    return res.status(400).json({ success: false, message: 'Message must be 1,000 characters or fewer.' })
  }

  try {
    const guests = await supabaseRequest<GuestRow[]>(
      `guests?select=id,name&passcode=eq.${encodeURIComponent(passcode.toUpperCase())}&active=eq.true&limit=1`,
    )
    const guest = guests[0]
    if (!guest) {
      return res.status(404).json({ success: false, message: 'Invitation code was not found.' })
    }

    // Upsert on guest_id guarantees one RSVP record per passcode/invitation.
    await supabaseRequest<unknown>('rsvps?on_conflict=guest_id', {
      method: 'POST',
      headers: {
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        guest_id: guest.id,
        attendance,
        message: message || null,
        updated_at: new Date().toISOString(),
      }),
    })

    return res.status(200).json({
      success: true,
      message: 'Your RSVP has been saved. Thank you!',
    })
  } catch (error) {
    console.error('[rsvp] Error:', error)
    return res.status(500).json({ success: false, message: 'Unable to save your RSVP right now.' })
  }
}
