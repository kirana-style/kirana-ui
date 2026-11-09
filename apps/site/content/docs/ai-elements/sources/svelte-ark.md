# Sources

<!-- ::preview item="sources-demo" height="460" combinations="svelte/ark" -->

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `Trace` with a `TraceCollapsible` for the list.

## Installation

Sources is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="svelte/ark" -->

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

```svelte showLineNumbers title="Sources.svelte"
<script lang="ts" module>
  export type SourcePart = Extract<
    UIMessage["parts"][number],
    { type: "source-url" }
  >
</script>

<script lang="ts">

  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import type { UIMessage } from "ai"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "@/components/ui/trace"
  import { css } from "@kirana-style/core"

  const styles = {
    sourcesSpan: css({
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

  let { sources }: { sources: SourcePart[] } = $props()

  const hostname = (url: string) => new URL(url).hostname
</script>

<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="GlobeIcon" tabler="IconGlobe" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobeLine" />
        </TraceIcon>
        <TraceTitle>
          Used {sources.length} sources
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        {#each sources as source (source.url)}
          <a href={source.url} target="_blank" rel="noreferrer">
            <TraceLine>
              <TraceTitle>
                {source.title ?? hostname(source.url)}
                <span sx={styles.sourcesSpan}>
                  (opens in a new tab)
                </span>
              </TraceTitle>
              <TraceIcon>
                <IconPlaceholder lucide="ArrowUpRightIcon" tabler="IconArrowUpRight" hugeicons="ArrowUpRightIcon" phosphor="ArrowUpRightIcon" remixicon="RiArrowRightUpLine" />
              </TraceIcon>
            </TraceLine>
          </a>
        {/each}
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## AI SDK

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

## Accessibility

Each source is a plain link inside the list.

- Links open in a new tab. Add `sr-only` text, like "(opens in a new tab)", so screen readers announce it.
- The arrow icon is decorative. The title is the name of the link.
- The count in the trigger, like "Used 3 sources", tells the person what opens before they open it.

## API Reference

See [Trace](/docs/components/trace#api-reference).
