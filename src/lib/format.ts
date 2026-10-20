/** Formatting helpers shared across the demo. */

const NGN = new Intl.NumberFormat("en-NG", {
  style: "decimal",
  maximumFractionDigits: 0,
});

export function formatNaira(value: number): string {
  return `₦${NGN.format(value)}`;
}

/** ₦480,000,000 -> ₦480M ; ₦22,000,000 -> ₦22M ; ₦7,500,000 -> ₦7.5M */
export function formatNairaShort(value: number): string {
  if (value >= 1_000_000_000) {
    const n = value / 1_000_000_000;
    return `₦${trim(n)}B`;
  }
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `₦${trim(n)}M`;
  }
  if (value >= 1_000) {
    const n = value / 1_000;
    return `₦${trim(n)}K`;
  }
  return `₦${value}`;
}

function trim(n: number): string {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function whatsappLink(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
