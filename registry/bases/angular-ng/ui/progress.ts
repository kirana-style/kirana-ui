import { Component, Directive, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpProgress,
  NgpProgressIndicator,
  NgpProgressLabel,
  NgpProgressTrack,
  NgpProgressValue,
  injectProgressState,
} from "ng-primitives/progress"

import { progress } from "../../../styles/progress.styles"

/**
 * A progress bar: `<div kuiProgress [value]="60">`, on ng-primitives' `NgpProgress`, which writes
 * `role="progressbar"`, its `aria-value*` and Base UI's `data-progressing`, `data-complete` and
 * `data-indeterminate`. Its content (a label, a value) comes first, then the track and indicator it
 * draws, as React's; the indicator's width is the value's share of the range.
 */
@Component({
  selector: "[kuiProgress]",
  imports: [NgpProgressIndicator, NgpProgressTrack, SxDirective],
  hostDirectives: [
    {
      directive: NgpProgress,
      inputs: [
        "ngpProgressValue: value",
        "ngpProgressMin: min",
        "ngpProgressMax: max",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <div ngpProgressTrack data-slot="progress-track" [sx]="track">
      <div
        ngpProgressIndicator
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
  hostDirectives: [NgpProgressLabel],
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

/** Its value as text (`60%`), or its own content where it has some. */
@Component({
  selector: "span[kuiProgressValue]",
  hostDirectives: [NgpProgressValue],
  providers: [provideSxPart()],
  host: {
    "data-slot": "progress-value",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>{{ state().valueText() }}</ng-content>`,
})
class ProgressValue {
  readonly sx = input<SxInput>()
  protected readonly state = injectProgressState()
  protected readonly part = computed(() => partSx(progress.value, this.sx()))
}

export { Progress, ProgressLabel, ProgressValue }
