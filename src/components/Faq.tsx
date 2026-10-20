import { useState } from "react";
import { cn } from "../utils/cn";
import { site } from "../data/site";
import { Reveal } from "./ui";
import { ChevronDown } from "./Icons";

export function Faq({
  items = site.faqs,
  columns = 1,
  tone = "dark",
}: {
  items?: readonly { q: string; a: string }[];
  columns?: 1 | 2;
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const light = tone === "light";

  return (
    <div className={cn(columns === 2 && "lg:grid lg:grid-cols-2 lg:gap-x-12")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 60}>
            <div
              className={cn(
                "border-b",
                light ? "border-cream-100/12" : "border-navy-900/10",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-[1.18rem] leading-snug transition-colors duration-300 sm:text-[1.28rem]",
                    light
                      ? isOpen
                        ? "text-gold-300"
                        : "text-cream-100"
                      : isOpen
                        ? "text-gold-700"
                        : "text-navy-900",
                  )}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-lux)]",
                    light ? "text-gold-400" : "text-gold-600",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p
                  className={cn(
                    "min-h-0 pr-10 text-[0.88rem] leading-relaxed",
                    light ? "text-cream-200/70" : "text-navy-700/75",
                  )}
                >
                  <span className="block pb-6">{item.a}</span>
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
