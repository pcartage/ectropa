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
      "We favor decisions that can stand the test of time. Stewardship often lies in doing the useful, unremarkable work—consistently, deliberately, and with purpose.",
      "Before anything moves, we consider who is across the table, whether trust can be earned, and whether those involved have the judgment and capacity to follow through. A compelling idea is not enough without clear ownership and disciplined execution.",
    ],
  },
  holdings: {
    eyebrow: "Areas of focus",
    heading: "A small number of interests, structured with care.",
    domains: [
        {
        number: "01",
        title: "Personal",
        copy: "Selective commitments where the people, proposition, and path to execution can be followed closely.",
      },
         {
        number: "02",
        title: "Family",
        copy: "Passive investments and family matters",
      },
    ],
  },
  provenance: {
    eyebrow: "A note",
    copy: "We begin with principles. How trust is built, whether capability matches the proposal, and who has the commitment to carry it forward over time. The aim is simple: set the terms carefully, treat people well, and do what we say we will do.",
  },
  contact: {
    heading: "Some conversations are better begun quietly.",
    email: "hello@ectropa.com",
    invitation: "We welcome well-considered opportunities. Write to",
  },
} as const;

export type SiteContent = typeof siteContent;
