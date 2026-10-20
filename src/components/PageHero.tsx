import type { ReactNode } from "react";
import { IMAGES } from "../data/images";
import { Container, Eyebrow, DemoPill } from "./ui";

/** Consistent interior-page header band. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image = IMAGES.cityAerial,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/90 to-navy-900/60" />
      <div className="grain absolute inset-0 opacity-[0.14] mix-blend-overlay" />

      <Container
        className="relative py-16 sm:py-20 lg:py-24"
        // Slide beneath the fixed header so the band runs edge to edge.
        style={{ marginTop: "calc(-1 * var(--header-h, 112px))", paddingTop: "calc(var(--header-h, 112px) + 3rem)" }}
      >
        <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
          <Eyebrow className="text-gold-400">{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-[2.3rem] leading-[1.08] text-cream-100 sm:text-[3rem] lg:text-[3.6rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream-200/70">
              {lead}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
          <div className="mt-8">
            <DemoPill className="border-gold-400/40 bg-gold-500/10 text-gold-300" />
          </div>
        </div>
      </Container>
    </section>
  );
}
