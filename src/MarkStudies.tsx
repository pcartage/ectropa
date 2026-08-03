const marks = [
  { number: "01", name: "Reference", note: "Current mark · close perimeter · modest stroke contrast", file: "01-reference.svg" },
  { number: "02", name: "Air", note: "Larger frame · more perimeter space · lighter construction", file: "02-air.svg" },
  { number: "03", name: "Balanced", note: "Measured clearance · disciplined rhythm · controlled emphasis", file: "03-balanced.svg", recommended: true },
  { number: "04", name: "Monoline", note: "Equal line weight · quiet and technical", file: "04-monoline.svg" },
  { number: "05", name: "Structural", note: "Heavier frame · lighter arrows · greater permanence", file: "05-structural.svg" },
  { number: "06", name: "Signal", note: "Light frame · stronger arrows · more forward motion", file: "06-signal.svg" },
  { number: "07", name: "Compact rhythm", note: "Tighter arrow group · generous perimeter air", file: "07-compact.svg" },
  { number: "08", name: "Open rhythm", note: "Wider arrow spacing · lighter, more expansive field", file: "08-open.svg" },
] as const;

export default function MarkStudies() {
  return (
    <main className="marks-page">
      <header className="marks-header">
        <div>
          <p>Identity study / 02</p>
          <h1>Ectropa mark alternatives</h1>
        </div>
        <a href="/">Return to website</a>
      </header>

      <p className="marks-intro">
        Eight disciplined adjustments to one idea. The geometry remains familiar;
        only perimeter clearance, arrow rhythm, and stroke hierarchy change.
      </p>

      <section className="marks-grid" aria-label="Numbered Ectropa mark alternatives">
        {marks.map((mark) => (
          <article className={`mark-card${"recommended" in mark && mark.recommended ? " recommended" : ""}`} key={mark.number}>
            <div className="mark-meta">
              <span>{mark.number}</span>
              <div>
                <h2>{mark.name}</h2>
                <p>{mark.note}</p>
              </div>
              {"recommended" in mark && mark.recommended && <em>Recommended</em>}
            </div>
            <div className="mark-stage">
              <img className="mark-large" src={`/marks/${mark.file}`} alt={`Ectropa mark alternative ${mark.number}: ${mark.name}`} />
              <div className="mark-scale">
                <img src={`/marks/${mark.file}`} alt="" aria-hidden="true" />
                <span>32 px</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="marks-footer">
        <span>Ectropa</span>
        <span>Mark study · 2011—</span>
      </footer>
    </main>
  );
}
