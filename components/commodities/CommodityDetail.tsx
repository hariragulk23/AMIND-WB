import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Commodity } from "@/data/commodities";

/**
 * REUSABLE COMMODITY PAGE BODY
 *
 * Every commercial block below is conditional. A section that has no confirmed
 * data does not render at all — it is never filled with an invented value or a
 * visible "TBC". As data/commodities.ts is populated, sections appear in place
 * with no change to this component.
 */

interface BlockProps {
  title: string;
  index: string;
  children: React.ReactNode;
}

function Block({ title, index, children }: BlockProps) {
  return (
    <section className="border-t border-paper-line py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <SectionLabel index={index}>{title}</SectionLabel>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}

function TagList({ items }: { items: readonly string[] }) {
  return (
    <Reveal as="ul" stagger="tight" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="label-xs border border-paper-line px-4 py-2.5 text-on-light"
        >
          {item}
        </li>
      ))}
    </Reveal>
  );
}

export function CommodityDetail({ commodity }: { commodity: Commodity }) {
  /* Blocks are numbered in render order so the page reads as a document. */
  let counter = 0;
  const nextIndex = () => String(++counter).padStart(2, "0");

  return (
    <div className="bg-paper text-on-light">
      <Container className="pb-8 pt-20 md:pt-28">
        {/* ---- Overview (always present) ------------------------------- */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index={nextIndex()}>Overview</SectionLabel>
            </Reveal>
          </div>
          <Reveal stagger="base" className="space-y-6 lg:col-span-7 lg:col-start-6">
            {commodity.description.map((paragraph, i) => (
              <p
                key={paragraph}
                className={i === 0 ? "body-lg text-on-light" : "text-on-light-muted"}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>

      <Container>
        {/* ---- Who the platform is built for --------------------------- */}
        <Block title="Built for" index={nextIndex()}>
          <Reveal as="p" className="mb-6 text-on-light-muted">
            The specification and documentation set differ by buyer type. This
            platform is structured to serve:
          </Reveal>
          <TagList items={commodity.buyerSegments} />
        </Block>

        {/* ---- Sourcing ------------------------------------------------ */}
        <Block title="Sourcing" index={nextIndex()}>
          <Reveal as="p" className="body-lg text-on-light">
            {commodity.sourcingApproach}
          </Reveal>
          {commodity.origins && commodity.origins.length > 0 ? (
            <div className="mt-8">
              <p className="label-xs mb-4 text-on-light-muted">Origins</p>
              <TagList items={commodity.origins} />
            </div>
          ) : null}
        </Block>

        {/* ---- Quality ------------------------------------------------- */}
        <Block title="Quality" index={nextIndex()}>
          <Reveal as="p" className="body-lg text-on-light">
            {commodity.qualityApproach}
          </Reveal>
          {commodity.certifications && commodity.certifications.length > 0 ? (
            <div className="mt-8">
              <p className="label-xs mb-4 text-on-light-muted">Certification</p>
              <TagList items={commodity.certifications} />
            </div>
          ) : null}
        </Block>

        {/* ---- Product types ------------------------------------------- */}
        {commodity.productTypes && commodity.productTypes.length > 0 ? (
          <Block title="Product types" index={nextIndex()}>
            <Reveal as="ul" stagger="base" className="border-t border-paper-line">
              {commodity.productTypes.map((type) => (
                <li key={type.name} className="border-b border-paper-line py-5">
                  <h3 className="display-md text-on-light">{type.name}</h3>
                  {type.note ? (
                    <p className="mt-2 text-sm text-on-light-muted">{type.note}</p>
                  ) : null}
                </li>
              ))}
            </Reveal>
          </Block>
        ) : null}

        {/* ---- Grades -------------------------------------------------- */}
        {commodity.grades && commodity.grades.length > 0 ? (
          <Block title="Grades" index={nextIndex()}>
            <TagList items={commodity.grades} />
          </Block>
        ) : null}

        {/* ---- Specifications ------------------------------------------ */}
        {commodity.specifications && commodity.specifications.length > 0 ? (
          <Block title="Specifications" index={nextIndex()}>
            <Reveal className="overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <caption className="sr-only">
                  {commodity.name} specifications
                </caption>
                <thead>
                  <tr className="border-b border-paper-line">
                    <th scope="col" className="label-xs py-3 text-on-light-muted">
                      Parameter
                    </th>
                    <th scope="col" className="label-xs py-3 text-on-light-muted">
                      Value
                    </th>
                    <th scope="col" className="label-xs py-3 text-on-light-muted">
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commodity.specifications.map((spec) => (
                    <tr key={spec.parameter} className="border-b border-paper-line">
                      <th scope="row" className="py-4 pr-6 font-normal text-on-light">
                        {spec.parameter}
                      </th>
                      <td className="py-4 pr-6 text-on-light-muted">{spec.value}</td>
                      <td className="py-4 text-on-light-muted">{spec.method ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </Block>
        ) : null}

        {/* ---- Processing ---------------------------------------------- */}
        {commodity.process && commodity.process.length > 0 ? (
          <Block title="Processing" index={nextIndex()}>
            <TagList items={commodity.process} />
          </Block>
        ) : null}

        {/* ---- Packaging ----------------------------------------------- */}
        {commodity.packaging && commodity.packaging.length > 0 ? (
          <Block title="Packaging" index={nextIndex()}>
            <TagList items={commodity.packaging} />
          </Block>
        ) : null}

        {/* ---- Commercial terms ---------------------------------------- */}
        {commodity.moq || commodity.incoterms || commodity.crop ? (
          <Block title="Commercial" index={nextIndex()}>
            <Reveal as="dl" stagger="base" className="border-t border-paper-line">
              {commodity.crop ? (
                <div className="flex justify-between gap-6 border-b border-paper-line py-4">
                  <dt className="label-xs text-on-light-muted">Crop</dt>
                  <dd className="text-on-light">{commodity.crop}</dd>
                </div>
              ) : null}
              {commodity.moq ? (
                <div className="flex justify-between gap-6 border-b border-paper-line py-4">
                  <dt className="label-xs text-on-light-muted">
                    Minimum order quantity
                  </dt>
                  <dd className="text-on-light">{commodity.moq}</dd>
                </div>
              ) : null}
              {commodity.incoterms && commodity.incoterms.length > 0 ? (
                <div className="flex justify-between gap-6 border-b border-paper-line py-4">
                  <dt className="label-xs text-on-light-muted">Incoterms</dt>
                  <dd className="text-on-light">
                    {commodity.incoterms.join(", ")}
                  </dd>
                </div>
              ) : null}
            </Reveal>
          </Block>
        ) : null}

        {/* ---- Trade and logistics ------------------------------------- */}
        {commodity.loadingPorts && commodity.loadingPorts.length > 0 ? (
          <Block title="Loading" index={nextIndex()}>
            <TagList items={commodity.loadingPorts} />
          </Block>
        ) : null}

        {/* ---- Downloads ----------------------------------------------- */}
        {commodity.documents && commodity.documents.length > 0 ? (
          <Block title="Downloads" index={nextIndex()}>
            <Reveal as="ul" stagger="base" className="border-t border-paper-line">
              {commodity.documents.map((doc) => (
                <li key={doc.title} className="border-b border-paper-line py-5">
                  {doc.path ? (
                    <a
                      href={doc.path}
                      className="label-sm text-on-light transition-colors duration-300 ease-brand hover:text-brass-deep"
                      download
                    >
                      {doc.title}
                    </a>
                  ) : (
                    <span className="label-sm text-on-light">{doc.title}</span>
                  )}
                  <p className="mt-2 text-sm text-on-light-muted">
                    {doc.description}
                  </p>
                </li>
              ))}
            </Reveal>
          </Block>
        ) : null}

        {/* ---- Standing note ------------------------------------------- */}
        <div className="border-t border-paper-line py-10">
          <Reveal as="p" className="measure text-sm text-on-light-muted">
            Specifications, grades, packing formats and commercial terms for{" "}
            {commodity.name.toLowerCase()} are confirmed against each enquiry.
            Send the requirement in writing and we will respond with what can be
            sourced against it.
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
