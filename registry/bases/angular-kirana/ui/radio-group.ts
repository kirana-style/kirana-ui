import {
  Component,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from "@angular/core"
import {
  KuiRadioGroup,
  KuiRadioGroupIndicator,
  KuiRadioGroupItem,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { keepAriaInvalid } from "../../../lib/angular/control"
import { radioGroup } from "../../../styles/radio-group.styles"

/**
 * A radio group: `<div kuiRadioGroup [(value)]="plan">`, on Kirana UI's radio group
 * (`KuiRadioGroup`, `role="radiogroup"`, the arrow keys moving between its items): its
 * `[(value)]`, `defaultValue` and `disabled` are the primitive's. `orientation` is kept for its
 * callers and changes nothing, as Base UI's group, whose arrows move both ways, takes none.
 */
@Directive({
  selector: "[kuiRadioGroup]",
  hostDirectives: [
    {
      directive: KuiRadioGroup,
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
 * (`KuiRadioGroupItem`), which writes `role="radio"`, `aria-checked` and `data-checked`, mounts its
 * indicator while chosen, and draws the hidden native radio inside, which a `<label for>` reaches:
 * the `id` is that input's, so the item gives its own element's `id` up and hands it to the input
 * once the primitive has drawn it (the item takes no id of its own). It takes `aria-invalid`.
 */
@Component({
  selector: "span[kuiRadioGroupItem]",
  imports: [KuiRadioGroupIndicator, SxDirective],
  hostDirectives: [
    { directive: KuiRadioGroupItem, inputs: ["value", "disabled"] },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "radio-group-item",
    "[attr.id]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span
      *kuiRadioGroupIndicator
      data-slot="radio-group-indicator"
      [sx]="indicator"
    >
      <span [sx]="dot"></span>
    </span>
  `,
})
class RadioGroupItem {
  readonly id = input<string>()
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly indicator = radioGroup.indicator
  protected readonly dot = radioGroup.dot
  protected readonly part = computed(() => partSx(radioGroup.item, this.sx()))

  constructor() {
    // PF-036: Kirana UI's radio item takes no id for the hidden radio it draws (its checkbox and
    // switch take `kuiId`), so a `<label for>` beside an item reaches nothing: the part gives the
    // input its `id` once drawn.
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    afterRenderEffect(() => {
      const id = this.id()
      const radio = element.querySelector<HTMLInputElement>(
        ':scope > input[type="radio"]'
      )
      if (!radio) return
      if (id) radio.id = id
      else radio.removeAttribute("id")
    })
    // Kirana UI writes `aria-invalid` only from a Field; a bound `[aria-invalid]` is this input,
    // which Angular takes off the element, so the part writes it back.
    keepAriaInvalid(this.ariaInvalid)
  }
}

export { RadioGroup, RadioGroupItem }
