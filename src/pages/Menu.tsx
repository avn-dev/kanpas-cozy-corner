import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Menu = () => {
  const menuCategories = [
    {
      title: "Frühstück",
      items: [
        {
          name: "Klassisches Frühstück",
          description: "Frische Brötchen, Butter, Marmelade, Käse, Aufschnitt",
          price: "8,50 €",
          allergens: "🌾 🥛",
        },
        {
          name: "Avocado Toast",
          description: "Geröstetes Sauerteigbrot, Avocado, pochiertes Ei, Sprossen",
          price: "9,90 €",
          allergens: "🌾 🥚",
        },
        {
          name: "Pancakes",
          description: "Fluffige Pancakes mit frischen Beeren und Ahornsirup",
          price: "7,50 €",
          allergens: "🌾 🥛 🥚",
        },
      ],
    },
    {
      title: "Brunch",
      items: [
        {
          name: "KANPA's Signature Brunch",
          description: "Brötchen, Croissant, Käse, Aufschnitt, Rührei, Lachs, Obst, Joghurt",
          price: "16,90 €",
          allergens: "🌾 🥛 🥚 🐟",
        },
        {
          name: "Veganer Brunch",
          description: "Gemüse-Aufstrich, Hummus, Avocado, Brot, Obst, Nüsse",
          price: "14,50 €",
          allergens: "🌾 🥜",
        },
        {
          name: "Shakshuka",
          description: "Pochierte Eier in würziger Tomatensoße, frisches Brot",
          price: "11,90 €",
          allergens: "🌾 🥚",
        },
      ],
    },
    {
      title: "Getränke",
      items: [
        {
          name: "Espresso",
          description: "Klassischer italienischer Espresso",
          price: "2,50 €",
          allergens: "",
        },
        {
          name: "Cappuccino",
          description: "Espresso mit aufgeschäumter Milch",
          price: "3,80 €",
          allergens: "🥛",
        },
        {
          name: "Latte Macchiato",
          description: "Schichten aus Milch und Espresso",
          price: "4,20 €",
          allergens: "🥛",
        },
        {
          name: "Frisch gepresster O-Saft",
          description: "100% frische Orangen",
          price: "4,50 €",
          allergens: "",
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Hausgemachter Kuchen",
          description: "Täglich wechselnde Auswahl",
          price: "4,50 €",
          allergens: "🌾 🥛 🥚",
        },
        {
          name: "Tiramisu",
          description: "Klassisches italienisches Dessert",
          price: "5,90 €",
          allergens: "🌾 🥛 🥚",
        },
      ],
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
              Unsere Karte
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alle unsere Gerichte werden mit Liebe und regionalen Produkten zubereitet
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <span>🌾 Gluten</span>
              <span>🥛 Milch</span>
              <span>🥚 Eier</span>
              <span>🐟 Fisch</span>
              <span>🥜 Nüsse</span>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {menuCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h2 className="font-display text-3xl font-bold text-primary mb-6 pb-2 border-b-2 border-secondary inline-block">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {category.items.map((item) => (
                    <Card
                      key={item.name}
                      className="hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-[1.02]"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{item.name}</CardTitle>
                          <span className="font-display text-lg font-semibold text-secondary">
                            {item.price}
                          </span>
                        </div>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      {item.allergens && (
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            Allergene: {item.allergens}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
