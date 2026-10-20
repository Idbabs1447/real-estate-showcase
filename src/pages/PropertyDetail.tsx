import { useCallback, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Link, navigate } from "../lib/router";
import {
  getProperty,
  getAdvisor,
  similarProperties,
  type Property,
} from "../data/properties";
import { site } from "../data/site";
import { whatsappLink, formatDate } from "../lib/format";
import {
  PropertyCard,
  PropertyPrice,
  PropertySpecs,
} from "../components/PropertyCard";
import { InquiryForm } from "../components/InquiryForm";
import { Button, Container, DemoPill, Eyebrow, Reveal, Section, Badge } from "../components/ui";
import {
  ArrowLeft,
  ArrowRight,
  BedIcon,
  BathIcon,
  AreaIcon,
  CarIcon,
  CloseIcon,
  ExpandIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShieldIcon,
  WhatsAppIcon,
  CheckIcon,
} from "../components/Icons";

/* ── Gallery ───────────────────────────────────────────── */

function Gallery({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % property.images.length),
    [property.images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + property.images.length) % property.images.length),
    [property.images.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, next, prev]);

  return (
    <>
      <div className="grid gap-2.5 lg:grid-cols-4 lg:gap-3">
        {/* Main image */}
        <div className="group relative overflow-hidden bg-navy-950 lg:col-span-3">
          <img
            src={property.images[index].src}
            alt={property.images[index].alt}
            className="aspect-[16/11] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />

          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-cream-100/30 bg-navy-950/55 px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cream-100 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <ExpandIcon className="h-3.5 w-3.5" />
            Enlarge
          </button>

          <p className="absolute bottom-4 left-4 text-[0.7rem] uppercase tracking-[0.16em] text-cream-200/70">
            {index + 1} / {property.images.length}
          </p>

          {property.images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/25 bg-navy-950/45 text-cream-100 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/25 bg-navy-950/45 text-cream-100 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto lg:flex-col lg:overflow-visible">
          {property.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative shrink-0 overflow-hidden border-2 transition-all duration-300 lg:w-full",
                i === index
                  ? "border-gold-500"
                  : "border-transparent opacity-65 hover:opacity-100",
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-20 w-28 object-cover lg:h-auto lg:w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-navy-950/96 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setLightbox(false)}
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-cream-100">{property.title}</p>
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center border border-cream-100/25 text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center py-6" onClick={(e) => e.stopPropagation()}>
            <img
              src={property.images[index].src}
              alt={property.images[index].alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="flex h-11 w-11 items-center justify-center border border-cream-100/25 text-cream-100 transition-colors hover:border-gold-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="text-[0.72rem] uppercase tracking-[0.16em] text-cream-300/60">
              {index + 1} of {property.images.length} · {property.images[index].alt}
            </span>
            <button
              onClick={next}
              aria-label="Next image"
              className="flex h-11 w-11 items-center justify-center border border-cream-100/25 text-cream-100 transition-colors hover:border-gold-400"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Advisor card ──────────────────────────────────────── */

function AdvisorCard({ property }: { property: Property }) {
  const advisor = getAdvisor(property.advisor);
  const wa = whatsappLink(
    site.contact.whatsapp,
    `Hello ${site.name}, I'm interested in ${property.title} (Ref ${property.ref}) in ${property.district}. Could you share more detail?`,
  );

  return (
    <div className="border border-navy-900/12 bg-cream-50">
      <div className="flex items-center gap-4 border-b border-navy-900/10 p-6">
        <img
          src={advisor.photo}
          alt={`${advisor.name}, ${advisor.role}`}
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="font-display text-[1.25rem] leading-tight text-navy-900">{advisor.name}</p>
          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-gold-700">
            {advisor.role}
          </p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-[0.85rem] leading-relaxed text-navy-700/70">{advisor.line}</p>

        <div className="mt-6 space-y-2.5">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1f7a4d] px-5 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#196540]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp about this home
          </a>
          <a
            href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-navy-900/15 px-5 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-700"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.contact.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.contact.inspectionsEmail}?subject=${encodeURIComponent(
              `Inspection request — ${property.title} (${property.ref})`,
            )}`}
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-navy-900/15 px-5 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-700"
          >
            <MailIcon className="h-4 w-4" />
            Email the desk
          </a>
        </div>

        <p className="mt-5 text-[0.68rem] leading-relaxed text-navy-700/45">
          Placeholder contact details for a fictional agency. Links open a template only.
        </p>
      </div>
    </div>
  );
}

/* ── Key facts ─────────────────────────────────────────── */

function KeyFacts({ property }: { property: Property }) {
  const facts = [
    { icon: BedIcon, label: "Bedrooms", value: property.bedrooms > 0 ? String(property.bedrooms) : "—" },
    { icon: BathIcon, label: "Bathrooms", value: property.bathrooms > 0 ? String(property.bathrooms) : "—" },
    { icon: AreaIcon, label: "Internal area", value: `${property.sizeSqm.toLocaleString()} sqm` },
    { icon: CarIcon, label: "Parking", value: property.parking > 0 ? `${property.parking} bays` : "—" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-navy-900/10 bg-navy-900/10 sm:grid-cols-4">
      {facts.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-cream-50 p-5 sm:p-6">
          <Icon className="h-5 w-5 text-gold-600" />
          <p className="mt-4 text-[0.62rem] uppercase tracking-[0.18em] text-navy-700/50">
            {label}
          </p>
          <p className="mt-1.5 font-display text-[1.4rem] leading-none text-navy-900">{value}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function PropertyDetail({ id }: { id: string }) {
  const property = getProperty(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!property) {
    return (
      <Section className="bg-cream-100">
        <div className="mx-auto max-w-lg py-16 text-center">
          <Eyebrow align="center">Not found</Eyebrow>
          <h1 className="mt-4 text-[2.2rem] leading-tight text-navy-900">
            That listing isn't in the sample data.
          </h1>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-navy-700/70">
            The reference you followed doesn't match one of the fourteen fictional properties in
            this demo.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button to="/properties" variant="primary" size="md">
              Back to listings
            </Button>
            <Button to="/" variant="outline" size="md">
              Homepage
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const similar = similarProperties(property, 3);
  const advisor = getAdvisor(property.advisor);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-navy-900/10 bg-cream-200/60">
        <Container className="flex flex-wrap items-center gap-x-2 gap-y-2 py-4 text-[0.72rem] text-navy-700/60">
          <Link to="/" className="transition-colors hover:text-gold-700">
            Home
          </Link>
          <span className="text-navy-900/20">/</span>
          <Link to="/properties" className="transition-colors hover:text-gold-700">
            Properties
          </Link>
          <span className="text-navy-900/20">/</span>
          <span className="text-navy-900">{property.title}</span>
          <button
            onClick={() => navigate("/properties")}
            className="ml-auto inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-navy-800 transition-colors hover:text-gold-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All listings
          </button>
        </Container>
      </div>

      {/* Header */}
      <div className="bg-cream-100 pt-10 sm:pt-12">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={property.intent === "sale" ? "navy" : "gold"}>
                  {property.intent === "sale" ? "For sale" : "To let"}
                </Badge>
                {property.status !== "Available" && (
                  <span className="inline-flex items-center rounded-full border border-navy-900/15 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
                    {property.status}
                  </span>
                )}
                <DemoPill />
              </div>

              <h1 className="mt-5 text-[2.1rem] leading-[1.08] text-navy-900 sm:text-[2.7rem] lg:text-[3.1rem]">
                {property.title}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.85rem] text-navy-700/70">
                <span className="inline-flex items-center gap-1.5">
                  <PinIcon className="h-4 w-4 text-gold-600" />
                  {property.street}, {property.district}
                </span>
                <span className="text-navy-900/20">·</span>
                <span>
                  {property.type} · {property.region} Lagos
                </span>
              </p>
            </div>

            <div className="lg:pb-2 lg:text-right">
              <PropertyPrice property={property} size="lg" className="lg:justify-end" />
              <p className="mt-2.5 text-[0.7rem] uppercase tracking-[0.16em] text-navy-700/50">
                Ref {property.ref} · Listed {formatDate(property.listed)}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-gold-700">
                Fictional listing · illustrative price
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Gallery + body */}
      <div className="bg-cream-100 pb-6 pt-8">
        <Container>
          <Gallery property={property} />
        </Container>
      </div>

      <div className="bg-cream-100 pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Main column */}
            <div className="lg:col-span-8">
              <KeyFacts property={property} />

              <div className="mt-12">
                <Eyebrow>Overview</Eyebrow>
                <h2 className="mt-4 text-[1.75rem] leading-snug text-navy-900">
                  {property.summary}
                </h2>
                <div className="mt-6 space-y-5">
                  {property.description.map((para) => (
                    <p key={para.slice(0, 24)} className="text-[0.95rem] leading-[1.85] text-navy-800/80">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Floorplan / areas */}
              <div className="mt-14">
                <Eyebrow>Accommodation</Eyebrow>
                <div className="mt-5 grid gap-px overflow-hidden border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2">
                  {property.floorplan.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-baseline justify-between gap-4 bg-cream-50 px-6 py-5"
                    >
                      <span className="text-[0.78rem] uppercase tracking-[0.12em] text-navy-700/60">
                        {f.label}
                      </span>
                      <span className="font-display text-[1.2rem] text-navy-900">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-14">
                <Eyebrow>Features & specification</Eyebrow>
                <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.9rem] text-navy-800/80">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tenure / verification */}
              <div className="mt-14 border border-navy-900/12 bg-cream-200/50 p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <ShieldIcon className="h-5 w-5 text-gold-600" />
                  <h3 className="font-display text-[1.4rem] text-navy-900">
                    Verification & tenure
                  </h3>
                </div>
                <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {[
                    { k: "Title document", v: property.titleDoc },
                    { k: "Tenure", v: property.intent === "rent" ? "Leasehold letting" : "Freehold interest" },
                    { k: "Service charge", v: property.serviceCharge ?? "Not applicable" },
                    { k: "Furnishing", v: property.furnished ?? "Not applicable" },
                    { k: "Plot size", v: property.plotSqm ? `${property.plotSqm.toLocaleString()} sqm` : "Not applicable" },
                    { k: "Carrying advisor", v: advisor.name },
                  ].map((row) => (
                    <div key={row.k} className="border-t border-navy-900/10 pt-4">
                      <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-navy-700/50">
                        {row.k}
                      </dt>
                      <dd className="mt-1.5 text-[0.92rem] text-navy-900">{row.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-7 text-[0.75rem] leading-relaxed text-navy-700/55">
                  This panel describes the checks a live instruction would go through before
                  publication. Nothing here has been carried out — the property does not exist.
                </p>
              </div>

              {/* Specs strip */}
              <div className="mt-12">
                <PropertySpecs property={property} />
              </div>

              {/* Mobile advisor + form */}
              <div className="mt-14 space-y-8 lg:hidden">
                <AdvisorCard property={property} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div className="hidden lg:block">
                  <AdvisorCard property={property} />
                </div>

                <div className="border border-navy-900/12 bg-cream-50 p-6 sm:p-7">
                  <h3 className="font-display text-[1.5rem] leading-snug text-navy-900">
                    Arrange a viewing
                  </h3>
                  <p className="mt-2 mb-6 text-[0.84rem] leading-relaxed text-navy-700/65">
                    {property.street}, {property.district}. Usually available with 48 hours' notice.
                  </p>
                  <InquiryForm variant="inspection" subject={property.title} compact />
                </div>

                <div className="border border-navy-900/12 bg-navy-950 p-6 sm:p-7">
                  <Eyebrow className="text-gold-400">Share</Eyebrow>
                  <p className="mt-3 text-[0.86rem] leading-relaxed text-cream-200/70">
                    Send this listing to a partner, solicitor or lender — or copy the link.
                  </p>
                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="mt-5 w-full rounded-full border border-cream-100/25 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    Copy page link
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <Section className="border-t border-navy-900/10 bg-cream-200/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Comparable</Eyebrow>
              <h2 className="mt-4 text-[1.9rem] leading-snug text-navy-900 sm:text-[2.3rem]">
                Others in a similar bracket.
              </h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-navy-700/65">
                Matched on intent, district, size and price band — all fictional sample listings.
              </p>
            </div>
            <Button to="/properties" variant="outline" size="md" icon>
              All listings
            </Button>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* WhatsApp band */}
      <section className="bg-cream-100 py-14">
        <Container>
          <div className="flex flex-col items-center gap-6 border border-gold-300/60 bg-gold-50 p-8 text-center sm:p-10">
            <WhatsAppIcon className="h-9 w-9 text-[#1f7a4d]" />
            <h3 className="font-display text-[1.7rem] leading-snug text-navy-900 sm:text-[2rem]">
              Prefer to ask a question before you view?
            </h3>
            <p className="max-w-xl text-[0.9rem] leading-relaxed text-navy-800/70">
              Message our advisory desk about {property.title} on WhatsApp. Replies during{" "}
              {site.contact.whatsappHours.toLowerCase()} — placeholder number for this demo.
            </p>
            <a
              href={whatsappLink(
                site.contact.whatsapp,
                `Hello ${site.name}, I have a question about ${property.title} (Ref ${property.ref}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#1f7a4d] px-7 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#196540]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Message {site.name}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
