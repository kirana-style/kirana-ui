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
  KpDialog,
  KpDialogBackdrop,
  KpDialogClose,
  KpDialogDescription,
  KpDialogPopup,
  KpDialogPortal,
  KpDialogTitle,
  KpDialogTrigger,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/**
 * A panel that slides in from a side: `<ng-container kuiSheet>` around its trigger and content,
 * drawing no element, a dialog as Base UI's it is built on: Kirana UI's dialog root
 * (`KpDialog`), its `[(open)]` and `defaultOpen` its own.
 */
@Directive({
  selector: "[kuiSheet]",
  hostDirectives: [
    {
      directive: KpDialog,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
})
class Sheet {}

/** The button that opens it. */
@Directive({
  selector: "[kuiSheetTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogTrigger],
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
}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiSheetPortal]" })
class SheetPortal {}

/** A button that closes it: `<button kuiButton kuiSheetClose variant="outline">`. */
@Directive({
  selector: "[kuiSheetClose]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogClose],
  host: {
    "[attr.data-slot]": "'sheet-close'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetClose {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** The close button in the content's corner, drawn as a Button (`ghost`, `icon-sm`). */
@Component({
  selector: "button[kuiSheetCornerClose]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KpDialogClose],
  host: {
    type: "button",
    "data-slot": "sheet-close",
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
class SheetCornerClose {
  protected readonly hidden = visuallyHidden
  protected readonly part = partSx(
    [button({ variant: "ghost", size: "icon-sm" }), sheet.close],
    undefined
  ).class
}

/**
 * The panel, against a side of the page (`side`, `right` by default), with its close button unless
 * `showCloseButton` is false. Kirana UI's portal is a structural part, so the content draws the
 * portal, the backdrop and the popup in its template, its children projected into the popup; its
 * own element stays where it was written, drawing nothing, and the `dir` its caller writes on it
 * goes to the popup.
 */
@Component({
  selector: "[kuiSheetContent]",
  imports: [SheetCornerClose, KpDialogBackdrop, KpDialogPopup, KpDialogPortal],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <ng-template kpDialogPortal>
      <div kpDialogBackdrop data-slot="sheet-overlay" [class]="overlay"></div>
      <div
        kpDialogPopup
        [attr.data-slot]="popupSlot() ?? 'sheet-content'"
        [attr.data-sidebar]="popupSidebar()"
        [attr.data-mobile]="popupMobile()"
        [attr.data-side]="side()"
        [attr.dir]="host.getAttribute('dir')"
        [class]="part().class"
        [style]="part().style"
      >
        <ng-content />
        @if (showCloseButton()) {
          <button kuiSheetCornerClose></button>
        }
      </div>
    </ng-template>
  `,
})
class SheetContent {
  readonly side = input<"top" | "right" | "bottom" | "left">("right")
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  /**
   * The popup's slot and marks where a part draws the sheet as itself (the sidebar on a phone:
   * `popupSlot="sidebar"`): the content's own element draws nothing, so they go to the popup.
   */
  readonly popupSlot = input<string>()
  readonly popupSidebar = input<string>()
  readonly popupMobile = input<string>()
  readonly sx = input<SxInput>()
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly overlay = partSx(sheet.overlay, undefined).class
  protected readonly part = computed(() =>
    partSx([sheet.content, sheet.side[this.side()]], this.sx())
  )
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

/** Its title, which names the dialog. */
@Directive({
  selector: "h2[kuiSheetTitle]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogTitle],
  host: {
    "data-slot": "sheet-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.title, this.sx()))
}

/** Its description, which describes the dialog. */
@Directive({
  selector: "p[kuiSheetDescription]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogDescription],
  host: {
    "data-slot": "sheet-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SheetDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(sheet.description, this.sx()))
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
