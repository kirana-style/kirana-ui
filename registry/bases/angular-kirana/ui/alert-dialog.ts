import {
  Component,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from "@angular/core"
import {
  KuiAlertDialog,
  KuiDialogBackdrop,
  KuiDialogClose,
  KuiDialogDescription,
  KuiDialogPopup,
  KuiDialogPortal,
  KuiDialogTitle,
  KuiDialogTrigger,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { button } from "../../../styles/button.styles"
import { alertDialog } from "../../../styles/alert-dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A dialog that asks for an answer: `<ng-container kuiAlertDialog>` around its trigger and content,
 * drawing no element, as Base UI's root: Kirana UI's (`KuiAlertDialog`), always modal, a press
 * outside it never closing it, its `[(open)]` and `defaultOpen` its own. Its parts are a dialog's,
 * which find it as their root. Kirana UI's selectors are the registry's, so a part takes its
 * primitive as a host directive and a file imports only one of the two.
 */
@Directive({
  selector: "[kuiAlertDialog]",
  hostDirectives: [
    {
      directive: KuiAlertDialog,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class AlertDialog {}

/** The button that opens it. */
@Directive({
  selector: "[kuiAlertDialogTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogTrigger],
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
}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiAlertDialogPortal]" })
class AlertDialogPortal {}

/** A button that closes it: `<button kuiButton kuiAlertDialogClose variant="outline">`. */
@Directive({
  selector: "[kuiAlertDialogClose]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogClose],
  host: {
    "[attr.data-slot]": "'alert-dialog-close'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogClose {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * What it shows: `<div kuiAlertDialogContent size="sm">`. Kirana UI's portal is a structural part,
 * so the content draws the portal, the backdrop and the popup in its template, its children
 * projected into the popup; its own element stays where it was written, drawing nothing, and the
 * `dir` its caller writes on it goes to the popup.
 */
@Component({
  selector: "[kuiAlertDialogContent]",
  imports: [KuiDialogBackdrop, KuiDialogPopup, KuiDialogPortal],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <ng-template kuiDialogPortal>
      <div
        kuiDialogBackdrop
        data-slot="alert-dialog-overlay"
        [class]="overlay"
      ></div>
      <div
        kuiDialogPopup
        data-slot="alert-dialog-content"
        [attr.data-size]="size()"
        [attr.dir]="host.getAttribute('dir')"
        [class]="part().class"
        [style]="part().style"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
})
class AlertDialogContent {
  readonly size = input<"default" | "sm">("default")
  readonly sx = input<SxInput>()
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly overlay = partSx(
    [backdropMotion, alertDialog.overlay],
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx([modalMotion, alertDialog.content], this.sx())
  )
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
  hostDirectives: [KuiDialogClose],
  host: {
    type: "button",
    "data-slot": "alert-dialog-cancel",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogCancel {
  readonly variant = input<ButtonVariants["variant"]>("outline")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/** Its title, which names the dialog. */
@Directive({
  selector: "h2[kuiAlertDialogTitle]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogTitle],
  host: {
    "data-slot": "alert-dialog-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDialogTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alertDialog.title, this.sx()))
}

/** Its description, which describes the dialog. */
@Directive({
  selector: "p[kuiAlertDialogDescription]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogDescription],
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
