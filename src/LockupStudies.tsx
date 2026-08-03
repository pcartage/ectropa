import { useLayoutEffect, useRef, useState } from "react";

const studies = [
  {
    number: "01",
    name: "Old-style serif",
    note: "Iowan / Baskerville · compact editorial spacing",
    className: "study-01",
    fontFamily: "Iowan Old Style, Baskerville, Times New Roman, serif",
    fontWeight: 400,
    letterSpacing: "-5px",
    text: "Ectropa",
  },
  {
    number: "02",
    name: "High-contrast serif",
    note: "Didot / Bodoni · sharper institutional character",
    className: "study-02",
    fontFamily: "Didot, Bodoni 72, Times New Roman, serif",
    fontWeight: 400,
    letterSpacing: "-6px",
    text: "Ectropa",
  },
  {
    number: "03",
    name: "Classical serif",
    note: "Times · restrained and familiar",
    className: "study-03",
    fontFamily: "Times New Roman, Times, serif",
    fontWeight: 400,
    letterSpacing: "-5px",
    text: "Ectropa",
  },
  {
    number: "04",
    name: "Modern grotesk",
    note: "Helvetica Neue · direct and architectural",
    className: "study-04",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontWeight: 500,
    letterSpacing: "-5px",
    text: "Ectropa",
  },
  {
    number: "05",
    name: "Humanist sans",
    note: "Avenir · softer geometry and open forms",
    className: "study-05",
    fontFamily: "Avenir Next, Helvetica Neue, sans-serif",
    fontWeight: 450,
    letterSpacing: "-4px",
    text: "Ectropa",
  },
  {
    number: "06",
    name: "Spaced capitals",
    note: "Grotesk capitals · measured colonnade rhythm",
    className: "study-06",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontWeight: 400,
    letterSpacing: "12px",
    text: "ECTROPA",
  },
  {
    number: "07",
    name: "Quiet humanist serif",
    note: "Georgia · substantial and approachable",
    className: "study-07",
    fontFamily: "Georgia, Times New Roman, serif",
    fontWeight: 400,
    letterSpacing: "-5px",
    text: "Ectropa",
  },
  {
    number: "08",
    name: "Light grotesk",
    note: "Helvetica Neue Light · reserved contemporary tone",
    className: "study-08",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontWeight: 300,
    letterSpacing: "-4px",
    text: "Ectropa",
  },
] as const;

function MeasuredWordmark({
  text,
  fontFamily,
  fontWeight,
  letterSpacing,
}: {
  text: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
}) {
  const textRef = useRef<SVGTextElement>(null);
  const [bounds, setBounds] = useState({ x: 0, y: -76, width: 340, height: 76 });

  useLayoutEffect(() => {
    const measure = () => {
      const box = textRef.current?.getBBox();
      if (box && box.width > 0 && box.height > 0) {
        setBounds({ x: box.x, y: box.y, width: box.width, height: box.height });
      }
    };
    void document.fonts.ready.then(measure);
    measure();
  }, [fontFamily, fontWeight, letterSpacing, text]);

  const renderedWidth = 52 * (bounds.width / bounds.height);

  return (
    <svg
      className="wordmark-svg"
      width={renderedWidth}
      height="52"
      viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
    >
      <text
        ref={textRef}
        x="0"
        y="0"
        fill="currentColor"
        fontFamily={fontFamily}
        fontSize="100"
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
      >
        {text}
      </text>
    </svg>
  );
}

function Lockup({ study }: { study: (typeof studies)[number] }) {
  return (
    <div className="lockup word-first" aria-label="Ectropa">
      <MeasuredWordmark
        text={study.text}
        fontFamily={study.fontFamily}
        fontWeight={study.fontWeight}
        letterSpacing={study.letterSpacing}
      />
      <img src="/ectropa-mark.svg" alt="" aria-hidden="true" />
    </div>
  );
}

export default function LockupStudies() {
  return (
    <main className="studies-page">
      <header className="studies-header">
        <div>
          <p>Identity study / 01</p>
          <h1>Ectropa lockup alternatives</h1>
        </div>
        <a href="/">Return to website</a>
      </header>

      <p className="studies-intro">
        Eight type treatments with the Ectropa wordmark consistently on the left.
        Each visible letterform is measured and fitted to the exact height of the logo.
      </p>

      <section className="studies-grid" aria-label="Numbered wordmark alternatives">
        {studies.map((study) => (
          <article className={`study-card ${study.className}`} key={study.number}>
            <div className="study-meta">
              <span>{study.number}</span>
              <div>
                <h2>{study.name}</h2>
                <p>{study.note}</p>
              </div>
            </div>
            <div className="study-stage">
              <Lockup study={study} />
            </div>
          </article>
        ))}
      </section>

      <footer className="studies-footer">
        <span>Ectropa</span>
        <span>Lockup study · 2011—</span>
      </footer>
    </main>
  );
}
