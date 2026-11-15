import { StepEyebrow, getStepNumber } from "@/components/SiteNav";

export function MethodSamplePage() {
  const step = getStepNumber("/method-sample");

  return (
    <section
      id="method-sample"
      data-section-path="/method-sample"
      className="scroll-mt-20 space-y-6 pt-8 border-t border-border/60"
    >
      <header className="space-y-1.5">
        <StepEyebrow step={step} />
        <h2 className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-primary">
          <span className="h-7 w-1.5 rounded-full bg-gold shrink-0" />
          <span>الطريقة والعينة</span>
        </h2>
      </header>

        {/* 1. Methodology Section */}
        <section className="rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-7 shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary text-primary-foreground px-2.5 py-1 text-xs font-bold">
                الطريقة
              </span>
              <span className="text-xs font-mono text-muted-foreground" dir="ltr">
                Methodology
              </span>
            </div>
            <span className="rounded-full bg-gold/20 text-primary px-2.5 py-0.5 text-xs font-semibold">
              منهجية تقييم تكاملية
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium leading-[2] text-foreground">
            تعتمد الطريقة المستخدمة في مشروع إطار عمل البرسونا{" "}
            <span dir="ltr" className="inline-block font-bold text-primary">
              CPF
            </span>{" "}
            على الجمع التكاملي بين منهجين متكاملين لقياس النية والسلوك الفعلي:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 pt-1">
            {/* Method 1: Survey */}
            <div className="rounded-xl border border-border bg-card/95 p-4 sm:p-5 space-y-3">
              <div className="space-y-1 border-b border-border/60 pb-2.5">
                <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  المنهج الأول · قياس النية والانطباعات
                </span>
                <h2 className="text-sm sm:text-base font-bold text-primary leading-snug">
                  1. استبيان تقييم النموذج الأولي{" "}
                  <span dir="ltr" className="inline-block text-xs sm:text-sm font-semibold">
                    Survey
                  </span>{" "}
                  لقياس النية والانطباعات
                </h2>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-foreground">
                <div className="rounded-lg bg-secondary/50 p-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-primary">نوع الأداة:</p>
                  <p>
                    نموذج تقييمي إلكتروني أُطلق عبر منصة{" "}
                    <span dir="ltr" className="inline-block font-semibold">
                      Tally
                    </span>{" "}
                    الرقمية.
                  </p>
                </div>

                <div className="rounded-lg bg-background/70 border border-border/60 p-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-primary">الهدف منه:</p>
                  <p className="text-muted-foreground">
                    قياس ما يقوله المشاركون من خلال استطلاع تصورات وآراء الفئات المستهدفة حول فائدة الأبعاد السبعة، وأهمية مبررات التصنيف{" "}
                    <span dir="ltr" className="inline-block font-semibold text-foreground">
                      Reason Codes
                    </span>
                    ، وسهولة الوصول إلى القرار، وتفضيل الإطار مقارنة بالطريقة التقليدية.
                  </p>
                </div>
              </div>
            </div>

            {/* Method 2: Moderated Usability Test */}
            <div className="rounded-xl border border-border bg-card/95 p-4 sm:p-5 space-y-3">
              <div className="space-y-1 border-b border-border/60 pb-2.5">
                <span className="inline-block rounded-md bg-gold/20 px-2 py-0.5 text-[11px] font-bold text-primary">
                  المنهج الثاني · قياس السلوك الفعلي
                </span>
                <h2 className="text-sm sm:text-base font-bold text-primary leading-snug">
                  2. اختبار الاستخدام الموجّه{" "}
                  <span dir="ltr" className="inline-block text-xs sm:text-sm font-semibold">
                    Moderated Usability Test
                  </span>{" "}
                  لقياس السلوك الفعلي
                </h2>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-foreground">
                <div className="rounded-lg bg-secondary/50 p-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-primary">نوع الأداة:</p>
                  <p>جلسات تفاعلية حضورية في مقر العمل باستخدام النموذج الأولي.</p>
                </div>

                <div className="rounded-lg bg-background/70 border border-border/60 p-3 space-y-0.5">
                  <p className="text-[11px] font-bold text-primary">الهدف منه:</p>
                  <p className="text-muted-foreground">
                    قياس ما يفعله المشاركون فعلياً، ورصد الأداء التشغيلي لأخصائيي التحصيل أثناء تنفيذ ثلاث مهام عملية أساسية دون مساعدة، وحساب نسبة نجاح إتمام المهام ودرجة السهولة{" "}
                    <span dir="ltr" className="inline-block font-semibold text-foreground">
                      SEQ
                    </span>
                    ، ورصد نقاط التعثر.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sample Section */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-primary">العينة</h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground" dir="ltr">
              Sample
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Moderated Usability Sample */}
            <div className="rounded-2xl border border-primary/20 bg-secondary/40 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  عينة اختبار الاستخدام الموجّه
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-border bg-card p-2.5">
                  <p className="text-xl font-extrabold text-primary">3</p>
                  <p className="text-[11px] text-muted-foreground">أخصائيي تحصيل</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-2.5">
                  <p className="text-xl font-extrabold text-foreground">3</p>
                  <p className="text-[11px] text-muted-foreground">مهام لكل مشارك</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-2.5">
                  <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">9</p>
                  <p className="text-[11px] text-muted-foreground">محاولات تشغيلية</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                3 أخصائيي تحصيل معتمدين، نفّذ كل منهم 3 مهام عملية مستقلة في مقر العمل، بإجمالي 9 محاولات تشغيلية.
              </p>
            </div>

            {/* Survey Sample */}
            <div className="rounded-2xl border border-primary/20 bg-secondary/40 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  عينة الاستبيان
                </h3>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  إكمال 100%
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                19 مشاركاً مكتمل الاستجابة بنسبة 100%، تمثّل 15 أخصائي وموظف تحصيل مديونيات أفراد بنسبة 78.9%، و4 محللي ائتمان ومخاطر بنسبة 21.1%.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      أخصائي وموظف تحصيل مديونيات أفراد
                    </span>
                    <span className="font-bold text-primary">15 (78.9%)</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: "78.9%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      محللو ائتمان ومخاطر
                    </span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">4 (21.1%)</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gold" style={{ width: "21.1%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    </section>
  );
}
