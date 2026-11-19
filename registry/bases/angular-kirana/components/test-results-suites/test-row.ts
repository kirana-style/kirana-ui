import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

const styles = {
  testRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

export type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

@Component({
  selector: "kui-test-row",
  imports: [
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
  host: { style: "display: contents" },
  template: `
    @if (test().status === "failed") {
      <div kuiTraceCollapsible>
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine status="error">
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              ></svg>
            </span>
            <span kuiTraceTitle>{{ test().name }}</span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.testRowCodeBlockContent"
              >{{ test().error }}</pre>
          </div>
        </div>
      </div>
    } @else {
      <span kuiTraceLine>
        <span kuiTraceIcon>
          @if (test().status === "skipped") {
            <svg
              iconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            ></svg>
          } @else {
            <svg
              iconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            ></svg>
          }
        </span>
        <span kuiTraceTitle>{{
          test().status === "skipped"
            ? \`Skipped \${test().name}\`
            : test().name
        }}</span>
      </span>
    }
  `,
})
export class TestRow {
  readonly test = input.required<Test>()
  protected readonly styles = styles
}
