import {
  Directive,
  HostAttributeToken,
  computed,
  inject,
  input,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { label } from "../../../styles/label.styles"

@Directive({
  selector: "[kuiLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Label {
  readonly sx = input<SxInput>()
  // A part drawn as the label on the same element (a button group's text) composes the label's
  // style under its own, as upstream's `asChild` merges them; two class bindings would not.
  readonly #within = inject(new HostAttributeToken("kuiButtonGroupText"), {
    optional: true,
  })
  protected readonly part = computed(() =>
    this.#within === null ? partSx(label, this.sx()) : { class: "", style: "" }
  )
}

export { Label }
