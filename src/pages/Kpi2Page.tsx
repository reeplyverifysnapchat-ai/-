import { ContentPage, KpiBlock } from "@/components/SiteNav";

export function Kpi2Page() {
  return (
    <ContentPage step={5} title="المؤشر الداعم الثاني والهدف">
      <KpiBlock
        name="متوسط تقييم أخصائيي التحصيل لأهمية إظهار مبررات تصنيف العميل والتوصية بالإجراء التحصيلي المناسب."
        en="Supporting KPI 2"
        target="لا يقل عن 4 من 5"
        note="تحقيق متوسط لا يقل عن 4 من 5 عبر استبيان التقييم (سؤال 7)."
      />
    </ContentPage>
  );
}
