/**
 * Trace's demo's rows: the reasoning (`ThinkingRow`), a command it ran (`ToolRow`) and the sources it
 * read (`SourcesRow`). Each draws no box of its own (`display: contents`), so its line or
 * collapsible lays out as the trace's own.
 */
import { NgTemplateOutlet } from "@angular/common"
import { Component, computed, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import type { UIDataTypes, UIMessage } from "ai"

import { space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
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

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type Part = ChatMessage["parts"][number]

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  spin: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  content: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

const TRACE = [
  IconPlaceholder,
  SxDirective,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
]

@Component({
  selector: "kui-thinking-row",
  imports: [...TRACE, NgTemplateOutlet],
  host: { style: "display: contents" },
  template: `
    <ng-template #line>
      <span kuiTraceLine [status]="running() ? 'running' : undefined">
        <span kuiTraceIcon>
          @if (running()) {
            <svg
              iconPlaceholder
              lucide="LoaderCircleIcon"
              tabler="IconLoader2"
              hugeicons="Loading03Icon"
              phosphor="CircleNotchIcon"
              remixicon="RiLoader4Line"
              [sx]="styles.spin"
            ></svg>
          } @else {
            <svg
              iconPlaceholder
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
            ></svg>
          }
        </span>
        <span kuiTraceTitle>{{
          running() ? "Thinking" : "Thought for 5s"
        }}</span>
      </span>
    </ng-template>
    @if (text().length === 0) {
      <ng-container [ngTemplateOutlet]="line" />
    } @else {
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <ng-container [ngTemplateOutlet]="line" />
        </button>
        <div kuiTraceCollapsibleContent [sx]="styles.content">{{ text() }}</div>
      </div>
    }
  `,
})
export class ThinkingRow {
  readonly text = input.required<string>()
  readonly running = input(false)
  protected readonly styles = styles
  // Open while it runs, until the reader opens or closes it.
  protected readonly open = signal<boolean | undefined>(undefined)
}

@Component({
  selector: "kui-tool-row",
  imports: [...TRACE, CodeBlock, CodeBlockContent],
  host: { style: "display: contents" },
  template: `
    @if (done()) {
      <div kuiTraceCollapsible [defaultOpen]="initiallyOpen()">
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="failed() ? 'error' : undefined">
            <span kuiTraceIcon>
              @if (failed()) {
                <svg
                  iconPlaceholder
                  lucide="CircleAlertIcon"
                  tabler="IconExclamationCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="WarningCircleIcon"
                  remixicon="RiErrorWarningLine"
                ></svg>
              } @else {
                <svg
                  iconPlaceholder
                  lucide="CircleCheckIcon"
                  tabler="IconCircleCheckFilled"
                  hugeicons="CheckmarkCircle01Icon"
                  phosphor="CheckCircleIcon"
                  remixicon="RiCheckboxCircleFill"
                ></svg>
              }
            </span>
            <span kuiTraceTitle
              >{{ failed() ? "Failed to run" : "Ran" }} {{ command() }}</span
            >
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          @if (failed()) {
            <div kuiCodeBlock size="sm" variant="destructive">
              <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent">{{
                errorText()
              }}</pre>
            </div>
          } @else {
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent">{{
                stdout()
              }}</pre>
            </div>
          }
        </div>
      </div>
    } @else {
      <span kuiTraceLine [status]="streaming() ? 'running' : 'error'">
        <span kuiTraceIcon>
          @if (streaming()) {
            <svg
              iconPlaceholder
              lucide="LoaderCircleIcon"
              tabler="IconLoader2"
              hugeicons="Loading03Icon"
              phosphor="CircleNotchIcon"
              remixicon="RiLoader4Line"
              [sx]="styles.spin"
            ></svg>
          } @else {
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
          }
        </span>
        <span kuiTraceTitle
          >{{ streaming() ? "Running" : "Failed to run" }} {{ command() }}</span
        >
      </span>
    }
  `,
})
export class ToolRow {
  readonly part = input.required<Extract<Part, { type: "tool-runCommand" }>>()
  readonly streaming = input(false)
  readonly defaultOpen = input(false)
  // Read once, as Base UI's `defaultOpen` is: ng-primitives' follows it, and the chat's end would
  // open the row again.
  protected readonly initiallyOpen = signal(false)
  protected readonly styles = styles
  protected readonly command = computed(() => this.part().input?.command)
  protected readonly done = computed(
    () =>
      this.part().state === "output-available" ||
      this.part().state === "output-error"
  )
  protected readonly failed = computed(
    () => this.part().state === "output-error"
  )
  protected readonly errorText = computed(() => {
    const part = this.part()
    return part.state === "output-error" ? part.errorText : ""
  })
  protected readonly stdout = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.stdout : ""
  })

  ngOnInit() {
    this.initiallyOpen.set(this.defaultOpen())
  }
}

@Component({
  selector: "kui-sources-row",
  imports: [...TRACE, Trace],
  host: { style: "display: contents" },
  template: `
    <div kuiTraceCollapsible>
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine [status]="running() ? 'running' : undefined">
          <span kuiTraceIcon>
            @if (running()) {
              <svg
                iconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                [sx]="styles.spin"
              ></svg>
            } @else {
              <svg
                iconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              ></svg>
            }
          </span>
          <span kuiTraceTitle
            >{{ running() ? "Using" : "Used" }}
            {{ sources().length }} sources</span
          >
        </span>
      </button>
      <div kuiTraceCollapsibleContent>
        <div kuiTrace>
          @for (source of sources(); track source.url) {
            <a [href]="source.url" target="_blank" rel="noreferrer">
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
                <span kuiTraceTitle
                  >{{ source.title ?? hostname(source.url)
                  }}<span [sx]="hidden"> (opens in a new tab)</span></span
                >
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
      </div>
    </div>
  `,
})
export class SourcesRow {
  readonly sources = input.required<Extract<Part, { type: "source-url" }>[]>()
  readonly running = input(false)
  protected readonly styles = styles
  protected readonly hidden = visuallyHidden
  protected hostname(url: string) {
    return new URL(url).hostname
  }
}
