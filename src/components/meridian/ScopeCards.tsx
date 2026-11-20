import {
  ArrowLeftRight,
  BookOpen,
  Calculator,
  ClipboardList,
  Percent,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { MODULES, type ModuleInfo } from "@/lib/meridian-data";
import { cn } from "@/lib/utils";
import { IconBubble, type IconTone } from "./IconBubble";

const ICONS: Record<ModuleInfo["icon"], LucideIcon> = {
  book: BookOpen,
  percent: Percent,
  clipboard: ClipboardList,
  arrows: ArrowLeftRight,
  scale: Scale,
  calculator: Calculator,
};

const TONES: IconTone[] = ["violet", "mint", "blue", "cyan", "amber", "violet"];

export function ScopeCards({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {MODULES.map((m, i) => {
        const active = m.id === selected;
        const tone = TONES[i % TONES.length] ?? "violet";
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-start rounded-xl border bg-card p-4 text-left transition-shadow",
              active
                ? "border-ring shadow-card-selected"
                : "border-border shadow-card hover:shadow-card-selected",
            )}
          >
            <IconBubble icon={ICONS[m.icon]} tone={tone} />
            <span className="mt-3 text-[13px] font-semibold leading-snug text-ink">{m.name}</span>
            <span className="mt-2 font-mono text-[11px] font-bold tracking-wide text-ink-soft">
              {m.code}
            </span>
          </button>
        );
      })}
    </div>
  );
}
