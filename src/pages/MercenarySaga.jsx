import { useEffect } from "react";

export default function MercenarySaga() {
  useEffect(() => {
    document.title = "Mercenary Saga — Nightcloak Games";
  }, []);

  return (
    <>
      <style>{`
        :root {
          --midnight:      #0E0A14;
          --midnight-2:    #1A1428;
          --vellum:        #F3F0E8;
          --ink:           #1A1410;
          --wine:          #6B1F2D;
          --wine-deep:     #4a1620;
          --brass:         #B8924A;
          --brass-dim:     #8B6F3F;
          --serif-display: "IM Fell English SC", "EB Garamond", Georgia, serif;
          --serif-italic:  "IM Fell English", "EB Garamond", Georgia, serif;
          --serif-body:    "EB Garamond", Georgia, serif;
        }

        .ms-page { font-family: var(--serif-body); color: var(--ink); background: var(--vellum); line-height: 1.6; }
        .ms-page * { box-sizing: border-box; }

        /* ===================== HERO ===================== */
        .ms-hero {
          position: relative;
          min-height: 82vh;
          background:
            radial-gradient(ellipse at 50% 60%, rgba(184,146,74,0.16) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 30%, rgba(60,80,120,0.22) 0%, transparent 55%),
            linear-gradient(170deg, #0a0a14 0%, #1A1428 60%, #2a1f3a 100%);
          display: flex; align-items: center; justify-content: center;
          text-align: center; color: var(--vellum);
          padding: 6rem 2rem 8rem;
          overflow: hidden;
        }
        .ms-hero::before {
          content: "";
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%);
          pointer-events: none;
        }
        .ms-hero-content { position: relative; z-index: 2; max-width: 50rem; }
        .ms-hero-eyebrow {
          font-family: var(--serif-display);
          font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--brass); opacity: 0.85; margin-bottom: 1.5rem;
        }
        .ms-hero-title {
          font-family: var(--serif-display);
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          letter-spacing: 0.14em; line-height: 1; margin-bottom: 1rem;
          text-shadow: 0 2px 30px rgba(0,0,0,0.5);
        }
        .ms-hero-rule { width: 80px; height: 1px; background: var(--brass); opacity: 0.6; margin: 1.5rem auto; }
        .ms-hero-tagline {
          font-family: var(--serif-italic); font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.4rem); opacity: 0.85; margin-bottom: 2.5rem;
        }
        .ms-hero-status {
          display: inline-block; padding: 0.65rem 1.6rem;
          border: 1px solid rgba(184, 146, 74, 0.5);
          font-family: var(--serif-display);
          font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--brass);
        }
        .ms-hero-tear {
          position: absolute; bottom: -1px; left: 0; right: 0;
          width: 100%; height: 50px; transform: scaleY(-1); z-index: 3;
        }

        /* ===================== SECTIONS ===================== */
        .ms-section { padding: 5rem 2rem; }
        .ms-narrow { max-width: 36rem; margin: 0 auto; }
        .ms-wide   { max-width: 48rem; margin: 0 auto; }

        @media (max-width: 720px) {
          .ms-section { padding: 3.5rem 1.25rem; }
          .ms-hero    { padding: 4rem 1.25rem 6rem; min-height: 70vh; }
        }

        .ms-eyebrow {
          font-family: var(--serif-display);
          font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--wine); margin-bottom: 1rem; text-align: center;
        }
        .ms-eyebrow-rule {
          width: 36px; height: 1px; background: var(--wine);
          opacity: 0.4; margin: 0 auto 2rem;
        }

        /* ===================== PITCH ===================== */
        .ms-pitch { padding: 4rem 2rem 3rem; text-align: center; }
        .ms-pitch-body {
          font-family: var(--serif-italic); font-style: italic;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          line-height: 1.6; color: var(--ink); opacity: 0.9;
        }
        .ms-pitch-body em { color: var(--wine); font-style: italic; font-weight: normal; }

        /* ===================== SETUP ===================== */
        .ms-setup-title {
          font-family: var(--serif-display);
          font-size: clamp(1.6rem, 3.2vw, 2.2rem);
          letter-spacing: 0.08em; text-align: center; margin-bottom: 2rem;
        }
        .ms-setup-body p {
          font-family: var(--serif-body);
          font-size: 1.15rem; line-height: 1.75;
          margin-bottom: 1.25rem; color: var(--ink); opacity: 0.9;
        }
        .ms-setup-body p:last-child { margin-bottom: 0; }
        .ms-setup-body em {
          font-family: var(--serif-italic); font-style: italic; color: var(--wine);
        }

        /* ===================== HOW IT PLAYS ===================== */
        .ms-howitplays {
          background: rgba(26, 20, 16, 0.03);
          border-top: 1px solid rgba(26, 20, 16, 0.08);
          border-bottom: 1px solid rgba(26, 20, 16, 0.08);
        }
        .ms-howitplays-title {
          font-family: var(--serif-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          letter-spacing: 0.08em; text-align: center; margin-bottom: 1.5rem;
        }
        .ms-howitplays-intro {
          font-family: var(--serif-body);
          font-size: 1.1rem; line-height: 1.75; text-align: center;
          margin-bottom: 3rem; opacity: 0.85;
        }
        .ms-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 720px) { .ms-stats { grid-template-columns: 1fr; gap: 1.25rem; } }
        .ms-stat {
          padding: 1.5rem;
          border: 1px solid rgba(26, 20, 16, 0.12);
          background: rgba(255, 255, 255, 0.4);
        }
        .ms-stat-label {
          font-family: var(--serif-display);
          font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--wine); margin-bottom: 0.6rem;
        }
        .ms-stat-body {
          font-family: var(--serif-body);
          font-size: 1rem; line-height: 1.6; opacity: 0.88;
        }

        /* ===================== CHAPTERS ===================== */
        .ms-chapters-title {
          font-family: var(--serif-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          letter-spacing: 0.08em; text-align: center; margin-bottom: 1rem;
        }
        .ms-chapters-intro {
          font-family: var(--serif-italic); font-style: italic;
          font-size: 1.1rem; text-align: center;
          margin-bottom: 3rem; opacity: 0.7;
        }
        .ms-chapter {
          padding: 1.75rem 0;
          border-top: 1px solid rgba(26, 20, 16, 0.12);
        }
        .ms-chapter:last-of-type { border-bottom: 1px solid rgba(26, 20, 16, 0.12); }
        .ms-chapter-head {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 1rem; margin-bottom: 0.6rem; flex-wrap: wrap;
        }
        .ms-chapter-name {
          font-family: var(--serif-display);
          font-size: 1.3rem; letter-spacing: 0.08em;
        }
        .ms-chapter-name .num { color: var(--wine); opacity: 0.7; margin-right: 0.6rem; }
        .ms-chapter-status {
          font-family: var(--serif-display);
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--ink); opacity: 0.5;
        }
        .ms-chapter-status.available { color: var(--wine); opacity: 0.95; }
        .ms-chapter-body {
          font-family: var(--serif-body);
          font-size: 1.05rem; line-height: 1.65; opacity: 0.85;
        }

        /* ===================== CTAs ===================== */
        .ms-cta-row {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
          margin-top: 3rem;
        }
        .ms-cta {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 1rem 2rem;
          background: var(--wine); color: var(--vellum); text-decoration: none;
          border: 1px solid var(--wine-deep);
          font-family: var(--serif-display);
          font-size: 0.72rem; letter-spacing: 0.3em; text-transform: uppercase;
          transition: background 0.2s;
        }
        .ms-cta:hover { background: var(--wine-deep); }
        .ms-cta .arrow { transition: transform 0.2s; }
        .ms-cta:hover .arrow { transform: translateX(3px); }
        .ms-cta.ghost {
          background: transparent; color: var(--wine);
          border-color: rgba(107, 31, 45, 0.4);
        }
        .ms-cta.ghost:hover { background: rgba(107, 31, 45, 0.06); }

        /* ===================== PARTICULARS ===================== */
        .ms-particulars {
          background: var(--midnight); color: var(--vellum);
          padding: 4rem 2rem 5rem; text-align: center; position: relative;
        }
        .ms-particulars-tear {
          position: absolute; top: -1px; left: 0; right: 0;
          width: 100%; height: 30px; transform: scaleY(-1); z-index: 3;
        }
        .ms-particulars-eyebrow {
          font-family: var(--serif-display);
          font-size: 0.7rem; letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--brass); opacity: 0.75; margin-bottom: 2rem;
        }
        .ms-particulars-grid {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 2.5rem 3rem; max-width: 42rem; margin: 0 auto;
        }
        .ms-particular-label {
          font-family: var(--serif-display);
          font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase;
          opacity: 0.5; margin-bottom: 0.4rem;
        }
        .ms-particular-value {
          font-family: var(--serif-italic); font-style: italic;
          font-size: 1.2rem;
        }
      `}</style>

      {/* Torn paper pattern — same as Home.jsx, scoped within this page */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <pattern id="ms-tear-vellum" width="220" height="50"
                   patternUnits="userSpaceOnUse"
                   viewBox="0 0 134.3 36.57"
                   preserveAspectRatio="none">
            <polygon fill="#F3F0E8" points="0 0 0 22.67 .77 23.14 2.98 22.93 4.74 23.36 6.56 23.07 8.39 22.77 9.86 23.46 11.33 23.36 12.77 23.68 14.28 23.27 15.68 24.11 17.07 24.52 18.38 25.25 20.16 25.18 21.23 26.65 23.22 25.55 24.39 27.44 25.85 27.82 27.41 27.84 28.72 28.43 27.52 29.73 28.84 30.74 30.16 31.36 31.48 32.91 33.14 33.62 34.96 32.87 36.67 32.92 38.36 33.72 40.03 32.43 41.72 33.25 43.16 32.05 44.9 32.51 46.65 32.74 48.03 31.61 49.41 30.46 51.02 30.1 52.86 30.99 54.44 30.91 56.01 30.21 57.72 30.16 58.93 28.8 60.64 28.63 62.09 27.89 63.12 26.45 64.5 25.63 66.4 25.8 67.22 23.76 69.25 24.64 70.44 22.85 72.18 23.66 73.68 22.41 75.44 23.64 76.92 22.56 78.57 22.76 80.18 22.79 81.75 22.41 83.34 22.33 85.01 22.78 86.67 23.06 88.35 23.17 90.06 22.9 91.77 22.69 93.49 22.43 95.01 22.87 96.56 23.39 98.14 23.05 99.71 23.19 101.27 23.4 102.78 23.85 104.4 23.75 105.69 24.93 107.31 25.38 109.02 25.3 110.79 24.29 112.64 24.21 114.42 25.11 116.12 25.16 117.87 24.76 119.49 25.25 121.1 26.04 122.8 25.66 124.46 25.63 126.24 26.48 127.64 25.12 129.17 24.67 130.92 25.62 132.43 24.5 134.08 24.53 134.3 24.7 134.3 0 0 0"/>
          </pattern>
          <pattern id="ms-tear-midnight" width="220" height="30"
                   patternUnits="userSpaceOnUse"
                   viewBox="0 0 134.3 36.57"
                   preserveAspectRatio="none">
            <polygon fill="#0E0A14" points="0 0 0 22.67 .77 23.14 2.98 22.93 4.74 23.36 6.56 23.07 8.39 22.77 9.86 23.46 11.33 23.36 12.77 23.68 14.28 23.27 15.68 24.11 17.07 24.52 18.38 25.25 20.16 25.18 21.23 26.65 23.22 25.55 24.39 27.44 25.85 27.82 27.41 27.84 28.72 28.43 27.52 29.73 28.84 30.74 30.16 31.36 31.48 32.91 33.14 33.62 34.96 32.87 36.67 32.92 38.36 33.72 40.03 32.43 41.72 33.25 43.16 32.05 44.9 32.51 46.65 32.74 48.03 31.61 49.41 30.46 51.02 30.1 52.86 30.99 54.44 30.91 56.01 30.21 57.72 30.16 58.93 28.8 60.64 28.63 62.09 27.89 63.12 26.45 64.5 25.63 66.4 25.8 67.22 23.76 69.25 24.64 70.44 22.85 72.18 23.66 73.68 22.41 75.44 23.64 76.92 22.56 78.57 22.76 80.18 22.79 81.75 22.41 83.34 22.33 85.01 22.78 86.67 23.06 88.35 23.17 90.06 22.9 91.77 22.69 93.49 22.43 95.01 22.87 96.56 23.39 98.14 23.05 99.71 23.19 101.27 23.4 102.78 23.85 104.4 23.75 105.69 24.93 107.31 25.38 109.02 25.3 110.79 24.29 112.64 24.21 114.42 25.11 116.12 25.16 117.87 24.76 119.49 25.25 121.1 26.04 122.8 25.66 124.46 25.63 126.24 26.48 127.64 25.12 129.17 24.67 130.92 25.62 132.43 24.5 134.08 24.53 134.3 24.7 134.3 0 0 0"/>
          </pattern>
        </defs>
      </svg>

      <div className="ms-page">

        {/* ============ HERO ============ */}
        <header className="ms-hero">
          <div className="ms-hero-content">
            <div className="ms-hero-eyebrow">The Games · Nightcloak</div>
            <h1 className="ms-hero-title">Mercenary&nbsp;Saga</h1>
            <div className="ms-hero-rule"></div>
            <p className="ms-hero-tagline">You left with his son. You're going to have to explain that.</p>
            <div className="ms-hero-status">Chapter I — Available Now</div>
          </div>
          <svg className="ms-hero-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#ms-tear-vellum)"/>
          </svg>
        </header>

        {/* ============ PITCH ============ */}
        <section className="ms-section ms-pitch">
          <div className="ms-narrow">
            <div className="ms-eyebrow">The Pitch</div>
            <div className="ms-eyebrow-rule"></div>
            <p className="ms-pitch-body">
              A chapter-based saga of <em>impossible bargains, hard roads,</em> and the kind of mistakes that take years to walk back.
            </p>
          </div>
        </section>

        {/* ============ SETUP ============ */}
        <section className="ms-section">
          <div className="ms-narrow">
            <h2 className="ms-setup-title">The Setup</h2>
            <div className="ms-setup-body">
              <p>You worked for Valdris six years. Long enough to learn what he does to people who leave. Long enough to have done some of it yourself.</p>
              <p>Two nights ago you left. Edric &mdash; <em>seventeen, capable, Valdris's son</em> &mdash; came with you. By morning, his father will know.</p>
              <p>Ahead, the road splits. The borderlands begin. Whatever you're going to build, you build from here.</p>
            </div>
          </div>
        </section>

        {/* ============ HOW IT PLAYS ============ */}
        <section className="ms-section ms-howitplays">
          <div className="ms-wide">
            <h2 className="ms-howitplays-title">How It Plays</h2>
            <p className="ms-howitplays-intro">
              Each turn you arrive somewhere. A plague town. A monastery out of brothers. A toll bridge held by men with no other prospects. You choose what to do. The choice costs something.
            </p>
            <div className="ms-stats">
              <div className="ms-stat">
                <div className="ms-stat-label">Crew</div>
                <div className="ms-stat-body">The people who follow you. Spent in fights. Recovered slowly, if at all.</div>
              </div>
              <div className="ms-stat">
                <div className="ms-stat-label">Gold</div>
                <div className="ms-stat-body">What keeps a company moving. Spent on choices. Earned by harder ones.</div>
              </div>
              <div className="ms-stat">
                <div className="ms-stat-label">Reputation</div>
                <div className="ms-stat-body">What the world thinks of you. Fugitives, then mercenaries &mdash; eventually, perhaps, something better.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CHAPTERS ============ */}
        <section className="ms-section">
          <div className="ms-wide">
            <h2 className="ms-chapters-title">The Saga</h2>
            <p className="ms-chapters-intro">Told one chapter at a time. The first is finished. More are coming.</p>

            <div className="ms-chapter">
              <div className="ms-chapter-head">
                <div className="ms-chapter-name"><span className="num">I.</span>The Road to Veldmark</div>
                <span className="ms-chapter-status available">Available</span>
              </div>
              <p className="ms-chapter-body">
                The first road. The first choices. Eight chosen, sixteen gold, no reputation &mdash; and a man on your trail who taught you how to hunt.
              </p>
            </div>

            <div className="ms-chapter">
              <div className="ms-chapter-head">
                <div className="ms-chapter-name"><span className="num">II.</span>The Veldmark Holdings</div>
                <span className="ms-chapter-status">In Development</span>
              </div>
              <p className="ms-chapter-body">
                You arrive somewhere. You have to hold it. Or sell it. Or leave it behind. The road keeps going. So does the saga.
              </p>
            </div>

            <div className="ms-cta-row">
              <a href="/mercenary-saga/play" className="ms-cta">
                Play in your browser <span className="arrow">&rarr;</span>
              </a>
              <a href="https://nightcloak-games.itch.io/mercenary-saga" target="_blank" rel="noopener" className="ms-cta ghost">
                Find it on itch.io
              </a>
            </div>
          </div>
        </section>

        {/* ============ PARTICULARS ============ */}
        <section className="ms-particulars">
          <svg className="ms-particulars-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#ms-tear-midnight)"/>
          </svg>
          <div className="ms-particulars-eyebrow">Particulars</div>
          <div className="ms-particulars-grid">
            <div>
              <div className="ms-particular-label">Players</div>
              <div className="ms-particular-value">Solo</div>
            </div>
            <div>
              <div className="ms-particular-label">Format</div>
              <div className="ms-particular-value">Browser</div>
            </div>
            <div>
              <div className="ms-particular-label">Time</div>
              <div className="ms-particular-value">~30 min</div>
            </div>
            <div>
              <div className="ms-particular-label">Chapter</div>
              <div className="ms-particular-value">I, ongoing</div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
