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
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { drawer } from "../../../styles/drawer.styles"

/**
 * A drawer: `<ng-container kuiDrawer swipeDirection="right">` around its trigger and content,
 * drawing no element, as Base UI's root: Kirana UI's (`kuiDrawer`, a `KpDialog` that comes from
 * an edge), its `[(open)]`, `defaultOpen`, `swipeDirection` (the edge it leaves by, `down` by
 * default), `snapPoints` and `modal` (`false` leaves the page usable) its own, the swipe and the
 * snap points with them; `showSwipeHandle` is the registry's. Kirana UI's selectors are the
 * registry's, so a part takes its primitive as a host directive and a file imports only one of the
 * two.
 */
@Directive({
  selector: "[kuiDrawer]",
  hostDirectives: [
    {
      directive: KpDialog,
      inputs: ["open", "defaultOpen", "swipeDirection", "snapPoints", "modal"],
      outputs: ["openChange"],
    },
  ],
})
class Drawer {
  readonly showSwipeHandle = input(false, { transform: booleanAttribute })
  readonly #root = inject(KpDialog, { self: true })
  /** What its content reads of it: whether it is modal, its swipe's axis, its snap points. */
  readonly isModal = computed(() => this.#root.modal())
  readonly axis = computed(() => {
    const direction = this.#root.swipeDirection() ?? "down"
    return direction === "up" || direction === "down" ? "y" : "x"
  })
  readonly hasSnapPoints = computed(() => !!this.#root.snapPoints()?.length)
}

/** The button that opens it. */
@Directive({
  selector: "[kuiDrawerTrigger]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogTrigger],
  host: {
    // Bound, so it wins over the slot of a part on the same element.
    "[attr.data-slot]": "'drawer-trigger'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/** Upstream's portal, a pass-through here: the content draws Kirana UI's portal. */
@Directive({ selector: "[kuiDrawerPortal]" })
class DrawerPortal {}

/** A button that closes it. */
@Directive({
  selector: "[kuiDrawerClose]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogClose],
  host: {
    "[attr.data-slot]": "'drawer-close'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerClose {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * The drawer itself: `<div kuiDrawerContent>`, Kirana UI's popup in Base UI's viewport, its
 * content wrapped as Base UI's (`drawer-content`), the swipe handle above it when asked for, the
 * backdrop behind it when it is modal. The swipe, the snap points and the custom properties the
 * styles read (`--drawer-swipe-movement-*` …) are Kirana UI's. Its portal is a structural part, so
 * the content draws it in its template, its children projected inside; its own element stays where
 * it was written, drawing nothing, and the `dir` its caller writes on it goes to the popup.
 */
@Component({
  selector: "[kuiDrawerContent]",
  imports: [KpDialogBackdrop, KpDialogPopup, KpDialogPortal],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <ng-template kpDialogPortal>
      @if (root.isModal()) {
        <div
          kpDialogBackdrop
          data-slot="drawer-overlay"
          [attr.data-snap-points]="root.hasSnapPoints() ? '' : null"
          [class]="overlay"
        ></div>
      }
      <!-- Base UI's Viewport, which Kirana UI's drawer does not have: the box itself, with its
           style. -->
      <div
        data-slot="drawer-viewport"
        [attr.data-modal]="root.isModal()"
        [class]="viewport"
      >
        <div
          kpDialogPopup
          data-slot="drawer-popup"
          [attr.data-swipe-axis]="root.axis()"
          [attr.data-snap-points]="root.hasSnapPoints() ? '' : null"
          [attr.dir]="host.getAttribute('dir')"
          [class]="part().class"
          [style]="part().style"
        >
          @if (root.showSwipeHandle()) {
            <div
              data-slot="drawer-swipe-handle"
              aria-hidden="true"
              [class]="handle"
            ></div>
          }
          <div data-slot="drawer-content" [class]="content">
            <ng-content />
          </div>
        </div>
      </div>
    </ng-template>
  `,
})
class DrawerContent {
  readonly sx = input<SxInput>()
  protected readonly root = inject(Drawer)
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly overlay = partSx(drawer.overlay, undefined).class
  protected readonly viewport = partSx(drawer.viewport, undefined).class
  protected readonly handle = partSx(drawer.swipeHandle, undefined).class
  protected readonly content = partSx(drawer.content, undefined).class
  protected readonly part = computed(() =>
    partSx([drawer.popup, drawer.motion], this.sx())
  )
}

@Directive({
  selector: "[kuiDrawerHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "drawer-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(drawer.header, this.sx()))
}

@Directive({
  selector: "[kuiDrawerFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "drawer-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(drawer.footer, this.sx()))
}

/** Its title, which names the dialog. */
@Directive({
  selector: "h2[kuiDrawerTitle]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogTitle],
  host: {
    "data-slot": "drawer-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(drawer.title, this.sx()))
}

/** Its description, which describes the dialog. */
@Directive({
  selector: "p[kuiDrawerDescription]",
  providers: [provideSxPart()],
  hostDirectives: [KpDialogDescription],
  host: {
    "data-slot": "drawer-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(drawer.description, this.sx())
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
