import {
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from "@angular/core"
import {
  KuiDialog,
  KuiDialogBackdrop,
  KuiDialogClose,
  KuiDialogDescription,
  KuiDialogPopup,
  KuiDialogPortal,
  KuiDialogTitle,
  KuiDialogTrigger,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, modalMotion } from "../../../styles/overlay.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { buttonLabels } from "./button"

/**
 * A dialog: `<ng-container kuiDialog>` around its trigger and content, drawing no element, as Base
 * UI's root: Kirana UI's (`KuiDialog`), its `[(open)]`, `defaultOpen`, `modal` and `dismissible`
 * its own. Kirana UI's selectors are the registry's, so a part takes its primitive as a host
 * directive and a file imports only one of the two.
 */
@Directive({
  selector: "[kuiDialog]",
  hostDirectives: [
    {
      directive: KuiDialog,
      inputs: ["open", "defaultOpen", "modal", "dismissible"],
      outputs: ["openChange"],
    },
  ],
})
class Dialog {}

/** The button that opens it. */
@Directive({
  selector: "[kuiDialogTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogTrigger],
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
}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiDialogPortal]" })
class DialogPortal {}

/** A button that closes it: `<button kuiButton kuiDialogClose variant="outline">`. */
@Directive({
  selector: "[kuiDialogClose]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogClose],
  host: {
    "[attr.data-slot]": "'dialog-close'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogClose {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** The close button in the content's corner, drawn as a Button (`ghost`, `icon-sm`). */
@Component({
  selector: "button[kuiDialogCornerClose]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KuiDialogClose],
  host: {
    type: "button",
    "data-slot": "dialog-close",
    "[class]": "part",
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
  protected readonly hidden = visuallyHidden
  protected readonly part = partSx(
    [button({ variant: "ghost", size: "icon-sm" }), dialog.close],
    undefined
  ).class
}

/**
 * What it shows: `<div kuiDialogContent>`, with its close button unless `showCloseButton` is false.
 * Kirana UI's portal is a structural part, which an attribute cannot put around its own element:
 * the content draws the portal, the backdrop and the popup in its template, its children projected
 * into the popup, and its own element stays where it was written, drawing nothing.
 */
@Component({
  selector: "[kuiDialogContent]",
  imports: [
    DialogCornerClose,
    KuiDialogBackdrop,
    KuiDialogPopup,
    KuiDialogPortal,
  ],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <ng-template kuiDialogPortal>
      <div kuiDialogBackdrop data-slot="dialog-overlay" [class]="overlay"></div>
      <div
        kuiDialogPopup
        data-slot="dialog-content"
        [attr.dir]="host.getAttribute('dir')"
        [class]="part().class"
        [style]="part().style"
      >
        <ng-content />
        @if (showCloseButton()) {
          <button kuiDialogCornerClose></button>
        }
      </div>
    </ng-template>
  `,
})
class DialogContent {
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  // The caller's `dir` on the content (an RTL demo's), handed to the popup it draws.
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly overlay = partSx(
    [backdropMotion, dialog.overlay],
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx([modalMotion, dialog.content], this.sx())
  )
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
  hostDirectives: [KuiDialogClose],
  host: {
    type: "button",
    "data-slot": "button",
    "[class]": "part",
  },
})
class DialogFooterClose {
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
  hostDirectives: [KuiDialogTitle],
  host: {
    "data-slot": "dialog-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DialogTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(dialog.title, this.sx()))
}

@Directive({
  selector: "p[kuiDialogDescription]",
  providers: [provideSxPart()],
  hostDirectives: [KuiDialogDescription],
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
