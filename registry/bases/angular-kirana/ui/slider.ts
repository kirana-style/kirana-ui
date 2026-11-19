import {
  Component,
  HostAttributeToken,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
} from "@angular/core"
import {
  KuiSlider,
  KuiSliderControl,
  KuiSliderIndicator,
  KuiSliderThumb,
  KuiSliderTrack,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { slider } from "../../../styles/slider.styles"

const list = (value: number | readonly number[]) =>
  Array.isArray(value) ? [...value] : [value as number]

/**
 * A slider with one thumb or several: `<div kuiSlider [defaultValue]="[25, 50]" [max]="100">`, on
 * Kirana UI's slider (`KuiSlider`): a control holding the track, its range and the thumbs, each
 * thumb holding its hidden input (`role="slider"` and the keyboard come with it), the thumbs kept
 * inside the track at its ends, as Base UI's `thumbAlignment="edge"` places them. It takes Base UI's
 * inputs: `value` or `defaultValue` (a number or a list), `min`, `max`, `step`, `orientation`,
 * `disabled`, and gives `valueChange` the list.
 *
 * PF-035: a directive of the registry's cannot give a primitive it takes as a host directive an
 * input of its own (`thumbAlignment="edge"`, which upstream's slider always sets): Angular binds a
 * host directive's inputs only from where the element is written. So the slider is drawn inside
 * this part, its own element drawing nothing, with the caller's `aria-label` handed to it.
 */
@Component({
  selector: "[kuiSlider]:not(ng-template):not([data-kui-inner])",
  imports: [
    KuiSlider,
    KuiSliderControl,
    KuiSliderIndicator,
    KuiSliderThumb,
    KuiSliderTrack,
  ],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // The slider's, below: Angular leaves the caller's static attribute on this element too.
    "[attr.aria-label]": "null",
  },
  template: `
    <div
      kuiSlider
      data-kui-inner
      data-slot="slider"
      [value]="value()"
      [defaultValue]="initial()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [orientation]="orientation()"
      [disabled]="disabled()"
      [thumbAlignment]="'edge'"
      [attr.aria-label]="label"
      [class]="part().class"
      [style]="part().style"
      (valueChange)="changed($event)"
    >
      <div kuiSliderControl [class]="styles.control">
        <div kuiSliderTrack data-slot="slider-track" [class]="styles.track">
          <div
            kuiSliderIndicator
            data-slot="slider-range"
            [class]="styles.range"
          ></div>
        </div>
        @for (thumb of thumbs(); track thumb) {
          <div
            kuiSliderThumb
            data-slot="slider-thumb"
            [class]="styles.thumb"
          ></div>
        }
      </div>
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

  protected readonly label = inject(new HostAttributeToken("aria-label"), {
    optional: true,
  })
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

  protected changed(value: number | readonly number[] | undefined) {
    if (value !== undefined) this.valueChange.emit(list(value))
  }
}

export { Slider }
