import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/lib/donation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/impact" as const, label: "Impact" },
  { to: "/charities" as const, label: "Charities" },
  { to: "/stories" as const, label: "Stories" },
  { to: "/about" as const, label: "About" },
  { to: "/faq" as const, label: "FAQ" },
];

export function Header() {
  const { openDrawer } = useDonation();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors ${
        isHome ? "bg-background/70" : "bg-background/90"
      } border-b border-border/60`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GiveWise" className="h-8 w-auto" width={120} height={32} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => openDrawer()}
            className="hidden rounded-full bg-cta-grad px-5 text-primary-foreground shadow-glow hover:opacity-95 sm:inline-flex"
          >
            Save a life
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-accent text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                openDrawer();
              }}
              className="mt-2 rounded-full bg-cta-grad text-primary-foreground"
            >
              Save a life
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
