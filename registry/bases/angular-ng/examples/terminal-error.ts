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
}

const LINT_OUTPUT = `> acme-chat@0.1.0 lint
> eslint .

app/api/chat/route.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/chat.tsx
  42:5  error  React Hook useEffect has a missing dependency: 'messages'  react-hooks/exhaustive-deps

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.`

@Component({
  selector: "terminal-error",
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
          <span kuiTraceTitle>Ran pnpm install</span>
        </span>
        <div kuiTraceCollapsible defaultOpen>
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
              <span kuiTraceTitle>pnpm lint exited with code 1</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent">{{
                LINT_OUTPUT
              }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TerminalError {
  protected readonly styles = styles
  protected readonly LINT_OUTPUT = LINT_OUTPUT
  protected readonly page = page
}
