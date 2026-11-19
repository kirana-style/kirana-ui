import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  flexWFullMaxWSmFlexColIt: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { "*": null, base: space[4] },
  }),
  maxH64: css({ maxHeight: space[64] }),
}

@Component({
  selector: "trace-open",
  imports: [
    Button,
    CodeBlock,
    CodeBlockContent,
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
      <div [sx]="styles.flexWFullMaxWSmFlexColIt">
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Ran node --version</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                "$ node --version
v24.18.0"
              }}</pre>
            </div>
          </div>
        </div>
        <div kuiTraceCollapsible [(open)]="open">
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Ran pnpm --version</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                "$ pnpm --version
10.33.4"
              }}</pre>
            </div>
          </div>
        </div>
        <button
          kuiButton
          variant="outline"
          size="sm"
          (click)="open.set(!open())"
        >
          {{ open() ? "Hide" : "Show" }}
          the pnpm output
        </button>
      </div>
    </div>
  `,
})
export default class TraceOpen {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly page = page
}
