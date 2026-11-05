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
  popupRoot,
  popupSurface,
  popupTrigger,
  providePopup,
} from "../../../lib/angular/popup"
import type { Align, Side } from "../../../lib/angular/popup"
import { popover } from "../../../styles/popover.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * A popover: `<ng-container kuiPopover>` around its trigger and content, drawing no element, as
 * Base UI's root. `[(open)]` or `defaultOpen`. The popup is the registry's own layer
 * (`lib/angular/popup.ts`).
 */
@Directive({
  selector: "[kuiPopover]",
  providers: [providePopup()],
})
class Popover {
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

/** The button that opens it. */
@Directive({
  selector: "[kuiPopoverTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    popupTrigger(inject(POPUP), { haspopup: "dialog" })
  }
}

/**
 * What it shows, placed against the trigger: `<div kuiPopoverContent side="top" align="start">`,
 * Base UI's `side`, `align`, `sideOffset` (4) and `alignOffset` (0).
 */
@Directive({
  selector: "[kuiPopoverContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-content",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([popupMotion, popover.content], this.sx())
  )

  constructor() {
    popupSurface(inject(POPUP), {
      side: this.side,
      align: this.align,
      sideOffset: this.sideOffset,
      alignOffset: this.alignOffset,
      positioner: popover.positioner,
      role: "dialog",
      focus: "first",
    })
  }
}

/** Its heading and description, above its content. */
@Directive({
  selector: "[kuiPopoverHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(popover.header, this.sx()))
}

/** Its title: `<h2 kuiPopoverTitle>`, as Base UI's. */
@Directive({
  selector: "h2[kuiPopoverTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(popover.title, this.sx()))
}

/** Its description: `<p kuiPopoverDescription>`. */
@Directive({
  selector: "p[kuiPopoverDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "popover-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PopoverDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(popover.description, this.sx())
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
