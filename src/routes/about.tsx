import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/lib/donation";
import { Compass, Heart, Microscope, Shield } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Why we exist | GiveWise" },
      {
        name: "description",
        content:
          "GiveWise is a Stockholm-based nonprofit channeling generosity to the world's most effective charities. Read our mission and values.",
      },
      { property: "og:title", content: "About GiveWise" },
      { property: "og:description", content: "Evidence-based giving, born in Stockholm." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Microscope, title: "Evidence over instinct", body: "We follow the data, not the feels. Cold rationality in service of warm outcomes." },
  { icon: Shield, title: "Radical transparency", body: "Every euro is auditable. Operations are funded separately from donations." },
  { icon: Heart, title: "Donor empowerment", body: "You stay in control. Cancel, adjust, or redirect at any moment — no friction." },
  { icon: Compass, title: "Independence", body: "We take no commission from charities. Our only loyalty is to outcomes." },
];

function AboutPage() {
  const { openDrawer } = useDonation();
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">About</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl text-balance">
          Generosity, multiplied by evidence.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
          GiveWise was founded in Stockholm with one belief: a donor's heart deserves a researcher's
          rigor. We channel your gifts to the few charities proven, by independent evidence, to do
          extraordinary good.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <Card key={v.title} className="rounded-2xl border-border bg-warm p-7 hover-lift">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl text-balance">
          Be the kind of person who acts.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Smart, evidence-based, hopeful giving. The most rewarding habit you'll build this year.
        </p>
        <Button
          onClick={() => openDrawer()}
          size="lg"
          className="mt-6 rounded-full bg-cta-grad px-8 text-primary-foreground shadow-glow"
        >
          Start giving today
        </Button>
      </section>
    </div>
  );
}
