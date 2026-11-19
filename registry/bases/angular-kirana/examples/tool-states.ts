import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  codeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "tool-states",
  imports: [
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
      <div kuiTrace [sx]="styles.trace">
        <div kuiTraceCollapsible>
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
              <span kuiTraceTitle>Ran git status --short</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent">
                {{
                  \` M app/api/chat/route.ts
   M components/chat.tsx\`
                }}
              </pre>
            </div>
          </div>
        </div>
        <div kuiTraceCollapsible>
          <button kuiTraceCollapsibleTrigger>
            <span kuiTraceLine status="error">
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
              <span kuiTraceTitle>Failed to run pnpm dev</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent2">
Command timed out after 120 seconds.</pre>
            </div>
          </div>
        </div>
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
          <span kuiTraceTitle>Denied rm -rf dist</span>
        </span>
        <span kuiTraceLine status="running">
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
          <span kuiTraceTitle>Running pnpm test</span>
        </span>
      </div>
    </div>
  `,
})
export default class ToolStates {
  protected readonly styles = styles
  protected readonly page = page
}
