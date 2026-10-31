---
title: Inline Citation
description: A source in the sentence that opens on hover.
section: ai-elements
variants: [react/base, react/aria]
keywords: [inline citation, ai elements, agent, chat]
---

# Inline Citation

<!-- ::preview item="inline-citation-demo" height="500" combinations="react/base,react/aria" -->

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/docs/components/hover-card) on a [Button](/docs/components/button).

To show a list of sources after the reply, use [Sources](/docs/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/docs/components/hover-card) and [Button](/docs/components/button) components.

<!-- ::installation name="hover-card button" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  card: css({ display: "flex", width: space[64], flexDirection: "column", gap: space[1] }),
  title: css({ fontWeight: fontWeight.medium }),
  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }),
}

<HoverCard>
  <HoverCardTrigger
    delay={10}
    closeDelay={100}
    render={<Button variant="secondary" size="xs" />}
  >
    {hostname}
  </HoverCardTrigger>
  <HoverCardContent sx={styles.card}>
    <div sx={styles.title}>{title}</div>
    <a href={url} target="_blank" rel="noreferrer">
      {hostname}
      <span sx={styles.srOnly}> (opens in a new tab)</span>
    </a>
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  card: css({ display: "flex", width: space[64], flexDirection: "column", gap: space[1] }),
  title: css({ fontWeight: fontWeight.medium }),
  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }),
}

<HoverCardTrigger delay={10} closeDelay={100}>
  <Button variant="secondary" size="xs">
    {hostname}
  </Button>
  <HoverCard sx={styles.card}>
    <div sx={styles.title}>{title}</div>
    <a href={url} target="_blank" rel="noreferrer">
      {hostname}
      <span sx={styles.srOnly}> (opens in a new tab)</span>
    </a>
  </HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## AI SDK

A `source-url` part is the citation. Set `sendSources: true` on `toUIMessageStreamResponse()`, or write the part yourself.

```ts showLineNumbers title="app/api/chat/route.ts"
writer.write({
  type: "source-url",
  sourceId: "shadcn",
  url: "https://ui.shadcn.com",
  title: "shadcn/ui",
})
```

```tsx showLineNumbers
const sources = message.parts.filter((part) => part.type === "source-url")
```

`title` is optional. Fall back to the URL's hostname.

## Migrating from AI SDK Elements

If you added Inline Citation from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/inline-citation.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Hover Card and Button. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/inline-citation.tsx from AI SDK Elements to kirana/ui's Hover Card and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add hover-card button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/inline-citation.md and build Inline Citation the same way.
3. Rebuild each part:
   - InlineCitationCard renders a HoverCard.
   - InlineCitationCardTrigger renders a HoverCardTrigger with render={<Button variant="secondary" size="xs" />} instead of a Badge, so it can take keyboard focus. Set delay and closeDelay on the trigger.
   - InlineCitationCardBody renders a HoverCardContent.
   - InlineCitationSource renders the title and a link to the URL that opens in a new tab, with "(opens in a new tab)" in an sr-only span.
   - Keep InlineCitation, InlineCitationText, InlineCitationQuote and the carousel parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/inline-citation.tsx from AI SDK Elements to kirana/ui's Hover Card and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add hover-card button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/inline-citation.md and build Inline Citation the same way.
3. Rebuild each part:
   - InlineCitationCard renders a HoverCardTrigger with delay and closeDelay.
   - InlineCitationCardTrigger renders a Button with variant="secondary" and size="xs" instead of a Badge, so it can take keyboard focus.
   - InlineCitationCardBody renders a HoverCard, next to the Button inside the HoverCardTrigger.
   - InlineCitationSource renders the title and a link to the URL that opens in a new tab, with "(opens in a new tab)" in an sr-only span.
   - Keep InlineCitation, InlineCitationText, InlineCitationQuote and the carousel parts as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
