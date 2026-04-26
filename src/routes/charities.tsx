import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/lib/donation";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import storyDist from "@/assets/story-distribution.jpg";

export const Route = createFileRoute("/charities")({
  head: () => ({
    meta: [
      { title: "Charities: Evidence-based selection | GiveWise" },
      {
        name: "description",
        content:
          "We only recommend charities with rigorous, independently verified evidence of impact. See our selection criteria and current partners.",
      },
      { property: "og:title", content: "GiveWise Charities" },
      { property: "og:description", content: "Evidence-based, independently verified, radically transparent." },
      { property: "og:image", content: storyDist },
    ],
  }),
  component: CharitiesPage,
});

const CHARITIES = [
  {
    name: "Against Malaria Foundation",
    desc: "Distributes long-lasting insecticidal nets in sub-Saharan Africa. One of the most cost-effective interventions in global health.",
    metric: "€2,500 saves a statistical life",
    tags: ["Top-rated", "Verified 12 years"],
  },
  {
    name: "Helen Keller International",
    desc: "Vitamin A supplementation programs prevent child mortality and blindness in regions with high deficiency rates.",
    metric: "€3,400 / life saved",
    tags: ["Top-rated"],
  },
  {
    name: "GiveDirectly",
    desc: "Direct cash transfers to people living in extreme poverty, among the most rigorously studied interventions in development.",
    metric: "85% reaches recipients",
    tags: ["Cash transfers"],
  },
  {
    name: "Evidence Action: Deworm the World",
    desc: "Mass school-based deworming programs that improve child health, school attendance, and adult earnings.",
    metric: "€0.50 per child treated",
    tags: ["Education impact"],
  },
];

function CharitiesPage() {
  const { openDrawer } = useDonation();
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">Our partners</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl text-balance">
          We only recommend what works.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          Out of thousands of charities, only a handful pass the bar of rigorous evidence.
          These are the ones we trust your money with.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <Card className="rounded-3xl border-border bg-warm p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold">How we select charities</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Independent evidence of impact (RCTs preferred)",
              "Cost-effectiveness in the top 1% globally",
              "Operational transparency and audited finances",
              "Room for more funding, your gift moves the needle",
            ].map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          {CHARITIES.map((c) => (
            <Card key={c.name} className="rounded-2xl border-border bg-background p-6 hover-lift">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <Award className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {c.metric}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary"
              >
                Read full evaluation <ExternalLink className="h-3 w-3" />
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => openDrawer()}
            size="lg"
            className="rounded-full bg-cta-grad px-8 text-primary-foreground shadow-glow"
          >
            Give to all four, split automatically
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">We allocate based on current room-for-funding analysis.</p>
        </div>
      </section>
    </div>
  );
}
