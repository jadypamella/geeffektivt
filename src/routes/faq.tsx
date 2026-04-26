import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common questions | GiveWise" },
      {
        name: "description",
        content:
          "Why this charity? How do we know it works? Where does my money go? Answers to common questions about giving with GiveWise.",
      },
      { property: "og:title", content: "GiveWise FAQ" },
      { property: "og:description", content: "Honest answers about evidence-based giving." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "Why these specific charities?",
    a: "We only recommend organizations whose impact has been independently verified — typically by GiveWell, Founders Pledge, or peer-reviewed evidence. The bar is high: only a few dozen charities globally meet it.",
  },
  {
    q: "How do you know mosquito nets actually save lives?",
    a: "Multiple randomized controlled trials over 20+ years consistently show that long-lasting insecticidal nets reduce all-cause child mortality by ~17%. The Against Malaria Foundation also independently verifies distribution and usage.",
  },
  {
    q: "What percentage of my donation reaches programs?",
    a: "100% of your donation is sent to the recommended charity. GiveWise's operations are funded by a separate philanthropic grant, so we never deduct fees from your gift.",
  },
  {
    q: "Can I cancel my monthly donation?",
    a: "Yes — anytime, in one click, no questions asked. We believe a great relationship with donors is built on trust, not lock-in.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "Tax-deductibility depends on your country of residence. In Sweden, donations above 200 SEK to approved organizations qualify for a tax reduction. We provide a receipt for every gift.",
  },
  {
    q: "Why focus on global health instead of local causes?",
    a: "We focus where each euro creates the most measurable good. Due to economic differences, the same gift saves vastly more lives in low-income regions than in high-income ones — about 100×, by current best estimates.",
  },
  {
    q: "How is my payment data secured?",
    a: "We never see or store your card details. Payments are processed by PCI-DSS compliant providers (Stripe, Apple Pay, Google Pay) using end-to-end encryption.",
  },
  {
    q: "Can I give in memory of someone, or as a gift?",
    a: "Yes. After donating, you can add a dedication and we'll generate a beautiful certificate to share. Many of our donors give as birthday or wedding gifts.",
  },
];

function FaqPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">FAQ</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl text-balance">
          Honest answers.
        </h1>
        <p className="mt-4 text-muted-foreground">No marketing fluff. Just what you actually want to know.</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-warm px-5 data-[state=open]:bg-background"
            >
              <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
