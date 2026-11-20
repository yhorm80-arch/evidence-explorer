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
import { IconBubble } from "./IconBubble";

const ICONS: Record<ModuleInfo["icon"], LucideIcon> = {
  book: BookOpen,
  percent: Percent,
  clipboard: ClipboardList,
  arrows: ArrowLeftRight,
  scale: Scale,
  calculator: Calculator,
};

export function ScopeCards({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {MODULES.map((m) => {
        const active = m.id === selected;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-start rounded-lg border bg-card px-6 pb-5 pt-6 text-left transition-shadow",
              active ? "border-transparent shadow-card-selected" : "border-border shadow-card hover:shadow-card-selected",
            )}
          >
            <IconBubble icon={ICONS[m.icon]} />
            <span className="mt-7 text-[20px] font-medium leading-tight text-ink">{m.name}</span>
            <span className="mt-8 font-mono text-[16px] font-bold tracking-wide text-ink-soft">{m.code}</span>
          </button>
        );
      })}
    </div>
  );
}
