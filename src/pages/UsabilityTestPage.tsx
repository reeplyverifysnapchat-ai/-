import { useState } from "react";
import { StepEyebrow, getStepNumber, useRouter } from "@/components/SiteNav";
import {
  MODERATED_TASKS,
  REPORT_METADATA,
  USABILITY_EASE_MATRIX,
  USABILITY_SESSIONS,
  USABILITY_TASK_MATRIX,
} from "@/lib/evaluationReportData";

export function UsabilityTestPage() {
  const { navigate } = useRouter();
  const [activeSessionId, setActiveSessionId] = useState<"all" | "p1" | "p2" | "p3">("all");

  const visibleSessions =
    activeSessionId === "all"
      ? USABILITY_SESSIONS
      : USABILITY_SESSIONS.filter((s) => s.id === activeSessionId);

  return (
    <section
      id="usability-test"
      data-section-path="/usability-test"
      className="scroll-mt-20 space-y-6 pt-8 border-t border-border/60"
    >
      {/* Step Indicator Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <StepEyebrow step={getStepNumber("/usability-test")} />
          <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-primary">
            <span className="h-7 w-1.5 rounded-full bg-gold shrink-0" />
            <span>
              اختبار الاستخدام الموجّه{" "}
              <span dir="ltr" className="inline-block text-base sm:text-lg font-semibold">
                (Moderated Usability Testing)
              </span>
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/results")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-90 transition cursor-pointer"
          >
            <span>التقرير الشامل والنتائج</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </header>

        {/* Overview & Test Protocol */}
        <section className="rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6 shadow-card space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1.5 max-w-2xl">
              <span className="inline-block rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
                منهجية اختبار الاستخدام الموجّه
              </span>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                جلسات حضورية في مقر العمل باستخدام النموذج الأولي التفاعلي
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                نُفذ اختبار الاستخدام الموجّه بمشاركة ثلاثة أخصائيي تحصيل، حيث كُلّف كل مشارك بتنفيذ ثلاث مهام مستقلة، بإجمالي تسع محاولات. بدأت كل جلسة بأسئلة تمهيدية وشرح هدف الاختبار، مع توضيح أن التقييم موجه للنموذج وليس لأداء المشارك الشخصي، وبعد كل مهمة قيّم المشارك سهولتها بمقياس من 1 (صعبة جداً) إلى 7 (سهلة جداً).
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-card px-4 py-3 text-center shadow-xs min-w-[160px]">
              <p className="text-[11px] text-muted-foreground">نسبة النجاح الإجمالية</p>
              <p className="mt-0.5 text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                88.89%
              </p>
              <p className="text-[11px] font-semibold text-muted-foreground">
                8 من أصل 9 مهام ناجحة
              </p>
            </div>
          </div>

          {/* 6 Summary Spec Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">عدد المشاركين</p>
              <p className="mt-1 text-lg font-bold text-primary">
                {REPORT_METADATA.usabilityParticipants}
              </p>
              <p className="text-[10px] text-muted-foreground">أخصائيي تحصيل</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">المهام لكل مشارك</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {REPORT_METADATA.tasksPerParticipant}
              </p>
              <p className="text-[10px] text-muted-foreground">مهام مستقلة</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">إجمالي المحاولات</p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {REPORT_METADATA.totalTrials}
              </p>
              <p className="text-[10px] text-muted-foreground">8 ناجحة · 1 متعثرة</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">متوسط السهولة</p>
              <p className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-400" dir="ltr">
                5.33 / 7
              </p>
              <p className="text-[10px] text-muted-foreground">48 من أصل 63 درجة</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">الميسّر (Moderator)</p>
              <p className="mt-1 text-lg font-bold text-primary">ماجد</p>
              <p className="text-[10px] text-muted-foreground">إدارة وتوجيه الجلسات</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <p className="text-[11px] text-muted-foreground">مقياس التقييم</p>
              <p className="mt-1 text-lg font-bold text-foreground" dir="ltr">
                1 – 7
              </p>
              <p className="text-[10px] text-muted-foreground">سهولة تنفيذ المهمة</p>
            </div>
          </div>
        </section>

        {/* The 3 Moderated Tasks */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-primary">
              المهام الثلاث المعتمدة في الاختبار الموجّه
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {MODERATED_TASKS.map((t) => (
              <div
                key={t.num}
                className="rounded-xl border border-border bg-background/60 p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      {t.code}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        t.successCount === 3
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      نجاح {t.successRate} ({t.successCount}/{t.totalCount})
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="border-t border-border/60 pt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">متوسط السهولة:</span>
                    <span className="font-bold text-primary">{t.meanEase}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {t.analysis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consolidated Outcomes Summary Tables */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-primary">
              ملخص نتائج تنفيذ المهام ومقياس السهولة حسب المشاركين
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Completion Matrix */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-foreground">
                نتائج تنفيذ المهام (9 محاولات)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-foreground">
                      <th className="p-2.5 text-start font-bold">المشارك</th>
                      <th className="p-2.5 text-center font-bold">المهمة 1</th>
                      <th className="p-2.5 text-center font-bold">المهمة 2</th>
                      <th className="p-2.5 text-center font-bold">المهمة 3</th>
                      <th className="p-2.5 text-center font-bold">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USABILITY_TASK_MATRIX.map((row) => (
                      <tr key={row.participant} className="border-b border-border/60">
                        <td className="p-2.5 font-semibold text-foreground">
                          {row.participant}
                        </td>
                        <td className="p-2.5 text-center text-emerald-700 dark:text-emerald-400 font-medium">
                          {row.t1}
                        </td>
                        <td className="p-2.5 text-center text-emerald-700 dark:text-emerald-400 font-medium">
                          {row.t2}
                        </td>
                        <td
                          className={`p-2.5 text-center font-semibold ${
                            row.t3 === "ناجحة"
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-destructive"
                          }`}
                        >
                          {row.t3}
                        </td>
                        <td className="p-2.5 text-center font-bold text-primary" dir="ltr">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold text-foreground">
                      <td className="p-2.5">الإجمالي</td>
                      <td className="p-2.5 text-center" dir="ltr">3/3</td>
                      <td className="p-2.5 text-center" dir="ltr">3/3</td>
                      <td className="p-2.5 text-center" dir="ltr">2/3</td>
                      <td className="p-2.5 text-center text-primary" dir="ltr">
                        8/9 (88.89%)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ease Scores Matrix */}
            <div className="space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-foreground">
                تقييم سهولة الاستخدام (من 1 إلى 7)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/60 text-foreground">
                      <th className="p-2.5 text-start font-bold">المشارك</th>
                      <th className="p-2.5 text-center font-bold">المهمة 1</th>
                      <th className="p-2.5 text-center font-bold">المهمة 2</th>
                      <th className="p-2.5 text-center font-bold">المهمة 3</th>
                      <th className="p-2.5 text-center font-bold">المتوسط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USABILITY_EASE_MATRIX.map((row) => (
                      <tr key={row.participant} className="border-b border-border/60">
                        <td className="p-2.5 font-semibold text-foreground">
                          {row.participant}
                        </td>
                        <td className="p-2.5 text-center font-semibold">{row.t1}</td>
                        <td className="p-2.5 text-center font-semibold">{row.t2}</td>
                        <td className="p-2.5 text-center font-semibold">{row.t3}</td>
                        <td className="p-2.5 text-center font-bold text-primary">
                          {row.avg}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-secondary/60 font-bold text-foreground">
                      <td className="p-2.5">متوسط تقييم المهمة</td>
                      <td className="p-2.5 text-center">6.33</td>
                      <td className="p-2.5 text-center">5.00</td>
                      <td className="p-2.5 text-center">4.67</td>
                      <td className="p-2.5 text-center text-primary">5.33 / 7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Moderated Sessions Filter & Transcripts */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-gold shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-primary">
                تفاصيل جلسات الاختبار الموجّه (3 جلسات حضورية موثقة)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSessionId("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  activeSessionId === "all"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                جميع الجلسات (3)
              </button>
              {USABILITY_SESSIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSessionId(s.id as "p1" | "p2" | "p3")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    activeSessionId === s.id
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.name} ({s.successRate})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {visibleSessions.map((session) => (
              <article
                key={session.id}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card space-y-5"
              >
                {/* Session Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      جلسة اختبار الاستخدام الموجّه
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-primary">
                      {session.roleTitle}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`rounded-lg px-2.5 py-1 font-bold ${
                        session.successRate === "100%"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      نسبة النجاح: {session.successRate}
                    </span>
                    <span className="rounded-lg bg-secondary px-2.5 py-1 font-bold text-secondary-foreground">
                      المتوسط: <span dir="ltr">{session.meanEase}</span>
                    </span>
                  </div>
                </div>

                {/* Moderated Dialogue Steps */}
                <div className="space-y-4">
                  {session.dialogueSteps.map((step) => (
                    <div
                      key={step.heading}
                      className="rounded-xl border border-border/70 bg-background/50 p-4 space-y-2.5"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-primary">
                        {step.heading}
                      </h4>
                      <div className="space-y-2">
                        {step.lines.map((line, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg px-3 py-2 text-xs sm:text-sm leading-relaxed ${
                              line.isQuote
                                ? "border-s-4 border-gold bg-accent/50 font-semibold text-foreground"
                                : line.speaker === "ماجد"
                                ? "bg-muted/50 text-foreground"
                                : "bg-secondary/40 text-foreground"
                            }`}
                          >
                            <span className="font-bold text-primary ml-1.5">
                              {line.speaker}:
                            </span>
                            <span>{line.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Individual Result Table */}
                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">
                    نتيجة {session.name}
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/60 text-foreground">
                          <th className="p-2.5 text-start font-bold">المهمة</th>
                          <th className="p-2.5 text-center font-bold">النتيجة</th>
                          <th className="p-2.5 text-center font-bold">تقييم السهولة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {session.tasks.map((t) => (
                          <tr key={t.taskTitle} className="border-b border-border/60">
                            <td className="p-2.5 font-medium text-foreground">
                              {t.taskTitle}
                            </td>
                            <td
                              className={`p-2.5 text-center font-semibold ${
                                t.passed
                                  ? "text-emerald-700 dark:text-emerald-400"
                                  : "text-destructive"
                              }`}
                            >
                              {t.result}
                            </td>
                            <td className="p-2.5 text-center font-bold text-primary" dir="ltr">
                              {t.easeScore}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-secondary/60 font-bold text-foreground">
                          <td className="p-2.5">الإجمالي</td>
                          <td className="p-2.5 text-center text-primary">
                            {session.totalTasksLabel}
                          </td>
                          <td className="p-2.5 text-center text-primary">
                            <span dir="ltr">{session.meanEase}</span> متوسطاً
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Note if present */}
                {session.keyNote && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs sm:text-sm text-foreground space-y-1">
                    <p className="font-bold text-amber-800 dark:text-amber-300">
                      الملاحظة الأساسية:
                    </p>
                    <p>{session.keyNote}</p>
                  </div>
                )}

                {/* Session Analysis */}
                <div className="rounded-xl bg-secondary/50 border border-border/60 p-4 space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-primary">
                    تحليل الجلسة:
                  </h4>
                  {session.analysis.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-foreground leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

    </section>
  );
}
