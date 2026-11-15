import { StepEyebrow, getStepNumber } from "@/components/SiteNav";

interface TargetComparisonCard {
  badge: string;
  title: string;
  actualMetric: string;
  targetMetric: string;
  progressPct: number;
  summary: string;
  statusLine: string;
}

const COMPARISON_CARDS: TargetComparisonCard[] = [
  {
    badge: "المؤشر الرئيسي",
    title: "النتيجة الرئيسية لإتمام المهام دون مساعدة",
    actualMetric: "88.89%",
    targetMetric: "80%",
    progressPct: 88.89,
    summary:
      "نجاح 8 مهام من أصل 9 محاولات دون مساعدة، بنسبة نجاح بلغت 88.89%، وبمتوسط سهولة قدره 5.33 من 7 على مقياس SEQ.",
    statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 80%.",
  },
  {
    badge: "المؤشر الداعم الأول",
    title: "نتيجة المؤشر الداعم الأول لفائدة الأبعاد السبعة",
    actualMetric: "4.37 / 5",
    targetMetric: "4 / 5",
    progressPct: 87.4,
    summary:
      "حققت متوسط 4.37 من 5، بنسبة تقييمات إيجابية بلغت 84.2%، أي 16 من أصل 19 مشاركاً.",
    statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 4 من 5.",
  },
  {
    badge: "المؤشر الداعم الثاني",
    title: "نتيجة المؤشر الداعم الثاني لأهمية مبررات التصنيف والتوصية",
    actualMetric: "4.16 / 5",
    targetMetric: "4 / 5",
    progressPct: 83.2,
    summary:
      "حققت متوسط 4.16 من 5، بنسبة تقييمات إيجابية بلغت 89.5%، أي 17 من أصل 19 مشاركاً.",
    statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 4 من 5.",
  },
];

export function ResultVsTargetPage() {
  const step = getStepNumber("/result-vs-target");

  return (
    <section
      id="result-vs-target"
      data-section-path="/result-vs-target"
      className="scroll-mt-20 space-y-6 pt-8 border-t border-border/60"
    >
      <header className="space-y-1.5">
        <StepEyebrow step={step} />
        <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-primary">
          <span className="h-7 w-1.5 rounded-full bg-gold shrink-0" />
          <span>النتيجة مقابل الهدف</span>
        </h2>
      </header>

        {/* KPI Comparison Cards */}
        <section className="space-y-4">
          {COMPARISON_CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`rounded-2xl p-5 sm:p-6 shadow-card space-y-4 ${
                index === 0
                  ? "border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card"
                  : "border border-border bg-card"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="space-y-0.5">
                  <span className="inline-block rounded-md bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                    {card.badge}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-primary pt-1">
                    {card.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground">النتيجة</p>
                    <p className="text-base sm:text-lg font-extrabold text-emerald-700 dark:text-emerald-400" dir="ltr">
                      {card.actualMetric}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground font-bold">مقابل</span>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground">الهدف</p>
                    <p className="text-sm sm:text-base font-bold text-foreground" dir="ltr">
                      {card.targetMetric}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm leading-relaxed text-foreground font-medium">
                  {card.summary}
                </p>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${card.progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-600 text-[11px] text-white">
                  ✓
                </span>
                <span>{card.statusLine}</span>
              </div>
            </article>
          ))}
        </section>

        {/* Pattern Discovery & Drop-off Analysis */}
        <section className="rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-gold/10 via-card to-card p-5 sm:p-7 shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-primary">
                اكتشاف الأنماط ونقاط التعثر
              </h2>
            </div>
            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300">
              نقطة التحسين الجوهرية
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm leading-[1.95] text-foreground">
            <div className="rounded-xl border border-border bg-card/90 p-4">
              <p>
                كشف الاختبار عن تعثّر في الوصول المستقل للتوصية التحصيلية{" "}
                <span dir="ltr" className="inline-block font-bold text-primary">
                  NBCA
                </span>{" "}
                لدى إحدى المشاركات في المهمة الثالثة، بسبب غياب الربط المباشر بين التوصية ومبررات التصنيف.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card/90 p-4">
              <p>
                وتطابق ذلك مع النمط المتكرر لدى أكثر من 3 مشاركين في الاستبيان، الذين طالبوا بإبراز مبررات التصنيف{" "}
                <span dir="ltr" className="inline-block font-bold text-primary">
                  Reason Codes
                </span>{" "}
                في أعلى الشاشة وربط التوصية بها مباشرة.
              </p>
            </div>
          </div>
        </section>

    </section>
  );
}
