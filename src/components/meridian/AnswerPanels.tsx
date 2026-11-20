import { FileSearch, Sparkles, X } from "lucide-react";
import type { Answer } from "@/lib/meridian-data";
import { cn } from "@/lib/utils";
import { IconBubble } from "./IconBubble";

const panelBase = "rounded-xl border border-panel-border bg-panel shadow-panel animate-panel-in";

export function SummaryPanel({
  answer,
  detailOpen,
  evidenceOpen,
  onToggleDetail,
  onToggleEvidence,
}: {
  answer: Answer;
  detailOpen: boolean;
  evidenceOpen: boolean;
  onToggleDetail: () => void;
  onToggleEvidence: () => void;
}) {
  return (
    <section className={cn(panelBase, "border-l-4 border-l-summary-rule p-6 md:p-7")}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <IconBubble icon={Sparkles} size="sm" />
        <h3 className="mr-auto text-[17px] font-bold uppercase tracking-[0.1em] text-ink">
          Integrated Summary
        </h3>
        <div className="flex flex-wrap gap-2">
          {answer.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-badge px-3 py-1.5 text-[13px] font-semibold tracking-wide text-badge-foreground"
            >
              {t}
            </span>
          ))}
          <span className="rounded-md border border-panel-border bg-badge-quiet px-3 py-1.5 text-[13px] font-semibold tracking-wide text-badge-quiet-foreground">
            {answer.confidence}
          </span>
        </div>
      </div>
      <p className="mt-4 text-[19px] leading-[1.6] text-ink">{answer.summary}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleDetail}
          aria-expanded={detailOpen}
          className="rounded-lg border-2 border-ink px-6 py-2.5 text-[16px] font-semibold text-ink transition-colors hover:bg-accent"
        >
          {detailOpen ? "Hide detailed answer" : "Show detailed answer"}
        </button>
        <button
          type="button"
          onClick={onToggleEvidence}
          aria-expanded={evidenceOpen}
          className="inline-flex items-center gap-2 rounded-lg bg-evidence px-6 py-3 text-[16px] font-semibold text-evidence-foreground transition-colors hover:bg-evidence-hover"
        >
          <FileSearch className="h-[18px] w-[18px]" strokeWidth={1.8} />
          {evidenceOpen ? "Hide Evidence" : "Show Evidence"}
        </button>
      </div>
    </section>
  );
}

export function DetailPanel({ answer }: { answer: Answer }) {
  return (
    <section className={cn(panelBase, "border-l-4 border-l-detail-rule p-6 md:p-8")}>
      <h3 className="text-[15px] font-bold uppercase tracking-[0.1em] text-detail-label">Detailed Answer</h3>
      <ul className="mt-4 space-y-1 text-[18px] leading-[1.65] text-ink">
        {answer.detailed.map((line) => (
          <li key={line}>- {line}</li>
        ))}
      </ul>
    </section>
  );
}

export function EvidencePanel({ answer, onClose }: { answer: Answer; onClose: () => void }) {
  return (
    <section className={cn(panelBase, "flex max-h-[520px] flex-col p-6 md:p-8")}>
      <div className="flex items-center gap-4">
        <IconBubble icon={FileSearch} size="sm" />
        <h3 className="mr-auto text-[15px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Evidence
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close evidence"
          className="rounded-md p-1.5 text-ink-soft transition-colors hover:bg-accent"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>
      <div className="thin-scroll mt-4 min-h-0 flex-1 overflow-y-auto pr-4">
        <p className="text-[19px] leading-[1.6] text-ink">{answer.evidence}</p>
      </div>
    </section>
  );
}
