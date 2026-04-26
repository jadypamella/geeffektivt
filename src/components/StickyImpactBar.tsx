import { useEffect, useState } from "react";
import { useDonation, impactPhrase } from "@/lib/donation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function StickyImpactBar() {
  const { amount, setAmount, openDrawer, drawerOpen } = useDonation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (drawerOpen) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-5xl px-3 pb-3 sm:pb-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-elegant backdrop-blur-md sm:p-4">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta-grad text-primary-foreground sm:flex">
            <ChevronUp className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold">€{amount}</span>
              <span className="truncate text-xs text-muted-foreground sm:text-sm">
                = {impactPhrase(amount)}
              </span>
            </div>
            <Slider
              value={[amount]}
              min={5}
              max={250}
              step={5}
              onValueChange={(v) => setAmount(v[0])}
              className="mt-2"
            />
          </div>
          <Button
            onClick={() => openDrawer()}
            className="shrink-0 rounded-full bg-cta-grad px-4 text-primary-foreground shadow-glow sm:px-6"
          >
            Protect now
          </Button>
        </div>
      </div>
    </div>
  );
}
