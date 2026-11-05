import {
  Component,
  DestroyRef,
  ElementRef,
  InjectionToken,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { presence } from "../../../lib/angular/presence"
import { scrollArea } from "../../../styles/scroll-area.styles"

type Axis = "x" | "y"

/** What a scroll area measures from its viewport, which its scrollbars draw. */
type Measure = {
  overflow: Record<Axis, boolean>
  start: Record<Axis, number>
  end: Record<Axis, number>
}

class ScrollAreaState {
  readonly viewport = signal<HTMLElement | null>(null)
  readonly measure = signal<Measure>({
    overflow: { x: false, y: false },
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  })
  readonly hovering = signal(false)
  readonly scrolling = signal(false)

  update() {
    const viewport = this.viewport()
    if (!viewport) return
    const x = viewport.scrollWidth - viewport.clientWidth
    const y = viewport.scrollHeight - viewport.clientHeight
    const left = Math.abs(viewport.scrollLeft)
    this.measure.set({
      overflow: { x: x > 0, y: y > 0 },
      start: { x: left, y: viewport.scrollTop },
      end: { x: Math.max(0, x - left), y: Math.max(0, y - viewport.scrollTop) },
    })
  }

  /** Base UI's overflow attributes, for the root, the viewport and each scrollbar. */
  readonly attributes = computed(() => {
    const { overflow, start, end } = this.measure()
    const entries: Record<string, string | null> = {}
    for (const axis of ["x", "y"] as const) {
      entries[`data-has-overflow-${axis}`] = overflow[axis] ? "" : null
      entries[`data-overflow-${axis}-start`] =
        overflow[axis] && start[axis] > 0 ? "" : null
      entries[`data-overflow-${axis}-end`] =
        overflow[axis] && end[axis] > 0 ? "" : null
    }
    return entries
  })
}

const SCROLL_AREA = new InjectionToken<ScrollAreaState>("kui scroll area")

const write = (
  element: HTMLElement,
  entries: Record<string, string | null>
) => {
  for (const [name, value] of Object.entries(entries))
    if (value === null) element.removeAttribute(name)
    else element.setAttribute(name, value)
}

/**
 * A scrollbar and its thumb: the area's own vertical one, or `<div kuiScrollBar
 * orientation="horizontal">` inside the area for a horizontal one, in the page only while its
 * axis overflows, as Base UI's (`presence`). Its thumb's length is the
 * visible share of the content, moved as it scrolls; dragging the thumb scrolls the area.
 */
@Component({
  selector: "[kuiScrollBar]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "scroll-area-scrollbar",
    "aria-hidden": "true",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-hovering]": "state.hovering() ? '' : null",
    "[attr.data-scrolling]": "state.scrolling() ? '' : null",
    "[attr.data-has-overflow-x]": "state.attributes()['data-has-overflow-x']",
    "[attr.data-has-overflow-y]": "state.attributes()['data-has-overflow-y']",
    "[attr.data-overflow-x-start]":
      "state.attributes()['data-overflow-x-start']",
    "[attr.data-overflow-x-end]": "state.attributes()['data-overflow-x-end']",
    "[attr.data-overflow-y-start]":
      "state.attributes()['data-overflow-y-start']",
    "[attr.data-overflow-y-end]": "state.attributes()['data-overflow-y-end']",
    "[style]": "style()",
    "[class]": "part().class",
  },
  template: `
    <div
      #thumb
      data-slot="scroll-area-thumb"
      [attr.data-orientation]="orientation()"
      [class]="thumbClass"
      [style]="thumbStyle()"
      (pointerdown)="drag($event)"
    ></div>
  `,
})
class ScrollBar {
  readonly orientation = input<"vertical" | "horizontal">("vertical")
  readonly sx = input<SxInput>()
  protected readonly state = inject(SCROLL_AREA)
  protected readonly thumbClass = partSx(scrollArea.thumb, undefined).class
  protected readonly part = computed(() =>
    partSx(scrollArea.scrollbar, this.sx())
  )
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private readonly thumb = viewChild.required<ElementRef<HTMLElement>>("thumb")
  readonly #track = signal(0)

  /** A horizontal one is drawn only while the content overflows sideways, as Base UI's. */
  protected readonly visible = computed(() =>
    this.orientation() === "vertical"
      ? this.state.measure().overflow.y
      : this.state.measure().overflow.x
  )

  /** The thumb's length, in pixels. */
  readonly #length = computed(() => {
    this.state.measure()
    const viewport = this.state.viewport()
    if (!viewport) return 0
    const vertical = this.orientation() === "vertical"
    const visible = vertical ? viewport.clientHeight : viewport.clientWidth
    const total = vertical ? viewport.scrollHeight : viewport.scrollWidth
    return total > 0 ? (visible / total) * this.#track() : 0
  })

  protected readonly style = computed(() => {
    const vertical = this.orientation() === "vertical"
    const placement = vertical
      ? "top: 0px; bottom: var(--scroll-area-corner-height); inset-inline-end: 0px"
      : "inset-inline-start: 0px; inset-inline-end: var(--scroll-area-corner-width); bottom: 0px"
    const length = `--scroll-area-thumb-${vertical ? "height" : "width"}: ${this.#length()}px`
    return `position: absolute; touch-action: none; user-select: none; ${placement}; ${length}; ${this.part().style ?? ""}`
  })

  protected readonly thumbStyle = computed(() => {
    const vertical = this.orientation() === "vertical"
    const { start, end } = this.state.measure()
    const axis = vertical ? "y" : "x"
    const range = start[axis] + end[axis]
    const offset =
      range > 0 ? (start[axis] / range) * (this.#track() - this.#length()) : 0
    return vertical
      ? `height: var(--scroll-area-thumb-height); transform: translate3d(0px, ${offset}px, 0px);`
      : `width: var(--scroll-area-thumb-width); transform: translate3d(${offset}px, 0px, 0px);`
  })

  constructor() {
    presence(this.visible)
    // The track's length once it is in the page and whenever the area measures again (an
    // observer would wait for a frame to be drawn).
    afterRenderEffect(() => {
      if (!this.visible()) return
      this.state.measure()
      // Inside its padding, as Base UI measures the room the thumb moves in.
      const style = getComputedStyle(this.#element)
      const length =
        this.orientation() === "vertical"
          ? this.#element.clientHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom)
          : this.#element.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight)
      if (length !== this.#track()) this.#track.set(length)
    })
  }

  /** Dragging the thumb scrolls the area by the same share. */
  protected drag(event: PointerEvent) {
    const viewport = this.state.viewport()
    if (!viewport || event.button !== 0) return
    event.preventDefault()
    const thumb = this.thumb().nativeElement
    thumb.setPointerCapture(event.pointerId)
    const vertical = this.orientation() === "vertical"
    let last = vertical ? event.clientY : event.clientX
    const move = (next: PointerEvent) => {
      const at = vertical ? next.clientY : next.clientX
      const room = this.#track() - this.#length()
      const total = vertical
        ? viewport.scrollHeight - viewport.clientHeight
        : viewport.scrollWidth - viewport.clientWidth
      const by = room > 0 ? ((at - last) / room) * total : 0
      last = at
      if (vertical) viewport.scrollTop += by
      else viewport.scrollLeft += by
    }
    const end = () => {
      thumb.removeEventListener("pointermove", move)
      thumb.removeEventListener("pointerup", end)
    }
    thumb.addEventListener("pointermove", move)
    thumb.addEventListener("pointerup", end)
  }
}

/**
 * A box that scrolls with its own thin scrollbars: `<div kuiScrollArea>`. The registry's own,
 * drawing Base UI's markup: the viewport scrolls natively (its own scrollbars hidden by the
 * styles), a scrollbar is drawn for an axis only while it overflows, its thumb sized and moved
 * through Base UI's variables, and the overflow states (`data-has-overflow-y`,
 * `data-overflow-y-end` …) are on the root, the viewport and the scrollbars. A vertical scrollbar
 * comes with it; a horizontal one is the caller's `ScrollBar` inside it.
 */
@Component({
  selector: "[kuiScrollArea]",
  imports: [ScrollBar],
  providers: [
    provideSxPart(),
    { provide: SCROLL_AREA, useFactory: () => new ScrollAreaState() },
  ],
  host: {
    "data-slot": "scroll-area",
    role: "presentation",
    "[style.position]": "'relative'",
    "[style.--scroll-area-corner-height]": "'0px'",
    "[style.--scroll-area-corner-width]": "'0px'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(pointerenter)": "state.hovering.set(true)",
    "(pointerleave)": "state.hovering.set(false)",
  },
  template: `
    <div
      #viewport
      data-slot="scroll-area-viewport"
      tabindex="0"
      [class]="viewportClass"
      [style]="viewportStyle()"
      (scroll)="scrolled()"
    >
      <ng-content />
    </div>
    @if (state.measure().overflow.y) {
      <div kuiScrollBar orientation="vertical"></div>
    }
  `,
})
class ScrollArea {
  readonly sx = input<SxInput>()
  protected readonly state = inject(SCROLL_AREA)
  protected readonly part = computed(() => partSx(scrollArea.root, this.sx()))
  protected readonly viewportClass = partSx(scrollArea.viewport, undefined)
    .class
  protected readonly viewportStyle = computed(() => {
    const { start, end } = this.state.measure()
    return `overflow: scroll; --scroll-area-overflow-x-start: ${start.x}px; --scroll-area-overflow-x-end: ${end.x}px; --scroll-area-overflow-y-start: ${start.y}px; --scroll-area-overflow-y-end: ${end.y}px;`
  })
  private readonly viewport =
    viewChild.required<ElementRef<HTMLElement>>("viewport")
  #timer: ReturnType<typeof setTimeout> | undefined

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const destroy = inject(DestroyRef)
    afterNextRender(() => {
      const viewport = this.viewport().nativeElement
      this.state.viewport.set(viewport)
      this.state.update()
      const observer = new ResizeObserver(() => this.state.update())
      observer.observe(viewport)
      for (const child of viewport.children) observer.observe(child)
      // A picture loading inside changes the content's size before a frame is drawn.
      const loaded = () => this.state.update()
      viewport.addEventListener("load", loaded, true)
      destroy.onDestroy(() => {
        observer.disconnect()
        viewport.removeEventListener("load", loaded, true)
      })
    })
    // The overflow attributes on the root and the viewport, and the viewport's while it scrolls.
    afterRenderEffect(() => {
      const attributes = this.state.attributes()
      const scrolling = this.state.scrolling() ? "" : null
      write(host, attributes)
      write(this.viewport().nativeElement, {
        ...attributes,
        "data-scrolling": scrolling,
      })
    })
    destroy.onDestroy(() => clearTimeout(this.#timer))
  }

  protected scrolled() {
    this.state.scrolling.set(true)
    this.state.update()
    clearTimeout(this.#timer)
    this.#timer = setTimeout(() => this.state.scrolling.set(false), 500)
  }
}

export { ScrollArea, ScrollBar }
