import { ContentPage, getStepNumber } from "@/components/SiteNav";

export function IdeaPage() {
  return (
    <ContentPage id="hypothesis" path="/" step={getStepNumber("/")} title="الفرضية" isFirst>
      {/* 1. Hypothesis */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-gold/20 px-2 py-0.5 text-xs font-bold text-primary">
            الفرضية (Hypothesis)
          </span>
        </div>
        <blockquote className="border-s-4 border-gold ps-4 text-sm sm:text-base leading-[2.2] text-foreground font-normal">
          نعتقد أن أخصائي تحصيل الديون المتعثرة للأفراد سيتمكنون من تحديد الإجراء التحصيلي الأنسب لكل عميل بصورة أكثر دقة ووضوحاً، لأن إطار CPF يعتمد على تحليل سبعة أبعاد للحالة وتصنيف العملاء إلى شخصيات تحصيلية، بما يدعم فهم ظروف العميل وتوجيه قرارات التحصيل وفق خصائص كل حالة، وسنعرف أننا على صواب عندما تبلغ نسبة إتمام المهام الأساسية باستخدام النموذج الأولي 80% على الأقل دون مساعدة.
        </blockquote>
      </div>

      {/* 2. Core Idea */}
      <div className="space-y-2 pt-2 border-t border-border/60">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
            الفكرة الأساسية للمشروع (Idea)
          </span>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          <b className="text-primary font-bold">Collection Persona Framework™</b>{" "}
          — إطار علمي وتطبيقي موجه لإعادة هيكلة ودعم القرار في التحصيل المصرفي، يعتمد على
          تحليل سلوك العميل في سياق المديونية{" "}
          <span className="font-sans text-xs bg-muted px-1.5 py-0.5 rounded text-foreground" dir="ltr">
            (Customer-in-Debt-Context)
          </span>{" "}
          لتحديد{" "}
          <b className="text-primary font-semibold">
            أفضل إجراء تحصيلي تالٍ{" "}
            <span className="font-sans text-xs" dir="ltr">(Next Best Collection Action - NBCA)</span>
          </b>{" "}
          مسبب بأكواد أسباب{" "}
          <span className="font-sans text-xs" dir="ltr">(Reason Codes)</span>{" "}
          عبر دورة تشغيلية من 12 مرحلة لتفادي المحاولات غير المنتجة.
        </p>
      </div>

      {/* 3. Target Segment */}
      <div className="rounded-xl bg-secondary p-4 space-y-1.5 border border-border/40">
        <p className="text-xs font-semibold text-muted-foreground">
          الشريحة المستهدفة (Target Segment)
        </p>
        <p className="font-semibold text-secondary-foreground text-sm sm:text-base leading-relaxed">
          أخصائيو وموظفو تحصيل المديونيات المصرفية، ومحللو الائتمان والمخاطر في البنك{" "}
          <span className="font-normal text-muted-foreground text-xs sm:text-sm">
            (الذين يستخدمون المنظومة لاتخاذ قرارات تحصيل موجهة ومحوكمة)
          </span>
        </p>
      </div>
    </ContentPage>
  );
}
