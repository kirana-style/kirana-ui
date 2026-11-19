import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { UIMessage } from "ai"
import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

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
