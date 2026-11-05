import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

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
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A dialog: `<ng-container kuiAlertDialog>` around its trigger and content, drawing no element, as Base
 * UI's root. `[(open)]` or `defaultOpen`. The modal is the registry's own (`lib/angular/modal.ts`).
 */
@Directive({
  selector: "[kuiAlertDialog]",
  providers: [
    providePopup(),
    { provide: MODAL_LABELS, useFactory: () => new ModalLabels() },
  ],
})
class AlertDialog {
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
  selector: "[kuiAlertDialogTrigger]",
  providers: [provideSxPart()],
  host: {
    // Bound, so it wins over the slot of a part on the same element.
    "[attr.data-slot]": "'alert-dialog-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))

  constructor() {
    popupTrigger(inject(POPUP), { haspopup: "dialog" })
  }
}

/** Upstream's portal, a pass-through here: the content puts itself in a portal. */
@Directive({ selector: "[kuiAlertDialogPortal]" })
class AlertDialogPortal {}

/** A button that closes it: `<button kuiButton kuiAlertDialogClose variant="outline">`. */
@Directive({
  selector: "[kuiAlertDialogClose]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'alert-dialog-close'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class AlertDialogClose {
  readonly sx = input<SxInput>()
  protected readonly popup = inject(POPUP)
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** What it shows: `<div kuiAlertDialogContent size="sm">`. A press on the backdrop leaves it open. */
@Directive({
  selector: "[kuiAlertDialogContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-content",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogContent {
  readonly size = input<"default" | "sm">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([modalMotion, alertDialog.content], this.sx())
  )

  constructor() {
    modalSurface(inject(POPUP), {
      portalSlot: "alert-dialog-portal",
      overlaySlot: "alert-dialog-overlay",
      overlay: [backdropMotion, alertDialog.overlay],
      role: "alertdialog",
      dismissible: false,
    })
  }
}

@Directive({
  selector: "[kuiAlertDialogHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(alertDialog.header, this.sx())
  )
}

@Directive({
  selector: "[kuiAlertDialogFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(alertDialog.footer, this.sx())
  )
}

/** An icon or picture above its title. */
@Directive({
  selector: "[kuiAlertDialogMedia]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-media",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogMedia {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alertDialog.media, this.sx()))
}

/** The action it asks for, drawn as a Button. */
@Directive({
  selector: "button[kuiAlertDialogAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-action",
    "[attr.type]": "isButton ? 'button' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogAction {
  readonly variant = input<ButtonVariants["variant"]>("default")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    "BUTTON"
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/** The button that cancels: an outline Button that closes it. */
@Directive({
  selector: "button[kuiAlertDialogCancel]",
  providers: [provideSxPart()],
  host: {
    type: "button",
    "data-slot": "alert-dialog-cancel",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class AlertDialogCancel {
  readonly variant = input<ButtonVariants["variant"]>("outline")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly popup = inject(POPUP)
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

@Directive({
  selector: "h2[kuiAlertDialogTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alertDialog.title, this.sx()))

  constructor() {
    modalLabel("title")
  }
}

@Directive({
  selector: "p[kuiAlertDialogDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-dialog-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(alertDialog.description, this.sx())
  )

  constructor() {
    modalLabel("description")
  }
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
