import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../core/tokens"
import {
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../../core/scales"
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
  stackTraceTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  stackTraceP: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.destructive,
  }),
  stackTraceOl: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    overflowX: "auto",
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    padding: space[3],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  stackTraceLi: css({
    whiteSpace: "nowrap",
  }),
}

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes("node_modules") || line.includes("node:"),
  }
}

@Component({
  selector: "kui-stack-trace",
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
          <span kuiTraceTitle>
            Failed:
            {{ parsed().error }}
          </span>
        </span>
      </button>
      <div
        kuiTraceCollapsibleContent
        [sx]="styles.stackTraceTraceCollapsibleContent"
      >
        <p [sx]="styles.stackTraceP">{{ parsed().error }}</p>
        <div kuiTrace>
          @for (frame of parsed().appFrames; track frame.line) {
            <a [attr.href]="\`#\${frame.file}:\${frame.lineNumber}\`">
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <svg
                    iconPlaceholder
                    lucide="FileCodeIcon"
                    tabler="IconFileCode"
                    hugeicons="File01Icon"
                    phosphor="FileCodeIcon"
                    remixicon="RiFileCodeLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>
                  {{ frame.name }}
                  in
                  {{ frame.file }}:{{ frame.lineNumber }}
                </span>
              </span>
            </a>
          }
          <div kuiTraceCollapsible>
            <button kuiTraceCollapsibleTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <svg
                    iconPlaceholder
                    lucide="LayersIcon"
                    tabler="IconStack2"
                    hugeicons="Layers01Icon"
                    phosphor="StackIcon"
                    remixicon="RiStackLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>
                  {{ parsed().internalFrames.length }}
                  framework frames
                </span>
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <ol [sx]="styles.stackTraceOl">
                @for (frame of parsed().internalFrames; track frame.line) {
                  <li [sx]="styles.stackTraceLi">{{ frame.line }}</li>
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StackTrace {
  readonly stack = input.required<string>()
  protected readonly parsed = computed(() => {
    const [error, ...lines] = this.stack()
      .split("\n")
      .map((line) => line.trim())
    const frames = lines.map(parseFrame)
    return {
      error,
      appFrames: frames.filter((frame) => !frame.internal),
      internalFrames: frames.filter((frame) => frame.internal),
    }
  })
  protected readonly styles = styles
}
