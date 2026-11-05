import {
  Directive,
  EventEmitter,
  effect,
  input,
  linkedSignal,
} from "@angular/core"
import type { OnDestroy } from "@angular/core"
import { Directionality } from "@angular/cdk/bidi"
import type { Direction } from "@angular/cdk/bidi"

/**
 * The reading direction for every part inside: `<ng-container kuiDirectionProvider
 * [direction]="dir()">`, drawing no element, as Base UI's `DirectionProvider`. It provides the
 * Angular CDK's `Directionality`, which a part reads with `inject(Directionality)` (`useDirection`);
 * the registry's own parts read the page's direction where they place things, as Base UI's do.
 */
@Directive({
  selector: "[kuiDirectionProvider]",
  providers: [{ provide: Directionality, useExisting: DirectionProvider }],
})
class DirectionProvider implements Directionality, OnDestroy {
  readonly direction = input<Direction>("ltr")
  readonly valueSignal = linkedSignal(() => this.direction())
  readonly change = new EventEmitter<Direction>()

  get value(): Direction {
    return this.valueSignal()
  }

  constructor() {
    let first = true
    effect(() => {
      const value = this.valueSignal()
      if (!first) this.change.emit(value)
      first = false
    })
  }

  ngOnDestroy() {
    this.change.complete()
  }
}

/** The direction a `DirectionProvider` around gives, or the CDK's own (the page's). */
export { Directionality as useDirection } from "@angular/cdk/bidi"
export { DirectionProvider }
