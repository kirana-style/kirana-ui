import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space, spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Badge } from "../ui/badge"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
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
  flexFlexWrapGap15: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: spacing(1.5) },
  }),
  maxH64: css({ maxHeight: space[64] }),
}

@Component({
  selector: "trace-steps",
  imports: [
    Badge,
    CodeBlock,
    CodeBlockContent,
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
            <span kuiTraceLine status="running">
              <span kuiTraceTitle>Looking into the slow deploy</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keepMounted>
            <div kuiTrace>
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle
                      >Searched for the checkout build log</span
                    >
                  </span>
                </button>
                <div kuiTraceCollapsibleContent [sx]="styles.flexFlexWrapGap15">
                  <span kuiBadge variant="secondary">vercel.com</span>
                  <span kuiBadge variant="secondary">github.com</span>
                </div>
              </div>
              <a href="#steps">
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
                  <span kuiTraceTitle>Read the last twelve deploys</span>
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
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine status="running">
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Searching for the cache key</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent>
                  <div kuiCodeBlock size="sm">
                    <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
cache key image optimization</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TraceSteps {
  protected readonly styles = styles
  protected readonly page = page
}
