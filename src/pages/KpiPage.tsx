import { ContentPage, getStepNumber } from "@/components/SiteNav";

export function KpiPage() {
  return (
    <ContentPage id="kpi" path="/kpi" step={getStepNumber("/kpi")} title="المؤشر والهدف (KPI & Target)">
      <div className="space-y-6">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          منظومة مؤشرات الأداء والأهداف الرقمية المعتمدة للتحقق من فرضية كفاءة قرار التحصيل في إطار{" "}
          <span dir="ltr" className="inline-block font-semibold text-foreground">
            Collection Persona Framework™ (CPF)
          </span>
          :
        </p>

        {/* Headline KPI */}
        <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary text-primary-foreground px-2.5 py-1 text-xs font-bold">
                المؤشر الرئيسي
              </span>
              <span className="text-xs font-mono text-muted-foreground" dir="ltr">
                Headline KPI
              </span>
            </div>
            <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-xs font-semibold">
              اختبار قابلية الاستخدام
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-semibold">المؤشر الرئيسي</p>
            <p className="text-base sm:text-lg font-bold text-foreground leading-snug">
              نسبة إتمام أخصائي التحصيل للمهام الأساسية باستخدام النموذج الأولي لـ{" "}
              <span dir="ltr" className="inline-block">
                CPF
              </span>{" "}
              دون مساعدة.
            </p>
          </div>

          <div className="rounded-xl bg-secondary p-4 space-y-1">
            <p className="text-xs text-muted-foreground font-semibold">الهدف الرقمي الرئيسي</p>
            <p className="text-lg sm:text-xl font-extrabold text-primary leading-relaxed">
              80% على الأقل في اختبار قابلية الاستخدام.
            </p>
          </div>
        </div>

        {/* Supporting KPIs Grid */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-gold shrink-0" />
            <h2 className="text-sm font-bold text-foreground">
              المؤشرات الداعمة والأهداف الرقمية المعتمدة
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Supporting KPI 1 */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-bold">
                    المؤشر الداعم الأول
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground" dir="ltr">
                    Supporting KPI 1
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">المؤشر الداعم الأول</p>
                  <p className="text-sm font-bold text-foreground leading-relaxed">
                    متوسط تقييم أخصائي التحصيل لفائدة تحليل الأبعاد السبعة في فهم حالة العميل.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/75 p-3.5 space-y-1">
                <p className="text-[11px] text-muted-foreground font-semibold">
                  الهدف الرقمي الداعم الأول
                </p>
                <p className="text-base sm:text-lg font-extrabold text-primary leading-snug">
                  لا يقل عن 4 من 5 بمقياس ليكرت الخماسي.
                </p>
              </div>
            </div>

            {/* Supporting KPI 2 */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-bold">
                    المؤشر الداعم الثاني
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground" dir="ltr">
                    Supporting KPI 2
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">المؤشر الداعم الثاني</p>
                  <p className="text-sm font-bold text-foreground leading-relaxed">
                    متوسط تقييم أخصائي التحصيل لأهمية إظهار مبررات تصنيف العميل والتوصية بالإجراء التحصيلي المناسب{" "}
                    <span dir="ltr" className="inline-block">
                      NBCA
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-secondary/75 p-3.5 space-y-1">
                <p className="text-[11px] text-muted-foreground font-semibold">
                  الهدف الرقمي الداعم الثاني
                </p>
                <p className="text-base sm:text-lg font-extrabold text-primary leading-snug">
                  لا يقل عن 4 من 5 بمقياس ليكرت الخماسي.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
