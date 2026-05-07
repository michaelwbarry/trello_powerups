# Cowork Continuation Prompt

Paste the prompt below into a fresh Cowork session, after granting it
access to `~/src/trello-powerups` (or wherever you've placed this folder).

---

## PROMPT START

I'm continuing work on a personal Trello Power-Up library. The folder is at
`~/src/trello-powerups` (please request access to it). Here's the full context:

### What this is

A monorepo of small Trello Power-Ups, hosted as a single GitHub Pages site.
Each Power-Up is a subdirectory under the repo root and gets its own URL.
Shared utilities live in `shared/`. No build step — pure static HTML/JS.

### Current state

One Power-Up is built: `title-length/`. It adds a colored badge to any card
whose title exceeds 90 chars (yellow) or 130 chars (red). The badge appears
on both the front and back of cards. It uses `shared/trello-helpers.js` to
get the card name. The motivation: my team writes bug-report card titles
like `[5/6/26][Streams][Abbreviation] When creating a stream, the stream
abbreviation looks required like stream name, but you can just bypass...`
which are far too long. Trello's Butler automation can't check title length
(only `starts with` / `contains` matching), and there's no Power-Up in the
marketplace that does this — hence rolling my own.

### Why a Power-Up rather than an external script

The Power-Up runs entirely client-side, no API token, no server, no auth.
Tradeoff: it can only render badges, not apply real Trello labels. That
means I can't filter the board view by "show me only the too-long cards."
If that becomes important later, an external script polling the Trello
REST API is the fallback plan.

### Conventions for this repo

- One subdirectory per Power-Up, each containing `index.html`, `client.js`,
  `manifest.json`, and a `README.md`.
- Shared code in `shared/`, loaded via `<script src="../shared/...">`.
- The Trello SDK is loaded from `https://p.trellocdn.com/power-up.min.js`
  (always-latest; pin a version if shipping to real users).
- Each Power-Up's iframe connector URL will be
  `https://<username>.github.io/trello_powerups/<subdir>/`.
- Registration happens at https://trello.com/power-ups/admin.

### What I want to do next

(Fill in for the Cowork session, e.g.):

- [ ] Push the repo to GitHub and turn on Pages.
- [ ] Register `title-length` as a Power-Up and enable it on my main board.
- [ ] Add a second Power-Up: ____________________
- [ ] Refactor `shared/trello-helpers.js` to add ____________________

### Notes for the AI

- Read `README.md` at the repo root before doing anything else — it has the
  structure and the registration flow.
- Do NOT introduce a build step (webpack, vite, etc.) unless I ask. The
  whole point is that these files are static and trivially hostable.
- When adding a new Power-Up, follow the layout of `title-length/` exactly:
  same four files, same use of `shared/trello-helpers.js`.
- The Trello capability docs live at
  https://developer.atlassian.com/cloud/trello/power-ups/capabilities/ —
  fetch them when implementing a new capability rather than guessing.

## PROMPT END
