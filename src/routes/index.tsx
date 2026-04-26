import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useDonation, computeImpact } from "@/lib/donation";
import { CountUp } from "@/components/CountUp";
import { LiveTicker } from "@/components/LiveTicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight, Award, CheckCircle2, Heart, Quote, Shield, Sparkles, Star, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-mother-child.jpg";
import storyAmara from "@/assets/story-amara.jpg";
import storyDist from "@/assets/story-distribution.jpg";
import storyThriving from "@/assets/story-thriving.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiveWise — Save a life today, for less than a dinner" },
      {
        name: "description",
        content:
          "Turn €25 into 5 mosquito nets that protect a family from malaria. Evidence-based giving. 100% transparent.",
      },
      { property: "og:title", content: "GiveWise — Save a life today" },
      {
        property: "og:description",
        content:
          "Evidence-based giving. Your donation goes to charities proven to save and improve lives.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const TIERS = [
  { amount: 10, label: "Protect 2 people", note: "2 mosquito nets" },
  { amount: 50, label: "Shield a family", note: "10 nets · 4 people" },
  { amount: 100, label: "Save a life", note: "Statistical life · year of impact", featured: true },
];

function Hero() {
  const { openDrawer, setAmount } = useDonation();
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="A mother smiles while holding her child under a mosquito net at sunrise"
          className="h-full w-full object-cover animate-ken-burns"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-2xl text-background">
          <div className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3 py-1 text-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <CountUp to={12481} className="font-medium" /> people gave this month
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            You can save a life today.
            <span className="block text-primary-glow">For less than a dinner.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-background/85 text-pretty sm:text-lg">
            €25 buys 5 mosquito nets — enough to protect a family from malaria for years.
            Every euro goes to charities proven, by evidence, to save lives.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {TIERS.map((t) => (
              <button
                key={t.amount}
                onClick={() => {
                  setAmount(t.amount);
                  openDrawer(t.amount);
                }}
                className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-left backdrop-blur-md transition hover:-translate-y-0.5 ${
                  t.featured
                    ? "border-primary bg-primary/90 text-primary-foreground shadow-glow"
                    : "border-background/30 bg-background/10 text-background hover:border-background/60 hover:bg-background/20"
                }`}
              >
                {t.featured && (
                  <span className="absolute right-2 top-2 rounded-full bg-background/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                    Most chosen
                  </span>
                )}
                <div className="font-display text-3xl font-semibold">€{t.amount}</div>
                <div className="mt-1 text-sm font-medium">{t.label}</div>
                <div className="mt-0.5 text-xs opacity-75">{t.note}</div>
                <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-background/80">
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Secure checkout</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Evidence-based</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> 100% to charity</span>
          </div>

          <div className="mt-6">
            <a
              href="#impact"
              className="inline-flex items-center gap-1.5 text-sm text-background/90 underline-offset-4 hover:underline"
            >
              See how your money helps <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Live counter strip */}
      <div className="relative mx-auto -mb-10 max-w-6xl px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-elegant sm:grid-cols-3">
          <Stat label="Lives protected" to={284903} />
          <Stat label="Mosquito nets funded" to={1421604} />
          <Stat label="Donors this year" to={48127} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, to }: { label: string; to: number }) {
  return (
    <div className="bg-background p-5 text-center sm:p-6">
      <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        <CountUp to={to} duration={2200} />
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function ImpactCalculator() {
  const { amount, setAmount, openDrawer } = useDonation();
  const impact = computeImpact(amount);
  return (
    <section id="impact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Your impact</span>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Drag the slider. Watch lives change.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            We don't ask for your trust — we earn it. Every euro is mapped to a measurable outcome
            from charities independently verified by the world's top evaluators.
          </p>

          <div className="mt-8 rounded-3xl border border-border bg-warm p-6 shadow-soft">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-5xl font-semibold text-primary">€{amount}</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </div>
            <Slider
              value={[amount]}
              min={5}
              max={500}
              step={5}
              onValueChange={(v) => setAmount(v[0])}
              className="mt-5"
            />
            <div className="mt-6 grid grid-cols-3 gap-3">
              <ImpactStat n={impact.peopleProtected} label="people protected" />
              <ImpactStat n={impact.nets} label="nets funded" />
              <ImpactStat n={impact.treatments} label="treatments" />
            </div>
            <Button
              onClick={() => openDrawer()}
              size="lg"
              className="mt-6 w-full rounded-full bg-cta-grad text-primary-foreground shadow-glow"
            >
              <Heart className="mr-2 h-4 w-4" /> Give €{amount} monthly
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="image-reveal aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={storyDist}
              alt="Health worker distributing mosquito nets to families"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
          <Card className="absolute -bottom-6 -left-4 max-w-[260px] rounded-2xl border-border bg-background/95 p-4 shadow-elegant backdrop-blur-md sm:-left-8">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-success">
              <TrendingUp className="h-3.5 w-3.5" /> Live
            </div>
            <div className="mt-1 font-display text-lg leading-tight">
              Your €{amount} = {impact.peopleProtected} people shielded
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ImpactStat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl bg-background p-3 text-center">
      <div className="font-display text-2xl font-semibold text-foreground">{n.toLocaleString()}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Stories() {
  return (
    <section className="bg-warm py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Real stories</span>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl text-balance">
            Before. Intervention. After.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every donation flows into a chain of small, verifiable miracles. Hover any step.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <StoryCard
            step="01 · Before"
            img={storyAmara}
            alt="Amara, a child in a village"
            title="Amara, age 6"
            body="Lives in a malaria-prone region. Without protection, the risk to her family is constant."
            metric="1 life at risk"
          />
          <StoryCard
            step="02 · Intervention"
            img={storyDist}
            alt="Health workers distribute mosquito nets"
            title="Nets delivered, training given"
            body="Local health workers distribute long-lasting nets and teach correct use — verified at the door."
            metric="€25 = 5 nets"
          />
          <StoryCard
            step="03 · After"
            img={storyThriving}
            alt="Healthy children playing"
            title="A community thriving"
            body="Malaria cases drop by up to 60%. Children stay in school. Families keep working."
            metric="-60% disease"
            highlight
          />
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Read more stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  step,
  img,
  alt,
  title,
  body,
  metric,
  highlight,
}: {
  step: string;
  img: string;
  alt: string;
  title: string;
  body: string;
  metric: string;
  highlight?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`group overflow-hidden rounded-3xl border border-border bg-background shadow-soft transition-all duration-700 hover-lift ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="image-reveal aspect-[4/3] overflow-hidden">
        <img src={img} alt={alt} className="h-full w-full object-cover" loading="lazy" width={1024} height={768} />
      </div>
      <div className="p-5">
        <div className="text-[11px] font-medium uppercase tracking-wider text-primary">{step}</div>
        <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        <div
          className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            highlight ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
          }`}
        >
          {metric}
        </div>
      </div>
    </div>
  );
}

function Transparency() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Where your money goes</span>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl text-balance">
            90% to programs. Always.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We're radically transparent. Every euro is auditable. Operations are funded by a separate
            grant so your gift goes where you intended.
          </p>

          <div className="mt-8 space-y-5">
            <Bar label="Direct programs" value={90} inView={inView} color="bg-cta-grad" />
            <Bar label="Operations" value={7} inView={inView} color="bg-foreground" />
            <Bar label="Fundraising" value={3} inView={inView} color="bg-muted-foreground" />
          </div>
        </div>

        <Card className="rounded-3xl border-border bg-warm p-8 shadow-soft">
          <Quote className="h-8 w-8 text-primary" />
          <p className="mt-3 font-display text-2xl leading-snug text-foreground text-balance">
            "I used to give to whatever felt right. Now I know — to the euro — what my gift does. It's the most rewarding habit I have."
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              S
            </div>
            <div>
              <div className="text-sm font-medium">Sofia Lindqvist</div>
              <div className="text-xs text-muted-foreground">Monthly donor since 2022</div>
            </div>
            <div className="ml-auto flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Bar({ label, value, inView, color }: { label: string; value: number; inView: boolean; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-display text-lg font-semibold">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-[1400ms] ease-out ${color}`}
          style={{ width: inView ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function MonthlyGoal() {
  const goal = 75000;
  const raised = 51420;
  const pct = Math.round((raised / goal) * 100);
  const { openDrawer } = useDonation();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="overflow-hidden rounded-3xl bg-foreground p-8 text-background shadow-elegant sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-primary-glow">November goal</span>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl text-balance">
              €{raised.toLocaleString()} of €{goal.toLocaleString()} raised
            </h2>
            <p className="mt-3 max-w-md text-background/75">
              Help us hit this month's target — every contribution funds nets being shipped next week.
            </p>
          </div>
          <div>
            <div className="flex items-baseline justify-between text-sm text-background/80">
              <span>{pct}% funded</span>
              <span>5 days left</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-background/15">
              <div
                className="h-full rounded-full bg-cta-grad transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <Button
              onClick={() => openDrawer()}
              size="lg"
              className="mt-5 w-full rounded-full bg-cta-grad text-primary-foreground shadow-glow sm:w-auto sm:px-10"
            >
              Push us over the line
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustEvaluators() {
  const evaluators = ["GiveWell", "Founders Pledge", "ImpactMatters", "Charity Navigator", "GiveDirectly"];
  return (
    <section className="border-y border-border bg-warm py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Charities recommended by independent evaluators
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {evaluators.map((e) => (
            <div
              key={e}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Award className="h-4 w-4 text-primary" />
              {e}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContrastSimulation() {
  const { openDrawer } = useDonation();
  const [given, setGiven] = useState(true);
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">A small simulation</span>
        <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl text-balance">
          What if no one donated?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Toggle to see the same village, the same year — with and without your help.
        </p>
      </div>

      <div className="mx-auto mt-10 inline-flex w-full justify-center">
        <div className="inline-flex rounded-full bg-muted p-1">
          <button
            onClick={() => setGiven(false)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              !given ? "bg-background shadow-soft" : "text-muted-foreground"
            }`}
          >
            Without action
          </button>
          <button
            onClick={() => setGiven(true)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              given ? "bg-cta-grad text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            With your help
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl shadow-elegant">
        <div className="relative aspect-[16/9]">
          <img
            src={storyThriving}
            alt="Children playing"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              given ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            width={1920}
            height={1080}
          />
          <img
            src={storyAmara}
            alt="Child portrait"
            className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-700 ${
              given ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${given ? "from-success/30" : "from-foreground/60"} to-transparent transition-colors duration-700`} />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-background sm:p-10">
            <div className="font-display text-3xl font-semibold sm:text-4xl text-balance">
              {given ? "284,903 lives protected this year." : "Without donations, the count stays at zero."}
            </div>
            <div className="mt-2 text-background/85">
              {given ? "Because people like you chose to act." : "Tiny gifts. Compounded. Every month."}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => openDrawer()}
          size="lg"
          className="rounded-full bg-cta-grad px-8 text-primary-foreground shadow-glow"
        >
          Be the kind of person who acts <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <div className="h-10" />
      <LiveTicker />
      <TrustEvaluators />
      <ImpactCalculator />
      <Stories />
      <Transparency />
      <ContrastSimulation />
      <MonthlyGoal />
    </>
  );
}

