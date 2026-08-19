import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=KANPA%E2%80%99s+Ausdorferstra%C3%9Fe+1a+Sinzig";

const Footer = () => {
  return (
    <footer className="rd-footer">
      <div className="rd-footer__grid">
        <div className="rd-footer__col">
          <img
            src={logo}
            alt="KANPA’s Logo"
            style={{ height: 42, borderRadius: 4, alignSelf: "flex-start" }}
            loading="lazy"
            decoding="async"
          />
          <p className="rd-footer__claim" style={{ margin: 0 }}>
            Café &amp; Brunch in Sinzig — türkisches Frühstück, Specialty Coffee &amp; hausgemachte
            Desserts.
          </p>
        </div>

        <div className="rd-footer__col">
          <div className="rd-footer__label">Seiten</div>
          <Link to="/">Home</Link>
          <Link to="/menu">Speisekarte</Link>
          <Link to="/tuerkisches-fruehstueck">Türkisches Frühstück</Link>
          <Link to="/about">Über uns</Link>
          <Link to="/contact">Kontakt &amp; Standort</Link>
        </div>

        <div className="rd-footer__col">
          <div className="rd-footer__label">Kontakt</div>
          <span>
            Ausdorferstraße 1a
            <br />
            53489 Sinzig
          </span>
          <a href="tel:+4926425495">+49 2642 5495</a>
          <a href="mailto:info@kanpas.de">info@kanpas.de</a>
          <a href="https://instagram.com/kanpas.sinzig" target="_blank" rel="noreferrer noopener">
            @kanpas.sinzig
          </a>
        </div>

        <div className="rd-footer__col">
          <div className="rd-footer__label">Öffnungszeiten</div>
          <span>
            Montag – Sonntag
            <br />
            9:00 – 17:00 Uhr
          </span>
          <a
            className="rd-footer__review"
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            ★ Auf Google bewerten
          </a>
        </div>
      </div>

      <div className="rd-footer__bottom">
        <span>© 2026 KANPA’s. Alle Rechte vorbehalten.</span>
        <span>
          <Link to="/imprint">Impressum</Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
