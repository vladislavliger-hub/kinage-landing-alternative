/**
 * Testimonials — the three quotes from the current landing's design (Figma
 * node 562:4206), copied unchanged, in design order; the middle one is active
 * on load.
 *
 * DRAFT CONTENT: these are prototype entries carried over for this local
 * design comparison. They are not verified customer feedback and must not be
 * presented as such; no further people or quotes are to be added.
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'david',
    quote: 'It immediately flagged something that didn’t look right. I would’ve never noticed it myself.',
    name: 'David Thompson',
    role: 'research participant',
  },
  {
    id: 'sarah',
    quote: 'For the first time, I can actually see what’s been paid and what hasn’t, without digging through emails.',
    name: 'Sarah Miller',
    role: 'Early Access User',
  },
  {
    id: 'karen',
    quote: 'I finally feel like we’re on the same page as a family instead of guessing what’s going on.',
    name: 'Karen Brooks',
    role: 'Daughter and Care Coordinator',
  },
];

/** Index shown as active on first render (the design shows Sarah in the centre). */
export const INITIAL_TESTIMONIAL = 1;

export const TESTIMONIALS_HEAD = {
  title: 'What families are already seeing',
};
