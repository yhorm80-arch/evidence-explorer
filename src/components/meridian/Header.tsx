import { ChevronRight, Home, Network, Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1880px] flex-wrap items-center justify-between gap-3 px-6 py-3 md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand text-[15px] font-bold text-brand-foreground">
            M
          </span>
          <span className="text-[16px] font-bold tracking-tight text-ink">Meridian CI</span>
        </div>
        <nav className="flex items-center gap-1 text-[13px]">
          <a href="#" className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent">
            <Home className="h-4 w-4" strokeWidth={1.6} />
            Home
          </a>
          <a
            href="#"
            aria-current="page"
            className="flex items-center gap-1.5 rounded-md bg-nav-active px-3 py-1.5 font-semibold text-nav-ink"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} />
            Find &amp; Explore
          </a>
          <a href="#" className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-ink-soft transition-colors hover:bg-accent">
            <Network className="h-4 w-4" strokeWidth={1.6} />
            Connect the Dots
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-1.5 text-[12px]">
      <span className="text-muted-foreground">Meridian</span>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.6} />
      <span className="font-medium text-ink">Knowledge Explorer</span>
    </div>
  );
}
