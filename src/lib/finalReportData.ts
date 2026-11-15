import {
  ALL_OPEN_RESPONSES,
  CURRENT_PRACTICE_ROWS,
  DEMOGRAPHICS_ROWS,
  IMPROVEMENT_OPPORTUNITIES,
  INTEGRATIVE_COMPARISON_ROWS,
  MODERATED_TASKS,
  OPEN_THEMES,
  REPORT_METADATA,
  SURVEY_SCALE_QUESTIONS,
  USABILITY_EASE_MATRIX,
  USABILITY_SESSIONS,
  USABILITY_TASK_MATRIX,
} from "./evaluationReportData";
import {
  ACTIONS,
  formatArNumber,
  getPrototypeEngineRules,
  getPrototypeTimelineEvents,
  loadPrototypeForm,
  PERSONAS,
  type PrototypeFormData,
  runPrototypeAnalysis,
  STAGES_DEF,
} from "./prototypeEngine";

export interface ReportSectionMeta {
  index: number; // 1..8
  id: string;
  title: string;
  enTitle: string;
  sourcePath: string;
}

export const FINAL_REPORT_SECTIONS: ReportSectionMeta[] = [
  { index: 1, id: "hypothesis", title: "الفرضية", enTitle: "Hypothesis & Concept", sourcePath: "/" },
  { index: 2, id: "kpis", title: "المؤشرات والأهداف", enTitle: "KPIs & Targets", sourcePath: "/kpi" },
  { index: 3, id: "method-sample", title: "الطريقة والعينة", enTitle: "Methodology & Sample", sourcePath: "/method-sample" },
  { index: 4, id: "survey", title: "الاستبيان", enTitle: "Prototype Evaluation Survey", sourcePath: "/survey" },
  { index: 5, id: "usability-test", title: "اختبار الاستخدام الموجّه", enTitle: "Moderated Usability Testing", sourcePath: "/usability-test" },
  { index: 6, id: "result-vs-target", title: "النتيجة مقابل الهدف", enTitle: "Results vs. Targets", sourcePath: "/result-vs-target" },
  { index: 7, id: "results", title: "النتائج", enTitle: "Comprehensive Evaluation Results", sourcePath: "/results" },
  { index: 8, id: "final-decision", title: "القرار النهائي", enTitle: "Final Decision", sourcePath: "/final-decision" },
];

export interface SurveyQuestionDetail {
  id: string;
  heading: string;
  badge?: string;
  optionsLine?: string;
  goal?: string;
  meanLabel?: string;
  positiveShareLabel?: string;
  responseNote?: string;
  analysis?: string;
  distributions?: { label: string; countText: string; pct: number; highlight?: boolean }[];
}

export interface FinalReportData {
  generatedAtFormatted: string;
  projectTitleEn: string;
  projectTitleAr: string;
  reportSubtitle: string;
  sections: ReportSectionMeta[];
  sec1Hypothesis: {
    hypothesisBadge: string;
    hypothesisText: string;
    ideaBadge: string;
    ideaPrefix: string;
    ideaBodyBeforeContext: string;
    ideaContextTerm: string;
    ideaMiddle: string;
    ideaNbcaTitle: string;
    ideaNbcaTerm: string;
    ideaReasonLead: string;
    ideaReasonTerm: string;
    ideaEnding: string;
    targetSegmentLabel: string;
    targetSegmentPrimary: string;
    targetSegmentSecondary: string;
  };
  sec2Kpis: {
    intro: string;
    headline: {
      badge: string;
      en: string;
      tag: string;
      nameLabel: string;
      name: string;
      targetLabel: string;
      target: string;
    };
    supportingTitle: string;
    supporting: {
      badge: string;
      en: string;
      nameLabel: string;
      name: string;
      targetLabel: string;
      target: string;
    }[];
  };
  sec3MethodSample: {
    methodologyBadge: string;
    methodologyEn: string;
    methodologyTag: string;
    methodologyIntro: string;
    methods: {
      kicker: string;
      title: string;
      toolLabel: string;
      toolText: string;
      goalLabel: string;
      goalText: string;
    }[];
    sampleTitle: string;
    sampleEn: string;
    usabilitySample: {
      title: string;
      metrics: { value: string; label: string }[];
      description: string;
    };
    surveySample: {
      title: string;
      badge: string;
      description: string;
      bars: { label: string; valueText: string; pct: number }[];
    };
  };
  sec4Survey: {
    pageTitle: string;
    tallyBadge: string;
    tallyDescription: string;
    tallyUrl: string;
    summaryMetrics: { label: string; value: string; sub: string }[];
    platformSectionTitle: string;
    platformIntro: string;
    platformDetailsTitle: string;
    platformBullets: { label: string; text: string }[];
    objectivesTitle: string;
    objectives: string[];
    demographicsTitle: string;
    demographicsIntro: string;
    demographicsRows: { role: string; count: string; pct: string; isTotal?: boolean }[];
    demographicsReadingTitle: string;
    demographicsReading: string;
    questionsTitle: string;
    likertNote: string;
    questions: SurveyQuestionDetail[];
    patternMiningTitle: string;
    patternMiningIntro: string;
    patternDiagramRoot: string;
    patternDiagramBranches: { title: string; items: string[] }[];
    patternItems: { title: string; status: string; quote: string }[];
    resultsVsTargetsTitle: string;
    resultsVsTargetsRows: { indicator: string; target: string; actual: string; status: string }[];
    actionableDecisionsTitle: string;
    actionableDecisionsIntro: string;
    actionableDecisionsQuote: string;
  };
  sec5Prototype: {
    headerTitle: string;
    headerBadge: string;
    engineTitle: string;
    engineSubtitle: string;
    intakeTitle: string;
    intakeSubtitle: string;
    formFields: { label: string; value: string }[];
    stagesOverview: { num: number; shortName: string; title: string; en: string }[];
    liveCaseSummary: {
      form: PrototypeFormData;
      unifiedFields: [string, string][];
      timelineEvents: [number, string][];
      financialSummary: string;
      paymentSummary: string;
      responseSummary: string;
      legalAlert: string | null;
      dims: [string, number][];
      personaScores: { code: string; name: string; score: number; isTop: boolean }[];
      topPersonaCode: string;
      topPersonaName: string;
      topScore: number;
      scoreBadge: string;
      readinessChecks: [string, boolean][];
      readinessPct: number;
      engineRules: string[];
      operationalPath: string;
      nbcaAction: string;
      nbcaChannel: string;
      nbcaChannelShort: string;
      executionDate: string;
      collectedAmount: string;
      responseRateSim: string;
      promiseKeepSim: string;
      efficiencySim: string;
      learningUpdates: string[];
    };
    personasReference: { code: string; name: string; action: string; path: string; channel: string }[];
    disclaimer: string;
  };
  sec6Usability: {
    pageTitle: string;
    methodologyBadge: string;
    methodologyHeading: string;
    methodologyDesc: string;
    overallRateLabel: string;
    overallRateValue: string;
    overallRateSub: string;
    specCards: { label: string; value: string; sub: string }[];
    tasksSectionTitle: string;
    tasks: typeof MODERATED_TASKS;
    matricesTitle: string;
    taskMatrix: typeof USABILITY_TASK_MATRIX;
    easeMatrix: typeof USABILITY_EASE_MATRIX;
    sessionsTitle: string;
    sessions: typeof USABILITY_SESSIONS;
  };
  sec7ResultVsTarget: {
    pageTitle: string;
    cards: {
      badge: string;
      title: string;
      actualMetric: string;
      targetMetric: string;
      progressPct: number;
      summary: string;
      statusLine: string;
    }[];
    patternSectionTitle: string;
    patternSectionBadge: string;
    patternParagraphs: string[];
  };
  sec8Results: {
    metadata: typeof REPORT_METADATA;
    summaryCards: { label: string; value: string }[];
    executiveSummaryTitle: string;
    executiveSummaryParagraphs: string[];
    introTitle: string;
    introParagraphs: string[];
    objectivesTitle: string;
    objectivesIntro: string;
    objectivesList: string[];
    methodologyTitle: string;
    methodologyIntro: string;
    methodologySubsections: { title: string; paragraphs: string[]; bullets?: string[] }[];
    surveyResultsTitle: string;
    demographicsRows: typeof DEMOGRAPHICS_ROWS;
    demographicsAnalysis: string[];
    scaleQuestions: typeof SURVEY_SCALE_QUESTIONS;
    currentPracticeRows: typeof CURRENT_PRACTICE_ROWS;
    currentPracticeAnalysis: string[];
    openThemesIntro: string[];
    openThemes: typeof OPEN_THEMES;
    openThemesConclusion: string;
    usabilityOverviewTitle: string;
    usabilityDataRows: [string, string][];
    moderatedTasks: typeof MODERATED_TASKS;
    sessionsTitle: string;
    usabilitySessions: typeof USABILITY_SESSIONS;
    overallUsabilityTitle: string;
    usabilityTaskMatrix: typeof USABILITY_TASK_MATRIX;
    usabilityEaseMatrix: typeof USABILITY_EASE_MATRIX;
    easeDistributionNote: string;
    easeFormula1: string;
    easeFormula2: string;
    easeSummaryLine: string;
    integrativeTitle: string;
    integrativeIntro: string[];
    integrativeRows: typeof INTEGRATIVE_COMPARISON_ROWS;
    integrativeSubsections: { title: string; paragraphs: string[]; flowLine?: string }[];
    strengthsTitle: string;
    strengthsIntro: string;
    strengthsList: { title: string; detail: string }[];
    improvementsTitle: string;
    improvementsIntro: string;
    improvements: typeof IMPROVEMENT_OPPORTUNITIES;
    limitationsTitle: string;
    limitationsIntro: string;
    limitations: [string, string][];
    conclusionTitle: string;
    conclusionParagraphs: string[];
    mainConclusionLabel: string;
    mainConclusionText: string;
    appendicesTitle: string;
    appendix1: { title: string; rows: [string, string][] };
    appendix2: { title: string; rows: [string, string][] };
    appendix3: { title: string; rows: string[][] };
    appendix4: { title: string; responses: string[] };
    endOfReportLabel: string;
  };
  sec9FinalDecision: {
    pageTitle: string;
    approvedBadge: string;
    statusBadge: string;
    decisionQuote: string;
    pillars: { badge: string; text: string }[];
  };
}

export function buildFinalReportData(overridePrototypeForm?: PrototypeFormData): FinalReportData {
  const form = overridePrototypeForm ?? loadPrototypeForm();
  const analysis = runPrototypeAnalysis(form);
  const timelineEvents = getPrototypeTimelineEvents(form);
  const engineRules = getPrototypeEngineRules(form, analysis);
  const topPersonaCode = PERSONAS[analysis.top][0];
  const topPersonaName = PERSONAS[analysis.top][1];
  const topAction = ACTIONS[topPersonaCode];

  const incMap = {
    stable: "دخل مستقر وموثق",
    irr: "دخل غير منتظم / جزئي",
    none: "لا يوجد دخل حالي",
  };
  const incShortMap = {
    stable: "مستقر",
    irr: "غير منتظم",
    none: "غير متوفر حاليًا",
  };
  const promMap = {
    none: "لا توجد وعود سابقة",
    broken: "وعد سابق غير موفى به",
    kept: "وعد سابق تم الوفاء به",
  };
  const promShortMap = {
    none: "لا توجد",
    broken: "غير موفى بها",
    kept: "موفى بها",
  };
  const respMap = {
    good: "تستجيب بانتظام",
    part: "استجابة جزئية ومتقطعة",
    none: "لا تستجيب مطلقاً",
  };
  const respShortMap = {
    good: "تستجيب بانتظام",
    part: "استجابة جزئية",
    none: "لا تستجيب",
  };

  const scoreBadge =
    analysis.score >= 75
      ? "مطابقة عالية"
      : analysis.score >= 50
      ? "مطابقة متوسطة"
      : "مطابقة منخفضة – تحتاج مراجعة";

  const generatedAtFormatted = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    generatedAtFormatted,
    projectTitleEn: "Collection Persona Framework™",
    projectTitleAr: "ملف النموذج الأولي Collection Persona Framework™",
    reportSubtitle: "",
    sections: FINAL_REPORT_SECTIONS,

    sec1Hypothesis: {
      hypothesisBadge: "الفرضية (Hypothesis)",
      hypothesisText:
        "نعتقد أن أخصائي تحصيل الديون المتعثرة للأفراد سيتمكنون من تحديد الإجراء التحصيلي الأنسب لكل عميل بصورة أكثر دقة ووضوحاً، لأن إطار CPF يعتمد على تحليل سبعة أبعاد للحالة وتصنيف العملاء إلى شخصيات تحصيلية، بما يدعم فهم ظروف العميل وتوجيه قرارات التحصيل وفق خصائص كل حالة، وسنعرف أننا على صواب عندما تبلغ نسبة إتمام المهام الأساسية باستخدام النموذج الأولي 80% على الأقل دون مساعدة.",
      ideaBadge: "الفكرة الأساسية للمشروع (Idea)",
      ideaPrefix: "Collection Persona Framework™",
      ideaBodyBeforeContext:
        " — إطار علمي وتطبيقي موجه لإعادة هيكلة ودعم القرار في التحصيل المصرفي، يعتمد على تحليل سلوك العميل في سياق المديونية ",
      ideaContextTerm: "(Customer-in-Debt-Context)",
      ideaMiddle: " لتحديد ",
      ideaNbcaTitle: "أفضل إجراء تحصيلي تالٍ ",
      ideaNbcaTerm: "(Next Best Collection Action - NBCA)",
      ideaReasonLead: " مسبب بأكواد أسباب ",
      ideaReasonTerm: "(Reason Codes)",
      ideaEnding: " عبر دورة تشغيلية من 12 مرحلة لتفادي المحاولات غير المنتجة.",
      targetSegmentLabel: "الشريحة المستهدفة (Target Segment)",
      targetSegmentPrimary:
        "أخصائيو وموظفو تحصيل المديونيات المصرفية، ومحللو الائتمان والمخاطر في البنك",
      targetSegmentSecondary:
        "(الذين يستخدمون المنظومة لاتخاذ قرارات تحصيل موجهة ومحوكمة)",
    },

    sec2Kpis: {
      intro:
        "منظومة مؤشرات الأداء والأهداف الرقمية المعتمدة للتحقق من فرضية كفاءة قرار التحصيل في إطار Collection Persona Framework™ (CPF):",
      headline: {
        badge: "المؤشر الرئيسي",
        en: "Headline KPI",
        tag: "اختبار قابلية الاستخدام",
        nameLabel: "المؤشر الرئيسي",
        name: "نسبة إتمام أخصائي التحصيل للمهام الأساسية باستخدام النموذج الأولي لـ CPF دون مساعدة.",
        targetLabel: "الهدف الرقمي الرئيسي",
        target: "80% على الأقل في اختبار قابلية الاستخدام.",
      },
      supportingTitle: "المؤشرات الداعمة والأهداف الرقمية المعتمدة",
      supporting: [
        {
          badge: "المؤشر الداعم الأول",
          en: "Supporting KPI 1",
          nameLabel: "المؤشر الداعم الأول",
          name: "متوسط تقييم أخصائي التحصيل لفائدة تحليل الأبعاد السبعة في فهم حالة العميل.",
          targetLabel: "الهدف الرقمي الداعم الأول",
          target: "لا يقل عن 4 من 5 بمقياس ليكرت الخماسي.",
        },
        {
          badge: "المؤشر الداعم الثاني",
          en: "Supporting KPI 2",
          nameLabel: "المؤشر الداعم الثاني",
          name: "متوسط تقييم أخصائي التحصيل لأهمية إظهار مبررات تصنيف العميل والتوصية بالإجراء التحصيلي المناسب NBCA.",
          targetLabel: "الهدف الرقمي الداعم الثاني",
          target: "لا يقل عن 4 من 5 بمقياس ليكرت الخماسي.",
        },
      ],
    },

    sec3MethodSample: {
      methodologyBadge: "الطريقة",
      methodologyEn: "Methodology",
      methodologyTag: "منهجية تقييم تكاملية",
      methodologyIntro:
        "تعتمد الطريقة المستخدمة في مشروع إطار عمل البرسونا CPF على الجمع التكاملي بين منهجين متكاملين لقياس النية والسلوك الفعلي:",
      methods: [
        {
          kicker: "المنهج الأول · قياس النية والانطباعات",
          title: "1. استبيان تقييم النموذج الأولي Survey لقياس النية والانطباعات",
          toolLabel: "نوع الأداة:",
          toolText: "نموذج تقييمي إلكتروني أُطلق عبر منصة Tally الرقمية.",
          goalLabel: "الهدف منه:",
          goalText:
            "قياس ما يقوله المشاركون من خلال استطلاع تصورات وآراء الفئات المستهدفة حول فائدة الأبعاد السبعة، وأهمية مبررات التصنيف Reason Codes، وسهولة الوصول إلى القرار، وتفضيل الإطار مقارنة بالطريقة التقليدية.",
        },
        {
          kicker: "المنهج الثاني · قياس السلوك الفعلي",
          title: "2. اختبار الاستخدام الموجّه Moderated Usability Test لقياس السلوك الفعلي",
          toolLabel: "نوع الأداة:",
          toolText: "جلسات تفاعلية حضورية في مقر العمل باستخدام النموذج الأولي.",
          goalLabel: "الهدف منه:",
          goalText:
            "قياس ما يفعله المشاركون فعلياً، ورصد الأداء التشغيلي لأخصائيي التحصيل أثناء تنفيذ ثلاث مهام عملية أساسية دون مساعدة، وحساب نسبة نجاح إتمام المهام ودرجة السهولة SEQ، ورصد نقاط التعثر.",
        },
      ],
      sampleTitle: "العينة",
      sampleEn: "Sample",
      usabilitySample: {
        title: "عينة اختبار الاستخدام الموجّه",
        metrics: [
          { value: "3", label: "أخصائيي تحصيل" },
          { value: "3", label: "مهام لكل مشارك" },
          { value: "9", label: "محاولات تشغيلية" },
        ],
        description:
          "3 أخصائيي تحصيل معتمدين، نفّذ كل منهم 3 مهام عملية مستقلة في مقر العمل، بإجمالي 9 محاولات تشغيلية.",
      },
      surveySample: {
        title: "عينة الاستبيان",
        badge: "إكمال 100%",
        description:
          "19 مشاركاً مكتمل الاستجابة بنسبة 100%، تمثّل 15 أخصائي وموظف تحصيل مديونيات أفراد بنسبة 78.9%، و4 محللي ائتمان ومخاطر بنسبة 21.1%.",
        bars: [
          { label: "أخصائي وموظف تحصيل مديونيات أفراد", valueText: "15 (78.9%)", pct: 78.9 },
          { label: "محللو ائتمان ومخاطر", valueText: "4 (21.1%)", pct: 21.1 },
        ],
      },
    },

    sec4Survey: {
      pageTitle: "استبيان تقييم إطار عمل البرسونا (Collection Persona Framework™ – CPF)",
      tallyBadge: "تم تنفيذ الاستبيان إلكترونياً عبر منصة Tally",
      tallyDescription: "تم عمل الاستبيان الميداني وتجميع كافة الاستجابات عبر الرابط المرفق أدناه:",
      tallyUrl: "https://tally.so/r/zENaA8",
      summaryMetrics: [
        { label: "إجمالي الاستجابات", value: "19", sub: "مكتملة 100%" },
        { label: "فائدة الأبعاد السبعة", value: "4.37 / 5", sub: "84.2% تقييم إيجابي" },
        { label: "أهمية مبررات التصنيف", value: "4.16 / 5", sub: "89.5% تقييم إيجابي" },
        { label: "تفضيل إطار CPF", value: "78.9%", sub: "15 من 19 مشاركاً" },
      ],
      platformSectionTitle: "1. المنصة المستضيفة ونطاق الاستبيان (Survey Platform & Scope)",
      platformIntro:
        "تم إنشاء وتصميم استبيان تقييم النموذج الأولي لإطار عمل البرسونا (CPF) وإطلاقه إلكترونياً لقياس نية وتصورات وتفضيلات المستخدمين المستهدفين بعد الاطلاع على النموذج الأولي التفاعلي.",
      platformDetailsTitle: "بيانات المنصة ورابط الاستبيان:",
      platformBullets: [
        { label: "المنصة المستضيفة:", text: "تم بناء الاستبيان وتصميمه عبر منصة Tally الإلكترونية (Tally.so)." },
        {
          label: "توضيح عن المنصة:",
          text: "تُعد منصة Tally أداة رقمية متخصصة في بناء النماذج والاستبيانات الإلكترونية، وتتميز بتقديم نماذج وإجابات غير محدودة مجاناً، وتصميم أنيق وسلس مخصص للعرض على الجوال، مع دعم كامل للغة العربية ومحاذاة النصوص من اليمين إلى اليسار (RTL) لضمان تجربة مستخدم سهلة وسريعة.",
        },
        {
          label: "رابط الاستبيان والتوزيع:",
          text: "تم إنشاء رابط الاستبيان المباشر المولد عبر المنصة (https://tally.so/r/zENaA8) وتوزيعه إلكترونياً على المشاركين المستهدفين لاستطلاع آرائهم وتقييماتهم عقب مراجعة النموذج التفاعلي.",
        },
        {
          label: "معدل الإكمال والزيارات:",
          text: "أظهرت تحليلات المنصة تسجيل 19 استجابة مكتملة بنسبة إكمال بلغت 100% دون تسجيل إجابات جزئية.",
        },
      ],
      objectivesTitle: "أهداف الاستبيان:",
      objectives: [
        "قياس مدى إدراك المستخدمين لفائدة الأبعاد السبعة المستخدمة في تحليل العميل.",
        "تقييم أهمية إظهار مبررات تصنيف البرسونا وتوضيحها للمستخدم.",
        "قياس أهمية ربط البرسونا بالتوصية التحصيلية المناسبة (Next Best Collection Action – NBCA).",
        "تقييم سهولة الوصول إلى القرار التحصيلي داخل النموذج الأولي.",
        "رصد أساليب العمل الحالية المتبعة في تحديد الإجراء التحصيلي.",
        "قياس تفضيل إطار CPF مقارنة بالطرق التقليدية المتبعة.",
        "جمع الملاحظات والمقترحات النصية المفتوحة لتحسين الواجهات والوظائف.",
      ],
      demographicsTitle: "2. خصائص عينة المشاركين (Sample Demographics)",
      demographicsIntro: "ضم الاستبيان 19 مشاركاً مكتمل الاستجابة من الفئات الوظيفية المستهدفة داخل القطاع المصرفي:",
      demographicsRows: [
        { role: "أخصائي / موظف تحصيل مديونيات الأفراد", count: "15", pct: "78.9%" },
        { role: "محلل مخاطر أو ائتمان", count: "4", pct: "21.1%" },
        { role: "إدارة العمليات والرقابة التحصيلية", count: "0", pct: "0.0%" },
        { role: "دور وظيفي آخر", count: "0", pct: "0.0%" },
        { role: "الإجمالي", count: "19", pct: "100.0%", isTotal: true },
      ],
      demographicsReadingTitle: "القراءة التحليلية للعينة:",
      demographicsReading:
        "تُظهر البيانات أن غالبية العينة (78.9%) يمثلون الموظفين والأخصائيين المباشرين لعمليات التحصيل، مما يعطي تقييماً واقعياً لقابلية الاستخدام في بيئة العمل الميداني، بمشاركة 21.1% من محللي المخاطر لإضافة بعد رقابي وتحليلي لتقييم المنظومة.",
      questionsTitle: "3. عرض أسئلة الاستبيان وإجابات المشاركين كافة (Survey Questions & All Responses)",
      likertNote:
        "اعتمدت الأسئلة التقييمية على مقياس ليكرت الخماسي المتوازن (من 1 = التقييم السلبي الأدنى، إلى 5 = التقييم الإيجابي الأعلى).",
      questions: [
        {
          id: "q1",
          heading: "س1: ما هو دورك الوظيفي الحالي في القطاع المصرفي؟",
          optionsLine: "الخيارات: (أخصائي/موظف تحصيل مديونيات الأفراد - محلل مخاطر - إدارة العمليات والرقابة - آخر)",
          distributions: [
            { label: "أخصائي / موظف تحصيل", countText: "15 مشاركاً (78.9%)", pct: 78.9, highlight: true },
            { label: "محلل مخاطر", countText: "4 مشاركين (21.1%)", pct: 21.1, highlight: true },
            { label: "إدارة العمليات والرقابة / آخر", countText: "0 مشارك (0.0%)", pct: 0 },
          ],
        },
        {
          id: "q2",
          heading: "س2: ما مدى فائدة عرض الأبعاد السبعة لتحليل حالة العميل في إطار CPF؟",
          badge: "المتوسط: 4.37 / 5",
          goal: "الهدف: قياس مدى جدوى التحليل متعدد الأبعاد (مالي، سلوكي، رقمي، ديموغرافي...) بدلاً من الاعتماد على قيمة الدين فقط.",
          meanLabel: "المتوسط الحسابي: 4.37 من 5",
          positiveShareLabel: "نسبة التقييمات الإيجابية (درجات 4 و5): 84.2% (16 من أصل 19 مشاركاً)",
          distributions: [
            { label: "الدرجة 5 (مفيد جداً)", countText: "12 مشاركاً (63.2%)", pct: 63.2, highlight: true },
            { label: "الدرجة 4 (مفيد)", countText: "4 مشاركين (21.1%)", pct: 21.1, highlight: true },
            { label: "الدرجة 3 (محايد)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
            { label: "الدرجة 2 (غير مفيد)", countText: "مشاركان (10.5%)", pct: 10.5 },
            { label: "الدرجة 1 (غير مفيد إطلاقاً)", countText: "0 مشارك (0.0%)", pct: 0 },
          ],
          analysis:
            "التحليل: يعكس التقييم تأييداً مرتفعاً لمبدأ التحليل الشامل؛ حيث يرى المشاركون أن استعراض الأبعاد السبعة يمنح فهمًا أعمق لظروف العميل السلوكية والمالية قبل التواصل.",
        },
        {
          id: "q3",
          heading: "س3: ما مدى أهمية إظهار مبررات تصنيف البرسونا والتوصية بالإجراء التحصيلي (NBCA)؟",
          badge: "المتوسط: 4.16 / 5",
          goal: "الهدف: قياس أهمية الشفافية وقابلية التفسير للأسباب التي بُني عليها التصنيف والتوصية.",
          meanLabel: "المتوسط الحسابي: 4.16 من 5",
          positiveShareLabel: "نسبة التقييمات الإيجابية (درجات 4 و5): 89.5% (17 من أصل 19 مشاركاً)",
          distributions: [
            { label: "الدرجة 5 (مهم جداً)", countText: "9 مشاركين (47.4%)", pct: 47.4, highlight: true },
            { label: "الدرجة 4 (مهم)", countText: "8 مشاركين (42.1%)", pct: 42.1, highlight: true },
            { label: "الدرجة 3 (محايد)", countText: "0 مشارك (0.0%)", pct: 0 },
            { label: "الدرجة 2 (غير مهم)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
            { label: "الدرجة 1 (غير مهم إطلاقاً)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
          ],
          analysis:
            "التحليل: تؤكد هذه النتيجة أن الأخصائي يحتاج إلى فهم الأسباب ومبررات التصنيف (Reason Codes) والأساس الذي بُنيت عليه التوصية لتعزيز الثقة في القرار.",
        },
        {
          id: "q4",
          heading: "س4: ما مدى سهولة الوصول إلى الخيار والقرار التحصيلي المناسب داخل النموذج الأولي؟",
          badge: "المتوسط: 4.26 / 5",
          goal: "الهدف: تقييم سلاسة وضوح الشاشات والوصول للتوصية.",
          meanLabel: "المتوسط الحسابي: 4.26 من 5",
          positiveShareLabel: "نسبة التقييمات الإيجابية (درجات 4 و5): 78.9% (15 من أصل 19 مشاركاً)",
          distributions: [
            { label: "الدرجة 5 (سهل جداً)", countText: "11 مشاركاً (57.9%)", pct: 57.9, highlight: true },
            { label: "الدرجة 4 (سهل)", countText: "4 مشاركين (21.1%)", pct: 21.1, highlight: true },
            { label: "الدرجة 3 (محايد)", countText: "مشاركان (10.5%)", pct: 10.5 },
            { label: "الدرجة 2 (صعب)", countText: "مشاركان (10.5%)", pct: 10.5 },
            { label: "الدرجة 1 (صعب جداً)", countText: "0 مشارك (0.0%)", pct: 0 },
          ],
          analysis:
            "التحليل: رغم التقييم الإيجابي العام، فإن وجود 4 تقييمات بدرجات 2 و3 (21.1%) يستدعي تحسين إبراز التوصية وتقليل الخطوات لضمان وصول الجميع للقرار بنفس السلاسة.",
        },
        {
          id: "q5",
          heading: "س5: ما هو أسلوب العمل الذي تعتمد عليه حالياً عند تحديد الإجراء التحصيلي للعميل؟",
          goal: "الهدف: رصد الواقع التشغيلي الحالي وكشف الفجوة في بيئة العمل.",
          distributions: [
            { label: "1. اعتماد إجراء موحد ونمطي لجميع الحالات", countText: "11 مشاركاً (57.9%)", pct: 57.9, highlight: true },
            { label: "2. مراجعة يدوية لعدة شاشات وأنظمة متفرقة", countText: "5 مشاركين (26.3%)", pct: 26.3, highlight: true },
            { label: "3. الاستعانة بالتوصيات التلقائية المتاحة بالنظام", countText: "3 مشاركين (15.8%)", pct: 15.8 },
          ],
          analysis:
            "التحليل: تُظهر النتائج أن 84.2% من المشاركين يعانون إما من نمطية المعالجة الموحدة (57.9%) أو استنزاف الوقت في المراجعة اليدوية المتفرقة (26.3%)، مما يبرز الحاجة التشغيلية المباشرة لمنظومة CPF.",
        },
        {
          id: "q6",
          heading: "س6: ما مدى تفضيلك لإطار CPF مقارنة بالطريقة التقليدية المتبعة حالياً؟",
          badge: "المتوسط: 4.16 / 5",
          goal: "الهدف: قياس القبول والنية للانتقال للمفهوم الجديد.",
          meanLabel: "المتوسط الحسابي: 4.16 من 5",
          positiveShareLabel: "نسبة التأييد الإيجابي (درجات 4 و5): 78.9% (15 من أصل 19 مشاركاً)",
          distributions: [
            { label: "الدرجة 5 (أفضّل CPF بكثير)", countText: "10 مشاركين (52.6%)", pct: 52.6, highlight: true },
            { label: "الدرجة 4 (أفضّل CPF)", countText: "5 مشاركين (26.3%)", pct: 26.3, highlight: true },
            { label: "الدرجة 3 (محايد / لا يوجد فرق)", countText: "مشارك واحد (5.3%)", pct: 5.3 },
            { label: "الدرجة 2 (أفضّل الطريقة التقليدية)", countText: "3 مشاركين (15.8%)", pct: 15.8 },
            { label: "الدرجة 1 (أفضّل الطريقة التقليدية بكثير)", countText: "0 مشارك (0.0%)", pct: 0 },
          ],
          analysis:
            "التحليل: أظهرت البيانات تفضيلاً واضحاً ورغبة لدى 78.9% من المشاركين للتحول نحو إطار CPF بدلاً من الإجراءات النمطية التقليدية.",
        },
        {
          id: "q7",
          heading: "س7: ما هي أبرز ملاحظاتك أو مقترحاتك لتحسين شاشات ومعلومات النموذج الأولي؟ (سؤال مفتوح)",
          responseNote: "الاستجابة: قدّم 18 مشاركاً من أصل 19 تعليقات نصية تفصيلية.",
        },
      ],
      patternMiningTitle: "4. تحليل الأنماط والملاحظات النوعية (Pattern Mining)",
      patternMiningIntro:
        "وفقاً لقواعد تحليل البيانات النصية (اعتبار تكرار الملاحظة لدى 3 أشخاص أو أكثر نمطاً واضحاً يستوجب التعديل والعمل عليه)، تم استخراج الأنماط التالية من إجابات السؤال السابع:",
      patternDiagramRoot: "أنماط الملاحظات النصية",
      patternDiagramBranches: [
        {
          title: "النمط 1: مبررات التصنيف",
          items: ["إبراز أكواد الأسباب", "وضعها في أعلى الشاشة", "تمييزها بألوان تنبيهية"],
        },
        {
          title: "النمط 2: الربط بالتوصية",
          items: ["ربط مباشر بين البرسونا وإجراء NBCA المقترح", "توضيح سبب اختيار الإجراء"],
        },
        {
          title: "النمط 3: التنفيذ المباشر",
          items: ["زر مباشر لإرسال رابط السداد", "تقرير ملخص قابل للطباعة", "ألوان ورموز بصرية للتمييز"],
        },
      ],
      patternItems: [
        {
          title: "1. النمط الأول: إبراز مبررات تصنيف البرسونا (Reason Codes) أعلى الشاشة",
          status: "(ظهر لدى 5 مشاركين - نمط واضح)",
          quote:
            "أبرز التعليقات: «إظهار مبررات تصنيف البرسونا مفيد جداً، ولكن أفضّل إبرازها في أعلى الشاشة بلون مختلف لسهولة قراءتها قبل اختيار الإجراء التحصيلي».",
        },
        {
          title: "2. النمط الثاني: الربط المباشر بين خصائص البرسونا والتوصية التحصيلية (NBCA)",
          status: "(ظهر لدى 4 مشاركين - نمط واضح)",
          quote:
            "أبرز التعليقات: «أقترح تطوير التوصيات لتكون أكثر ارتباطاً بخصائص كل شخصية وتحليل ظروفها».",
        },
        {
          title: "3. النمط الثالث: إضافة أزرار تنفيذاً وتقارير مساندة",
          status: "(ظهر لدى 4 مشاركين - نمط واضح)",
          quote:
            "أبرز التعليقات: «إضافة زر مباشر لإرسال رابط السداد الذاتي للعميل بنقرة واحدة من شاشة التوصية»، و«إمكانية طباعة تقرير مختصر يتضمن نتائج التحليل والتوصية».",
        },
        {
          title: "4. النمط الرابع: التمييز البصري بالشعار والألوان",
          status: "(ظهر لدى مشاركين اثنين - فئة \"راقبه\")",
          quote:
            "أبرز التعليقات: «استخدام ألوان ورموز بصرية لتمييز شخصيات البرسونا وتسهيل قراءتها بسرعة».",
        },
      ],
      resultsVsTargetsTitle: "5. مقارنة النتائج بالأهداف الرقمية المحددة مسبقاً (Results vs. Targets)",
      resultsVsTargetsRows: [
        {
          indicator: "فائدة عرض الأبعاد السبعة",
          target: "لا يقل عن 4.00 من 5",
          actual: "4.37 من 5 (84.2% إيجابي)",
          status: "تحقق وتجاوز الهدف بامتياز",
        },
        {
          indicator: "أهمية مبررات التصنيف والتوصية",
          target: "لا يقل عن 4.00 من 5",
          actual: "4.16 من 5 (89.5% إيجابي)",
          status: "تحقق وتجاوز الهدف بامتياز",
        },
        {
          indicator: "سهولة الوصول للقرار التحصيلي",
          target: "لا يقل عن 4.00 من 5",
          actual: "4.26 من 5 (78.9% إيجابي)",
          status: "تحقق وتجاوز الهدف بنجاح",
        },
        {
          indicator: "تفضيل CPF على الطريقة التقليدية",
          target: "لا يقل عن 60.0% تأييد",
          actual: "78.9% (15 من 19 مشاركاً)",
          status: "تحقق وتجاوز الهدف بنجاح",
        },
      ],
      actionableDecisionsTitle: "6. القرارات التطويرية والخطوات التالية (Actionable Decisions)",
      actionableDecisionsIntro: "اعتماداً على نتائج القياس الكمي وتحليل أنماط المقترحات، تقرر الآتي:",
      actionableDecisionsQuote:
        "\"نُبقي على الفكرة، ونُبرز مبررات التصنيف في أعلى الشاشة بلون متميز وشرح موجز، ونربط التوصية التحصيلية (NBCA) بخصائص البرسونا مباشرة، مع إضافة زر السداد الذاتي داخل النموذج الأولي لـ CPF، ثم نختبر مجدداً في التجربة التشغيلية\".",
    },

    sec5Prototype: {
      headerTitle: "النموذج الأولي التفاعلي (CPF™ Engine)",
      headerBadge: "دورة آلية عبر 12 مرحلة",
      engineTitle: "منصة اتخاذ قرار التحصيل الذكي – CPF™",
      engineSubtitle:
        "تطبيق تفاعلي يدير دورة التحصيل الآلية عبر 12 مرحلة لدعم القرار وتحديد أفضل إجراء تالٍ (NBCA).",
      intakeTitle: "المرحلة 1: استلام وتغذية بيانات العميل (Data Intake)",
      intakeSubtitle:
        "جميع القيم الافتراضية محاكاة قابلة للتعديل لمشاهدة تأثيرها الفوري على مخرجات ومسارات اتخاذ القرار.",
      formFields: [
        { label: "اسم العميل", value: form.name },
        { label: "رقم الحساب", value: form.acc },
        { label: "المنتج المصرفي", value: form.prod },
        { label: "إجمالي المديونية (ريال)", value: `${formatArNumber(form.debt)} ريال` },
        { label: "أيام التأخر عن السداد", value: `${form.late} يومًا` },
        { label: "حالة الحساب", value: form.wo === "yes" ? "مشطوب (Write-off)" : "قائم (غير مشطوب)" },
        { label: "آخر سداد (قبل كم شهر)", value: `${form.lastpay} أشهر` },
        { label: "وعود السداد السابقة", value: promMap[form.prom] },
        { label: "الاستجابة للتواصل", value: respMap[form.resp] },
        { label: "استقرار الدخل", value: incMap[form.inc] },
        {
          label: "الإجراء القانوني / التنفيذي",
          value: form.legal === "yes" ? "تحت الإجراء التنفيذي / نزاع قانوني" : "لا توجد قضية / إجراء تنفيذي",
        },
        { label: "المحفظة / الإسناد", value: form.pf },
      ],
      stagesOverview: STAGES_DEF.map((s, idx) => ({
        num: idx + 1,
        shortName: s.n,
        title: s.t,
        en: s.en,
      })),
      liveCaseSummary: {
        form,
        unifiedFields: [
          ["اسم العميل", form.name],
          ["رقم الحساب", form.acc],
          ["المنتج", form.prod],
          ["المديونية", `${formatArNumber(form.debt)} ريال`],
          ["أيام التأخر", `${form.late} يومًا`],
          ["حالة الحساب", form.wo === "yes" ? "مشطوب" : "قائم"],
          ["المحفظة", form.pf],
        ],
        timelineEvents,
        financialSummary: `مديونية بمبلغ ${formatArNumber(form.debt)} ريال على منتج ${form.prod}، متأخرة منذ ${form.late} يومًا، واستقرار الدخل: ${incShortMap[form.inc]}.`,
        paymentSummary: `آخر سداد مسجل كان قبل ${form.lastpay} أشهر، وسجل الوعود السابقة: ${promShortMap[form.prom]}.`,
        responseSummary: `الاستجابة للتواصل: ${respShortMap[form.resp]}.`,
        legalAlert:
          form.legal === "yes" ? "⚠️ تنبيه: الملف يخضع حالياً لإجراء تنفيذي / قضائي قائم." : null,
        dims: analysis.dims,
        personaScores: PERSONAS.map(([code, name], i) => ({
          code,
          name,
          score: analysis.scores[i],
          isTop: i === analysis.top,
        })),
        topPersonaCode,
        topPersonaName,
        topScore: analysis.score,
        scoreBadge,
        readinessChecks: analysis.ready,
        readinessPct: analysis.rp,
        engineRules,
        operationalPath: topAction[1],
        nbcaAction: topAction[0],
        nbcaChannel: topAction[2],
        nbcaChannelShort: topAction[2],
        executionDate: new Date().toLocaleDateString("ar-SA"),
        collectedAmount: `${formatArNumber(Math.round(form.debt * 0.1))} ريال سعودي`,
        responseRateSim: form.resp === "none" ? "0%" : "100%",
        promiseKeepSim: form.prom === "broken" ? "50%" : "100%",
        efficiencySim: analysis.rp >= 80 ? "عالية" : "متوسطة",
        learningUpdates: [
          `تم تحديث سجل العميل ${form.acc} بنتيجة الإجراء وقناة التواصل.`,
          `مراجعة تصنيف الشخصية: بقاء ${topPersonaCode} مع ترقية الدرجة إلى ${Math.min(100, analysis.score + 2)} بعد اكتمال الدورة.`,
          "تغذية محرك القرار التراكمي بنتائج هذه المحاولة لتعزيز دقة الأوزان في الحالات القادمة.",
        ],
      },
      personasReference: PERSONAS.map(([code, name]) => ({
        code,
        name,
        action: ACTIONS[code][0],
        path: ACTIONS[code][1],
        channel: ACTIONS[code][2],
      })),
      disclaimer:
        "المخرجات المعروضة في المراحل 10–12 محاكاة لأغراض العرض فقط، والشخصيات وأوزان الدرجة قابلة للتعديل والضبط وفق سياسة البنك.",
    },

    sec6Usability: {
      pageTitle: "اختبار الاستخدام الموجّه (Moderated Usability Testing)",
      methodologyBadge: "منهجية اختبار الاستخدام الموجّه",
      methodologyHeading: "جلسات حضورية في مقر العمل باستخدام النموذج الأولي التفاعلي",
      methodologyDesc:
        "نُفذ اختبار الاستخدام الموجّه بمشاركة ثلاثة أخصائيي تحصيل، حيث كُلّف كل مشارك بتنفيذ ثلاث مهام مستقلة، بإجمالي تسع محاولات. بدأت كل جلسة بأسئلة تمهيدية وشرح هدف الاختبار، مع توضيح أن التقييم موجه للنموذج وليس لأداء المشارك الشخصي، وبعد كل مهمة قيّم المشارك سهولتها بمقياس من 1 (صعبة جداً) إلى 7 (سهلة جداً).",
      overallRateLabel: "نسبة النجاح الإجمالية",
      overallRateValue: "88.89%",
      overallRateSub: "8 من أصل 9 مهام ناجحة",
      specCards: [
        { label: "عدد المشاركين", value: String(REPORT_METADATA.usabilityParticipants), sub: "أخصائيي تحصيل" },
        { label: "المهام لكل مشارك", value: String(REPORT_METADATA.tasksPerParticipant), sub: "مهام مستقلة" },
        { label: "إجمالي المحاولات", value: String(REPORT_METADATA.totalTrials), sub: "8 ناجحة · 1 متعثرة" },
        { label: "متوسط السهولة", value: "5.33 / 7", sub: "48 من أصل 63 درجة" },
        { label: "الميسّر (Moderator)", value: "ماجد", sub: "إدارة وتوجيه الجلسات" },
        { label: "مقياس التقييم", value: "1 – 7", sub: "سهولة تنفيذ المهمة" },
      ],
      tasksSectionTitle: "المهام الثلاث المعتمدة في الاختبار الموجّه",
      tasks: MODERATED_TASKS,
      matricesTitle: "ملخص نتائج تنفيذ المهام ومقياس السهولة حسب المشاركين",
      taskMatrix: USABILITY_TASK_MATRIX,
      easeMatrix: USABILITY_EASE_MATRIX,
      sessionsTitle: "تفاصيل جلسات الاختبار الموجّه (3 جلسات حضورية موثقة)",
      sessions: USABILITY_SESSIONS,
    },

    sec7ResultVsTarget: {
      pageTitle: "النتيجة مقابل الهدف",
      cards: [
        {
          badge: "المؤشر الرئيسي",
          title: "النتيجة الرئيسية لإتمام المهام دون مساعدة",
          actualMetric: "88.89%",
          targetMetric: "80%",
          progressPct: 88.89,
          summary:
            "نجاح 8 مهام من أصل 9 محاولات دون مساعدة، بنسبة نجاح بلغت 88.89%، وبمتوسط سهولة قدره 5.33 من 7 على مقياس SEQ.",
          statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 80%.",
        },
        {
          badge: "المؤشر الداعم الأول",
          title: "نتيجة المؤشر الداعم الأول لفائدة الأبعاد السبعة",
          actualMetric: "4.37 / 5",
          targetMetric: "4 / 5",
          progressPct: 87.4,
          summary: "حققت متوسط 4.37 من 5، بنسبة تقييمات إيجابية بلغت 84.2%، أي 16 من أصل 19 مشاركاً.",
          statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 4 من 5.",
        },
        {
          badge: "المؤشر الداعم الثاني",
          title: "نتيجة المؤشر الداعم الثاني لأهمية مبررات التصنيف والتوصية",
          actualMetric: "4.16 / 5",
          targetMetric: "4 / 5",
          progressPct: 83.2,
          summary: "حققت متوسط 4.16 من 5، بنسبة تقييمات إيجابية بلغت 89.5%، أي 17 من أصل 19 مشاركاً.",
          statusLine: "تحقق الهدف وتجاوزه مقارنة بالهدف المحدد عند 4 من 5.",
        },
      ],
      patternSectionTitle: "اكتشاف الأنماط ونقاط التعثر",
      patternSectionBadge: "نقطة التحسين الجوهرية",
      patternParagraphs: [
        "كشف الاختبار عن تعثّر في الوصول المستقل للتوصية التحصيلية NBCA لدى إحدى المشاركات في المهمة الثالثة، بسبب غياب الربط المباشر بين التوصية ومبررات التصنيف.",
        "وتطابق ذلك مع النمط المتكرر لدى أكثر من 3 مشاركين في الاستبيان، الذين طالبوا بإبراز مبررات التصنيف Reason Codes في أعلى الشاشة وربط التوصية بها مباشرة.",
      ],
    },

    sec8Results: {
      metadata: REPORT_METADATA,
      summaryCards: [
        { label: "عدد المشاركين في الاستبيان", value: "19 مشاركاً" },
        { label: "المشاركون في الاختبار الموجّه", value: "3 أخصائيي تحصيل" },
        { label: "عدد المهام", value: "3 مهام لكل مشارك" },
        { label: "إجمالي محاولات تنفيذ المهام", value: "9 محاولات" },
      ],
      executiveSummaryTitle: "1. الملخص التنفيذي",
      executiveSummaryParagraphs: [
        "يستعرض هذا التقرير نتائج تقييم النموذج الأولي لإطار عمل البرسونا (Collection Persona Framework™️ – CPF)، من خلال مصدرين للتقييم: استبيان تقييم النموذج الأولي، واختبار الاستخدام الموجّه (Moderated Usability Testing).",
        "استهدف التقييم التحقق من مدى وضوح النموذج وسهولة استخدامه، وقياس مدى إدراك المستخدمين لفائدة تحليل العميل من خلال أبعاد متعددة، وأهمية إظهار مبررات تصنيف البرسونا وربطها بالتوصية التحصيلية المناسبة (Next Best Collection Action – NBCA).",
        "شمل الاستبيان 19 استجابة مكتملة، وتضمن سبعة أسئلة تناولت الأدوار الوظيفية للمشاركين، وفائدة الأبعاد المستخدمة في تحليل العميل، وأهمية مبررات التصنيف والتوصية، وسهولة الوصول إلى القرار التحصيلي، والممارسة الحالية في تحديد الإجراء، ومدى تفضيل إطار CPF مقارنة بالطريقة التقليدية، إضافة إلى سؤال مفتوح للملاحظات والمقترحات.",
        "وأظهرت نتائج الاستبيان متوسطاً بلغ 4.37 من 5 لتقييم فائدة الأبعاد السبعة، و4.16 من 5 لأهمية إظهار مبررات التصنيف والتوصية، و4.26 من 5 لسهولة الوصول إلى القرار التحصيلي، و4.16 من 5 لتفضيل إطار CPF مقارنة بالطريقة التقليدية.",
        "أما اختبار الاستخدام الموجّه، فقد نُفذ حضورياً في مقر العمل بمشاركة ثلاثة أخصائيي تحصيل، حيث كُلّف كل مشارك بتنفيذ ثلاث مهام مستقلة باستخدام النموذج الأولي التفاعلي، بإجمالي تسع محاولات.",
        "وأظهرت النتائج نجاح المشارك الأول منير نوار المطيري في تنفيذ المهام الثلاث، ونجاح المشاركة الثانية عروب عصفور في تنفيذ المهام الثلاث، بينما نجحت المشاركة الثالثة ذكرى يحيى مطري في تنفيذ المهمتين الأولى والثانية، وتعذّر عليها الوصول المستقل إلى التوصية التحصيلية في المهمة الثالثة.",
        "وبذلك بلغ إجمالي المهام الناجحة 8 من أصل 9، بنسبة نجاح بلغت 88.89%، فيما بلغ متوسط تقييم سهولة الاستخدام 5.33 من 7.",
        "وتكشف نتائج الاختبار عن نقطة مهمة تتعلق بضرورة تعزيز وضوح العلاقة بين تصنيف البرسونا ومبرراته والتوصية التحصيلية، خصوصاً أن المشاركة الثالثة أوضحت أنها كانت تتوقع أن تكون التوصية مرتبطة بصورة مباشرة بمبررات تصنيف العميل، وأن يكون سبب اختيار الإجراء واضحاً أمامها.",
        "وتشير النتائج مجتمعة إلى وجود قبول أولي إيجابي لفكرة الإطار والنموذج الأولي، مع تحديد فرص تطوير عملية تتعلق بإبراز مبررات التصنيف، وتسهيل الوصول إلى التوصية التحصيلية، وتحسين الترابط بين مخرجات التحليل والقرار المقترح.",
      ],
      introTitle: "2. مقدمة التقرير",
      introParagraphs: [
        "يأتي هذا التقييم ضمن مراحل تطوير إطار عمل البرسونا (Collection Persona Framework™️ – CPF)، الذي يستهدف تطوير منهجية تحليل العملاء المتعثرين من خلال الانتقال من الاعتماد على المؤشرات التقليدية وحدها، إلى فهم أوسع لخصائص العميل المالية والسلوكية والديموغرافية والرقمية.",
        "وتقوم فكرة الإطار على الاستفادة من الأبعاد المختلفة للعميل في بناء تصنيف يساعد على فهم طبيعة الحالة، وتحديد خصائص البرسونا، وإظهار مبررات التصنيف، ثم ربط نتائج التحليل بالتوصية التحصيلية المناسبة.",
        "وانطلاقاً من ذلك، لم يقتصر تقييم النموذج الأولي على معرفة مدى إعجاب المستخدمين بالتصميم أو طريقة عرض المعلومات، بل امتد إلى التحقق من مدى إدراكهم لفائدة مخرجات الإطار، ومدى وضوح المعلومات اللازمة لاتخاذ القرار، وقدرتهم على التعامل مع النموذج وتنفيذ المهام المطلوبة.",
        "ولتحقيق ذلك، تم الاعتماد على الاستبيان واختبار الاستخدام الموجّه باعتبارهما وسيلتين متكاملتين؛ حيث يقيس الاستبيان تصورات المشاركين وتقييماتهم، بينما يركز اختبار الاستخدام على ملاحظة الأداء الفعلي للمستخدم أثناء تنفيذ المهام المحددة.",
      ],
      objectivesTitle: "3. أهداف التقييم",
      objectivesIntro: "استهدف التقييم تحقيق الأهداف التالية:",
      objectivesList: [
        "قياس مدى إدراك المستخدمين لفائدة الأبعاد السبعة المستخدمة في تحليل العميل.",
        "تقييم أهمية إظهار مبررات تصنيف البرسونا للمستخدم.",
        "قياس أهمية ربط تصنيف البرسونا بالتوصية التحصيلية المناسبة (NBCA).",
        "تقييم سهولة الوصول إلى الخيار والقرار التحصيلي داخل النموذج الأولي.",
        "التعرف على أساليب العمل الحالية التي يعتمد عليها المشاركون في تحديد الإجراء التحصيلي.",
        "قياس مدى تفضيل إطار CPF مقارنة بالطريقة التقليدية.",
        "رصد الملاحظات والمقترحات المتعلقة بتحسين المعلومات والواجهات والوظائف.",
        "اختبار قدرة المستخدمين على تنفيذ المهام المحددة داخل النموذج الأولي.",
        "تحديد نقاط القوة ومواطن التعثر التي تتطلب تحسيناً قبل الانتقال إلى مرحلة التطبيق الأوسع.",
      ],
      methodologyTitle: "4. منهجية التقييم ونطاقه",
      methodologyIntro: "اعتمد التقييم على منهجين مستقلين ومتكاملين:",
      methodologySubsections: [
        {
          title: "4.1 استبيان تقييم النموذج الأولي",
          paragraphs: [
            "تم استخدام نموذج إلكتروني لجمع آراء المشاركين بعد اطلاعهم على النموذج الأولي.",
            "بلغ عدد الاستجابات المكتملة 19 استجابة، وتكون الاستبيان من سبعة أسئلة، شملت أسئلة لتحديد الدور الوظيفي، وأسئلة تقييمية بمقياس خماسي، وسؤالاً مفتوحاً لجمع الملاحظات والمقترحات.",
          ],
        },
        {
          title: "4.2 اختبار الاستخدام الموجّه",
          paragraphs: [
            "تم تنفيذ اختبار الاستخدام الموجّه من خلال جلسات حضورية في مقر العمل باستخدام النموذج الأولي التفاعلي، بمشاركة ثلاثة أخصائيي تحصيل.",
            "كُلّف كل مشارك بتنفيذ ثلاث مهام، ليصبح إجمالي محاولات تنفيذ المهام تسع محاولات.",
            "وقد تضمنت المهام:",
          ],
          bullets: [
            "مراجعة الأبعاد السبعة المستخدمة في تحليل العميل.",
            "تحديد البرسونا ومراجعة مبررات التصنيف.",
            "تحديد الإجراء التحصيلي الأنسب (Next Best Collection Action – NBCA).",
          ],
        },
        {
          title: "4.2 (تابع) ضوابط ومقياس الجلسات",
          paragraphs: [
            "بدأت كل جلسة بأسئلة تمهيدية وشرح هدف الاختبار، مع توضيح أن التقييم موجه للنموذج وليس لأداء المشارك الشخصي، وأن المطلوب تنفيذ المهام بصورة مستقلة قدر الإمكان.",
            "وبعد كل مهمة، طُلب من المشارك تقييم سهولتها باستخدام مقياس من 1 إلى 7، بحيث تعني الدرجة 1 أن المهمة صعبة جداً، والدرجة 7 أنها سهلة جداً.",
          ],
        },
        {
          title: "4.3 طريقة تحليل البيانات",
          paragraphs: [
            "تم تحليل نتائج الاستبيان الكمية باستخدام المتوسط الحسابي وتوزيع الإجابات والنسب المئوية.",
            "واستخدمت الإجابات المفتوحة في تحديد المحاور المتكررة والاحتياجات التطويرية التي أشار إليها المشاركون.",
            "أما اختبار الاستخدام الموجّه، فتم تحليل نتائجه بصورة مستقلة عن الاستبيان، بالاعتماد على عدد المهام الناجحة وإجمالي المحاولات ومتوسط تقييم سهولة الاستخدام، إلى جانب الملاحظات المسجلة خلال الجلسات.",
          ],
        },
      ],
      surveyResultsTitle: "5. نتائج استبيان تقييم النموذج الأولي",
      demographicsRows: DEMOGRAPHICS_ROWS,
      demographicsAnalysis: [
        "توضح النتائج أن غالبية المشاركين من أخصائيي وموظفي تحصيل مديونيات الأفراد، بنسبة بلغت 78.9%، وهي الفئة الأكثر ارتباطاً بالاستخدام المباشر للنموذج في بيئة العمل.",
        "كما شارك محللو الائتمان والمخاطر بنسبة 21.1%، بما يضيف منظوراً تحليلياً إلى تقييم الإطار.",
        "وتُعد هذه التركيبة مناسبة للحصول على انطباعات أولية من الفئات ذات العلاقة، إلا أن عدم مشاركة ممثلين عن العمليات والرقابة التحصيلية يعني أن نتائج الاستبيان لا تغطي جميع الأطراف المحتملة ذات العلاقة بتطبيق الإطار.",
      ],
      scaleQuestions: SURVEY_SCALE_QUESTIONS,
      currentPracticeRows: CURRENT_PRACTICE_ROWS,
      currentPracticeAnalysis: [
        "أظهرت النتائج أن 57.9% من المشاركين يعتمدون على إجراء موحد ونمطي في التعامل مع الحالات، بينما يعتمد 26.3% على المراجعة اليدوية لعدة شاشات وأنظمة، في حين أفاد 15.8% بالاستعانة بالتوصيات التلقائية المتاحة في النظام.",
        "وتشير هذه النتائج إلى وجود فرصة لتطوير آلية أكثر ارتباطاً بخصائص كل عميل، بحيث لا يعتمد تحديد الإجراء على نمط موحد لجميع الحالات، ولا يتطلب بالضرورة مراجعة يدوية متفرقة للمعلومات.",
        "ويأتي إطار CPF لمعالجة هذه الفجوة من خلال تجميع المعلومات وتحليلها وربط مخرجاتها بتصنيف البرسونا والتوصية التحصيلية المناسبة.",
      ],
      openThemesIntro: [
        "بلغ عدد الإجابات النصية المتاحة 18 إجابة من أصل 19.",
        "وقد تم تحليلها وتصنيفها إلى مجموعة من المحاور الموضوعية التي تعكس انطباعات المشاركين ومقترحاتهم التطويرية.",
      ],
      openThemes: OPEN_THEMES,
      openThemesConclusion:
        "تعكس الملاحظات تقبلاً إيجابياً لفكرة النموذج، وتحدد احتياجات تطويرية عملية تتمحور حول وضوح التصنيف، وقابلية تفسير التوصية، وسهولة قراءة المعلومات، وإضافة وظائف مساندة للمتابعة والتوثيق والتنفيذ.",
      usabilityOverviewTitle: "6. نتائج اختبار الاستخدام الموجّه (Moderated Usability Testing)",
      usabilityDataRows: [
        ["عدد المشاركين", "3 أخصائيي تحصيل"],
        ["عدد المهام لكل مشارك", "3 مهام"],
        ["إجمالي المحاولات", "9 محاولات"],
        ["طريقة التنفيذ", "جلسات حضورية في مقر العمل"],
        ["أداة الاختبار", "النموذج الأولي التفاعلي"],
        ["مقياس سهولة الاستخدام", "من 1 إلى 7"],
      ],
      moderatedTasks: MODERATED_TASKS,
      sessionsTitle: "7. نتائج المشاركين في اختبار الاستخدام الموجّه",
      usabilitySessions: USABILITY_SESSIONS,
      overallUsabilityTitle: "8. النتائج الإجمالية لاختبار الاستخدام الموجّه",
      usabilityTaskMatrix: USABILITY_TASK_MATRIX,
      usabilityEaseMatrix: USABILITY_EASE_MATRIX,
      easeDistributionNote: "بلغ مجموع درجات التقييم التسع 48 درجة من أصل 63 درجة ممكنة.",
      easeFormula1: "48 / 9 = 5.33",
      easeFormula2: "(8 / 9) × 100 = 88.89%",
      easeSummaryLine: "وبذلك بلغ متوسط سهولة الاستخدام 5.33 من 7، أما نسبة نجاح تنفيذ المهام فبلغت 88.89%.",
      integrativeTitle: "9. التحليل التكاملي بين نتائج الاستبيان واختبار الاستخدام",
      integrativeIntro: [
        "تمثل نتائج الاستبيان واختبار الاستخدام مصدرين مختلفين ومتكاملين لفهم أداء النموذج الأولي.",
        "فالاستبيان يقيس تصورات المستخدمين وتقييماتهم، بينما يكشف اختبار الاستخدام عن قدرة المستخدم على تنفيذ المهام فعلياً.",
        "وعند تحليل النتائج معاً، تظهر المحاور التالية:",
      ],
      integrativeRows: INTEGRATIVE_COMPARISON_ROWS,
      integrativeSubsections: [
        {
          title: "9.1 العلاقة بين تحليل العميل واتخاذ القرار",
          paragraphs: [
            "أظهرت نتائج الاستبيان أن المشاركين يقدرون فائدة الأبعاد المتعددة في تحليل العميل، كما أظهرت الملاحظات المفتوحة أهمية الجمع بين المعلومات المالية والسلوكية.",
            "وتدعم نتائج المهمة الأولى هذا الاتجاه؛ إذ تمكن المشاركون الثلاثة من استعراض الأبعاد السبعة، وبلغ متوسط سهولة تنفيذ المهمة 6.33 من 7.",
            "ويعني ذلك أن شاشة تحليل العميل تمثل نقطة قوة أولية في النموذج، من حيث قدرة المستخدمين على الوصول إلى المعلومات واستعراضها.",
          ],
        },
        {
          title: "9.2 العلاقة بين التصنيف ومبرراته",
          paragraphs: [
            "أظهرت نتائج الاستبيان اهتماماً واضحاً بمبررات تصنيف البرسونا، كما نجح المشاركون الثلاثة في الوصول إلى التصنيف ومراجعة المعلومات المرتبطة به.",
            "ومع ذلك، تفاوتت تقييمات سهولة المهمة الثانية، حيث حصلت المشاركة الثالثة على 4 من 7، وأشارت المشاركة الثانية إلى أهمية زيادة ترابط المعلومات المرتبطة بالتصنيف والتوصية.",
            "وهذا يعني أن الوصول إلى التصنيف لا يكفي وحده؛ بل يجب أن تكون المبررات واضحة ومباشرة وسهلة الفهم.",
          ],
        },
        {
          title: "9.3 العلاقة بين تصنيف البرسونا والتوصية التحصيلية",
          paragraphs: [
            "تمثل المهمة الثالثة أبرز نتيجة في اختبار الاستخدام.",
            "فبينما تمكن المشارك الأول والمشاركة الثانية من الوصول إلى التوصية التحصيلية بصورة مستقلة، لم تتمكن المشاركة الثالثة من ذلك.",
            "وقد أوضحت المشاركة الثالثة أنها كانت تتوقع أن تكون التوصية مرتبطة بشكل مباشر بمبررات تصنيف العميل، وأن يكون سبب الإجراء واضحاً أمامها.",
            "وهذا يكشف عن فجوة بين عرض مخرجات التحليل وبين توضيح المنطق الذي يربط التصنيف بالإجراء المقترح.",
            "وتتمثل الأولوية هنا في جعل التوصية التحصيلية امتداداً واضحاً لنتيجة تحليل العميل، وليست مجرد مخرج منفصل يظهر بعد التصنيف.",
          ],
        },
        {
          title: "9.4 المسار المنطقي المقترح لمخرجات النموذج",
          paragraphs: [
            "ينبغي أن يعكس النموذج مساراً مترابطاً وواضحاً للمستخدم:",
            "ويجب أن يكون الانتقال بين هذه المراحل واضحاً، مع إظهار أسباب التوصية والعوامل التي استندت إليها، حتى يستطيع أخصائي التحصيل فهمها وتقييم مدى ملاءمتها للحالة.",
          ],
          flowLine:
            "بيانات العميل ← تحليل الأبعاد السبعة ← تصنيف البرسونا ← مبررات التصنيف ← التوصية التحصيلية NBCA ← الإجراء المقترح.",
        },
      ],
      strengthsTitle: "10. أبرز نقاط القوة التي كشفت عنها نتائج التقييم",
      strengthsIntro: "في ضوء نتائج الاستبيان واختبار الاستخدام، يمكن تحديد أبرز نقاط القوة الأولية فيما يلي:",
      strengthsList: [
        { title: "قبول فكرة التحليل متعدد الأبعاد:", detail: "حققت فائدة الأبعاد السبعة متوسطاً بلغ 4.37 من 5." },
        { title: "أهمية تفسير مخرجات الإطار:", detail: "بلغت نسبة التقييمات المرتفعة للسؤال المتعلق بمبررات التصنيف والتوصية 89.5%." },
        { title: "سهولة استعراض الأبعاد:", detail: "نجح المشاركون الثلاثة في تنفيذ المهمة الأولى، بمتوسط سهولة 6.33 من 7." },
        { title: "القدرة على الوصول إلى تصنيف البرسونا:", detail: "نجح المشاركون الثلاثة في تنفيذ المهمة الثانية." },
        { title: "تقييم إيجابي لسهولة الوصول:", detail: "بلغ متوسط سهولة الوصول إلى القرار في الاستبيان 4.26 من 5." },
        { title: "تفضيل أولي للإطار:", detail: "بلغ متوسط تفضيل CPF مقارنة بالطريقة التقليدية 4.16 من 5." },
        { title: "نجاح معظم المهام العملية:", detail: "نجح المشاركون في تنفيذ 8 مهام من أصل 9." },
        { title: "ظهور مقترحات تطوير محددة:", detail: "قدم المشاركون مقترحات عملية تتعلق بالتصنيف والتوصيات والمتابعة والعرض البصري." },
      ],
      improvementsTitle: "11. فرص التحسين المستخلصة من التقييم",
      improvementsIntro: "أظهرت النتائج مجموعة من فرص التطوير التي يمكن ترتيبها وفق الأولوية:",
      improvements: IMPROVEMENT_OPPORTUNITIES,
      limitationsTitle: "12. القيود المنهجية وحدود تفسير النتائج",
      limitationsIntro: "لضمان دقة قراءة النتائج وعدم تجاوز ما تثبته البيانات، ينبغي مراعاة القيود التالية:",
      limitations: [
        [
          "أولاً: حجم العينة",
          "اقتصر الاستبيان على 19 مشاركاً، واختبار الاستخدام الموجّه على ثلاثة مشاركين. ولذلك تمثل النتائج تقييماً أولياً، ولا يصح تعميمها إحصائياً على جميع مستخدمي التحصيل دون دراسة أوسع.",
        ],
        [
          "ثانياً: تركيبة المشاركين",
          "شكّل أخصائيو وموظفو تحصيل مديونيات الأفراد 78.9% من المشاركين في الاستبيان، ولم يشارك ممثلون عن إدارة العمليات والرقابة التحصيلية.",
        ],
        [
          "ثالثاً: طبيعة الاستبيان",
          "جمع الاستبيان بين قياس فائدة الفكرة، وتقييم تجربة النموذج، ووصف الممارسة الحالية، وقياس التفضيل المقارن. ولذلك لا ينبغي وصفه بأنه اختبار قابلية استخدام خالص.",
        ],
        [
          "رابعاً: محدودية اختبار الاستخدام",
          "اقتصرت التجربة العملية على ثلاثة مشاركين وتسع محاولات لتنفيذ المهام، وهي عينة محدودة لا تكفي وحدها للحكم على أداء النموذج في جميع ظروف العمل.",
        ],
        [
          "خامساً: عدم قياس الأثر التشغيلي",
          "لم يقس هذا التقييم بصورة مباشرة مقدار الزيادة في المبالغ المحصلة، أو الانخفاض في زمن معالجة الحالات، أو التغير في معدلات الوفاء بوعود السداد.",
        ],
        [
          "سادساً: التمييز بين التفضيل والأثر",
          "ارتفاع تفضيل المشاركين للإطار لا يعني بالضرورة أن استخدامه سيحقق نتائج تحصيلية أفضل؛ إذ يتطلب إثبات ذلك تجربة تشغيلية ومقارنة موضوعية.",
        ],
      ],
      conclusionTitle: "13. الاستنتاج النهائي",
      conclusionParagraphs: [
        "أظهرت نتائج استبيان تقييم النموذج الأولي واختبار الاستخدام الموجّه وجود قبول أولي إيجابي لإطار عمل البرسونا (Collection Persona Framework™️ – CPF).",
        "فقد أظهرت نتائج الاستبيان تقديراً مرتفعاً لفائدة الأبعاد السبعة، واهتماماً واضحاً بإظهار مبررات تصنيف البرسونا والتوصية التحصيلية، إلى جانب تقييم إيجابي لسهولة الوصول إلى القرار وتفضيل الإطار مقارنة بالطريقة التقليدية.",
        "كما أظهر اختبار الاستخدام الموجّه نجاح المشاركين في تنفيذ 88.89% من المهام المحددة، بمتوسط سهولة استخدام بلغ 5.33 من 7.",
        "وعلى مستوى المهام، تمكن المشاركون الثلاثة من مراجعة الأبعاد السبعة وتحديد البرسونا ومبررات التصنيف، بينما ظهرت نقطة التعثر في المهمة الثالثة المتعلقة بالوصول إلى التوصية التحصيلية، حيث لم تتمكن إحدى المشاركات من الوصول إليها بصورة مستقلة.",
        "وتُعد ملاحظة المشاركة الثالثة من أبرز النتائج النوعية في الاختبار؛ لأنها حددت سبباً واضحاً للتعثر، يتمثل في توقع المستخدم أن تكون التوصية مرتبطة بصورة مباشرة بمبررات تصنيف العميل، وأن يكون سبب الإجراء واضحاً أمامه.",
        "وتؤكد هذه النتيجة أن نجاح إطار CPF لا يتوقف على تحليل البيانات وتصنيف العميل فحسب، بل يتطلب أيضاً تقديم مخرجات مترابطة وقابلة للتفسير، بحيث يستطيع أخصائي التحصيل فهم سبب التصنيف وسبب التوصية والإجراء المقترح.",
        "وبناءً على ذلك، يمكن اعتبار مرحلة التقييم الأولي قد قدمت مؤشرات إيجابية حول تقبل الفكرة وملاءمة النموذج، وحددت مجموعة واضحة من المتطلبات التي ينبغي تحسينها قبل الانتقال إلى مرحلة التطبيق التشغيلي.",
      ],
      mainConclusionLabel: "الاستنتاج الرئيس:",
      mainConclusionText:
        "يمتلك إطار CPF قبولاً أولياً واعداً من المستخدمين، وقد أظهر النموذج الأولي قدرة جيدة على دعم استعراض الأبعاد وتحديد البرسونا، فيما تتركز الأولوية التطويرية في تعزيز الترابط والوضوح بين مبررات تصنيف البرسونا والتوصية التحصيلية، بما يضمن سهولة الوصول إلى NBCA وفهم سبب اختيار الإجراء المقترح.",
      appendicesTitle: "الملاحق التفصيلية للتقرير (1 – 4)",
      appendix1: {
        title: "الملحق الأول: ملخص المؤشرات الكمية للاستبيان",
        rows: [
          ["عدد الاستجابات المكتملة", "19"],
          ["عدد الأسئلة", "7"],
          ["فائدة الأبعاد السبعة", "4.37 / 5"],
          ["أهمية مبررات التصنيف والتوصية", "4.16 / 5"],
          ["سهولة الوصول إلى القرار", "4.26 / 5"],
          ["تفضيل CPF مقارنة بالطريقة التقليدية", "4.16 / 5"],
          ["عدد الإجابات المفتوحة", "18"],
        ],
      },
      appendix2: {
        title: "الملحق الثاني: ملخص مؤشرات اختبار الاستخدام الموجّه",
        rows: [
          ["عدد المشاركين", "3 أخصائيي تحصيل"],
          ["عدد المهام لكل مشارك", "3"],
          ["إجمالي محاولات تنفيذ المهام", "9"],
          ["عدد المهام الناجحة", "8"],
          ["عدد المهام غير الناجحة", "1"],
          ["نسبة نجاح تنفيذ المهام", "88.89%"],
          ["متوسط سهولة الاستخدام", "5.33 / 7"],
        ],
      },
      appendix3: {
        title: "الملحق الثالث: النتائج التفصيلية للمشاركين في اختبار الاستخدام",
        rows: [
          ["منير نوار المطيري", "7/7", "6/7", "6/7", "100%", "6.33/7"],
          ["عروب عصفور", "6/7", "5/7", "5/7", "100%", "5.33/7"],
          ["ذكرى يحيى مطري", "6/7", "4/7", "3/7", "66.67%", "4.33/7"],
          ["الإجمالي / المتوسط", "6.33", "5.00", "4.67", "88.89%", "5.33/7"],
        ],
      },
      appendix4: {
        title: "الملحق الرابع: نصوص الملاحظات والمقترحات المفتوحة للاستبيان (18 ملاحظة)",
        responses: ALL_OPEN_RESPONSES,
      },
      endOfReportLabel: "نهاية التقرير",
    },

    sec9FinalDecision: {
      pageTitle: "القرار النهائي",
      approvedBadge: "القرار النهائي المعتمد",
      statusBadge: "الاحتفاظ بالفكرة مع التطوير الموجّه",
      decisionQuote:
        "نُبقي على الفكرة، ونُبرز مبررات التصنيف في أعلى الشاشة ونربط التوصية التحصيلية بها بشكل مباشر داخل النموذج الأولي لـ CPF، ثم نختبر مجدداً في التجربة التشغيلية.",
      pillars: [
        {
          badge: "1. الإبقاء على الفكرة",
          text: "تحققت جميع الأهداف المسبقة (88.89% نجاح المهام، 4.37 فائدة الأبعاد، 4.16 أهمية المبررات).",
        },
        {
          badge: "2. التحسين المباشر في CPF",
          text: "إبراز مبررات التصنيف في أعلى الشاشة وربط التوصية التحصيلية بها مباشرة داخل النموذج الأولي.",
        },
        {
          badge: "3. الخطوة التالية",
          text: "إعادة الاختبار مجدداً في التجربة التشغيلية للتحقق من أثر الترابط البصري وسرعة القرار.",
        },
      ],
    },
  };
}

/**
 * Automated pre-export data completeness check: verifies every single required section,
 * table, transcript, appendix, and open response exists with zero missing items.
 */
export function getRequiredContentAnchors(data: FinalReportData): string[] {
  return [
    data.sec1Hypothesis.hypothesisText.slice(0, 40),
    data.sec1Hypothesis.targetSegmentPrimary,
    data.sec2Kpis.headline.name,
    data.sec2Kpis.supporting[0].name,
    data.sec2Kpis.supporting[1].name,
    data.sec3MethodSample.methods[0].title,
    data.sec3MethodSample.methods[1].title,
    data.sec4Survey.tallyUrl,
    data.sec4Survey.questions[5].heading,
    data.sec4Survey.actionableDecisionsQuote.slice(0, 35),
    data.sec6Usability.overallRateValue,
    data.sec6Usability.sessions[0].name,
    data.sec6Usability.sessions[1].name,
    data.sec6Usability.sessions[2].name,
    data.sec7ResultVsTarget.cards[0].title,
    data.sec7ResultVsTarget.patternParagraphs[0].slice(0, 35),
    data.sec8Results.executiveSummaryTitle,
    data.sec8Results.conclusionTitle,
    data.sec8Results.appendix1.title,
    data.sec8Results.appendix4.responses[17],
    data.sec9FinalDecision.decisionQuote.slice(0, 40),
  ];
}

export function validateFinalReportSourceData(data: FinalReportData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (data.sections.length !== 8) errors.push("عدد الأقسام لا يساوي 8");
  if (!data.sec1Hypothesis.hypothesisText.trim()) errors.push("نص الفرضية مفقود");
  if (data.sec2Kpis.supporting.length !== 2) errors.push("المؤشرات الداعمة غير مكتملة");
  if (data.sec3MethodSample.methods.length !== 2) errors.push("مناهج التقييم غير مكتملة");
  if (data.sec4Survey.questions.length !== 7) errors.push("أسئلة الاستبيان السبعة غير مكتملة");
  if (data.sec6Usability.sessions.length !== 3) errors.push("جلسات اختبار الاستخدام الثلاث غير مكتملة");
  if (data.sec7ResultVsTarget.cards.length !== 3) errors.push("بطاقات النتيجة مقابل الهدف غير مكتملة");
  if (data.sec8Results.appendix4.responses.length !== 18) errors.push("الملاحظات المفتوحة الـ 18 غير مكتملة");
  if (data.sec8Results.improvements.length !== 9) errors.push("فرص التحسين الـ 9 غير مكتملة");
  if (data.sec8Results.limitations.length !== 6) errors.push("القيود المنهجية الـ 6 غير مكتملة");
  if (!data.sec9FinalDecision.decisionQuote.trim()) errors.push("نص القرار النهائي مفقود");

  return { valid: errors.length === 0, errors };
}
