import { site } from "../data/site";
import { IMAGES } from "../data/images";
import { whatsappLink } from "../lib/format";
import { Button, Container, Eyebrow, Reveal } from "./ui";
import { PhoneIcon, WhatsAppIcon, ArrowRight } from "./Icons";

/**
 * Reusable closing call-to-action band.
 * Deep navy, gold accents, WhatsApp + inspection form as the two actions.
 */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  message,
  showPhone = true,
  image = IMAGES.ctaVilla,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  message?: string;
  showPhone?: boolean;
  image?: string;
}) {
  const heading =
    title ?? "Arrange an accompanied viewing this week.";
  const copy =
    body ??
      "Tell us what you are looking for and we will come back with a shortlist, honest reservations and a proposed itinerary — usually inside one working day.";

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-900/70" />
      <div className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="text-gold-400">{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[2rem] leading-[1.12] text-cream-100 sm:text-[2.6rem] lg:text-[3.1rem]">
              {heading}
            </h2>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream-200/70">
              {copy}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="gold" size="lg" icon>
                Book an inspection
              </Button>
              <Button
                href={whatsappLink(
                  site.contact.whatsapp,
                  message ??
                    `Hello ${site.name}, I'd like to arrange a viewing this week.`,
                )}
                variant="light"
                size="lg"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp an advisor
              </Button>
              {showPhone && (
                <a
                  href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-[0.82rem] text-cream-200/70 transition-colors hover:text-gold-300"
                >
                  <PhoneIcon className="h-4 w-4 text-gold-400" />
                  {site.contact.phoneDisplay}
                </a>
              )}
            </div>

            <p className="mt-8 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-cream-300/40">
              <ArrowRight className="h-3.5 w-3.5 text-gold-500/70" />
              Demo website — no request is transmitted
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
