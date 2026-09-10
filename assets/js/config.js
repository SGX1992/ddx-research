/* Everything about this deployment that is not the questionnaire itself.
   Changing a value here must never require touching the survey logic. */

export const STUDY = {
  id: 'experiences-2027',
  /* Bump on any change to wording, options or routing. Stored with every
     response so answers can never be misread against a later revision. */
  version: 'experiences-2027.v1',
  eyebrow: 'DDX RESEARCH',
  title: 'The Future of Brand, Product and Customer Experiences in an Age of AI',
  /* The line under the headline. The study title above it already carries the
     subject, so this says who is answering rather than repeating it. */
  theme: 'Perspectives from leaders across design, product, brand and customer experience.',
  /* Shown to anyone who answers Q01 with "I do not currently work on these
     experiences". Their answers are not recorded. */
  screenOutMessage: 'This edition focuses on people currently working on customer, brand or product experiences.',
};

/* REQUIRED BEFORE PUBLIC LAUNCH. The approved privacy notice. While this is
   empty the link renders as an explicit "not yet published" state rather than
   a dead link — no invented destination, no invented legal text. */
export const PRIVACY_URL = '';

/* The serverless function that holds the Notion token. A GET here is a health
   probe: if it does not answer, the page says so instead of pretending to
   save. Never put a Notion token in this file or anywhere else the browser
   can read. */
export const SUBMIT_ENDPOINT = '/.netlify/functions/submit';

/* Shown on the landing page and beside the primary action. Set by DDX rather
   than measured — worth re-checking against a pilot run, because 28 questions
   with three matrices is a lot to fit into two minutes, and a claim that
   undershoots badly costs completions. One string to change. */
export const DURATION_ESTIMATE = '2 minutes';

/* Why someone should spend those minutes. Kept here, not in the markup, so
   the pitch can be edited without touching the page. Every line has to be
   something DDX will actually do. */
export const BENEFITS = [
  {
    title: 'Get the findings first',
    body: 'Contributors receive the full report before it is published.',
  },
  {
    title: 'See how your peers answered',
    body: 'Results reported in aggregate across roles, industries and regions.',
  },
  {
    title: 'Set the agenda',
    body: 'What comes back shapes what DDX puts on stage in 2027.',
  },
];

export const BRAND = {
  short: 'DDX',
  research: 'DDX Research',
};

export const THANKS = {
  title: 'Thank you for contributing to the DDX research.',
  body: 'Your perspective will help inform DDX’s research and leadership discussions on the future of customer, brand and product experiences.',
};

/* The caption under the speaker reel beside Q28. */
export const REEL_CAPTION = 'Speakers record a short version of this answer for DDX. Contributors we quote are invited to do the same.';

export const CONTACT_URL = 'https://www.ddxconference.com/contact';
