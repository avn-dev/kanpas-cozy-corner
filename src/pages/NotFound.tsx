import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";

const NotFound = () => {
  const location = useLocation();

  useSeo({
    title: "404 – Seite nicht gefunden",
    description: "Diese Seite gibt es bei KANPA’s nicht – zurück zur Startseite.",
    path: location.pathname,
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div className="text-center" style={{ padding: 24 }}>
        <div className="rd-eyebrow" style={{ marginBottom: 16 }}>
          Seite nicht gefunden
        </div>
        <h1 className="rd-display" style={{ fontSize: "clamp(64px, 10vw, 120px)" }}>
          4<em>0</em>4
        </h1>
        <p className="rd-sub" style={{ margin: "18px 0 26px 0" }}>
          Diese Seite gibt es leider nicht — aber Frühstück gibt es trotzdem.
        </p>
        <Link to="/" className="rd-pill rd-pill--solid">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
