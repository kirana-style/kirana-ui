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
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { buttonLabels } from "./button"

/**
 * A dialog: `<ng-container kuiDialog>` around its trigger and content, drawing no element, as Base
 * UI's root. `[(open)]` or `defaultOpen`. The modal is the registry's own (`lib/angular/modal.ts`).
 */
@Directive({
  selector: "[kuiDialog]",
  providers: [
    providePopup(),
    { provide: MODAL_LABELS, useFactory: () => new ModalLabels() },
  ],
})
class Dialog {
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
  selector: "[kuiDialogTrigger]",
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element.
    "[attr.data-slot]": "'dialog-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    popupTrigger(inject(POPUP), { haspopup: "dialog" })
  }
}

/** Upstream's portal, a pass-through here: the content puts itself in a portal. */
@Directive({ selector: "[kuiDialogPortal]" })
class DialogPortal {}

/** A button that closes it: `<button kuiButton kuiDialogClose variant="outline">`. */
@Directive({
  selector: "[kuiDialogClose]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'dialog-close'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class DialogClose {
  readonly sx = input<SxInput>()
  protected readonly popup = inject(POPUP)
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** The close button in the content's corner, drawn as a Button (`ghost`, `icon-sm`). */
@Component({
  selector: "button[kuiDialogCornerClose]",
  imports: [IconPlaceholder, SxDirective],
  host: {
    type: "button",
    "data-slot": "dialog-close",
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
class DialogCornerClose {
  protected readonly popup = inject(POPUP)
  protected readonly hidden = visuallyHidden
  protected readonly part = partSx(
    [button({ variant: "ghost", size: "icon-sm" }), dialog.close],
    undefined
  ).class
}

/** What it shows: `<div kuiDialogContent>`, with its close button unless `showCloseButton` is false. */
@Component({
  selector: "[kuiDialogContent]",
  imports: [DialogCornerClose],
  providers: [provideSxPart()],
  host: {
    "data-slot": "dialog-content",
    "[style.--nested-dialogs]": "0",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button kuiDialogCornerClose></button>
    }
  `,
})
class DialogContent {
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([modalMotion, dialog.content], this.sx())
  )

  constructor() {
    modalSurface(inject(POPUP), {
      portalSlot: "dialog-portal",
      overlaySlot: "dialog-overlay",
      overlay: [backdropMotion, dialog.overlay],
    })
  }
}

@Directive({
  selector: "[kuiDialogHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dialog-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(dialog.header, this.sx()))
}

/** The footer's Close button, an outline Button that closes the dialog. */
@Directive({
  selector: "button[kuiDialogFooterClose]",
  host: {
    type: "button",
    "data-slot": "button",
    "[class]": "part",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class DialogFooterClose {
  protected readonly popup = inject(POPUP)
  protected readonly part = partSx(button({ variant: "outline" }), undefined)
    .class

  constructor() {
    buttonLabels()
  }
}

/** Its footer, with a Close button at its end when `showCloseButton`. */
@Component({
  selector: "[kuiDialogFooter]",
  imports: [DialogFooterClose],
  providers: [provideSxPart()],
  host: {
    "data-slot": "dialog-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    @if (showCloseButton()) {
      <button kuiDialogFooterClose>Close</button>
    }
  `,
})
class DialogFooter {
  readonly showCloseButton = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(dialog.footer, this.sx()))
}

@Directive({
  selector: "h2[kuiDialogTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dialog-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(dialog.title, this.sx()))

  constructor() {
    modalLabel("title")
  }
}

@Directive({
  selector: "p[kuiDialogDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "dialog-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(dialog.description, this.sx())
  )

  constructor() {
    modalLabel("description")
  }
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
