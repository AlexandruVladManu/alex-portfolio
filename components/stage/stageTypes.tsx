export type Card = { id: string; src: string; alt: string };

export type Slide = {
  id: string;
  pill: string;
  title: string;
  ctaHref: string;
  caption: string; // ✅ NEW
  cards: readonly Card[];
};
