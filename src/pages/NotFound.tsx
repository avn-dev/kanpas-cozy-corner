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
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Diese Seite gibt es leider nicht.</p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
