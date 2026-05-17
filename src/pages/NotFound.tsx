import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 — Route not found:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-obsidian text-white grain flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="eyebrow text-gold mb-8">— 404 / Off the map</p>
        <h1 className="font-serif text-display-xl text-white leading-[0.98] mb-8">
          The page you&apos;re looking for{" "}
          <span className="serif-italic text-gold">never existed</span>.
        </h1>
        <p className="text-white/60 text-lg mb-12">
          Or it was withdrawn. Either way — let&apos;s get you back to safer ground.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-3 bg-gold text-obsidian px-8 py-4 hover:bg-champagne transition-all duration-500"
        >
          <span className="font-mono uppercase text-[0.6875rem] tracking-[0.22em] font-medium">
            Return home
          </span>
          <span className="transition-transform group-hover:-translate-x-1">←</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
