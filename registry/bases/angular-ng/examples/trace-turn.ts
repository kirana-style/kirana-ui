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
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
  maxH64: css({ maxHeight: space[64] }),
}

@Component({
  selector: "trace-turn",
  imports: [
    CodeBlock,
    CodeBlockContent,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
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
            <span kuiTraceLine status="error">
              <span kuiTraceTitle>Worked for 2m 4s, 1 command failed</span>
            </span>
          </button>
          <div
            kuiTraceCollapsibleContent
            keep-mounted
            [sx]="styles.flexFlexColGap2"
          >
            <div kuiTrace>
              <div kuiTraceCollapsible>
                <button kuiTraceCollapsibleTrigger>
                  <span kuiTraceLine>
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="BrainIcon"
                        tabler="IconBrain"
                        hugeicons="AiBrainIcon"
                        phosphor="BrainIcon"
                        remixicon="RiBrainLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>Thought</span>
                    <span kuiTraceDescription>12s</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent [sx]="styles.whitespacePreWrap">
                  I should check which package managers are installed before I
                  scaffold anything.
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
                    <span kuiTraceTitle>Ran 2 commands, 1 failed</span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent keep-mounted>
                  <div kuiTrace>
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
                          <span kuiTraceTitle
                            >Failed to run pnpm --version</span
                          >
                        </span>
                      </button>
                      <div kuiTraceCollapsibleContent>
                        <div kuiCodeBlock size="sm" variant="destructive">
                          <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">
command not found: pnpm</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>Node is installed and pnpm is not. Reading the docs config.</p>
            <div kuiTrace>
              <a href="#turn">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TraceTurn {
  protected readonly styles = styles
  protected readonly page = page
}
