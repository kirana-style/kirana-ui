import type { ElementRef } from "@angular/core"
import {
  Component,
  DestroyRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { slider } from "../../../styles/slider.styles"

/** Base UI's hidden input, inside each thumb: focusable, out of sight and of the layout. */
const HIDDEN_INPUT =
  "clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0;padding:0;width:100%;height:100%;margin:0;position:fixed;top:0;left:0"

const list = (value: number | readonly number[] | undefined) =>
  value === undefined
    ? undefined
    : Array.isArray(value)
      ? [...value]
      : [value as number]

/**
 * A slider with one thumb or several: `<div kuiSlider [defaultValue]="[25, 50]" [max]="100">`.
 *
 * The registry's own, not ng-primitives': its sliders take one thumb (`NgpSlider`) or two
 * (`NgpRangeSlider`), and upstream's demos take three (LF-013). It draws Base UI's markup and
 * geometry: a control holding the track, its range and the thumbs, each thumb a native range input
 * inside (`role="slider"` and the keyboard come with it), the thumbs aligned to the track's edges as
 * Base UI's `thumbAlignment="edge"` places them, and the range from the first thumb to the last (from
 * the start, with one). It takes Base UI's inputs: `value` or `defaultValue` (a number or a list),
 * `min`, `max`, `step`, `orientation`, `disabled`, and gives `valueChange` the list.
 */
@Component({
  selector: "[kuiSlider]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "slider",
    role: "group",
    "[attr.data-orientation]": "orientation()",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div
      #control
      [attr.data-orientation]="orientation()"
      [attr.data-disabled]="disabled() ? '' : null"
      [sx]="styles.control"
      (pointerdown)="press($event)"
    >
      <div
        data-slot="slider-track"
        style="position: relative"
        [attr.data-orientation]="orientation()"
        [attr.data-disabled]="disabled() ? '' : null"
        [sx]="styles.track"
      >
        <div
          data-slot="slider-range"
          [attr.data-orientation]="orientation()"
          [attr.data-disabled]="disabled() ? '' : null"
          [attr.style]="rangeStyle()"
          [sx]="styles.range"
        ></div>
      </div>
      @for (value of values(); track $index) {
        <div
          data-slot="slider-thumb"
          [attr.data-index]="$index"
          [attr.data-orientation]="orientation()"
          [attr.data-disabled]="disabled() ? '' : null"
          [attr.style]="thumbStyle($index)"
          [sx]="styles.thumb"
        >
          <input
            type="range"
            [attr.style]="hiddenInput()"
            [attr.min]="min()"
            [attr.max]="max()"
            [attr.step]="step()"
            [attr.aria-orientation]="orientation()"
            [attr.aria-valuenow]="value"
            [disabled]="disabled()"
            [value]="value"
            (input)="slide($index, $event)"
          />
        </div>
      }
    </div>
  `,
})
class Slider {
  readonly value = input<number | readonly number[]>()
  readonly defaultValue = input<number | readonly number[]>()
  readonly min = input(0, { transform: numberAttribute })
  readonly max = input(100, { transform: numberAttribute })
  readonly step = input(1, { transform: numberAttribute })
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  readonly valueChange = output<number[]>()

  protected readonly styles = slider
  protected readonly part = computed(() => partSx(slider.root, this.sx()))

  /** The thumbs' values: the caller's `value`, or the slider's own from `defaultValue`. */
  protected readonly values = linkedSignal(
    () =>
      list(this.value()) ??
      list(this.defaultValue()) ?? [this.min(), this.max()]
  )

  /** The thumb's length over the track's, which edge alignment keeps the thumbs inside. */
  readonly #thumbShare = signal(0)
  private readonly control =
    viewChild.required<ElementRef<HTMLElement>>("control")

  constructor() {
    const destroy = inject(DestroyRef)
    afterNextRender(() => {
      const control = this.control().nativeElement
      const measure = () => {
        const thumb = control.querySelector<HTMLElement>(
          '[data-slot="slider-thumb"]'
        )
        const vertical = this.orientation() === "vertical"
        const track = vertical ? control.clientHeight : control.clientWidth
        const size = thumb
          ? vertical
            ? thumb.offsetHeight
            : thumb.offsetWidth
          : 0
        this.#thumbShare.set(track > 0 ? size / track : 0)
      }
      measure()
      const observer = new ResizeObserver(measure)
      observer.observe(control)
      destroy.onDestroy(() => observer.disconnect())
    })
  }

  /** A value's place along the track, in percent, with the thumbs kept inside its ends. */
  #position(value: number) {
    const span = this.max() - this.min()
    const share = span > 0 ? (value - this.min()) / span : 0
    const thumb = this.#thumbShare()
    return (thumb / 2 + share * (1 - thumb)) * 100
  }

  protected hiddenInput() {
    return this.orientation() === "vertical"
      ? `${HIDDEN_INPUT};writing-mode:vertical-lr`
      : HIDDEN_INPUT
  }

  protected thumbStyle(index: number) {
    const position = `--position: ${this.#position(this.values()[index]!)}%`
    return this.orientation() === "vertical"
      ? `position: absolute; bottom: var(--position); left: 50%; translate: -50% 50%; ${position};`
      : `position: absolute; inset-inline-start: var(--position); top: 50%; translate: -50% -50%; ${position};`
  }

  protected readonly rangeStyle = computed(() => {
    const values = this.values()
    const vertical = this.orientation() === "vertical"
    if (values.length < 2) {
      const end = `--start-position: ${this.#position(values[0] ?? this.min())}%`
      return vertical
        ? `position: absolute; width: inherit; ${end}; bottom: 0px; height: var(--start-position);`
        : `position: relative; height: inherit; ${end}; inset-inline-start: 0px; width: var(--start-position);`
    }
    const start = this.#position(values[0]!)
    const size = this.#position(values[values.length - 1]!) - start
    const sizes = `--start-position: ${start}%; --relative-size: ${size}%`
    return vertical
      ? `position: absolute; width: inherit; ${sizes}; bottom: var(--start-position); height: var(--relative-size);`
      : `position: relative; height: inherit; ${sizes}; inset-inline-start: var(--start-position); width: var(--relative-size);`
  })

  /** A thumb's value, kept between its neighbours' and on the step. */
  #set(index: number, raw: number) {
    const values = [...this.values()]
    const step = this.step()
    let value = Math.round((raw - this.min()) / step) * step + this.min()
    const low = index > 0 ? values[index - 1]! : this.min()
    const high = index < values.length - 1 ? values[index + 1]! : this.max()
    value = Math.min(high, Math.max(low, value))
    if (values[index] === value) return
    values[index] = value
    this.values.set(values)
    this.valueChange.emit(values)
  }

  /** The keyboard, through the thumb's range input. */
  protected slide(index: number, event: Event) {
    const target = event.target as HTMLInputElement
    this.#set(index, Number(target.value))
    // Back to the kept value when a neighbour stopped it.
    target.value = String(this.values()[index])
  }

  /** A press on the control: the nearest thumb moves there and follows the pointer. */
  protected press(event: PointerEvent) {
    if (this.disabled() || event.button !== 0) return
    const control = this.control().nativeElement
    const valueAt = (pointer: PointerEvent) => {
      const box = control.getBoundingClientRect()
      const vertical = this.orientation() === "vertical"
      const rtl = getComputedStyle(control).direction === "rtl"
      let along = vertical
        ? (box.bottom - pointer.clientY) / box.height
        : (pointer.clientX - box.left) / box.width
      if (!vertical && rtl) along = 1 - along
      const thumb = this.#thumbShare()
      const share = Math.min(1, Math.max(0, (along - thumb / 2) / (1 - thumb)))
      return this.min() + share * (this.max() - this.min())
    }
    const value = valueAt(event)
    const values = this.values()
    let index = 0
    for (let i = 1; i < values.length; i++)
      if (Math.abs(values[i]! - value) < Math.abs(values[index]! - value))
        index = i
    this.#set(index, value)
    event.preventDefault()
    const inputs = control.querySelectorAll<HTMLInputElement>(
      'input[type="range"]'
    )
    inputs[index]?.focus({ preventScroll: true })
    control.setPointerCapture(event.pointerId)
    const move = (next: PointerEvent) => this.#set(index, valueAt(next))
    const end = () => {
      control.removeEventListener("pointermove", move)
      control.removeEventListener("pointerup", end)
      control.removeEventListener("pointercancel", end)
    }
    control.addEventListener("pointermove", move)
    control.addEventListener("pointerup", end)
    control.addEventListener("pointercancel", end)
  }
}

export { Slider }
