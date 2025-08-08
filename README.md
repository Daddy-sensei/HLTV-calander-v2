# HLTV Team → iCal (Vercel)

Generate **per-team** iCal feeds that auto-update with upcoming HLTV matches.

- URL format: `/api/team/<TEAM_ID>.ics`
- Title: **Team / Opponent**
- Duration: **Bo1 = 1h**, **Bo3 = 3h**, **Bo5 = 5h** (fallback 2h if unknown)
- Simple homepage at `/` to build links from an HLTV URL or numeric team ID.

## Deploy (GitHub import)
1. Create a GitHub repo and upload these files.
2. In Vercel → **Add New → Project → Import Git Repository** → Deploy.
3. Visit the root URL to generate your `.ics` links, or go straight to:
   `https://<your-project>.vercel.app/api/team/9565.ics`

## Subscribe in your calendar
- Google Calendar → Settings → Add calendar → From URL → paste the `.ics` link.
- Apple Calendar → File → New Calendar Subscription → paste the link.
- Outlook → Add calendar → Subscribe from web → paste the link.


### Popular teams on the homepage
A short list of common teams is preloaded. Click one to generate its link instantly.
