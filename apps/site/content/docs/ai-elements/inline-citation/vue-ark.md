# Inline Citation

<!-- ::preview item="inline-citation-demo" height="500" combinations="vue/ark" -->

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/docs/components/hover-card) on a [Button](/docs/components/button).

To show a list of sources after the reply, use [Sources](/docs/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/docs/components/hover-card) and [Button](/docs/components/button) components.

<!-- ::installation name="hover-card button" combinations="vue/ark" -->

## Usage

The example draws each step with its own parts, which you copy beside it:

```vue showLineNumbers title="Citation.vue"
<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { css } from "@kirana-style/core"
import { theme } from "@/lib/kirana/tokens"
import { fontSize, fontWeight, lineHeight, space } from "@/lib/kirana/scales"

const styles = {
  citationHoverCardContent: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  citationDiv: css({
    fontWeight: fontWeight.medium,
  }),
  citationP: css({
    color: theme.mutedForeground,
  }),
  citationA: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  citationSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
}

type Source = {
  url: string
  title: string
  description: string
}

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "")
}

const { source } = defineProps<{
  source: Source
}>()
const host = hostname(source.url)
</script>

<template>
  <HoverCard :open-delay="10" :close-delay="100">
    <HoverCardTrigger as-child>
      <Button variant="secondary" size="xs">
        {{ host }}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent :sx="styles.citationHoverCardContent">
      <div :sx="styles.citationDiv">
        {{ source.title }}
      </div>
      <p :sx="styles.citationP">
        {{ source.description }}
      </p>
      <a
        :href="source.url"
        target="_blank"
        rel="noreferrer"
        :sx="styles.citationA"
      >
        {{ host }}
        <span :sx="styles.citationSpan"> (opens in a new tab) </span>
      </a>
    </HoverCardContent>
  </HoverCard>
</template>
```

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

```ts showLineNumbers
const sources = message.parts.filter((part) => part.type === "source-url")
```

`title` is optional. Fall back to the URL's hostname.
