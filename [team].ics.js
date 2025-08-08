// api/team/[team].ics.js
import { buildTeamICS } from '../../../lib/buildCalendar.js'

// Supports paths like /api/team/9565.ics or /api/team/https:%2F%2Fwww.hltv.org%2Fteam%2F9565%2Fvitality.ics
export default async function handler(req, res) {
  try {
    // team param includes ".ics" – strip it
    let { team } = req.query
    if (Array.isArray(team)) team = team[0]
    team = decodeURIComponent(team || '')

    // Accept raw number or an HLTV URL; extract the first number
    const match = team.match(/(\d{3,7})/)
    if (!match) {
      res.status(400).send('Bad request: provide a numeric team id or HLTV team URL')
      return
    }
    const teamId = Number(match[1])

    const ics = await buildTeamICS(teamId)
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=900, stale-while-revalidate=1800')
    res.status(200).send(ics)
  } catch (err) {
    console.error(err)
    res.status(500).send('Calendar error')
  }
}
