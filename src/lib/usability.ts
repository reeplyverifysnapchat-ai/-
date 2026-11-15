export interface UsabilityRecord {
  id: string;
  participant: string;
  task: "T1" | "T2" | "T3";
  status: "success" | "assisted" | "failed";
  seconds: number;
  errors: number;
  notes: string;
  observer: string;
  timestamp: string;
}

export const USABILITY_TASKS = [
  {
    id: "T1" as const,
    num: 1,
    title: "المهمة 1: إدخال البيانات وتشغيل التحليل",
    prompt: "أدخل بيانات حالة عميل متعثر وإكمال الحقول المطلوبة وتشغيل التحليل.",
    location: "الشاشة 1: نموذج إدخال البيانات ← زر «حفظ وبدء الدورة الآلية»",
    availability: "متاحة بالكامل",
    note: "تعمل الدورة الآلية فور الحفظ وتنتقل إلى مراحل التحليل.",
  },
  {
    id: "T2" as const,
    num: 2,
    title: "المهمة 2: الشخصية الناتجة ومبرراتها",
    prompt: "الوصول إلى الشخصية التحصيلية الناتجة وقراءة التصنيف ومبرراته.",
    location: "المرحلتان 5 و6 (مطابقة الشخصية ودرجتها) مع المرحلة 4 (الأبعاد)",
    availability: "متاحة",
    note: "يعرض التطبيق الشخصية المطابقة ودرجة التوافق والأبعاد السبعة.",
  },
  {
    id: "T3" as const,
    num: 3,
    title: "المهمة 3: التوصية وأسباب اختيارها",
    prompt: "الوصول إلى التوصية التحصيلية وفهم الإجراء المقترح وأسباب اختياره.",
    location: "المرحلة 9 (أفضل إجراء تالٍ NBCA) مع المرحلة 8 (القواعد المفعّلة)",
    availability: "متاحة بالكامل",
    note: "تعرض المرحلة 9 التوصية والقناة، وتعرض المرحلة 8 القواعد المفعلة.",
  },
] as const;

export const TASK_MAP: Record<"T1" | "T2" | "T3", string> = {
  T1: "المهمة 1: إدخال البيانات وتشغيل التحليل",
  T2: "المهمة 2: الشخصية الناتجة ومبرراتها",
  T3: "المهمة 3: التوصية وأسبابها",
};

export const STATUS_LABELS: Record<"success" | "assisted" | "failed", string> = {
  success: "أنجز بنجاح دون مساعدة",
  assisted: "أنجز بمساعدة",
  failed: "لم يتمكن من الإنجاز",
};

export const STATUS_SHORT: Record<"success" | "assisted" | "failed", string> = {
  success: "نجاح دون مساعدة",
  assisted: "بمساعدة",
  failed: "فشل",
};

export const TARGET_SUCCESS_RATE = 80;
export const MIN_PARTICIPANTS = 3;
export const TARGET_TRIALS = 9;

// Default benchmark dataset representing 3 collection specialists across 3 tasks
export const DEFAULT_USABILITY_RECORDS: UsabilityRecord[] = [
  {
    id: "ut-rec-01",
    participant: "P1",
    task: "T1",
    status: "success",
    seconds: 42,
    errors: 0,
    notes: "أكمل الإدخال وبدأ الدورة بسلاسة تامة دون أي تردد.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T10:15:00.000Z",
  },
  {
    id: "ut-rec-02",
    participant: "P1",
    task: "T2",
    status: "success",
    seconds: 35,
    errors: 0,
    notes: "وصل لشاشة الشخصية وقرأ درجة المطابقة والأبعاد السبعة.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T10:18:00.000Z",
  },
  {
    id: "ut-rec-03",
    participant: "P1",
    task: "T3",
    status: "success",
    seconds: 28,
    errors: 0,
    notes: "استعرض بطاقة التوصية (NBCA) والقواعد المفعّلة فوراً.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T10:20:00.000Z",
  },
  {
    id: "ut-rec-04",
    participant: "P2",
    task: "T1",
    status: "success",
    seconds: 54,
    errors: 1,
    notes: "صحّح قيمة المديونية وأعاد تشغيل النموذج بنجاح.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T11:05:00.000Z",
  },
  {
    id: "ut-rec-05",
    participant: "P2",
    task: "T2",
    status: "assisted",
    seconds: 68,
    errors: 1,
    notes: "طلب توضيحاً لمعنى أحد الأبعاد قبل قراءة درجة الشخصية.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T11:10:00.000Z",
  },
  {
    id: "ut-rec-06",
    participant: "P2",
    task: "T3",
    status: "success",
    seconds: 38,
    errors: 0,
    notes: "فهم إجراء التسوية والقناة المقترحة دون مساعدة.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T11:15:00.000Z",
  },
  {
    id: "ut-rec-07",
    participant: "P3",
    task: "T1",
    status: "success",
    seconds: 39,
    errors: 0,
    notes: "تنفيذ سريع ومباشر لكافة الحقول المطلوبة.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T12:00:00.000Z",
  },
  {
    id: "ut-rec-08",
    participant: "P3",
    task: "T2",
    status: "success",
    seconds: 31,
    errors: 0,
    notes: "حدد الشخصية المتوافقة ونسبة الجاهزية مباشرة.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T12:04:00.000Z",
  },
  {
    id: "ut-rec-09",
    participant: "P3",
    task: "T3",
    status: "success",
    seconds: 25,
    errors: 0,
    notes: "فهم التوصية وقنوات الاتصال المرتبطة بخصائص الحالة.",
    observer: "مراقب الجودة والاعتماد",
    timestamp: "2026-11-08T12:07:00.000Z",
  },
];

const STORAGE_KEY = "cpf_usability_records_v2";

export function loadUsabilityRecords(): UsabilityRecord[] {
  if (typeof window === "undefined") return DEFAULT_USABILITY_RECORDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USABILITY_RECORDS));
      return DEFAULT_USABILITY_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_USABILITY_RECORDS;
  } catch {
    return DEFAULT_USABILITY_RECORDS;
  }
}

export function saveUsabilityRecords(records: UsabilityRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new Event("cpf_usability_updated"));
  } catch (e) {
    console.error("Failed to save usability records:", e);
  }
}

export function resetUsabilityRecords(): UsabilityRecord[] {
  if (typeof window === "undefined") return DEFAULT_USABILITY_RECORDS;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USABILITY_RECORDS));
    window.dispatchEvent(new Event("cpf_usability_updated"));
  } catch {
    // ignore
  }
  return DEFAULT_USABILITY_RECORDS;
}

export function computeUsabilityStats(records: UsabilityRecord[]) {
  const total = records.length;
  const success = records.filter((r) => r.status === "success").length;
  const assisted = records.filter((r) => r.status === "assisted").length;
  const failed = records.filter((r) => r.status === "failed").length;

  const participants = Array.from(new Set(records.map((r) => r.participant))).sort();
  const rate = total ? Math.round((success / total) * 1000) / 10 : 0;
  const isComplete = participants.length >= MIN_PARTICIPANTS && total >= TARGET_TRIALS;
  const isTargetMet = rate >= TARGET_SUCCESS_RATE && isComplete;

  const totalTime = records.reduce((s, r) => s + r.seconds, 0);
  const avgTime = total ? Math.round(totalTime / total) : 0;
  const totalErrors = records.reduce((s, r) => s + r.errors, 0);
  const avgErrors = total ? Math.round((totalErrors / total) * 10) / 10 : 0;

  // Breakdown per task (T1, T2, T3)
  const taskKeys: ("T1" | "T2" | "T3")[] = ["T1", "T2", "T3"];
  const taskBreakdown = taskKeys.map((task) => {
    const list = records.filter((r) => r.task === task);
    const tTotal = list.length;
    const tSuccess = list.filter((r) => r.status === "success").length;
    const tAssisted = list.filter((r) => r.status === "assisted").length;
    const tFailed = list.filter((r) => r.status === "failed").length;
    const tRate = tTotal ? Math.round((tSuccess / tTotal) * 1000) / 10 : 0;
    const tTime = list.reduce((s, r) => s + r.seconds, 0);
    const tAvgTime = tTotal ? Math.round(tTime / tTotal) : 0;
    const tErrors = list.reduce((s, r) => s + r.errors, 0);
    const tAvgErr = tTotal ? Math.round((tErrors / tTotal) * 10) / 10 : 0;
    return {
      task,
      title: TASK_MAP[task],
      total: tTotal,
      unaided: tSuccess,
      assisted: tAssisted,
      failed: tFailed,
      successRate: tRate,
      avgSeconds: tAvgTime,
      avgErrors: tAvgErr,
    };
  });

  // Breakdown per participant
  const participantBreakdown = participants.map((p) => {
    const list = records.filter((r) => r.participant === p);
    const pTotal = list.length;
    const pSuccess = list.filter((r) => r.status === "success").length;
    const pRate = pTotal ? Math.round((pSuccess / pTotal) * 1000) / 10 : 0;
    const pTime = list.reduce((s, r) => s + r.seconds, 0);
    const pAvgTime = pTotal ? Math.round(pTime / pTotal) : 0;
    const pErrors = list.reduce((s, r) => s + r.errors, 0);
    return {
      participant: p,
      total: pTotal,
      unaided: pSuccess,
      successRate: pRate,
      avgSeconds: pAvgTime,
      totalErrors: pErrors,
    };
  });

  return {
    total,
    totalTrials: total,
    success,
    unaided: success,
    assisted,
    failed,
    rate,
    successRate: rate,
    participants,
    isComplete,
    isTargetMet,
    totalTime,
    avgTime,
    avgSeconds: avgTime,
    totalErrors,
    avgErrors,
    taskBreakdown,
    participantBreakdown,
  };
}
