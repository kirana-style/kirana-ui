import { Component, Directive, computed, input } from "@angular/core"
import {
  KpProgress,
  KpProgressIndicator,
  KpProgressLabel,
  KpProgressTrack,
  KpProgressValue,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { progress } from "../../../styles/progress.styles"

/**
 * A progress bar: `<div kuiProgress [value]="60">`, on Kirana UI's progress (`KpProgress`), which
 * writes `role="progressbar"`, its `aria-value*` and `data-progressing`, `data-complete` and
 * `data-indeterminate`: its `value`, `min` and `max` are the primitive's. Its content (a label, a
 * value) comes first, then the track and indicator it draws, as React's; the indicator's width is
 * the value's share of the range.
 */
@Component({
  selector: "[kuiProgress]",
  imports: [KpProgressIndicator, KpProgressTrack, SxDirective],
  hostDirectives: [{ directive: KpProgress, inputs: ["value", "min", "max"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <div kpProgressTrack data-slot="progress-track" [sx]="track">
      <div
        kpProgressIndicator
        data-slot="progress-indicator"
        [sx]="indicator"
      ></div>
    </div>
  `,
})
class Progress {
  readonly sx = input<SxInput>()
  protected readonly track = progress.track
  protected readonly indicator = progress.indicator
  protected readonly part = computed(() => partSx(progress.root, this.sx()))
}

/** Its label, which names the bar (`aria-labelledby`). */
@Directive({
  selector: "span[kuiProgressLabel]",
  hostDirectives: [KpProgressLabel],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ProgressLabel {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(progress.label, this.sx()))
}

/**
 * Its value as text (`60%`), which Kirana UI's part (`KpProgressValue`) writes as the element's
 * text, in place of any content.
 */
@Directive({
  selector: "span[kuiProgressValue]",
  hostDirectives: [KpProgressValue],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-value",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ProgressValue {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(progress.value, this.sx()))
}

export { Progress, ProgressLabel, ProgressValue }
