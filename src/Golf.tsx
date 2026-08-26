export default function Golf() {
  return (
    <div className="golf-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header visible">
        <a href="/" className="wordmark" aria-label="Ectropa, back to home">
          Ectropa
        </a>
      </header>
      <main id="main">
        <section className="narrative-section philosophy">
          <div className="section-grid">
            <p className="kicker">Golf</p>
            <div>
              <h1 className="golf-heading">Golf</h1>
              <div className="prose">
                <p>
                  A quiet page, kept off the main site until there is more to say.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
