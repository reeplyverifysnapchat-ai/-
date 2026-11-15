import { StepEyebrow, getStepNumber } from "@/components/SiteNav";

const TALLY_URL = "https://tally.so/r/zENaA8";

interface LikertDistributionItem {
  label: string;
  countText: string;
  pct: number;
  highlight?: boolean;
}

function DistributionList({ items }: { items: LikertDistributionItem[] }) {
  return (
    <div className="space-y-2.5 pt-1">
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
            <span className="font-medium text-foreground">{item.label}</span>
            <span
              className={`font-bold ${
                item.highlight ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.countText}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                item.highlight ? "bg-primary" : "bg-gold/70"
              }`}
              style={{ width: `${item.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SurveyPage() {
  return (
    <section
      id="survey"
      data-section-path="/survey"
      className="scroll-mt-20 space-y-6 pt-8 border-t border-border/60"
    >
      {/* Page Step & Title Header */}
      <header className="space-y-2">
        <StepEyebrow step={getStepNumber("/survey")} />
        <h2 className="flex items-start sm:items-center gap-2.5 text-xl sm:text-2xl font-bold text-primary leading-snug">
          <span className="h-7 w-1.5 rounded-full bg-gold shrink-0 mt-1 sm:mt-0" />
          <span>
            استبيان تقييم إطار عمل البرسونا{" "}
            <span dir="ltr" className="inline-block">
              (Collection Persona Framework™ – CPF)
            </span>
          </span>
        </h2>
      </header>

        {/* Tally Survey Link Notice Card */}
        <section className="rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-md bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
                <span>تم تنفيذ الاستبيان إلكترونياً عبر منصة Tally</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-foreground">
                تم عمل الاستبيان الميداني وتجميع كافة الاستجابات عبر الرابط المرفق أدناه:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={TALLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs hover:opacity-90 transition"
              >
                <span>فتح رابط الاستبيان على Tally</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Highlight Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">إجمالي الاستجابات</p>
              <p className="mt-0.5 text-xl font-extrabold text-primary">19</p>
              <p className="text-[10px] text-muted-foreground">مكتملة 100%</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">فائدة الأبعاد السبعة</p>
              <p className="mt-0.5 text-xl font-extrabold text-emerald-700 dark:text-emerald-400" dir="ltr">
                4.37 / 5
              </p>
              <p className="text-[10px] text-muted-foreground">84.2% تقييم إيجابي</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">أهمية مبررات التصنيف</p>
              <p className="mt-0.5 text-xl font-extrabold text-emerald-700 dark:text-emerald-400" dir="ltr">
                4.16 / 5
              </p>
              <p className="text-[10px] text-muted-foreground">89.5% تقييم إيجابي</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">تفضيل إطار CPF</p>
              <p className="mt-0.5 text-xl font-extrabold text-primary">78.9%</p>
              <p className="text-[10px] text-muted-foreground">15 من 19 مشاركاً</p>
            </div>
          </div>
        </section>

        {/* Section 1: Survey Platform & Scope */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              1. المنصة المستضيفة ونطاق الاستبيان{" "}
              <span dir="ltr" className="inline-block">
                (Survey Platform &amp; Scope)
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            تم إنشاء وتصميم استبيان تقييم النموذج الأولي لإطار عمل البرسونا (<b>CPF</b>) وإطلاقه إلكترونياً لقياس نية وتصورات وتفضيلات المستخدمين المستهدفين بعد الاطلاع على النموذج الأولي التفاعلي.
          </p>

          <div className="rounded-xl bg-secondary/60 border border-border/60 p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-bold text-primary">
              بيانات المنصة ورابط الاستبيان:
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground list-disc list-inside">
              <li>
                <b>المنصة المستضيفة:</b> تم بناء الاستبيان وتصميمه عبر{" "}
                <b>منصة Tally الإلكترونية (Tally.so)</b>.
              </li>
              <li>
                <b>توضيح عن المنصة:</b> تُعد منصة <b>Tally</b> أداة رقمية متخصصة في بناء النماذج والاستبيانات الإلكترونية، وتتميز بتقديم نماذج وإجابات غير محدودة مجاناً، وتصميم أنيق وسلس مخصص للعرض على الجوال، مع دعم كامل للغة العربية ومحاذاة النصوص من اليمين إلى اليسار (RTL) لضمان تجربة مستخدم سهلة وسريعة.
              </li>
              <li>
                <b>رابط الاستبيان والتوزيع:</b> تم إنشاء رابط الاستبيان المباشر المولد عبر المنصة (
                <a
                  href={TALLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-mono font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                >
                  {TALLY_URL}
                </a>
                ) وتوزيعه إلكترونياً على المشاركين المستهدفين لاستطلاع آرائهم وتقييماتهم عقب مراجعة النموذج التفاعلي.
              </li>
              <li>
                <b>معدل الإكمال والزيارات:</b> أظهرت تحليلات المنصة تسجيل{" "}
                <b>19 استجابة مكتملة بنسبة إكمال بلغت 100%</b> دون تسجيل إجابات جزئية.
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-primary">أهداف الاستبيان:</h3>
            <ol className="space-y-2 text-xs sm:text-sm text-foreground list-decimal list-inside">
              <li>قياس مدى إدراك المستخدمين لفائدة الأبعاد السبعة المستخدمة في تحليل العميل.</li>
              <li>تقييم أهمية إظهار مبررات تصنيف البرسونا وتوضيحها للمستخدم.</li>
              <li>قياس أهمية ربط البرسونا بالتوصية التحصيلية المناسبة (Next Best Collection Action – NBCA).</li>
              <li>تقييم سهولة الوصول إلى القرار التحصيلي داخل النموذج الأولي.</li>
              <li>رصد أساليب العمل الحالية المتبعة في تحديد الإجراء التحصيلي.</li>
              <li>قياس تفضيل إطار CPF مقارنة بالطرق التقليدية المتبعة.</li>
              <li>جمع الملاحظات والمقترحات النصية المفتوحة لتحسين الواجهات والوظائف.</li>
            </ol>
          </div>
        </section>

        {/* Section 2: Sample Demographics */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              2. خصائص عينة المشاركين (Sample Demographics)
            </h2>
          </div>

          <p className="text-sm sm:text-base text-foreground">
            ضم الاستبيان <b>19 مشاركاً مكتمل الاستجابة</b> من الفئات الوظيفية المستهدفة داخل القطاع المصرفي:
          </p>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-foreground">
                  <th className="p-3 text-start font-bold">الدور الوظيفي</th>
                  <th className="p-3 text-center font-bold">عدد المشاركين</th>
                  <th className="p-3 text-center font-bold">النسبة المئوية</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="p-3 font-semibold text-foreground">
                    أخصائي / موظف تحصيل مديونيات الأفراد
                  </td>
                  <td className="p-3 text-center font-bold text-primary">15</td>
                  <td className="p-3 text-center font-bold text-primary">78.9%</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-3 font-semibold text-foreground">
                    محلل مخاطر أو ائتمان
                  </td>
                  <td className="p-3 text-center font-bold text-primary">4</td>
                  <td className="p-3 text-center font-bold text-primary">21.1%</td>
                </tr>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <td className="p-3">إدارة العمليات والرقابة التحصيلية</td>
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">0.0%</td>
                </tr>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <td className="p-3">دور وظيفي آخر</td>
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">0.0%</td>
                </tr>
                <tr className="bg-secondary/60 font-bold text-foreground">
                  <td className="p-3">الإجمالي</td>
                  <td className="p-3 text-center text-primary">19</td>
                  <td className="p-3 text-center text-primary">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-accent/50 border border-gold/30 p-4 space-y-1">
            <h3 className="text-xs sm:text-sm font-bold text-primary">
              القراءة التحليلية للعينة:
            </h3>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              تُظهر البيانات أن غالبية العينة (<b>78.9%</b>) يمثلون الموظفين والأخصائيين المباشرين لعمليات التحصيل، مما يعطي تقييماً واقعياً لقابلية الاستخدام في بيئة العمل الميداني، بمشاركة <b>21.1%</b> من محللي المخاطر لإضافة بعد رقابي وتحليلي لتقييم المنظومة.
            </p>
          </div>
        </section>

        {/* Section 3: Survey Questions & All Responses */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              3. عرض أسئلة الاستبيان وإجابات المشاركين كافة (Survey Questions &amp; All Responses)
            </h2>
          </div>

          <p className="rounded-xl bg-muted/60 px-4 py-3 text-xs sm:text-sm text-foreground">
            اعتمدت الأسئلة التقييمية على <b>مقياس ليكرت الخماسي المتوازن</b> (من 1 = التقييم السلبي الأدنى، إلى 5 = التقييم الإيجابي الأعلى).
          </p>

          <div className="space-y-5">
            {/* Q1 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                س1: ما هو دورك الوظيفي الحالي في القطاع المصرفي؟
              </h3>
              <p className="text-xs text-muted-foreground">
                <b>الخيارات:</b> (أخصائي/موظف تحصيل مديونيات الأفراد - محلل مخاطر - إدارة العمليات والرقابة - آخر)
              </p>
              <DistributionList
                items={[
                  {
                    label: "أخصائي / موظف تحصيل",
                    countText: "15 مشاركاً (78.9%)",
                    pct: 78.9,
                    highlight: true,
                  },
                  {
                    label: "محلل مخاطر",
                    countText: "4 مشاركين (21.1%)",
                    pct: 21.1,
                    highlight: true,
                  },
                  {
                    label: "إدارة العمليات والرقابة / آخر",
                    countText: "0 مشارك (0.0%)",
                    pct: 0,
                  },
                ]}
              />
            </article>

            {/* Q2 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  س2: ما مدى فائدة عرض الأبعاد السبعة لتحليل حالة العميل في إطار CPF؟
                </h3>
                <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  المتوسط: <span dir="ltr">4.37 / 5</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <b>الهدف:</b> قياس مدى جدوى التحليل متعدد الأبعاد (مالي، سلوكي، رقمي، ديموغرافي...) بدلاً من الاعتماد على قيمة الدين فقط.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                  المتوسط الحسابي: 4.37 من 5
                </span>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  نسبة التقييمات الإيجابية (درجات 4 و5): 84.2% (16 من أصل 19 مشاركاً)
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-foreground">توزيع الإجابات التفصيلي كافة:</p>
                <DistributionList
                  items={[
                    { label: "الدرجة 5 (مفيد جداً)", countText: "12 مشاركاً (63.2%)", pct: 63.2, highlight: true },
                    { label: "الدرجة 4 (مفيد)", countText: "4 مشاركين (21.1%)", pct: 21.1, highlight: true },
                    { label: "الدرجة 3 (محايد)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
                    { label: "الدرجة 2 (غير مفيد)", countText: "مشاركان (10.5%)", pct: 10.5 },
                    { label: "الدرجة 1 (غير مفيد إطلاقاً)", countText: "0 مشارك (0.0%)", pct: 0 },
                  ]}
                />
              </div>
              <p className="rounded-lg bg-secondary/50 p-3 text-xs sm:text-sm text-foreground">
                <b>التحليل:</b> يعكس التقييم تأييداً مرتفعاً لمبدأ التحليل الشامل؛ حيث يرى المشاركون أن استعراض الأبعاد السبعة يمنح فهمًا أعمق لظروف العميل السلوكية والمالية قبل التواصل.
              </p>
            </article>

            {/* Q3 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  س3: ما مدى أهمية إظهار مبررات تصنيف البرسونا والتوصية بالإجراء التحصيلي (NBCA)؟
                </h3>
                <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  المتوسط: <span dir="ltr">4.16 / 5</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <b>الهدف:</b> قياس أهمية الشفافية وقابلية التفسير للأسباب التي بُني عليها التصنيف والتوصية.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                  المتوسط الحسابي: 4.16 من 5
                </span>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  نسبة التقييمات الإيجابية (درجات 4 و5): 89.5% (17 من أصل 19 مشاركاً)
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-foreground">توزيع الإجابات التفصيلي كافة:</p>
                <DistributionList
                  items={[
                    { label: "الدرجة 5 (مهم جداً)", countText: "9 مشاركين (47.4%)", pct: 47.4, highlight: true },
                    { label: "الدرجة 4 (مهم)", countText: "8 مشاركين (42.1%)", pct: 42.1, highlight: true },
                    { label: "الدرجة 3 (محايد)", countText: "0 مشارك (0.0%)", pct: 0 },
                    { label: "الدرجة 2 (غير مهم)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
                    { label: "الدرجة 1 (غير مهم إطلاقاً)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
                  ]}
                />
              </div>
              <p className="rounded-lg bg-secondary/50 p-3 text-xs sm:text-sm text-foreground">
                <b>التحليل:</b> تؤكد هذه النتيجة أن الأخصائي يحتاج إلى فهم الأسباب ومبررات التصنيف (Reason Codes) والأساس الذي بُنيت عليه التوصية لتعزيز الثقة في القرار.
              </p>
            </article>

            {/* Q4 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  س4: ما مدى سهولة الوصول إلى الخيار والقرار التحصيلي المناسب داخل النموذج الأولي؟
                </h3>
                <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  المتوسط: <span dir="ltr">4.26 / 5</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <b>الهدف:</b> تقييم سلاسة وضوح الشاشات والوصول للتوصية.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                  المتوسط الحسابي: 4.26 من 5
                </span>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  نسبة التقييمات الإيجابية (درجات 4 و5): 78.9% (15 من أصل 19 مشاركاً)
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-foreground">توزيع الإجابات التفصيلي كافة:</p>
                <DistributionList
                  items={[
                    { label: "الدرجة 5 (سهل جداً)", countText: "11 مشاركاً (57.9%)", pct: 57.9, highlight: true },
                    { label: "الدرجة 4 (سهل)", countText: "4 مشاركين (21.1%)", pct: 21.1, highlight: true },
                    { label: "الدرجة 3 (محايد)", countText: "مشاركان (10.5%)", pct: 10.5 },
                    { label: "الدرجة 2 (صعب)", countText: "مشاركان (10.5%)", pct: 10.5 },
                    { label: "الدرجة 1 (صعب جداً)", countText: "0 مشارك (0.0%)", pct: 0 },
                  ]}
                />
              </div>
              <p className="rounded-lg bg-secondary/50 p-3 text-xs sm:text-sm text-foreground">
                <b>التحليل:</b> رغم التقييم الإيجابي العام، فإن وجود 4 تقييمات بدرجات 2 و3 (21.1%) يستدعي تحسين إبراز التوصية وتقليل الخطوات لضمان وصول الجميع للقرار بنفس السلاسة.
              </p>
            </article>

            {/* Q5 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                س5: ما هو أسلوب العمل الذي تعتمد عليه حالياً عند تحديد الإجراء التحصيلي للعميل؟
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <b>الهدف:</b> رصد الواقع التشغيلي الحالي وكشف الفجوة في بيئة العمل.
              </p>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-foreground">توزيع الإجابات التفصيلي كافة:</p>
                <DistributionList
                  items={[
                    {
                      label: "1. اعتماد إجراء موحد ونمطي لجميع الحالات",
                      countText: "11 مشاركاً (57.9%)",
                      pct: 57.9,
                      highlight: true,
                    },
                    {
                      label: "2. مراجعة يدوية لعدة شاشات وأنظمة متفرقة",
                      countText: "5 مشاركين (26.3%)",
                      pct: 26.3,
                      highlight: true,
                    },
                    {
                      label: "3. الاستعانة بالتوصيات التلقائية المتاحة بالنظام",
                      countText: "3 مشاركين (15.8%)",
                      pct: 15.8,
                    },
                  ]}
                />
              </div>
              <p className="rounded-lg bg-secondary/50 p-3 text-xs sm:text-sm text-foreground">
                <b>التحليل:</b> تُظهر النتائج أن <b>84.2% من المشاركين</b> يعانون إما من نمطية المعالجة الموحدة (57.9%) أو استنزاف الوقت في المراجعة اليدوية المتفرقة (26.3%)، مما يبرز الحاجة التشغيلية المباشرة لمنظومة CPF.
              </p>
            </article>

            {/* Q6 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary">
                  س6: ما مدى تفضيلك لإطار CPF مقارنة بالطريقة التقليدية المتبعة حالياً؟
                </h3>
                <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  المتوسط: <span dir="ltr">4.16 / 5</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                <b>الهدف:</b> قياس القبول والنية للانتقال للمفهوم الجديد.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                  المتوسط الحسابي: 4.16 من 5
                </span>
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-700 dark:text-emerald-400">
                  نسبة التأييد الإيجابي (درجات 4 و5): 78.9% (15 من أصل 19 مشاركاً)
                </span>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-foreground">توزيع الإجابات التفصيلي كافة:</p>
                <DistributionList
                  items={[
                    { label: "الدرجة 5 (أفضّل CPF بكثير)", countText: "10 مشاركين (52.6%)", pct: 52.6, highlight: true },
                    { label: "الدرجة 4 (أفضّل CPF)", countText: "5 مشاركين (26.3%)", pct: 26.3, highlight: true },
                    { label: "الدرجة 3 (محايد / لا يوجد فرق)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
                    { label: "الدرجة 2 (أفضّل الطريقة التقليدية)", countText: "3 مشاركين (15.8%)", pct: 15.8 },
                    { label: "الدرجة 1 (أفضّل الطريقة التقليدية بكثير)", countText: "0 مشارك (0.0%)", pct: 0 },
                  ]}
                />
              </div>
              <p className="rounded-lg bg-secondary/50 p-3 text-xs sm:text-sm text-foreground">
                <b>التحليل:</b> أظهرت البيانات تفضيلاً واضحاً ورغبة لدى 78.9% من المشاركين للتحول نحو إطار CPF بدلاً من الإجراءات النمطية التقليدية.
              </p>
            </article>

            {/* Q7 */}
            <article className="rounded-xl border border-border bg-background/50 p-4 sm:p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                س7: ما هي أبرز ملاحظاتك أو مقترحاتك لتحسين شاشات ومعلومات النموذج الأولي؟ (سؤال مفتوح)
              </h3>
              <p className="text-xs sm:text-sm text-foreground">
                <b>الاستجابة:</b> قدّم <b>18 مشاركاً من أصل 19 تعليقات نصية تفصيلية</b>.
              </p>
            </article>
          </div>
        </section>

        {/* Section 4: Pattern Mining */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              4. تحليل الأنماط والملاحظات النوعية (Pattern Mining)
            </h2>
          </div>

          <p className="text-sm text-foreground">
            وفقاً لقواعد تحليل البيانات النصية (اعتبار تكرار الملاحظة لدى{" "}
            <b>3 أشخاص أو أكثر نمطاً واضحاً يستوجب التعديل والعمل عليه</b>)، تم استخراج الأنماط التالية من إجابات السؤال السابع:
          </p>

          {/* Visual Pattern Hierarchy Diagram */}
          <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5 space-y-4">
            <div className="flex justify-center">
              <span className="rounded-xl border border-primary/30 bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs">
                أنماط الملاحظات النصية
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-primary/25 bg-card p-4 space-y-2 shadow-xs">
                <p className="text-xs font-bold text-primary border-b border-border/60 pb-1.5">
                  النمط 1: مبررات التصنيف
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  <li>إبراز أكواد الأسباب</li>
                  <li>وضعها في أعلى الشاشة</li>
                  <li>تمييزها بألوان تنبيهية</li>
                </ul>
              </div>

              <div className="rounded-xl border border-primary/25 bg-card p-4 space-y-2 shadow-xs">
                <p className="text-xs font-bold text-primary border-b border-border/60 pb-1.5">
                  النمط 2: الربط بالتوصية
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  <li>ربط مباشر بين البرسونا وإجراء NBCA المقترح</li>
                  <li>توضيح سبب اختيار الإجراء</li>
                </ul>
              </div>

              <div className="rounded-xl border border-primary/25 bg-card p-4 space-y-2 shadow-xs">
                <p className="text-xs font-bold text-primary border-b border-border/60 pb-1.5">
                  النمط 3: التنفيذ المباشر
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  <li>زر مباشر لإرسال رابط السداد</li>
                  <li>تقرير ملخص قابل للطباعة</li>
                  <li>ألوان ورموز بصرية للتمييز</li>
                </ul>
              </div>
            </div>
          </div>

          <ol className="space-y-3 text-xs sm:text-sm">
            <li className="rounded-xl border border-border bg-background/60 p-4 space-y-1.5">
              <p className="font-bold text-foreground">
                1. النمط الأول: إبراز مبررات تصنيف البرسونا (Reason Codes) أعلى الشاشة{" "}
                <span className="text-primary">(ظهر لدى 5 مشاركين - نمط واضح)</span>
              </p>
              <p className="text-muted-foreground">
                <i>أبرز التعليقات:</i> «إظهار مبررات تصنيف البرسونا مفيد جداً، ولكن أفضّل إبرازها في أعلى الشاشة بلون مختلف لسهولة قراءتها قبل اختيار الإجراء التحصيلي».
              </p>
            </li>

            <li className="rounded-xl border border-border bg-background/60 p-4 space-y-1.5">
              <p className="font-bold text-foreground">
                2. النمط الثاني: الربط المباشر بين خصائص البرسونا والتوصية التحصيلية (NBCA){" "}
                <span className="text-primary">(ظهر لدى 4 مشاركين - نمط واضح)</span>
              </p>
              <p className="text-muted-foreground">
                <i>أبرز التعليقات:</i> «أقترح تطوير التوصيات لتكون أكثر ارتباطاً بخصائص كل شخصية وتحليل ظروفها».
              </p>
            </li>

            <li className="rounded-xl border border-border bg-background/60 p-4 space-y-1.5">
              <p className="font-bold text-foreground">
                3. النمط الثالث: إضافة أزرار تنفيذاً وتقارير مساندة{" "}
                <span className="text-primary">(ظهر لدى 4 مشاركين - نمط واضح)</span>
              </p>
              <p className="text-muted-foreground">
                <i>أبرز التعليقات:</i> «إضافة زر مباشر لإرسال رابط السداد الذاتي للعميل بنقرة واحدة من شاشة التوصية»، و«إمكانية طباعة تقرير مختصر يتضمن نتائج التحليل والتوصية».
              </p>
            </li>

            <li className="rounded-xl border border-border bg-background/60 p-4 space-y-1.5">
              <p className="font-bold text-foreground">
                4. النمط الرابع: التمييز البصري بالشعار والألوان{" "}
                <span className="text-amber-700 dark:text-amber-400">(ظهر لدى مشاركين اثنين - فئة &quot;راقبه&quot;)</span>
              </p>
              <p className="text-muted-foreground">
                <i>أبرز التعليقات:</i> «استخدام ألوان ورموز بصرية لتمييز شخصيات البرسونا وتسهيل قراءتها بسرعة».
              </p>
            </li>
          </ol>
        </section>

        {/* Section 5: Results vs. Targets */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              5. مقارنة النتائج بالأهداف الرقمية المحددة مسبقاً (Results vs. Targets)
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-foreground">
                  <th className="p-3 text-start font-bold">المؤشر الداعم</th>
                  <th className="p-3 text-center font-bold">الهدف الرقمي المسبق</th>
                  <th className="p-3 text-center font-bold">النتيجة الفعلية المحسوبة</th>
                  <th className="p-3 text-center font-bold">موقف الهدف</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="p-3 font-semibold text-foreground">
                    فائدة عرض الأبعاد السبعة
                  </td>
                  <td className="p-3 text-center text-muted-foreground">
                    لا يقل عن <b>4.00 من 5</b>
                  </td>
                  <td className="p-3 text-center font-bold text-primary">
                    4.37 من 5 (84.2% إيجابي)
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      تحقق وتجاوز الهدف بامتياز
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-3 font-semibold text-foreground">
                    أهمية مبررات التصنيف والتوصية
                  </td>
                  <td className="p-3 text-center text-muted-foreground">
                    لا يقل عن <b>4.00 من 5</b>
                  </td>
                  <td className="p-3 text-center font-bold text-primary">
                    4.16 من 5 (89.5% إيجابي)
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      تحقق وتجاوز الهدف بامتياز
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-3 font-semibold text-foreground">
                    سهولة الوصول للقرار التحصيلي
                  </td>
                  <td className="p-3 text-center text-muted-foreground">
                    لا يقل عن <b>4.00 من 5</b>
                  </td>
                  <td className="p-3 text-center font-bold text-primary">
                    4.26 من 5 (78.9% إيجابي)
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      تحقق وتجاوز الهدف بنجاح
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">
                    تفضيل CPF على الطريقة التقليدية
                  </td>
                  <td className="p-3 text-center text-muted-foreground">
                    لا يقل عن <b>60.0%</b> تأييد
                  </td>
                  <td className="p-3 text-center font-bold text-primary">
                    78.9% (15 من 19 مشاركاً)
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-block rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      تحقق وتجاوز الهدف بنجاح
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Actionable Decisions */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 leading-relaxed">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-lg font-bold text-primary">
              6. القرارات التطويرية والخطوات التالية (Actionable Decisions)
            </h2>
          </div>

          <p className="text-sm text-foreground">
            اعتماداً على نتائج القياس الكمي وتحليل أنماط المقترحات، تقرر الآتي:
          </p>

          <blockquote className="rounded-xl border-s-4 border-gold bg-accent/40 p-4 sm:p-5 text-sm sm:text-base font-semibold leading-[2] text-foreground">
            &quot;نُبقي على الفكرة، ونُبرز مبررات التصنيف في أعلى الشاشة بلون متميز وشرح موجز، ونربط التوصية التحصيلية (NBCA) بخصائص البرسونا مباشرة، مع إضافة زر السداد الذاتي داخل النموذج الأولي لـ CPF، ثم نختبر مجدداً في التجربة التشغيلية&quot;.
          </blockquote>
        </section>

    </section>
  );
}
