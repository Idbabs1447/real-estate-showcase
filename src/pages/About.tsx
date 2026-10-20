import { site } from "../data/site";
import { IMAGES } from "../data/images";
import { advisors } from "../data/properties";
import {
  Button,
  DemoPill,
  Eyebrow,
  Hairline,
  Reveal,
  Section,
  SectionHeading,
  StatBlock,
} from "../components/ui";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { CheckIcon } from "../components/Icons";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow={site.about.eyebrow}
        title="We would rather do fewer things properly."
        lead={`${site.about.lead}`}
        image={IMAGES.mansionFacade}
      />

      {/* Story */}
      <Section className="bg-cream-100">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Since 2011</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.5rem]">
                Three advisors, one desk, and a deliberate cap on how much we carry.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {site.about.body.map((para) => (
                <Reveal key={para.slice(0, 20)}>
                  <p className="text-[0.98rem] leading-[1.85] text-navy-800/80">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 border-l-2 border-gold-500 pl-6">
                <p className="font-display text-[1.35rem] italic leading-relaxed text-navy-900">
                  “Tell the client what we would want to be told. Then let them decide.”
                </p>
                <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-navy-700/50">
                  House rule, written on the whiteboard in 2011 · fictional agency
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-navy-900/10 pt-10 sm:grid-cols-4">
                {site.homeHero.stats.map((s) => (
                  <StatBlock key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.18em] text-navy-700/40">
                Illustrative demo figures — not real performance data
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <img
                  src={site.about.portrait}
                  alt="A property agreement being signed, represented by licensed stock photography"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute -bottom-5 -left-4 max-w-[15rem] border border-gold-500/30 bg-cream-50 p-5 sm:-left-8">
                  <p className="font-display text-[2.4rem] leading-none text-navy-900">1 : 12</p>
                  <p className="mt-2 text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] text-navy-700/60">
                    Client-to-advisor ratio, held as a hard ceiling
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-14 border border-navy-900/12 bg-cream-50 p-7">
                <Eyebrow>What we will not do</Eyebrow>
                <ul className="mt-5 space-y-4">
                  {[
                    "List a property we have not personally walked",
                    "Publish a price we cannot evidence with comparables",
                    "Take a listing where the title is unresolved",
                    "Represent both sides without saying so, in writing",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.88rem] text-navy-800/80">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Hairline className="my-6" />
                <DemoPill />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-navy-950">
        <SectionHeading
          eyebrow="How we operate"
          title="Four commitments that cost us money."
          lead="Each of these limits how many instructions we can accept. That is the point."
          tone="light"
        />
        <div className="mt-14 grid gap-px overflow-hidden border border-cream-100/12 bg-cream-100/12 sm:grid-cols-2">
          {site.about.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="h-full bg-navy-950 p-7 sm:p-9">
                <span className="font-display text-[1.05rem] tracking-[0.12em] text-gold-400">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-[1.5rem] text-cream-100">{v.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-cream-200/65">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Districts */}
      <Section className="bg-cream-100">
        <SectionHeading
          eyebrow="Coverage"
          title="Where we actually work."
          lead="Not everywhere, and not pretending to be. Nine districts we can price from memory, three we watch closely."
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-3">
          {site.districts.map((d) => (
            <div key={d.name} className="flex items-baseline justify-between gap-4 bg-cream-50 px-6 py-5">
              <span className="font-display text-[1.2rem] text-navy-900">{d.name}</span>
              <span className="text-right text-[0.75rem] text-navy-700/55">{d.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-cream-200/50">
        <SectionHeading
          eyebrow="The desk"
          title="Four people you will actually deal with."
          lead="Fictional profiles and placeholder portraits, shown to demonstrate the team layout. No client testimonials are used anywhere on this site — we would rather you spoke to a real reference."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((a, i) => (
            <Reveal key={a.id} delay={i * 90}>
              <div className="group">
                <div className="relative overflow-hidden">
                  <img
                    src={a.photo}
                    alt={`${a.name} — placeholder portrait`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5">
                    <span className="font-display text-[1.1rem] tracking-[0.14em] text-cream-50">
                      {a.initials}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-[0.16em] text-cream-200/70">
                      Demo profile
                    </span>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-[1.3rem] leading-tight text-navy-900">
                  {a.name}
                </h3>
                <p className="mt-2 text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-gold-700">
                  {a.role}
                </p>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-navy-700/70">{a.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-cream-100">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Clarifications</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.4rem]">
                The honest version of an about page.
              </h2>
              <p className="mt-5 text-[0.92rem] leading-relaxed text-navy-700/70">
                Including what this website is, and is not.
              </p>
              <Button to="/properties" variant="outline" size="md" icon className="mt-8">
                See the portfolio
              </Button>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Meet us"
        title="Come to the Kingsway Road office, or let us come to you."
        body="Tea, a map of the districts, and an hour of honest conversation about what is realistic. No obligation, no follow-up sequence unless you ask for one."
        message="Hello Azure Estates, I'd like to arrange an introductory conversation."
        image={IMAGES.poolDay}
      />
    </>
  );
}
