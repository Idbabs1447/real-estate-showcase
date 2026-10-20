import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const BedIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 11V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v4" />
    <path d="M2 11h20v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Z" />
    <path d="M2 16v2M22 16v2" />
    <path d="M6 11V9h3v2" />
  </svg>
);

export const BathIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
    <path d="M6 12V6a2 2 0 0 1 2-2c1.2 0 1.7.7 2 1.5" />
    <path d="M11 6.5h.01" />
    <path d="M7 19.5 6 22M17 19.5l1 2.5" />
  </svg>
);

export const AreaIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 3h7v7H3z" />
    <path d="M14 3h7v7h-7z" />
    <path d="M3 14h7v7H3z" />
    <path d="M14 14h7v7h-7z" />
  </svg>
);

export const CarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 16v3M19 16v3" />
    <path d="M3 13l1.6-4.6A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13v3H3v-3Z" />
    <path d="M6.5 16h.01M17.5 16h.01" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 12H4" />
    <path d="m10 18-6-6 6-6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.19.87 2.34.99 2.5.13.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5.5c0 4.5-3 7.9-7 9.5-4-1.6-7-5-7-9.5V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.3-7-9.3A4.2 4.2 0 0 1 12 7.7a4.2 4.2 0 0 1 7 3c0 5-7 9.3-7 9.3Z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8.5 13.4 11l2.6 1-2.6 1L12 15.5 10.6 13l-2.6-1 2.6-1L12 8.5Z" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
    <path d="m4 12 8 4.5 8-4.5" />
    <path d="m4 16.5 8 4.5 8-4.5" />
  </svg>
);

export const InfoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.8h.01" />
  </svg>
);

export const ExpandIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3H3v6M15 21h6v-6" />
    <path d="M3 3l7 7M21 21l-7-7" />
  </svg>
);
