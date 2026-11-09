import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterRenderEffect,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
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
import type { Popup } from "../../../lib/angular/popup"
import { drawer } from "../../../styles/drawer.styles"

type Direction = "up" | "down" | "left" | "right"
/** A snap point: a share of the viewport (`0.5`, `1`) or a length (`"31rem"`, `"148px"`). */
type SnapPoint = number | string

/** One drawer's state, which its parts read, and the drawer it is nested in. */
class DrawerState {
  readonly direction = signal<Direction>("down")
  readonly snapPoints = signal<readonly SnapPoint[] | null>(null)
  readonly modal = signal(true)
  readonly showSwipeHandle = signal(false)
  /** The snap point it rests at: the first, until a swipe moves it. */
  readonly snap = signal(0)
  /** Drawers open inside this one. */
  readonly nested = signal(0)

  constructor(
    readonly popup: Popup,
    readonly parent: DrawerState | null
  ) {}
}

const DRAWER = new InjectionToken<DrawerState>("kui drawer")

/** A snap point's height, in pixels. */
const toPixels = (point: SnapPoint) => {
  if (typeof point === "number")
    return point <= 1 ? point * window.innerHeight : point
  const value = parseFloat(point)
  if (point.endsWith("rem"))
    return (
      value * parseFloat(getComputedStyle(document.documentElement).fontSize)
    )
  return value
}

/**
 * A drawer: `<ng-container kuiDrawer swipeDirection="right">` around its trigger and content,
 * drawing no element, as Base UI's root. Base UI's API: `swipeDirection` (the edge it leaves by,
 * `down` by default), `snapPoints`, `modal` (`false` leaves the page usable), `showSwipeHandle`,
 * `[(open)]` or `defaultOpen`. The modal is the registry's (`lib/angular/modal.ts`); the swipe and
 * the snap points are written here, as the custom properties Base UI's drawer hands its styles.
 */
@Directive({
  selector: "[kuiDrawer]",
  providers: [
    providePopup(),
    { provide: MODAL_LABELS, useFactory: () => new ModalLabels() },
    {
      provide: DRAWER,
      useFactory: () =>
        new DrawerState(
          inject(POPUP),
          inject(DRAWER, { optional: true, skipSelf: true })
        ),
    },
  ],
})
class Drawer {
  readonly open = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : booleanAttribute(value),
  })
  readonly defaultOpen = input(false, { transform: booleanAttribute })
  readonly swipeDirection = input<Direction>("down")
  readonly snapPoints = input<readonly SnapPoint[]>()
  readonly modal = input(true, { transform: booleanAttribute })
  readonly showSwipeHandle = input(false, { transform: booleanAttribute })
  readonly openChange = output<boolean>()

  constructor() {
    const state = inject(DRAWER)
    popupRoot(state.popup, this.open, this.defaultOpen, (open) =>
      this.openChange.emit(open)
    )
    effect(() => {
      state.direction.set(this.swipeDirection())
      state.snapPoints.set(this.snapPoints() ?? null)
      state.modal.set(this.modal())
      state.showSwipeHandle.set(this.showSwipeHandle())
    })
  }
}

/** The button that opens it. */
@Directive({
  selector: "[kuiDrawerTrigger]",
  providers: [provideSxPart()],
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

  constructor() {
    popupTrigger(inject(POPUP), { haspopup: "dialog" })
  }
}

/** Upstream's portal, a pass-through here: the content puts itself in a portal. */
@Directive({ selector: "[kuiDrawerPortal]" })
class DrawerPortal {}

/** A button that closes it. */
@Directive({
  selector: "[kuiDrawerClose]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "'drawer-close'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "popup.setOpen(false, 'trigger')",
  },
})
class DrawerClose {
  readonly sx = input<SxInput>()
  protected readonly popup = inject(POPUP)
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * The drawer itself: `<div kuiDrawerContent>`, Base UI's popup in its viewport, its content wrapped
 * as Base UI's (`drawer-content`), the swipe handle above it when asked for. A swipe toward its edge
 * moves it (`--drawer-swipe-movement-*`) and, past half its size or quick enough, closes it, or
 * moves it to the next snap point down; a swipe back moves it to the next snap point up.
 */
@Component({
  selector: "[kuiDrawerContent]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "drawer-popup",
    "[attr.data-swipe-direction]": "state.direction()",
    "[attr.data-swipe-axis]": "axis()",
    "[attr.data-snap-points]": "state.snapPoints()?.length ? '' : null",
    "[attr.data-nested]": "state.parent ? '' : null",
    "[attr.data-nested-drawer-open]": "state.nested() ? '' : null",
    "[attr.data-swiping]": "swiping() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(pointerdown)": "press($event)",
  },
  template: `
    @if (state.showSwipeHandle()) {
      <div
        data-slot="drawer-swipe-handle"
        aria-hidden="true"
        [sx]="handle"
      ></div>
    }
    <div data-drawer-content="" data-slot="drawer-content" [sx]="content">
      <ng-content />
    </div>
  `,
})
class DrawerContent {
  readonly sx = input<SxInput>()
  protected readonly state = inject(DRAWER)
  protected readonly handle = drawer.swipeHandle
  protected readonly content = drawer.content
  protected readonly part = computed(() =>
    partSx([drawer.popup, drawer.motion], this.sx())
  )
  protected readonly axis = computed(() =>
    this.state.direction() === "up" || this.state.direction() === "down"
      ? "y"
      : "x"
  )
  protected readonly swiping = signal(false)
  /** How far a swipe has moved it toward its edge, in pixels. */
  readonly #movement = signal(0)
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement

  constructor() {
    const state = this.state
    modalSurface(state.popup, {
      portalSlot: "drawer-portal",
      overlaySlot: "drawer-overlay",
      overlay: [drawer.overlay],
      modal: state.modal,
      // Base UI focuses a drawer's popup when it opens, not its first tabbable element.
      initialFocus: "content",
      viewport: {
        slot: "drawer-viewport",
        look: [drawer.viewport],
        attributes: () => ({ "data-modal": String(state.modal()) }),
      },
    })
    // A nested drawer counts itself on the one it opens over.
    afterRenderEffect((cleanup) => {
      if (!state.parent || !state.popup.open()) return
      state.parent.nested.update((count) => count + 1)
      cleanup(() => state.parent!.nested.update((count) => count - 1))
    })
    // Base UI's custom properties, on the popup and its backdrop.
    afterRenderEffect(() => {
      if (!state.popup.open()) return
      const element = this.#element
      const height = element.offsetHeight
      const points = state.snapPoints()
      const snap = points?.length
        ? Math.max(
            0,
            height -
              toPixels(points[Math.min(state.snap(), points.length - 1)]!)
          )
        : 0
      const movement = this.#movement()
      const sign =
        state.direction() === "up" || state.direction() === "left" ? -1 : 1
      const size = this.axis() === "y" ? height : element.offsetWidth
      const progress = size > 0 ? Math.min(1, Math.max(0, movement / size)) : 0
      const style = element.style
      style.setProperty(
        "--drawer-swipe-movement-x",
        this.axis() === "x" ? `${sign * movement}px` : "0px"
      )
      style.setProperty(
        "--drawer-swipe-movement-y",
        this.axis() === "y" ? `${sign * movement}px` : "0px"
      )
      style.setProperty("--drawer-swipe-progress", String(progress))
      style.setProperty("--nested-drawers", String(state.nested()))
      style.setProperty("--drawer-snap-point-offset", `${snap}px`)
      style.setProperty("--drawer-swipe-strength", "1")
      style.setProperty("--drawer-frontmost-height", `${height}px`)
      if (state.nested()) style.setProperty("--drawer-height", `${height}px`)
      else style.removeProperty("--drawer-height")
      const overlay = element
        .closest("[data-base-ui-portal]")
        ?.querySelector<HTMLElement>('[data-slot="drawer-overlay"]')
      if (overlay) {
        if (points?.length) overlay.setAttribute("data-snap-points", "")
        overlay.style.setProperty(
          "--drawer-swipe-progress",
          points?.length ? "1" : String(progress)
        )
        overlay.style.setProperty("--drawer-swipe-strength", "1")
        if (points?.length)
          overlay.style.setProperty("--drawer-height", `${height}px`)
      }
    })
    inject(DestroyRef).onDestroy(() => this.swiping.set(false))
  }

  /** A swipe: the pointer moving it toward its edge, then letting go. */
  protected press(event: PointerEvent) {
    const target = event.target as HTMLElement
    if (
      event.button !== 0 ||
      target.closest("input, textarea, select, button, a, [contenteditable]")
    )
      return
    const element = this.#element
    const vertical = this.axis() === "y"
    const sign =
      this.state.direction() === "up" || this.state.direction() === "left"
        ? -1
        : 1
    const start = vertical ? event.clientY : event.clientX
    const time = performance.now()
    element.setPointerCapture(event.pointerId)
    const move = (next: PointerEvent) => {
      const delta = ((vertical ? next.clientY : next.clientX) - start) * sign
      this.swiping.set(true)
      // Toward its edge it follows the pointer; away from it, a quarter as far.
      this.#movement.set(delta >= 0 ? delta : delta / 4)
    }
    const end = (last: PointerEvent) => {
      element.removeEventListener("pointermove", move)
      element.removeEventListener("pointerup", end)
      element.removeEventListener("pointercancel", end)
      const delta = ((vertical ? last.clientY : last.clientX) - start) * sign
      const speed = delta / Math.max(1, performance.now() - time)
      const size = vertical ? element.offsetHeight : element.offsetWidth
      this.swiping.set(false)
      this.#movement.set(0)
      const points = this.state.snapPoints()
      if (points?.length) {
        // Between snap points: down to the next, or closed from the first; up to the one before.
        if (delta > size / 4 || speed > 0.5) {
          if (this.state.snap() === 0)
            this.state.popup.setOpen(false, "outside")
          else this.state.snap.update((snap) => snap - 1)
        } else if (delta < -size / 4 || speed < -0.5)
          this.state.snap.update((snap) =>
            Math.min(points.length - 1, snap + 1)
          )
        return
      }
      if (delta > size / 2 || speed > 0.5)
        this.state.popup.setOpen(false, "outside")
    }
    element.addEventListener("pointermove", move)
    element.addEventListener("pointerup", end)
    element.addEventListener("pointercancel", end)
  }
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

@Directive({
  selector: "h2[kuiDrawerTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "drawer-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class DrawerTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(drawer.title, this.sx()))

  constructor() {
    modalLabel("title")
  }
}

@Directive({
  selector: "p[kuiDrawerDescription]",
  providers: [provideSxPart()],
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

  constructor() {
    modalLabel("description")
  }
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
