import {
  Component,
  Directive,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  input,
} from "@angular/core"
import { NgTemplateOutlet } from "@angular/common"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { css } from "@kirana-style/core"

import { marqueeCtx } from "../../../core/context"
import { marquee } from "../../../styles/marquee.styles"

type MarqueeDirection = "left" | "right" | "up" | "down"

/** One run of the items: `<div kuiMarqueeContent>`. The marquee draws it twice. */
@Directive({
  selector: "[kuiMarqueeContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "marquee-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MarqueeContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(marquee.content, this.sx()))
}

/** One item in the run: `<div kuiMarqueeItem>`. */
@Directive({
  selector: "[kuiMarqueeItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "marquee-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MarqueeItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(marquee.item, this.sx()))
}

/**
 * Its items scrolling in a loop toward `direction`, one loop every `speed` (a CSS time), drawn twice
 * so the loop has no gap: the second copy is hidden from a screen reader and the keyboard. Angular
 * projects content once, so the items are given as an `<ng-template>` inside it
 * (`<div kuiMarquee><ng-template>…</ng-template></div>`), drawn in both copies, where React draws
 * its `children` twice.
 */
@Component({
  selector: "[kuiMarquee]",
  imports: [MarqueeContent, NgTemplateOutlet],
  providers: [provideSxPart()],
  host: {
    "data-slot": "marquee",
    "[attr.data-orientation]": "vertical() ? 'vertical' : 'horizontal'",
    "[attr.data-direction]": "direction()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<div kuiMarqueeContent [sx]="run()">
      <ng-container *ngTemplateOutlet="items() ?? null" />
    </div>
    <div kuiMarqueeContent aria-hidden="true" inert [sx]="duplicate()">
      <ng-container *ngTemplateOutlet="items() ?? null" />
    </div>`,
})
class Marquee {
  readonly direction = input<MarqueeDirection>("left")
  /** One loop, as a CSS time. */
  readonly speed = input<string>("40s")
  /** The space between items, as a CSS length. */
  readonly gap = input<string>()
  readonly pauseOnHover = input(false, { transform: booleanAttribute })
  readonly reverse = input(false, { transform: booleanAttribute })
  readonly fade = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()

  protected readonly items = contentChild(TemplateRef)
  protected readonly vertical = computed(
    () => this.direction() === "up" || this.direction() === "down"
  )
  private readonly reversed = computed(
    () =>
      (this.direction() === "right" || this.direction() === "down") !==
      this.reverse()
  )
  protected readonly run = computed(() => [
    this.vertical() && marquee.contentVertical,
    this.reversed() && marquee.reverse,
    this.pauseOnHover() && marquee.pause,
  ])
  protected readonly duplicate = computed(() => [
    ...this.run(),
    marquee.duplicate,
  ])
  // The knobs, set on the root and read by both copies.
  private readonly knobs = computed(() =>
    css({ [marqueeCtx.duration]: this.speed(), [marqueeCtx.gap]: this.gap() })
  )
  protected readonly part = computed(() =>
    partSx(
      [
        marquee.root,
        this.vertical() && marquee.vertical,
        this.fade() && (this.vertical() ? marquee.fadeY : marquee.fadeX),
        this.knobs(),
      ],
      this.sx()
    )
  )
}

export { Marquee, MarqueeContent, MarqueeItem }
export type { MarqueeDirection }
