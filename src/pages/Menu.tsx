import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MenuApiResponse, MenuArticle } from '@/types/menu';
import { decodeUnicode } from '@/utils/decodeUnicode';
import DOMPurify from 'isomorphic-dompurify';
import { useSeo } from '@/hooks/use-seo';

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
  useSeo({
    title: 'Speisekarte – Frühstück, Brunch & türkische Spezialitäten',
    description:
      'Die Speisekarte von KANPA’s in Sinzig: KANPA’s Brunch, türkisches Frühstück mit Bazlama, Menemen & Sucuk, Bagels, Pancakes, Pasta und hausgemachte Desserts – alle Preise online.',
    path: '/menu',
  });
  const [data, setData] = useState<MenuApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [showToTop, setShowToTop] = useState(false);
  const catsBarRef = useRef<HTMLDivElement | null>(null);
  const spyLockUntilRef = useRef(0);

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // Scroll-Spy: aktive Kategorie anhand der sichtbaren Sektion markieren
  useEffect(() => {
    if (categories.length === 0) return;
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = Number(entry.target.id.replace('cat-', ''));
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        if (Date.now() < spyLockUntilRef.current) return;
        // erste sichtbare Kategorie in Menü-Reihenfolge = aktiv
        const current = categories.find((c) => visible.has(c.id));
        if (current) setActiveId(current.id);
      },
      // oben: fixe Nav + Sticky-Chips ausblenden; unten: nur oberer Bereich zählt
      { rootMargin: '-170px 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Aktiven Chip in der Sticky-Leiste in den sichtbaren Bereich scrollen
  useEffect(() => {
    if (activeId === null) return;
    const bar = catsBarRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-cat-id="${activeId}"]`);
    if (!bar || !chip) return;
    const target = chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2;
    bar.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [activeId]);

  // "Nach oben"-Button ab ~600px Scrolltiefe einblenden
  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToCategory = (id: number) => {
    setActiveId(id);
    // Scroll-Spy während des programmatischen Scrollens nicht dazwischenfunken lassen
    spyLockUntilRef.current = Date.now() + (prefersReducedMotion() ? 300 : 1000);
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main id="main-content" className="flex-1" style={{ paddingTop: 'var(--nav-height)' }}>
        <section className="rd-hero" style={{ paddingBottom: 24 }}>
          <div className="rd-eyebrow" style={{ marginBottom: 18 }}>
            Alle Preise · täglich frisch
          </div>
          <h1 className="rd-display" style={{ fontSize: 'clamp(38px, 5.5vw, 76px)' }}>
            Speisekarte — Frühstück &amp; <em>Brunch in Sinzig.</em>
          </h1>
          <div style={{ marginTop: 20 }}>
            <Link to="/tuerkisches-fruehstueck" className="rd-textlink">
              Was ist türkisches Frühstück?
            </Link>
          </div>
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
              <div className="kp-cats" ref={catsBarRef}>
                <div className="kp-cats__inner">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      data-cat-id={c.id}
                      className={`kp-cat${activeId === c.id ? ' is-active' : ''}`}
                      onClick={() => scrollToCategory(c.id)}
                    >
                      {decodeUnicode(c.name)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="rd-wrap kp-menu-layout" style={{ paddingBottom: 64 }}>
              {categories.length > 0 && (
                <aside className="kp-rail" aria-label="Kategorien">
                  <div className="kp-rail__label">Kategorien</div>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      className={`kp-rail__item${activeId === c.id ? ' is-active' : ''}`}
                      onClick={() => scrollToCategory(c.id)}
                    >
                      <span className="kp-rail__name">{decodeUnicode(c.name)}</span>
                      <span className="kp-rail__count">{c.articles.length}</span>
                    </button>
                  ))}
                  <div className="kp-rail__hint">
                    Fragen zu Allergenen? Sprich uns einfach an —{' '}
                    <strong>
                      <a href="tel:+4926425495" style={{ textDecoration: 'none' }}>
                        +49 2642 5495
                      </a>
                    </strong>
                  </div>
                </aside>
              )}

              <div>
                {categories.map((category) => (
                  <section key={category.id} id={`cat-${category.id}`} style={{ scrollMarginTop: 'calc(var(--nav-height) + 76px)' }}>
                    <header className="kp-menu-cat">
                      <h2 className="kp-menu-cat__name">{decodeUnicode(category.name)}</h2>
                    </header>
                    <div>
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
              </div>
            </div>

            <a href="tel:+4926425495" className="kp-reservebar">
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> Tisch reservieren — 02642 5495
            </a>
          </>
        )}
        <button
          type="button"
          className={`kp-totop${showToTop ? ' is-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Nach oben scrollen"
          aria-hidden={!showToTop}
          tabIndex={showToTop ? 0 : -1}
        >
          <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </main>

      <Footer />
    </div>
  );
}
