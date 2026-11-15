import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function generatePdfFromElement(
  element: HTMLElement,
  filename = "cpf-survey-results-report.pdf",
): Promise<void> {
  // Use native browser rendering via SVG foreignObject, which flawlessly supports
  // oklch colors, Arabic fonts, gradients, and RTL layouts without manual color parsing.
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    skipFonts: true,
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgWidth = pageWidth;
  const imgHeight = (img.height * imgWidth) / img.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(
    dataUrl,
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight,
    undefined,
    "FAST",
  );
  heightLeft -= pageHeight;

  // Add subsequent pages if the report spans multiple pages
  while (heightLeft > 2) {
    position = position - pageHeight;
    pdf.addPage();
    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST",
    );
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
