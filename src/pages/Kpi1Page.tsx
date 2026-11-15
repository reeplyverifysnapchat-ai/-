import { ContentPage, KpiBlock } from "@/components/SiteNav";

export function Kpi1Page() {
  return (
    <ContentPage step={4} title="المؤشر الداعم الأول والهدف">
      <KpiBlock
        name="متوسط تقييم أخصائيي التحصيل لفائدة تحليل الأبعاد السبعة في فهم حالة العميل."
        en="Supporting KPI 1"
        target="لا يقل عن 4 من 5"
        note="تحقيق متوسط لا يقل عن 4 من 5 عبر استبيان التقييم (سؤال 6)."
      />
    </ContentPage>
  );
}
