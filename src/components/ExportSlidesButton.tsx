import { useState } from "react";
import { createPortal } from "react-dom";
import { Presentation, CheckCircle2, AlertTriangle, Loader2, X } from "lucide-react";
import { exportPresentationSlidesPdf, type SlidesExportProgress } from "@/lib/slidesPdfExport";

interface ExportSlidesButtonProps {
  variant?: "nav" | "hero";
  className?: string;
}

export function ExportSlidesButton({
  variant = "nav",
  className = "",
}: ExportSlidesButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<SlidesExportProgress>({
    stage: "collecting",
    message: "",
  });

  const startExport = async () => {
    setIsOpen(true);
    setIsExporting(true);
    setProgress({
      stage: "collecting",
      message: "جارٍ تجهيز شرائح العرض للنقاط الخمس...",
    });

    try {
      await exportPresentationSlidesPdf((next) => {
        setProgress(next);
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "حدث خطأ غير متوقع أثناء تصدير شرائح العرض.";
      setProgress({
        stage: "error",
        message: "تعذّر إتمام تصدير شرائح العرض.",
        errorMessage,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const buttonClasses =
    variant === "nav"
      ? `inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap rounded-lg border border-primary/40 bg-secondary px-3 py-1.5 text-xs font-bold text-primary shadow-xs transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer disabled:opacity-60 ${className}`
      : `inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-xl border border-primary/40 bg-secondary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary shadow-sm transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer disabled:opacity-60 ${className}`;

  const modal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            dir="rtl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cpf-slides-export-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-md rounded-2xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-primary px-5 py-4 text-primary-foreground">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium opacity-85" dir="ltr">
                    Collection Persona Framework™ (CPF)
                  </p>
                  <h2 id="cpf-slides-export-title" className="text-sm sm:text-base font-bold truncate">
                    تصدير شرائح العرض المختصرة (5 نقاط)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => !isExporting && setIsOpen(false)}
                  disabled={isExporting}
                  aria-label="إغلاق نافذة تصدير الشرائح"
                  className="rounded-lg p-1.5 text-primary-foreground/80 transition hover:bg-white/15 hover:text-primary-foreground disabled:opacity-40 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 p-5">
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
                    {progress.totalSlides && progress.totalSlides > 0 && progress.stage !== "error" && (
                      <div className="pt-1.5 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                          <span>شرائح عرض 16:9 · خط كبير وواضح</span>
                          <span>
                            {progress.currentSlide ?? progress.totalSlides} / {progress.totalSlides} شرائح
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-200"
                            style={{
                              width: `${Math.round(
                                ((progress.currentSlide ?? 1) / progress.totalSlides) * 100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/35 p-3.5 text-xs space-y-1.5">
                  <div className="font-bold text-primary">محتوى الشرائح الخمس (16:9 PDF):</div>
                  <p className="text-muted-foreground leading-relaxed">
                    1. الفرضية · 2. المؤشر والهدف · 3. الطريقة والعينة · 4. النتيجة مقابل الهدف · 5. القرار
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  {progress.stage === "done" || progress.stage === "error" ? (
                    <>
                      <button
                        type="button"
                        onClick={startExport}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-primary/15 cursor-pointer"
                      >
                        <Presentation className="h-3.5 w-3.5" />
                        <span>{progress.stage === "error" ? "إعادة المحاولة" : "إعادة تنزيل الشرائح"}</span>
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
                      يُرجى الانتظار حتى اكتمال تجهيز الشرائح...
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
        data-testid={`export-slides-pdf-${variant}`}
        className={buttonClasses}
      >
        {isExporting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        ) : (
          <Presentation className="h-3.5 w-3.5 shrink-0" />
        )}
        <span>تصدير شرائح العرض PDF</span>
      </button>
      {modal}
    </>
  );
}
