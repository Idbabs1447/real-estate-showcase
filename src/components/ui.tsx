import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";
import { Link } from "../lib/router";
import { site } from "../data/site";
import { whatsappLink } from "../lib/format";
import { WhatsAppIcon, ArrowRight } from "./Icons";

/* ── Layout ───────────────────────────────────────────── */

export function Container({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)} style={style}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  inner,
  children,
}: {
  id?: string;
  className?: string;
  inner?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      <Container className={inner}>{children}</Container>
    </section>
  );
}

/* ── Typography ───────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "eyebrow text-gold-600",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  action?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Eyebrow align={align} className="mb-4">
            {eyebrow}
          </Eyebrow>
        )}
        <h2
          className={cn(
            "text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-[3.15rem]",
            light ? "text-cream-100" : "text-navy-900",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-5 text-[0.98rem] leading-relaxed",
              light ? "text-navy-100/80" : "text-navy-700/75",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/* ── Reveal on scroll ─────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-lux)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ── Buttons ──────────────────────────────────────────── */

type Variant = "primary" | "outline" | "ghost" | "gold" | "light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-cream-100 hover:bg-navy-800 border border-navy-900 hover:border-navy-800",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 border border-gold-500 hover:border-gold-400 shadow-[0_14px_34px_-16px_rgba(184,149,90,0.7)]",
  outline:
    "border border-navy-900/25 text-navy-900 hover:border-navy-900/60 hover:bg-navy-900/[0.03]",
  light:
    "border border-cream-100/30 text-cream-100 hover:bg-cream-100/10 hover:border-cream-100/50 backdrop-blur-sm",
  ghost: "text-navy-800 hover:text-gold-600",
};

export type ButtonProps = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  to?: string;
  href?: string;
  className?: string;
  children: ReactNode;
  icon?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className,
  children,
  icon = false,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.04em] transition-all duration-300 [transition-timing-function:var(--ease-lux)] disabled:opacity-50",
    size === "sm" && "px-5 py-2.5 text-[0.72rem] uppercase",
    size === "md" && "px-6 py-3 text-[0.76rem] uppercase",
    size === "lg" && "px-8 py-4 text-[0.8rem] uppercase",
    variantClasses[variant],
    className,
  );

  const inner = (
    <>
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}

/* ── WhatsApp ─────────────────────────────────────────── */

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  variant = "gold",
  size = "md",
  className,
}: {
  message?: string;
  label?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const href = whatsappLink(
    site.contact.whatsapp,
    message ??
      `Hello ${site.name}, I found your website and would like to ask about a property.`,
  );
  return (
    <Button href={href} variant={variant} size={size} className={className}>
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </Button>
  );
}

/* ── Misc ─────────────────────────────────────────────── */

export function Badge({
  children,
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "navy" | "cream" | "outline" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold-500 text-navy-950",
    navy: "bg-navy-900 text-cream-100",
    cream: "bg-cream-100/95 text-navy-900 backdrop-blur-sm",
    outline: "border border-navy-900/15 text-navy-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DemoPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gold-300/70 bg-gold-50 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-700",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      Fictional demo data
    </span>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline h-px w-full", className)} />;
}

export function StatBlock({
  value,
  label,
  tone = "dark",
}: {
  value: string;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <div>
      <p
        className={cn(
          "font-display text-[2.1rem] leading-none sm:text-[2.5rem]",
          tone === "light" ? "text-cream-100" : "text-navy-900",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-2.5 text-[0.68rem] uppercase tracking-[0.2em]",
          tone === "light" ? "text-cream-300/70" : "text-navy-700/60",
        )}
      >
        {label}
      </p>
    </div>
  );
}
