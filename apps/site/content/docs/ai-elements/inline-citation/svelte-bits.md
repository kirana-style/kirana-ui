# Inline Citation

<!-- ::preview item="inline-citation-demo" height="500" combinations="svelte/bits" -->

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/docs/components/hover-card) on a [Button](/docs/components/button).

To show a list of sources after the reply, use [Sources](/docs/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/docs/components/hover-card) and [Button](/docs/components/button) components.

<!-- ::installation name="hover-card button" combinations="svelte/bits" -->

## Usage

The example draws each step with its own parts, which you copy beside it:

<!-- ::demo-source item="inline-citation-demo" parts="true" combinations="svelte/bits" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

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

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI has no source part. A citation is a source a search tool returned: give the tool's output the sources, and read them from the search `tool-call` part.

```ts showLineNumbers
const sources = message.parts
  .filter((part) => part.type === "tool-call" && part.name === "searchWeb")
  .flatMap((part) => part.output?.sources ?? [])
```

Give each source an optional `title`, and fall back to the URL's hostname.

<!-- ::end:runtime -->
