# Speaker quote loops

Short portrait loops of speakers answering "the future of digital innovation",
shown beside Q28. One file per entry in `assets/js/quotes.js`, named after its
`id`: `gleb-kuznetsov.gif`, and so on.

**Nothing is here yet, on purpose.** `node sync-quotes.mjs` will pull a loop for
every entry from its VEED share link, but what VEED publishes on that page is
its own *share thumbnail*: portrait 288×512, wrapped in a blue/pink wash, with a
**VEED chevron watermark** across the middle and a **"▶ 0:51" play badge burned
into the pixels**. On a DDX research page that is someone else's branding plus a
control that does nothing when you press it, so those files are not shipped.

## What to put here instead

Clean exports of the same recordings, without VEED's overlay:

- **Portrait**, 9:16. 288×512 is enough; 540×960 is better.
- **Silent and short** — 3 to 6 seconds, cut so it loops without a jump.
- **No watermark, no play button, no burned-in captions.**
- Under ~600 KB each. GIF works; if you would rather use video, name the files
  `<id>.mp4` and change the `img` in `createReel` (main.js) to a
  `<video autoplay muted loop playsinline>` — everything else is the same.

Then set `media: true` on those entries in `assets/js/quotes.js`.

## Until then

The panel shows the quote set as type over the DDX black — the speaker's own
words, name and role. That is a finished state, not a placeholder, and it is
what the page ships with today.
