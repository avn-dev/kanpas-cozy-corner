import { Coffee, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link to="/menu" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Menü
                </Link>
              </li> */}
              <li>
                <Link key="/about" to="/about" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Über Uns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Kontakt & Standort
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-muted-foreground hover:text-secondary transition-colors duration-300">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>


          {/* Address */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">Anschrift</h3>
            <ul>
              <li>
                <div className="text-muted-foreground transition-colors duration-300">
                  KANPA’s
                </div>
              </li>
              <li>
                <div className="text-muted-foreground transition-colors duration-300">
                  Ausdorferstraße 1a
                </div>
              </li>
              <li>
                <div className="text-muted-foreground transition-colors duration-300">
                  53489 Sinzig
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-primary">Öffnungszeiten</h3>
            <p className="text-muted-foreground transition-colors duration-300">
              Montag – Sonntag: 08:30 – 19:00
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KANPA’s. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
