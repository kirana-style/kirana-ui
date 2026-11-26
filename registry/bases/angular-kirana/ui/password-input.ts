import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import {
  KpPasswordInput,
  KpPasswordInputIndicator,
  KpPasswordInputInput,
  KpPasswordInputToggle,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { inputGroup } from "../../../styles/input-group.styles"
import { passwordInput } from "../../../styles/password-input.styles"

/** The root's inputs and outputs each part hosting Kirana UI's password input exposes. */
const ROOT = {
  directive: KpPasswordInput,
  inputs: ["visible", "defaultVisible", "disabled", "toggleLabels"],
  outputs: ["visibleChange", "visibleChanged", "valueChanged"],
}

/**
 * An eye, struck through while the password can be read: `<span kuiPasswordInputIndicator>`, on
 * Kirana UI's indicator (`KpPasswordInputIndicator`), which says the state only. Its content
 * replaces the eye.
 */
@Component({
  selector: "[kuiPasswordInputIndicator]",
  imports: [IconPlaceholder],
  hostDirectives: [KpPasswordInputIndicator],
  providers: [provideSxPart()],
  host: {
    "data-slot": "password-input-indicator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>
    @if (visible()) {
      <svg
        iconPlaceholder
        lucide="EyeOffIcon"
        tabler="IconEyeClosed"
        hugeicons="ViewOffIcon"
        phosphor="EyeSlashIcon"
        remixicon="RiEyeOffLine"
      ></svg>
    } @else {
      <svg
        iconPlaceholder
        lucide="EyeIcon"
        tabler="IconEye"
        hugeicons="EyeIcon"
        phosphor="EyeIcon"
        remixicon="RiEyeLine"
      ></svg>
    }
  </ng-content>`,
})
class PasswordInputIndicator {
  readonly sx = input<SxInput>()
  private readonly indicator = inject(KpPasswordInputIndicator, { self: true })
  protected readonly visible = computed(
    () => this.indicator.state().visible === true
  )
  protected readonly part = computed(() =>
    partSx(passwordInput.indicator, this.sx())
  )
}

/**
 * The show/hide button, in its addon at the field's inline end: `<div kuiPasswordInputToggle>`,
 * the addon, drawing Kirana UI's toggle (`KpPasswordInputToggle`) inside it, a ghost icon button.
 * It draws its indicator unless given content; `sx` styles the button, as React's does.
 */
@Component({
  selector: "[kuiPasswordInputToggle]",
  imports: [KpPasswordInputToggle, PasswordInputIndicator],
  host: {
    "data-slot": "password-input-addon",
    "data-align": "inline-end",
    "[class]": "addon",
  },
  template: `<button
    kpPasswordInputToggle
    data-slot="password-input-toggle"
    data-size="icon-xs"
    [class]="part().class"
    [style]="part().style"
  >
    <ng-content><span kuiPasswordInputIndicator></span></ng-content>
  </button>`,
})
class PasswordInputToggle {
  readonly sx = input<SxInput>()
  protected readonly addon = partSx(
    inputGroup.addon({ align: "inline-end" }),
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx(
      [button({ variant: "ghost" }), inputGroup.button({ size: "icon-xs" })],
      this.sx()
    )
  )
}

/** The `<input>`: a password, or text while it is shown. */
@Directive({
  selector: "input[kuiPasswordInputInput]",
  hostDirectives: [KpPasswordInputInput],
  providers: [provideSxPart()],
  host: {
    "data-slot": "password-input-input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PasswordInputInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, inputGroup.input], this.sx())
  )
}

/**
 * The field's root, around its input and toggle: `<div kuiPasswordInputRoot>`, on Kirana UI's
 * password input (`KpPasswordInput`), its `[(visible)]`, `defaultVisible` and `disabled` the
 * primitive's, `toggleLabels` (`{ show, hide }`) what the toggle is called, `(visibleChanged)` and
 * `(valueChanged)` its changes with their details.
 */
@Directive({
  selector: "[kuiPasswordInputRoot]",
  hostDirectives: [ROOT],
  providers: [provideSxPart()],
  host: {
    "data-slot": "password-input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PasswordInputRoot {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputGroup.root, passwordInput.root], this.sx())
  )
}

/**
 * The whole field: `<div kuiPasswordInput id="…" autocomplete="current-password">`, the root
 * drawing its input and its show/hide button. The root's own inputs are the primitive's (above);
 * the input's (`id`, `name`, `placeholder`, `autocomplete`, `required`, `minLength`, `maxLength`,
 * `defaultValue`, and the `aria-` ones) go to the input it draws, and leave this element. `sx`
 * styles the field, as the root draws it.
 */
@Component({
  selector: "[kuiPasswordInput]",
  imports: [PasswordInputInput, PasswordInputToggle],
  hostDirectives: [ROOT],
  providers: [provideSxPart()],
  host: {
    "data-slot": "password-input",
    // The input takes these: Angular leaves the caller's static attributes on this element too.
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.placeholder]": "null",
    "[attr.autocomplete]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-labelledby]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.aria-invalid]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<input
      kuiPasswordInputInput
      [attr.id]="id() ?? null"
      [attr.name]="name() ?? null"
      [attr.placeholder]="placeholder() ?? null"
      [attr.autocomplete]="autocomplete() ?? null"
      [attr.minlength]="minLength() ?? null"
      [attr.maxlength]="maxLength() ?? null"
      [attr.aria-label]="ariaLabel() ?? null"
      [attr.aria-labelledby]="ariaLabelledby() ?? null"
      [attr.aria-describedby]="ariaDescribedby() ?? null"
      [attr.aria-invalid]="ariaInvalid() ?? null"
      [required]="required()"
      [value]="defaultValue()"
    />
    <div kuiPasswordInputToggle></div>`,
})
class PasswordInput {
  readonly id = input<string>()
  readonly name = input<string>()
  readonly placeholder = input<string>()
  readonly autocomplete = input<string>()
  readonly required = input(false, { transform: booleanAttribute })
  readonly minLength = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value == null ? undefined : numberAttribute(value),
  })
  readonly maxLength = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value == null ? undefined : numberAttribute(value),
  })
  readonly defaultValue = input("")
  readonly ariaLabel = input<string>(undefined, { alias: "aria-label" })
  readonly ariaLabelledby = input<string>(undefined, {
    alias: "aria-labelledby",
  })
  readonly ariaDescribedby = input<string>(undefined, {
    alias: "aria-describedby",
  })
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputGroup.root, passwordInput.root], this.sx())
  )
}

export {
  PasswordInput,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputRoot,
  PasswordInputToggle,
}
