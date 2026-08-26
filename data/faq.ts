/**
 * data/faq.ts
 * ---------------------------------------------------------------------------
 * Homepage FAQ — the five questions a buyer evaluating a supplier actually
 * asks, answered directly.
 *
 * WHY THIS EXISTS: the rest of the site is narrative prose. Search engines and
 * AI answer engines both extract far more reliably from an explicit question
 * followed by a short, self-contained answer, and the site previously had none
 * of that shape anywhere.
 *
 * EVERY ANSWER IS DRAWN FROM FACTS ALREADY PUBLISHED ELSEWHERE ON THE SITE.
 * Nothing here is new. Each answer notes its source so the two cannot drift:
 * if a fact changes, both places have to change together.
 *
 * Answers are deliberately self-contained — an answer engine may quote one in
 * isolation, without the question or the surrounding page, so none of them
 * relies on "as mentioned above" or on the reader knowing what AM INDIA is.
 */

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const faqContent = {
  label: "Common questions",
  headingLines: ["Straight", "answers."] as const,
  items: [
    {
      /* Source: data/commodities.ts (the four platforms),
         data/home.ts → journeyContent.note (per-enquiry confirmation). */
      question: "What does AM INDIA trade?",
      answer:
        "AM INDIA trades four commodity platforms: coffee, teak, spices and nuts. Each is handled on its own specifications and documentation. Grades, specifications and availability are confirmed per enquiry rather than published as a fixed catalogue.",
    },
    {
      /* Source: data/pages.ts → aboutContent, "The company". */
      question:
        "Is AM INDIA the same company as Antonio Marco Exports and Trade Private Limited?",
      answer:
        "Yes. AM INDIA is the trading name; Antonio Marco Exports and Trade Private Limited is the legal entity. Every contract is entered into by the registered company, a private limited company incorporated in India and registered with the Ministry of Corporate Affairs.",
    },
    {
      /* Source: data/company.ts (registered office), data/pages.ts →
         aboutContent "European roots", data/home.ts → tradeContent facts
         and note. */
      question: "Where is AM INDIA based, and does it operate internationally?",
      answer:
        "The company is registered and managed in Sivakasi, Tamil Nadu, India, and was established as the Indian subsidiary of a Spanish corporate shareholder. It is structured for cross-border trade in both directions, import and export. Destination markets, ports and routing are confirmed per enquiry.",
    },
    {
      /* Source: data/home.ts → processContent (the five stages) and
         finalCtaContent.paragraph (what to send, what comes back).
         The first-step description matches what the enquiry form actually
         asks for — see data/enquiry.ts. If the form's field set changes,
         this answer changes with it. */
      question: "How does the trade enquiry process work?",
      answer:
        "Five stages, in the same order every time: source, evaluate, trade, document, deliver. The first step is short: your contact details, the commodity you are interested in, and what you are looking for in your own words. AM INDIA reviews it and comes back with a clear view of whether and how it can be sourced. Specification, volume, destination and terms are settled in the conversation that follows, not demanded up front.",
    },
    {
      /* Source: data/compliance.ts → trustSignals, "B2B only". */
      question: "Does AM INDIA sell to consumers, or only to businesses?",
      answer:
        "Businesses only. There is no retail channel and no consumer catalogue. AM INDIA works with businesses buying to specification and to contract.",
    },
  ] satisfies readonly FaqItem[],
} as const;
