# trello-powerups

A personal library of small Trello Power-Ups, hosted as a single GitHub
Pages site. Each Power-Up lives in its own subdirectory and gets its own
URL for registration in Trello.

## Structure

```
trello-powerups/
├── README.md                ← this file
├── shared/
│   └── trello-helpers.js   ← reusable utilities across Power-Ups
└── title-length/            ← one subdirectory per Power-Up
    ├── index.html
    ├── client.js
    ├── manifest.json
    └── README.md
```

To add a new Power-Up: create a new subdirectory with the four files above,
adjust capabilities and code, register at https://trello.com/power-ups/admin
with the URL `https://<username>.github.io/trello_powerups/<powerup-name>/`.

## Power-Ups in this library

| Name                | Path             | What it does                                  |
|---------------------|------------------|------------------------------------------------|
| Title Length Checker| `title-length/`  | Badges cards whose titles exceed thresholds   |

## Hosting

1. Push this repo to GitHub (public).
2. Settings → Pages → source: `main` branch, `/` (root). Save.
3. Wait ~1 minute. Each Power-Up is then reachable at
   `https://<username>.github.io/trello_powerups/<subdir>/`.

## Registering a Power-Up

1. Visit https://trello.com/power-ups/admin
2. New → pick workspace → fill in the iframe connector URL (the subdir URL).
3. Trello pulls the manifest and lists the capabilities.
4. Save, then enable on a board via the Power-Ups menu (Custom tab).

## Local development

The files are static — no build step. Edit and push; GitHub Pages rebuilds
in about a minute. Reload the Trello board to see changes.

For local testing without GitHub, you can run a static file server in
this directory and use a tunnel (ngrok or cloudflared) to expose it:

```bash
python3 -m http.server 8000
# in another terminal:
cloudflared tunnel --url http://localhost:8000
```

Then register the tunneled URL in Trello.
# trello_powerups
