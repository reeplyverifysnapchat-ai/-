import { StepEyebrow, getStepNumber, useRouter } from "@/components/SiteNav";
import { ExportFinalReportButton } from "@/components/ExportFinalReportButton";
import { ExportSlidesButton } from "@/components/ExportSlidesButton";

export function FinalDecisionPage() {
  const step = getStepNumber("/final-decision");
  const { navigate } = useRouter();

  return (
    <section
      id="final-decision"
      data-section-path="/final-decision"
      className="scroll-mt-20 space-y-6 pt-8 pb-12 border-t border-border/60"
    >
      <header className="space-y-1.5">
        <StepEyebrow step={step} />
        <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-primary">
          <span className="h-7 w-1.5 rounded-full bg-gold shrink-0" />
          <span>القرار النهائي</span>
        </h2>
      </header>

        {/* Main Decision Card */}
        <section className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8 shadow-card space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <span>✓</span>
              <span>القرار النهائي المعتمد</span>
            </span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              الاحتفاظ بالفكرة مع التطوير الموجّه
            </span>
          </div>

          <blockquote className="rounded-2xl border-s-4 border-gold bg-card p-5 sm:p-6 shadow-xs text-base sm:text-lg font-bold leading-[2.1] text-primary">
            نُبقي على الفكرة، ونُبرز مبررات التصنيف في أعلى الشاشة ونربط التوصية التحصيلية بها بشكل مباشر داخل النموذج الأولي لـ{" "}
            <span dir="ltr" className="inline-block">
              CPF
            </span>
            ، ثم نختبر مجدداً في التجربة التشغيلية.
          </blockquote>

          {/* Decision Pillars */}
          <div className="grid gap-3 sm:grid-cols-3 pt-1">
            <div className="rounded-xl border border-border bg-card/90 p-4 space-y-1.5">
              <span className="inline-block rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                1. الإبقاء على الفكرة
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تحققت جميع الأهداف المسبقة (88.89% نجاح المهام، 4.37 فائدة الأبعاد، 4.16 أهمية المبررات).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card/90 p-4 space-y-1.5">
              <span className="inline-block rounded-md bg-gold/25 px-2 py-0.5 text-[11px] font-bold text-primary">
                2. التحسين المباشر في CPF
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                إبراز مبررات التصنيف في أعلى الشاشة وربط التوصية التحصيلية بها مباشرة داخل النموذج الأولي.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card/90 p-4 space-y-1.5">
              <span className="inline-block rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
                3. الخطوة التالية
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                إعادة الاختبار مجدداً في التجربة التشغيلية للتحقق من أثر الترابط البصري وسرعة القرار.
              </p>
            </div>
          </div>

          {/* Quick Jump Back to Supporting Evidence */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/result-vs-target")}
                className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
              >
                مراجعة النتيجة مقابل الهدف
              </button>
              <button
                type="button"
                onClick={() => navigate("/results")}
                className="rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/15 transition cursor-pointer"
              >
                عرض التقرير الشامل والنتائج
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ExportSlidesButton variant="hero" />
              <ExportFinalReportButton variant="hero" />
            </div>
          </div>
        </section>

    </section>
  );
}
