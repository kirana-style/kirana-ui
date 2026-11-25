import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
  model,
} from "@angular/core"
import { KpToggle, KpToggleGroup, hostInputs } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { segmentedControl } from "../../../styles/segmented-control.styles"
import { tabs } from "../../../styles/tabs.styles"

type SegmentedControlSize = "sm" | "default" | "lg"

/** What a SegmentedControl hands its items, as React's context does: its size. */
const SEGMENTED_CONTROL = new InjectionToken<() => SegmentedControlSize>(
  "kui segmented control"
)

/**
 * One value chosen from a few: `<div kuiSegmentedControl [(value)]="view" aria-label="View">`, on
 * Kirana UI's toggle group (`KpToggleGroup`), its `disabled` and `loopFocus` the primitive's. Its
 * `[(value)]` and `defaultValue` hold one value, given to the group as its list of one
 * (`hostInputs`). One item is always chosen: a change that would leave none is refused.
 */
@Directive({
  selector: "[kuiSegmentedControl]",
  hostDirectives: [
    { directive: KpToggleGroup, inputs: ["disabled", "loopFocus"] },
  ],
  providers: [
    provideSxPart(),
    {
      provide: SEGMENTED_CONTROL,
      useFactory: () => inject(SegmentedControl).size,
    },
  ],
  host: {
    "data-slot": "segmented-control",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SegmentedControl {
  readonly size = input<SegmentedControlSize>("default")
  readonly value = model<string>()
  readonly defaultValue = input<string>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([tabs.list, tabs.listDefault, segmentedControl.root], this.sx())
  )

  constructor() {
    hostInputs(KpToggleGroup, {
      value: computed(() => {
        const value = this.value()
        return value === undefined ? undefined : [value]
      }),
      defaultValue: computed(() => {
        const value = this.defaultValue()
        return value === undefined ? undefined : [value]
      }),
    })
    inject(KpToggleGroup).valueChanged.subscribe(({ value, details }) => {
      // One item is always chosen: pressing the chosen one again would leave none, so it is
      // refused.
      if (value.length === 0) {
        details.cancel()
        return
      }
      this.value.set(value[0] as string)
    })
  }
}

/**
 * One choice: `<button kuiSegmentedControlItem value="list">`, Kirana UI's toggle (`KpToggle`)
 * with a `value`, which the control holds while it is chosen: its `value` and `disabled` are the
 * primitive's.
 */
@Directive({
  selector: "button[kuiSegmentedControlItem]",
  hostDirectives: [{ directive: KpToggle, inputs: ["value", "disabled"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "segmented-control-item",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class SegmentedControlItem {
  readonly sx = input<SxInput>()
  protected readonly size =
    inject(SEGMENTED_CONTROL, { optional: true }) ?? (() => "default" as const)
  protected readonly part = computed(() =>
    partSx([tabs.trigger, segmentedControl.item], this.sx())
  )
}

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlSize }
