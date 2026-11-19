import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}

const sources = [
  {
    title: "Install Astro | docs.astro.build",
    href: "https://docs.astro.build/en/install-and-setup/",
  },
  {
    title: "create-astro | npmjs.com",
    href: "https://www.npmjs.com/package/create-astro",
  },
  {
    title: "Settings: minimumReleaseAge | pnpm.io",
    href: "https://pnpm.io/settings#minimumreleaseage",
  },
]

@Component({
  selector: "trace-sources",
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
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.narrowSm">
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
                {{ sources.length }}
                sources
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiTrace>
              @for (source of sources; track source.href) {
                <a [attr.href]="source.href" target="_blank" rel="noreferrer">
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
                      {{ source.title }}
                      <span [sx]="visuallyHidden">(opens in a new tab)</span>
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
    </div>
  `,
})
export default class TraceSources {
  protected readonly styles = styles
  protected readonly sources = sources
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
