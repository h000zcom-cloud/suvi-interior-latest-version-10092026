import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

// A bundled, same-origin file: no enquiry API, pop-up or browser PDF viewer.
export const PDF_URL = "/brochures/Suvi-Interior-Brochure.pdf";

export const DownloadButton = ({ className = "btn-brand", testId = "brochure-download-btn" }) => (
  <a
    href={PDF_URL}
    download="Suvi-Interior-Brochure.pdf"
    data-testid={testId}
    className={cn(className, "whitespace-nowrap")}
  >
    <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    Download PDF
  </a>
);