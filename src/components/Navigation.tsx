import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Speisekarte", path: "/menu" },
  { name: "Türkisches Frühstück", path: "/tuerkisches-fruehstueck" },
  { name: "Über uns", path: "/about" },
  { name: "Kontakt", path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <a href="#main-content" className="rd-skip">
        Zum Hauptinhalt springen
      </a>
      <header className="rd-header" aria-label="Kopfbereich">
        <div className="rd-topbar">
          <span>Täglich 9–17 Uhr</span>
          <span>Ausdorferstraße 1a · 53489 Sinzig</span>
          <a href="tel:+4926425495" style={{ textDecoration: "none", color: "inherit" }}>
            +49 2642 5495
          </a>
        </div>

        <nav className="rd-nav" aria-label="Hauptnavigation">
          <Link to="/" className="rd-nav__logo" aria-label="KANPA’s — Startseite">
            <img src={logo} alt="KANPA’s Logo" decoding="async" />
          </Link>

          <div className="rd-nav__links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rd-nav__link${isActive(item.path) ? " is-active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <a href="tel:+4926425495" className="rd-pill rd-pill--outline rd-nav__cta">
            Tisch reservieren
          </a>

          <div className="rd-nav__mobile">
            <a
              href="tel:+4926425495"
              className="rd-iconbtn rd-iconbtn--solid"
              aria-label="Anrufen und Tisch reservieren"
              style={{ gap: 0, fontSize: 17 }}
            >
              ☎
            </a>
            <button
              type="button"
              className="rd-iconbtn"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isOpen ? (
                <span style={{ fontSize: 18, lineHeight: 1 }}>×</span>
              ) : (
                <>
                  <span className="rd-iconbtn__bar" />
                  <span className="rd-iconbtn__bar" />
                  <span className="rd-iconbtn__bar" />
                </>
              )}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div id="mobile-menu" className="rd-mobilemenu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={isActive(item.path) ? "is-active" : ""}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
