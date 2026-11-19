import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core"
import {
  KuiOtp,
  KuiOtpCaret,
  KuiOtpInput,
  KuiOtpSlot,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { inputOtp } from "../../../styles/input-otp.styles"

/**
 * A one-time code: `<div kuiInputOTP [maxLength]="6" [(value)]="code">` around its groups and
 * slots, on Kirana UI's code input (`KuiOtp`): one input laid over the slots, unseen, takes the
 * typing, pasting and autofill, and the slots show its characters, the one at the cursor
 * `data-active` with a caret while empty. Its `maxLength` (Kirana UI's `length`), `[(value)]`,
 * `defaultValue`, `disabled`, `name`, `id` (the input's) and `complete` (Kirana UI's `completed`) are the primitive's,
 * and `type` is Kirana UI's `mode`: any character (`text`, the default), `numeric` or `alphanumeric`
 * (upstream's `pattern`). `containerSx` styles this element, `sx` the input, which takes
 * `required` and `aria-invalid`.
 *
 * A directive of the registry's cannot give a primitive it takes as a host directive a value of
 * its own (PF-035): `OtpRoot` stands in for Kirana UI's code input with `mode` defaulting to any
 * character (`text`), as upstream's `input-otp` takes any without a `pattern`. Kirana UI's `mode` has
 * no letters-only value (PF-038).
 */
@Directive({ providers: [{ provide: KuiOtp, useExisting: OtpRoot }] })
export class OtpRoot extends KuiOtp {
  override readonly mode = input<
    "numeric" | "alphanumeric" | "text" | undefined
  >("text")
}

/** The code input, as React's `InputOTP`: see above. */
@Component({
  selector: "div[kuiInputOTP]",
  imports: [KuiOtpInput],
  hostDirectives: [
    {
      directive: OtpRoot,
      inputs: [
        "length: maxLength",
        "value",
        "defaultValue",
        "mode: type",
        "disabled",
        "name",
        "kuiId: id",
      ],
      outputs: ["valueChange", "completed: complete"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    // The input takes these: Angular leaves the caller's static attributes on this element too.
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.type]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.value]": "null",
    // The container's height, which the input's characters follow, as `input-otp` measures it.
    "[style.--root-height]": "rootHeight()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <input
      #field
      kuiOtpInput
      data-slot="input-otp"
      spellcheck="false"
      [attr.required]="required() ? '' : null"
      [attr.aria-invalid]="ariaInvalid() ?? null"
      [class]="inputPart().class"
      [style]="inputPart().style"
    />
  `,
})
class InputOTP {
  readonly required = input(false, { transform: booleanAttribute })
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly containerSx = input<SxInput>()
  readonly sx = input<SxInput>()

  protected readonly part = computed(() =>
    partSx([inputOtp.container, inputOtp.containerKirana], this.containerSx())
  )
  protected readonly inputPart = computed(() =>
    partSx([inputOtp.input, inputOtp.inputKirana], this.sx())
  )
  protected readonly rootHeight = signal("0px")
  private readonly field =
    viewChild.required<ElementRef<HTMLInputElement>>("field")

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    // Measured once rendered, then as it resizes (an observer waits for a frame to be drawn).
    const measure = () => this.rootHeight.set(`${host.clientHeight}px`)
    afterNextRender(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    inject(DestroyRef).onDestroy(() => observer.disconnect())
  }

  /** Focus the code's input. */
  focusInput() {
    this.field().nativeElement.focus()
  }
}

/** A run of slots drawn as one box. */
@Directive({
  selector: "[kuiInputOTPGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-otp-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class InputOTPGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(inputOtp.group, this.sx()))
}

/**
 * One character's slot: `<div kuiInputOTPSlot [index]="0">`, Kirana UI's slot (`KuiOtpSlot`), which
 * writes its character before its caret and marks itself `data-active`; the caret
 * (`*kuiOtpCaret`) is drawn while it is the active, empty one.
 */
@Component({
  selector: "[kuiInputOTPSlot]",
  imports: [KuiOtpCaret, SxDirective],
  hostDirectives: [{ directive: KuiOtpSlot, inputs: ["index"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-otp-slot",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div *kuiOtpCaret [sx]="caret"><div [sx]="caretLine"></div></div>
  `,
})
class InputOTPSlot {
  readonly sx = input<SxInput>()
  protected readonly caret = inputOtp.caret
  protected readonly caretLine = inputOtp.caretLine
  protected readonly part = computed(() => partSx(inputOtp.slot, this.sx()))
}

/** The dash between groups. */
@Component({
  selector: "[kuiInputOTPSeparator]",
  imports: [IconPlaceholder],
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-otp-separator",
    role: "separator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<svg
    iconPlaceholder
    lucide="MinusIcon"
    tabler="IconMinus"
    hugeicons="MinusSignIcon"
    phosphor="MinusIcon"
    remixicon="RiSubtractLine"
  ></svg>`,
})
class InputOTPSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(inputOtp.separator, this.sx())
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
