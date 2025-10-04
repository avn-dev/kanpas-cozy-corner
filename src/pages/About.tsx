import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Leaf, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Mit Liebe gemacht",
      description:
        "Jedes Gericht wird mit Hingabe und Sorgfalt zubereitet. Bei uns schmeckt man die Leidenschaft.",
    },
    {
      icon: Leaf,
      title: "Regional & Nachhaltig",
      description:
        "Wir setzen auf regionale Produkte und nachhaltige Beschaffung. Frisch, fair und umweltbewusst.",
    },
    {
      icon: Users,
      title: "Gemütliche Atmosphäre",
      description:
        "Bei KANPA's bist du mehr als ein Gast – du bist Teil unserer Familie. Fühl dich wie zu Hause.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Über Uns
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Die Geschichte hinter KANPA's
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Unsere Geschichte
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  KANPA's wurde aus der Leidenschaft für gutes Essen, aromatischen Kaffee und
                  herzliche Begegnungen geboren. Was als kleiner Traum begann, ist heute ein Ort,
                  an dem Menschen zusammenkommen, um den Tag entspannt zu beginnen oder bei einem
                  ausgedehnten Brunch zu genießen.
                </p>
                <p>
                  Unser Name steht für Authentizität und Wärme. In unserem Café verbinden wir
                  moderne Gemütlichkeit mit der Liebe zu regionalen Produkten. Jeder Besuch soll
                  ein kleiner Urlaub vom Alltag sein – ein Moment der Ruhe, des Genusses und der
                  Freude.
                </p>
                <p>
                  Bei uns findest du nicht nur exzellenten Kaffee und köstliche Brunch-Gerichte,
                  sondern auch ein Team, das mit Herzblut dabei ist. Wir freuen uns darauf, dich
                  bei KANPA's willkommen zu heißen!
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-primary text-center mb-12">
              Unsere Werte
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                    <value.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
