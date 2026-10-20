import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Link, useIsActive, useRouter } from "../lib/router";
import { site } from "../data/site";
import { whatsappLink } from "../lib/format";
import {
  CloseIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
  ChevronDown,
  ArrowRight,
} from "./Icons";
import { Container } from "./ui";

function NavLink({
  to,
  label,
  light,
  onClick,
}: {
  to: string;
  label: string;
  light: boolean;
  onClick?: () => void;
}) {
  const active = useIsActive(to);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "relative py-2 text-[0.74rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
        light ? "text-cream-100/85 hover:text-white" : "text-navy-800/80 hover:text-navy-950",
        active && (light ? "text-white" : "text-navy-950"),
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
          active ? "w-full" : "w-0",
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const overHero = path === "/";
  const light = overHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Publish the header height so pages can pad beneath a fixed bar. */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const sync = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    sync();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wa = whatsappLink(
    site.contact.whatsapp,
    `Hello ${site.name}, I'd like to speak with an advisor about a property.`,
  );

  return (
    <>
      <div ref={barRef} className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip */}
      <div className="hidden bg-navy-950 text-cream-200/70 lg:block">
        <Container className="flex h-10 items-center justify-between text-[0.68rem] tracking-[0.08em]">
          <div className="flex items-center gap-7">
            <a
              href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-cream-300/50">{site.contact.address[0]}, {site.contact.address[1]}</span>
            <span className="rounded-full border border-gold-500/40 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
              Demo · fictional data
            </span>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <header
        className={cn(
          "relative transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
          !overHero
            ? "border-b border-navy-900/10 bg-cream-100 py-3"
            : scrolled
              ? "border-b border-navy-900/10 bg-cream-100/92 py-3 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent py-5",
        )}
      >
        <Container className="flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-3.5" aria-label={`${site.name} home`}>
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center border transition-colors duration-500",
                light ? "border-cream-100/35" : "border-navy-900/20",
              )}
            >
              <span className="font-display text-[1.35rem] leading-none text-gold-500">
                {site.wordmarkTop.charAt(0)}
              </span>
            </span>
            <span className="leading-none">
              <span
                className={cn(
                  "block font-display text-[1.35rem] tracking-[0.2em] transition-colors duration-500",
                  light ? "text-cream-100" : "text-navy-900",
                )}
              >
                {site.wordmarkTop}
              </span>
              <span
                className={cn(
                  "mt-1 block text-[0.5rem] font-medium uppercase tracking-[0.42em] transition-colors duration-500",
                  light ? "text-cream-300/70" : "text-navy-700/55",
                )}
              >
                {site.wordmarkBottom}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {site.navigation.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} light={light} />
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all duration-300",
                light
                  ? "border-cream-100/30 text-cream-100 hover:border-gold-400 hover:text-gold-300"
                  : "border-navy-900/15 text-navy-800 hover:border-gold-500 hover:text-gold-600",
              )}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-950 transition-all duration-300 hover:bg-gold-400"
            >
              Book an inspection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center border transition-colors lg:hidden",
              light ? "border-cream-100/30 text-cream-100" : "border-navy-900/15 text-navy-900",
            )}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </Container>
      </header>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-navy-950 shadow-2xl transition-transform duration-500 [transition-timing-function:var(--ease-lux)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-cream-100/10 px-6 py-5">
            <span className="font-display text-lg tracking-[0.2em] text-cream-100">
              {site.wordmarkTop}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center border border-cream-100/20 text-cream-100"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-1">
              {site.navigation.map((item, i) => (
                <li
                  key={item.to}
                  style={{ transitionDelay: `${120 + i * 60}ms` }}
                  className={cn(
                    "border-b border-cream-100/8 transition-all duration-500",
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                  )}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-2xl text-cream-100"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-gold-500" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-500 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy-950"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-cream-100/25 px-6 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-cream-100"
              >
                Book an inspection
              </Link>
            </div>

            <div className="mt-10 space-y-2 text-[0.8rem] text-cream-200/60">
              <a href={`tel:${site.contact.phoneDisplay.replace(/\s/g, "")}`} className="block">
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block">
                {site.contact.email}
              </a>
              <p className="pt-3 text-[0.7rem] uppercase tracking-[0.2em] text-gold-400/80">
                Demo website · fictional listings
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
