import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import {
  MODAL_LABELS,
  ModalLabels,
  modalLabel,
  modalSurface,
} from "../../../lib/angular/modal"
import {
  POPUP,
  popupRoot,
  popupTrigger,
  providePopup,
} from "../../../lib/angular/popup"
import { button } from "../../../styles/button.styles"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/**
 * A panel that slides in from a side: `<ng-container kuiSheet>` around its trigger and content,
 * drawing no element, as Base UI's dialog root it is built on. `[(open)]` or `defaultOpen`. The modal is the registry's own (`lib/angular/modal.ts`).
 */
@Directive({
  selector: "[kuiSheet]",
  providers: [
    providePopup(),
    { provide: MODAL_LABELS, useFactory: () => new ModalLabels() },
  ],
})
class Sheet {
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
  selector: "[kuiSheetTrigger]",
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element.
    "[attr.data-slot]": "'sheet-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    popupTrigger(inject(POPUP), { haspopup: "sheet" })
  }
}

/** Upstream's portal, a pass-through here: the content puts itself in a portal. */
@Directive({ selector: "[kuiSheetPortal]" })
class SheetPortal {}

/** A button that closes it: `<button kuiButton kuiSheetClose variant="outline">`. */
@Directive({
  selector: "[kuiSheetClose]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'sheet-close'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class SheetClose {
  readonly sx = input<SxInput>()
  protected readonly popup = inject(POPUP)
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** The close button in the content's corner, drawn as a Button (`ghost`, `icon-sm`). */
@Component({
  selector: "button[kuiSheetCornerClose]",
  imports: [IconPlaceholder, SxDirective],
  host: {
    type: "button",
    "data-slot": "sheet-close",
    "[class]": "part",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="XIcon"
      tabler="IconX"
      hugeicons="Cancel01Icon"
      phosphor="XIcon"
      remixicon="RiCloseLine"
    ></svg>
    <span [sx]="hidden">Close</span>
  `,
})
class SheetCornerClose {
  protected readonly popup = inject(POPUP)
  protected readonly hidden = visuallyHidden
  protected readonly part = partSx(
    [button({ variant: "ghost", size: "icon-sm" }), sheet.close],
    undefined
  ).class
}

/**
 * The panel, against a side of the page (`side`, `right` by default), with its close button unless
 * `showCloseButton` is false.
 */
@Component({
  selector: "[kuiSheetContent]",
  imports: [SheetCornerClose],
  providers: [provideSxPart()],
  host: {
    "data-slot": "sheet-content",
    "[attr.data-side]": "side()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button kuiSheetCornerClose></button>
    }
  `,
})
class SheetContent {
  readonly side = input<"top" | "right" | "bottom" | "left">("right")
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([sheet.content, sheet.side[this.side()]], this.sx())
  )

  constructor() {
    modalSurface(inject(POPUP), {
      portalSlot: "sheet-portal",
      overlaySlot: "sheet-overlay",
      overlay: [sheet.overlay],
    })
  }
}

@Directive({
  selector: "[kuiSheetHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sheet-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.header, this.sx()))
}

@Directive({
  selector: "[kuiSheetFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sheet-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.footer, this.sx()))
}

@Directive({
  selector: "h2[kuiSheetTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sheet-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.title, this.sx()))

  constructor() {
    modalLabel("title")
  }
}

@Directive({
  selector: "p[kuiSheetDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "sheet-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.description, this.sx()))

  constructor() {
    modalLabel("description")
  }
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
