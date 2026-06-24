import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Nightcloak Games — Small games for long nights";
  }, []);

  return (
    <>
      <style>{`
  :root {
    --midnight:      #0E0A14;
    --midnight-2:    #1A1428;
    --vellum:        #F3F0E8;
    --vellum-dim:    #E8E1D3;
    --ink:           #1A1410;
    --wine:          #6B1F2D;
    --wine-deep:     #4a1620;
    --brass:         #B8924A;
    --brass-dim:     #8B6F3F;

    --serif-display: "IM Fell English SC", "EB Garamond", Georgia, serif;
    --serif-italic:  "IM Fell English", "EB Garamond", Georgia, serif;
    --serif-body:    "EB Garamond", Georgia, serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--serif-body);
    color: var(--ink);
    background: var(--vellum);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }

  /* ============ HERO ============ */
  .hero {
    position: relative;
    min-height: 92vh;
    background:
      radial-gradient(ellipse at 50% 45%, rgba(184, 146, 74, 0.10) 0%, transparent 55%),
      radial-gradient(ellipse at 50% 100%, rgba(107, 31, 45, 0.28) 0%, transparent 60%),
      linear-gradient(180deg, var(--midnight) 0%, var(--midnight-2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--vellum);
    padding: 6rem 2rem 9rem;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 15% 30%, rgba(255,255,255,0.04) 0%, transparent 35%),
      radial-gradient(circle at 85% 70%, rgba(255,255,255,0.03) 0%, transparent 35%),
      radial-gradient(circle at 75% 20%, rgba(184,146,74,0.05) 0%, transparent 30%);
    pointer-events: none;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 50rem;
  }
  .hero-sigil { margin: 0 auto 2rem; width: 56px; height: 56px; opacity: 0.92; }
  .hero-name {
    font-family: var(--serif-display);
    font-size: clamp(2.6rem, 7vw, 5.5rem);
    letter-spacing: 0.14em;
    line-height: 1;
    color: var(--vellum);
    margin-bottom: 1.25rem;
  }
  .hero-tagline {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: clamp(1.15rem, 2.3vw, 1.5rem);
    color: var(--vellum);
    opacity: 0.82;
    margin-bottom: 2rem;
  }
  .hero-tagline-rule { width: 60px; height: 1px; background: var(--brass); opacity: 0.6; margin: 0 auto 2rem; }
  .hero-intro {
    font-family: var(--serif-body);
    font-size: clamp(1rem, 1.4vw, 1.125rem);
    color: var(--vellum);
    opacity: 0.7;
    max-width: 32rem;
    margin: 0 auto;
    line-height: 1.7;
  }
  .hero-cta {
    margin-top: 2.5rem;
    display: inline-block;
    padding: 0.9rem 2.25rem;
    background: transparent;
    color: var(--vellum);
    border: 1px solid var(--brass-dim);
    font-family: var(--serif-display);
    font-size: 0.75rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .hero-cta:hover { background: rgba(184, 146, 74, 0.1); border-color: var(--brass); }

  .hero-tear {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    transform: scaleY(-1);
    z-index: 3;
    display: block;
  }

  /* ============ COMMON SECTION BITS ============ */
  section { padding: 6rem 2rem; }
  @media (max-width: 720px) { section { padding: 4rem 1.25rem; } }

  .container-narrow { max-width: 38rem; margin: 0 auto; }

  .eyebrow {
    font-family: var(--serif-display);
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--wine);
    margin-bottom: 1rem;
    text-align: center;
  }
  .eyebrow-rule {
    width: 36px;
    height: 1px;
    background: var(--wine);
    opacity: 0.4;
    margin: 0 auto 1.5rem;
  }

  /* ============ PHILOSOPHY ============ */
  .philosophy {
    padding-top: 5rem;
    padding-bottom: 4rem;
    text-align: center;
  }
  .philosophy-body {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    line-height: 1.65;
    color: var(--ink);
    opacity: 0.85;
  }
  .philosophy-body em { color: var(--wine); font-style: italic; font-weight: normal; }

  /* ============ GAME SPREADS — each game gets a full-width section ============ */

  .game-spread {
    position: relative;
    padding: 0;
  }

  /* HERO BAND — large painted-feel band per game */
  .spread-hero {
    position: relative;
    height: 70vh;
    min-height: 520px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    color: var(--vellum);
    overflow: hidden;
    padding: 0 2rem 7rem;
  }
  .spread-hero::before {
    /* atmospheric overlay — this is what would sit behind painted cover art */
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 45%),
      radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 35%);
    pointer-events: none;
  }
  .spread-hero-content {
    position: relative;
    z-index: 2;
    max-width: 50rem;
  }
  .spread-hero-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 1.5rem;
    opacity: 0.7;
    color: var(--vellum);
  }
  .spread-hero-title {
    font-family: var(--serif-display);
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    letter-spacing: 0.16em;
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 0 2px 30px rgba(0,0,0,0.5);
  }
  .spread-hero-rule {
    width: 80px;
    height: 1px;
    background: var(--brass);
    opacity: 0.7;
    margin: 0 auto 1.25rem;
  }
  .spread-hero-subtitle {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: clamp(1.05rem, 1.7vw, 1.3rem);
    opacity: 0.85;
    text-shadow: 0 1px 15px rgba(0,0,0,0.5);
  }
  .spread-hero-placeholder-label {
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    z-index: 2;
    font-family: var(--serif-display);
    font-size: 0.55rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--vellum);
    opacity: 0.25;
  }
  .spread-tear {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    transform: scaleY(-1);
    z-index: 3;
  }

  /* PER-GAME HERO TINTS */
  .spread-hero.kingsman {
    background:
      radial-gradient(ellipse at 50% 60%, rgba(184,146,74,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 30%, rgba(138,44,60,0.3) 0%, transparent 55%),
      linear-gradient(170deg, rgba(42,20,24,0.78) 0%, rgba(107,31,45,0.55) 55%, rgba(58,15,23,0.78) 100%),
      url("/kingsman-hero.png");
    background-size: cover, cover, cover, cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .spread-hero.assassin {
    background:
      radial-gradient(ellipse at 70% 40%, rgba(60,80,120,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 70%, rgba(74,22,32,0.3) 0%, transparent 55%),
      linear-gradient(170deg, #0a0a14 0%, #1A1428 60%, #2a1f3a 100%);
  }
  .spread-hero.wizard {
    background:
      radial-gradient(ellipse at 50% 50%, rgba(184,146,74,0.18) 0%, transparent 45%),
      radial-gradient(ellipse at 80% 20%, rgba(120,80,180,0.3) 0%, transparent 50%),
      linear-gradient(170deg, #1f1a3a 0%, #3a2a6a 50%, #1a1428 100%);
  }
  .spread-hero.tavern {
    background:
      radial-gradient(ellipse at 50% 70%, rgba(255,200,120,0.18) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 30%, rgba(184,146,74,0.25) 0%, transparent 55%),
      linear-gradient(170deg, rgba(42,24,16,0.82) 0%, rgba(58,36,24,0.55) 45%, rgba(42,24,16,0.82) 100%),
      url("/tavern-hero.jpg");
    background-size: cover, cover, cover, cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* INFO BAND — the cream zone below the hero */
  .spread-info {
    padding: 5rem 2rem 6rem;
    background: var(--vellum);
  }
  @media (max-width: 720px) {
    .spread-info { padding: 3rem 1.25rem 4rem; }
    .spread-hero { height: auto; min-height: 60vh; padding: 5rem 1.25rem 5rem; }
    .spread-hero-content { max-width: 100%; }
  }

  .spread-info-inner {
    max-width: 64rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 720px) {
    .spread-info-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  /* alternating layout for variety — every other game flips */
  .game-spread.flipped .spread-info-inner > .spread-art { order: 2; }
  .game-spread.flipped .spread-info-inner > .spread-text { order: 1; }
  @media (max-width: 720px) {
    .game-spread.flipped .spread-info-inner > .spread-art,
    .game-spread.flipped .spread-info-inner > .spread-text { order: initial; }
  }

  /* the painted-character placeholder in the info band */
  .spread-art {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border: 1px solid rgba(26, 20, 16, 0.08);
  }
  .spread-art::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 50%);
    pointer-events: none;
  }
  .spread-art-icon {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    color: var(--vellum);
    opacity: 0.5;
    z-index: 2;
  }
  .spread-art-placeholder-label {
    position: absolute;
    bottom: 1rem; left: 1rem;
    font-family: var(--serif-display);
    font-size: 0.55rem;
    letter-spacing: 0.32em;
    color: var(--vellum);
    opacity: 0.4;
    z-index: 2;
  }
  /* When the portrait slot holds a real screenshot or painting, drop the
     placeholder framing and let the image dictate height. */
  .spread-art.has-image {
    aspect-ratio: auto;
    background: transparent;
    border: none;
    overflow: visible;
  }
  .spread-art.has-image::before { display: none; }
  .spread-art-img {
    display: block;
    width: 100%;
    height: auto;
    box-shadow: 0 14px 44px rgba(26, 20, 16, 0.18);
  }


  /* per-game art tints */
  .spread-art.kingsman { background: linear-gradient(170deg, #2a1418 0%, #6B1F2D 60%, #3a0f17 100%); }
  .spread-art.assassin { background: linear-gradient(170deg, #0a0a14 0%, #1A1428 60%, #2a1f3a 100%); }
  .spread-art.wizard   { background: linear-gradient(170deg, #1f1a3a 0%, #3a2a6a 55%, #1a1428 100%); }
  .spread-art.tavern   { background: linear-gradient(170deg, #2a1810 0%, #6B4A28 55%, #3a2418 100%); }

  /* the text column inside the info band */
  .spread-text { max-width: 36rem; }

  .spread-text-eyebrow {
    font-family: var(--serif-display);
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--wine);
    margin-bottom: 1rem;
  }
  .spread-text-eyebrow .rule-inline {
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--wine);
    vertical-align: middle;
    margin-right: 0.85rem;
    opacity: 0.5;
  }
  .spread-text-title {
    font-family: var(--serif-display);
    font-size: clamp(2rem, 4vw, 2.8rem);
    letter-spacing: 0.08em;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 0.5rem;
  }
  .spread-text-subtitle {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
    opacity: 0.55;
    margin-bottom: 2.5rem;
  }

  .spread-section-label {
    font-family: var(--serif-display);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 0.75rem;
    margin-top: 2rem;
  }
  .spread-section-label:first-of-type { margin-top: 0; }

  .spread-section-body {
    font-family: var(--serif-body);
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--ink);
    opacity: 0.85;
  }
  .spread-section-body em {
    font-style: italic;
    color: var(--wine);
  }

  /* facts row — like an ability strip */
  .spread-facts {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem 2rem;
    margin-top: 2.5rem;
    padding: 1.75rem 0;
    border-top: 1px solid rgba(26, 20, 16, 0.1);
    border-bottom: 1px solid rgba(26, 20, 16, 0.1);
  }
  .spread-fact {
    flex: 1;
    min-width: 95px;
  }
  .spread-fact-label {
    font-family: var(--serif-display);
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0.5;
    margin-bottom: 0.4rem;
  }
  .spread-fact-value {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: 1.1rem;
    color: var(--ink);
  }

  /* CTA row */
  .spread-cta-row {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .spread-status {
    font-family: var(--serif-display);
    font-size: 0.7rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ink);
    opacity: 0.45;
  }
  .spread-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.75rem;
    background: var(--wine);
    color: var(--vellum);
    text-decoration: none;
    border: 1px solid var(--wine-deep);
    font-family: var(--serif-display);
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    transition: background 0.2s;
  }
  .spread-cta:hover { background: var(--wine-deep); }
  .spread-cta .arrow { transition: transform 0.2s; }
  .spread-cta:hover .arrow { transform: translateX(3px); }

  .spread-cta.ghost {
    background: transparent;
    color: var(--wine);
    border-color: rgba(107, 31, 45, 0.4);
  }
  .spread-cta.ghost:hover { background: rgba(107, 31, 45, 0.08); }

  /* subtle visual reset between spreads */
  .game-spread + .game-spread .spread-hero {
    border-top: 1px solid rgba(0,0,0,0.2);
  }

  /* ============ MANIFESTO ============ */
  .manifesto {
    background: var(--vellum);
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
  .manifesto-body p {
    font-family: var(--serif-body);
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }
  .manifesto-body p:last-child { margin-bottom: 0; }
  .manifesto-signature {
    margin-top: 3rem;
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--ink);
    opacity: 0.55;
  }

  /* ============ FOOTER ============ */
  .footer {
    background: var(--midnight);
    color: var(--vellum);
    padding: 5rem 2rem 3rem;
    position: relative;
  }
  .footer-tear {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
    transform: scaleY(-1);
    z-index: 3;
  }
  .footer-inner { max-width: 50rem; margin: 0 auto; text-align: center; }
  .footer-sigil { width: 40px; height: 40px; margin: 0 auto 1.5rem; opacity: 0.7; }
  .footer-name {
    font-family: var(--serif-display);
    font-size: 1rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    opacity: 0.85;
  }
  .footer-newsletter-label {
    font-family: var(--serif-italic);
    font-style: italic;
    font-size: 1rem;
    opacity: 0.65;
    margin-bottom: 1.5rem;
  }
  .footer-newsletter {
    display: flex;
    max-width: 24rem;
    margin: 0 auto 3rem;
    border: 1px solid var(--brass-dim);
  }
  .footer-newsletter input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0.85rem 1rem;
    color: var(--vellum);
    font-family: var(--serif-body);
    font-size: 0.95rem;
    outline: none;
  }
  .footer-newsletter input::placeholder { color: rgba(243,240,232,0.4); }
  .footer-newsletter button {
    background: transparent;
    border: none;
    border-left: 1px solid var(--brass-dim);
    color: var(--brass);
    padding: 0 1.25rem;
    font-family: var(--serif-display);
    font-size: 0.7rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .footer-newsletter button:hover { background: rgba(184, 146, 74, 0.1); }
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .footer-links a {
    color: var(--vellum);
    opacity: 0.5;
    text-decoration: none;
    font-family: var(--serif-display);
    font-size: 0.65rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    transition: opacity 0.2s;
  }
  .footer-links a:hover { opacity: 1; }
  .footer-copyright {
    font-family: var(--serif-body);
    font-size: 0.8rem;
    opacity: 0.4;
    font-style: italic;
  }
`}</style>
<svg width="0" height="0" style={{position: "absolute"}} aria-hidden="true">
  <defs>
    <pattern id="tear-vellum-pattern" width="220" height="50"
             patternUnits="userSpaceOnUse"
             viewBox="0 0 134.3 36.57"
             preserveAspectRatio="none">
      <polygon fill="#F3F0E8" points="0 0 0 22.67 .77 23.14 2.98 22.93 4.74 23.36 6.56 23.07 8.39 22.77 9.86 23.46 11.33 23.36 12.77 23.68 14.28 23.27 15.68 24.11 17.07 24.52 18.38 25.25 20.16 25.18 21.23 26.65 23.22 25.55 24.39 27.44 25.85 27.82 27.41 27.84 28.72 28.43 27.52 29.73 28.84 30.74 30.16 31.36 31.48 32.91 33.14 33.62 34.96 32.87 36.67 32.92 38.36 33.72 40.03 32.43 41.72 33.25 43.16 32.05 44.9 32.51 46.65 32.74 48.03 31.61 49.41 30.46 51.02 30.1 52.86 30.99 54.44 30.91 56.01 30.21 57.72 30.16 58.93 28.8 60.64 28.63 62.09 27.89 63.12 26.45 64.5 25.63 66.4 25.8 67.22 23.76 69.25 24.64 70.44 22.85 72.18 23.66 73.68 22.41 75.44 23.64 76.92 22.56 78.57 22.76 80.18 22.79 81.75 22.41 83.34 22.33 85.01 22.78 86.67 23.06 88.35 23.17 90.06 22.9 91.77 22.69 93.49 22.43 95.01 22.87 96.56 23.39 98.14 23.05 99.71 23.19 101.27 23.4 102.78 23.85 104.4 23.75 105.69 24.93 107.31 25.38 109.02 25.3 110.79 24.29 112.64 24.21 114.42 25.11 116.12 25.16 117.87 24.76 119.49 25.25 121.1 26.04 122.8 25.66 124.46 25.63 126.24 26.48 127.64 25.12 129.17 24.67 130.92 25.62 132.43 24.5 134.08 24.53 134.3 24.7 134.3 0 0 0"/>
    </pattern>
    <pattern id="tear-midnight-pattern" width="220" height="30"
             patternUnits="userSpaceOnUse"
             viewBox="0 0 134.3 36.57"
             preserveAspectRatio="none">
      <polygon fill="#0E0A14" points="0 0 0 22.67 .77 23.14 2.98 22.93 4.74 23.36 6.56 23.07 8.39 22.77 9.86 23.46 11.33 23.36 12.77 23.68 14.28 23.27 15.68 24.11 17.07 24.52 18.38 25.25 20.16 25.18 21.23 26.65 23.22 25.55 24.39 27.44 25.85 27.82 27.41 27.84 28.72 28.43 27.52 29.73 28.84 30.74 30.16 31.36 31.48 32.91 33.14 33.62 34.96 32.87 36.67 32.92 38.36 33.72 40.03 32.43 41.72 33.25 43.16 32.05 44.9 32.51 46.65 32.74 48.03 31.61 49.41 30.46 51.02 30.1 52.86 30.99 54.44 30.91 56.01 30.21 57.72 30.16 58.93 28.8 60.64 28.63 62.09 27.89 63.12 26.45 64.5 25.63 66.4 25.8 67.22 23.76 69.25 24.64 70.44 22.85 72.18 23.66 73.68 22.41 75.44 23.64 76.92 22.56 78.57 22.76 80.18 22.79 81.75 22.41 83.34 22.33 85.01 22.78 86.67 23.06 88.35 23.17 90.06 22.9 91.77 22.69 93.49 22.43 95.01 22.87 96.56 23.39 98.14 23.05 99.71 23.19 101.27 23.4 102.78 23.85 104.4 23.75 105.69 24.93 107.31 25.38 109.02 25.3 110.79 24.29 112.64 24.21 114.42 25.11 116.12 25.16 117.87 24.76 119.49 25.25 121.1 26.04 122.8 25.66 124.46 25.63 126.24 26.48 127.64 25.12 129.17 24.67 130.92 25.62 132.43 24.5 134.08 24.53 134.3 24.7 134.3 0 0 0"/>
    </pattern>
  </defs>
</svg>


{/* ============ NAV ============ */}

{/* ============ HERO ============ */}
<header className="hero">
  <div className="hero-content">
    <svg className="hero-sigil" viewBox="0 0 64 64" fill="none" stroke="#B8924A" stroke-width="1.1" aria-hidden="true">
      <path d="M44 18 a 14 14 0 1 0 0 28 a 11 11 0 1 1 0 -28 z" />
      <path d="M32 52 l 3 -5 l 3 5 l -3 2 z" fill="#B8924A" opacity="0.6"/>
      <circle cx="35" cy="49" r="0.8" fill="#B8924A" />
    </svg>
    <h1 className="hero-name">Nightcloak&nbsp;Games</h1>
    <div className="hero-tagline-rule"></div>
    <p className="hero-tagline">Small games for long nights.</p>
    <p className="hero-intro">
      Tabletop role-playing games you can print, fold, and play tonight. A die, a pen, and a story worth the evening &mdash; nothing more required.
    </p>
    <a href="#kingsman" className="hero-cta">See the Games</a>
  </div>
  <svg className="hero-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-vellum-pattern)"/></svg>
</header>

{/* ============ PHILOSOPHY ============ */}
<section className="philosophy">
  <div className="container-narrow">
    <div className="eyebrow">On the Studio</div>
    <div className="eyebrow-rule"></div>
    <div className="philosophy-body">
      <p>We make small tabletop role-playing games &mdash; the kind you can <em>print, fold,</em> and play around a kitchen table the same night you find them.</p>
    </div>
  </div>
</section>


{/* ============ KINGSMAN ============ */}
<article className="game-spread" id="kingsman">
  <div className="spread-hero kingsman">
    <div className="spread-hero-content">
      <svg className="spread-hero-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M10 40 L 14 18 L 22 30 L 32 14 L 42 30 L 50 18 L 54 40 Z" />
        <line x1="10" y1="46" x2="54" y2="46" />
        <circle cx="32" cy="22" r="1.6" fill="currentColor"/>
      </svg>
      <h2 className="spread-hero-title">Kingsman</h2>
      <div className="spread-hero-rule"></div>
      <p className="spread-hero-subtitle">A game of crowns &amp; quiet counsel</p>
    </div>
    <svg className="spread-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-vellum-pattern)"/></svg>
  </div>
  <div className="spread-info">
    <div className="spread-info-inner">
      <div className="spread-art kingsman has-image">
        <img className="spread-art-img" src="/kingsman-mission.png" alt="The Rumor — a sample mission spread showing the city map and rules"/>
      </div>
      <div className="spread-text">
        <div className="spread-text-eyebrow"><span className="rule-inline"></span>The Games</div>
        <h3 className="spread-text-title">Kingsman</h3>
        <p className="spread-text-subtitle">A game of crowns &amp; quiet counsel</p>

        <div className="spread-section-label">The Lore</div>
        <p className="spread-section-body">
          The kingdom hangs by a thread. The king listens to no one but you &mdash; and you are tired in a way that doesn't sleep off. Each night, a courier arrives with a petition that cannot wait, and by morning your decision is law, signed or unsigned, regretted or not.
        </p>

        <div className="spread-section-label">What You Play</div>
        <p className="spread-section-body">
          A short campaign of impossible choices for <em>two to five players</em>. One advises. The others bring the petitions. A die settles what cannot be argued; a pen remembers what cannot be forgotten.
        </p>

        <div className="spread-facts">
          <div className="spread-fact">
            <div className="spread-fact-label">Players</div>
            <div className="spread-fact-value">2&ndash;5</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Format</div>
            <div className="spread-fact-value">Print &amp; play</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">You'll need</div>
            <div className="spread-fact-value">Die &amp; pen</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Time</div>
            <div className="spread-fact-value">3&ndash;5 nights</div>
          </div>
        </div>

        <div className="spread-cta-row">
          <span className="spread-status">In Development</span>
          <a href="#" className="spread-cta">Read more <span className="arrow">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</article>


{/* ============ ASSASSIN ============ */}
<article className="game-spread flipped" id="assassin">
  <div className="spread-hero assassin">
    <div className="spread-hero-content">
      <svg className="spread-hero-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M32 10 L 36 48 L 32 56 L 28 48 Z" />
        <line x1="22" y1="46" x2="42" y2="46" />
        <line x1="26" y1="50" x2="38" y2="50" />
      </svg>
      <h2 className="spread-hero-title">The Assassin</h2>
      <div className="spread-hero-rule"></div>
      <p className="spread-hero-subtitle">Solo. One target. One long night.</p>
    </div>
    <div className="spread-hero-placeholder-label">Cover Art</div>
    <svg className="spread-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-vellum-pattern)"/></svg>
  </div>
  <div className="spread-info">
    <div className="spread-info-inner">
      <div className="spread-art assassin">
        <svg className="spread-art-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path d="M32 10 L 36 48 L 32 56 L 28 48 Z" />
          <line x1="22" y1="46" x2="42" y2="46" />
          <line x1="26" y1="50" x2="38" y2="50" />
        </svg>
        <div className="spread-art-placeholder-label">Character Art</div>
      </div>
      <div className="spread-text">
        <div className="spread-text-eyebrow"><span className="rule-inline"></span>The Games</div>
        <h3 className="spread-text-title">The Assassin</h3>
        <p className="spread-text-subtitle">A solo game of one quiet murder &mdash; <em>working title</em></p>

        <div className="spread-section-label">The Lore</div>
        <p className="spread-section-body">
          You have a name on a folded paper, a city you don't know, and an hour before dawn. There is no second chance and no one to ask for help. You will either be inside a window by sunrise or you will not.
        </p>

        <div className="spread-section-label">What You Play</div>
        <p className="spread-section-body">
          A <em>solo journaling game</em> played across a single sitting. Each turn, a die tells you what changes &mdash; the guard rotates, the wind picks up, a window opens upstairs &mdash; and the pen records what you do about it.
        </p>

        <div className="spread-facts">
          <div className="spread-fact">
            <div className="spread-fact-label">Players</div>
            <div className="spread-fact-value">Solo</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Format</div>
            <div className="spread-fact-value">Print &amp; play</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">You'll need</div>
            <div className="spread-fact-value">Die &amp; pen</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Time</div>
            <div className="spread-fact-value">One sitting</div>
          </div>
        </div>

        <div className="spread-cta-row">
          <span className="spread-status">In Development</span>
          <a href="#" className="spread-cta">Read more <span className="arrow">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</article>


{/* ============ WIZARD ============ */}
<article className="game-spread" id="wizard">
  <div className="spread-hero wizard">
    <div className="spread-hero-content">
      <svg className="spread-hero-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M32 8 L 24 18 L 24 52 L 40 52 L 40 18 Z" />
        <rect x="28" y="24" width="3" height="5" />
        <rect x="33" y="24" width="3" height="5" />
        <rect x="28" y="34" width="3" height="5" />
        <rect x="33" y="34" width="3" height="5" />
      </svg>
      <h2 className="spread-hero-title">The Wizard</h2>
      <div className="spread-hero-rule"></div>
      <p className="spread-hero-subtitle">Build a tower. Brew a spell. Lose your mind, slowly.</p>
    </div>
    <div className="spread-hero-placeholder-label">Cover Art</div>
    <svg className="spread-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-vellum-pattern)"/></svg>
  </div>
  <div className="spread-info">
    <div className="spread-info-inner">
      <div className="spread-art wizard">
        <svg className="spread-art-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true">
          <path d="M32 8 L 24 18 L 24 52 L 40 52 L 40 18 Z" />
          <rect x="28" y="24" width="3" height="5" />
          <rect x="33" y="24" width="3" height="5" />
          <rect x="28" y="34" width="3" height="5" />
          <rect x="33" y="34" width="3" height="5" />
        </svg>
        <div className="spread-art-placeholder-label">Character Art</div>
      </div>
      <div className="spread-text">
        <div className="spread-text-eyebrow"><span className="rule-inline"></span>The Games</div>
        <h3 className="spread-text-title">The Wizard</h3>
        <p className="spread-text-subtitle">A wizard's diary, kept badly &mdash; <em>working title</em></p>

        <div className="spread-section-label">The Lore</div>
        <p className="spread-section-body">
          You inherited a tower, a goat, and a manuscript you cannot read. The manuscript hums on certain afternoons. The goat is increasingly opinionated. You have a vague notion that the both of them are connected, and a stronger notion that the magic is starting to work on you in return.
        </p>

        <div className="spread-section-label">What You Play</div>
        <p className="spread-section-body">
          A <em>cozy-creepy journaling game</em> for one to four wizards. Each evening you brew, study, or wander &mdash; a die tells you what answers back. Over many evenings, you build a tower of pages, a grimoire of half-remembered spells, and a sense that you are not quite who you were.
        </p>

        <div className="spread-facts">
          <div className="spread-fact">
            <div className="spread-fact-label">Players</div>
            <div className="spread-fact-value">1&ndash;4</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Format</div>
            <div className="spread-fact-value">Print &amp; play</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">You'll need</div>
            <div className="spread-fact-value">Die &amp; pen</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Time</div>
            <div className="spread-fact-value">Many evenings</div>
          </div>
        </div>

        <div className="spread-cta-row">
          <span className="spread-status">In Development</span>
          <a href="#" className="spread-cta">Read more <span className="arrow">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</article>


{/* ============ TAVERN TALES ============ */}
<article className="game-spread flipped" id="tavern-tales">
  <div className="spread-hero tavern">
    <div className="spread-hero-content">
      <svg className="spread-hero-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M16 14 L 16 50 a 4 4 0 0 0 4 4 L 38 54 a 4 4 0 0 0 4 -4 L 42 14 Z" />
        <path d="M42 22 L 48 22 a 4 4 0 0 1 4 4 L 52 38 a 4 4 0 0 1 -4 4 L 42 42" />
        <line x1="16" y1="22" x2="42" y2="22" />
      </svg>
      <h2 className="spread-hero-title">Tavern Tales Creator</h2>
      <div className="spread-hero-rule"></div>
      <p className="spread-hero-subtitle">A companion tool for any tabletop session</p>
    </div>
    <svg className="spread-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-vellum-pattern)"/></svg>
  </div>
  <div className="spread-info">
    <div className="spread-info-inner">
      <div className="spread-art tavern has-image">
        <img className="spread-art-img" src="/tavern-pager.jpg" alt="The Tavern Tales Creator interface, end to end"/>
      </div>
      <div className="spread-text">
        <div className="spread-text-eyebrow"><span className="rule-inline"></span>The Tools</div>
        <h3 className="spread-text-title">Tavern Tales Creator</h3>
        <p className="spread-text-subtitle">A generator of inns, taverns, and waystations</p>

        <div className="spread-section-label">What It Does</div>
        <p className="spread-section-body">
          Roll a complete tavern in a single click &mdash; the keeper, the staff, the patrons in the common room, the bill of fare, the rumors overheard, and a sketched floor plan. Drop one into any session that needs a place to sit down.
        </p>

        <div className="spread-section-label">Who It's For</div>
        <p className="spread-section-body">
          <em>Any game master, any system.</em> Designed for the half-hour before play when you remember the party is heading somewhere new and you have nothing prepared. Lock the bits you like; reroll the rest until it fits.
        </p>

        <div className="spread-facts">
          <div className="spread-fact">
            <div className="spread-fact-label">Type</div>
            <div className="spread-fact-value">Web tool</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Price</div>
            <div className="spread-fact-value">Free</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">For</div>
            <div className="spread-fact-value">Any RPG</div>
          </div>
          <div className="spread-fact">
            <div className="spread-fact-label">Time</div>
            <div className="spread-fact-value">Instant</div>
          </div>
        </div>

        <div className="spread-cta-row">
          <span className="spread-status">Available Now</span>
          <a href="/tavern-tales" className="spread-cta">Open the tool <span className="arrow">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</article>


{/* ============ MANIFESTO ============ */}
<section className="manifesto" id="about">
  <div className="container-narrow">
    <div className="eyebrow">A Note from the Studio</div>
    <div className="eyebrow-rule"></div>
    <div className="manifesto-body">
      <p>We started Nightcloak because the games we wanted to play were always either too small to find or too large to start. A folder, a pen, a die, and one good idea &mdash; that's the size of the games we make.</p>
      <p>Every game here is built to be printed at home and finished in a sitting or three. Apps come along when they earn their place, like the tavern generator. Otherwise: paper and ink, the way the oldest games were played.</p>
    </div>
    <div className="manifesto-signature">&mdash; the studio</div>
  </div>
</section>


{/* ============ FOOTER ============ */}
<footer className="footer" id="contact">
  <svg className="footer-tear" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="100%" height="100%" fill="url(#tear-midnight-pattern)"/></svg>
  <div className="footer-inner">
    <svg className="footer-sigil" viewBox="0 0 64 64" fill="none" stroke="#B8924A" stroke-width="1.1" aria-hidden="true">
      <path d="M44 18 a 14 14 0 1 0 0 28 a 11 11 0 1 1 0 -28 z" />
      <path d="M32 52 l 3 -5 l 3 5 l -3 2 z" fill="#B8924A" opacity="0.6"/>
    </svg>
    <div className="footer-name">Nightcloak Games</div>
    <p className="footer-newsletter-label">Word from the studio, now and then.</p>
    <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email" style={{position: "absolute", left: "-9999px"}}>Email address</label>
      <input id="email" type="email" placeholder="Your email address" />
      <button type="submit">Subscribe</button>
    </form>
    <ul className="footer-links">
      <li><a href="#kingsman">The Games</a></li>
      <li><a href="#about">The Studio</a></li>
      <li><a href="/tavern-tales">Tavern Tales</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <p className="footer-copyright">&copy; 2026 Nightcloak Games &middot; All rights reserved</p>
  </div>
</footer>
    </>
  );
}
