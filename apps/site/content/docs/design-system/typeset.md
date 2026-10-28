---
title: Typeset
description: Styles for rendered markdown and other HTML you do not control, from a blog post to a chat answer. One stylesheet you own.
section: design
order: 9
keywords: [typeset, typography, markdown, prose, rhythm, chat, article]
---

# Typeset

Rendered markdown comes back as plain HTML: headings, paragraphs, lists and
tables, with no styles of their own. Typeset styles them all, inside a container.
It is shadcn/ui's [typeset](https://ui.shadcn.com/docs/typeset): one stylesheet,
`typeset.css`, which lives in your project, so you change it where you need to.

[Build your typeset](/typeset) with your fonts and rhythm, previewed on docs, a
chat answer, an article, a changelog and meeting notes.

## How it works

Typeset is two files, which the `typeset` item installs:

<!-- ::install exec="kirana-style ui add typeset" -->

- `typeset.css`, the rules. They reach every element inside the container, as
  `h1 + *` or `li > p`, which a Kirana style does not write, so they stay plain
  CSS, in the `typeset` layer, under every Kirana rule.
- `typeset.styles.ts`, the `typeset` handle: the design's colours, its heading
  font, a mono font and the radius, as the variables the stylesheet reads. Kirana
  names its tokens' variables itself, so the stylesheet cannot read them directly.

Import `typeset.css` in your app's entry, after Kirana's stylesheet and the reset,
and give the container both the class and the handle:

```tsx
import { typeset } from "@/components/ui/typeset.styles"

export function Article({ html }: { html: string }) {
  return (
    <div
      className="typeset"
      sx={typeset}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

The `typeset` layer has to come before Kirana's rules. A project set up with
`kirana-style ui init` spreads kirana/ui's `installConfig`, which lists it:
`layers: { before: ["reset", "typeset"] }` in `kirana.config.ts`.

## Rhythm

Three values set the reading rhythm, and everything else (heading sizes, list
indents, the space under a heading, around a rule) derives from them:

- `--typeset-size`, the body text's size. `1em` by default, so it follows the
  text around it; on a narrow screen it grows a little, for reading.
- `--typeset-leading`, the space between lines.
- `--typeset-flow`, the space between blocks.

A typeset of your own is a style that sets them, with its fonts, beside the
handle. The [builder](/typeset) writes one:

```tsx
import { css } from "@kirana-style/core"

export const docsTypeset = css({
  "--typeset-font-body": "'Geist Variable', sans-serif",
  "--typeset-font-heading": "'Geist Variable', sans-serif",
  "--typeset-font-mono": "'Geist Mono Variable', monospace",
  "--typeset-size": "15px",
  "--typeset-leading": "1.75",
  "--typeset-flow": "1.25em",
  maxWidth: "37em",
})
```

```tsx
<div className="typeset" sx={[typeset, docsTypeset]}>
  {content}
</div>
```

Typeset sets no width; your layout owns it. The builder's measure is the
`maxWidth` in the style it writes.

You can keep several, one per surface: a tighter one for chat, a roomier one for
docs, a serif one for reading.

```tsx
const chatTypeset = css({
  "--typeset-flow": "1em",
  "--typeset-leading": "1.6",
})

const readingTypeset = css({
  "--typeset-font-body": "'Lora Variable', serif",
  "--typeset-size": "18px",
  "--typeset-leading": "1.9",
  "--typeset-flow": "2em",
})
```

## Your design

The `typeset` handle reads the design's tokens: the foreground, the muted text,
the border for rules and tables, the ring for focus, the muted surface under
code, the radius. So typeset follows the theme, the colour mode and the
customizer like every component, and dark mode needs nothing of its own.

## Overriding

Typeset's rules are in a layer under every Kirana rule, so a style on an element
inside the container wins, with nothing else to do:

```tsx
<div className="typeset" sx={typeset}>
  <p sx={lead}>…</p>
</div>
```

## Keeping a component out

A component inside the container keeps its own styles: anything with a
`data-slot`, which every kirana/ui component writes, is left alone, and gets only
the space above it a paragraph would. To keep anything else out, give it
`data-not-typeset` (or the `not-typeset` class); it covers the element and
everything inside it.

## Wide tables

Tables stay tables and wrap to fit. To scroll a wide one sideways instead, wrap
it in `typeset-scroll`, in your renderer's table component:

```html
<div class="typeset-scroll">
  <table>
    …
  </table>
</div>
```

## Streaming

Typeset is written so that a new block does not restyle the blocks already on the
page, which is what a chat answer arriving piece by piece needs:

- no rule depends on what comes after an element (`:last-child`, `:has()`,
  `:empty`);
- space flows one way, above each block (`margin-block-start`), so a new block
  brings its own;
- a table's separators sit on the cells, so a new row does not restyle the one
  above it.
