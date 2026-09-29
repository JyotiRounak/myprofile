import { useEffect, useState } from "react";
import { NAV } from "./data.js";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    try { if (theme) localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggle = () => {
    const dark = theme ? theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(dark ? "light" : "dark");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "d" && !e.metaKey && !e.ctrlKey && !/input|textarea/i.test(e.target.tagName)) toggle();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  return toggle;
}

export function useScrollSpy() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}
