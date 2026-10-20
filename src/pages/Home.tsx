import { useState } from "react";
import { cn } from "../utils/cn";
import { Link, navigate } from "../lib/router";
import { site } from "../data/site";
import { IMAGES } from "../data/images";
import { districts, properties } from "../data/properties";
import { formatNairaShort } from "../lib/format";
import {
  Button,
  Container,
  DemoPill,
  Eyebrow,
  Hairline,
  Reveal,
  Section,
  SectionHeading,
  StatBlock,
} from "../components/ui";
import { PropertyCard } from "../components/PropertyCard";
import { InquiryForm } from "../components/InquiryForm";
import { Faq } from "../components/Faq";
import { ArrowRight, ChevronDown, PinIcon, SearchIcon, ShieldIcon, ClockIcon, LayersIcon } from "../components/Icons";

/* ─────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────── */

function HeroSearch() {
  const [intent, setIntent] = useState<"sale" | "rent">("sale");
  const [district, setDistrict] = useState("any");
  const [type, setType] = useState("any");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ intent });
    if (district !== "any") params.set("district", district);
    if (type !== "any") params.set("type", type);
    navigate(`/properties?${params.toString()}`);
  };

  const selectClass =
    "w-full appearance-none border border-cream-100/25 bg-navy-950/45 px-4 py-3.5 pr-9 text-[0.85rem] text-cream-100 backdrop-blur-md transition-colors focus:border-gold-400 focus:outline-none";

  return (
    <form
      onSubmit={submit}
      className="border border-cream-100/15 bg-navy-950/40 p-4 backdrop-blur-xl sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="eyebrow text-cream-300/60">Start a search</span>
        <div className="flex gap-0 border border-cream-100/20">
          {(["sale", "rent"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setIntent(v)}
              className={cn(
                "px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                intent === v
                  ? "bg-gold-500 text-navy-950"
                  : "text-cream-200/70 hover:text-cream-100",
              )}
            >
              {v === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="relative block">
          <span className="sr-only">District</span>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={selectClass}
          >
            <option value="any" className="bg-navy-900">Any district</option>
            {districts.map((d) => (
              <option key={d} value={d} className="bg-navy-900">
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200/50" />
        </label>

        <label className="relative block">
          <span className="sr-only">Property type</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="any" className="bg-navy-900">Any type</option>
            {Array.from(new Set(properties.map((p) => p.type))).map((t) => (
              <option key={t} value={t} className="bg-navy-900">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-200/50" />
        </label>

        <button
          type="submit"
          className="group flex items-center justify-center gap-2.5 bg-gold-500 px-5 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-950 transition-colors hover:bg-gold-400"
        >
          <SearchIcon className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}

function Hero() {
  const featured = properties.find((p) => p.featured)!;

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-950"
      style={{ marginTop: "calc(-1 * var(--header-h, 112px))" }}
    >
      <img
        src={site.homeHero.image}
        alt="An elegant modern Lagos residence photographed at dusk"
        className="absolute inset-0 h-full w-full animate-hero-zoom object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/92 via-navy-950/70 to-navy-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/35" />
      <div className="grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      <Container className="relative pt-[calc(var(--header-h,0px)+3.5rem)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-h,0px)+5rem)] lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow animate-fade-up text-gold-400">{site.homeHero.eyebrow}</p>
            <h1 className="mt-6 animate-fade-up animation-delay-100 font-display text-[2.8rem] leading-[1.02] text-cream-100 sm:text-[4rem] lg:text-[4.9rem]">
              {site.homeHero.titleLine1}
              <br />
              <span className="italic text-gold-300">{site.homeHero.titleLine2}</span>
            </h1>
            <p className="mt-7 max-w-xl animate-fade-up animation-delay-200 text-[1rem] leading-relaxed text-cream-200/75 sm:text-[1.05rem]">
              {site.homeHero.subtitle}
            </p>

            <div className="mt-9 flex animate-fade-up animation-delay-300 flex-wrap items-center gap-4">
              <Button to={site.homeHero.primaryCta.to} variant="gold" size="lg" icon>
                {site.homeHero.primaryCta.label}
              </Button>
              <Button to={site.homeHero.secondaryCta.to} variant="light" size="lg">
                {site.homeHero.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-10 flex animate-fade-up animation-delay-500 flex-wrap items-center gap-x-7 gap-y-3">
              <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-cream-300/55">
                <ShieldIcon className="h-4 w-4 text-gold-500" />
                Title verified before listing
              </span>
              <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-cream-300/55">
                <ClockIcon className="h-4 w-4 text-gold-500" />
                Reply within one working day
              </span>
            </div>
          </div>

          {/* Search card */}
          <div className="lg:col-span-5">
            <div className="animate-fade-up animation-delay-200">
              <HeroSearch />
            </div>

            {/* Featured mini card */}
            <div className="mt-4 hidden animate-fade-up animation-delay-400 lg:block">
              <Link
                to={`/property/${featured.id}`}
                className="group flex items-stretch gap-4 border border-cream-100/12 bg-navy-950/45 p-3 backdrop-blur-xl transition-colors hover:border-gold-400/50"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden">
                  <img
                    src={featured.images[0].src}
                    alt={featured.images[0].alt}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="eyebrow text-gold-400">Featured this week</p>
                  <p className="mt-2 truncate font-display text-[1.2rem] text-cream-100">
                    {featured.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.72rem] text-cream-300/60">
                    <PinIcon className="h-3 w-3" />
                    {featured.district}
                  </p>
                  <p className="mt-2 font-display text-[1.05rem] text-gold-300">
                    {formatNairaShort(featured.price)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid animate-fade-in animation-delay-500 grid-cols-2 gap-x-6 gap-y-8 border-t border-cream-100/12 pt-10 lg:mt-20 lg:grid-cols-4">
          {site.homeHero.stats.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} tone="light" />
          ))}
        </div>
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.18em] text-cream-300/30">
          Illustrative demo figures — not real performance data
        </p>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   District marquee
   ───────────────────────────────────────────────────────── */

function DistrictStrip() {
  const items = [...site.districts, ...site.districts];
  return (
    <div className="overflow-hidden border-y border-navy-900/10 bg-cream-200/60 py-5">
      <div className="flex w-max animate-marquee items-center gap-10">
        {items.map((d, i) => (
          <span key={`${d.name}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-[1.05rem] tracking-[0.12em] text-navy-800/70">
              {d.name}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Featured properties
   ───────────────────────────────────────────────────────── */

function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 3);
  return (
    <Section id="featured" className="bg-cream-100">
      <SectionHeading
        eyebrow="The portfolio"
        title={
          <>
            A small number of homes,
            <br className="hidden sm:block" /> chosen with a reason.
          </>
        }
        lead="Every instruction below is fictional sample data, shown here to demonstrate the listing format: verified title, honest condition notes, service charges and our reservations."
        action={
          <Button to="/properties" variant="outline" size="md" icon>
            View all listings
          </Button>
        }
      />

      <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 110}>
            <PropertyCard property={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <DemoPill />
        <Link
          to="/properties"
          className="group inline-flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-navy-900"
        >
          Browse the full sample portfolio
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   About preview
   ───────────────────────────────────────────────────────── */

function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden">
                  <img
                    src={site.about.image}
                    alt="A refined Lagos interior represented by licensed stock photography"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 hidden w-52 border border-gold-500/30 bg-cream-100 p-5 sm:block lg:-right-8">
                  <p className="font-display text-[2.4rem] leading-none text-navy-900">12</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-navy-700/60">
                    Active instructions per advisor, at most
                  </p>
                </div>
                <div className="absolute left-4 top-4 h-14 w-14 border-l border-t border-gold-400/60" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <Eyebrow className="text-gold-400">{site.about.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-cream-100 sm:text-[2.6rem] lg:text-[3.1rem]">
                {site.about.heading}
              </h2>
              <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-cream-200/75">
                {site.about.lead}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {site.about.values.map((v, i) => (
                <Reveal key={v.title} delay={i * 90}>
                  <div className="border-t border-cream-100/12 pt-5">
                    <h3 className="font-display text-[1.28rem] text-cream-100">{v.title}</h3>
                    <p className="mt-2.5 text-[0.86rem] leading-relaxed text-cream-200/60">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-11 flex flex-wrap gap-4">
                <Button to="/about" variant="light" size="md" icon>
                  About the practice
                </Button>
                <Button to="/services" variant="ghost" size="md" className="text-gold-300 hover:text-gold-200">
                  What we do
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Services
   ───────────────────────────────────────────────────────── */

function ServicesPreview() {
  return (
    <Section className="bg-cream-100">
      <SectionHeading
        eyebrow="Services"
        title="Advisory that starts before the search."
        lead="Six areas of work, priced openly. Engage us for one, or the whole chain from brief to aftercare."
        action={
          <Button to="/services" variant="outline" size="md" icon>
            Service detail
          </Button>
        }
      />

      <div className="mt-14 grid gap-px overflow-hidden border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <Link
              to={`/services#${s.id}`}
              className="group flex h-full flex-col bg-cream-50 p-7 transition-colors duration-500 hover:bg-navy-950 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-[1.05rem] tracking-[0.12em] text-gold-600">
                  0{i + 1}
                </span>
                <LayersIcon className="h-5 w-5 text-navy-900/20 transition-colors duration-500 group-hover:text-gold-400" />
              </div>
              <h3 className="mt-7 font-display text-[1.45rem] leading-snug text-navy-900 transition-colors duration-500 group-hover:text-cream-100">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-navy-700/70 transition-colors duration-500 group-hover:text-cream-200/65">
                {s.summary}
              </p>
              <div className="mt-7 flex items-center justify-between border-t border-navy-900/10 pt-5 transition-colors duration-500 group-hover:border-cream-100/15">
                <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold-700 transition-colors duration-500 group-hover:text-gold-300">
                  {s.price}
                </span>
                <ArrowRight className="h-4 w-4 text-navy-900/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold-400" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Process
   ───────────────────────────────────────────────────────── */

function Process() {
  return (
    <Section className="bg-cream-200/50">
      <SectionHeading
        eyebrow="How it goes"
        title="Four steps, no surprises."
        lead="The same sequence whether you are buying a ₦75m apartment or a fourth asset for a family portfolio."
      />

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {site.process.map((step, i) => (
          <Reveal key={step.step} delay={i * 100}>
            <div className="relative">
              <span className="font-display text-[3.4rem] leading-none text-navy-900/12">
                {step.step}
              </span>
              <div className="mt-3 h-px w-12 bg-gold-500" />
              <h3 className="mt-5 font-display text-[1.4rem] text-navy-900">{step.title}</h3>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-navy-700/70">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Districts
   ───────────────────────────────────────────────────────── */

const districtImages = [
  IMAGES.waterfront,
  IMAGES.villaNight,
  IMAGES.lounge2,
  IMAGES.harbour,
  IMAGES.poolDay,
  IMAGES.riverCity,
];

function Districts() {
  return (
    <Section className="bg-cream-100">
      <SectionHeading
        eyebrow="Where we work"
        title="Districts we know street by street."
        lead="Twelve Lagos neighbourhoods, each with its own pricing logic, flood profile and service charge reality. Filter the portfolio by any of them."
        action={
          <Button to="/properties" variant="outline" size="md" icon>
            Filter by district
          </Button>
        }
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.districts.map((d, i) => (
          <Reveal key={d.name} delay={(i % 3) * 90}>
            <Link
              to={`/properties?district=${encodeURIComponent(d.name)}`}
              className="group relative block overflow-hidden"
            >
              <img
                src={districtImages[i % districtImages.length]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <h3 className="font-display text-[1.35rem] leading-tight text-cream-50">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-[0.72rem] text-cream-200/65">{d.note}</p>
                </div>
                <span className="mb-0.5 flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full border border-cream-100/35 text-cream-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Inspection CTA + form
   ───────────────────────────────────────────────────────── */

function InspectionCta() {
  return (
    <section id="inspection" className="relative overflow-hidden bg-navy-900">
      <img
        src={IMAGES.skylineSunset}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/80" />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="text-gold-400">Inspection inquiry</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-cream-100 sm:text-[2.5rem] lg:text-[2.9rem]">
                Book a viewing, and we will tell you what we would want to know.
              </h2>
              <p className="mt-6 text-[0.98rem] leading-relaxed text-cream-200/70">
                An accompanied afternoon, usually two to four properties, with power, water and
                drainage checked on site and a written summary — comparables included — inside 48
                hours.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-9 space-y-4">
                {[
                  "Same-day responses during working hours",
                  "Written post-inspection summary with comparables",
                  "No fee to the viewer, ever",
                  "Virtual walkthroughs for diaspora buyers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.88rem] text-cream-200/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <Hairline className="my-10 opacity-40" />
              <p className="text-[0.8rem] leading-relaxed text-cream-300/50">
                Prefer to talk first? Message our advisory desk on WhatsApp on{" "}
                <span className="text-gold-300">{site.contact.whatsapp}</span>, {site.contact.whatsappHours.toLowerCase()}.
                That number is a placeholder for this demo.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="border border-cream-100/12 bg-cream-100 p-6 sm:p-9">
                <h3 className="font-display text-[1.7rem] text-navy-900">Inspection request</h3>
                <p className="mt-2 mb-7 text-[0.86rem] text-navy-700/65">
                  Complete the form and we will propose an itinerary.
                </p>
                <InquiryForm variant="inspection" compact />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────── */

function HomeFaq() {
  return (
    <Section className="bg-cream-100">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.5rem]">
              What people ask us first.
            </h2>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-navy-700/70">
              Including the question you are probably already asking: is this a real agency?
            </p>
            <Button to="/contact" variant="outline" size="md" icon className="mt-8">
              Ask something else
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Faq />
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <DistrictStrip />
      <FeaturedProperties />
      <AboutPreview />
      <ServicesPreview />
      <Process />
      <Districts />
      <InspectionCta />
      <HomeFaq />
    </>
  );
}
