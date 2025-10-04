import { Coffee, Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-secondary" />
              <span className="font-display text-2xl font-bold text-primary">Kanpa's</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Dein Ort für Kaffee, Brunch & gute Zeit in gemütlicher Atmosphäre.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Menü
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Über Uns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">Folge uns</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@kanpas.de"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                aria-label="E-Mail"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kanpa's Café & Brunch. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
