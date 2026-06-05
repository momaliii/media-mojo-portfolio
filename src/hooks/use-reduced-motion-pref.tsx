import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";

type Mode = "system" | "on" | "off";

interface Ctx {
  mode: Mode;
  reduced: boolean;
  setMode: (m: Mode) => void;
  toggle: () => void;
}

const STORAGE_KEY = "reduced-motion-pref";
const ReducedMotionCtx = createContext<Ctx | null>(null);

const getSystemPrefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const ReducedMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(STORAGE_KEY) as Mode) || "system";
  });
  const [systemReduced, setSystemReduced] = useState<boolean>(getSystemPrefersReduced);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const reduced = mode === "on" || (mode === "system" && systemReduced);

  useEffect(() => {
    const root = document.documentElement;
    if (reduced) root.setAttribute("data-reduced-motion", "true");
    else root.removeAttribute("data-reduced-motion");
  }, [reduced]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    try { localStorage.setItem(STORAGE_KEY, m); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setMode(reduced ? "off" : "on");
  }, [reduced, setMode]);

  const value = useMemo<Ctx>(() => ({ mode, reduced, setMode, toggle }), [mode, reduced, setMode, toggle]);

  return (
    <ReducedMotionCtx.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        {children}
      </MotionConfig>
    </ReducedMotionCtx.Provider>
  );
};

export const useReducedMotionPref = () => {
  const ctx = useContext(ReducedMotionCtx);
  if (!ctx) throw new Error("useReducedMotionPref must be used within ReducedMotionProvider");
  return ctx;
};
