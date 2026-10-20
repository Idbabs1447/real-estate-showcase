import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { site } from "../data/site";
import { whatsappLink } from "../lib/format";
import { WhatsAppIcon, CloseIcon } from "./Icons";

/**
 * Floating WhatsApp action.
 * Appears on every route after a short scroll, with an expandable label
 * so the phone number is configurable from site.contact.whatsapp.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(() => setExpanded(false), 6000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  const href = whatsappLink(
    site.contact.whatsapp,
    `Hello ${site.name}, I'm browsing your listings and have a question.`,
  );

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 flex items-center gap-3 transition-all duration-500 [transition-timing-function:var(--ease-lux)] sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div
        className={cn(
          "hidden items-center gap-3 rounded-full border border-navy-900/10 bg-cream-50/95 py-2.5 pl-4 pr-3 shadow-[0_18px_44px_-18px_rgba(10,26,47,0.45)] backdrop-blur-md transition-all duration-500 sm:flex",
          expanded ? "w-auto opacity-100" : "pointer-events-none w-0 translate-x-4 overflow-hidden p-0 opacity-0",
        )}
      >
        <span className="whitespace-nowrap text-[0.72rem] leading-tight">
          <span className="block font-semibold text-navy-900">Talk to an advisor</span>
          <span className="block text-navy-700/60">{site.contact.whatsappHours}</span>
        </span>
        <button
          onClick={() => setExpanded(false)}
          aria-label="Dismiss"
          className="text-navy-700/40 transition-colors hover:text-navy-900"
        >
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message ${site.name} on WhatsApp`}
        onClick={() => setExpanded(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-[0_18px_40px_-14px_rgba(31,122,77,0.75)] transition-transform duration-300 hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1f7a4d] opacity-20 [animation-duration:2.8s]" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </a>
    </div>
  );
}
