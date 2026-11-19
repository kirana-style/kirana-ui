import {
  Component,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import {
  KuiHoverCard,
  KuiHoverCardPopup,
  KuiHoverCardPortal,
  KuiHoverCardPositioner,
  KuiHoverCardTrigger,
} from "@kirana-ui/angular"
import type { Align, Side } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * A card that opens while the pointer rests on its trigger: `<ng-container kuiHoverCard>`, drawing
 * no element, as Base UI's preview card: Kirana UI's root (`KuiHoverCard`), its `[(open)]` and
 * `defaultOpen` its own. Kirana UI's selectors are the registry's, so a part takes its primitive
 * as a host directive and a file imports only one of the two.
 */
@Directive({
  selector: "[kuiHoverCard]",
  hostDirectives: [
    {
      directive: KuiHoverCard,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class HoverCard {}

/**
 * The link or button the card is about. The card opens `delay` ms (600) after the pointer rests on
 * it and closes `closeDelay` ms (300) after the pointer leaves it and the card, as Base UI's trigger
 * takes them: Kirana UI's trigger's own, its defaults those.
 */
@Directive({
  selector: "[kuiHoverCardTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [
    { directive: KuiHoverCardTrigger, inputs: ["delay", "closeDelay"] },
  ],
  host: {
    // Bound, so it wins over the slot of a part on the same element (`<button kuiButton
    // kui…Trigger>`), as Base UI keeps a trigger's own on the element it renders.
    "[attr.data-slot]": "'hover-card-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class HoverCardTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * The card, below its trigger by default: `<div kuiHoverCardContent side="left">`, Base UI's
 * `side`, `align`, `sideOffset` (4) and `alignOffset` (4). The content draws Kirana UI's portal,
 * the positioner and the popup in its template, its children projected into the popup; its own
 * element stays where it was written, drawing nothing, and the `dir` its caller writes on it goes
 * to the popup.
 */
@Component({
  selector: "[kuiHoverCardContent]",
  imports: [KuiHoverCardPopup, KuiHoverCardPortal, KuiHoverCardPositioner],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-template kuiHoverCardPortal>
      <div
        kuiHoverCardPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kuiHoverCardPopup
          data-slot="hover-card-content"
          [attr.dir]="host.getAttribute('dir')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
})
class HoverCardContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly positioner = partSx(hoverCard.positioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, hoverCard.content], this.sx())
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
