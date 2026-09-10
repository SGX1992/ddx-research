/* The questionnaire, as data.
 *
 * Nothing in the interface hard-codes a question, an option or a routing rule —
 * it all comes from here, so a revision is a diff against one file and the
 * version in config.js is the only thing that has to move with it.
 *
 * Question ids are stable and gapless (Q01–Q28) even when a question is never
 * shown: a skipped question is recorded as a skip, not as an absence.
 *
 * A `step` is one screen. Most hold a single question; a few hold a short
 * related pair, which is where the reveal-as-you-answer cascade lives. Every
 * matrix gets a screen to itself.
 */

const slug = (s) =>
  s.toLowerCase()
    .replace(/\[.*?\]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 44);

/* A substantive option: randomized with its peers, freely combinable. */
const O = (label, notion) => ({ id: slug(label), label, notion });

/* Kept at the bottom and never randomized. `exclusive` options clear every
   other selection when picked, and are cleared by any other selection. */
const X = (label, notion) => ({ id: slug(label), label, tail: true, exclusive: true, notion });

/* "Other" sits at the bottom but is substantive — it combines with the rest
   and opens a short text field. */
const OTHER = { id: 'other', label: 'Other [please specify]', tail: true, other: true, notion: 'Other' };

const scale = (...labels) => labels.map((l) => ({ id: slug(l), label: l }));
const rows = (...labels) => labels.map((l) => ({ id: slug(l), label: l }));

/* ---------- shared matrix scales ---------- */

const S_EFFECT = scale(
  'Much worse', 'Somewhat worse', 'No overall change', 'Somewhat better',
  'Much better', 'Too early to tell', 'Not applicable',
);
const S_EVIDENCE = scale(
  'Yes, before launch only', 'Yes, after launch only',
  'Yes, both before and after launch', 'No', 'Don’t know',
);
const S_ASSESSED = scale(
  'Before launch only', 'After launch only', 'Both before and after launch',
  'Not assessed', 'Not applicable', 'Don’t know',
);
const S_AVAILABILITY = scale(
  'Increase availability', 'Keep availability approximately the same',
  'Decrease availability', 'No decision has been made', 'Not applicable', 'Don’t know',
);

/* ---------- questions ---------- */

const Q = {
  Q01: {
    id: 'Q01', type: 'single', notionProp: 'Q01 Responsibility',
    text: 'Which best describes your current responsibility for customer, brand or product experiences?',
    hint: 'Select the closest match.',
    /* An ordered ladder of seniority — reordering it would misread as random. */
    randomize: false,
    options: [
      O('I set direction across an organization.'),
      O('I lead a business unit or function.'),
      O('I lead individual projects or initiatives.'),
      O('I contribute as a specialist or individual contributor.'),
      O('I do not currently work on these experiences.'),
    ],
  },

  Q02: {
    id: 'Q02', type: 'single', notionProp: 'Q02 Function',
    text: 'What is your primary professional function?',
    options: [
      O('General management'), O('Design'), O('Product management'),
      O('Brand or marketing'), O('Research or customer insights'),
      O('Customer experience or service'), O('Innovation or strategy'),
      O('Technology or engineering'), OTHER,
    ],
  },

  Q03: {
    id: 'Q03', type: 'multi', max: 3, notionProp: 'Q03 Priority outcomes',
    text: 'Which outcomes are your organization’s highest priorities for customer-facing innovation over the next 24 months?',
    options: [
      O('Revenue growth'), O('Greater product or service adoption'),
      O('Stronger customer retention'), O('Higher customer satisfaction'),
      O('Lower operating costs'), O('Faster service delivery'),
      O('Stronger differentiation from competitors'), O('Greater accessibility'),
      O('Reduced harm to customers'), OTHER,
      X('No priorities have been established'), X('Don’t know'),
    ],
  },

  Q04: {
    id: 'Q04', type: 'multi', max: 3, notionProp: 'Q04 Choice factors',
    text: 'In your view, which factors will most influence customers choosing your organization over alternatives in the next 24 months?',
    options: [
      O('Price'), O('Product or service performance'), O('Convenience'),
      O('Trust in the organization'), O('Specialist expertise'),
      O('Personal attention from people'), O('Emotional connection with the brand'),
      O('Distinctive design or brand personality'), O('Alignment with customers’ values'),
      O('A sense of community'), OTHER, X('Not applicable'), X('Don’t know'),
    ],
  },

  Q05: {
    id: 'Q05', type: 'multi', max: 3, notionProp: 'Q05 Expected developments',
    text: 'Which developments do you expect will most change how your organization creates customer experiences over the next 24 months?',
    options: [
      O('AI assistants that customers use to discover or choose products'),
      O('Automation of customer service interactions'),
      O('Faster creation of products and content using AI'),
      O('More personalized experiences'),
      O('Greater integration of physical and digital experiences'),
      O('Immersive or spatial experiences'),
      O('Changing expectations around privacy'),
      O('Changing expectations around accessibility'),
      O('Changing expectations of human assistance'),
      O('Changes in customers’ spending power'),
      OTHER, X('No substantial changes expected'), X('Don’t know'),
    ],
  },

  Q06: {
    id: 'Q06', type: 'matrix', notionProp: 'Q06 Technology effects',
    text: 'Over the next 24 months, what overall effect do you expect technology-led innovation to have on the following aspects of customer experience in your industry?',
    hint: 'One answer per row.',
    rows: rows(
      'How easily customers can complete what they set out to do.',
      'Customers’ control over important decisions.',
      'Customers’ sense of being understood.',
      'Customers’ access to human help when needed.',
      'Accessibility for people with different abilities.',
      'Customers’ ability to distinguish one brand’s experience from another.',
    ),
    scale: S_EFFECT,
  },

  Q07: {
    id: 'Q07', type: 'single', notionProp: 'Q07 Initiative available',
    text: 'Can you answer about an initiative that fits this description?',
    randomize: false,
    options: [
      O('Yes'),
      O('No qualifying initiative was launched'),
      O('An initiative was launched, but I was not directly involved',
        'An initiative was launched — but I was not directly involved'),
      O('Don’t know'),
    ],
  },

  Q08: {
    id: 'Q08', type: 'single', notionProp: 'Q08 Experience type',
    text: 'What type of experience did this initiative primarily change?',
    options: [
      O('A digital product or service'), O('A physical product'),
      O('An in-person service or physical environment'),
      O('A brand communication or campaign'),
      O('An integrated experience spanning physical and digital interactions'),
      OTHER,
    ],
  },

  Q09: {
    id: 'Q09', type: 'multi', max: 3, notionProp: 'Q09 Emotional outcomes',
    text: 'Which emotional outcomes, if any, did the team explicitly aim to create for customers?',
    options: [
      O('Greater confidence'), O('Greater reassurance'), O('More enjoyment'),
      O('More curiosity'), O('Greater inspiration'), O('A stronger sense of belonging'),
      O('Feeling better understood'), O('A stronger sense of control'),
      O('Less frustration'), O('Less anxiety'), OTHER,
      X('No explicit emotional outcomes were defined'), X('Don’t know'),
    ],
  },

  Q10: {
    id: 'Q10', type: 'dynamic-matrix', notionProp: 'Q10 Emotional evidence',
    text: 'For each outcome you selected, did the team collect feedback directly from customers about whether they experienced it?',
    help: 'Include feedback from real customers or intended users participating in research. Do not count internal opinions or responses generated by AI personas.',
    /* Rows are whatever Q09 substantively selected, the specified "Other"
       included. Change Q09 and the rows here change with it — any answer whose
       row disappears is dropped rather than silently re-pointed. */
    rowsFrom: 'Q09',
    scale: S_EVIDENCE,
  },

  Q11: {
    id: 'Q11', type: 'matrix', notionProp: 'Q11 Aspects assessed',
    text: 'Which of the following aspects were assessed with customers or intended users for this initiative?',
    hint: 'One answer per row.',
    rows: rows(
      'Whether people understood how the experience worked.',
      'How much mental effort the experience required.',
      'Whether people could correct or recover from mistakes.',
      'Whether people felt in control of important actions.',
      'Whether people with different abilities could use the experience.',
      'Whether the experience affected trust in the organization.',
    ),
    scale: S_ASSESSED,
  },

  Q12: {
    id: 'Q12', type: 'single', notionProp: 'Q12 Evidence decision',
    text: 'What was the most consequential decision that customer evidence influenced for this initiative?',
    options: [
      O('Changing the experience itself'), O('Changing the intended audience'),
      O('Changing launch or rollout timing'), O('Pausing or withdrawing the experience'),
      O('Proceeding without changes because the evidence supported doing so'),
      O('Evidence was collected but had not influenced a decision'),
      O('No customer evidence was collected'), OTHER, O('Don’t know'),
    ],
  },

  Q13: {
    id: 'Q13', type: 'multi', notionProp: 'Q13 Outcomes tracked',
    text: 'Which outcomes were tracked after launch?',
    hint: 'Select all that apply.',
    help: 'Select outcomes that were tracked, even when the initiative’s specific contribution could not be isolated.',
    options: [
      O('Adoption or usage'), O('Successful task completion'),
      O('Repeat use or customer retention'), O('Customer satisfaction'),
      O('Revenue'), O('Operating or service costs'), O('Brand preference'),
      O('Customer complaints'), OTHER,
      X('None of these outcomes were tracked'), X('Don’t know'),
    ],
  },

  Q14: {
    id: 'Q14', type: 'single', notionProp: 'Q14 AI use',
    text: 'Which best describes your organization’s current use of customer-facing AI?',
    help: 'Include AI that interacts with customers or takes actions affecting their experiences. Do not count tools used only internally to produce designs, content or code.',
    /* An ordered maturity ladder. */
    randomize: false,
    options: [
      O('Not in use, with no active plans', 'Not in use — no active plans'),
      O('Not in use, but being planned', 'Not in use — being planned'),
      O('In testing or pilots only'),
      O('Live in a limited number of customer experiences'),
      O('Live across many customer experiences'),
      O('Don’t know'),
    ],
  },

  Q15: {
    id: 'Q15', type: 'multi', notionProp: 'Q15 Customer controls',
    text: 'For your organization’s most widely used customer-facing AI experience, which of the following can customers do?',
    hint: 'Select all that apply.',
    options: [
      O('Identify when AI is being used'),
      O('Obtain an explanation for a recommendation or action'),
      O('Confirm consequential actions before they happen'),
      O('Correct information the system uses about them'),
      O('Reverse an action'),
      O('Control whether their personal information is used for personalization'),
      O('Obtain help from a person'),
      O('Choose an alternative that does not use AI'),
      OTHER, X('None of these'), X('Don’t know'),
    ],
  },

  Q16: {
    id: 'Q16', type: 'matrix', notionProp: 'Q16 Human assistance plans',
    text: 'Over the next 24 months, how does your organization plan to change the availability of human assistance in the following situations?',
    hint: 'One answer per row.',
    rows: rows(
      'Routine questions or transactions.',
      'Choosing a complex product or service.',
      'Resolving a complaint or service failure.',
      'Getting started with a product or service.',
    ),
    scale: S_AVAILABILITY,
  },

  Q17: {
    id: 'Q17', type: 'multi', max: 3, notionProp: 'Q17 Investment priorities',
    text: 'Which capabilities are your organization’s highest priorities for additional investment over the next 24 months?',
    options: [
      O('Research into customer behavior and emotions'),
      O('Data analysis and experimentation'),
      O('AI development and implementation'),
      O('Product and service design'),
      O('Brand expression and storytelling'),
      O('Human service and specialist advice'),
      O('Accessibility'),
      O('Coordination across digital and physical experiences'),
      O('Privacy and data protection'),
      OTHER, X('No additional investment is planned'),
      X('Priorities have not been decided'), X('Don’t know'),
    ],
  },

  Q18: {
    id: 'Q18', type: 'multi', max: 3, notionProp: 'Q18 Limitations',
    text: 'What most limits your organization’s ability to create the customer experiences it intends?',
    options: [
      O('Budget constraints'), O('Pressure to deliver quickly'),
      O('Unclear leadership priorities'), O('Teams working in isolation'),
      O('Unclear accountability'), O('Insufficient direct customer research'),
      O('Gaps in understanding human behavior'), O('Technology limitations'),
      O('Difficulty demonstrating business value'),
      O('Conflicting needs across customer groups'),
      OTHER, X('No major limitations'), X('Don’t know'),
    ],
  },

  Q19: {
    id: 'Q19', type: 'single', notionProp: 'Q19 Accountability',
    text: 'How is overall accountability for customer experience organized?',
    options: [
      O('One leader is accountable across the organization or business unit'),
      O('Multiple leaders share accountability through a defined process'),
      O('Different teams are accountable for separate parts, without a shared overall lead',
        'Different teams are accountable for separate parts — no shared overall lead'),
      O('Accountability is not clearly defined'),
      OTHER, O('Don’t know'),
    ],
  },

  Q20: {
    id: 'Q20', type: 'text', optional: true, rowsHint: 5, notionProp: 'Q20 Unexpected effect',
    text: 'Describe one recent situation in which an innovation affected customers differently from what your team expected. What evidence revealed the difference?',
    help: 'Suggested length: 2–4 sentences. Please do not identify customers or disclose confidential information.',
  },

  Q21: {
    id: 'Q21', type: 'text', optional: true, rowsHint: 4, notionProp: 'Q21 Underexamined question',
    text: 'What question about the future of customer experience deserves more attention than it currently receives?',
    help: 'Suggested length: 1–3 sentences.',
  },

  Q22: {
    id: 'Q22', type: 'single', notionProp: 'Q22 Scope',
    text: 'What scope have you been answering for?',
    randomize: false,
    options: [
      O('An entire organization'),
      O('A business unit or division within a larger organization'),
      OTHER,
    ],
  },

  Q23: {
    id: 'Q23', type: 'single', notionProp: 'Q23 Industry',
    text: 'Which industry best describes that organization or business unit?',
    help: 'Consultants answering about a client should select the client’s industry.',
    options: [
      O('Technology or software'), O('Financial services or insurance'),
      O('Healthcare or life sciences'), O('Retail or e-commerce'),
      O('Consumer products'), O('Automotive or mobility'),
      O('Manufacturing or industrial'), O('Media or entertainment'),
      O('Travel or hospitality'), O('Telecommunications'),
      O('Energy or utilities'), O('Professional services or consulting'),
      O('Education'), O('Government or public services'),
      O('Arts, culture or nonprofit', 'Arts / culture or nonprofit'),
      OTHER,
    ],
  },

  Q24: {
    id: 'Q24', type: 'single', notionProp: 'Q24 Size',
    text: 'Approximately how many people work in the organization or business unit you have been answering for?',
    /* An ordered band scale. */
    randomize: false,
    options: [
      O('1–9', '1-9'), O('10–49', '10-49'), O('50–249', '50-249'),
      O('250–999', '250-999'), O('1,000–4,999', '1000-4999'),
      O('5,000–19,999', '5000-19999'), O('20,000 or more', '20000 or more'),
      O('Don’t know'), O('Prefer not to say'),
    ],
  },

  Q25: {
    id: 'Q25', type: 'single', notionProp: 'Q25 Audience',
    text: 'Who primarily uses its products or services?',
    options: [
      O('Individuals or households'), O('Businesses or other organizations'),
      O('A substantial mix of both'),
      { id: 'another-audience', label: 'Another type of audience [please specify]',
        tail: true, other: true, notion: 'Another type of audience' },
      O('Don’t know'),
    ],
  },

  Q26: {
    id: 'Q26', type: 'country', notionProp: 'Q26 Country',
    text: 'In which country or territory are you currently based?',
    hint: 'Start typing to search.',
  },

  Q27: {
    id: 'Q27', type: 'country-multi', max: 3, notionProp: 'Q27 Largest markets',
    text: 'In which countries or territories are your organization’s largest customer groups located?',
    hint: 'Select up to three.',
    exclusiveOptions: [
      X('Customers are distributed globally without dominant markets'),
      X('Don’t know'),
    ],
  },

  /* Appended to the brief's Q01–Q27. Deliberately the last thing asked: the
     same prompt DDX puts to its speakers, so the answers sit alongside the
     speaker quotes rather than in a separate vocabulary. */
  Q28: {
    id: 'Q28', type: 'text', optional: true, rowsHint: 4,
    notionProp: 'Q28 Future of digital innovation',
    text: 'What is your perspective on the future of digital innovation?',
    help: 'Suggested length: 1–3 sentences. With your permission we may quote contributions like this in the published report.',
    showcase: 'quotes',
  },
};

/* ---------- sections and screens ---------- */

export const SECTIONS = [
  {
    /* Read immediately before answering rather than on the landing page,
       where these three paragraphs stood between someone and the start
       button. */
    intro: [
      'Please answer for one organization or business unit you know directly, and keep that same scope throughout. Consultants may answer for one client organization without identifying the client.',
      'Throughout this survey, “customers” includes people who use your products or services, such as users, members, visitors and guests.',
      'Participation is voluntary. Please do not include confidential information or identify individual customers.',
    ],
    n: 1, id: 'perspective', title: 'Your perspective',
    steps: [{ id: 's1a', questions: [Q.Q01, Q.Q02] }],
  },
  {
    n: 2, id: 'priorities', title: 'Priorities and future experiences',
    steps: [
      { id: 's2a', questions: [Q.Q03] },
      { id: 's2b', questions: [Q.Q04] },
      { id: 's2c', questions: [Q.Q05] },
      { id: 's2d', questions: [Q.Q06] },
    ],
  },
  {
    n: 3, id: 'development', title: 'How experiences are developed',
    intro: [
      'For the next questions, think about the most recent significant customer-facing change launched in the past 12 months that you worked on directly.',
      'This could be a new or substantially changed product, service, customer journey, physical environment or brand experience. Please choose the most recent example, not necessarily the most successful.',
    ],
    steps: [
      { id: 's3a', questions: [Q.Q07], showIntro: true },
      { id: 's3b', questions: [Q.Q08] },
      { id: 's3c', questions: [Q.Q09] },
      { id: 's3d', questions: [Q.Q10] },
      { id: 's3e', questions: [Q.Q11] },
      { id: 's3f', questions: [Q.Q12] },
      { id: 's3g', questions: [Q.Q13] },
    ],
  },
  {
    n: 4, id: 'ai', title: 'AI, control and human assistance',
    steps: [
      { id: 's4a', questions: [Q.Q14] },
      { id: 's4b', questions: [Q.Q15] },
      { id: 's4c', questions: [Q.Q16] },
    ],
  },
  {
    n: 5, id: 'leadership', title: 'Leadership and investment',
    steps: [
      { id: 's5a', questions: [Q.Q17] },
      { id: 's5b', questions: [Q.Q18] },
      { id: 's5c', questions: [Q.Q19] },
      { id: 's5d', questions: [Q.Q20] },
      { id: 's5e', questions: [Q.Q21, Q.Q28] },
    ],
  },
  {
    n: 6, id: 'organization', title: 'Organization and markets',
    steps: [
      { id: 's6a', questions: [Q.Q22] },
      { id: 's6b', questions: [Q.Q23] },
      { id: 's6c', questions: [Q.Q24, Q.Q25] },
      { id: 's6d', questions: [Q.Q26] },
      { id: 's6e', questions: [Q.Q27] },
    ],
  },
];

export const QUESTIONS = Q;

export const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.steps.flatMap((st) => st.questions));

/* ---------- routing ----------
 *
 * One predicate per conditional question. `a` is the answer store's plain
 * object, so a rule can only depend on recorded answers — never on how the
 * respondent got here.
 */

const INELIGIBLE = slug('I do not currently work on these experiences.');
const Q07_YES = slug('Yes');
const Q09_NONE = slug('No explicit emotional outcomes were defined');
const Q09_DK = slug('Don’t know');
const Q14_LIVE = [
  slug('Live in a limited number of customer experiences'),
  slug('Live across many customer experiences'),
];

export const SCREEN_OUT_OPTION = INELIGIBLE;

export const ROUTING = {
  /* Only "Yes" reaches Q08–Q13. */
  Q08: (a) => a.Q07 === Q07_YES,
  Q09: (a) => a.Q07 === Q07_YES,
  Q10: (a) =>
    a.Q07 === Q07_YES &&
    Array.isArray(a.Q09) &&
    a.Q09.some((id) => id !== Q09_NONE && id !== Q09_DK),
  Q11: (a) => a.Q07 === Q07_YES,
  Q12: (a) => a.Q07 === Q07_YES,
  Q13: (a) => a.Q07 === Q07_YES,
  Q15: (a) => Q14_LIVE.includes(a.Q14),
};

export function isEligible(answers) {
  return answers.Q01 !== INELIGIBLE;
}

export function isApplicable(question, answers) {
  const rule = ROUTING[question.id];
  return rule ? rule(answers) : true;
}

/* The rows Q10 actually shows: the substantive Q09 selections, in the order
   they were offered, with the respondent's own "Other" wording when given. */
export function dynamicRows(question, answers, otherText) {
  if (question.rowsFrom !== 'Q09') return [];
  const picked = answers.Q09 || [];
  return Q.Q09.options
    .filter((o) => picked.includes(o.id) && o.id !== Q09_NONE && o.id !== Q09_DK)
    .map((o) => ({
      id: o.id,
      label: o.other ? (otherText.Q09 || 'Other outcome') : o.label,
    }));
}
