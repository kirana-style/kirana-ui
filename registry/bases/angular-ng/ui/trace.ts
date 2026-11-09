import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpCollapsible,
  NgpCollapsibleTrigger,
  injectCollapsibleState,
} from "ng-primitives/collapsible"

import { IconPlaceholder } from "../../../icons/angular"
import { presence } from "../../../lib/angular/presence"
import { trace } from "../../../styles/trace.styles"

let next = 0

@Directive({
  selector: "[kuiTrace]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Trace {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.root, this.sx()))
}

/** A step that opens on its details: Collapsible's, in the trace's look. `[(open)]`, `defaultOpen`. */
@Directive({
  selector: "[kuiTraceCollapsible]",
  hostDirectives: [
    {
      directive: NgpCollapsible,
      inputs: [
        "ngpCollapsibleOpen: open",
        "ngpCollapsibleDefaultOpen: defaultOpen",
        "ngpCollapsibleDisabled: disabled",
      ],
      outputs: ["ngpCollapsibleOpenChange: openChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-collapsible",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TraceCollapsible {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.collapsible, this.sx()))
}

/**
 * Its details, out of the page while closed, as Base UI's panel (`presence`), or in it and hidden
 * with `keepMounted`, as Base UI's panel with its `keepMounted`.
 */
@Component({
  selector: "[kuiTraceCollapsibleContent]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-collapsible-content",
    "[attr.id]": "id",
    "[attr.data-open]": "state().open() ? '' : null",
    "[attr.data-closed]": "state().open() ? null : ''",
    "[class]": "part",
  },
  template: `<div data-slot="trace-collapsible-content-inner" [sx]="inner()">
    <ng-content />
  </div>`,
})
class TraceCollapsibleContent {
  readonly sx = input<SxInput>()
  readonly keepMounted = input(false, { transform: booleanAttribute })
  protected readonly id = `kui-trace-content-${next++}`
  protected readonly state = injectCollapsibleState()
  protected readonly part = partSx(trace.content, undefined).class
  protected readonly inner = computed(
    () => [trace.contentInner, this.sx()] as SxInput
  )

  constructor() {
    this.state().setContent(this.id)
    presence(() => this.state().open(), {
      heightVar: "--collapsible-panel-height",
      widthVar: "--collapsible-panel-width",
      keepMounted: this.keepMounted,
    })
  }
}

/** The button that opens it, with its chevron. */
@Component({
  selector: "button[kuiTraceCollapsibleTrigger]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [NgpCollapsibleTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-collapsible-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <span data-slot="trace-icon" aria-hidden="true" [sx]="icon">
      <svg
        iconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      ></svg>
    </span>
  `,
})
class TraceCollapsibleTrigger {
  readonly sx = input<SxInput>()
  protected readonly icon = [trace.icon, trace.chevron] as SxInput
  protected readonly part = computed(() => partSx(trace.trigger, this.sx()))
}

@Directive({
  selector: "[kuiTraceDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TraceDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.description, this.sx()))
}

@Directive({
  selector: "[kuiTraceIcon]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-icon",
    "aria-hidden": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TraceIcon {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.icon, this.sx()))
}

@Directive({
  selector: "[kuiTraceLine]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-line",
    "[attr.data-status]": "status()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TraceLine {
  readonly status = input<"running" | "error" | "pending" | undefined>(
    undefined
  )
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.line, this.sx()))
}

@Directive({
  selector: "[kuiTraceTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "trace-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TraceTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(trace.title, this.sx()))
}

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
}
