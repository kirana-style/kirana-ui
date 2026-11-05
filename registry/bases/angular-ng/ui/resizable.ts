import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { resizable } from "../../../styles/resizable.styles"

let next = 0

type Panel = {
  element: HTMLElement
  id: string
  defaultSize?: number
  minSize: number
  maxSize: number
  size: ReturnType<typeof signal<number>>
}

/** A group's panels, in the page's order, and their sizes in percent. */
class Group {
  readonly orientation = signal<"horizontal" | "vertical">("horizontal")
  readonly panels = signal<Panel[]>([])

  add(panel: Panel) {
    const panels = [...this.panels(), panel].sort((a, b) =>
      a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1
    )
    // The panels without a size share what the others leave.
    const sized = panels.filter((entry) => entry.defaultSize !== undefined)
    const left = 100 - sized.reduce((sum, entry) => sum + entry.defaultSize!, 0)
    const free = panels.length - sized.length
    for (const entry of panels)
      entry.size.set(entry.defaultSize ?? (free ? left / free : 0))
    this.panels.set(panels)
  }

  remove(panel: Panel) {
    this.panels.set(this.panels().filter((entry) => entry !== panel))
  }

  /** The panels on either side of a handle. */
  around(handle: HTMLElement): [Panel, Panel] | null {
    const panels = this.panels()
    const after = panels.findIndex(
      (entry) =>
        handle.compareDocumentPosition(entry.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
    )
    return after > 0 ? [panels[after - 1]!, panels[after]!] : null
  }

  /** Called with every panel's size once a handle moves. */
  changed?: (layout: number[]) => void

  /** Moves the boundary between two panels by `delta` percent, within their limits. */
  resize([before, after]: [Panel, Panel], delta: number) {
    const total = before.size() + after.size()
    let size = before.size() + delta
    size = Math.max(before.minSize, Math.min(before.maxSize, size))
    size = Math.max(
      total - after.maxSize,
      Math.min(total - after.minSize, size)
    )
    before.size.set(size)
    after.size.set(total - size)
    this.changed?.(this.panels().map((entry) => entry.size()))
  }
}

const GROUP = new InjectionToken<Group>("kui resizable group")

/**
 * Panels a handle resizes: `<div kuiResizablePanelGroup orientation="vertical">`. The registry's
 * own, drawing `react-resizable-panels`' markup (the group, each panel with its inner box, the
 * handles as separators with their values): `angular-split` draws elements of its own.
 */
@Directive({
  selector: "[kuiResizablePanelGroup]",
  providers: [
    provideSxPart(),
    { provide: GROUP, useFactory: () => new Group() },
  ],
  host: {
    "data-slot": "resizable-panel-group",
    "data-group": "true",
    "[attr.id]": "id",
    "[attr.aria-orientation]": "null",
    "[style]": "style()",
    "[class]": "part().class",
  },
})
class ResizablePanelGroup {
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly sx = input<SxInput>()
  protected readonly id = `kui-resizable-${next++}`
  protected readonly group = inject(GROUP)
  protected readonly part = computed(() => partSx(resizable.group, this.sx()))

  /** Every panel's size, in percent, as a handle moves them (React's `onLayoutChange`). */
  readonly layoutChange = output<number[]>()

  constructor() {
    effect(() => this.group.orientation.set(this.orientation()))
    this.group.changed = (layout) => this.layoutChange.emit(layout)
  }

  protected readonly style = computed(() => {
    const vertical = this.orientation() === "vertical"
    return `height: 100%; width: 100%; overflow: hidden; display: flex; flex-direction: ${vertical ? "column" : "row"}; flex-wrap: nowrap; touch-action: ${vertical ? "pan-x" : "pan-y"}; ${this.part().style ?? ""}`
  })
}

/** One of its panels: `<div kuiResizablePanel [defaultSize]="25">`, sizes in percent. */
@Component({
  selector: "[kuiResizablePanel]",
  host: {
    "data-slot": "resizable-panel",
    "data-panel": "true",
    "[attr.id]": "id",
    "[style]": "style()",
  },
  template: `<div [style]="inner()"><ng-content /></div>`,
})
class ResizablePanel {
  readonly defaultSize = input(undefined, {
    transform: (value: unknown) =>
      value === undefined ? undefined : numberAttribute(value),
  })
  readonly minSize = input(0, { transform: numberAttribute })
  readonly maxSize = input(100, { transform: numberAttribute })
  protected readonly id = `kui-resizable-panel-${next++}`
  readonly #group = inject(GROUP)
  readonly #size = signal(0)
  protected readonly style = computed(
    () =>
      `min-height: 0px; max-height: 100%; height: auto; min-width: 0px; max-width: 100%; width: auto; border: 0px; padding: 0px; margin: 0px; display: flex; flex: ${this.#size()} 1 0px; overflow: visible;`
  )
  protected readonly inner = computed(
    () =>
      `max-height: 100%; max-width: 100%; flex-grow: 1; overflow: auto; touch-action: ${this.#group.orientation() === "vertical" ? "pan-x" : "pan-y"}`
  )

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- the panel's getters read its inputs.
    const self = this
    const panel: Panel = {
      element,
      id: this.id,
      get defaultSize() {
        return self.defaultSize()
      },
      get minSize() {
        return self.minSize()
      },
      get maxSize() {
        return self.maxSize()
      },
      size: this.#size,
    }
    queueMicrotask(() => this.#group.add(panel))
    inject(DestroyRef).onDestroy(() => this.#group.remove(panel))
  }
}

/**
 * The boundary between two panels, which the pointer drags and the arrow keys move (by 10%, Home and
 * End to the limits); `withHandle` draws a grip on it.
 */
@Component({
  selector: "[kuiResizableHandle]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "resizable-handle",
    role: "separator",
    tabindex: "0",
    "[attr.id]": "id",
    "[attr.aria-orientation]":
      "group.orientation() === 'horizontal' ? 'vertical' : 'horizontal'",
    "[attr.data-separator]": "state()",
    "[attr.aria-controls]": "panels()?.[0].id ?? null",
    "[attr.aria-valuemax]": "100",
    "[attr.aria-valuemin]": "0",
    "[attr.aria-valuenow]": "now()",
    "[style]": "style()",
    "[class]": "part().class",
    "(pointerdown)": "press($event)",
    "(pointerenter)": "hovered.set(true)",
    "(pointerleave)": "hovered.set(false)",
    "(keydown)": "keydown($event)",
  },
  template: `@if (withHandle()) {
    <div [sx]="grip"></div>
  }`,
})
class ResizableHandle {
  readonly withHandle = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly id = `kui-resizable-handle-${next++}`
  protected readonly group = inject(GROUP)
  protected readonly grip = resizable.grip
  protected readonly hovered = signal(false)
  protected readonly dragging = signal(false)
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly part = computed(() => partSx(resizable.handle, this.sx()))
  protected readonly style = computed(
    () =>
      `flex-basis: auto; flex-grow: 0; flex-shrink: 0; touch-action: none; ${this.part().style ?? ""}`
  )
  protected readonly panels = computed(() => {
    this.group.panels()
    return this.group.around(this.#element)
  })
  protected readonly now = computed(() => {
    const panels = this.panels()
    // To three decimals, as react-resizable-panels writes it.
    return panels ? Math.round(panels[0].size() * 1000) / 1000 : null
  })
  protected readonly state = computed(() =>
    this.dragging() ? "active" : this.hovered() ? "hover" : "inactive"
  )

  protected press(event: PointerEvent) {
    const panels = this.panels()
    const container = this.#element.parentElement
    if (!panels || !container || event.button !== 0) return
    event.preventDefault()
    this.#element.setPointerCapture(event.pointerId)
    this.dragging.set(true)
    const vertical = this.group.orientation() === "vertical"
    const length = vertical ? container.clientHeight : container.clientWidth
    const rtl = getComputedStyle(container).direction === "rtl"
    let last = vertical ? event.clientY : event.clientX
    const move = (pointer: PointerEvent) => {
      const at = vertical ? pointer.clientY : pointer.clientX
      const delta = ((at - last) / length) * 100 * (rtl && !vertical ? -1 : 1)
      last = at
      this.group.resize(panels, delta)
    }
    const end = () => {
      this.dragging.set(false)
      this.#element.removeEventListener("pointermove", move)
      this.#element.removeEventListener("pointerup", end)
      this.#element.removeEventListener("pointercancel", end)
    }
    this.#element.addEventListener("pointermove", move)
    this.#element.addEventListener("pointerup", end)
    this.#element.addEventListener("pointercancel", end)
  }

  protected keydown(event: KeyboardEvent) {
    const panels = this.panels()
    if (!panels) return
    const vertical = this.group.orientation() === "vertical"
    const back = vertical ? "ArrowUp" : "ArrowLeft"
    const forward = vertical ? "ArrowDown" : "ArrowRight"
    const delta =
      event.key === back
        ? -10
        : event.key === forward
          ? 10
          : event.key === "Home"
            ? -100
            : event.key === "End"
              ? 100
              : 0
    if (!delta) return
    event.preventDefault()
    this.group.resize(panels, delta)
  }
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
