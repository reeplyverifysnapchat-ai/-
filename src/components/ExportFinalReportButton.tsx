import { useState } from "react";
import { createPortal } from "react-dom";
import { FileDown, CheckCircle2, AlertTriangle, Loader2, X, ShieldCheck } from "lucide-react";
import { exportFinalProjectReportPdf, type ExportProgress } from "@/lib/finalPdfExport";

interface ExportFinalReportButtonProps {
  variant?: "nav" | "hero";
  className?: string;
}

export function ExportFinalReportButton({
  variant = "nav",
  className = "",
}: ExportFinalReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress>({
    stage: "idle",
    message: "",
  });

  const startExport = async () => {
    setIsOpen(true);
    setIsExporting(true);
    setProgress({
      stage: "collecting",
      message: "جارٍ تهيئة التقرير وتجميع بيانات الأقسام الثمانية...",
    });

    try {
      const integrityReport = await exportFinalProjectReportPdf((next) => {
        setProgress(next);
      });
      setProgress((prev) => ({
        ...prev,
        stage: "done",
        integrityReport,
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء إنشاء ملف PDF.";
      setProgress({
        stage: "error",
        message: "تعذّر إتمام تصدير التقرير النهائي.",
        errorMessage,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const buttonClasses =
    variant === "nav"
      ? `inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap rounded-lg border border-gold/60 bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer disabled:opacity-60 ${className}`
      : `inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-xl border border-gold/60 bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer disabled:opacity-60 ${className}`;

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cpf-export-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-lg rounded-2xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden">
              {/* Top Institutional Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-5 py-4 text-primary-foreground">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium opacity-85" dir="ltr">
                    Collection Persona Framework™ (CPF)
                  </p>
                  <h2 id="cpf-export-dialog-title" className="text-sm sm:text-base font-bold truncate">
                    تصدير التقرير النهائي المعتمد (A4 PDF)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => !isExporting && setIsOpen(false)}
                  disabled={isExporting}
                  aria-label="إغلاق نافذة التصدير"
                  className="rounded-lg p-1.5 text-primary-foreground/80 transition hover:bg-white/15 hover:text-primary-foreground disabled:opacity-40 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 p-5">
                {/* Status Banner */}
                <div
                  className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                    progress.stage === "error"
                      ? "border-red-300 bg-red-50 text-red-900"
                      : progress.stage === "done"
                        ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                        : "border-primary/20 bg-secondary text-foreground"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {progress.stage === "error" ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : progress.stage === "done" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                    ) : (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-bold leading-snug">{progress.message}</p>
                    {progress.errorMessage && (
                      <p className="text-xs leading-relaxed text-red-800">{progress.errorMessage}</p>
                    )}
                    {progress.totalPages && progress.totalPages > 0 && progress.stage !== "error" && (
                      <div className="pt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                          <span>حجم A4 أفقي · خطوط عربية مدمجة</span>
                          <span>
                            {progress.currentPage ?? progress.totalPages} / {progress.totalPages} صفحة
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-200"
                            style={{
                              width: `${Math.round(
                                ((progress.currentPage ?? (progress.stage === "done" ? progress.totalPages : 1)) /
                                  progress.totalPages) *
                                  100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Automated Verification Checklist */}
                {progress.integrityReport && (
                  <div className="rounded-xl border border-border bg-muted/35 p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>نتائج الفحص التلقائي قبل التنزيل</span>
                      </span>
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary" dir="ltr">
                        CPF_Final_Project_Report.pdf
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {progress.integrityReport.checks.map((check) => (
                        <li
                          key={check.label}
                          className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-card px-3.5 py-2.5 text-xs"
                        >
                          <span
                            className={`mt-0.5 shrink-0 font-bold ${
                              check.passed ? "text-emerald-700" : "text-red-600"
                            }`}
                          >
                            {check.passed ? "✓" : "✕"}
                          </span>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <p className="font-bold text-foreground leading-snug">{check.label}</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              {check.detail}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  {progress.stage === "done" || progress.stage === "error" ? (
                    <>
                      <button
                        type="button"
                        onClick={startExport}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-primary/15 cursor-pointer"
                      >
                        <FileDown className="h-3.5 w-3.5" />
                        <span>{progress.stage === "error" ? "إعادة المحاولة" : "إعادة تنزيل التقرير"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-95 cursor-pointer"
                      >
                        إغلاق
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">
                      يُرجى الانتظار حتى اكتمال فحص الجودة وإنشاء الملف...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={startExport}
        disabled={isExporting}
        data-testid={`export-final-pdf-${variant}`}
        className={buttonClasses}
      >
        {isExporting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        ) : (
          <FileDown className="h-3.5 w-3.5 shrink-0" />
        )}
        <span>تصدير التقرير النهائي PDF</span>
      </button>
      {modal}
    </>
  );
}
