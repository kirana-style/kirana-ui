import type { ElementRef } from "@angular/core"
import {
  Component,
  Directive,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import {
  POPUP,
  hoverTrigger,
  popupRoot,
  popupSurface,
  providePopup,
} from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/** The delay before the tooltips inside open, in ms (`TooltipProvider`'s `delay`). */
const TOOLTIP_DELAY = new InjectionToken<() => number>("kui tooltip delay", {
  factory: () => () => 0,
})

/**
 * The tooltips' shared delay: `<ng-container kuiTooltipProvider [delay]="300">`. At once by
 * default, as shadcn/ui's `TooltipProvider` (`delay = 0`).
 */
@Directive({
  selector: "[kuiTooltipProvider]",
  providers: [
    {
      provide: TOOLTIP_DELAY,
      useFactory: () => {
        const provider = inject(TooltipProvider)
        return () => provider.delay()
      },
    },
  ],
})
class TooltipProvider {
  readonly delay = input(0, { transform: numberAttribute })
}

/** A tooltip: `<ng-container kuiTooltip>` around its trigger and content, drawing no element. */
@Directive({
  selector: "[kuiTooltip]",
  providers: [providePopup()],
})
class Tooltip {
  readonly open = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly defaultOpen = input(false, { transform: booleanAttribute })
  readonly openChange = output<boolean>()

  constructor() {
    popupRoot(inject(POPUP), this.open, this.defaultOpen, (open) =>
      this.openChange.emit(open)
    )
  }
}

/** What it describes, opening it on hover and on keyboard focus. */
@Directive({
  selector: "[kuiTooltipTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "tooltip-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TooltipTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    const delay = inject(TOOLTIP_DELAY)
    hoverTrigger(inject(POPUP), delay, () => 0)
  }
}

/** The tip, above its trigger by default, with its arrow. */
@Component({
  selector: "[kuiTooltipContent]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tooltip-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    <div #arrow aria-hidden="true" [sx]="arrowStyle"></div>`,
})
class TooltipContent {
  readonly side = input<Side>("top")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly arrowStyle = tooltip.arrow
  protected readonly part = computed(() =>
    partSx([popupMotion, tooltip.content], this.sx())
  )
  private readonly arrow = viewChild.required<ElementRef<HTMLElement>>("arrow")

  constructor() {
    popupSurface(inject(POPUP), {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: tooltip.positioner,
      dismissOutside: false,
      arrow: () => this.arrow().nativeElement,
    })
  }
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
