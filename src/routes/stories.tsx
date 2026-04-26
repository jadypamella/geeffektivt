import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import storyAmara from "@/assets/story-amara.jpg";
import storyDist from "@/assets/story-distribution.jpg";
import storyThriving from "@/assets/story-thriving.jpg";
import storyEsi from "@/assets/story-esi.jpg";
import heroImg from "@/assets/hero-mother-child.jpg";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories: Real lives, real change | GiveWise" },
      {
        name: "description",
        content:
          "Follow your donation through real beneficiary stories. From at-risk to thriving, see the chain of impact every euro creates.",
      },
      { property: "og:title", content: "GiveWise Stories" },
      { property: "og:description", content: "Real beneficiary stories. Real impact. Followable." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: StoriesPage,
});

const STORIES = [
  {
    name: "Amara, 6",
    place: "Northern Uganda",
    img: storyAmara,
    body: "Lives with her mother and three siblings near a river. Before our partner arrived, malaria was a constant threat. Her brother was hospitalized twice last year.",
    metric: "Now sleeps under a treated net every night",
  },
  {
    name: "The Okoye family",
    place: "Eastern Nigeria",
    img: storyDist,
    body: "A community health worker delivered 8 nets and trained the family on usage. The local clinic now reports a 58% drop in malaria cases this season.",
    metric: "12 family members protected",
  },
  {
    name: "Sango village",
    place: "Tanzania",
    img: storyThriving,
    body: "Two years after net distribution, school attendance is up 22%. Children who would have lost weeks to fever are learning, playing, growing.",
    metric: "+22% school attendance",
  },
  {
    name: "Esi, 9",
    place: "Coastal Ghana",
    img: storyEsi,
    body: "Esi received a deworming treatment at school. Three months later, her teachers report sharper focus and energy. She wants to be a doctor.",
    metric: "€0.50 changed her year",
  },
];

function StoriesPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">Stories</span>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl text-balance">
          Follow your donation.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
          Numbers are how we measure impact. Stories are how we feel it. Here are a few of the
          people behind the statistics.
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-12 px-6 pb-24">
        {STORIES.map((s, i) => (
          <StoryRow key={i} story={s} flip={i % 2 === 1} />
        ))}
      </section>
    </div>
  );
}

function StoryRow({ story, flip }: { story: (typeof STORIES)[number]; flip: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 transition-all duration-700 lg:grid-cols-2 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className={`image-reveal aspect-[4/3] overflow-hidden rounded-3xl shadow-elegant ${flip ? "lg:order-2" : ""}`}>
        <img src={story.img} alt={story.name} className="h-full w-full object-cover" loading="lazy" width={1024} height={768} />
      </div>
      <Card className="rounded-3xl border-border bg-warm p-7 sm:p-9">
        <div className="text-xs font-medium uppercase tracking-wider text-primary">{story.place}</div>
        <h3 className="mt-1 font-display text-3xl font-semibold">{story.name}</h3>
        <p className="mt-4 text-muted-foreground">{story.body}</p>
        <div className="mt-5 inline-flex rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
          {story.metric}
        </div>
      </Card>
    </div>
  );
}
