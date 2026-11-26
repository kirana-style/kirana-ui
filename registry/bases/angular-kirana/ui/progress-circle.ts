import { Component, Directive, computed, input } from "@angular/core"
import { KpProgress, KpProgressValue } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import {
  progressCircle,
  progressCircleParts,
} from "../../../styles/progress-circle.styles"

type ProgressCircleVariants = NonNullable<Parameters<typeof progressCircle>[0]>

/** The whole range: a ring in the progress track's colour, `<circle kuiProgressCircleTrack>`. */
@Directive({
  selector: "[kuiProgressCircleTrack]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-circle-track",
    pathLength: "100",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ProgressCircleTrack {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(progressCircleParts.track, this.sx())
  )
}

/**
 * The filled part: an arc as long as the value's share of the range,
 * `<circle kuiProgressCircleIndicator>`.
 */
@Directive({
  selector: "[kuiProgressCircleIndicator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-circle-indicator",
    pathLength: "100",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ProgressCircleIndicator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(progressCircleParts.indicator, this.sx())
  )
}

/**
 * The value, written (a percentage of the range by default), for the middle of the ring:
 * `<span kuiProgressCircleLabel>`, which Kirana UI's part (`KpProgressValue`) writes as the
 * element's text, unless the element has content of its own.
 */
@Directive({
  selector: "span[kuiProgressCircleLabel]",
  hostDirectives: [KpProgressValue],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-circle-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ProgressCircleLabel {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(progressCircleParts.label, this.sx())
  )
}

/**
 * A progress ring: `<div kuiProgressCircle [value]="64" aria-label="…">`, on Kirana UI's progress
 * (`KpProgress`), which writes `role="progressbar"`, its `aria-value*` and `data-progressing`,
 * `data-complete` and `data-indeterminate`: its `value`, `min` and `max` are the primitive's. It
 * draws its track and its arc, and its content in the middle.
 */
@Component({
  selector: "[kuiProgressCircle]",
  imports: [ProgressCircleTrack, ProgressCircleIndicator, SxDirective],
  hostDirectives: [{ directive: KpProgress, inputs: ["value", "min", "max"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-circle",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <svg data-slot="progress-circle-svg" aria-hidden="true" [sx]="svg">
      <circle kuiProgressCircleTrack></circle>
      <circle kuiProgressCircleIndicator></circle>
    </svg>
    <ng-content />
  `,
})
class ProgressCircle {
  readonly size = input<ProgressCircleVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly svg = progressCircleParts.svg
  protected readonly part = computed(() =>
    partSx(
      [progressCircleParts.scope, progressCircle({ size: this.size() })],
      this.sx()
    )
  )
}

export {
  ProgressCircle,
  ProgressCircleTrack,
  ProgressCircleIndicator,
  ProgressCircleLabel,
  progressCircle as progressCircleVariants,
}
export type { ProgressCircleVariants }
