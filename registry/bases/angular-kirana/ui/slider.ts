import {
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
} from "@angular/core"
import {
  KpSlider,
  KpSliderControl,
  KpSliderIndicator,
  KpSliderThumb,
  KpSliderTrack,
  hostInputs,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { slider } from "../../../styles/slider.styles"

const list = (value: number | readonly number[]) =>
  Array.isArray(value) ? [...value] : [value as number]

/**
 * A slider with one thumb or several: `<div kuiSlider [defaultValue]="[25, 50]" [max]="100">`, on
 * Kirana UI's slider (`KpSlider`): a control holding the track, its range and the thumbs, each
 * thumb holding its hidden input (`role="slider"` and the keyboard come with it), the thumbs kept
 * inside the track at its ends, as Base UI's `thumbAlignment="edge"` places them. It takes Base UI's
 * inputs: `value` or `defaultValue` (a number or a list), `min`, `max`, `step`, `orientation`,
 * `disabled`, and gives `valueChange` the list.
 */
@Component({
  selector: "[kuiSlider]",
  imports: [KpSliderControl, KpSliderIndicator, KpSliderThumb, KpSliderTrack],
  providers: [provideSxPart()],
  hostDirectives: [KpSlider],
  host: {
    "data-slot": "slider",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div kpSliderControl [class]="styles.control">
      <div kpSliderTrack data-slot="slider-track" [class]="styles.track">
        <div
          kpSliderIndicator
          data-slot="slider-range"
          [class]="styles.range"
        ></div>
      </div>
      @for (thumb of thumbs(); track thumb) {
        <div
          kpSliderThumb
          data-slot="slider-thumb"
          [class]="styles.thumb"
        ></div>
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

  constructor() {
    hostInputs(KpSlider, {
      value: () => this.value(),
      defaultValue: () => this.initial(),
      min: () => this.min(),
      max: () => this.max(),
      step: () => this.step(),
      orientation: () => this.orientation(),
      disabled: () => this.disabled(),
      thumbAlignment: () => "edge",
    })
    // Kirana UI's `value` is a model: what it is set to is the change, as `(valueChange)` hears it.
    inject(KpSlider).value.subscribe((value) => {
      if (value !== undefined) this.valueChange.emit(list(value))
    })
  }

  protected readonly styles = {
    control: partSx(slider.control, undefined).class,
    track: partSx(slider.track, undefined).class,
    range: partSx(slider.range, undefined).class,
    thumb: partSx(slider.thumb, undefined).class,
  }
  protected readonly part = computed(() => partSx(slider.root, this.sx()))

  /** The caller's `defaultValue`, or upstream's `[min, max]`. */
  protected readonly initial = computed(
    () => this.defaultValue() ?? [this.min(), this.max()]
  )
  /**
   * A thumb per value of a list, as React's Slider draws them; two for one number, as upstream's
   * draws a thumb for each of its `[min, max]` default.
   */
  protected readonly thumbs = computed(() => {
    const given = this.value() ?? this.defaultValue()
    const count = Array.isArray(given) ? given.length : 2
    return Array.from({ length: count }, (_, index) => index)
  })
}

export { Slider }
