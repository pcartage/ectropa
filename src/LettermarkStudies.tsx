const lettermarks = [
  { number: "01", name: "Officina", note: "Soft industrial E · broad stance · machined apertures", file: "01-officina.svg", recommended: true },
  { number: "02", name: "Portico", note: "Architectural E · arched counters · Italian civic character", file: "02-portico.svg" },
  { number: "03", name: "Nastro", note: "Single ribbon construction · expressive but controlled", file: "03-nastro.svg" },
  { number: "04", name: "Macchina", note: "Condensed slab E · compact equipment-badge presence", file: "04-macchina.svg" },
  { number: "05", name: "Rotonda", note: "Circular field · warm geometry · hospitality leaning", file: "05-rotonda.svg" },
  { number: "06", name: "Stemma", note: "Shielded E · established provenance · formal authority", file: "06-stemma.svg" },
  { number: "07", name: "Binario", note: "Monoline tracks · engineered rhythm · lighter expression", file: "07-binario.svg" },
  { number: "08", name: "Avanti", note: "E and forward signal combined · closest bridge to the current mark", file: "08-avanti.svg" },
] as const;

export default function LettermarkStudies() {
  return (
    <main className="marks-page lettermarks-page">
      <header className="marks-header">
        <div>
          <p>Identity study / 04</p>
          <h1>Ectropa lettermark alternatives</h1>
        </div>
        <a href="/">Return to website</a>
      </header>

      <p className="marks-intro">
        Eight new E constructions informed by Italian industrial lettering: generous curves,
        purposeful apertures, and the confidence of a cast metal machine badge. The aim is
        character and provenance—not imitation.
      </p>

      <section className="officina-wordmark" aria-labelledby="officina-heading">
        <div className="officina-wordmark-meta">
          <span>01 / Full name</span>
          <div>
            <h2 id="officina-heading">Officina wordmark</h2>
            <p>Custom lowercase companion · softened machinery · narrow counters</p>
          </div>
        </div>
        <div className="officina-wordmark-stage">
          <img src="/lettermarks/officina-wordmark.svg" alt="Ectropa set in the custom Officina lettering" />
        </div>
      </section>

      <section className="marks-grid" aria-label="Numbered Ectropa lettermark alternatives">
        {lettermarks.map((mark) => (
          <article className={`mark-card${"recommended" in mark && mark.recommended ? " recommended" : ""}`} key={mark.number}>
            <div className="mark-meta">
              <span>{mark.number}</span>
              <div>
                <h2>{mark.name}</h2>
                <p>{mark.note}</p>
              </div>
              {"recommended" in mark && mark.recommended && <em>Recommended</em>}
            </div>
            <div className="mark-stage lettermark-stage">
              <img className="mark-large" src={`/lettermarks/${mark.file}`} alt={`Ectropa lettermark ${mark.number}: ${mark.name}`} />
              <div className="mark-scale">
                <img src={`/lettermarks/${mark.file}`} alt="" aria-hidden="true" />
                <span>32 px</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="study-rationale">
        <p>Design reading</p>
        <h2>Warm engineering, not nostalgia.</h2>
        <div>
          <p><strong>01 Officina</strong> is the clearest lead: distinctive, scalable, and naturally compatible with the existing restrained wordmark.</p>
          <p><strong>08 Avanti</strong> is the safer evolutionary route: it converts the current forward-arrow equity into a legible E.</p>
          <p>The terracotta presentation nods to the reference only. The geometry is designed to work in Ectropa’s existing black-and-paper palette.</p>
        </div>
      </aside>

      <footer className="marks-footer">
        <span>Ectropa</span>
        <span>Lettermark study · 2026</span>
      </footer>
    </main>
  );
}
