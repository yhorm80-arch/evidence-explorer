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
    <section className={cn(panelBase, "border-l-[3px] border-l-summary-rule p-4 md:p-5")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <IconBubble icon={Sparkles} size="sm" tone="violet" />
        <h3 className="mr-auto text-[11px] font-bold uppercase tracking-[0.06em] text-ink">
          Integrated Summary
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {answer.tags.map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
                i === 0 ? "bg-badge text-badge-foreground" : "bg-badge-blue text-badge-blue-foreground",
              )}
            >
              {t}
            </span>
          ))}
          <span className="rounded-full bg-badge-quiet px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-badge-quiet-foreground">
            {answer.confidence}
          </span>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-[1.45] text-ink">{answer.summary}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onToggleDetail}
          aria-expanded={detailOpen}
          className="rounded-lg border-[1.5px] border-ink px-4 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-accent"
        >
          {detailOpen ? "Hide detailed answer" : "Show detailed answer"}
        </button>
        <button
          type="button"
          onClick={onToggleEvidence}
          aria-expanded={evidenceOpen}
          className="inline-flex items-center gap-2 rounded-lg bg-evidence px-4 py-2 text-[13px] font-semibold text-evidence-foreground transition-colors hover:bg-evidence-hover"
        >
          <FileSearch className="h-4 w-4" strokeWidth={1.8} />
          {evidenceOpen ? "Hide Evidence" : "Show Evidence"}
        </button>
      </div>
    </section>
  );
}

export function DetailPanel({ answer }: { answer: Answer }) {
  return (
    <section className={cn(panelBase, "border-l-[3px] border-l-detail-rule p-4 md:p-5")}>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.06em] text-detail-label">
        Detailed Answer
      </h3>
      <ul className="mt-3 space-y-0.5 text-[14px] leading-[1.4] text-ink">
        {answer.detailed.map((line) => (
          <li key={line}>- {line}</li>
        ))}
      </ul>
    </section>
  );
}

export function EvidencePanel({ answer, onClose }: { answer: Answer; onClose: () => void }) {
  return (
    <section className={cn(panelBase, "flex max-h-[460px] flex-col p-4 md:p-5")}>
      <div className="flex items-center gap-3">
        <IconBubble icon={FileSearch} size="sm" tone="amber" />
        <h3 className="mr-auto text-[11px] font-bold uppercase tracking-[0.06em] text-detail-label">
          Evidence
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close evidence"
          className="rounded-md p-1 text-ink-soft transition-colors hover:bg-accent"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
      <div className="thin-scroll mt-3 min-h-0 flex-1 overflow-y-auto pr-3">
        <p className="text-[13px] leading-[1.45] text-ink-soft">{answer.evidence}</p>
      </div>
    </section>
  );
}
