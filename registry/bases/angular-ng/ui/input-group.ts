import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { button } from "../../../styles/button.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { inputGroup } from "../../../styles/input-group.styles"
import { textarea as textareaStyle } from "../../../styles/textarea.styles"
import { buttonLabels } from "./button"

type AddonOptions = NonNullable<Parameters<typeof inputGroup.addon>[0]>
type ButtonOptions = NonNullable<Parameters<typeof inputGroup.button>[0]>
type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

@Directive({
  selector: "[kuiInputGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-group",
    role: "group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(inputGroup.root, this.sx()))
}

/** A click on the addon, but not on a button in it, focuses the group's input. */
@Directive({
  selector: "[kuiInputGroupAddon]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-group-addon",
    role: "group",
    "[attr.data-align]": "align()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroupAddon {
  readonly align = input<AddonOptions["align"]>("inline-start")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [inputGroup.addonScope, inputGroup.addon({ align: this.align() })],
      this.sx()
    )
  )
}

/** A button inside the group, drawn as a Button (`ghost`, `xs` by default) fitted to it. */
@Directive({
  selector: "button[kuiInputGroupButton]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "button",
    "[attr.type]": "type()",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroupButton {
  readonly type = input<"button" | "submit" | "reset">("button")
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonOptions["size"]>("xs")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [
        button({ variant: this.variant(), size: "default" }),
        inputGroup.button({ size: this.size() }),
      ],
      this.sx()
    )
  )

  constructor() {
    buttonLabels()
  }
}

/** The group's input, an Input without its own border. */
@Directive({
  selector: "input[kuiInputGroupInput]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-group-control",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroupInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, inputGroup.input], this.sx())
  )
}

@Directive({
  selector: "[kuiInputGroupText]",
  providers: [provideSxPart()],
  host: {
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroupText {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(inputGroup.text, this.sx()))
}

/** The group's textarea, a Textarea without its own border. */
@Directive({
  selector: "textarea[kuiInputGroupTextarea]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-group-control",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputGroupTextarea {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([textareaStyle, inputGroup.textarea], this.sx())
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
}
