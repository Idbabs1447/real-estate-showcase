import { Link } from "../lib/router";
import { site } from "../data/site";
import { PHOTO_CREDIT } from "../data/images";
import { whatsappLink } from "../lib/format";
import { Container, Hairline } from "./ui";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon, ArrowRight } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappLink(
    site.contact.whatsapp,
    `Hello ${site.name}, I'd like to enquire about your services.`,
  );

  return (
    <footer className="bg-navy-950 text-cream-200">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center border border-cream-100/25">
                <span className="font-display text-[1.35rem] leading-none text-gold-500">
                  {site.wordmarkTop.charAt(0)}
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-display text-[1.35rem] tracking-[0.2em] text-cream-100">
                  {site.wordmarkTop}
                </span>
                <span className="mt-1 block text-[0.5rem] font-medium uppercase tracking-[0.42em] text-cream-300/60">
                  {site.wordmarkBottom}
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-cream-200/65">
              {site.footer.blurb}
            </p>
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-gold-400/80">
              {site.established}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-100/20 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream-100 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-950 transition-colors hover:bg-gold-400"
              >
                Book an inspection
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-cream-300/50">{site.footer.columns.explore}</h3>
            <ul className="mt-5 space-y-3 text-[0.9rem]">
              {site.navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-cream-200/75 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/properties?intent=rent"
                  className="text-cream-200/75 transition-colors hover:text-gold-300"
                >
                  Rentals
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?intent=sale"
                  className="text-cream-200/75 transition-colors hover:text-gold-300"
                >
                  For sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-cream-300/50">{site.footer.columns.servicesLabel}</h3>
            <ul className="mt-5 space-y-3 text-[0.9rem]">
              {site.services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-cream-200/75 transition-colors hover:text-gold-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-cream-300/50">{site.footer.columns.contactLabel}</h3>
            <ul className="mt-5 space-y-4 text-[0.9rem] text-cream-200/75">
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/80" />
                <span>
                  {site.contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/80" />
                <a
                  href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/80" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-gold-300"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.75rem] leading-relaxed text-cream-300/45">
              WhatsApp {site.contact.whatsappHours}
            </p>
          </div>
        </div>

        <Hairline className="my-12 opacity-40" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-2xl text-[0.72rem] leading-relaxed text-cream-300/40">
            <span className="font-semibold uppercase tracking-[0.16em] text-gold-400/70">
              Demo disclosure.{" "}
            </span>
            {site.name} is a fictional agency created for a design demonstration. Every property,
            price, address, reference number, availability status and statistic on this site is
            invented sample data. Forms do not send anything — there is no backend connected.
            Placeholder contact details should be replaced before any live use.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.72rem] text-cream-300/40">
            <span>
              © {year} {site.name} (demo)
            </span>
            {site.footer.legal.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-gold-300">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-[0.65rem] leading-relaxed text-cream-300/25">
          {PHOTO_CREDIT}
        </p>
      </Container>
    </footer>
  );
}
