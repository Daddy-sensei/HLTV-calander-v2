// lib/buildCalendar.js
import { HLTV } from 'hltv'
import ical from 'ical-generator'

function parseDurationMs(format) {
  const f = (format || '').toLowerCase()
  if (f.includes('bo1')) return 1 * 60 * 60 * 1000
  if (f.includes('bo3')) return 3 * 60 * 60 * 1000
  if (f.includes('bo5') || f.includes('b05')) return 5 * 60 * 60 * 1000
  return 2 * 60 * 60 * 1000 // sensible default
}

export async function buildTeamICS(teamId) {
  const id = Number(teamId)
  if (!Number.isFinite(id)) throw new Error('Invalid team id')

  const matches = await HLTV.getMatches()

  const upcoming = matches.filter(m => {
    const t1 = m.team1?.id
    const t2 = m.team2?.id
    return m.date && (t1 === id || t2 === id)
  })

  const cal = ical({
    name: 'HLTV Team Matches',
    timezone: 'Europe/Copenhagen'
  })

  for (const m of upcoming) {
    const start = new Date(m.date)
    const dur = parseDurationMs(m.format)
    const end = new Date(start.getTime() + dur)

    const isTeam1 = m.team1?.id === id
    const selfName = isTeam1 ? (m.team1?.name ?? 'TBA') : (m.team2?.name ?? 'TBA')
    const oppName  = isTeam1 ? (m.team2?.name ?? 'TBA') : (m.team1?.name ?? 'TBA')

    const evName = m.event?.name ?? 'HLTV Event'
    const url = m.id ? `https://www.hltv.org/matches/${m.id}` : 'https://www.hltv.org/matches'

    cal.createEvent({
      start,
      end,
      summary: `${selfName} / ${oppName}`,
      location: evName,
      url,
      description: [
        `${selfName} vs ${oppName}`,
        `Event: ${evName}`,
        m.format ? `Format: ${m.format}` : null,
        url
      ].filter(Boolean).join('\n')
    })
  }

  return cal.toString()
}
