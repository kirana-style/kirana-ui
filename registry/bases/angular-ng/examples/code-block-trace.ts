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
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  maxH64: css({ maxHeight: space[64] }),
}

const output = `$ node --version
v24.18.0`

const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`

@Component({
  selector: "code-block-trace",
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
      <div [sx]="styles.wFullMaxWMd">
        <div kuiTrace>
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
                  output
                }}</pre>
              </div>
            </div>
          </div>
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
                <span kuiTraceTitle>Failed to run pnpm dev</span>
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <div kuiCodeBlock size="sm" variant="destructive">
                <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                  error
                }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockTrace {
  protected readonly styles = styles
  protected readonly output = output
  protected readonly error = error
  protected readonly page = page
}
