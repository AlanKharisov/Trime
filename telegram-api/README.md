# Telegram order delivery

Deploy this directory as a separate Vercel project (framework: Other). Set
`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as server-side environment variables.
Never put the bot token in frontend variables or Git.

The destination user must start the bot; for a group, add the bot to the group.
Use the destination chat ID, not the bot's ID.

Configure a Vercel Firewall rate limit for POST `/api/order` before public launch.
Origin restrictions and a honeypot alone cannot prevent direct automated requests.
Production requests must be accessible without deployment authentication.

Set the GitHub Actions variable `ORDER_ENDPOINT` to
`https://YOUR-API-DOMAIN/api/order`, then run the Pages deployment workflow.
The form is hidden until this endpoint is configured. Success is shown only
after Telegram confirms delivery. This handler does not store submissions.
