import { useState, type FormEvent } from "react";
import { cn } from "../utils/cn";
import { site } from "../data/site";
import { whatsappLink } from "../lib/format";
import { CheckIcon, InfoIcon, WhatsAppIcon } from "./Icons";
import { Button } from "./ui";

type Variant = "inspection" | "general" | "valuation";

const inputClass =
  "w-full border border-navy-900/15 bg-cream-50 px-4 py-3 text-[0.88rem] text-navy-900 placeholder:text-navy-700/35 transition-colors duration-300 hover:border-navy-900/30 focus:border-gold-500 focus:outline-none";

const labelClass =
  "mb-2 block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy-700/55";

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[0.72rem] text-[#a5412f]">{children}</p>;
}

export function InquiryForm({
  variant = "inspection",
  subject,
  compact = false,
  className,
}: {
  variant?: Variant;
  /** e.g. the property title, shown back to the user */
  subject?: string;
  compact?: boolean;
  className?: string;
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "Morning (9am – 12pm)",
    budget: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "A valid email address is required.";
    if (values.phone.replace(/\D/g, "").length < 7)
      next.phone = "Please include a phone number we can reach you on.";
    if (variant === "inspection" && !values.date) next.date = "Choose a preferred date.";
    if (!values.consent) next.consent = "Please acknowledge the demo notice to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    // No backend is connected — deliberately do nothing except confirm in the UI.
    setSubmitted(true);
  };

  const headline =
    variant === "inspection"
      ? "Request an inspection"
      : variant === "valuation"
        ? "Request a valuation"
        : "Send an enquiry";

  const waMessage =
    variant === "inspection"
      ? `Hello ${site.name}, I'd like to book an inspection${subject ? ` for ${subject}` : ""}. My preferred date is ${values.date || "flexible"} (${values.time}).`
      : `Hello ${site.name}, I'd like to make an enquiry${subject ? ` about ${subject}` : ""}.`;

  if (submitted) {
    return (
      <div
        className={cn(
          "border border-gold-300/70 bg-gold-50 p-7 sm:p-9",
          className,
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-navy-950">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-[1.6rem] leading-tight text-navy-900">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-navy-800/75">
          This is where a live site would hand your request to an advisor
          {subject ? ` for ${subject}` : ""} and send a confirmation to{" "}
          <span className="font-medium text-navy-900">{values.email}</span>.
        </p>

        <div className="mt-6 flex gap-3 border-l-2 border-gold-400 bg-cream-50/80 p-4">
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          <p className="text-[0.78rem] leading-relaxed text-navy-800/70">
            <span className="font-semibold uppercase tracking-[0.14em] text-gold-700">
              Demo only.
            </span>{" "}
            No backend is configured, so nothing was sent, stored or delivered anywhere. Your
            entries stayed inside this browser tab and will disappear when you leave the page.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            href={whatsappLink(site.contact.whatsapp, waMessage)}
            variant="gold"
            size="sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Continue on WhatsApp
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            Edit the form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} noValidate>
      <div className="mb-6 flex gap-3 border-l-2 border-gold-400 bg-gold-50/70 p-4">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        <p className="text-[0.75rem] leading-relaxed text-navy-800/75">
          <span className="font-semibold uppercase tracking-[0.14em] text-gold-700">
            Demo form.
          </span>{" "}
          Nothing you type here is submitted or stored — there is no backend connected. Use the
          WhatsApp button if you want to see how the real hand-off would work.
        </p>
      </div>

      <div className={cn("grid gap-5", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <label className="block">
          <span className={labelClass}>Full name</span>
          <input
            className={cn(inputClass, errors.name && "border-[#a5412f]")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Adaeze Okonkwo"
            autoComplete="name"
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </label>

        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            className={cn(inputClass, errors.email && "border-[#a5412f]")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </label>

        <label className="block">
          <span className={labelClass}>Phone / WhatsApp</span>
          <input
            type="tel"
            className={cn(inputClass, errors.phone && "border-[#a5412f]")}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+234 800 000 0000"
            autoComplete="tel"
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </label>

        {variant === "inspection" ? (
          <>
            <label className="block">
              <span className={labelClass}>Preferred date</span>
              <input
                type="date"
                className={cn(inputClass, errors.date && "border-[#a5412f]")}
                value={values.date}
                onChange={(e) => update("date", e.target.value)}
              />
              {errors.date && <ErrorText>{errors.date}</ErrorText>}
            </label>
            <label className="block">
              <span className={labelClass}>Preferred time</span>
              <select
                className={inputClass}
                value={values.time}
                onChange={(e) => update("time", e.target.value)}
              >
                <option>Morning (9am – 12pm)</option>
                <option>Afternoon (12pm – 4pm)</option>
                <option>Late afternoon (4pm – 6pm)</option>
                <option>Saturday</option>
                <option>Flexible — advise me</option>
              </select>
            </label>
          </>
        ) : (
          <label className="block">
            <span className={labelClass}>
              {variant === "valuation" ? "Property address" : "Subject"}
            </span>
            <input
              className={inputClass}
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              placeholder={variant === "valuation" ? "14b Kingsway Road, Old Ikoyi" : "General enquiry"}
            />
          </label>
        )}

        <label className="block sm:col-span-2">
          <span className={labelClass}>Anything we should know?</span>
          <textarea
            rows={compact ? 3 : 4}
            className={cn(inputClass, "resize-none")}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={
              subject
                ? `I'd like to view ${subject}. I'm available most weekday afternoons…`
                : "Tell us about the property you're looking for, your timeline and your budget range…"
            }
          />
        </label>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#b8955a]"
        />
        <span className="text-[0.75rem] leading-relaxed text-navy-800/70">
          I understand this is a demonstration website for a fictional agency, that the listings
          and prices shown are sample data, and that this form does not send anything to anyone.
        </span>
      </label>
      {errors.consent && <ErrorText>{errors.consent}</ErrorText>}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="lg">
          {headline}
        </Button>
        <Button
          href={whatsappLink(site.contact.whatsapp, waMessage)}
          variant="gold"
          size="lg"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp instead
        </Button>
      </div>
    </form>
  );
}
