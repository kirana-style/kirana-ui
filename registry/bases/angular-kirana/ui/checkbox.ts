import { Component, computed, inject, input, output } from "@angular/core"
import { KpCheckbox, KpCheckboxIndicator } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { keepAriaInvalid } from "../../../lib/angular/control"
import { checkbox } from "../../../styles/checkbox.styles"

/**
 * A checkbox: `<span kuiCheckbox id="…" [checked]="on" (checkedChange)="…">`, on Kirana UI's
 * checkbox (`KpCheckbox`), which writes `role="checkbox"`, `aria-checked`, `data-checked` and
 * `data-indeterminate`, mounts its indicator while checked or indeterminate, and draws the hidden
 * native checkbox inside, which a `<label for>` and a form reach: the `id` and `name` are that
 * input's (`kpId`, `name`), so the box gives its own element's `id` up. Its `checked`,
 * `defaultChecked`, `indeterminate`, `disabled` and `required` are the primitive's.
 *
 * `checkedChange` is the registry's, a `boolean` as upstream's callers take it: the primitive's
 * model reports `boolean | undefined`. It is told what the user changed (the primitive's
 * `checkedChanged`), and `indeterminateChange` that a box shown indeterminate is no longer, which
 * the caller's `indeterminate` then says. Both halves of `[(checked)]` must be one directive's in
 * Angular, so a caller binds `[checked]` and `(checkedChange)` apart.
 */
@Component({
  selector: "span[kuiCheckbox]",
  imports: [IconPlaceholder, KpCheckboxIndicator, SxDirective],
  hostDirectives: [
    {
      directive: KpCheckbox,
      inputs: [
        "checked",
        "defaultChecked",
        "indeterminate",
        "disabled",
        "required",
        "name",
        "kpId: id",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "checkbox",
    // The hidden input's: Angular leaves the caller's static `id` on this element too.
    "[attr.id]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span *kpCheckboxIndicator data-slot="checkbox-indicator" [sx]="indicator">
      <svg
        iconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      ></svg>
    </span>
  `,
})
class Checkbox {
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  readonly checkedChange = output<boolean>()
  readonly indeterminateChange = output<boolean>()
  protected readonly indicator = checkbox.indicator
  protected readonly part = computed(() => partSx(checkbox.root, this.sx()))

  constructor() {
    const box = inject(KpCheckbox)
    box.checkedChanged.subscribe(({ checked }) => {
      if (box.indeterminate()) this.indeterminateChange.emit(false)
      this.checkedChange.emit(checked)
    })
    // Kirana UI writes `aria-invalid` only from a Field; a bound `[aria-invalid]` is this input,
    // which Angular takes off the element, so the part writes it back.
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { Checkbox }
