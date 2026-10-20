import { site } from "../data/site";
import { IMAGES } from "../data/images";
import {
  Button,
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { CheckIcon, ArrowRight } from "../components/Icons";
import { Link } from "../lib/router";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Six areas of work, priced in the open."
        lead="Fees are quoted as starting points because scope varies. What does not vary is that you will see the number in writing before anything begins."
        image={IMAGES.walkthrough}
      />

      {/* Index */}
      <div className="border-b border-navy-900/10 bg-cream-200/60">
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5">
          {site.services.map((s, i) => (
            <a
              key={s.id}
              href={`#/services#${s.id}`}
              className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy-800 transition-colors hover:text-gold-700"
            >
              <span className="text-gold-600">0{i + 1}</span>
              {s.title}
            </a>
          ))}
        </Container>
      </div>

      {/* Service blocks */}
      {site.services.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              "scroll-mt-32 border-b border-navy-900/10 py-20 sm:py-24",
              i % 2 === 0 ? "bg-cream-100" : "bg-cream-200/40",
            )}
          >
            <Container>
              <div
                className={cn(
                  "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
                  flip && "lg:[&>*:first-child]:order-2",
                )}
              >
                <div className="lg:col-span-5">
                  <Reveal>
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="absolute inset-0 border border-navy-900/10" />
                      <span className="absolute left-4 top-4 bg-cream-50/95 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-navy-900">
                        {service.price}
                      </span>
                    </div>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <Reveal delay={80}>
                    <Eyebrow>0{i + 1} · Service</Eyebrow>
                    <h2 className="mt-4 text-[1.95rem] leading-[1.12] text-navy-900 sm:text-[2.4rem]">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-navy-800/75">
                      {service.summary}
                    </p>

                    <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                      {service.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[0.88rem] text-navy-800/80">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-3">
                      <Button to="/contact" variant="primary" size="md">
                        Discuss a mandate
                      </Button>
                      <Button to="/properties" variant="outline" size="md">
                        See the portfolio
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Fee transparency */}
      <Section className="bg-navy-950">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="text-gold-400">Fee transparency</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-cream-100 sm:text-[2.4rem]">
                What you pay, and when.
              </h2>
              <p className="mt-6 text-[0.96rem] leading-relaxed text-cream-200/70">
                Every engagement is confirmed with a one-page scope letter showing the fee, the
                trigger for payment, and what is explicitly excluded. Nothing is deducted that you
                have not signed for.
              </p>
              <Button to="/contact" variant="gold" size="md" icon className="mt-9">
                Request a scope letter
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="grid gap-px overflow-hidden border border-cream-100/12 bg-cream-100/12 sm:grid-cols-2">
                {site.services.map((s) => (
                  <div key={s.id} className="bg-navy-950 p-6">
                    <p className="font-display text-[1.25rem] leading-tight text-cream-100">
                      {s.title}
                    </p>
                    <p className="mt-2.5 text-[0.72rem] uppercase tracking-[0.14em] text-gold-400">
                      {s.price}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[0.75rem] leading-relaxed text-cream-300/45">
                Fee levels shown are illustrative figures for a fictional agency, included to
                demonstrate layout only.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Process recap */}
      <Section className="bg-cream-100">
        <SectionHeading
          eyebrow="Engagement"
          title="How a mandate starts."
          lead="A single conversation, then a written scope. No retainer is requested for buyer representation."
        />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.process.map((step, i) => (
            <Reveal key={step.step} delay={i * 90}>
              <div className="border-t border-navy-900/12 pt-6">
                <span className="font-display text-[2.8rem] leading-none text-navy-900/12">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-[1.35rem] text-navy-900">{step.title}</h3>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-navy-700/70">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link
            to="/about"
            className="group mt-12 inline-flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-navy-900"
          >
            More about how we work
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </Section>

      <Section className="bg-cream-200/50">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Service FAQ</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.4rem]">
                Before you engage us.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Start here"
        title="Tell us the problem. We will say whether we are the right people."
        body="If a mandate is better placed with a surveyor, a lawyer or a developer, we will tell you that in the first call."
        message="Hello Azure Estates, I'd like to discuss a mandate."
        image={IMAGES.consultation}
      />
    </>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
