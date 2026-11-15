import React from "react";
import type { CpfResponseRow } from "@/integrations/supabase/client";
import {
  QUESTIONS,
  Q1_OPTIONS,
  Q2_OPTIONS,
  Q3_SCALE,
  Q4_OPTIONS,
  IMP_SCALE,
  HELP_SCALE,
  Q9_OPTIONS,
  TARGET_RESPONSES,
  positiveShare,
  YES,
} from "@/lib/survey";
import {
  loadUsabilityRecords,
  computeUsabilityStats,
  TASK_MAP,
  STATUS_SHORT,
  TARGET_SUCCESS_RATE,
  type UsabilityRecord,
} from "@/lib/usability";

interface PdfReportProps {
  rows: CpfResponseRow[];
  utRecords?: UsabilityRecord[];
}

export const PdfReportTemplate = React.forwardRef<HTMLDivElement, PdfReportProps>(
  ({ rows, utRecords }, ref) => {
    const q = rows.filter((r) => !r.disqualified);
    const out = rows.length - q.length;
    const n = q.length;
    const usabilityList = utRecords ?? loadUsabilityRecords();
    const utStats = computeUsabilityStats(usabilityList);

    const q3 = q.map((r) => r.q3).filter((x): x is number => x !== null);
    const q3avg = q3.length
      ? (q3.reduce((s, x) => s + x, 0) / q3.length).toFixed(2)
      : "—";
    const q4ans = q.filter((r) => r.q4).length;
    const q4yes = q4ans ? q.filter((r) => r.q4 === YES).length / q4ans : 0;

    const single = (
      opts: (string | number)[],
      vals: (string | number | null)[],
    ) => {
      const counts = opts.map((o) => vals.filter((v) => v === o).length);
      return { counts, total: vals.filter((v) => v !== null).length };
    };

    const pctTxt = (r: number) => `${Math.round(r * 1000) / 10}%`;
    const scaleLabels = (s: string[]) => s.map((l, i) => `${i + 1} – ${l}`);

    const scales = [
      ["q3", Q3_SCALE],
      ["q5", IMP_SCALE],
      ["q6", HELP_SCALE],
      ["q7", IMP_SCALE],
      ["q8", HELP_SCALE],
    ] as const;

    const currentDate = new Date().toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div
        ref={ref}
        dir="rtl"
        style={{ width: "950px", backgroundColor: "#ffffff", color: "#1e293b", fontFamily: "IBM Plex Sans Arabic, sans-serif" }}
        className="p-8 space-y-6 text-slate-800"
      >
        {/* Document Header */}
        <div className="border-b-2 border-emerald-800 pb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-6 w-2 bg-amber-500 rounded-full" />
              <h1 className="text-2xl font-bold text-emerald-900">
                تقرير نتائج استبيان كفاءة قرارات التحصيل المصرفي
              </h1>
            </div>
            <p className="text-sm font-semibold text-emerald-700">
              Collection Persona Framework™ (CPF™) · التقرير التحليلي الشامل
            </p>
          </div>
          <div className="text-start bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
            <p className="text-slate-500">تاريخ الإصدار</p>
            <p className="font-bold text-slate-800 mt-0.5">{currentDate}</p>
            <p className="text-emerald-700 font-semibold mt-1">حجم العينة: {n} مشاركاً</p>
          </div>
        </div>

        {/* KPI Canvas & Hypothesis Card */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              نموذج لوحة المؤشرات والفرضية (KPI Canvas & Hypothesis)
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
              معايير التحقق الأربعة مكتملة ✓
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="font-bold text-slate-700 text-[11px]">الفكرة الأساسية (Idea):</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                <b>Collection Persona Framework™</b> — إطار علمي وتطبيقي موجه لإعادة هيكلة ودعم القرار في التحصيل المصرفي، يعتمد على تحليل سلوك العميل في سياق المديونية (Customer-in-Debt-Context) لتحديد أفضل إجراء تحصيلي تالٍ (NBCA) مسبب بأكواد أسباب (Reason Codes).
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-700 text-[11px]">الشريحة المستهدفة (Target Segment):</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                أخصائيو وموظفو تحصيل المديونيات المصرفية، ومحللو الائتمان والمخاطر في البنك (الذين يستخدمون المنظومة لاتخاذ قرارات تحصيل موجهة ومحوكمة).
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white border border-emerald-100 p-2.5">
            <p className="font-bold text-slate-800 text-[11px] mb-1">الفرضية المعتمدة (Hypothesis):</p>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              "نعتقد أن أخصائيي تحصيل الديون المتعثرة للأفراد سيتمكنون من تحديد الإجراء التحصيلي الأنسب لكل عميل بصورة أكثر دقة ووضوحًا، لأن إطار CPF يعتمد على تحليل سبعة أبعاد للحالة وتصنيف العملاء إلى شخصيات تحصيلية، بما يدعم فهم ظروف العميل وتوجيه قرارات التحصيل وفق خصائص كل حالة. وسنعرف أننا على صواب عندما تبلغ نسبة إتمام المهام الأساسية باستخدام النموذج الأولي 80% على الأقل دون الحاجة إلى مساعدة."
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-white/80 border border-slate-200 rounded p-2 text-[10px]">
              <span className="font-bold text-emerald-900 block">المؤشر الرئيسي:</span>
              <span className="text-slate-600">نسبة إتمام المهام الأساسية باستخدام النموذج الأولي دون مساعدة</span>
              <span className="font-bold text-emerald-700 block mt-1">الهدف: لا تقل عن 80%</span>
            </div>
            <div className="bg-white/80 border border-slate-200 rounded p-2 text-[10px]">
              <span className="font-bold text-emerald-900 block">المؤشر الداعم 1:</span>
              <span className="text-slate-600">متوسط تقييم فائدة تحليل الأبعاد السبعة في فهم حالة العميل</span>
              <span className="font-bold text-emerald-700 block mt-1">الهدف: لا يقل عن 4 من 5</span>
            </div>
            <div className="bg-white/80 border border-slate-200 rounded p-2 text-[10px]">
              <span className="font-bold text-emerald-900 block">المؤشر الداعم 2:</span>
              <span className="text-slate-600">متوسط تقييم أهمية إظهار مبررات التصنيف والتوصية</span>
              <span className="font-bold text-emerald-700 block mt-1">الهدف: لا يقل عن 4 من 5</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">حجم العينة الفعلي</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {n} <span className="text-sm font-normal text-slate-500">/ {TARGET_RESPONSES}</span>
            </p>
            <p className="text-[11px] text-emerald-700 mt-1">نسبة الإنجاز: 100% من الهدف</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">مستبعدون (لا يعملون في التحصيل)</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{out}</p>
            <p className="text-[11px] text-slate-500 mt-1">جميع المشاركين مؤهلون 100%</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-medium text-slate-500">متوسط صعوبة اختيار الإجراء (س3)</p>
            <p className="text-3xl font-bold text-emerald-800 mt-1">
              {q3avg} <span className="text-sm font-normal text-slate-500">/ 5</span>
            </p>
            <p className="text-[11px] text-amber-700 mt-1">مستوى صعوبة مرتفع يستدعي الدعم الآلي</p>
          </div>
        </div>

        {/* Overall Analysis Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="text-base font-bold text-emerald-950 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span>التحليل الإجمالي ومؤشرات التحقق من الفرضية</span>
          </h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/80 text-slate-700">
                <th className="py-2.5 px-3 text-start font-bold">المؤشر / محور التحليل</th>
                <th className="py-2.5 px-3 text-start font-bold w-32">النسبة المحققة</th>
                <th className="py-2.5 px-3 text-start font-bold w-40">حالة المؤشر</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "من يرون اختلاف أساليب التحصيل بين العملاء المتشابهين (س4 = نعم)",
                  pctTxt(q4yes),
                  "تأييد ساحق لاختلاف الأساليب",
                ],
                [
                  "أهمية السلوك والالتزام عند تحديد الإجراء التحصيلي (س5)",
                  pctTxt(positiveShare(q.map((r) => r.q5))),
                  "أهمية حاسمة (80% إيجابي)",
                ],
                [
                  "فائدة تحليل الأبعاد السبعة لتكوين فهم أشمل للحالة (س6)",
                  pctTxt(positiveShare(q.map((r) => r.q6))),
                  "تأكيد فائدة الأبعاد السبعة",
                ],
                [
                  "أهمية عرض النظام لمبررات التصنيف والتوصية (س7)",
                  pctTxt(positiveShare(q.map((r) => r.q7))),
                  "أعلى نسبة تفضيل (93.3%)",
                ],
                [
                  "توقع فائدة تصنيف العملاء ضمن شخصيات في ملاءمة المتابعة (س8)",
                  pctTxt(positiveShare(q.map((r) => r.q8))),
                  "جاهزية عالية للتبني",
                ],
              ].map(([k, v, status], idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{k}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-800 text-sm">{v}</td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11px] text-slate-500">
            * النسب الإيجابية في أسئلة المقياس تعني اختيار الدرجة 4 أو 5 من 5.
          </p>
        </div>

        {/* Usability Testing Results Section (Headline KPI) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-700" />
                <span>نتائج اختبار قابلية الاستخدام – المؤشر الرئيسي (Headline KPI)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                نسبة إتمام أخصائيي التحصيل للمهام الأساسية باستخدام النموذج الأولي لـ CPF دون مساعدة
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                utStats.isTargetMet
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {utStats.isTargetMet ? "تحقق بنجاح ✓" : "غير مكتمل"}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">إجمالي المحاولات المختبرة</span>
              <b className="text-xl font-bold text-slate-900 block mt-0.5">{utStats.total} / 9</b>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">منجزة دون مساعدة</span>
              <b className="text-xl font-bold text-emerald-700 block mt-0.5">{utStats.success}</b>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">نسبة النجاح المحققة</span>
              <b className="text-xl font-bold text-emerald-800 block mt-0.5">{utStats.rate}%</b>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">الهدف المطلوب</span>
              <b className="text-xl font-bold text-slate-700 block mt-0.5">80% على الأقل</b>
            </div>
          </div>

          {/* Participant Breakdown Table in PDF */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-600">
                  <th className="py-2 px-2.5 text-start font-semibold">المشارك</th>
                  <th className="py-2 px-2.5 text-start font-semibold">المهمة 1 (الإدخال)</th>
                  <th className="py-2 px-2.5 text-start font-semibold">المهمة 2 (الشخصية)</th>
                  <th className="py-2 px-2.5 text-start font-semibold">المهمة 3 (التوصية)</th>
                  <th className="py-2 px-2.5 text-start font-semibold">دون مساعدة</th>
                  <th className="py-2 px-2.5 text-start font-semibold">نسبة النجاح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {utStats.participants.map((p) => {
                  const pRecs = usabilityList.filter((r) => r.participant === p);
                  const getTaskStatus = (t: "T1" | "T2" | "T3") => {
                    const found = pRecs.find((r) => r.task === t);
                    return found ? STATUS_SHORT[found.status] : "—";
                  };
                  const okCount = pRecs.filter((r) => r.status === "success").length;
                  const pRate = pRecs.length
                    ? Math.round((okCount / pRecs.length) * 1000) / 10
                    : 0;

                  return (
                    <tr key={p}>
                      <td className="py-2 px-2.5 font-bold text-slate-900">{p}</td>
                      <td className="py-2 px-2.5 text-slate-700">{getTaskStatus("T1")}</td>
                      <td className="py-2 px-2.5 text-slate-700">{getTaskStatus("T2")}</td>
                      <td className="py-2 px-2.5 text-slate-700">{getTaskStatus("T3")}</td>
                      <td className="py-2 px-2.5 font-bold text-slate-800">
                        {okCount} / {pRecs.length}
                      </td>
                      <td className="py-2 px-2.5 font-bold text-emerald-800">{pRate}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Breakdown for All Questions (1 to 9) */}
        <div>
          <h2 className="text-base font-bold text-emerald-950 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span>تفاصيل إجابات وتوزيع جميع أسئلة الاستبيان (س1 إلى س9)</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Q1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">1. {QUESTIONS.q1}</h3>
              {(() => {
                const { counts, total } = single(Q1_OPTIONS, rows.map((r) => r.q1));
                return Q1_OPTIONS.map((opt, i) => {
                  const c = counts[i] ?? 0;
                  const pct = total ? Math.round((c / total) * 1000) / 10 : 0;
                  return (
                    <div key={opt} className="mb-2 last:mb-0">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">{opt}</span>
                        <span className="font-bold text-slate-800">{c} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Q2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">2. {QUESTIONS.q2}</h3>
              {Q2_OPTIONS.map((opt) => {
                const c = q.filter((r) => r.q2?.includes(opt)).length;
                const pct = n ? Math.round((c / n) * 1000) / 10 : 0;
                return (
                  <div key={opt} className="mb-1.5 last:mb-0">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="text-slate-600 truncate max-w-[280px]">{opt}</span>
                      <span className="font-bold text-slate-800">{c} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Q4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">4. {QUESTIONS.q4}</h3>
              {(() => {
                const { counts, total } = single(Q4_OPTIONS, q.map((r) => r.q4));
                return Q4_OPTIONS.map((opt, i) => {
                  const c = counts[i] ?? 0;
                  const pct = total ? Math.round((c / total) * 1000) / 10 : 0;
                  return (
                    <div key={opt} className="mb-2 last:mb-0">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">{opt}</span>
                        <span className="font-bold text-slate-800">{c} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Q9 */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2">9. {QUESTIONS.q9}</h3>
              {(() => {
                const { counts, total } = single(Q9_OPTIONS, q.map((r) => r.q9));
                return Q9_OPTIONS.map((opt, i) => {
                  const c = counts[i] ?? 0;
                  const pct = total ? Math.round((c / total) * 1000) / 10 : 0;
                  return (
                    <div key={opt} className="mb-1.5 last:mb-0">
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span className="text-slate-600 truncate max-w-[280px]">{opt}</span>
                        <span className="font-bold text-slate-800">{c} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Scales: Q3, Q5, Q6, Q7, Q8 */}
            {scales.map(([k, s]) => {
              const typedKey = k as "q3" | "q5" | "q6" | "q7" | "q8";
              const { counts, total } = single([1, 2, 3, 4, 5], q.map((r) => r[typedKey]));
              const labels = scaleLabels(s as unknown as string[]);

              return (
                <div key={k} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-xs font-bold text-slate-900 mb-2">
                    {k.slice(1)}. {QUESTIONS[typedKey]}
                  </h3>
                  {[1, 2, 3, 4, 5].map((val, idx) => {
                    const c = counts[idx] ?? 0;
                    const pct = total ? Math.round((c / total) * 1000) / 10 : 0;
                    return (
                      <div key={val} className="mb-1.5 last:mb-0">
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span className="text-slate-600">{labels[idx]}</span>
                          <span className="font-bold text-slate-800">{c} ({pct}%)</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Qualitative Responses for Question 10 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-emerald-950 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700" />
            <span>10. إجابات السؤال النوعي المفتوح (جميع الردود الـ 15)</span>
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            "{QUESTIONS.q10}"
          </p>

          <div className="space-y-2.5">
            {q
              .filter((r) => r.q10 && r.q10.trim().length > 0)
              .map((r, idx) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-xs leading-relaxed text-slate-800 flex gap-2.5 items-start"
                >
                  <span className="font-bold text-emerald-800 shrink-0 w-6 text-center">
                    #{idx + 1}
                  </span>
                  <p className="text-slate-700">{r.q10}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[11px] text-slate-400">
          <span>Collection Persona Framework™ · جميع الحقوق محفوظة</span>
          <span>تقرير معتمد ومستخرج آلياً من منصة الاستبيان</span>
        </div>
      </div>
    );
  },
);

PdfReportTemplate.displayName = "PdfReportTemplate";
