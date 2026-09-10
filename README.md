# DDX Research — The Future of Brand, Product and Customer Experiences in an Age of AI

A research landing page and 28-question survey for
**research.ddxconference.com**. Answers are written to Notion.

Static site, **no build step**. Serve the folder:

```bash
node serve.mjs
```

…then open <http://localhost:8793>. `serve.mjs` is dev-only — ES modules will
not load over `file://`, and it also runs the submit function locally so the
whole path is exercisable before it is deployed.

| | |
| --- | --- |
| `NOTION_TOKEN=ntn_… node serve.mjs` | writes to the real Notion databases |
| `node serve.mjs` | no token — the page shows its preview state, which is worth seeing |
| `STUB=1 node serve.mjs` | answers "saved" without contacting Notion, for working on the confirmation screens |

## The three states

1. **Landing** — the DDX invitation: the ember render, the study framing, what
   a contributor gets, the three research themes and "Before you begin".
2. **Questionnaire** — six sections, one per screen.
3. **End** — thank you plus a separate, optional contact form; or the polite
   eligibility message for anyone screened out at Q01.

## How a section screen works

Every question in the section is on the page at once, so the shape of what is
being asked is always visible. Exactly one is open:

- **ahead** — you can read the question; the options are not there yet
- **active** — the only controls on the page
- **done** — one line, your answer, and a way back in

A **single choice or a completed matrix closes itself** and opens the next
question. Anything where only the respondent knows they have finished — select
up to three, select all that apply, free text — waits for the **Next** control
inside the question. Without that split, one tick on a "select up to three"
would close the question at one answer, and an optional written question with
nothing typed would never settle, stranding every question after it.

## Where things live

| File | What it is |
| --- | --- |
| `assets/js/questionnaire.js` | **every question, option, matrix and routing rule.** The only file to edit to change the survey |
| `assets/js/config.js` | study title and theme, privacy URL, duration, the contributor benefits, submit endpoint |
| `assets/js/state.js` | answers, routing, downstream pruning, progress, the submission payload |
| `assets/js/ui.js` | rendering; knows nothing about the store beyond what it is handed |
| `assets/js/main.js` | screens, handlers, the speaker reel, the end states |
| `assets/js/submit.js` | the only thing that posts; duplicate protection lives here |
| `assets/js/countries.js` | ISO codes only — names come from `Intl.DisplayNames` |
| `netlify/functions/submit.mjs` | **the only thing that talks to Notion.** Holds the token |
| `tools/check-mapping.mjs` | checks the payload → Notion mapping against the real schema |

Question ids are stable and gapless, **Q01–Q28**, even when a question is never
shown. Q01–Q27 are the commissioned questionnaire; **Q28** is the DDX
perspective question, the same one put to speakers.

The study was commissioned as "DDX Human Experience Outlook 2027" and renamed
to the title above. `STUDY.id` and `STUDY.version` moved with it, so nothing
stored under the old name would be read against the new questionnaire.

### Changing a question

Edit `questionnaire.js`, then **bump `STUDY.version` in `config.js`**. The
version is stored with every response, so answers can never be read against a
revision that did not produce them. Then re-run the mapping check.

## Notion

Two databases under **DDX → Research**:

| Database | Holds |
| --- | --- |
| [Research Survey](https://app.notion.com/p/c55811e5d7f341948fd8c748d755d7f2) | one row per submitted questionnaire |
| [Research Contact Preferences](https://app.notion.com/p/806fb480febf4ff99f5cdfee90f46aed) | optional email preferences, kept separate |

The typed columns exist so the responses can be read and charted in Notion.
**`Raw JSON` is the canonical record** — it holds every matrix row and an
explicit marker for each of the four things that are not the same as each
other: routing skip, unanswered optional, "Don't know", and "Not applicable".
Build any export from that column, not from the typed ones.

The two stores share no respondent identifier by design. Declining the contact
form cannot affect a survey submission, and a failure in one cannot touch the
other.

### Setup

1. Create an internal integration at
   <https://www.notion.so/profile/integrations> and copy its token.
2. Share **both** databases with that integration, or every write returns 404.
3. Set `NOTION_TOKEN` on the deployment. Optionally `NOTION_SURVEY_DB`,
   `NOTION_CONTACT_DB` and `ALLOWED_ORIGINS`.

The page probes the endpoint on load. If Notion is not reachable it says so —
it never lets someone answer 28 questions and then quietly drop them.

### Checking the mapping

```bash
node tools/check-mapping.mjs /tmp/survey-schema.json
```

Builds a fully-answered payload, runs it through the same code the function
uses, and compares the result against a dump of the live database. A wrong
property name or an undefined select option is otherwise a 400 from Notion at
the worst possible moment. Notion also **rejects commas in select options** —
the few affected labels carry a `notion:` override in `questionnaire.js` so the
page can still show the exact commissioned wording.

## Hosting

The function needs a server. **GitHub Pages cannot run it.** Two ways round
that, and `research.ddxconference.com` currently points at GitHub Pages:

**A — everything on Netlify.** Point the domain at Netlify and deploy the
folder. `netlify.toml` is ready; `SUBMIT_ENDPOINT` stays relative and there is
no cross-origin request at all. One host, one deploy.

**B — page on GitHub Pages, function on Netlify.** `./deploy-pages.sh`
publishes the page to Pages at the current domain. Then deploy this folder to
Netlify for the function, set `SUBMIT_ENDPOINT` in `config.js` to the absolute
function URL, and add the Pages origin to `ALLOWED_ORIGINS`. The function
already sends CORS headers. Two deploys, and the DNS stays as it is.

A Pages-only deployment is a complete, honest page — it simply says responses
are not being saved, because they are not.

There is a sibling build for Footprint Intelligence at `../footprint-research`,
same engine, eight questions, `research.footprint-intelligence.com`.

## Speaker reel

Beside Q28 sits a panel of real speaker answers to the same question, pulled
from Notion → DDX → *Speakers, VIPs & Jury Profiles (Step 1)*. It ships
**typographic** — the quote, the name, the role, set over DDX black.

`node sync-quotes.mjs` will fetch a looping preview for each entry from its
VEED share link, but what VEED publishes there is its own share thumbnail,
complete with a VEED watermark and a fake "▶ 0:51" badge painted into the
pixels. See `assets/media/quotes/README.md` for what to put there instead.

## Before launch

- [ ] **Publish the privacy notice and set `PRIVACY_URL`.** Until then the page
      says "not yet published" rather than linking nowhere.
- [ ] **Pilot the completion time.** `DURATION_ESTIMATE` currently says
      *2 minutes*; 28 questions with three matrices is likely longer, and an
      estimate that undershoots costs completions.
- [ ] Confirm the six speakers quoted beside Q28 are happy to appear here.
- [ ] Set `NOTION_TOKEN` and share both databases with the integration.
- [ ] Decide hosting A or B above.

Nothing in the page claims a participant count, a research partner, an
endorsement, a finding or a publication date, and there is no scoring. Do not
add any without something real behind it.
