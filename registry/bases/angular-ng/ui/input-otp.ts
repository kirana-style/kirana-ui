import {
  Component,
  DestroyRef,
  Directive,
  afterNextRender,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { inputOtp } from "../../../styles/input-otp.styles"

/** The characters a `type` lets in, as upstream's `pattern`; any, without one. */
const TYPES = {
  any: /^.+$/,
  numeric: /^\d+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z]+$/,
} as const

/** A code's state, which its slots read. */
class OtpState {
  readonly value = signal("")
  readonly focused = signal(false)
  readonly selection = signal<[number, number]>([0, 0])
  readonly maxLength = signal(6)

  /** The slot the next character goes in: the cursor's, or the last once the code is full. */
  readonly active = computed(() => {
    if (!this.focused()) return -1
    const [start] = this.selection()
    return Math.min(start, this.maxLength() - 1)
  })
}

const OTP = new InjectionToken<OtpState>("kui input otp")

/**
 * A one-time code: `<div kuiInputOTP [maxLength]="6" [(value)]="code">` around its groups and slots.
 * The registry's own, as the `input-otp` package React's is built on draws it: one transparent
 * input over the slots takes the typing, pasting and autofill (`autocomplete="one-time-code"`), and
 * the slots show its characters, the one at the cursor `data-active` with a blinking caret while
 * empty. ng-primitives' slot writes its character over its children (LF-015). It takes any
 * character, as input-otp's, unless `type` narrows it (`numeric`, `alphanumeric`, `alphabetic`,
 * upstream's `pattern`); `containerSx` styles
 * this element, `sx` the input.
 */
@Component({
  selector: "div[kuiInputOTP]",
  providers: [
    provideSxPart(),
    { provide: OTP, useFactory: () => new OtpState() },
  ],
  host: {
    "data-input-otp-container": "true",
    // The input takes these: Angular leaves the caller's static attributes on this element too.
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.type]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.value]": "null",
    translate: "no",
    "[style.position]": "'relative'",
    "[style.cursor]": "disabled() ? 'default' : 'text'",
    "[style.user-select]": "'none'",
    "[style.pointer-events]": "'none'",
    "[style.--root-height]": "rootHeight()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content />
    <div style="position: absolute; inset: 0; pointer-events: none">
      <input
        #field
        data-slot="input-otp"
        data-input-otp="true"
        autocomplete="one-time-code"
        spellcheck="false"
        [attr.id]="id()"
        [attr.name]="name()"
        [attr.inputmode]="
          type() === 'numeric' || type() === 'any' ? 'numeric' : 'text'
        "
        [attr.maxlength]="maxLength()"
        [attr.required]="required() ? '' : null"
        [attr.aria-invalid]="ariaInvalid() ?? null"
        [attr.data-input-otp-placeholder-shown]="state.value() ? null : 'true'"
        [disabled]="disabled()"
        [value]="state.value()"
        style="position: absolute; inset: 0; width: 100%; height: 100%; display: flex; text-align: left; opacity: 1; color: transparent; pointer-events: all; background: transparent; caret-color: transparent; border: 0 solid transparent; outline: 0 solid transparent; box-shadow: none; line-height: 1; letter-spacing: -0.5em; font-size: var(--root-height, 16px); font-family: monospace; font-variant-numeric: tabular-nums"
        [class]="inputPart().class"
        (input)="typed(field)"
        (focus)="focus(field)"
        (blur)="state.focused.set(false)"
        (select)="track(field)"
        (keyup)="track(field)"
        (pointerup)="track(field)"
      />
    </div>
  `,
})
class InputOTP {
  readonly maxLength = input.required({ transform: numberAttribute })
  readonly value = input<string>()
  readonly defaultValue = input<string>()
  readonly type = input<keyof typeof TYPES>("any")
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly required = input(false, { transform: booleanAttribute })
  readonly id = input<string>()
  readonly name = input<string>()
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly containerSx = input<SxInput>()
  readonly sx = input<SxInput>()
  readonly valueChange = output<string>()
  readonly complete = output<string>()

  protected readonly state = inject(OTP)
  protected readonly part = computed(() =>
    partSx(inputOtp.container, this.containerSx())
  )
  // Its classes alone: its inline style is input-otp's, which an `[sx]` would replace.
  protected readonly inputPart = computed(() =>
    partSx(inputOtp.input, this.sx())
  )
  protected readonly rootHeight = signal("0px")
  private readonly field =
    viewChild.required<ElementRef<HTMLInputElement>>("field")
  readonly #code = linkedSignal(() => this.value() ?? this.defaultValue() ?? "")

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    effect(() => this.state.maxLength.set(this.maxLength()))
    effect(() => this.state.value.set(this.#code()))
    // The input's characters are as tall as the container, so the cursor lands on the slot pressed.
    const measure = () => this.rootHeight.set(`${host.clientHeight}px`)
    // Measured once rendered, then as it resizes (an observer waits for a frame to be drawn).
    afterNextRender(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    inject(DestroyRef).onDestroy(() => observer.disconnect())
  }

  protected typed(field: HTMLInputElement) {
    const allowed = TYPES[this.type()]
    let next = field.value.slice(0, this.maxLength())
    if (next && !allowed.test(next)) next = this.#code()
    field.value = next
    this.#code.set(next)
    this.valueChange.emit(next)
    if (next.length === this.maxLength()) this.complete.emit(next)
    this.track(field)
  }

  protected focus(field: HTMLInputElement) {
    this.state.focused.set(true)
    // To the end of what is typed, as input-otp places the cursor.
    const end = Math.min(field.value.length, this.maxLength() - 1)
    queueMicrotask(() => {
      field.setSelectionRange(
        end,
        field.value.length >= this.maxLength() ? end + 1 : end
      )
      this.track(field)
    })
  }

  protected track(field: HTMLInputElement) {
    this.state.selection.set([
      field.selectionStart ?? 0,
      field.selectionEnd ?? 0,
    ])
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

/** One character's slot: `<div kuiInputOTPSlot [index]="0">`. */
@Component({
  selector: "[kuiInputOTPSlot]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "input-otp-slot",
    "[attr.data-active]": "active()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  // The character in a container of its own, so no white space around it reaches the slot.
  template: `
    <ng-container>{{ char() }}</ng-container>
    @if (active() && !char()) {
      <div [sx]="caret"><div [sx]="caretLine"></div></div>
    }
  `,
})
class InputOTPSlot {
  readonly index = input.required({ transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly state = inject(OTP)
  protected readonly caret = inputOtp.caret
  protected readonly caretLine = inputOtp.caretLine
  protected readonly char = computed(
    () => this.state.value()[this.index()] ?? ""
  )
  protected readonly active = computed(
    () => this.state.active() === this.index()
  )
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
