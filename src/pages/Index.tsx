import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Croissant, Leaf } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Coffee,
      title: "Erstklassiger Kaffee",
      description: "Genießen Sie unseren sorgfältig ausgewählten Kaffee aus nachhaltigen Quellen",
    },
    {
      icon: Croissant,
      title: "Frisches Gebäck",
      description: "Täglich frisch gebackene Croissants, Brötchen und hausgemachte Leckereien",
    },
    {
      icon: Leaf,
      title: "Regional & Bio",
      description: "Wir setzen auf regionale Produkte und nachhaltige Beschaffung",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold text-center text-primary mb-12 animate-fade-in">
            Warum KANPA's?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-primary mb-6 animate-fade-in">
            Bereit für deinen Besuch?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Komm vorbei und erlebe die gemütliche Atmosphäre bei KANPA's. Wir freuen uns auf dich!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
