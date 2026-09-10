#!/usr/bin/env node
/* Pulls the looping preview for each speaker quote video.
 *
 * The videos live in VEED, linked from the DDX Notion database
 * "Speakers, VIPs & Jury Profiles (Step 1)" (VEED Video Link). A VEED share
 * page publishes an animated thumbnail on a public CDN — a short silent loop
 * of the speaker talking, which is exactly the right weight for a panel beside
 * a question. This scrapes that one URL and saves it locally, so the survey
 * never hotlinks VEED and never depends on it staying up.
 *
 *   node sync-quotes.mjs --dry-run
 *   node sync-quotes.mjs
 *
 * Only entries in assets/js/quotes.js with a `veed` link are fetched. Add a
 * speaker there (name, role, quote, veed) and re-run.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { REEL } from './assets/js/quotes.js';

const DRY = process.argv.includes('--dry-run');
const OUT = new URL('./assets/media/quotes/', import.meta.url);

/* VEED renders the page server-side, so the thumbnail URL is in the HTML.
   Anything else on that page is theirs and none of our business. */
const THUMB = /https:\/\/cdn-user-public\.veed\.io\/animatedProjectThumbnails\/[0-9a-f-]+\.gif/i;

async function pull(entry) {
  if (!entry.veed) return { ...entry, skipped: 'no veed link' };
  const page = await fetch(entry.veed, { redirect: 'follow' });
  if (!page.ok) return { ...entry, error: `share page ${page.status}` };
  const html = await page.text();
  const hit = html.match(THUMB);
  if (!hit) return { ...entry, error: 'no animated thumbnail on the page' };

  const media = await fetch(hit[0]);
  if (!media.ok) return { ...entry, error: `thumbnail ${media.status}` };
  const bytes = Buffer.from(await media.arrayBuffer());
  const file = `${entry.id}.gif`;
  if (!DRY) {
    await mkdir(OUT, { recursive: true });
    await writeFile(new URL(file, OUT), bytes);
  }
  return { ...entry, file, kb: Math.round(bytes.length / 1024) };
}

const results = [];
for (const entry of REEL) {
  try {
    results.push(await pull(entry));
  } catch (err) {
    results.push({ ...entry, error: err.message });
  }
}

for (const r of results) {
  const tag = r.error ? `✗ ${r.error}` : r.skipped ? `– ${r.skipped}` : `✓ ${r.file} (${r.kb} KB)`;
  console.log(`${r.name.padEnd(24)} ${tag}`);
}
const ok = results.filter((r) => r.file).length;
console.log(`\n${ok}/${results.length} ${DRY ? 'would be saved' : 'saved'} to assets/media/quotes/`);
if (results.some((r) => r.file)) {
  console.log('Set `media: true` on those entries in assets/js/quotes.js to play them.');
}
