const refinements = [
  { number: "03A", name: "Quiet", note: "Same geometry · slightly lighter frame and arrows", file: "03a-quiet.svg" },
  { number: "03B", name: "Firm", note: "Same geometry · subtly stronger construction", file: "03b-firm.svg" },
  { number: "03C", name: "Selected reference", note: "Unchanged No. 03 · baseline for comparison", file: "03c-reference.svg" },
  { number: "03D", name: "More air", note: "Fractionally larger field · slightly more perimeter clearance", file: "03d-more-air.svg" },
  { number: "03E", name: "Closer frame", note: "Fractionally smaller field · more compact presence", file: "03e-closer-frame.svg" },
  { number: "03F", name: "Even rhythm", note: "Optically regularized spacing between arrow forms", file: "03f-even-rhythm.svg" },
  { number: "03G", name: "Progressive", note: "More measured progression from small to large arrow", file: "03g-progressive.svg" },
  { number: "03H", name: "Optical balance", note: "Fine clearance and weight corrections for large and small use", file: "03h-optical.svg", recommended: true },
] as const;

export default function MarkRefinementStudies() {
  return (
    <main className="marks-page">
      <header className="marks-header">
        <div>
          <p>Identity study / 03</p>
          <h1>No. 03 refinements</h1>
        </div>
        <a href="/?view=marks">Return to first study</a>
      </header>

      <p className="marks-intro">
        A close second round around the selected Balanced direction. Differences are intentionally subtle;
        compare the outer field, the progression of the arrows, and performance at 32 pixels.
      </p>

      <section className="marks-grid" aria-label="Number 03 mark refinements">
        {refinements.map((mark) => (
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
              <img className="mark-large" src={`/marks/refinements/${mark.file}`} alt={`Ectropa mark ${mark.number}: ${mark.name}`} />
              <div className="mark-scale">
                <img src={`/marks/refinements/${mark.file}`} alt="" aria-hidden="true" />
                <span>32 px</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="marks-footer">
        <span>Ectropa</span>
        <span>Mark refinement study · 2011—</span>
      </footer>
    </main>
  );
}
