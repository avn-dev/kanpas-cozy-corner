import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-cafe.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gemütliche Café-Atmosphäre bei KANPA's"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary mb-6 animate-slide-up">
          Willkommen bei KANPA's
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Dein Ort für Kaffee, Brunch & gute Zeit
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link to="/menu">
            <Button size="lg" variant="secondary" className="group">
              Unsere Karte ansehen
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          {/* <Link to="/contact">
            <Button size="lg" variant="outline">
              Reservierung
            </Button>
          </Link> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-secondary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
