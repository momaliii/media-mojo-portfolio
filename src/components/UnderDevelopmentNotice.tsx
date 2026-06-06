import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Wrench, X } from "lucide-react";

const STORAGE_KEY = "under-dev-notice-dismissed";

export default function UnderDevelopmentNotice() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isHiddenRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/auth") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/reset-password");

  useEffect(() => {
    if (isHiddenRoute) return;
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [isHiddenRoute]);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (isHiddenRoute || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[60] sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-background/90 backdrop-blur-xl shadow-2xl shadow-primary/10">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="flex items-start gap-3 p-4 pr-10">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Wrench className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-foreground">Site under development</p>
              <span className="inline-flex items-center text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                Beta
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Thanks for visiting! Some features and content are still being polished. Feel free to look around.
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss notification"
            className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
