import { site } from "../data/site";
import { IMAGES } from "../data/images";
import { whatsappLink, telLink } from "../lib/format";
import {
  Button,
  Eyebrow,
  Reveal,
  Section,
  SectionHeading,
} from "../components/ui";
import { PageHero } from "../components/PageHero";
import { InquiryForm } from "../components/InquiryForm";
import { Faq } from "../components/Faq";
import {
  ArrowRight,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "../components/Icons";

function ContactCard({
  icon: Icon,
  label,
  children,
  href,
  accent,
}: {
  icon: typeof PhoneIcon;
  label: string;
  children: React.ReactNode;
  href?: string;
  accent?: boolean;
}) {
  const inner = (
    <>
      <span
        className={
          accent
            ? "flex h-11 w-11 items-center justify-center rounded-full bg-[#1f7a4d] text-white"
            : "flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-gold-600"
        }
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="eyebrow mt-5 text-navy-700/50">{label}</p>
      <div className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-900">{children}</div>
    </>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group block h-full border border-navy-900/12 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_24px_50px_-26px_rgba(10,26,47,0.3)]"
    >
      {inner}
      <span className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
        Open
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  ) : (
    <div className="h-full border border-navy-900/12 bg-cream-50 p-7">{inner}</div>
  );
}

export default function Contact() {
  const wa = whatsappLink(
    site.contact.whatsapp,
    `Hello ${site.name}, I'd like to speak with an advisor.`,
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a person, not a portal."
        lead="An advisor picks up the phone during working hours. Outside them, WhatsApp is the fastest route and is usually answered the same evening."
        image={IMAGES.contactOffice}
      />

      {/* Contact cards */}
      <Section className="bg-cream-100 pb-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <ContactCard icon={WhatsAppIcon} label="WhatsApp" href={wa} accent>
              {site.contact.whatsapp}
              <span className="mt-1 block text-[0.78rem] text-navy-700/60">
                {site.contact.whatsappHours}
              </span>
            </ContactCard>
          </Reveal>

          <Reveal delay={80}>
            <ContactCard icon={PhoneIcon} label="Telephone" href={telLink(site.contact.phoneDisplay)}>
              {site.contact.phoneDisplay}
              <span className="mt-1 block text-[0.78rem] text-navy-700/60">
                Also {site.contact.phoneSecondaryDisplay}
              </span>
            </ContactCard>
          </Reveal>

          <Reveal delay={160}>
            <ContactCard
              icon={MailIcon}
              label="Email"
              href={`mailto:${site.contact.email}`}
            >
              {site.contact.email}
              <span className="mt-1 block text-[0.78rem] text-navy-700/60">
                Inspections: {site.contact.inspectionsEmail}
              </span>
            </ContactCard>
          </Reveal>

          <Reveal delay={240}>
            <ContactCard icon={PinIcon} label="Office" href={site.contact.mapUrl}>
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </ContactCard>
          </Reveal>
        </div>

        <Reveal delay={280}>
          <p className="mt-6 flex items-center gap-2 text-[0.75rem] text-navy-700/50">
            <ClockIcon className="h-4 w-4 text-gold-600" />
            Placeholder contact details for a fictional agency — replace in{" "}
            <code className="rounded bg-cream-200 px-1.5 py-0.5 text-[0.7rem]">src/data/site.ts</code>{" "}
            before any live use.
          </p>
        </Reveal>
      </Section>

      {/* Form + hours */}
      <Section className="bg-cream-100">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Enquiry</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.5rem]">
                Send us a brief.
              </h2>
              <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-navy-700/70">
                Budget, timeline, districts, non-negotiables. The more specific you are, the shorter
                the first reply.
              </p>
            </Reveal>

            <div className="mt-10">
              <InquiryForm variant="general" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="border border-navy-900/12 bg-navy-950 p-7 sm:p-9">
                <Eyebrow className="text-gold-400">Office hours</Eyebrow>
                <dl className="mt-6 space-y-4">
                  {[
                    { d: "Monday – Friday", h: "8:00am – 6:00pm" },
                    { d: "Saturday", h: "9:00am – 3:00pm" },
                    { d: "Sunday", h: "Inspections by arrangement" },
                    { d: "Public holidays", h: "Closed" },
                  ].map((row) => (
                    <div
                      key={row.d}
                      className="flex items-baseline justify-between gap-4 border-b border-cream-100/10 pb-4"
                    >
                      <dt className="text-[0.85rem] text-cream-200/75">{row.d}</dt>
                      <dd className="text-[0.85rem] text-cream-100">{row.h}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1f7a4d] px-5 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#196540]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message the advisory desk
                </a>

                <p className="mt-5 text-[0.72rem] leading-relaxed text-cream-300/45">
                  WhatsApp is our preferred channel for active instructions — photographs, documents
                  and viewing confirmations all travel through it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-6 overflow-hidden border border-navy-900/12">
                <img
                  src={IMAGES.riverAerial}
                  alt="Aerial view of a Lagos-side waterfront district, placeholder stock photography"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="bg-cream-50 p-6">
                  <Eyebrow>Finding us</Eyebrow>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-navy-800/75">
                    {site.contact.address.join(", ")}. Two minutes from the Ikoyi Club, with visitor
                    parking on the forecourt. The map link above is a placeholder.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Quick routes */}
      <Section className="border-t border-navy-900/10 bg-cream-200/50">
        <SectionHeading
          eyebrow="Shortcuts"
          title="What most people are here for."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              title: "Book an inspection",
              text: "Pick a date and we will build an afternoon itinerary around it.",
              to: "#/contact",
              cta: "Request a viewing",
            },
            {
              title: "Browse the portfolio",
              text: "Fourteen fictional listings with working filters and detail pages.",
              to: "/properties",
              cta: "Open listings",
            },
            {
              title: "Value a property",
              text: "A defensible open-market valuation, bank-acceptable format.",
              to: "/contact",
              cta: "Ask for a valuation",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="flex h-full flex-col border border-navy-900/12 bg-cream-50 p-7">
                <h3 className="font-display text-[1.35rem] leading-snug text-navy-900">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-navy-700/70">
                  {card.text}
                </p>
                <Button to={card.to.replace("#/", "/")} variant="outline" size="sm" className="mt-6 self-start">
                  {card.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-cream-100">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Before you write</Eyebrow>
              <h2 className="mt-4 text-[2rem] leading-[1.12] text-navy-900 sm:text-[2.4rem]">
                Frequently asked.
              </h2>
              <p className="mt-5 text-[0.92rem] leading-relaxed text-navy-700/70">
                The first question in this list explains what this website is.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </Section>
    </>
  );
}
