// app/menu/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { MenuApiResponse, MenuArticle } from '@/types/menu';
import { decodeUnicode } from '@/utils/decodeUnicode';

const formatPrice = (price: number | null) =>
  price !== null ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price) : null;

const Muted = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-muted-foreground">{children}</span>
);

const MenuItem = ({ article }: { article: MenuArticle }) => {
  const hasOptions = article.options.length > 0;
  const basePrice = formatPrice(article.price);
  const optionMinPrice = hasOptions
    ? formatPrice(Math.min(...article.options.map((o) => o.price || 0)))
    : null;

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl leading-tight whitespace-normal break-words">
              {decodeUnicode(article.name)}
            </CardTitle>
            {article.description && (
              <CardDescription className="mt-1 text-base whitespace-normal break-words sm:pr-6 md:pr-12 lg:pr-20">
                {decodeUnicode(article.description)}
              </CardDescription>
            )}
          </div>
          <div className="shrink-0 text-right sm:text-left sm:w-32 md:w-40">
            {hasOptions ? (
              <div>
                <div className="font-display text-lg font-semibold text-secondary">
                  ab {optionMinPrice}
                </div>
                <Muted>je nach Option</Muted>
              </div>
            ) : (
              basePrice && (
                <div className="font-display text-lg font-semibold text-secondary">
                  {basePrice}
                </div>
              )
            )}
          </div>
        </div>
      </CardHeader>

      {(hasOptions || article.allergens.length > 0) && (
        <CardContent className="pt-0">
          {hasOptions && (
            <div>
              <div className="flex items-center justify-between pb-2">
                <Muted>Optionen</Muted>
              </div>
              <div className="rounded-xl border bg-card/50">
                <ul className="divide-y">
                  {article.options.map((opt) => {
                    const price = formatPrice(opt.price);
                    return (
                      <li
                        key={opt.id}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                      >
                        <span className="truncate font-medium whitespace-normal break-words">
                          {decodeUnicode(opt.name)}
                        </span>
                        <span className="shrink-0 tabular-nums font-semibold">
                          {price ?? '–'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {article.allergens.length > 0 && (
            <div className="mt-3">
              <Muted>
                Allergene: {article.allergens.join(', ')}
              </Muted>
            </div>
          )}

          {!basePrice && !hasOptions && (
            <div className="mt-2">
              <Muted>Preis auf Anfrage</Muted>
            </div>
          )}
        </CardContent>
      )}

      {!hasOptions && !article.allergens.length && !basePrice && (
        <CardContent className="pt-0">
          <Muted>Preis auf Anfrage</Muted>
        </CardContent>
      )}
    </Card>
  );
};

export default function MenuPage() {
  const [data, setData] = useState<MenuApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('https://admin.kanpas.de/api/menu', { cache: 'no-store' });
        if (!res.ok) throw new Error('Menü konnte nicht geladen werden');
        const json: MenuApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = useMemo(() => {
    return data?.categories.filter((c) => c.articles.length > 0) ?? [];
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Unsere Karte
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Alle unsere Gerichte werden mit Liebe und regionalen Produkten zubereitet
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>🌾 Gluten</span>
              <span>🥛 Milch</span>
              <span>🥚 Eier</span>
              <span>🐟 Fisch</span>
              <span>🥜 Nüsse</span>
            </div>
          </div>

          {loading && (
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <section key={i}>
                  <Skeleton className="h-9 w-56 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Card key={j}>
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-5/6 mt-2" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-6 w-24" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && categories.length === 0 && (
            <p className="text-center text-muted-foreground">Aktuell keine Gerichte verfügbar.</p>
          )}

          {!loading && !error && categories.length > 0 && (
            <div className="space-y-12">
              {categories.map((category, idx) => (
                <section
                  key={category.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-3xl font-bold text-primary">
                      {decodeUnicode(category.name)}
                    </h2>
                    <Separator decorative className="hidden md:block w-1/3" />
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.articles.map((article) => (
                      <MenuItem key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {data?.updated_at && (
            <p className="text-center text-xs text-muted-foreground mt-12">
              Zuletzt aktualisiert: {new Date(data.updated_at).toLocaleString('de-DE')}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}