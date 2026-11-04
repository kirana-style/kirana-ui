import { Component, Directive, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpRadioGroup,
  NgpRadioItem,
  injectRadioItemState,
} from "ng-primitives/radio"

import { keepAriaInvalid } from "../../../lib/angular/control"
import { radioGroup } from "../../../styles/radio-group.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/**
 * A radio group: `<div kuiRadioGroup [(value)]="plan">`, on ng-primitives' `NgpRadioGroup`
 * (`role="radiogroup"`, the arrow keys moving between its items), taking its inputs under Base UI's
 * names (`value`, `defaultValue`, `disabled`).
 */
@Directive({
  selector: "[kuiRadioGroup]",
  hostDirectives: [
    {
      directive: NgpRadioGroup,
      inputs: [
        "ngpRadioGroupValue: value",
        "ngpRadioGroupDefaultValue: defaultValue",
        "ngpRadioGroupDisabled: disabled",
        "ngpRadioGroupOrientation: orientation",
      ],
      outputs: ["ngpRadioGroupValueChange: valueChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "radio-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class RadioGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(radioGroup.root, this.sx()))
}

/**
 * One of its radios: `<span kuiRadioGroupItem value="pro" id="…">`, on ng-primitives' `NgpRadioItem`,
 * which writes `role="radio"`, `aria-checked` and Base UI's `data-checked` and `data-disabled`. A
 * `span`, as Base UI's, its indicator there only while checked, as Base UI mounts it; a hidden radio
 * inside takes the `id`, so a `<label for>` reaches it (its click bubbles to the item, which selects
 * itself). It takes `aria-invalid` (`keepAriaInvalid`).
 */
@Component({
  selector: "span[kuiRadioGroupItem]",
  imports: [SxDirective],
  hostDirectives: [
    {
      directive: NgpRadioItem,
      inputs: ["ngpRadioItemValue: value", "ngpRadioItemDisabled: disabled"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "radio-group-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (state().checked()) {
      <span data-slot="radio-group-indicator" data-checked="" [sx]="indicator">
        <span [sx]="dot"></span>
      </span>
    }
    @if (id()) {
      <input
        type="radio"
        tabindex="-1"
        aria-hidden="true"
        [attr.id]="id()"
        [checked]="state().checked()"
        [sx]="hidden"
      />
    }
  `,
})
class RadioGroupItem {
  readonly id = input<string>()
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly state = injectRadioItemState()
  protected readonly indicator = radioGroup.indicator
  protected readonly dot = radioGroup.dot
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() => partSx(radioGroup.item, this.sx()))

  constructor() {
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { RadioGroup, RadioGroupItem }
