import { Component, Directive, computed, input } from "@angular/core"
import {
  KpTimeField,
  KpTimeFieldInput,
  KpTimeFieldSegment,
  KpTimeFieldSegments,
} from "@kirana-ui/angular"
import type { TimeFieldSegment as Segment } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { input as inputStyle } from "../../../styles/input.styles"
import { timeField } from "../../../styles/time-field.styles"

/**
 * The time's segments, in the locale's order: `<span *kuiTimeFieldSegments="let segment"
 * kuiTimeFieldSegment [segment]="segment">`, Kirana UI's structural part (`KpTimeFieldSegments`),
 * which draws its element once for each segment. Angular gives a list's entries to a template, so
 * the caller writes what each is drawn as, where React's draws a `TimeFieldSegment` by default.
 */
@Directive({
  selector: "[kuiTimeFieldSegments]",
  hostDirectives: [KpTimeFieldSegments],
})
class TimeFieldSegments {
  static ngTemplateContextGuard(
    _directive: TimeFieldSegments,
    _context: unknown
  ): _context is { $implicit: Segment } {
    return true
  }
}

/** One piece of the time, a part that is typed or what stands between two; it writes its own text. */
@Directive({
  selector: "[kuiTimeFieldSegment]",
  hostDirectives: [{ directive: KpTimeFieldSegment, inputs: ["segment"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "time-field-segment",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TimeFieldSegment {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(timeField.segment, this.sx()))
}

/** The hidden input the time is submitted by. */
@Directive({
  selector: "input[kuiTimeFieldInput]",
  hostDirectives: [KpTimeFieldInput],
  host: { "data-slot": "time-field-input" },
})
class TimeFieldInput {}

/**
 * The field, drawn as an Input: `<div kuiTimeField [(value)]="start" locale="en-US">`, on Kirana UI's
 * time field (`KpTimeField`), its `[(value)]`, `defaultValue`, `granularity`, `hourCycle`, `locale`,
 * `min`, `max`, `placeholders`, `disabled`, `readOnly`, `required`, `name` and `form` the
 * primitive's, `(valueChanged)` the change with its details. It draws its segments and hidden input
 * unless given content.
 */
@Component({
  selector: "[kuiTimeField]",
  imports: [KpTimeFieldSegments, TimeFieldInput, TimeFieldSegment],
  hostDirectives: [
    {
      directive: KpTimeField,
      inputs: [
        "value",
        "defaultValue",
        "granularity",
        "hourCycle",
        "locale",
        "min",
        "max",
        "placeholders",
        "disabled",
        "readOnly",
        "required",
        "name",
        "form",
      ],
      outputs: ["valueChange", "valueChanged"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "time-field",
    // The primitive's: Angular leaves the caller's static attributes on this element too.
    "[attr.name]": "null",
    "[attr.min]": "null",
    "[attr.max]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.form]": "null",
    "[attr.locale]": "null",
    "[attr.granularity]": "null",
    "[attr.hourCycle]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content
    ><span
      *kpTimeFieldSegments="let segment"
      kuiTimeFieldSegment
      [segment]="segment"
    ></span
    ><input kuiTimeFieldInput
  /></ng-content>`,
})
class TimeField {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, timeField.root], this.sx())
  )
}

export { TimeField, TimeFieldInput, TimeFieldSegment, TimeFieldSegments }
