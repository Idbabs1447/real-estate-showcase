import { site } from "../data/site";
import { IMAGES, PHOTO_CREDIT } from "../data/images";
import { Button, Eyebrow, Reveal, Section } from "../components/ui";
import { PageHero } from "../components/PageHero";
import { InfoIcon } from "../components/Icons";

const blocks = [
  {
    title: "This is a demonstration website",
    body: [
      "Azure Estates does not exist. It is a fictional Lagos property consultancy invented for a design and front-end demonstration. Nothing on this site constitutes an offer, an advertisement, a valuation, or any form of professional property advice.",
      "There is no trading name, no trading address, no licence and no registered entity behind this website.",
    ],
  },
  {
    title: "All listings, prices and details are fictional",
    body: [
      "Every property title, street address, district, reference number, bedroom count, square metre figure, service charge, availability status and price shown on this website is invented sample data created to populate a realistic layout. None of these properties exists, and none is offered for sale or to let.",
      "The fourteen sample listings are used to demonstrate filtering, sorting, card design and detail pages against realistic-looking data.",
    ],
  },
  {
    title: "No testimonials are used",
    body: [
      "This website deliberately contains no client testimonials, star ratings, review scores or attributed quotes from customers. Inventing social proof for a demonstration site would be misleading, so the layout leaves those sections out entirely.",
      "The only attributed voices on this site are labelled internal house rules, and the four advisor profiles are explicitly marked as fictional demo profiles using placeholder portraits.",
    ],
  },
  {
    title: "Forms do not submit anything",
    body: [
      "No backend, database, mail service or CRM is connected to this website. Completing any form — inspection request, general enquiry or valuation request — will not send, store or deliver your entries anywhere. Values remain in your browser tab and are discarded when you navigate away or close it.",
      "Every form carries a visible notice to this effect, and the confirmation screen repeats it.",
    ],
  },
  {
    title: "Photography and assets",
    body: [
      "All photography on this website is stock imagery served from the Pexels CDN under the Pexels free licence. It does not depict any property listed here, any member of staff, or any real office.",
      "Attribution for the photographers whose work appears here is provided in the site footer.",
    ],
  },
  {
    title: "Replacing the placeholder content",
    body: [
      "This build is intended to be re-skinned for a real client. Branding, contact details, copy, services, FAQs, districts and property data are centralised in a small number of data files, and every component consumes those files rather than hard-coding values.",
      "Placeholder contact details — telephone numbers, email addresses and the physical address — should be replaced before any live deployment.",
    ],
  },
];

export default function Legal() {
  return (
    <>
      <PageHero
        eyebrow="Demo disclosure"
        title="What this website is, and is not."
        lead="A plain-language note on the nature of this build, the origin of its content, and how to replace it."
        image={IMAGES.skylineSunset}
      />

      <Section className="bg-cream-100">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow>Contents</Eyebrow>
                <nav className="mt-6 space-y-3">
                  {blocks.map((b) => (
                    <a
                      key={b.title}
                      href="#/legal"
                      className="block text-[0.86rem] leading-relaxed text-navy-700/70 transition-colors hover:text-gold-700"
                    >
                      {b.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-10 border-l-2 border-gold-400 bg-cream-200/60 p-5">
                  <InfoIcon className="h-5 w-5 text-gold-600" />
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-navy-800/75">
                    Short version: {site.name} is fictional, every listing and price is invented,
                    no testimonials appear anywhere, and forms send nothing.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-14">
              {blocks.map((b, i) => (
                <Reveal key={b.title} delay={i * 60}>
                  <article>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[1.05rem] tracking-[0.12em] text-gold-600">
                        0{i + 1}
                      </span>
                      <h2 className="font-display text-[1.7rem] leading-snug text-navy-900 sm:text-[2rem]">
                        {b.title}
                      </h2>
                    </div>
                    <div className="mt-5 space-y-4 border-l border-navy-900/10 pl-6 sm:pl-8">
                      {b.body.map((para) => (
                        <p key={para.slice(0, 24)} className="text-[0.95rem] leading-[1.85] text-navy-800/80">
                          {para}
                        </p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={140}>
              <div className="mt-16 border border-navy-900/12 bg-cream-50 p-7 sm:p-9">
                <Eyebrow>Photography credit</Eyebrow>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-navy-700/70">
                  {PHOTO_CREDIT}
                </p>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/properties" variant="primary" size="md">
                View the sample listings
              </Button>
              <Button to="/" variant="outline" size="md">
                Back to homepage
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
