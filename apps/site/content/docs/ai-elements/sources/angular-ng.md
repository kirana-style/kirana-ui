# Sources

<!-- ::preview item="sources-demo" height="460" combinations="angular/ng" -->

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `Trace` with a `TraceCollapsible` for the list.

## Installation

Sources is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="angular/ng" -->

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

```ts showLineNumbers title="sources.ts"
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { UIMessage } from "ai"
import { css } from "@kirana-style/core"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

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

export type SourcePart = Extract<
  UIMessage["parts"][number],
  { type: "source-url" }
>

const hostname = (url: string) => new URL(url).hostname

@Component({
  selector: "kui-sources",
  imports: [
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiTrace>
      <div kuiTraceCollapsible defaultOpen>
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine>
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              ></svg>
            </span>
            <span kuiTraceTitle>
              Used
              {{ sources().length }}
              sources
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiTrace>
            @for (source of sources(); track source.url) {
              <a [attr.href]="source.url" target="_blank" rel="noreferrer">
                <span kuiTraceLine>
                  <span kuiTraceTitle>
                    {{ source.title ?? hostname(source.url) }}
                    <span [sx]="styles.sourcesSpan">(opens in a new tab)</span>
                  </span>
                  <span kuiTraceIcon>
                    <svg
                      iconPlaceholder
                      lucide="ArrowUpRightIcon"
                      tabler="IconArrowUpRight"
                      hugeicons="ArrowUpRightIcon"
                      phosphor="ArrowUpRightIcon"
                      remixicon="RiArrowRightUpLine"
                    ></svg>
                  </span>
                </span>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Sources {
  readonly sources = input.required<SourcePart[]>()
  protected readonly styles = styles
  protected readonly hostname = hostname
}
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
