import { ContentPage } from "@/components/SiteNav";

export function HypothesisPage() {
  return (
    <ContentPage step={2} title="الفرضية">
      <blockquote className="border-s-4 border-gold ps-4 text-base sm:text-lg leading-[2.2] text-foreground font-normal">
        "نعتقد أن أخصائيي تحصيل الديون المتعثرة للأفراد سيتمكنون من تحديد الإجراء التحصيلي الأنسب لكل عميل بصورة أكثر دقة ووضوحًا، لأن إطار CPF يعتمد على تحليل سبعة أبعاد للحالة وتصنيف العملاء إلى شخصيات تحصيلية، بما يدعم فهم ظروف العميل وتوجيه قرارات التحصيل وفق خصائص كل حالة. وسنعرف أننا على صواب عندما تبلغ نسبة إتمام المهام الأساسية باستخدام النموذج الأولي 80% على الأقل دون الحاجة إلى مساعدة."
      </blockquote>
    </ContentPage>
  );
}


