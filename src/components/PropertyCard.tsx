import { useState } from "react";
import { cn } from "../utils/cn";
import { Link } from "../lib/router";
import { formatNaira, formatNairaShort } from "../lib/format";
import type { Property } from "../data/properties";
import { AreaIcon, BathIcon, BedIcon, CarIcon, HeartIcon, PinIcon, ArrowRight } from "./Icons";
import { Badge } from "./ui";

export function PropertySpecs({
  property,
  className,
  tone = "dark",
  compact = false,
}: {
  property: Property;
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const items = [
    property.bedrooms > 0 && { icon: BedIcon, value: `${property.bedrooms}` , label: "beds" },
    property.bathrooms > 0 && { icon: BathIcon, value: `${property.bathrooms}`, label: "baths" },
    { icon: AreaIcon, value: `${property.sizeSqm.toLocaleString()}`, label: "sqm" },
    property.parking > 0 && { icon: CarIcon, value: `${property.parking}`, label: "parking" },
  ].filter(Boolean) as { icon: typeof BedIcon; value: string; label: string }[];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center",
        compact ? "gap-x-4 gap-y-1.5" : "gap-x-5 gap-y-2",
        className,
      )}
    >
      {items.map(({ icon: Icon, value, label }) => (
        <span
          key={label}
          className={cn(
            "inline-flex items-center gap-1.5",
            compact ? "text-[0.72rem]" : "text-[0.78rem]",
            tone === "light" ? "text-cream-200/80" : "text-navy-700/75",
          )}
        >
          <Icon className="h-[15px] w-[15px] text-gold-600/80" />
          <span className="font-medium">{value}</span>
          <span className="opacity-55">{label}</span>
        </span>
      ))}
    </div>
  );
}

export function PropertyPrice({
  property,
  className,
  size = "md",
}: {
  property: Property;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span
        className={cn(
          "font-display font-medium tracking-tight text-navy-900",
          size === "sm" && "text-xl",
          size === "md" && "text-[1.6rem]",
          size === "lg" && "text-[2.1rem]",
        )}
      >
        {formatNaira(property.price)}
      </span>
      {property.priceNote && (
        <span className="text-[0.68rem] uppercase tracking-[0.14em] text-navy-700/55">
          {property.priceNote}
        </span>
      )}
    </p>
  );
}

export function PropertyCard({
  property,
  layout = "grid",
  priority = false,
}: {
  property: Property;
  layout?: "grid" | "row";
  priority?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const isRow = layout === "row";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-navy-900/10 bg-cream-50 transition-all duration-500 [transition-timing-function:var(--ease-lux)] hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-[0_30px_70px_-32px_rgba(10,26,47,0.35)]",
        isRow && "sm:flex-row",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-navy-900",
          isRow ? "aspect-[4/3] sm:aspect-auto sm:w-[42%]" : "aspect-[4/3]",
        )}
      >
        <Link
          to={`/property/${property.id}`}
          className="absolute inset-0 block"
          aria-label={`View ${property.title}`}
        >
          <img
            src={property.images[0].src}
            alt={property.images[0].alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <Badge tone={property.intent === "sale" ? "cream" : "gold"}>
            {property.intent === "sale" ? "For sale" : "To let"}
          </Badge>
          {property.status === "New" && (
            <span className="inline-flex items-center rounded-full bg-navy-950/85 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
              New
            </span>
          )}
          {property.status === "Under Offer" && (
            <span className="inline-flex items-center rounded-full bg-navy-950/85 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-cream-200 backdrop-blur-sm">
              Under offer
            </span>
          )}
        </div>

        {/* Save */}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
          aria-pressed={saved}
          className={cn(
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300",
            saved
              ? "border-gold-400 bg-gold-500 text-navy-950"
              : "border-cream-100/40 bg-navy-950/30 text-cream-100 hover:border-gold-300 hover:text-gold-300",
          )}
        >
          <HeartIcon className={cn("h-4 w-4", saved && "fill-current")} />
        </button>

        {/* Price overlay on image */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="font-display text-[1.15rem] tracking-tight text-cream-50 drop-shadow-sm">
            {formatNairaShort(property.price)}
            {property.intent === "rent" && (
              <span className="ml-1 text-[0.65rem] uppercase tracking-[0.16em] text-cream-200/80">
                / yr
              </span>
            )}
          </span>
          <span className="translate-y-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-100/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-cream-100">
            View
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", isRow && "sm:p-7")}>
        <p className="flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-gold-600">
          <PinIcon className="h-3.5 w-3.5" />
          {property.district} · {property.region}
        </p>

        <h3
          className={cn(
            "mt-2.5 font-display leading-snug text-navy-900 transition-colors duration-300 group-hover:text-navy-700",
            isRow ? "text-[1.55rem]" : "text-[1.4rem]",
          )}
        >
          <Link to={`/property/${property.id}`} className="hover:text-gold-700">
            {property.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-2 text-[0.85rem] leading-relaxed text-navy-700/70",
            isRow ? "sm:pr-4" : "line-clamp-2",
          )}
        >
          {property.summary}
        </p>

        <div className="mt-4">
          <PropertySpecs property={property} />
        </div>

        <div className="mt-5 flex flex-1 items-end justify-between gap-4 border-t border-navy-900/8 pt-5">
          <div>
            <PropertyPrice property={property} size="sm" />
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-navy-700/45">
              Ref {property.ref} · {property.type}
            </p>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-navy-800 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950"
            aria-label={`Open ${property.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
