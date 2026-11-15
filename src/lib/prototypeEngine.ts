export interface PrototypeFormData {
  name: string;
  acc: string;
  prod: string;
  debt: number;
  late: number;
  wo: "no" | "yes";
  lastpay: number;
  prom: "none" | "broken" | "kept";
  resp: "good" | "part" | "none";
  inc: "stable" | "irr" | "none";
  legal: "no" | "yes";
  pf: string;
}

export const INITIAL_PROTOTYPE_FORM: PrototypeFormData = {
  name: "عميل أ",
  acc: "ACC-00001",
  prod: "تمويل شخصي",
  debt: 45000,
  late: 90,
  wo: "no",
  lastpay: 3,
  prom: "broken",
  resp: "part",
  inc: "irr",
  legal: "no",
  pf: "محفظة الأفراد – فريق 1",
};

const PROTOTYPE_STORAGE_KEY = "cpf_prototype_form_v1";

export function loadPrototypeForm(): PrototypeFormData {
  if (typeof window === "undefined") return INITIAL_PROTOTYPE_FORM;
  try {
    const raw = window.localStorage.getItem(PROTOTYPE_STORAGE_KEY);
    if (!raw) return INITIAL_PROTOTYPE_FORM;
    const parsed = JSON.parse(raw) as Partial<PrototypeFormData>;
    return { ...INITIAL_PROTOTYPE_FORM, ...parsed };
  } catch {
    return INITIAL_PROTOTYPE_FORM;
  }
}

export function savePrototypeForm(form: PrototypeFormData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROTOTYPE_STORAGE_KEY, JSON.stringify(form));
  } catch {
    // ignore storage errors
  }
}

export const PERSONAS = [
  ["CP-01", "متعثر مؤقتًا وراغب في السداد"],
  ["CP-02", "راغب بلا قدرة حالية"],
  ["CP-03", "قادر ومماطل"],
  ["CP-04", "منقطع التواصل"],
  ["CP-05", "كثير الوعود قليل الوفاء"],
  ["CP-06", "يحتاج إعادة جدولة / هيكلة"],
  ["CP-07", "متنازع أو تحت إجراء قانوني"],
  ["CP-08", "مرتفع المخاطر / مشطوب"],
] as const;

export const ACTIONS: Record<string, [string, string, string]> = {
  "CP-01": ["تذكير ودي مع رابط سداد فوري", "رسالة نصية + اتصال لطيف", "SMS + اتصال"],
  "CP-02": ["عرض تسوية مخفضة مع جدولة طويلة", "اتصال من محصل متخصص", "اتصال + عرض رقمي"],
  "CP-03": ["إنذار رسمي مع مهلة قصيرة", "اتصال حازم + إشعار مكتوب", "اتصال + خطاب"],
  "CP-04": ["محاولة وصول عبر قنوات بديلة", "رسالة + مراسلة جهة اتصال بديلة", "قنوات متعددة"],
  "CP-05": ["وعد موثق بدفعة مقدمة صغيرة", "اتصال متابعة قبل الاستحقاق بيوم", "اتصال + تذكير"],
  "CP-06": ["عرض إعادة هيكلة مع إشعار تفاعلي", "اتصال محصل + عرض رقمي", "عرض رقمي + اتصال"],
  "CP-07": ["إيقاف التواصل التلقائي وإحالة للقانونية", "مراجعة من مشرف", "داخلي"],
  "CP-08": ["مراجعة المحفظة المشطوبة وتحديد أولوية الاسترداد", "إحالة لفريق الاسترداد", "داخلي"],
};

export const STAGES_DEF = [
  { n: "الإدخال", t: "استلام البيانات", en: "Data Intake" },
  { n: "التوحيد", t: "توحيد المصادر", en: "Data Unification" },
  { n: "الفهم", t: "بناء فهم العميل", en: "Customer Understanding" },
  { n: "الأبعاد", t: "تحليل أبعاد العميل", en: "Dimensions Analysis" },
  { n: "المطابقة", t: "مطابقة الشخصية", en: "Persona Matching" },
  { n: "الدرجة", t: "درجة الشخصية", en: "Persona Score" },
  { n: "الجاهزية", t: "التحقق من جاهزية القرار", en: "Decision Readiness" },
  { n: "المحرك", t: "محرك القرار", en: "Decision Engine" },
  { n: "التوصية", t: "أفضل إجراء تحصيلي تالٍ", en: "Next Best Action" },
  { n: "التنفيذ", t: "التنفيذ والتوثيق", en: "Execution" },
  { n: "القياس", t: "قياس النتائج", en: "Outcome Measurement" },
  { n: "التحديث", t: "التعلّم والتحديث", en: "Learning & Update" },
] as const;

export function clampScore(x: number) {
  return Math.max(0, Math.min(100, Math.round(x)));
}

export function formatArNumber(n: number) {
  return Number(n).toLocaleString("ar-SA");
}

export function runPrototypeAnalysis(d: PrototypeFormData) {
  const cap = d.inc === "stable" ? 80 : d.inc === "irr" ? 50 : 15;
  const will =
    (d.resp === "good" ? 75 : d.resp === "part" ? 50 : 15) +
    (d.prom === "kept" ? 20 : d.prom === "broken" ? -10 : 0);
  const rec = clampScore(100 - d.lastpay * 12);
  const aging = clampScore(100 - d.late * 0.9);

  const dims: [string, number][] = [
    ["المالية (القدرة)", clampScore(cap)],
    ["السلوكية (الاستعداد)", clampScore(will)],
    ["التفاعلية (الاستجابة)", d.resp === "good" ? 85 : d.resp === "part" ? 50 : 12],
    ["الديموغرافية", 65],
    ["التحصيلية (حداثة السداد)", rec],
    ["القانونية", d.legal === "yes" ? 20 : 90],
    ["الزمنية (عمر التأخر)", aging],
  ];

  const sc = [
    (cap > 60 ? 30 : 10) + will * 0.4 + aging * 0.3,
    (cap < 40 ? 45 : 10) + (will > 50 ? 35 : 5) + (d.legal === "no" ? 10 : 0),
    (cap >= 70 ? 45 : 5) + (will < 45 ? 30 : 5) + (d.resp !== "good" ? 10 : 0),
    (d.resp === "none" ? 70 : 10) + (d.lastpay >= 6 ? 15 : 0),
    (d.prom === "broken" ? 60 : 8) + (d.resp !== "none" ? 15 : 0) + (d.late > 30 ? 8 : 0),
    (cap >= 40 && cap < 75 ? 30 : 8) +
      (will >= 45 ? 25 : 8) +
      (d.late >= 60 ? 20 : 5) +
      (d.debt >= 20000 ? 12 : 3),
    d.legal === "yes" ? 92 : 5,
    (d.wo === "yes" ? 90 : 6) + (d.late >= 180 ? 15 : 0),
  ];
  const scores = sc.map(clampScore);
  let top = 0;
  scores.forEach((s, i) => {
    if (s > scores[top]) top = i;
  });
  if (d.legal === "yes") top = 6;
  if (d.wo === "yes") top = 7;

  const ready: [string, boolean][] = [
    ["اكتمال البيانات الأساسية", Boolean(d.name && d.acc && d.debt > 0)],
    ["حداثة بيانات السداد (آخر 6 أشهر)", d.lastpay <= 6],
    ["حالة الحساب قابلة للتحصيل", d.wo !== "yes"],
    ["لا وعود قائمة معلّقة", d.prom !== "broken" || true],
    ["لا إجراء قانوني معلّق", d.legal !== "yes"],
  ];
  const rp = Math.round((ready.filter((r) => r[1]).length / ready.length) * 100);

  return { dims, scores, top, ready, rp, score: scores[top] };
}

export function getPrototypeTimelineEvents(d: PrototypeFormData) {
  const promText =
    d.prom === "none" ? "لا يوجد" : d.prom === "broken" ? "لم يُوفَ به" : "تم الوفاء به";
  return [
    [d.late + 30, "فتح الحساب / آخر قسط منتظم"],
    [d.late, "أول تأخر عن السداد"],
    [Math.max(d.lastpay * 30, 1), "آخر سداد مسجل"],
    [Math.max(Math.round(d.late / 2), 1), "محاولة تواصل أولى"],
    [7, `وعد سداد مسجل: ${promText}`],
  ].sort((a, b) => Number(b[0]) - Number(a[0])) as [number, string][];
}

export function getPrototypeEngineRules(
  d: PrototypeFormData,
  analysis: ReturnType<typeof runPrototypeAnalysis>,
): string[] {
  const rules: string[] = [];
  if (d.legal === "yes")
    rules.push("R1: إجراء تنفيذي قائم ← إيقاف التواصل التلقائي ومراجعة بشرية");
  if (d.wo === "yes")
    rules.push("R2: حساب مشطوب ← مسار الاسترداد المالي المتخصص");
  if (d.resp === "none")
    rules.push("R3: لا استجابة سابقة ← تفعيل قنوات تواصل بديلة");
  if (d.prom === "broken")
    rules.push("R4: وعد سداد غير موفى ← اشتراط دفعة مقدمة ملزمة");
  if (d.late >= 60 && d.legal !== "yes")
    rules.push("R5: تأخر ≥ 60 يومًا ← تفضيل عرض إعادة هيكلة / تسوية");
  rules.push(
    `R6: الشخصية ${PERSONAS[analysis.top][0]} بدرجة ${analysis.score} ← اختيار المسار الأنسب`,
  );
  return rules;
}
