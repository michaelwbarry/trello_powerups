# Title Length Checker

Adds a badge to any Trello card whose title exceeds a length threshold.

- **Yellow badge** (`X chars`) — title is longer than the yellow threshold (default 155)
- **Red badge** (`⚠ X chars`) — title is longer than the red threshold (default 200)

## Configuring thresholds

Open the board → **Power-Ups** menu → click the gear icon next to **Title Length Checker** → **Settings**. The popup lets you set the yellow and red thresholds and saves them per-board (visible to all members). Use **Reset to defaults** to fall back to 155 / 200.

The `show-settings` capability must be enabled in the Trello admin (Capabilities tab) in addition to being declared in `manifest.json` — the admin UI is the source of truth.

## Hosted URL

Once the parent repo is on GitHub Pages, this Power-Up will be at:

```
https://<username>.github.io/trello_powerups/title-length/
```

That's the iframe connector URL to register at https://trello.com/power-ups/admin.

## Files

- `index.html` — iframe entry point loaded by Trello
- `client.js` — registers the badge and settings capabilities
- `settings.html` / `settings.js` — the gear-icon settings popup
- `manifest.json` — capability declarations (informational; the Trello admin is authoritative)
