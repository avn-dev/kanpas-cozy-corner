import { useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MenuApiResponse, MenuArticle } from '@/types/menu';
import { decodeUnicode } from '@/utils/decodeUnicode';
import DOMPurify from 'isomorphic-dompurify';
import { useDocumentTitle } from '@/hooks/use-document-title';

type LabelLike = string | { emoji?: string; icon?: string; name?: string; label?: string; position?: number } | null;

const getAllergenEmoji = (a: LabelLike): string => {
  if (a == null) return '';
  if (typeof a === 'string') return a.trim()[0] ?? '';
  return a.emoji ?? a.icon ?? '';
};

const getAllergenName = (a: LabelLike): string => {
  if (a == null) return '';
  if (typeof a === 'string') return /\p{Extended_Pictographic}/u.test(a) ? '' : a;
  return a.name ?? a.label ?? '';
};

const getAdditiveEmoji = (a: LabelLike): string => {
  if (a == null) return '';
  if (typeof a === 'string') return a.trim()[0] ?? '';
  return (a as any).emoji ?? (a as any).icon ?? '';
};

const getAdditiveName = (a: LabelLike): string => {
  if (a == null) return '';
  if (typeof a === 'string') return /\p{Extended_Pictographic}/u.test(a) ? '' : a;
  return (a as any).name ?? (a as any).label ?? '';
};

type LegendEntry = { emoji: string; name: string; key: string; position?: number };

const collectLegendAllergens = (data: MenuApiResponse | null): LegendEntry[] => {
  if (!data) return [];
  const map = new Map<string, LegendEntry>();
  for (const c of data.categories) {
    for (const art of c.articles) {
      for (const al of (art.allergens ?? [])) {
        const emoji = getAllergenEmoji(al as LabelLike);
        const name = getAllergenName(al as LabelLike);
        const key = (name || emoji || '').toLowerCase();
        const position = typeof al === 'object' && al != null && 'position' in al ? (al as any).position : undefined;
        if (!key) continue;
        if (!map.has(key)) map.set(key, { emoji, name, key, position });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => (a.position ?? 9999) - (b.position ?? 9999));
};

const collectLegendAdditives = (data: MenuApiResponse | null): LegendEntry[] => {
  if (!data) return [];
  const map = new Map<string, LegendEntry>();
  for (const c of data.categories) {
    for (const art of c.articles) {
      for (const ad of (art.additives ?? [])) {
        const emoji = getAdditiveEmoji(ad as LabelLike);
        const name = getAdditiveName(ad as LabelLike);
        const key = (name || emoji || '').toLowerCase();
        const position = typeof ad === 'object' && ad != null && 'position' in ad ? (ad as any).position : undefined;
        if (!key) continue;
        if (!map.has(key)) map.set(key, { emoji, name, key, position });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => (a.position ?? 9999) - (b.position ?? 9999));
};

const formatPrice = (price: number | null) =>
  price !== null ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price) : null;

const MenuItem = ({ article }: { article: MenuArticle }) => {
  const hasOptions = (article.options?.length ?? 0) > 0;
  const hasAllergens = (article.allergens?.length ?? 0) > 0;
  const hasAdditives = (article.additives?.length ?? 0) > 0;
  const basePrice = formatPrice(article.price);

  return (
    <article className="kp-item">
      <div className="kp-item__row">
        <div className="kp-item__num">
          {article.number ? String(article.number).padStart(2, '0') : ''}
        </div>
        <div className="kp-item__name">
          <span>{decodeUnicode(article.name)}</span>
          <span className="kp-item__leader" />
        </div>
        <div className="kp-item__price">
          {basePrice ?? (hasOptions ? '' : '—')}
        </div>
      </div>

      {article.description && (
        <div
          className="kp-item__desc"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.description) }}
        />
      )}

      {hasOptions && (
        <div className="kp-options">
          {article.options!.map((opt, i) => (
            <div key={opt.id ?? i} className="kp-option">
              <span className="kp-option__name">
                {opt.number != null && (
                  <span className="kp-option__num">{opt.number}</span>
                )}
                {decodeUnicode(opt.name)}
                <span className="kp-option__leader" />
              </span>
              <span className="kp-option__price">{formatPrice(opt.price) ?? '–'}</span>
            </div>
          ))}
        </div>
      )}

      {(hasAllergens || hasAdditives) && (
        <div className="kp-item__meta">
          {hasAllergens && (
            <span className="kp-item__meta-tag">
              <span className="kp-item__meta-label">Allerg.</span>
              <span>{(article.allergens ?? []).map(a => getAllergenEmoji(a as LabelLike)).filter(Boolean).join(' ')}</span>
            </span>
          )}
          {hasAdditives && (
            <span className="kp-item__meta-tag">
              <span className="kp-item__meta-label">Zus.</span>
              <span>{(article.additives ?? []).map(a => getAdditiveEmoji(a as LabelLike)).filter(Boolean).join(', ')}</span>
            </span>
          )}
        </div>
      )}
    </article>
  );
};

export default function MenuPage() {
  useDocumentTitle('Speisekarte – Frühstück, Brunch & türkische Spezialitäten');
  const [data, setData] = useState<MenuApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

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

  const categories = useMemo(
    () => data?.categories.filter((c) => c.articles.length > 0) ?? [],
    [data]
  );

  useEffect(() => {
    if (categories.length > 0 && activeId === null) {
      setActiveId(categories[0].id);
    }
  }, [categories, activeId]);

  const legendAllergens = useMemo(() => collectLegendAllergens(data), [data]);
  const legendAdditives = useMemo(() => collectLegendAdditives(data), [data]);

  const scrollToCategory = (id: number) => {
    setActiveId(id);
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1 menu-redesign" style={{ paddingTop: 'var(--nav-height, 106px)' }}>
        <section className="kp-menu-head">
          <h1 className="kp-menu-head__title">
            Unsere <em>Karte</em>.
          </h1>
          <p className="kp-menu-head__sub">
            Alle unsere Gerichte werden mit Liebe — und türkischer Seele — zubereitet.
          </p>
        </section>

        {loading && (
          <div className="kp-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="kp-shimmer" style={{ height: 60 }} />
            ))}
          </div>
        )}

        {error && (
          <p className="kp-error">{error}</p>
        )}

        {!loading && !error && (
          <>
            {categories.length > 0 && (
              <div className="kp-cats">
                <div className="kp-cats__inner">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      className={`kp-cat${activeId === c.id ? ' is-active' : ''}`}
                      onClick={() => scrollToCategory(c.id)}
                    >
                      {decodeUnicode(c.name)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {categories.map((category) => (
              <section key={category.id} id={`cat-${category.id}`}>
                <header className="kp-menu-cat">
                  <h2 className="kp-menu-cat__name">{decodeUnicode(category.name)}</h2>
                  <div className="kp-menu-cat__rule" />
                </header>
                <div className="kp-items-grid">
                  {category.articles.map((a) => (
                    <MenuItem key={a.id} article={a} />
                  ))}
                </div>
              </section>
            ))}

            {(legendAllergens.length > 0 || legendAdditives.length > 0) && (
              <div className="kp-legend">
                <div className="kp-legend__title">Allergene & Zusatzstoffe</div>
                {legendAllergens.length > 0 && (
                  <div className="kp-legend__items">
                    {legendAllergens.map(({ key, emoji, name }) => (
                      <span key={`al-${key}`}>
                        {emoji && <span>{emoji}</span>}
                        {name && <span> {name}</span>}
                      </span>
                    ))}
                  </div>
                )}
                {legendAdditives.length > 0 && (
                  <div className="kp-legend__items" style={{ marginTop: 8 }}>
                    {legendAdditives.map(({ key, emoji, name }) => (
                      <span key={`ad-${key}`}>
                        {emoji && <span>{emoji}</span>}
                        {name && <span> {name}</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {data?.updated_at && (
              <p className="kp-timestamp">
                Stand: {new Date(data.updated_at).toLocaleString('de-DE')}
              </p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
