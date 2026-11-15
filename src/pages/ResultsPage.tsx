import { useRef, useState } from "react";
import { StepEyebrow, getStepNumber } from "@/components/SiteNav";
import { generatePdfFromElement } from "@/lib/pdfExport";
import {
  ALL_OPEN_RESPONSES,
  CURRENT_PRACTICE_ROWS,
  DEMOGRAPHICS_ROWS,
  IMPROVEMENT_OPPORTUNITIES,
  INTEGRATIVE_COMPARISON_ROWS,
  MODERATED_TASKS,
  OPEN_THEMES,
  REPORT_METADATA,
  SURVEY_SCALE_QUESTIONS,
  USABILITY_EASE_MATRIX,
  USABILITY_SESSIONS,
  USABILITY_TASK_MATRIX,
} from "@/lib/evaluationReportData";

function SectionHeading({ id, title }: { id?: string; title: string }) {
  return (
    <div id={id} className="flex items-center gap-2 border-b border-border pb-3 scroll-mt-20">
      <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
      <h3 className="text-base sm:text-lg font-bold text-primary">{title}</h3>
    </div>
  );
}

export function ResultsPage() {
  const [exportingPdf, setExportingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  async function handleExportPdf() {
    if (!reportRef.current) return;
    setExportingPdf(true);
    try {
      await generatePdfFromElement(
        reportRef.current,
        "cpf-evaluation-analysis-report.pdf",
      );
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <section
      id="results"
      data-section-path="/results"
      className="scroll-mt-20 space-y-6 pt-8 border-t border-border/60"
    >
      {/* Top Action & Step Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <StepEyebrow step={getStepNumber("/results")} />
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
            <span className="h-7 w-1.5 rounded-full bg-gold shrink-0" />
            <span>{REPORT_METADATA.mainTitle}</span>
          </h2>
        </div>
          <button
            type="button"
            disabled={exportingPdf}
            onClick={handleExportPdf}
            className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-90 transition cursor-pointer disabled:opacity-50"
          >
            {exportingPdf ? "جارٍ تجهيز PDF..." : "تصدير التقرير PDF"}
          </button>
        </header>

        {/* Quick Section Navigation Anchors */}
        <nav
          aria-label="فهرس التقرير"
          className="flex flex-wrap gap-1.5 rounded-2xl border border-border bg-card p-3 shadow-xs"
        >
          {[
            ["#sec-1", "1. الملخص التنفيذي"],
            ["#sec-2", "2. المقدمة"],
            ["#sec-3", "3. الأهداف"],
            ["#sec-4", "4. المنهجية"],
            ["#sec-5", "5. نتائج الاستبيان"],
            ["#sec-6", "6. اختبار الاستخدام الموجّه"],
            ["#sec-7", "7. جلسات المشاركين"],
            ["#sec-8", "8. النتائج الإجمالية للاختبار"],
            ["#sec-9", "9. التحليل التكاملي"],
            ["#sec-10", "10. نقاط القوة"],
            ["#sec-11", "11. فرص التحسين"],
            ["#sec-12", "12. القيود المنهجية"],
            ["#sec-13", "13. الاستنتاج النهائي"],
            ["#appendices", "الملاحق (1–4)"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Complete Printable Report Container */}
        <div ref={reportRef} className="space-y-6">
          {/* Report Cover / Metadata Card */}
          <section className="rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-7 shadow-card space-y-4">
            <div className="space-y-1.5 border-b border-border/60 pb-4">
              <p className="text-lg sm:text-xl font-extrabold text-primary">
                {REPORT_METADATA.mainTitle}
              </p>
              <p className="text-sm sm:text-base font-bold text-foreground">
                إطار عمل البرسونا –{" "}
                <span dir="ltr" className="inline-block">
                  Collection Persona Framework™️ (CPF)
                </span>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="rounded-xl border border-border bg-card/80 p-3.5 space-y-1">
                <p className="text-muted-foreground font-semibold">نوع التقييم:</p>
                <p className="font-bold text-foreground">{REPORT_METADATA.evalTypeAr}</p>
                <p className="text-xs font-mono text-muted-foreground" dir="ltr">
                  {REPORT_METADATA.evalTypeEn}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card/80 p-3.5 space-y-1">
                <p className="text-muted-foreground font-semibold">طريقة تنفيذ الاختبار:</p>
                <p className="font-semibold text-foreground">{REPORT_METADATA.testMethod}</p>
                <p className="text-xs text-muted-foreground">
                  تاريخ جمع بيانات الاستبيان:{" "}
                  <b className="text-foreground">{REPORT_METADATA.collectionDate}</b>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-[11px] text-muted-foreground">عدد المشاركين في الاستبيان</p>
                <p className="mt-1 text-xl font-extrabold text-primary">19 مشاركاً</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-[11px] text-muted-foreground">المشاركون في الاختبار الموجّه</p>
                <p className="mt-1 text-xl font-extrabold text-primary">3 أخصائيي تحصيل</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-[11px] text-muted-foreground">عدد المهام</p>
                <p className="mt-1 text-xl font-extrabold text-foreground">3 مهام لكل مشارك</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-[11px] text-muted-foreground">إجمالي محاولات تنفيذ المهام</p>
                <p className="mt-1 text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  9 محاولات
                </p>
              </div>
            </div>
          </section>

          {/* 1. Executive Summary */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-1" title="1. الملخص التنفيذي" />
            <p>
              يستعرض هذا التقرير نتائج تقييم النموذج الأولي لإطار عمل البرسونا (Collection Persona Framework™️ – CPF)، من خلال مصدرين للتقييم: استبيان تقييم النموذج الأولي، واختبار الاستخدام الموجّه (Moderated Usability Testing).
            </p>
            <p>
              استهدف التقييم التحقق من مدى وضوح النموذج وسهولة استخدامه، وقياس مدى إدراك المستخدمين لفائدة تحليل العميل من خلال أبعاد متعددة، وأهمية إظهار مبررات تصنيف البرسونا وربطها بالتوصية التحصيلية المناسبة (Next Best Collection Action – NBCA).
            </p>
            <p>
              شمل الاستبيان 19 استجابة مكتملة، وتضمن سبعة أسئلة تناولت الأدوار الوظيفية للمشاركين، وفائدة الأبعاد المستخدمة في تحليل العميل، وأهمية مبررات التصنيف والتوصية، وسهولة الوصول إلى القرار التحصيلي، والممارسة الحالية في تحديد الإجراء، ومدى تفضيل إطار CPF مقارنة بالطريقة التقليدية، إضافة إلى سؤال مفتوح للملاحظات والمقترحات.
            </p>
            <p>
              وأظهرت نتائج الاستبيان متوسطاً بلغ <b>4.37 من 5</b> لتقييم فائدة الأبعاد السبعة، و<b>4.16 من 5</b> لأهمية إظهار مبررات التصنيف والتوصية، و<b>4.26 من 5</b> لسهولة الوصول إلى القرار التحصيلي، و<b>4.16 من 5</b> لتفضيل إطار CPF مقارنة بالطريقة التقليدية.
            </p>
            <p>
              أما اختبار الاستخدام الموجّه، فقد نُفذ حضورياً في مقر العمل بمشاركة ثلاثة أخصائيي تحصيل، حيث كُلّف كل مشارك بتنفيذ ثلاث مهام مستقلة باستخدام النموذج الأولي التفاعلي، بإجمالي تسع محاولات.
            </p>
            <p>
              وأظهرت النتائج نجاح المشارك الأول <b>منير نوار المطيري</b> في تنفيذ المهام الثلاث، ونجاح المشاركة الثانية <b>عروب عصفور</b> في تنفيذ المهام الثلاث، بينما نجحت المشاركة الثالثة <b>ذكرى يحيى مطري</b> في تنفيذ المهمتين الأولى والثانية، وتعذّر عليها الوصول المستقل إلى التوصية التحصيلية في المهمة الثالثة.
            </p>
            <p>
              وبذلك بلغ إجمالي المهام الناجحة <b>8 من أصل 9</b>، بنسبة نجاح بلغت <b>88.89%</b>، فيما بلغ متوسط تقييم سهولة الاستخدام <b>5.33 من 7</b>.
            </p>
            <p>
              وتكشف نتائج الاختبار عن نقطة مهمة تتعلق بضرورة تعزيز وضوح العلاقة بين تصنيف البرسونا ومبرراته والتوصية التحصيلية، خصوصاً أن المشاركة الثالثة أوضحت أنها كانت تتوقع أن تكون التوصية مرتبطة بصورة مباشرة بمبررات تصنيف العميل، وأن يكون سبب اختيار الإجراء واضحاً أمامها.
            </p>
            <p>
              وتشير النتائج مجتمعة إلى وجود قبول أولي إيجابي لفكرة الإطار والنموذج الأولي، مع تحديد فرص تطوير عملية تتعلق بإبراز مبررات التصنيف، وتسهيل الوصول إلى التوصية التحصيلية، وتحسين الترابط بين مخرجات التحليل والقرار المقترح.
            </p>
          </section>

          {/* 2. Introduction */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-2" title="2. مقدمة التقرير" />
            <p>
              يأتي هذا التقييم ضمن مراحل تطوير إطار عمل البرسونا (Collection Persona Framework™️ – CPF)، الذي يستهدف تطوير منهجية تحليل العملاء المتعثرين من خلال الانتقال من الاعتماد على المؤشرات التقليدية وحدها، إلى فهم أوسع لخصائص العميل المالية والسلوكية والديموغرافية والرقمية.
            </p>
            <p>
              وتقوم فكرة الإطار على الاستفادة من الأبعاد المختلفة للعميل في بناء تصنيف يساعد على فهم طبيعة الحالة، وتحديد خصائص البرسونا، وإظهار مبررات التصنيف، ثم ربط نتائج التحليل بالتوصية التحصيلية المناسبة.
            </p>
            <p>
              وانطلاقاً من ذلك، لم يقتصر تقييم النموذج الأولي على معرفة مدى إعجاب المستخدمين بالتصميم أو طريقة عرض المعلومات، بل امتد إلى التحقق من مدى إدراكهم لفائدة مخرجات الإطار، ومدى وضوح المعلومات اللازمة لاتخاذ القرار، وقدرتهم على التعامل مع النموذج وتنفيذ المهام المطلوبة.
            </p>
            <p>
              ولتحقيق ذلك، تم الاعتماد على الاستبيان واختبار الاستخدام الموجّه باعتبارهما وسيلتين متكاملتين؛ حيث يقيس الاستبيان تصورات المشاركين وتقييماتهم، بينما يركز اختبار الاستخدام على ملاحظة الأداء الفعلي للمستخدم أثناء تنفيذ المهام المحددة.
            </p>
          </section>

          {/* 3. Objectives */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-3" title="3. أهداف التقييم" />
            <p>استهدف التقييم تحقيق الأهداف التالية:</p>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>قياس مدى إدراك المستخدمين لفائدة الأبعاد السبعة المستخدمة في تحليل العميل.</li>
              <li>تقييم أهمية إظهار مبررات تصنيف البرسونا للمستخدم.</li>
              <li>قياس أهمية ربط تصنيف البرسونا بالتوصية التحصيلية المناسبة (NBCA).</li>
              <li>تقييم سهولة الوصول إلى الخيار والقرار التحصيلي داخل النموذج الأولي.</li>
              <li>التعرف على أساليب العمل الحالية التي يعتمد عليها المشاركون في تحديد الإجراء التحصيلي.</li>
              <li>قياس مدى تفضيل إطار CPF مقارنة بالطريقة التقليدية.</li>
              <li>رصد الملاحظات والمقترحات المتعلقة بتحسين المعلومات والواجهات والوظائف.</li>
              <li>اختبار قدرة المستخدمين على تنفيذ المهام المحددة داخل النموذج الأولي.</li>
              <li>تحديد نقاط القوة ومواطن التعثر التي تتطلب تحسيناً قبل الانتقال إلى مرحلة التطبيق الأوسع.</li>
            </ol>
          </section>

          {/* 4. Methodology and Scope */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-4" title="4. منهجية التقييم ونطاقه" />
            <p>اعتمد التقييم على منهجين مستقلين ومتكاملين:</p>

            <div className="space-y-2 rounded-xl border border-border/70 bg-background/50 p-4">
              <h3 className="font-bold text-primary">4.1 استبيان تقييم النموذج الأولي</h3>
              <p>تم استخدام نموذج إلكتروني لجمع آراء المشاركين بعد اطلاعهم على النموذج الأولي.</p>
              <p>
                بلغ عدد الاستجابات المكتملة 19 استجابة، وتكون الاستبيان من سبعة أسئلة، شملت أسئلة لتحديد الدور الوظيفي، وأسئلة تقييمية بمقياس خماسي، وسؤالاً مفتوحاً لجمع الملاحظات والمقترحات.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/70 bg-background/50 p-4">
              <h3 className="font-bold text-primary">4.2 اختبار الاستخدام الموجّه</h3>
              <p>
                تم تنفيذ اختبار الاستخدام الموجّه من خلال جلسات حضورية في مقر العمل باستخدام النموذج الأولي التفاعلي، بمشاركة ثلاثة أخصائيي تحصيل.
              </p>
              <p>كُلّف كل مشارك بتنفيذ ثلاث مهام، ليصبح إجمالي محاولات تنفيذ المهام تسع محاولات.</p>
              <p className="font-semibold">وقد تضمنت المهام:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>مراجعة الأبعاد السبعة المستخدمة في تحليل العميل.</li>
                <li>تحديد البرسونا ومراجعة مبررات التصنيف.</li>
                <li>تحديد الإجراء التحصيلي الأنسب (Next Best Collection Action – NBCA).</li>
              </ol>
              <p>
                بدأت كل جلسة بأسئلة تمهيدية وشرح هدف الاختبار، مع توضيح أن التقييم موجه للنموذج وليس لأداء المشارك الشخصي، وأن المطلوب تنفيذ المهام بصورة مستقلة قدر الإمكان.
              </p>
              <p>
                وبعد كل مهمة، طُلب من المشارك تقييم سهولتها باستخدام مقياس من 1 إلى 7، بحيث تعني الدرجة 1 أن المهمة صعبة جداً، والدرجة 7 أنها سهلة جداً.
              </p>
            </div>

            <div className="space-y-2 rounded-xl border border-border/70 bg-background/50 p-4">
              <h3 className="font-bold text-primary">4.3 طريقة تحليل البيانات</h3>
              <p>تم تحليل نتائج الاستبيان الكمية باستخدام المتوسط الحسابي وتوزيع الإجابات والنسب المئوية.</p>
              <p>واستخدمت الإجابات المفتوحة في تحديد المحاور المتكررة والاحتياجات التطويرية التي أشار إليها المشاركون.</p>
              <p>
                أما اختبار الاستخدام الموجّه، فتم تحليل نتائجه بصورة مستقلة عن الاستبيان، بالاعتماد على عدد المهام الناجحة وإجمالي المحاولات ومتوسط تقييم سهولة الاستخدام، إلى جانب الملاحظات المسجلة خلال الجلسات.
              </p>
            </div>
          </section>

          {/* 5. Survey Results */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-6 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-5" title="5. نتائج استبيان تقييم النموذج الأولي" />

            {/* 5.1 */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">5.1 خصائص المشاركين</h3>
              <p>بلغ عدد المشاركين في الاستبيان 19 مشاركاً، وتوزعت أدوارهم الوظيفية كما يلي:</p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-foreground">
                      <th className="p-2.5 text-start font-bold">الدور الوظيفي</th>
                      <th className="p-2.5 text-center font-bold">العدد</th>
                      <th className="p-2.5 text-center font-bold">النسبة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMOGRAPHICS_ROWS.map((row) => (
                      <tr key={row.role} className="border-b border-border/60">
                        <td className="p-2.5 font-medium">{row.role}</td>
                        <td className="p-2.5 text-center font-bold">{row.count}</td>
                        <td className="p-2.5 text-center font-semibold">{row.pct}</td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold">
                      <td className="p-2.5">الإجمالي</td>
                      <td className="p-2.5 text-center text-primary">19</td>
                      <td className="p-2.5 text-center text-primary">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1.5">
                <p className="font-bold text-primary">التحليل:</p>
                <p>
                  توضح النتائج أن غالبية المشاركين من أخصائيي وموظفي تحصيل مديونيات الأفراد، بنسبة بلغت 78.9%، وهي الفئة الأكثر ارتباطاً بالاستخدام المباشر للنموذج في بيئة العمل.
                </p>
                <p>كما شارك محللو الائتمان والمخاطر بنسبة 21.1%، بما يضيف منظوراً تحليلياً إلى تقييم الإطار.</p>
                <p>
                  وتُعد هذه التركيبة مناسبة للحصول على انطباعات أولية من الفئات ذات العلاقة، إلا أن عدم مشاركة ممثلين عن العمليات والرقابة التحصيلية يعني أن نتائج الاستبيان لا تغطي جميع الأطراف المحتملة ذات العلاقة بتطبيق الإطار.
                </p>
              </div>
            </div>

            {/* 5.2, 5.3, 5.4 */}
            {SURVEY_SCALE_QUESTIONS.slice(0, 3).map((q) => (
              <div key={q.id} className="space-y-3 border-t border-border/60 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-primary">
                    {q.sectionNum} {q.title}
                  </h3>
                  <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    المتوسط الحسابي: {q.meanText}
                  </span>
                </div>
                <p>{q.goal}</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/60 text-foreground">
                        <th className="p-2.5 text-center font-bold">الدرجة</th>
                        <th className="p-2.5 text-center font-bold">عدد الإجابات</th>
                        <th className="p-2.5 text-center font-bold">النسبة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {q.rows.map((r) => (
                        <tr key={r.score} className="border-b border-border/60">
                          <td className="p-2.5 text-center font-bold">{r.score}</td>
                          <td className="p-2.5 text-center">{r.count}</td>
                          <td className="p-2.5 text-center">{r.pct}</td>
                        </tr>
                      ))}
                      <tr className="bg-secondary/60 font-bold">
                        <td className="p-2.5 text-center">الإجمالي</td>
                        <td className="p-2.5 text-center text-primary">19</td>
                        <td className="p-2.5 text-center text-primary">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-semibold text-primary">
                  بلغ عدد التقييمات المرتفعة (4 و5) {q.highCount} إجابة من أصل 19، بنسبة {q.highPct}.
                </p>
                <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1.5">
                  <p className="font-bold text-primary">التحليل:</p>
                  {q.analysis.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* 5.5 Current Practice */}
            <div className="space-y-3 border-t border-border/60 pt-5">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                5.5 السؤال الخامس: الممارسة الحالية لتحديد الإجراء التحصيلي
              </h3>
              <p>
                استهدف السؤال التعرف على الأسلوب الذي يعتمد عليه المشاركون حالياً عند تحديد الإجراء التحصيلي المناسب للعميل.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-foreground">
                      <th className="p-2.5 text-start font-bold">أسلوب تحديد الإجراء</th>
                      <th className="p-2.5 text-center font-bold">العدد</th>
                      <th className="p-2.5 text-center font-bold">النسبة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CURRENT_PRACTICE_ROWS.map((r) => (
                      <tr key={r.method} className="border-b border-border/60">
                        <td className="p-2.5 font-medium">{r.method}</td>
                        <td className="p-2.5 text-center font-bold">{r.count}</td>
                        <td className="p-2.5 text-center font-semibold">{r.pct}</td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold">
                      <td className="p-2.5">الإجمالي</td>
                      <td className="p-2.5 text-center text-primary">19</td>
                      <td className="p-2.5 text-center text-primary">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1.5">
                <p className="font-bold text-primary">التحليل:</p>
                <p>
                  أظهرت النتائج أن 57.9% من المشاركين يعتمدون على إجراء موحد ونمطي في التعامل مع الحالات، بينما يعتمد 26.3% على المراجعة اليدوية لعدة شاشات وأنظمة، في حين أفاد 15.8% بالاستعانة بالتوصيات التلقائية المتاحة في النظام.
                </p>
                <p>
                  وتشير هذه النتائج إلى وجود فرصة لتطوير آلية أكثر ارتباطاً بخصائص كل عميل، بحيث لا يعتمد تحديد الإجراء على نمط موحد لجميع الحالات، ولا يتطلب بالضرورة مراجعة يدوية متفرقة للمعلومات.
                </p>
                <p>
                  ويأتي إطار CPF لمعالجة هذه الفجوة من خلال تجميع المعلومات وتحليلها وربط مخرجاتها بتصنيف البرسونا والتوصية التحصيلية المناسبة.
                </p>
              </div>
            </div>

            {/* 5.6 Q6 */}
            {SURVEY_SCALE_QUESTIONS.slice(3).map((q) => (
              <div key={q.id} className="space-y-3 border-t border-border/60 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-primary">
                    {q.sectionNum} {q.title}
                  </h3>
                  <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    المتوسط الحسابي: {q.meanText}
                  </span>
                </div>
                <p>{q.goal}</p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/60 text-foreground">
                        <th className="p-2.5 text-center font-bold">الدرجة</th>
                        <th className="p-2.5 text-center font-bold">عدد الإجابات</th>
                        <th className="p-2.5 text-center font-bold">النسبة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {q.rows.map((r) => (
                        <tr key={r.score} className="border-b border-border/60">
                          <td className="p-2.5 text-center font-bold">{r.score}</td>
                          <td className="p-2.5 text-center">{r.count}</td>
                          <td className="p-2.5 text-center">{r.pct}</td>
                        </tr>
                      ))}
                      <tr className="bg-secondary/60 font-bold">
                        <td className="p-2.5 text-center">الإجمالي</td>
                        <td className="p-2.5 text-center text-primary">19</td>
                        <td className="p-2.5 text-center text-primary">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-semibold text-primary">
                  بلغت التقييمات المرتفعة (4 و5) {q.highCount} إجابة من أصل 19، بنسبة {q.highPct}.
                </p>
                <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1.5">
                  <p className="font-bold text-primary">التحليل:</p>
                  {q.analysis.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* 5.7 Open Feedback */}
            <div className="space-y-4 border-t border-border/60 pt-5">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                5.7 السؤال السابع: الملاحظات والمقترحات المفتوحة
              </h3>
              <p>بلغ عدد الإجابات النصية المتاحة 18 إجابة من أصل 19.</p>
              <p>
                وقد تم تحليلها وتصنيفها إلى مجموعة من المحاور الموضوعية التي تعكس انطباعات المشاركين ومقترحاتهم التطويرية.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {OPEN_THEMES.map((theme) => (
                  <div
                    key={theme.title}
                    className="rounded-xl border border-border bg-background/60 p-4 space-y-2"
                  >
                    <h4 className="font-bold text-primary">{theme.title}</h4>
                    <p className="text-xs text-muted-foreground">{theme.description}</p>
                    <ul className="space-y-1.5 text-xs list-disc list-inside">
                      {theme.quotes.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1">
                <p className="font-bold text-primary">التحليل العام للسؤال المفتوح:</p>
                <p>
                  تعكس الملاحظات تقبلاً إيجابياً لفكرة النموذج، وتحدد احتياجات تطويرية عملية تتمحور حول وضوح التصنيف، وقابلية تفسير التوصية، وسهولة قراءة المعلومات، وإضافة وظائف مساندة للمتابعة والتوثيق والتنفيذ.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Moderated Usability Testing Overview */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading
              id="sec-6"
              title="6. نتائج اختبار الاستخدام الموجّه (Moderated Usability Testing)"
            />

            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">6.1 بيانات الاختبار</h3>
              <p>تم تنفيذ اختبار الاستخدام الموجّه حضورياً في مقر العمل باستخدام النموذج الأولي التفاعلي.</p>
              <p>وشارك في الاختبار ثلاثة أخصائيي تحصيل، ونُفذت ثلاث مهام لكل مشارك.</p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-foreground">
                      <th className="p-2.5 text-start font-bold">العنصر</th>
                      <th className="p-2.5 text-start font-bold">التفاصيل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["عدد المشاركين", "3 أخصائيي تحصيل"],
                      ["عدد المهام لكل مشارك", "3 مهام"],
                      ["إجمالي المحاولات", "9 محاولات"],
                      ["طريقة التنفيذ", "جلسات حضورية في مقر العمل"],
                      ["أداة الاختبار", "النموذج الأولي التفاعلي"],
                      ["مقياس سهولة الاستخدام", "من 1 إلى 7"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-border/60 last:border-0">
                        <td className="p-2.5 font-semibold">{k}</td>
                        <td className="p-2.5">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                6.2 المهام الثلاث المعتمدة في الاختبار
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {MODERATED_TASKS.map((t) => (
                  <div
                    key={t.num}
                    className="rounded-xl border border-border bg-background/60 p-4 space-y-1.5"
                  >
                    <p className="font-bold text-primary">
                      {t.code}: {t.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Detailed Participant Sessions */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-6 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-7" title="7. نتائج المشاركين في اختبار الاستخدام الموجّه" />

            {USABILITY_SESSIONS.map((session) => (
              <article
                key={session.id}
                className="rounded-2xl border border-border bg-background/50 p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
                  <h3 className="text-sm sm:text-base font-bold text-primary">
                    {session.sectionNum} {session.roleTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-md bg-secondary px-2 py-0.5 font-bold">
                      نسبة النجاح: {session.successRate}
                    </span>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 font-bold text-primary">
                      المتوسط: <span dir="ltr">{session.meanEase}</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {session.dialogueSteps.map((step) => (
                    <div key={step.heading} className="space-y-1.5">
                      <h4 className="font-bold text-foreground">{step.heading}</h4>
                      <div className="space-y-1.5">
                        {step.lines.map((line, i) => (
                          <p
                            key={i}
                            className={`rounded-lg px-3 py-1.5 ${
                              line.isQuote
                                ? "border-s-4 border-gold bg-accent/50 font-semibold"
                                : "bg-muted/40"
                            }`}
                          >
                            <b className="text-primary ml-1">{line.speaker}:</b>
                            {line.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Participant Score Table */}
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th className="p-2 text-start font-bold">المهمة</th>
                        <th className="p-2 text-center font-bold">النتيجة</th>
                        <th className="p-2 text-center font-bold">تقييم السهولة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {session.tasks.map((t) => (
                        <tr key={t.taskTitle} className="border-b border-border/60">
                          <td className="p-2 font-medium">{t.taskTitle}</td>
                          <td
                            className={`p-2 text-center font-semibold ${
                              t.passed
                                ? "text-emerald-700 dark:text-emerald-400"
                                : "text-destructive"
                            }`}
                          >
                            {t.result}
                          </td>
                          <td className="p-2 text-center font-bold" dir="ltr">
                            {t.easeScore}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-secondary/60 font-bold">
                        <td className="p-2">الإجمالي</td>
                        <td className="p-2 text-center">{session.totalTasksLabel}</td>
                        <td className="p-2 text-center">
                          <span dir="ltr">{session.meanEase}</span> متوسطاً
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {session.keyNote && (
                  <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 font-medium">
                    <b>الملاحظة الأساسية:</b> {session.keyNote}
                  </p>
                )}

                <div className="rounded-xl bg-secondary/40 p-3.5 space-y-1">
                  <p className="font-bold text-primary">تحليل الجلسة:</p>
                  {session.analysis.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </section>

          {/* 8. Overall Moderated Testing Results */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-5 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-8" title="8. النتائج الإجمالية لاختبار الاستخدام الموجّه" />

            <div className="space-y-2.5">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                8.1 نتائج تنفيذ المهام حسب المشاركين
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      <th className="p-2.5 text-start font-bold">المشارك</th>
                      <th className="p-2.5 text-center font-bold">المهمة الأولى</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثانية</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثالثة</th>
                      <th className="p-2.5 text-center font-bold">إجمالي النجاح</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USABILITY_TASK_MATRIX.map((r) => (
                      <tr key={r.participant} className="border-b border-border/60">
                        <td className="p-2.5 font-semibold">{r.participant}</td>
                        <td className="p-2.5 text-center text-emerald-700 dark:text-emerald-400">
                          {r.t1}
                        </td>
                        <td className="p-2.5 text-center text-emerald-700 dark:text-emerald-400">
                          {r.t2}
                        </td>
                        <td
                          className={`p-2.5 text-center font-semibold ${
                            r.t3 === "ناجحة"
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-destructive"
                          }`}
                        >
                          {r.t3}
                        </td>
                        <td className="p-2.5 text-center font-bold" dir="ltr">
                          {r.total}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold">
                      <td className="p-2.5">الإجمالي</td>
                      <td className="p-2.5 text-center" dir="ltr">3/3</td>
                      <td className="p-2.5 text-center" dir="ltr">3/3</td>
                      <td className="p-2.5 text-center" dir="ltr">2/3</td>
                      <td className="p-2.5 text-center text-primary" dir="ltr">8/9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                8.2 نتائج تقييم سهولة الاستخدام
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      <th className="p-2.5 text-start font-bold">المشارك</th>
                      <th className="p-2.5 text-center font-bold">المهمة الأولى</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثانية</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثالثة</th>
                      <th className="p-2.5 text-center font-bold">متوسط التقييم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USABILITY_EASE_MATRIX.map((r) => (
                      <tr key={r.participant} className="border-b border-border/60">
                        <td className="p-2.5 font-semibold">{r.participant}</td>
                        <td className="p-2.5 text-center">{r.t1}</td>
                        <td className="p-2.5 text-center">{r.t2}</td>
                        <td className="p-2.5 text-center">{r.t3}</td>
                        <td className="p-2.5 text-center font-bold">{r.avg}</td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold">
                      <td className="p-2.5">متوسط تقييم المهمة</td>
                      <td className="p-2.5 text-center">6.33</td>
                      <td className="p-2.5 text-center">5.00</td>
                      <td className="p-2.5 text-center">4.67</td>
                      <td className="p-2.5 text-center text-primary">5.33</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2.5 rounded-xl bg-muted/40 border border-border p-4">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                8.3 توزيع درجات السهولة
              </h3>
              <p>بلغ مجموع درجات التقييم التسع 48 درجة من أصل 63 درجة ممكنة.</p>
              <div className="flex flex-wrap gap-4 py-1">
                <span className="rounded-lg bg-card border border-border px-3 py-1.5 font-mono text-xs font-bold text-primary" dir="ltr">
                  48 / 9 = 5.33
                </span>
                <span className="rounded-lg bg-card border border-border px-3 py-1.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400" dir="ltr">
                  (8 / 9) × 100 = 88.89%
                </span>
              </div>
              <p>وبذلك بلغ متوسط سهولة الاستخدام <b>5.33 من 7</b>، أما نسبة نجاح تنفيذ المهام فبلغت <b>88.89%</b>.</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-primary">
                8.4 تحليل النتائج حسب المهمة
              </h3>
              <div className="space-y-3">
                {MODERATED_TASKS.map((t) => (
                  <div
                    key={t.num}
                    className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-1.5"
                  >
                    <h4 className="font-bold text-primary">
                      {t.code}: {t.title}
                    </h4>
                    <ul className="list-disc list-inside text-xs space-y-0.5">
                      <li>عدد المهام الناجحة: {t.successCount} من {t.totalCount}.</li>
                      <li>نسبة النجاح: {t.successRate}.</li>
                      <li>متوسط تقييم السهولة: {t.meanEase}.</li>
                    </ul>
                    <p>{t.analysis}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Integrative Analysis */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading
              id="sec-9"
              title="9. التحليل التكاملي بين نتائج الاستبيان واختبار الاستخدام"
            />
            <p>تمثل نتائج الاستبيان واختبار الاستخدام مصدرين مختلفين ومتكاملين لفهم أداء النموذج الأولي.</p>
            <p>
              فالاستبيان يقيس تصورات المستخدمين وتقييماتهم، بينما يكشف اختبار الاستخدام عن قدرة المستخدم على تنفيذ المهام فعلياً.
            </p>
            <p>وعند تحليل النتائج معاً، تظهر المحاور التالية:</p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    <th className="p-2.5 text-start font-bold">محور التقييم</th>
                    <th className="p-2.5 text-start font-bold">نتيجة الاستبيان</th>
                    <th className="p-2.5 text-start font-bold">نتيجة اختبار الاستخدام</th>
                    <th className="p-2.5 text-start font-bold">القراءة التحليلية</th>
                  </tr>
                </thead>
                <tbody>
                  {INTEGRATIVE_COMPARISON_ROWS.map((row) => (
                    <tr key={row.axis} className="border-b border-border/60 last:border-0">
                      <td className="p-2.5 font-bold text-primary">{row.axis}</td>
                      <td className="p-2.5">{row.survey}</td>
                      <td className="p-2.5">{row.usability}</td>
                      <td className="p-2.5">{row.reading}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 pt-1">
              <div className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-1.5">
                <h3 className="font-bold text-primary">9.1 العلاقة بين تحليل العميل واتخاذ القرار</h3>
                <p>
                  أظهرت نتائج الاستبيان أن المشاركين يقدرون فائدة الأبعاد المتعددة في تحليل العميل، كما أظهرت الملاحظات المفتوحة أهمية الجمع بين المعلومات المالية والسلوكية.
                </p>
                <p>
                  وتدعم نتائج المهمة الأولى هذا الاتجاه؛ إذ تمكن المشاركون الثلاثة من استعراض الأبعاد السبعة، وبلغ متوسط سهولة تنفيذ المهمة 6.33 من 7.
                </p>
                <p>
                  ويعني ذلك أن شاشة تحليل العميل تمثل نقطة قوة أولية في النموذج، من حيث قدرة المستخدمين على الوصول إلى المعلومات واستعراضها.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-1.5">
                <h3 className="font-bold text-primary">9.2 العلاقة بين التصنيف ومبرراته</h3>
                <p>
                  أظهرت نتائج الاستبيان اهتماماً واضحاً بمبررات تصنيف البرسونا، كما نجح المشاركون الثلاثة في الوصول إلى التصنيف ومراجعة المعلومات المرتبطة به.
                </p>
                <p>
                  ومع ذلك، تفاوتت تقييمات سهولة المهمة الثانية، حيث حصلت المشاركة الثالثة على 4 من 7، وأشارت المشاركة الثانية إلى أهمية زيادة ترابط المعلومات المرتبطة بالتصنيف والتوصية.
                </p>
                <p>
                  وهذا يعني أن الوصول إلى التصنيف لا يكفي وحده؛ بل يجب أن تكون المبررات واضحة ومباشرة وسهلة الفهم.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-1.5">
                <h3 className="font-bold text-primary">
                  9.3 العلاقة بين تصنيف البرسونا والتوصية التحصيلية
                </h3>
                <p>تمثل المهمة الثالثة أبرز نتيجة في اختبار الاستخدام.</p>
                <p>
                  فبينما تمكن المشارك الأول والمشاركة الثانية من الوصول إلى التوصية التحصيلية بصورة مستقلة، لم تتمكن المشاركة الثالثة من ذلك.
                </p>
                <p>
                  وقد أوضحت المشاركة الثالثة أنها كانت تتوقع أن تكون التوصية مرتبطة بشكل مباشر بمبررات تصنيف العميل، وأن يكون سبب الإجراء واضحاً أمامها.
                </p>
                <p>
                  وهذا يكشف عن فجوة بين عرض مخرجات التحليل وبين توضيح المنطق الذي يربط التصنيف بالإجراء المقترح.
                </p>
                <p>
                  وتتمثل الأولوية هنا في جعل التوصية التحصيلية امتداداً واضحاً لنتيجة تحليل العميل، وليست مجرد مخرج منفصل يظهر بعد التصنيف.
                </p>
              </div>

              <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 space-y-2">
                <h3 className="font-bold text-primary">9.4 المسار المنطقي المقترح لمخرجات النموذج</h3>
                <p>ينبغي أن يعكس النموذج مساراً مترابطاً وواضحاً للمستخدم:</p>
                <p className="rounded-lg bg-card border border-border p-3 font-bold text-primary text-center">
                  بيانات العميل ← تحليل الأبعاد السبعة ← تصنيف البرسونا ← مبررات التصنيف ← التوصية التحصيلية NBCA ← الإجراء المقترح.
                </p>
                <p>
                  ويجب أن يكون الانتقال بين هذه المراحل واضحاً، مع إظهار أسباب التوصية والعوامل التي استندت إليها، حتى يستطيع أخصائي التحصيل فهمها وتقييم مدى ملاءمتها للحالة.
                </p>
              </div>
            </div>
          </section>

          {/* 10. Strengths */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading
              id="sec-10"
              title="10. أبرز نقاط القوة التي كشفت عنها نتائج التقييم"
            />
            <p>في ضوء نتائج الاستبيان واختبار الاستخدام، يمكن تحديد أبرز نقاط القوة الأولية فيما يلي:</p>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>
                <b>قبول فكرة التحليل متعدد الأبعاد:</b> حققت فائدة الأبعاد السبعة متوسطاً بلغ 4.37 من 5.
              </li>
              <li>
                <b>أهمية تفسير مخرجات الإطار:</b> بلغت نسبة التقييمات المرتفعة للسؤال المتعلق بمبررات التصنيف والتوصية 89.5%.
              </li>
              <li>
                <b>سهولة استعراض الأبعاد:</b> نجح المشاركون الثلاثة في تنفيذ المهمة الأولى، بمتوسط سهولة 6.33 من 7.
              </li>
              <li>
                <b>القدرة على الوصول إلى تصنيف البرسونا:</b> نجح المشاركون الثلاثة في تنفيذ المهمة الثانية.
              </li>
              <li>
                <b>تقييم إيجابي لسهولة الوصول:</b> بلغ متوسط سهولة الوصول إلى القرار في الاستبيان 4.26 من 5.
              </li>
              <li>
                <b>تفضيل أولي للإطار:</b> بلغ متوسط تفضيل CPF مقارنة بالطريقة التقليدية 4.16 من 5.
              </li>
              <li>
                <b>نجاح معظم المهام العملية:</b> نجح المشاركون في تنفيذ 8 مهام من أصل 9.
              </li>
              <li>
                <b>ظهور مقترحات تطوير محددة:</b> قدم المشاركون مقترحات عملية تتعلق بالتصنيف والتوصيات والمتابعة والعرض البصري.
              </li>
            </ol>
          </section>

          {/* 11. Improvement Opportunities */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-4 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-11" title="11. فرص التحسين المستخلصة من التقييم" />
            <p>أظهرت النتائج مجموعة من فرص التطوير التي يمكن ترتيبها وفق الأولوية:</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    <th className="p-2.5 text-center font-bold">الأولوية</th>
                    <th className="p-2.5 text-start font-bold">فرصة التحسين</th>
                    <th className="p-2.5 text-start font-bold">المبرر</th>
                  </tr>
                </thead>
                <tbody>
                  {IMPROVEMENT_OPPORTUNITIES.map((item) => (
                    <tr key={item.improvement} className="border-b border-border/60 last:border-0">
                      <td className="p-2.5 text-center">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            item.priority === "عالية"
                              ? "bg-destructive/15 text-destructive"
                              : item.priority === "متوسطة"
                              ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="p-2.5 font-semibold">{item.improvement}</td>
                      <td className="p-2.5 text-muted-foreground">{item.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 12. Methodological Limitations */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-12" title="12. القيود المنهجية وحدود تفسير النتائج" />
            <p>لضمان دقة قراءة النتائج وعدم تجاوز ما تثبته البيانات، ينبغي مراعاة القيود التالية:</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [
                  "أولاً: حجم العينة",
                  "اقتصر الاستبيان على 19 مشاركاً، واختبار الاستخدام الموجّه على ثلاثة مشاركين. ولذلك تمثل النتائج تقييماً أولياً، ولا يصح تعميمها إحصائياً على جميع مستخدمي التحصيل دون دراسة أوسع.",
                ],
                [
                  "ثانياً: تركيبة المشاركين",
                  "شكّل أخصائيو وموظفو تحصيل مديونيات الأفراد 78.9% من المشاركين في الاستبيان، ولم يشارك ممثلون عن إدارة العمليات والرقابة التحصيلية.",
                ],
                [
                  "ثالثاً: طبيعة الاستبيان",
                  "جمع الاستبيان بين قياس فائدة الفكرة، وتقييم تجربة النموذج، ووصف الممارسة الحالية، وقياس التفضيل المقارن. ولذلك لا ينبغي وصفه بأنه اختبار قابلية استخدام خالص.",
                ],
                [
                  "رابعاً: محدودية اختبار الاستخدام",
                  "اقتصرت التجربة العملية على ثلاثة مشاركين وتسع محاولات لتنفيذ المهام، وهي عينة محدودة لا تكفي وحدها للحكم على أداء النموذج في جميع ظروف العمل.",
                ],
                [
                  "خامساً: عدم قياس الأثر التشغيلي",
                  "لم يقس هذا التقييم بصورة مباشرة مقدار الزيادة في المبالغ المحصلة، أو الانخفاض في زمن معالجة الحالات، أو التغير في معدلات الوفاء بوعود السداد.",
                ],
                [
                  "سادساً: التمييز بين التفضيل والأثر",
                  "ارتفاع تفضيل المشاركين للإطار لا يعني بالضرورة أن استخدامه سيحقق نتائج تحصيلية أفضل؛ إذ يتطلب إثبات ذلك تجربة تشغيلية ومقارنة موضوعية.",
                ],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-border/70 bg-background/50 p-3.5 space-y-1"
                >
                  <p className="font-bold text-primary">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 13. Final Conclusion */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-3 text-xs sm:text-sm leading-relaxed text-foreground">
            <SectionHeading id="sec-13" title="13. الاستنتاج النهائي" />
            <p>
              أظهرت نتائج استبيان تقييم النموذج الأولي واختبار الاستخدام الموجّه وجود قبول أولي إيجابي لإطار عمل البرسونا (Collection Persona Framework™️ – CPF).
            </p>
            <p>
              فقد أظهرت نتائج الاستبيان تقديراً مرتفعاً لفائدة الأبعاد السبعة، واهتماماً واضحاً بإظهار مبررات تصنيف البرسونا والتوصية التحصيلية، إلى جانب تقييم إيجابي لسهولة الوصول إلى القرار وتفضيل الإطار مقارنة بالطريقة التقليدية.
            </p>
            <p>
              كما أظهر اختبار الاستخدام الموجّه نجاح المشاركين في تنفيذ 88.89% من المهام المحددة، بمتوسط سهولة استخدام بلغ 5.33 من 7.
            </p>
            <p>
              وعلى مستوى المهام، تمكن المشاركون الثلاثة من مراجعة الأبعاد السبعة وتحديد البرسونا ومبررات التصنيف، بينما ظهرت نقطة التعثر في المهمة الثالثة المتعلقة بالوصول إلى التوصية التحصيلية، حيث لم تتمكن إحدى المشاركات من الوصول إليها بصورة مستقلة.
            </p>
            <p>
              وتُعد ملاحظة المشاركة الثالثة من أبرز النتائج النوعية في الاختبار؛ لأنها حددت سبباً واضحاً للتعثر، يتمثل في توقع المستخدم أن تكون التوصية مرتبطة بصورة مباشرة بمبررات تصنيف العميل، وأن يكون سبب الإجراء واضحاً أمامه.
            </p>
            <p>
              وتؤكد هذه النتيجة أن نجاح إطار CPF لا يتوقف على تحليل البيانات وتصنيف العميل فحسب، بل يتطلب أيضاً تقديم مخرجات مترابطة وقابلة للتفسير، بحيث يستطيع أخصائي التحصيل فهم سبب التصنيف وسبب التوصية والإجراء المقترح.
            </p>
            <p>
              وبناءً على ذلك، يمكن اعتبار مرحلة التقييم الأولي قد قدمت مؤشرات إيجابية حول تقبل الفكرة وملاءمة النموذج، وحددت مجموعة واضحة من المتطلبات التي ينبغي تحسينها قبل الانتقال إلى مرحلة التطبيق التشغيلي.
            </p>

            <blockquote className="rounded-xl border-s-4 border-gold bg-accent/40 p-4 space-y-1">
              <p className="font-bold text-primary">الاستنتاج الرئيس:</p>
              <p className="font-medium leading-loose">
                يمتلك إطار CPF قبولاً أولياً واعداً من المستخدمين، وقد أظهر النموذج الأولي قدرة جيدة على دعم استعراض الأبعاد وتحديد البرسونا، فيما تتركز الأولوية التطويرية في تعزيز الترابط والوضوح بين مبررات تصنيف البرسونا والتوصية التحصيلية، بما يضمن سهولة الوصول إلى NBCA وفهم سبب اختيار الإجراء المقترح.
              </p>
            </blockquote>
          </section>

          {/* Appendices 1-4 */}
          <section
            id="appendices"
            className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card space-y-6 text-xs sm:text-sm leading-relaxed text-foreground scroll-mt-20"
          >
            <SectionHeading title="الملاحق التفصيلية للتقرير (1 – 4)" />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Appendix 1 */}
              <div className="space-y-2">
                <h3 className="font-bold text-primary">
                  الملحق الأول: ملخص المؤشرات الكمية للاستبيان
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th className="p-2 text-start font-bold">المؤشر</th>
                        <th className="p-2 text-center font-bold">النتيجة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["عدد الاستجابات المكتملة", "19"],
                        ["عدد الأسئلة", "7"],
                        ["فائدة الأبعاد السبعة", "4.37 / 5"],
                        ["أهمية مبررات التصنيف والتوصية", "4.16 / 5"],
                        ["سهولة الوصول إلى القرار", "4.26 / 5"],
                        ["تفضيل CPF مقارنة بالطريقة التقليدية", "4.16 / 5"],
                        ["عدد الإجابات المفتوحة", "18"],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-border/60 last:border-0">
                          <td className="p-2 font-medium">{k}</td>
                          <td className="p-2 text-center font-bold text-primary" dir="ltr">
                            {v}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Appendix 2 */}
              <div className="space-y-2">
                <h3 className="font-bold text-primary">
                  الملحق الثاني: ملخص مؤشرات اختبار الاستخدام الموجّه
                </h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        <th className="p-2 text-start font-bold">المؤشر</th>
                        <th className="p-2 text-center font-bold">النتيجة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["عدد المشاركين", "3 أخصائيي تحصيل"],
                        ["عدد المهام لكل مشارك", "3"],
                        ["إجمالي محاولات تنفيذ المهام", "9"],
                        ["عدد المهام الناجحة", "8"],
                        ["عدد المهام غير الناجحة", "1"],
                        ["نسبة نجاح تنفيذ المهام", "88.89%"],
                        ["متوسط سهولة الاستخدام", "5.33 / 7"],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-border/60 last:border-0">
                          <td className="p-2 font-medium">{k}</td>
                          <td
                            className="p-2 text-center font-bold text-primary"
                            dir={v.includes("/") || v.includes("%") ? "ltr" : "rtl"}
                          >
                            {v}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Appendix 3 */}
            <div className="space-y-2">
              <h3 className="font-bold text-primary">
                الملحق الثالث: النتائج التفصيلية للمشاركين في اختبار الاستخدام
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      <th className="p-2.5 text-start font-bold">المشارك</th>
                      <th className="p-2.5 text-center font-bold">المهمة الأولى</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثانية</th>
                      <th className="p-2.5 text-center font-bold">المهمة الثالثة</th>
                      <th className="p-2.5 text-center font-bold">نسبة النجاح</th>
                      <th className="p-2.5 text-center font-bold">متوسط السهولة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["منير نوار المطيري", "7/7", "6/7", "6/7", "100%", "6.33/7"],
                      ["عروب عصفور", "6/7", "5/7", "5/7", "100%", "5.33/7"],
                      ["ذكرى يحيى مطري", "6/7", "4/7", "3/7", "66.67%", "4.33/7"],
                      ["الإجمالي / المتوسط", "6.33", "5.00", "4.67", "88.89%", "5.33/7"],
                    ].map((row, idx) => (
                      <tr
                        key={row[0]}
                        className={
                          idx === 3
                            ? "bg-secondary/60 font-bold"
                            : "border-b border-border/60"
                        }
                      >
                        <td className="p-2.5 font-semibold">{row[0]}</td>
                        <td className="p-2.5 text-center" dir="ltr">{row[1]}</td>
                        <td className="p-2.5 text-center" dir="ltr">{row[2]}</td>
                        <td className="p-2.5 text-center" dir="ltr">{row[3]}</td>
                        <td className="p-2.5 text-center font-bold text-primary">{row[4]}</td>
                        <td className="p-2.5 text-center font-bold text-primary" dir="ltr">
                          {row[5]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appendix 4 */}
            <div className="space-y-3">
              <h3 className="font-bold text-primary">
                الملحق الرابع: نصوص الملاحظات والمقترحات المفتوحة للاستبيان (18 ملاحظة)
              </h3>
              <ol className="grid gap-2.5 sm:grid-cols-2">
                {ALL_OPEN_RESPONSES.map((text, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl border border-border/70 bg-background/60 p-3 text-xs leading-relaxed flex gap-2"
                  >
                    <span className="font-bold text-primary shrink-0">{idx + 1}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-center text-xs font-bold text-muted-foreground pt-3 border-t border-border">
              نهاية التقرير
            </p>
          </section>
        </div>

    </section>
  );
}
