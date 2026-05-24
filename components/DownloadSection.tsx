import { Download, FileText } from "lucide-react";

interface DownloadSectionProps {
  pdfUrl?: string;
  title?: string;
}

export function DownloadSection({ pdfUrl, title = "Download PDF" }: DownloadSectionProps) {
  if (!pdfUrl) return null;

  return (
    <div className="my-8 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">
            Get the PDF version of this article
          </p>
        </div>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </div>
  );
}
