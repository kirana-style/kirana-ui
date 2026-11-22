# Sources

<!-- ::preview item="sources-demo" runtimes="ai-sdk,tanstack-ai" height="460" combinations="svelte/ark" -->

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `Trace` with a `TraceCollapsible` for the list.

## Installation

Sources is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="svelte/ark" runtimes="ai-sdk,tanstack-ai" -->

## Usage

```ts showLineNumbers
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="sources-demo" parts="true" combinations="svelte/ark" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="sources-demo-tanstack-ai" parts="true" combinations="svelte/ark" -->

<!-- ::end:runtime -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

Collect the `source-url` parts of a message and render them after the text. The agent can cite the same page more than once, so dedupe them by `url`.

```ts showLineNumbers
const sources = message.parts
  .filter((part) => part.type === "source-url")
  .filter(
    (part, index, all) =>
      all.findIndex((other) => other.url === part.url) === index
  )
```

`title` is optional on a `source-url` part. Fall back to the hostname of the URL.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI has no source part: the sources are what a search tool returned. Collect them from the output of each search `tool-call` part and render them after the text. The agent can cite the same page more than once, so dedupe them by `url`.

```ts showLineNumbers
const sources = message.parts
  .filter((part) => part.type === "tool-call" && part.name === "searchWeb")
  .flatMap((part) => part.output?.sources ?? [])
  .filter(
    (source, index, all) =>
      all.findIndex((other) => other.url === source.url) === index
  )
```

Give the tool's sources an optional `title`, and fall back to the hostname of the URL.

<!-- ::end:runtime -->

## Accessibility

Each source is a plain link inside the list.

- Links open in a new tab. Add `sr-only` text, like "(opens in a new tab)", so screen readers announce it.
- The arrow icon is decorative. The title is the name of the link.
- The count in the trigger, like "Used 3 sources", tells the person what opens before they open it.

## API Reference

See [Trace](/docs/components/trace#api-reference).
