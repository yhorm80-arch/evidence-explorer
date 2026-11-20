import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { DetailPanel, EvidencePanel, SummaryPanel } from "@/components/meridian/AnswerPanels";
import { Breadcrumb, Header } from "@/components/meridian/Header";
import { ScopeCards } from "@/components/meridian/ScopeCards";
import { MODULES, SUGGESTIONS, findAnswer, type Answer } from "@/lib/meridian-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Knowledge Explorer — Meridian CI" },
      {
        name: "description",
        content: "Ask questions across six COBOL modules of the Meridian Retail Banking core on IBM Mainframe z/OS and DB2.",
      },
      { property: "og:title", content: "Knowledge Explorer — Meridian CI" },
      {
        property: "og:description",
        content: "Ask questions across six COBOL modules of the Meridian Retail Banking core.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

function Index() {
  const [selected, setSelected] = useState("int");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function ask(q: string) {
    const code = MODULES.find((m) => m.id === selected)?.code ?? "INTPOST2";
    const text = q.trim() || `What does ${code} do?`;
    setDetailOpen(false);
    setEvidenceOpen(false);
    setAnswer(null);
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setAnswer(findAnswer(text));
      setLoading(false);
    }, 650);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  const panelCount = 1 + (detailOpen ? 1 : 0) + (evidenceOpen ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1880px] px-6 pb-12 md:px-10">
        <div className="pt-4">
          <Breadcrumb />
        </div>

        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.08em] text-icon-ink">
          Meridian Retail Banking <span className="mx-2">·</span> Legacy COBOL Platform
        </p>

        <p className="mt-3 max-w-[900px] text-[14px] leading-[1.4] text-ink-soft">
          Six Modules from IBM Mainframe Z/OS and DB2 from the{" "}
          <strong className="font-semibold text-ink">Retail Banking Core</strong> are connected into
          one knowledge plane for further exploration
        </p>

        <h2 className="mt-7 text-[16px] font-bold text-ink">What's in scope</h2>
        <div className="mt-3">
          <ScopeCards selected={selected} onSelect={setSelected} />
        </div>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-[16px] font-bold text-ink">Ask a question</h2>
          <p className="text-[12px] text-ink-soft">
            Answers cover these six programs as analysed — not live production data.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-3 flex items-center gap-3 rounded-lg border border-input bg-card py-1.5 pl-4 pr-1.5 shadow-card"
        >
          <Search className="h-[18px] w-[18px] shrink-0 text-ink-soft" strokeWidth={1.6} />
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Which programs post settlement entries to the ledger?"
            aria-label="Ask a question"
            className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-ink outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-ask px-5 py-2.5 text-[13px] font-semibold text-ask-foreground transition-colors hover:bg-ask-hover disabled:opacity-80"
          >
            Ask <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-ink-soft">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuestion(s);
                ask(s);
              }}
              className="rounded-full border border-border bg-secondary px-4 py-1.5 text-[12px] text-ink transition-colors hover:bg-accent"
            >
              {s}
            </button>
          ))}
        </div>

        <hr className="mt-10 border-t border-border" />

        {!answer && !loading && (
          <p className="mt-8 text-center text-[14px] text-ink-soft">
            - Responses and Other panels that are shown in response to the question are appearing below this -
          </p>
        )}

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-[14px] text-ink-soft animate-rise-in">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ask" />
            Analysing the six programs…
          </div>
        )}

        {answer && (
          <div className={cn("mt-6 grid grid-cols-1 items-start gap-4", GRID_COLS[panelCount])}>
            <SummaryPanel
              answer={answer}
              detailOpen={detailOpen}
              evidenceOpen={evidenceOpen}
              onToggleDetail={() => setDetailOpen((v) => !v)}
              onToggleEvidence={() => setEvidenceOpen((v) => !v)}
            />
            {detailOpen && <DetailPanel answer={answer} />}
            {evidenceOpen && <EvidencePanel answer={answer} onClose={() => setEvidenceOpen(false)} />}
          </div>
        )}
      </main>
    </div>
  );
}
