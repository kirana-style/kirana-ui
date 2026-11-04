import { Component, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { NgpCheckbox, injectCheckboxState } from "ng-primitives/checkbox"

import { IconPlaceholder } from "../../../icons/angular"
import { keepAriaInvalid } from "../../../lib/angular/control"
import { checkbox } from "../../../styles/checkbox.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/**
 * A checkbox: `<span kuiCheckbox id="…" [(checked)]="on">`, on ng-primitives' `NgpCheckbox`, which
 * writes `role="checkbox"`, `aria-checked` and Base UI's `data-checked` and `data-indeterminate`. A
 * `span`, as Base UI's box, its indicator there only while checked or indeterminate, as Base UI
 * mounts it; a hidden checkbox inside takes the `id` and `name`, so a `<label for>` reaches it (its click
 * bubbles to the box). It takes ng-primitives' inputs under Base UI's names and `aria-invalid`
 * (`keepAriaInvalid`).
 */
@Component({
  selector: "span[kuiCheckbox]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [
    {
      directive: NgpCheckbox,
      inputs: [
        "ngpCheckboxChecked: checked",
        "ngpCheckboxDefaultChecked: defaultChecked",
        "ngpCheckboxIndeterminate: indeterminate",
        "ngpCheckboxDisabled: disabled",
        "ngpCheckboxRequired: required",
      ],
      outputs: [
        "ngpCheckboxCheckedChange: checkedChange",
        "ngpCheckboxIndeterminateChange: indeterminateChange",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "checkbox",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (state().checked() || state().indeterminate()) {
      <span
        data-slot="checkbox-indicator"
        [attr.data-checked]="state().checked() ? '' : null"
        [attr.data-indeterminate]="state().indeterminate() ? '' : null"
        [sx]="indicator"
      >
        <svg
          iconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        ></svg>
      </span>
    }
    @if (id() || name()) {
      <input
        type="checkbox"
        tabindex="-1"
        aria-hidden="true"
        [attr.id]="id()"
        [attr.name]="name()"
        [checked]="state().checked()"
        [sx]="hidden"
      />
    }
  `,
})
class Checkbox {
  readonly id = input<string>()
  readonly name = input<string>()
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly state = injectCheckboxState()
  protected readonly indicator = checkbox.indicator
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() => partSx(checkbox.root, this.sx()))

  constructor() {
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { Checkbox }
