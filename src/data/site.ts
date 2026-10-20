import { IMAGES } from "./images";

/**
 * ─────────────────────────────────────────────────────────────
 *  BRAND / CLIENT CONFIGURATION
 *  Everything an agency would want to rebrand lives in this file.
 *  Swap the values here and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Azure Estates",
  wordmarkTop: "AZURE",
  wordmarkBottom: "ESTATES",
  tagline: "Lagos Property Consultants",
  established: "Founded 2011",

  /** Placeholder contact details — replace before going live. */
  contact: {
    phoneDisplay: "+234 801 234 5678",
    phoneSecondaryDisplay: "+234 901 555 0192",
    whatsapp: "+234 801 234 5678",
    whatsappHours: "Mon–Sat, 8:00am – 7:00pm (WAT)",
    email: "hello@azureestates.example",
    inspectionsEmail: "inspections@azureestates.example",
    address: [
      "14b Kingsway Road",
      "Old Ikoyi, Lagos",
      "Nigeria",
    ],
    mapUrl: "https://maps.google.com/?q=Kingsway+Road+Old+Ikoyi+Lagos",
  },

  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
  ],

  navigation: [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/properties" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ],

  homeHero: {
    eyebrow: "Ikoyi · Victoria Island · Lekki · Ikeja",
    titleLine1: "Considered homes for",
    titleLine2: "considered lives.",
    subtitle:
      "A boutique Lagos consultancy representing a deliberately small portfolio of residences, investment assets and land — handled personally, start to finish.",
    primaryCta: { label: "Browse the portfolio", to: "/properties" },
    secondaryCta: { label: "Book an inspection", to: "/contact" },
    image: IMAGES.hero,
    stats: [
      { value: "148", label: "Residences placed" },
      { value: "₦42B+", label: "Transaction value" },
      { value: "9", label: "Lagos districts" },
      { value: "1:12", label: "Client-to-advisor ratio" },
    ],
  },

  about: {
    eyebrow: "The practice",
    heading: "A small desk, deliberately.",
    lead:
      "Azure Estates was set up in 2011 by three advisors who were tired of volume. We cap our active listings so that every seller, landlord and buyer gets a partner who has actually walked the property.",
    body: [
      "We work across Lagos Island and the mainland corridors that hold value: Old Ikoyi, Banana Island, Victoria Island, Lekki Phase 1 and Ikate, Oniru, Ikeja GRA, Magodo and the faster-moving Ajah and Epe corridors.",
      "Our buyers range from first-time apartment hunters at ₦75m to family offices acquiring a fourth asset. What they have in common is that they want to be told the truth about a property — the flood history, the service charge reality, the title — before they fall in love with it.",
    ],
    values: [
      {
        title: "Verification first",
        text: "Title search, survey coordinates and charge history are reviewed before a listing is published. If we cannot verify it, we do not list it.",
      },
      {
        title: "Capped portfolio",
        text: "No advisor carries more than twelve active instructions. It is the only way inspections, reporting and negotiation stay personal.",
      },
      {
        title: "Plain language",
        text: "You will receive the same summary our own directors would want: price, condition, comparables, risk, and a recommendation.",
      },
      {
        title: "After the keys",
        text: "Handover is the halfway point. We stay on for documentation, fit-out vendors, staffing and the first year of ownership.",
      },
    ],
    image: IMAGES.aboutInterior,
    portrait: IMAGES.aboutPortrait,
  },

  services: [
    {
      id: "buying",
      title: "Buyer representation",
           price: "From 2.5% of purchase",
      summary:
        "Search, shortlist, verify and negotiate on your behalf — including off-market opportunities that never reach a portal.",
      points: [
        "Off-market search across our private network",
        "Title and survey verification before offer",
        "Comparable pricing analysis per district",
        "Negotiation, escrow coordination and completion",
      ],
      image: IMAGES.consultation,
    },
    {
      id: "letting",
      title: "Letting & tenant placement",
      price: "From 10% per annum",
      summary:
        "Marketing, vetting and placement for landlords, with a maintenance desk that answers the phone.",
      points: [
        "Photography, floorplans and listing copy",
        "Employment and reference checks",
        "Inventory and condition report at check-in",
        "Rent collection and arrears management",
      ],
      image: IMAGES.lounge,
    },
    {
      id: "advisory",
      title: "Investment advisory",
      price: "Retainer or per mandate",
      summary:
        "Yield modelling and portfolio structuring for diaspora and institutional buyers entering Lagos.",
      points: [
        "Gross-to-net yield modelling, naira and USD",
        "District-level absorption and pricing data",
        "Off-plan vs. completed risk assessment",
        "Quarterly portfolio performance reporting",
      ],
      image: IMAGES.cityAerial,
    },
    {
      id: "management",
      title: "Property management",
      price: "From 8% per annum",
      summary:
        "A single point of accountability for owners who are abroad, or simply busy.",
      points: [
        "Vetted vendor panel: plumbing, power, AC, pools",
        "Preventive maintenance calendar",
        "Service charge auditing on managed estates",
        "Annual condition reports with photographs",
      ],
      image: IMAGES.poolEvening,
    },
    {
      id: "valuation",
      title: "Valuation & appraisal",
      price: "From ₦350,000",
      summary:
        "Defensible open-market valuations prepared for banks, boards, probate and disputes.",
      points: [
        "NIESV-aligned reporting format",
        "Bank-acceptable valuation certificates",
        "Insurance replacement cost estimates",
        "Rental appraisal with void assumptions",
      ],
      image: IMAGES.walkthrough,
    },
    {
      id: "relocation",
      title: "Relocation & diaspora desk",
      price: "Bespoke",
      summary:
        "For returning families and executives: neighbourhood orientation to signed lease in one trip.",
      points: [
        "School, commute and clinic mapping",
        "Two-day accompanied viewing itinerary",
        "Power, water and connectivity due diligence",
        "Remote video walkthroughs before you fly",
      ],
      image: IMAGES.keysHandover,
    },
  ],

  faqs: [
    {
      q: "Is this a real estate agency?",
      a: "This website is a design demonstration. Azure Estates is a fictional Lagos agency, and every listing, price, address and figure shown here is invented sample data. Nothing on this site is an offer, and no submission is delivered anywhere.",
    },
    {
      q: "How do you verify a property's title?",
      a: "In a live engagement we would pull the registered title, confirm survey coordinates against the Lagos State gazette, and check for encumbrances, unpaid consent fees and estate charge arrears before a listing goes public. On this demo we simply state the process.",
    },
    {
      q: "What does an inspection visit involve?",
      a: "A scheduled walkthrough of one to four properties in a single afternoon, led by the advisor carrying the instruction, with a written summary and comparable pricing sent within 48 hours. Requesting one on this demo will show you the form flow but will not contact anyone.",
    },
    {
      q: "Do you handle properties outside Lagos?",
      a: "The practice is deliberately Lagos-only — Island and the stronger mainland corridors. For Abuja, Port Harcourt or Accra mandates we refer to a small panel of vetted partners and stay involved as your advocate.",
    },
    {
      q: "How are you paid?",
      a: "Sellers and landlords pay a success fee on completion. Buyers pay a representation fee, disclosed in writing before we begin. Valuations and advisory retainers are quoted up front. There are no hidden listing or marketing charges.",
    },
    {
      q: "Can I rent before I arrive in Nigeria?",
      a: "Yes, in the ordinary case — with a video walkthrough, a referenced local guarantor or corporate tenant structure, and a check-in inventory conducted on your behalf. This demo does not process any of that.",
    },
  ],

  process: [
    {
      step: "01",
      title: "Brief",
      text: "A 45-minute conversation about budget, timing, schools, commute and the things you will not compromise on.",
    },
    {
      step: "02",
      title: "Shortlist",
      text: "Three to six properties, each with photographs, title status, service charges and our honest reservations.",
    },
    {
      step: "03",
      title: "Inspect",
      text: "An accompanied itinerary, usually one afternoon, with power, water and flood checks done on site.",
    },
    {
      step: "04",
      title: "Close",
      text: "Negotiation, verification, documentation and handover — then a year of aftercare.",
    },
  ],

  districts: [
    { name: "Old Ikoyi", note: "Colonial-era plots, mature canopy" },
    { name: "Banana Island", note: "Gated, waterfront, high value" },
    { name: "Victoria Island", note: "Business district core" },
    { name: "Eko Atlantic", note: "New-build, engineered land" },
    { name: "Lekki Phase 1", note: "Terraces and family homes" },
    { name: "Ikate", note: "Modern builds, strong demand" },
    { name: "Oniru", note: "Coastal apartments" },
    { name: "Ikeja GRA", note: "Mainland quiet, established" },
    { name: "Magodo Phase 2", note: "Planned estate living" },
    { name: "Ajah", note: "Growth corridor value" },
    { name: "Yaba", note: "Tech cluster rentals" },
    { name: "Epe", note: "Land and acreage" },
  ],

  footer: {
    blurb:
      "A boutique property consultancy working across Lagos Island and the mainland's established corridors.",
    columns: {
      explore: "Explore",
      servicesLabel: "Services",
      contactLabel: "Contact",
    },
    legal: [
      { label: "Privacy notice", to: "/legal" },
      { label: "Terms of use", to: "/legal" },
      { label: "Demo disclosure", to: "/legal" },
    ],
  },
} as const;

export type SiteConfig = typeof site;
