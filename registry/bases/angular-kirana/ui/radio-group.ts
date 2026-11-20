import { Component, Directive, computed, input } from "@angular/core"
import {
  KpRadioGroup,
  KpRadioGroupIndicator,
  KpRadioGroupItem,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { keepAriaInvalid } from "../../../lib/angular/control"
import { radioGroup } from "../../../styles/radio-group.styles"

/**
 * A radio group: `<div kuiRadioGroup [(value)]="plan">`, on Kirana UI's radio group
 * (`KpRadioGroup`, `role="radiogroup"`, the arrow keys moving between its items): its
 * `[(value)]`, `defaultValue` and `disabled` are the primitive's. `orientation` is kept for its
 * callers and changes nothing, as Base UI's group, whose arrows move both ways, takes none.
 */
@Directive({
  selector: "[kuiRadioGroup]",
  hostDirectives: [
    {
      directive: KpRadioGroup,
      inputs: ["value", "defaultValue", "disabled"],
      outputs: ["valueChange"],
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
  readonly orientation = input<"horizontal" | "vertical">()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(radioGroup.root, this.sx()))
}

/**
 * One of its radios: `<span kuiRadioGroupItem value="pro" id="…">`, on Kirana UI's item
 * (`KpRadioGroupItem`), which writes `role="radio"`, `aria-checked` and `data-checked`, mounts its
 * indicator while chosen, and draws the hidden native radio inside, which a `<label for>` reaches:
 * the `id` is that input's (Kirana UI's `kpId`), so the item gives its own element's `id` up. It
 * takes `aria-invalid`.
 */
@Component({
  selector: "span[kuiRadioGroupItem]",
  imports: [KpRadioGroupIndicator, SxDirective],
  hostDirectives: [
    {
      directive: KpRadioGroupItem,
      inputs: ["value", "disabled", "kpId: id"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "radio-group-item",
    // The hidden radio's: Angular leaves the caller's static `id` on this element too.
    "[attr.id]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span
      *kpRadioGroupIndicator
      data-slot="radio-group-indicator"
      [sx]="indicator"
    >
      <span [sx]="dot"></span>
    </span>
  `,
})
class RadioGroupItem {
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly indicator = radioGroup.indicator
  protected readonly dot = radioGroup.dot
  protected readonly part = computed(() => partSx(radioGroup.item, this.sx()))

  constructor() {
    // Kirana UI writes `aria-invalid` only from a Field; a bound `[aria-invalid]` is this input,
    // which Angular takes off the element, so the part writes it back.
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { RadioGroup, RadioGroupItem }
