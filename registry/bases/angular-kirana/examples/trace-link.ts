import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "trace-link",
  imports: [
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <a href="#link">
          <span kuiTraceLine>
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
            </span>
            <span kuiTraceTitle>Read apps/v4/lib/docs.ts</span>
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
              ></svg>
            </span>
          </span>
        </a>
        <a
          href="https://docs.astro.build/en/install-and-setup/"
          target="_blank"
          rel="noreferrer"
        >
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
              Install Astro | docs.astro.build
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
      </div>
    </div>
  `,
})
export default class TraceLink {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
