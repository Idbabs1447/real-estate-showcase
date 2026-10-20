import { useMemo } from "react";
import { usePropertyFilters, FilterPanel, ActiveChips, type FilterState } from "../components/Filters";
import { PropertyCard } from "../components/PropertyCard";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Button, Container, Reveal, Section } from "../components/ui";
import { IMAGES } from "../data/images";
import { properties } from "../data/properties";
import { Link } from "../lib/router";
import { ArrowRight, CloseIcon } from "../components/Icons";

function initialFromQuery(query: Record<string, string>): Partial<FilterState> {
  const init: Partial<FilterState> = {};
  if (query.intent === "sale" || query.intent === "rent") init.intent = query.intent;
  if (query.type) init.type = query.type;
  if (query.district) init.district = query.district;
  return init;
}

function EmptyState({ reset }: { reset: () => void }) {
  return (
    <div className="border border-navy-900/12 bg-cream-50 px-6 py-20 text-center sm:px-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/50 text-gold-600">
        <CloseIcon className="h-6 w-6" />
      </span>
      <h3 className="mt-6 font-display text-[1.7rem] text-navy-900">
        Nothing in the sample data matches that.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-navy-700/70">
        This demo carries {properties.length} fictional listings, so the filters run out of road
        quickly. Try widening the district or budget.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} variant="primary" size="md">
          Clear all filters
        </Button>
        <Button to="/contact" variant="outline" size="md">
          Brief us instead
        </Button>
      </div>
    </div>
  );
}

export default function Listings({ query }: { query: Record<string, string> }) {
  const init = useMemo(() => initialFromQuery(query), [query]);
  const { filters, set, reset, results } = usePropertyFilters(init);

  const heading =
    filters.intent === "rent"
      ? "Rentals across Lagos"
      : filters.intent === "sale"
        ? "Homes for sale"
        : "The portfolio";

  return (
    <>
      <PageHero
        eyebrow="Listings"
        title={heading}
        lead="Fourteen fictional properties across the Island and mainland corridors, with working filters and full detail pages. Prices, addresses and availability are all invented sample data."
        image={IMAGES.villaLawn}
      />

      <Section className="bg-cream-100 pt-14 sm:pt-16" inner="px-0 sm:px-0">
        <Container>
          <FilterPanel
            filters={filters}
            set={set}
            reset={reset}
            resultCount={results.length}
            total={properties.length}
          />
        </Container>

        <Container className="mt-7">
          <ActiveChips filters={filters} set={set} reset={reset} />
        </Container>

        <Container className="mt-8">
          {results.length === 0 ? (
            <EmptyState reset={reset} />
          ) : (
            <>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 90}>
                    <PropertyCard property={p} priority={i < 3} />
                  </Reveal>
                ))}
              </div>

              <div className="mt-14 flex flex-col items-center gap-5 border-t border-navy-900/10 pt-12 text-center">
                <p className="max-w-xl text-[0.86rem] leading-relaxed text-navy-700/65">
                  You have reached the end of the sample portfolio. In a live deployment this grid
                  would paginate or infinitely scroll against a real feed of instructions.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-navy-900"
                >
                  Ask for off-market options
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </>
          )}
        </Container>
      </Section>

      <CtaBand
        eyebrow="Cannot see it here?"
        title="Most of what we place never reaches a listing page."
        body="Send a brief and we will search the private network — off-market vendor situations, quiet landlords and pre-launch allocations — before you commit to anything public."
        message="Hello Azure Estates, I'd like you to search off-market for me."
      />
    </>
  );
}
