import { createFileRoute } from "@tanstack/react-router";
import { useDonation, computeImpact } from "@/lib/donation";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { useInView } from "@/hooks/use-in-view";
import { Heart, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-mother-child.jpg";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact: Where every euro goes | GiveWise" },
      {
        name: "description",
        content:
          "See exactly how your donation translates into mosquito nets, treatments, and lives protected. Calculator, breakdowns, and cost-effectiveness data.",
      },
      { property: "og:title", content: "GiveWise Impact" },
      {
        property: "og:description",
        content: "Drag the slider. Watch lives change. Full transparency on cost-effectiveness.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  const { amount, setAmount, openDrawer } = useDonation();
  const i = computeImpact(amount);
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">Your impact</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl text-balance">
          Money in. Lives out. No mystery.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          We don't ask for trust. We earn it. Every figure below is grounded in independent
          evaluations of the world's most cost-effective charities.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Card className="rounded-3xl border-border bg-warm p-8 shadow-soft sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr,auto]">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl font-semibold text-primary">€{amount}</span>
                <span className="text-muted-foreground">monthly</span>
              </div>
              <Slider
                value={[amount]}
                min={5}
                max={1000}
                step={5}
                onValueChange={(v) => setAmount(v[0])}
                className="mt-6"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>€5</span><span>€500</span><span>€1,000</span>
              </div>
            </div>
            <Button
              onClick={() => openDrawer()}
              size="lg"
              className="rounded-full bg-cta-grad px-8 text-primary-foreground shadow-glow"
            >
              <Heart className="mr-2 h-4 w-4" /> Give €{amount}
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Tile big={i.peopleProtected} unit="people protected" sub="from malaria" />
            <Tile big={i.nets} unit="mosquito nets" sub="long-lasting, treated" />
            <Tile big={i.treatments} unit="treatments funded" sub="for children under 5" />
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Statistical lives saved</div>
            <div className="mt-1 font-display text-3xl font-semibold">
              {i.livesFraction} <span className="text-base font-normal text-muted-foreground">per month · {(i.livesFraction * 12).toFixed(2)} per year</span>
            </div>
          </div>
        </Card>
      </section>

      <section ref={ref} className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Cost-effectiveness, compared</h2>
        <p className="mt-2 text-muted-foreground">Lower bars = more lives per euro. Sources: independent evaluators.</p>
        <div className="mt-8 space-y-5">
          <CostBar label="Mosquito nets" value={92} cost="€2,500 / life saved" inView={inView} />
          <CostBar label="Vitamin A supplementation" value={78} cost="€3,400 / life saved" inView={inView} />
          <CostBar label="Deworming treatments" value={64} cost="€4,800 / life-equivalent" inView={inView} />
          <CostBar label="Cash transfers" value={42} cost="€1,000 = 1 family-month income" inView={inView} />
          <CostBar label="Average charity (no evaluation)" value={12} cost="€100,000+ / life" inView={inView} dim />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <FactCard icon={<TrendingUp className="h-5 w-5" />} stat={<CountUp to={284903} />} label="Lives protected" />
          <FactCard icon={<Sparkles className="h-5 w-5" />} stat={<CountUp to={1421604} />} label="Nets shipped" />
          <FactCard icon={<ShieldCheck className="h-5 w-5" />} stat={<><CountUp to={100} suffix="%" /></>} label="To programs (after grant)" />
        </div>
      </section>
    </div>
  );
}

function Tile({ big, unit, sub }: { big: number; unit: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="font-display text-4xl font-semibold text-foreground">{big.toLocaleString()}</div>
      <div className="mt-1 text-sm font-medium">{unit}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function CostBar({ label, value, cost, inView, dim }: { label: string; value: number; cost: string; inView: boolean; dim?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className={`text-sm font-medium ${dim ? "text-muted-foreground" : ""}`}>{label}</span>
        <span className="text-xs text-muted-foreground">{cost}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-[1400ms] ease-out ${dim ? "bg-muted-foreground" : "bg-cta-grad"}`}
          style={{ width: inView ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function FactCard({ icon, stat, label }: { icon: React.ReactNode; stat: React.ReactNode; label: string }) {
  return (
    <Card className="rounded-2xl border-border bg-warm p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div className="mt-4 font-display text-3xl font-semibold">{stat}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </Card>
  );
}
