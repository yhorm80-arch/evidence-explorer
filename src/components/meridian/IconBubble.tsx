import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Round muted bubble with a thin outline icon — the Meridian icon style. */
export function IconBubble({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-icon-bubble text-icon-ink",
        size === "md" ? "h-[52px] w-[52px]" : "h-10 w-10",
        className,
      )}
    >
      <Icon className={size === "md" ? "h-6 w-6" : "h-5 w-5"} strokeWidth={1.6} />
    </span>
  );
}
