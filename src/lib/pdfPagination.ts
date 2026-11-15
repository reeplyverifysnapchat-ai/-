export interface MeasuredBlock {
  id: string;
  sectionIndex: number; // 1..9
  sectionTitle: string;
  height: number;
  keepWithNext?: boolean;
  startsNewSection?: boolean;
}

export interface PaginatedPage {
  pageNumber: number; // 1-based within content pages (cover page is page 1 overall, content starts at page 2)
  sectionIndex: number;
  sectionTitle: string;
  blockIds: string[];
  usedHeight: number;
}

export interface PaginationResult {
  pages: PaginatedPage[];
  sectionStartPage: Record<number, number>; // sectionIndex (1..9) -> overall PDF page number (cover = 1)
  totalPdfPages: number;
}

/**
 * Pure block-aware A4 pagination algorithm:
 * - Each of the 9 sections ALWAYS begins on a fresh A4 page.
 * - A heading block with keepWithNext=true is never stranded alone at the bottom of a page;
 *   if heading + its following sibling do not fit in remaining space, both move to the next page.
 * - Individual blocks are never split across pages.
 * - Zero empty pages are produced.
 */
export function paginateMeasuredBlocks(
  blocks: MeasuredBlock[],
  maxContentHeight: number,
  blockGap = 12,
  coverPageCount = 1,
): PaginationResult {
  const pages: PaginatedPage[] = [];
  const sectionStartPage: Record<number, number> = {};

  let currentPage: PaginatedPage | null = null;

  const commitPage = (page: PaginatedPage | null) => {
    if (page && page.blockIds.length > 0) {
      pages.push(page);
    }
  };

  const createNewPage = (
    prevPage: PaginatedPage | null,
    sectionIndex: number,
    sectionTitle: string,
  ): PaginatedPage => {
    commitPage(prevPage);
    const nextContentPageNum = pages.length + 1;
    const next: PaginatedPage = {
      pageNumber: nextContentPageNum,
      sectionIndex,
      sectionTitle,
      blockIds: [],
      usedHeight: 0,
    };
    if (sectionStartPage[sectionIndex] === undefined) {
      sectionStartPage[sectionIndex] = coverPageCount + nextContentPageNum;
    }
    return next;
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const nextBlock = i + 1 < blocks.length ? blocks[i + 1] : null;

    // Rule: Every major section begins on an independent A4 page
    let active: PaginatedPage =
      currentPage === null ||
      block.startsNewSection ||
      currentPage.sectionIndex !== block.sectionIndex
        ? createNewPage(currentPage, block.sectionIndex, block.sectionTitle)
        : currentPage;

    const addedGap = active.blockIds.length > 0 ? blockGap : 0;
    const neededForThis = addedGap + block.height;

    // Rule: Never leave a heading (keepWithNext) at the bottom of a page without its following block
    let neededWithFollower = neededForThis;
    if (
      block.keepWithNext &&
      nextBlock &&
      nextBlock.sectionIndex === block.sectionIndex &&
      !nextBlock.startsNewSection
    ) {
      neededWithFollower = neededForThis + blockGap + nextBlock.height;
    }

    const fitsThis = active.usedHeight + neededForThis <= maxContentHeight;
    const fitsWithFollower =
      active.usedHeight + neededWithFollower <= maxContentHeight;

    const shouldBreak =
      active.blockIds.length > 0 &&
      (!fitsThis || (block.keepWithNext && !fitsWithFollower));

    if (shouldBreak) {
      active = createNewPage(active, block.sectionIndex, block.sectionTitle);
      active.blockIds.push(block.id);
      active.usedHeight = block.height;
    } else {
      active.blockIds.push(block.id);
      active.usedHeight += neededForThis;
    }

    currentPage = active;
  }

  commitPage(currentPage);

  return {
    pages,
    sectionStartPage,
    totalPdfPages: coverPageCount + pages.length,
  };
}

export interface VerificationCheckItem {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

export interface PdfIntegrityReport {
  passed: boolean;
  totalPdfPages: number;
  verifiedSectionsCount: number;
  checks: VerificationCheckItem[];
}

export function buildIntegrityReport(params: {
  sectionCount: number;
  expectedSectionTitles: string[];
  renderedSectionTitles: string[];
  totalPdfPages: number;
  emptyPageCount: number;
  horizontalOverflowPages: number[];
  verticalOverflowPages: number[];
  missingAnchors: string[];
}): PdfIntegrityReport {
  const {
    sectionCount,
    expectedSectionTitles,
    renderedSectionTitles,
    totalPdfPages,
    emptyPageCount,
    horizontalOverflowPages,
    verticalOverflowPages,
    missingAnchors,
  } = params;

  const orderMatches =
    renderedSectionTitles.length === expectedSectionTitles.length &&
    expectedSectionTitles.every((t, idx) => renderedSectionTitles[idx] === t);

  const checks: VerificationCheckItem[] = [
    {
      id: "sections-count",
      label: "اكتمال الأقسام الثمانية بالترتيب المحدد",
      passed: sectionCount === 8 && orderMatches,
      detail:
        sectionCount === 8 && orderMatches
          ? "تم التحقق من وجود الأقسام (1 إلى 8) بالترتيب الصحيح."
          : `تم رصد ${renderedSectionTitles.length} من 8 أقسام.`,
    },
    {
      id: "content-anchors",
      label: "مطابقة النصوص والجداول والنتائج دون حذف",
      passed: missingAnchors.length === 0,
      detail:
        missingAnchors.length === 0
          ? "جميع النصوص والجداول والمؤشرات والملاحق الـ 4 وردود المشاركين الـ 18 والـ 15 موجودة بالكامل."
          : `عناصر مفقودة: ${missingAnchors.slice(0, 3).join("، ")}`,
    },
    {
      id: "no-empty-pages",
      label: "خلو التقرير من الصفحات الفارغة",
      passed: emptyPageCount === 0 && totalPdfPages >= 9,
      detail:
        emptyPageCount === 0
          ? `إجمالي صفحات التقرير: ${totalPdfPages} صفحة A4 أفقية مكتملة المحتوى.`
          : `توجد ${emptyPageCount} صفحات فارغة.`,
    },
    {
      id: "no-overflow",
      label: "سلامة حدود صفحات A4 وعدم تداخل أو قصّ النصوص",
      passed:
        horizontalOverflowPages.length === 0 &&
        verticalOverflowPages.length === 0,
      detail:
        horizontalOverflowPages.length === 0 &&
        verticalOverflowPages.length === 0
          ? "جميع الجداول والفقرات ضمن الهوامش المحددة دون خروج عن حدود الصفحة."
          : `تجاوز أفقي في صفحات: [${horizontalOverflowPages.join(",")}] · تجاوز عمودي في: [${verticalOverflowPages.join(",")}]`,
    },
  ];

  return {
    passed: checks.every((c) => c.passed),
    totalPdfPages,
    verifiedSectionsCount: renderedSectionTitles.length,
    checks,
  };
}
