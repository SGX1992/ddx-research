/* The speaker reel beside Q28.
 *
 * These are real answers to the same question, given by DDX speakers through
 * the Notion form that says the quote may be used across the DDX website and
 * social channels. Nothing here is invented and nothing is trimmed mid-
 * sentence: a quote is either shown whole or not shown.
 *
 * `veed` is the speaker's video answer. `media` is false for every entry and
 * the panel is typographic — a finished state, not a placeholder.
 *
 * It is false because the only loop VEED publishes for a share link is its own
 * thumbnail: a blue-and-pink wash with a VEED watermark across it and a fake
 * "▶ 0:51" badge painted into the pixels. Shipping that would put a
 * competitor's branding and a dead control on a DDX page. Drop clean portrait
 * loops into assets/media/quotes/ — see the README there — and flip these to
 * true.
 *
 * To change the line-up, edit this array. Source of truth for new entries:
 * Notion → DDX → "Speakers, VIPs & Jury Profiles (Step 1)", Quotes view.
 */

export const REEL = [
  {
    id: 'gleb-kuznetsov',
    name: 'Gleb Kuznetsov',
    role: 'Chief Design Officer, Brain Technologies',
    quote: 'Innovation is shifting from designing interfaces to designing intelligence. The next generation of digital products won’t be defined by pixels or apps, but by systems that understand intent, adapt in real time, and create deeply personal experiences.',
    veed: 'https://www.veed.io/view/bab14049-606a-4d31-ba5d-eb0d5355d04d?panel=share',
    media: false,
  },
  {
    id: 'meghan-preiss',
    name: 'Meghan Preiss',
    role: 'Head of Global Service Design, Universal Destinations and Experiences',
    quote: 'Innovation is moving from invention to orchestration. The next decade belongs to the people who can design how intelligence, infrastructure, and human judgment work together, because the hard part is no longer building the thing, it is making the thing hold across an entire system.',
    veed: 'https://www.veed.io/view/f0786634-7078-4dbd-bd23-7e9dbc7e7f41?panel=share',
    media: false,
  },
  {
    id: 'stephanie-mencarelli',
    name: 'Stephanie Mencarelli',
    role: 'VP of Design, Document Cloud, Adobe',
    quote: 'As AI becomes more capable and generates more machine output, human originality becomes a scarce resource. We need to protect and foster the conditions where humans can continue to create original ideas.',
    veed: 'https://www.veed.io/view/1445852c-bb29-4f8c-9bdc-0d1c307ce204?panel=share',
    media: false,
  },
  {
    id: 'rowan-salama',
    name: 'Rowan Salama',
    role: 'Lead Product Researcher, Careem | Uber',
    quote: 'The future of innovation isn’t just about how fast technology evolves — it’s about how deeply we understand the humans evolving alongside it.',
    veed: 'https://www.veed.io/view/b6caea56-6df5-4c7a-9b0e-dc2b24adb414?panel=share',
    media: false,
  },
  {
    id: 'dianne-alter',
    name: 'Dianne Alter',
    role: 'Co-founder and Head of Design',
    quote: 'Designers that are winning in the future are the ones that embrace orchestration. That designer judgement is the thing that cannot be automated.',
    veed: 'https://www.veed.io/view/f744089c-566f-4ada-9125-2c42faf4119f?panel=share',
    media: false,
  },
  {
    id: 'brandon-burlington',
    name: 'Brandon Burlington',
    role: 'Staff UX Design, Google',
    quote: 'Embracing the AI transformation is incredibly exciting because the book on how we design for it isn’t finished yet — we’re the ones actively writing the chapters.',
    veed: 'https://www.veed.io/view/8bffd5bc-4597-4685-b503-5a46075be748?panel=share',
    media: false,
  },
];

export const MEDIA_DIR = 'assets/media/quotes/';
