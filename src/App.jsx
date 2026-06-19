import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InnGenerator from "./pages/InnGenerator.jsx";

const NAV_CSS = `
  .global-nav {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1.1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0E0A14;
    font-family: "IM Fell English SC", "EB Garamond", Georgia, serif;
    border-bottom: 1px solid rgba(184, 146, 74, 0.12);
  }
  .global-nav-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #F3F0E8;
    text-decoration: none;
    opacity: 0.92;
    transition: opacity 0.2s;
  }
  .global-nav-brand:hover { opacity: 1; }
  .global-nav-brand-text {
    font-size: 0.85rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
  }
  .global-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .global-nav-links a {
    color: #F3F0E8;
    opacity: 0.7;
    text-decoration: none;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    transition: opacity 0.2s;
  }
  .global-nav-links a:hover { opacity: 1; }
  @media (max-width: 720px) {
    .global-nav { padding: 0.75rem 1.25rem; }
    .global-nav-links { gap: 1.25rem; }
    .global-nav-brand-text { font-size: 0.7rem; letter-spacing: 0.25em; }
    .global-nav-links a { font-size: 0.6rem; letter-spacing: 0.25em; }
  }
`;

function GlobalNav() {
  return (
    <nav className="global-nav" aria-label="Primary">
      <Link to="/" className="global-nav-brand">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          <path d="M22 7 a 10 10 0 1 0 0 18 a 8 8 0 1 1 0 -18 z" />
          <path d="M16 28 l 2 -3 l 2 3 l -2 1 z" />
        </svg>
        <span className="global-nav-brand-text">Nightcloak Games</span>
      </Link>
      <ul className="global-nav-links">
        <li><a href="/#kingsman">The Games</a></li>
        <li><a href="/tavern-tales">Tavern Tales</a></li>
        <li><a href="/#about">The Studio</a></li>
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{NAV_CSS}</style>
      <GlobalNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tavern-tales" element={<InnGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}
