interface JsonLdProps {
  /** A schema.org object produced by lib/structured-data.ts. */
  data: Record<string, unknown>;
}

/**
 * Emits JSON-LD from a Server Component. The payload is generated in our own
 * code from data/company.ts — it never contains user input — so serialising it
 * into a script tag is safe. `<` is escaped defensively all the same.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
