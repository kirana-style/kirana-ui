import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "../../../../core/scales"
import type { Status, StepPart } from "./types"
import { IconPlaceholder } from "../../../../icons/angular"
import { Badge } from "../../ui/badge"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
import { Step } from "./step"

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  stepRowCodeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  stepRowBadge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
}

@Component({
  selector: "kui-step-row",
  imports: [
    Badge,
    CodeBlock,
    CodeBlockContent,
    Step,
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (part().type === "tool-searchWeb") {
      <kui-step
        [status]="status()"
        [content]="content()"
        [title]="\`\${verb('Searching', 'Searched', 'Failed to search')} the web for \${query()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div kuiTrace>
            @for (result of results(); track result.url) {
              <a [attr.href]="result.url" target="_blank" rel="noreferrer">
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
                    {{ result.title }}
                    <span [sx]="styles.stepRowSpan">(opens in a new tab)</span>
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
        }
      </kui-step>
    } @else if (part().type === "tool-readBuildLog") {
      <kui-step
        [status]="status()"
        [content]="content()"
        [defaultOpen]="true"
        [title]="\`\${verb('Reading', 'Read', 'Failed to read')} the build log for \${deployment()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent2"
              >{{ log() }}</pre>
          </div>
        }
      </kui-step>
    } @else {
      <kui-step
        [status]="status()"
        [content]="content()"
        [title]="\`\${verb('Searching', 'Searched', 'Failed to search')} the code for \${query()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div [sx]="styles.stepRowDiv">
            @for (file of files(); track file) {
              <span kuiBadge variant="secondary" [sx]="styles.stepRowBadge">{{
                file
              }}</span>
            }
          </div>
        }
      </kui-step>
    }
  `,
})
export class StepRow {
  readonly part = input.required<StepPart>()
  readonly streaming = input.required<boolean>()
  protected readonly status = computed<Status>(() => {
    const part = this.part()
    return part.state === "output-available"
      ? undefined
      : part.state === "output-error" || !this.streaming()
        ? "error"
        : "running"
  })
  protected readonly content = computed(() => {
    const part = this.part()
    return part.state === "output-error" || part.state === "output-available"
  })
  protected readonly query = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog" ? undefined : part.input?.query
  })
  protected readonly deployment = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog"
      ? part.input?.deployment
      : undefined
  })
  protected readonly errorText = computed(() => {
    const part = this.part()
    return part.state === "output-error" ? part.errorText : ""
  })
  protected readonly results = computed(() => {
    const part = this.part()
    return part.type === "tool-searchWeb" && part.state === "output-available"
      ? part.output.results
      : []
  })
  protected readonly log = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog" &&
      part.state === "output-available"
      ? part.output.log
      : ""
  })
  protected readonly files = computed(() => {
    const part = this.part()
    return part.type === "tool-searchCode" && part.state === "output-available"
      ? part.output.files
      : []
  })
  protected readonly styles = styles

  // What the template reads of the part, each narrowed here, as Angular's templates do not.

  protected verb(running: string, done: string, failed: string) {
    const status = this.status()
    return status === "running" ? running : status === "error" ? failed : done
  }
}
