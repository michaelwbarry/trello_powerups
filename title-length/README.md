# Title Length Checker

Adds a badge to any Trello card whose title exceeds a length threshold.

- **Warn badge** (`X chars`) — title is longer than the warn threshold (default 155, yellow)
- **Alert badge** (`⚠ X chars`) — title is longer than the alert threshold (default 200, red)

Both thresholds *and* both badge colors are configurable per board.

## Configuring

Open the board → **Power-Ups** menu → click the gear icon next to **Title Length Checker** → **Settings**. The popup lets you set:

- the warn threshold and its badge color
- the alert threshold and its badge color

Settings are saved per-board (visible to all members). Use **Reset to defaults** to fall back to 155 / yellow and 200 / red.

Available colors match the Trello badge palette: blue, green, orange, red, yellow, purple, pink, sky, lime, light-gray, plus *None* (no color background). See the [Trello card-badges docs](https://developer.atlassian.com/cloud/trello/power-ups/capabilities/card-badges/) for the source of truth.

The `show-settings` capability must be enabled in the Trello admin (Capabilities tab) in addition to being declared in `manifest.json` — the admin UI is the source of truth.

## Stored data shape

Settings are stored under the `thresholds` key on the board's shared scope:

```
{
  warnThreshold:  Number,
  warnColor:      String | null,   // null = no color
  alertThreshold: Number,
  alertColor:     String | null
}
```

Boards that were configured before colors were customizable have the legacy shape `{ yellow: Number, red: Number }`. Both `client.js` and `settings.js` read that legacy shape transparently — the next save from the settings popup overwrites it with the new shape.

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
