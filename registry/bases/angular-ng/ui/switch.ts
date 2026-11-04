import { Component, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpSwitch,
  NgpSwitchThumb,
  injectSwitchState,
} from "ng-primitives/switch"

import { keepAriaInvalid } from "../../../lib/angular/control"
import { switchStyles } from "../../../styles/switch.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

/**
 * A switch: `<span kuiSwitch id="…" [(checked)]="on">`, on ng-primitives' `NgpSwitch`, which writes
 * `role="switch"`, `aria-checked` and Base UI's `data-checked` and `data-disabled`. A `span`, as Base
 * UI's root, with a hidden checkbox inside that takes the `id` and `name`, as Base UI's hidden input does: a
 * `<label for>` activates the checkbox, whose click bubbles to the switch, which toggles. It takes
 * ng-primitives' inputs under Base UI's names (`checked`, `defaultChecked`, `disabled`, `required`)
 * and `aria-invalid` (`keepAriaInvalid`).
 */
@Component({
  selector: "span[kuiSwitch]",
  imports: [NgpSwitchThumb, SxDirective],
  hostDirectives: [
    {
      directive: NgpSwitch,
      inputs: [
        "ngpSwitchChecked: checked",
        "ngpSwitchDefaultChecked: defaultChecked",
        "ngpSwitchDisabled: disabled",
        "ngpSwitchRequired: required",
      ],
      outputs: ["ngpSwitchCheckedChange: checkedChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "switch",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span ngpSwitchThumb data-slot="switch-thumb" [sx]="thumb"></span>
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
class Switch {
  readonly id = input<string>()
  readonly name = input<string>()
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly size = input<"sm" | "default">("default")
  readonly sx = input<SxInput>()
  protected readonly state = injectSwitchState()
  protected readonly thumb = switchStyles.thumb
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() => partSx(switchStyles.root, this.sx()))

  constructor() {
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { Switch }
