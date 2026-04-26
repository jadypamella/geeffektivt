import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDonation, computeImpact } from "@/lib/donation";
import { CountUp } from "@/components/CountUp";
import { Award, CheckCircle2, Heart, Share2 } from "lucide-react";

const search = z.object({
  amount: z.number().optional().default(50),
  freq: z.enum(["monthly", "once"]).optional().default("monthly"),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Thank you — You just helped save lives | GiveWise" },
      { name: "description", content: "Your donation is locked in. Here's the impact you just made." },
      { property: "og:title", content: "I just helped protect lives 🌍" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { amount, freq } = Route.useSearch();
  const { totalGivenLifetime, openDrawer } = useDonation();
  const impact = computeImpact(amount);
  const level = totalGivenLifetime >= 500 ? "Champion" : totalGivenLifetime >= 100 ? "Life-Saver" : "Protector";

  const handleShare = async () => {
    const text = `I just helped protect ${impact.peopleProtected} people through @GiveWise 🌍 Join me:`;
    const url = typeof window !== "undefined" ? window.location.origin : "";
    if (navigator.share) {
      try { await navigator.share({ title: "GiveWise", text, url }); } catch {}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${url}`);
    }
  };

  return (
    <div className="bg-warm">
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-cta-grad text-primary-foreground shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-5xl font-semibold sm:text-6xl text-balance">
          You just protected {impact.peopleProtected} {impact.peopleProtected === 1 ? "person" : "people"}.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
          Your €{amount}{freq === "monthly" ? "/month" : ""} gift is locked in. We'll email you a receipt — and updates from the field.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-12">
        <Card className="overflow-hidden rounded-3xl border-border bg-background p-0 shadow-elegant">
          <div className="bg-cta-grad p-8 text-primary-foreground sm:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider opacity-80">Your impact card</span>
              <Award className="h-5 w-5" />
            </div>
            <div className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              <CountUp to={impact.peopleProtected} /> people · <CountUp to={impact.nets} /> nets
            </div>
            <div className="mt-1 text-sm opacity-85">€{amount} {freq === "monthly" ? "monthly" : "one-time"} · GiveWise</div>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <Mini label="Treatments funded" v={impact.treatments} />
            <Mini label="Lifetime given" v={`€${totalGivenLifetime}`} />
            <Mini label="Level reached" v={level} />
          </div>
        </Card>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handleShare}
            size="lg"
            className="rounded-full bg-cta-grad text-primary-foreground shadow-glow"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share your impact
          </Button>
          <Button
            onClick={() => openDrawer()}
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            <Heart className="mr-2 h-4 w-4" /> Give again
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="font-display text-2xl font-semibold">What happens next</h2>
        <ol className="mx-auto mt-5 max-w-md space-y-3 text-left text-sm text-muted-foreground">
          {[
            "Receipt and tax-deduction details emailed within minutes.",
            "Your contribution is allocated within 30 days.",
            "Quarterly updates from the field — real photos, real numbers.",
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <Link to="/" className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
      </section>
    </div>
  );
}

function Mini({ label, v }: { label: string; v: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-warm p-4 text-center">
      <div className="font-display text-2xl font-semibold">{v}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
