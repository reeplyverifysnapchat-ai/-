import { useState, useEffect, useRef } from "react";
import { RouterContext, TopNav, getSectionId } from "@/components/SiteNav";
import { IdeaPage } from "@/pages/IdeaPage";
import { KpiPage } from "@/pages/KpiPage";
import { MethodSamplePage } from "@/pages/MethodSamplePage";
import { SurveyPage } from "@/pages/SurveyPage";
import { UsabilityTestPage } from "@/pages/UsabilityTestPage";
import { ResultVsTargetPage } from "@/pages/ResultVsTargetPage";
import { ResultsPage } from "@/pages/ResultsPage";
import { FinalDecisionPage } from "@/pages/FinalDecisionPage";

function normalizeRoutePath(rawPath: string): string {
  switch (rawPath) {
    case "/idea":
    case "/hypothesis":
    case "/prototype":
      return "/";
    case "/kpis":
    case "/kpi-1":
    case "/kpi-2":
      return "/kpi";
    case "/kpi":
    case "/method-sample":
    case "/survey":
    case "/usability-test":
    case "/result-vs-target":
    case "/results":
    case "/final-decision":
      return rawPath;
    default:
      return "/";
  }
}

function getCleanPath(): string {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("/")) return normalizeRoutePath(hash);
  return normalizeRoutePath(window.location.pathname || "/");
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getCleanPath);
  const manualScrollUntilRef = useRef<number>(0);

  const scrollToPath = (to: string, smooth = true) => {
    const normalized = normalizeRoutePath(to);
    const sectionId = getSectionId(normalized);
    if (!sectionId) return;

    manualScrollUntilRef.current = Date.now() + 2500;

    const releaseLock = () => {
      manualScrollUntilRef.current = 0;
    };
    window.addEventListener("scrollend", releaseLock, { once: true });

    if (normalized === "/" && sectionId === "hypothesis") {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };

  useEffect(() => {
    const initial = getCleanPath();
    if (initial !== "/") {
      requestAnimationFrame(() => scrollToPath(initial, false));
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const next = getCleanPath();
      setCurrentPath(next);
      scrollToPath(next, true);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-path]"));
    if (sections.length === 0) return;

    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;
      if (Date.now() < manualScrollUntilRef.current) return;

      const docEl = document.documentElement;
      const nearBottom = window.innerHeight + window.scrollY >= docEl.scrollHeight - 40;
      if (nearBottom) {
        const lastPath = sections[sections.length - 1]?.getAttribute("data-section-path");
        if (lastPath) setCurrentPath(lastPath);
        return;
      }

      const triggerY = Math.min(200, Math.round(window.innerHeight * 0.25));
      let activePath = sections[0]?.getAttribute("data-section-path") || "/";

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= triggerY) {
          const path = sec.getAttribute("data-section-path");
          if (path) activePath = path;
        } else {
          break;
        }
      }

      setCurrentPath(activePath);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const navigate = (to: string) => {
    const normalized = normalizeRoutePath(to);
    try {
      window.history.pushState({}, "", normalized);
    } catch {
      window.location.hash = normalized;
    }
    setCurrentPath(normalized);
    scrollToPath(normalized, true);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      <div className="min-h-screen bg-background text-foreground antialiased font-sans selection:bg-gold/30 selection:text-primary">
        <TopNav />
        <main className="bg-hero min-h-screen px-4 py-6 sm:py-10">
          <div className="mx-auto max-w-4xl space-y-10 sm:space-y-14">
            <IdeaPage />
            <KpiPage />
            <MethodSamplePage />
            <SurveyPage />
            <UsabilityTestPage />
            <ResultVsTargetPage />
            <ResultsPage />
            <FinalDecisionPage />
          </div>
        </main>
      </div>
    </RouterContext.Provider>
  );
}
