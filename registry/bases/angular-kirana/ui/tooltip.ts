import {
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import {
  KuiTooltip,
  KuiTooltipArrow,
  KuiTooltipPopup,
  KuiTooltipPortal,
  KuiTooltipPositioner,
  KuiTooltipTrigger,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/** The delay before the tooltips inside open, in ms (`TooltipProvider`'s `delay`). */
const TOOLTIP_DELAY = new InjectionToken<() => number>("kui tooltip delay", {
  factory: () => () => 0,
})

/**
 * The tooltips' shared delay: `<ng-container kuiTooltipProvider delay="300">`. At once by
 * default, as shadcn/ui's `TooltipProvider` (`delay = 0`). Kirana UI has no provider: each
 * tooltip's root takes it, as its default `delay`.
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

/**
 * A tooltip: `<ng-container kuiTooltip>` around its trigger and content, drawing no element:
 * Kirana UI's root (`KuiTooltip`), its `[(open)]`, `defaultOpen`, `closeDelay` and `disabled` its
 * own.
 *
 * Its `delay` defaults to the provider's (0), where Kirana UI's waits 600 ms. A host directive's
 * input takes no default from the directive it is on, so this root extends Kirana UI's and
 * redeclares the input, read when the root is made: a provider's bound `[delay]` set in the same
 * template comes too late for it, a static `delay="…"` does not (PF-035: no default for a host
 * directive's input, and no provider for the tooltips' delay). Kirana UI's trigger finds its root
 * by its class, which this one stands for.
 */
@Directive({
  selector: "[kuiTooltip]",
  providers: [{ provide: KuiTooltip, useExisting: Tooltip }],
})
class Tooltip extends KuiTooltip {
  override readonly delay = input<number | undefined, unknown>(
    inject(TOOLTIP_DELAY)(),
    { transform: numberAttribute }
  )
}

/** What it describes, opening it on hover and on keyboard focus. */
@Directive({
  selector: "[kuiTooltipTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KuiTooltipTrigger],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'tooltip-trigger'",
    // Kirana UI's tooltip trigger leaves a `<button>` without a `type`, which submits the form it
    // sits in, where its popover trigger says `type="button"` (PF-029).
    "[attr.type]": "isButton ? 'button' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TooltipTrigger {
  readonly sx = input<SxInput>()
  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    "BUTTON"
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * The tip, above its trigger by default, with its arrow: `<div kuiTooltipContent side="right">`,
 * Base UI's `side`, `align`, `sideOffset` (4) and `alignOffset` (0). Kirana UI's portal is a
 * structural part, so the content draws the portal, the positioner and the popup in its template,
 * its children projected into the popup; its own element stays where it was written, drawing
 * nothing, and the `dir` its caller writes on it goes to the popup.
 */
@Component({
  selector: "[kuiTooltipContent]",
  imports: [
    KuiTooltipArrow,
    KuiTooltipPopup,
    KuiTooltipPortal,
    KuiTooltipPositioner,
  ],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiTooltipPortal>
      <div
        kuiTooltipPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kuiTooltipPopup
          data-slot="tooltip-content"
          [attr.dir]="host.getAttribute('dir')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
          <div kuiTooltipArrow [class]="arrow"></div>
        </div>
      </div>
    </ng-template>
  `,
})
class TooltipContent {
  readonly side = input<Side>("top")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly positioner = partSx(tooltip.positioner, undefined).class
  protected readonly arrow = partSx(tooltip.arrow, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, tooltip.content], this.sx())
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
