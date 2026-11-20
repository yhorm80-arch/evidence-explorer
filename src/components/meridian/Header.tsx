import { ChevronRight, Home, Network, Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1880px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="flex items-center gap-4 pt-2">
          <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-brand text-2xl font-semibold text-brand-foreground">
            M
          </span>
          <span className="text-[28px] font-semibold tracking-tight text-ink">Meridian CI</span>
        </div>
        <nav className="flex items-center gap-2 text-[19px]">
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-muted-foreground/70">
            <Home className="h-6 w-6 opacity-40" strokeWidth={1.5} />
            Home
          </a>
          <a
            href="#"
            aria-current="page"
            className="flex items-center gap-2 rounded-lg bg-nav-active px-6 py-3 font-medium text-icon-ink"
          >
            <Search className="h-6 w-6" strokeWidth={1.8} />
            Find &amp; Explore
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2 text-ink-soft">
            <Network className="h-6 w-6" strokeWidth={1.5} />
            Connect the Dots
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-3 text-[19px]">
      <span className="text-ink-soft">Meridian</span>
      <ChevronRight className="h-4 w-4 text-ink-soft" strokeWidth={1.6} />
      <span className="font-medium text-ink">Knowledge Explorer</span>
    </div>
  );
}
