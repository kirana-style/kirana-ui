import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
} from "@angular/core"
import {
  KpCollapsible,
  KpCollapsiblePanel,
  KpCollapsibleTrigger,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { trace } from "../../../styles/trace.styles"

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

/**
 * A step that opens on its details: Kirana UI's collapsible (`KpCollapsible`), in the trace's look.
 * `[(open)]`, `defaultOpen`, `disabled`.
 */
@Directive({
  selector: "[kuiTraceCollapsible]",
  hostDirectives: [
    {
      directive: KpCollapsible,
      inputs: ["open", "defaultOpen", "disabled"],
      outputs: ["openChange"],
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
 * Its details: Kirana UI's panel, structural (`*kpCollapsiblePanel`, out of the page while closed,
 * `--collapsible-panel-height` its height while it moves), so the part draws it around the
 * caller's content, its own element drawing nothing. `keepMounted` keeps it in the page, hidden.
 */
@Component({
  selector: "[kuiTraceCollapsibleContent]",
  imports: [KpCollapsiblePanel, SxDirective],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kpCollapsiblePanel="options()"
      data-slot="trace-collapsible-content"
      [class]="part"
    >
      <div data-slot="trace-collapsible-content-inner" [sx]="inner()">
        <ng-content />
      </div>
    </div>
  `,
})
class TraceCollapsibleContent {
  readonly sx = input<SxInput>()
  readonly keepMounted = input(false, { transform: booleanAttribute })
  protected readonly options = computed(() =>
    this.keepMounted() ? { keepMounted: true } : ""
  )
  protected readonly part = partSx(trace.content, undefined).class
  protected readonly inner = computed(
    () => [trace.contentInner, this.sx()] as SxInput
  )
}

/** The button that opens it, with its chevron. */
@Component({
  selector: "button[kuiTraceCollapsibleTrigger]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KpCollapsibleTrigger],
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
