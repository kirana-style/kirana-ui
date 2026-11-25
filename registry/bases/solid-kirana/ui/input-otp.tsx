import { createSignal, omit, onCleanup } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Otp } from "@kirana-ui/solid/otp"
import { asRender } from "../../../lib/solid2/element"
import { inputOtp } from "../../../styles/input-otp.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/** Ark UI's `type` as Kirana UI's `validationType`. */
const VALIDATION = {
  numeric: "numeric",
  alphabetic: "alpha",
  alphanumeric: "alphanumeric",
} as const

/**
 * Kirana UI's code input, with Solid's Ark UI parts' props: one input the code is typed in, laid
 * over the cells as React's `input-otp` lays it, which carries the slot React's does and takes
 * the caller's other attributes (`id`, so a `<Label for>` reaches it, `aria-invalid`, `sx`).
 */
function InputOTP(props: {
  maxLength: number
  /** Upstream's, one string. */
  defaultValue?: string
  value?: string
  /** Ark's change, as a details object: the code as one string. */
  onValueChange?: (details: { value: string }) => void
  /**
   * Ark UI's `type`, Kirana UI's `validationType`: letters and digits, as upstream's, unless it
   * narrows them.
   */
  type?: "numeric" | "alphabetic" | "alphanumeric"
  disabled?: boolean
  name?: string
  form?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "maxLength",
    "onValueChange",
    "type",
    "class",
    "sx",
    "children",
    "defaultValue",
    "value",
    "disabled",
    "name",
    "form"
  )
  // The container's height, which the input's font follows (`--root-height`), as `input-otp`
  // measures it. The observer is made in the body, where its cleanup is taken, and given the
  // element by the `ref`.
  const [height, setHeight] = createSignal(0)
  let observed: HTMLElement | undefined
  const observer = new ResizeObserver(() => {
    if (observed) setHeight(observed.offsetHeight)
  })
  onCleanup(() => observer.disconnect())
  const measure = (element: HTMLElement) => {
    observed = element
    observer.observe(element)
  }
  const own = styleProps(inputOtp.container, inputOtp.containerKirana)
  return (
    <Otp.Root
      ref={measure}
      length={props.maxLength}
      validationType={VALIDATION[props.type ?? "alphanumeric"]}
      defaultValue={props.defaultValue}
      value={props.value}
      disabled={props.disabled}
      name={props.name}
      form={props.form}
      onValueChange={(value: string) => props.onValueChange?.({ value })}
      class={own.class}
      style={{ ...own.style, "--root-height": `${height()}px` }}
    >
      {props.children}
      <Otp.Input
        data-slot="input-otp"
        spellcheck={false}
        {...rest}
        {...styleProps(
          props.class,
          inputOtp.input,
          inputOtp.inputKirana,
          props.sx
        )}
      />
    </Otp.Root>
  )
}

function InputOTPGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="input-otp-group"
      {...rest}
      {...styleProps(props.class, inputOtp.group, props.sx)}
    >
      {props.children}
    </div>
  )
}

function InputOTPSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      {...rest}
      {...styleProps(props.class, inputOtp.separator, props.sx)}
    >
      <IconPlaceholder
        lucide="MinusIcon"
        tabler="IconMinus"
        hugeicons="MinusSignIcon"
        phosphor="MinusIcon"
        remixicon="RiSubtractLine"
      />
    </div>
  )
}

/**
 * A cell: it writes its character and marks itself active, as React's slot; the caret is drawn
 * while it is the active, empty one.
 */
function InputOTPSlot(props: {
  index: number
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "index", "asChild", "class", "sx")
  return (
    <Otp.Slot
      render={asRender(props.asChild)}
      data-slot="input-otp-slot"
      index={props.index}
      {...rest}
      {...styleProps(props.class, inputOtp.slot, props.sx)}
    >
      <Otp.Caret {...styleProps(inputOtp.caret)}>
        <div sx={inputOtp.caretLine} />
      </Otp.Caret>
    </Otp.Slot>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
