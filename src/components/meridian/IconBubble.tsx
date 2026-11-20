import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconTone = "violet" | "blue" | "cyan" | "mint" | "amber" | "red";

const TONES: Record<IconTone, string> = {
  violet: "bg-icon-bubble text-icon-ink",
  blue: "bg-icon-blue text-icon-blue-ink",
  cyan: "bg-icon-cyan text-icon-cyan-ink",
  mint: "bg-icon-mint text-icon-mint-ink",
  amber: "bg-icon-amber text-icon-amber-ink",
  red: "bg-icon-red text-icon-red-ink",
};

/** Rounded tinted square holding a thin outline icon — the Meridian icon style. */
export function IconBubble({
  icon: Icon,
  size = "md",
  tone = "violet",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  tone?: IconTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg",
        TONES[tone],
        size === "md" ? "h-9 w-9" : "h-7 w-7",
        className,
      )}
    >
      <Icon className={size === "md" ? "h-[18px] w-[18px]" : "h-4 w-4"} strokeWidth={1.7} />
    </span>
  );
}
