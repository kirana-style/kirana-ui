# Inline Citation

<!-- ::preview item="inline-citation-demo" height="500" combinations="solid/kirana" -->

Inline Citation is a source that sits in the sentence it supports. It is a [Hover Card](/docs/components/hover-card) on a [Button](/docs/components/button).

To show a list of sources after the reply, use [Sources](/docs/ai-elements/sources).

## Installation

Inline Citation is built with the [Hover Card](/docs/components/hover-card) and [Button](/docs/components/button) components.

<!-- ::installation name="hover-card button" combinations="solid/kirana" -->

## Usage

The example draws each step with its own parts, which you copy beside it:

<!-- ::demo-source item="inline-citation-demo" parts="true" combinations="solid/kirana" -->

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

TanStack AI's messages have no source parts. The citation is a result of the agent's search tool: read it from the `output` of its `tool-call` part.

```ts showLineNumbers
const sources = message.parts.flatMap((part) =>
  part.type === "tool-call" && part.name === "searchWeb"
    ? (part.output?.results ?? [])
    : []
)
```

The tool's `outputSchema` types the results. If a result can come without a `title`, fall back to the URL's hostname.

<!-- ::end:runtime -->
