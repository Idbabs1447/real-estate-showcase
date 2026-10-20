import { useMemo, useState } from "react";
import { cn } from "../utils/cn";
import { properties, districts, PROPERTY_TYPES, type Property } from "../data/properties";
import { formatNairaShort } from "../lib/format";
import { ChevronDown, CloseIcon, SearchIcon } from "./Icons";

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "largest" | "bedrooms";

export type FilterState = {
  q: string;
  intent: "all" | "sale" | "rent";
  type: string;
  district: string;
  beds: number;
  budget: string;
  sort: SortKey;
};

export const emptyFilters: FilterState = {
  q: "",
  intent: "all",
  type: "any",
  district: "any",
  beds: 0,
  budget: "any",
  sort: "featured",
};

const SALE_BUDGETS: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "any", label: "Any budget" },
  { value: "b1", label: "Under ₦100m", max: 100_000_000 },
  { value: "b2", label: "₦100m – ₦250m", min: 100_000_000, max: 250_000_000 },
  { value: "b3", label: "₦250m – ₦500m", min: 250_000_000, max: 500_000_000 },
  { value: "b4", label: "₦500m and above", min: 500_000_000 },
];

const RENT_BUDGETS: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "any", label: "Any budget" },
  { value: "b1", label: "Under ₦10m / yr", max: 10_000_000 },
  { value: "b2", label: "₦10m – ₦25m / yr", min: 10_000_000, max: 25_000_000 },
  { value: "b3", label: "₦25m – ₦60m / yr", min: 25_000_000, max: 60_000_000 },
  { value: "b4", label: "₦60m and above / yr", min: 60_000_000 },
];

export function budgetOptions(intent: FilterState["intent"]) {
  return intent === "rent" ? RENT_BUDGETS : SALE_BUDGETS;
}

export function countActive(f: FilterState): number {
  let n = 0;
  if (f.q.trim()) n++;
  if (f.intent !== "all") n++;
  if (f.type !== "any") n++;
  if (f.district !== "any") n++;
  if (f.beds > 0) n++;
  if (f.budget !== "any") n++;
  return n;
}

export function usePropertyFilters(initial?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({ ...emptyFilters, ...initial });

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Keep the budget choice valid when switching intent.
      if (key === "intent") {
        const valid = budgetOptions(next.intent).some((b) => b.value === next.budget);
        if (!valid) next.budget = "any";
      }
      return next;
    });
  };

  const reset = () => setFilters({ ...emptyFilters, sort: filters.sort });

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const budget = budgetOptions(filters.intent).find((b) => b.value === filters.budget);

    const list = properties.filter((p) => {
      if (filters.intent !== "all" && p.intent !== filters.intent) return false;
      if (filters.type !== "any" && p.type !== filters.type) return false;
      if (filters.district !== "any" && p.district !== filters.district) return false;
      if (filters.beds > 0 && p.bedrooms < filters.beds) return false;
      if (budget?.min !== undefined && p.price < budget.min) return false;
      if (budget?.max !== undefined && p.price > budget.max) return false;
      if (q) {
        const haystack = [
          p.title,
          p.street,
          p.district,
          p.region,
          p.type,
          p.ref,
          p.summary,
          ...p.features,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (filters.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort((a, b) => +new Date(b.listed) - +new Date(a.listed));
        break;
      case "largest":
        sorted.sort((a, b) => b.sizeSqm - a.sizeSqm);
        break;
      case "bedrooms":
        sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        sorted.sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured) || +new Date(b.listed) - +new Date(a.listed),
        );
    }
    return sorted;
  }, [filters]);

  return { filters, set, reset, results };
}

/* ── UI ────────────────────────────────────────────────── */

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy-700/55">
        {label}
      </span>
      {children}
    </label>
  );
}

const controlClass =
  "w-full appearance-none rounded-none border border-navy-900/15 bg-cream-50 px-4 py-3 pr-10 text-[0.86rem] text-navy-900 transition-colors duration-300 hover:border-navy-900/30 focus:border-gold-500 focus:outline-none";

function Select({
  value,
  onChange,
  children,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={controlClass}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/45" />
    </div>
  );
}

export function FilterPanel({
  filters,
  set,
  reset,
  resultCount,
  total,
}: {
  filters: FilterState;
  set: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  reset: () => void;
  resultCount: number;
  total: number;
}) {
  const active = countActive(filters);
  const budgets = budgetOptions(filters.intent);

  return (
    <div className="border border-navy-900/12 bg-cream-50 p-5 sm:p-6">
      {/* Search */}
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/40" />
        <input
          type="search"
          value={filters.q}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Search by name, district, road, type or reference…"
          aria-label="Search properties"
          className="w-full border border-navy-900/15 bg-cream-50 py-3.5 pl-11 pr-4 text-[0.86rem] text-navy-900 placeholder:text-navy-700/40 transition-colors duration-300 hover:border-navy-900/30 focus:border-gold-500 focus:outline-none"
        />
      </div>

      {/* Intent segmented control */}
      <div className="mt-5 grid grid-cols-3 gap-0 border border-navy-900/15">
        {(
          [
            { value: "all", label: "All" },
            { value: "sale", label: "For sale" },
            { value: "rent", label: "To let" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            onClick={() => set("intent", opt.value)}
            aria-pressed={filters.intent === opt.value}
            className={cn(
              "py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
              filters.intent === opt.value
                ? "bg-navy-900 text-cream-100"
                : "bg-cream-50 text-navy-700/65 hover:bg-cream-200/70 hover:text-navy-900",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Dropdown grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Property type">
          <Select value={filters.type} onChange={(v) => set("type", v)} ariaLabel="Property type">
            <option value="any">Any type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="District">
          <Select value={filters.district} onChange={(v) => set("district", v)} ariaLabel="District">
            <option value="any">Anywhere in Lagos</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Bedrooms">
          <Select
            value={String(filters.beds)}
            onChange={(v) => set("beds", Number(v))}
            ariaLabel="Minimum bedrooms"
          >
            <option value="0">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ bedrooms
              </option>
            ))}
          </Select>
        </Field>

        <Field label={filters.intent === "rent" ? "Annual rent" : "Budget"}>
          <Select value={filters.budget} onChange={(v) => set("budget", v)} ariaLabel="Budget">
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {/* Footer row */}
      <div className="mt-5 flex flex-col gap-4 border-t border-navy-900/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-navy-700/70">
          Showing{" "}
          <span className="font-semibold text-navy-900">{resultCount}</span> of {total}{" "}
          <span className="text-navy-700/50">sample listings</span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filters.sort} onChange={(v) => set("sort", v as SortKey)} ariaLabel="Sort">
            <option value="featured">Sort · Featured</option>
            <option value="newest">Sort · Most recent</option>
            <option value="price-asc">Sort · Price, low to high</option>
            <option value="price-desc">Sort · Price, high to low</option>
            <option value="largest">Sort · Largest first</option>
            <option value="bedrooms">Sort · Most bedrooms</option>
          </Select>
          <button
            onClick={reset}
            disabled={active === 0}
            className={cn(
              "whitespace-nowrap px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors",
              active === 0
                ? "cursor-not-allowed text-navy-700/25"
                : "text-gold-600 hover:text-gold-700",
            )}
          >
            Clear filters{active > 0 ? ` (${active})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActiveChips({
  filters,
  set,
  reset,
}: {
  filters: FilterState;
  set: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  reset: () => void;
}) {
  const chips: { key: keyof FilterState; label: string; clear: () => void }[] = [];
  if (filters.q.trim())
    chips.push({
      key: "q",
      label: `“${filters.q.trim()}”`,
      clear: () => set("q", ""),
    });
  if (filters.intent !== "all")
    chips.push({
      key: "intent",
      label: filters.intent === "sale" ? "For sale" : "To let",
      clear: () => set("intent", "all"),
    });
  if (filters.type !== "any")
    chips.push({ key: "type", label: filters.type, clear: () => set("type", "any") });
  if (filters.district !== "any")
    chips.push({
      key: "district",
      label: filters.district,
      clear: () => set("district", "any"),
    });
  if (filters.beds > 0)
    chips.push({
      key: "beds",
      label: `${filters.beds}+ beds`,
      clear: () => set("beds", 0),
    });
  if (filters.budget !== "any") {
    const b = budgetOptions(filters.intent).find((x) => x.value === filters.budget);
    chips.push({
      key: "budget",
      label: b?.label ?? "",
      clear: () => set("budget", "any"),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={chip.clear}
          className="group inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-cream-50 px-3.5 py-1.5 text-[0.72rem] text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-700"
        >
          {chip.label}
          <CloseIcon className="h-3 w-3 opacity-45 transition-opacity group-hover:opacity-100" />
        </button>
      ))}
      <button
        onClick={reset}
        className="ml-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-600 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

export function priceRangeLabel(list: Property[]) {
  if (list.length === 0) return null;
  const prices = list.map((p) => p.price);
  return `${formatNairaShort(Math.min(...prices))} – ${formatNairaShort(Math.max(...prices))}`;
}
