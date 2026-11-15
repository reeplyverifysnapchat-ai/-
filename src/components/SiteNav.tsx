import React, { useEffect, useRef, type ReactNode } from "react";
import { ExportFinalReportButton } from "@/components/ExportFinalReportButton";
import { ExportSlidesButton } from "@/components/ExportSlidesButton";

export const PAGES = [
  { to: "/", id: "hypothesis", label: "الفرضية" },
  { to: "/kpi", id: "kpi", label: "المؤشرات والأهداف" },
  { to: "/method-sample", id: "method-sample", label: "الطريقة والعينة" },
  { to: "/survey", id: "survey", label: "الاستبيان" },
  { to: "/usability-test", id: "usability-test", label: "اختبار الاستخدام الموجّه" },
  { to: "/result-vs-target", id: "result-vs-target", label: "النتيجة مقابل الهدف" },
  { to: "/results", id: "results", label: "النتائج" },
  { to: "/final-decision", id: "final-decision", label: "القرار النهائي" },
] as const;

export type PagePath = (typeof PAGES)[number]["to"];

export function getStepNumber(path: PagePath): number {
  return PAGES.findIndex((p) => p.to === path) + 1;
}

export function getSectionId(path: string): string | undefined {
  return PAGES.find((p) => p.to === path)?.id;
}

export function StepEyebrow({ step }: { step: number }) {
  return (
    <p className="text-xs font-medium text-muted-foreground">
      {step} من {PAGES.length} · <span dir="ltr">Collection Persona Framework™</span>
    </p>
  );
}

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

export const RouterContext = React.createContext<RouterContextType>({
  currentPath: "/",
  navigate: () => {},
});

export function useRouter() {
  return React.useContext(RouterContext);
}

export function NavLink({
  to,
  children,
  className = "",
  activeClassName = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to;

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      data-status={isActive ? "active" : "inactive"}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </button>
  );
}

export function TopNav() {
  const { currentPath, navigate } = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current
      ?.querySelector('[data-status="active"]')
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [currentPath]);

  return (
    <nav
      aria-label="أقسام العرض"
      className="sticky top-0 z-20 border-b bg-card/95 backdrop-blur shadow-xs"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 sm:px-4 py-2">
        <div
          ref={ref}
          className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PAGES.map((p, i) => {
            const isActive = currentPath === p.to;
            return (
              <button
                key={p.to}
                type="button"
                onClick={() => navigate(p.to)}
                data-status={isActive ? "active" : "inactive"}
                className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {i + 1}. {p.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 border-s border-border ps-2">
          <ExportSlidesButton variant="nav" />
          <ExportFinalReportButton variant="nav" />
        </div>
      </div>
    </nav>
  );
}

export function PageNav() {
  return null;
}

export function ContentPage({
  id,
  path,
  step,
  title,
  isFirst = false,
  children,
}: {
  id?: string;
  path?: PagePath;
  step: number;
  title: string;
  isFirst?: boolean;
  children: ReactNode;
}) {
  const HeadingTag = isFirst ? "h1" : "h2";

  return (
    <section
      id={id}
      data-section-path={path}
      className={`scroll-mt-20 space-y-4 ${isFirst ? "" : "pt-8 border-t border-border/60"}`}
    >
      <header className="space-y-1">
        <StepEyebrow step={step} />
        <HeadingTag className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
          <span className="h-6 w-1.5 rounded-full bg-gold shrink-0" />
          <span>{title}</span>
        </HeadingTag>
      </header>
      <div className="space-y-4 rounded-2xl border bg-card p-5 leading-loose shadow-card sm:p-7">
        {children}
      </div>
    </section>
  );
}

export function KpiBlock({
  name,
  en,
  target,
  note,
  method,
}: {
  name: string;
  en?: string;
  target: string;
  note: string;
  method?: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">اسم المؤشر</p>
        <p className="font-semibold text-foreground text-base leading-relaxed">{name}</p>
        {en && (
          <p className="text-xs text-muted-foreground mt-0.5" dir="ltr">
            {en}
          </p>
        )}
      </div>
      <div className="rounded-xl bg-secondary p-4 space-y-1.5">
        <p className="text-xs text-muted-foreground font-semibold">الهدف الرقمي (Target)</p>
        <p className="text-2xl font-bold text-primary">{target}</p>
        <p className="text-sm text-secondary-foreground leading-relaxed">{note}</p>
      </div>
      {method && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-1">
          <p className="text-xs text-muted-foreground font-semibold">طريقة القياس</p>
          <p className="text-sm text-foreground font-medium leading-relaxed" dir="rtl">{method}</p>
        </div>
      )}
    </div>
  );
}
