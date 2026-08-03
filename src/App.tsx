import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { siteContent as content } from "./content";

const sections = [
  { id: "opening", label: "Opening" },
  { id: "philosophy", label: "Philosophy" },
  { id: "holdings", label: "Holdings" },
  { id: "provenance", label: "Provenance" },
  { id: "contact", label: "Contact" },
] as const;

function Mark() {
  return (
    <img className="mark" src="/ectropa-mark.svg" alt="Ectropa" />
  );
}

function IndexPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="index-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site index"
        >
          <button className="index-close" onClick={onClose} autoFocus>
            Close <span aria-hidden="true">×</span>
          </button>
          <nav aria-label="Site sections">
            <p className="kicker">Index</p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={onClose}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="index-footer">{content.descriptor}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  return (
    <section id="opening" className="hero" aria-labelledby="hero-heading">
      <motion.div className="hero-media" style={{ scale: imageScale }}>
        {content.hero.image ? (
          <img src={content.hero.image} alt={content.hero.alt} fetchPriority="high" />
        ) : (
          <div className="hero-placeholder" role="img" aria-label={content.hero.alt}>
            <span>{content.hero.note}</span>
          </div>
        )}
      </motion.div>
      <div className="hero-shade" />
      <motion.div className="hero-copy" style={{ opacity: copyOpacity }}>
        <div className="hero-lockup">
          <Mark />
          <p>{content.company}</p>
        </div>
        <h1 id="hero-heading">{content.openingLine}</h1>
        <a className="enter-link" href="#philosophy">
          Enter <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
      <p className="hero-caption">
        {content.descriptor} <span aria-hidden="true">—</span> {content.year}
      </p>
    </section>
  );
}

function App() {
  const [indexOpen, setIndexOpen] = useState(false);
  const [pastOpening, setPastOpening] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastOpening(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={pastOpening ? "site-header visible" : "site-header"}>
        <a href="#opening" className="wordmark" aria-label="Ectropa, back to opening">
          {content.company}
        </a>
        <button className="index-button" onClick={() => setIndexOpen(true)} aria-expanded={indexOpen}>
          Index <span aria-hidden="true">+</span>
        </button>
      </header>
      <IndexPanel open={indexOpen} onClose={() => setIndexOpen(false)} />
      <Hero />
      <main id="main">
        <section id="philosophy" className="narrative-section philosophy">
          <div className="section-grid">
            <p className="kicker">{content.philosophy.eyebrow}</p>
            <div>
              <motion.h2 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }}>
                {content.philosophy.heading}
              </motion.h2>
              <div className="prose">
                {content.philosophy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="holdings" className="narrative-section holdings">
          <div className="section-grid holdings-intro">
            <p className="kicker">{content.holdings.eyebrow}</p>
            <h2>{content.holdings.heading}</h2>
          </div>
          <div className="domain-list">
            {content.holdings.domains.map((domain) => (
              <motion.article key={domain.number} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-12%" }}>
                <span>{domain.number}</span>
                <h3>{domain.title}</h3>
                <p>{domain.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="provenance" className="narrative-section provenance">
          <p className="kicker">{content.provenance.eyebrow}</p>
          <blockquote>{content.provenance.copy}</blockquote>
          <Mark />
        </section>

        <section id="contact" className="contact">
          <p className="kicker">Contact</p>
          <h2>{content.contact.heading}</h2>
          <p>{content.contact.invitation}</p>
          <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <footer>
            <span>© {new Date().getFullYear()} {content.company}</span>
            <a href="#opening">Return to opening ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}

export default App;
