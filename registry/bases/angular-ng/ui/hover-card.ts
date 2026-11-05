import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import {
  POPUP,
  hoverTrigger,
  popupRoot,
  popupSurface,
  providePopup,
} from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * A card that opens while the pointer rests on its trigger: `<ng-container kuiHoverCard>`, drawing no
 * element, as Base UI's preview card.
 */
@Directive({
  selector: "[kuiHoverCard]",
  providers: [providePopup()],
})
class HoverCard {
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

/**
 * The link or button the card is about. The card opens `delay` ms (600) after the pointer rests on
 * it and closes `closeDelay` ms (300) after the pointer leaves it and the card, as Base UI's trigger
 * takes them.
 */
@Directive({
  selector: "[kuiHoverCardTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "hover-card-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class HoverCardTrigger {
  readonly delay = input(600, { transform: numberAttribute })
  readonly closeDelay = input(300, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    hoverTrigger(inject(POPUP), this.delay, this.closeDelay)
  }
}

/** The card, below its trigger by default. */
@Directive({
  selector: "[kuiHoverCardContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "hover-card-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class HoverCardContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(4, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([popupMotion, hoverCard.content], this.sx())
  )

  constructor() {
    popupSurface(inject(POPUP), {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: hoverCard.positioner,
      portalSlot: "hover-card-portal",
      dismissOutside: false,
    })
  }
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
