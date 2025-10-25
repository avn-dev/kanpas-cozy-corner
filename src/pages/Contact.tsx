import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const isAppleDevice = /iPhone|iPad|Macintosh|Mac/i.test(navigator.userAgent);
  console.log(isAppleDevice);
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Ausdorferstraße 1A, 53489 Sinzig",
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "<a href=\"tel:+49160774767\">+49 160 774767</a>",
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: "<a href=\"mailto:info@kanpas.de\">info@kanpas.de</a>",
    },
  ];

  const openingHours = [
    { day: "Montag – Sonntag", hours: "08:30 – 19:00" },
    //{ day: "Samstag", hours: "folgt" },
    //{ day: "Sonntag", hours: "folgt" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-36 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Kontakt & Standort
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Besuche uns oder reserviere deinen Tisch
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Kontaktinformationen
              </h2>
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10">
                        <info.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                        <p
                          className="text-muted-foreground mt-1"
                          dangerouslySetInnerHTML={{ __html: info.content }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Opening Hours */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Öffnungszeiten
              </h2>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">Wir haben für dich geöffnet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {openingHours.map((schedule) => (
                      <div
                        key={schedule.day}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                      >
                        <span className="font-medium text-foreground">{schedule.day}</span>
                        <span className="text-muted-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-display text-3xl font-bold text-primary mb-6">
              So findest du uns
            </h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-[var(--shadow-soft)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.273819918979!2d7.246364376631819!3d50.543989972446846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bef10056a2718d%3A0x869209ef27a88d64!2sKANPA´s!5e0!3m2!1sde!2sde!4v1735140000000!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KANPA´s Standort auf Google Maps"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
