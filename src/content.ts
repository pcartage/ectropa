export const siteContent = {
  company: "Ectropa",
  descriptor: "Investment company",
  year: "2011",
  openingLine:
    "We hold investments with patience, purpose, and care.",
  hero: {
    image: "/media/hero-desaturated.webp",
    alt: "A still alpine lake reflecting rocky mountains and a wide sky in Switzerland",
    note: "",
  },
  philosophy: {
    eyebrow: "A way of holding",
    heading: "The right things are often the quiet ones.",
    paragraphs: [
      "We favor decisions that can withstand repetition: much of stewardship is doing the useful, unremarkable work—consistently and with purpose.",
      "Before anything moves, we ask who is across the table, whether trust can be earned, and whether the people involved can carry the proposal through. A compelling idea is not enough without clear control.",
    ],
  },
  holdings: {
    eyebrow: "Areas of focus",
    heading: "A small number of interests, structured with care.",
    domains: [
      {
        number: "01",
        title: "Family investments",
        copy: "Long-term positions held on behalf of family",
      },
      {
        number: "02",
        title: "Personal investments",
        copy: "Selective commitments where the people, proposition, and path to execution can be followed closely.",
      },
      {
        number: "03",
        title: "Controlled opportunities",
        copy: "Well-considered opportunities with a clear controlling vehicle and defined decision rights that protect alignment over time.",
      },
    ],
  },
  provenance: {
    eyebrow: "A note",
    copy: "We begin with the counterparty: how trust is built, whether the capability matches the proposal, and who will still be accountable when circumstances change. The aim is to get the terms right, treat people right, and then do what we said we would do.",
  },
  contact: {
    heading: "Some conversations are better begun quietly.",
    email: "hello@ectropa.com",
    invitation: "We welcome well-considered opportunities. Write to",
  },
} as const;

export type SiteContent = typeof siteContent;
