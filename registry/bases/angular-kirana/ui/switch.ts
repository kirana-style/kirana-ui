import { Component, computed, input } from "@angular/core"
import { KuiSwitch, KuiSwitchThumb } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { keepAriaInvalid } from "../../../lib/angular/control"
import { switchStyles } from "../../../styles/switch.styles"

/**
 * A switch: `<span kuiSwitch id="…" [(checked)]="on">`, on Kirana UI's switch (`KuiSwitch`), which
 * writes `role="switch"`, `aria-checked` and `data-checked`, and draws the hidden native checkbox
 * inside, which a `<label for>` and a form reach: the `id` and `name` are that input's (`kuiId`,
 * `name`), so the box gives its own element's `id` up. Its `[(checked)]`, `defaultChecked`,
 * `disabled` and `required` are the primitive's; `aria-invalid` marks it, as upstream's demos do.
 */
@Component({
  selector: "span[kuiSwitch]",
  imports: [KuiSwitchThumb, SxDirective],
  hostDirectives: [
    {
      directive: KuiSwitch,
      inputs: [
        "checked",
        "defaultChecked",
        "disabled",
        "required",
        "name",
        "kuiId: id",
      ],
      outputs: ["checkedChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "switch",
    // The hidden input's: Angular leaves the caller's static `id` on this element too.
    "[attr.id]": "null",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<span
    kuiSwitchThumb
    data-slot="switch-thumb"
    [sx]="thumb"
  ></span>`,
})
class Switch {
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly size = input<"sm" | "default">("default")
  readonly sx = input<SxInput>()
  protected readonly thumb = switchStyles.thumb
  protected readonly part = computed(() => partSx(switchStyles.root, this.sx()))

  constructor() {
    // Kirana UI writes `aria-invalid` only from a Field; a bound `[aria-invalid]` is this input,
    // which Angular takes off the element, so the part writes it back.
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { Switch }
