import { createSignal, onCleanup, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Otp } from "@kirana-ui/solid/otp"
import { asRender } from "../../../lib/solid/element"
import { inputOtp } from "../../../styles/input-otp.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  /** Ark UI's `type`, Kirana UI's `mode`: any character, as upstream's, unless it narrows it. */
  type?: "numeric" | "alphabetic" | "alphanumeric"
  disabled?: boolean
  name?: string
  form?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, root, rest] = splitProps(
    props,
    ["maxLength", "onValueChange", "type", "class", "sx", "children"],
    ["defaultValue", "value", "disabled", "name", "form"]
  )
  // The container's height, which the input's font follows (`--root-height`), as `input-otp`
  // measures it.
  const [height, setHeight] = createSignal(0)
  const measure = (element: HTMLElement) => {
    const observer = new ResizeObserver(() => setHeight(element.offsetHeight))
    observer.observe(element)
    onCleanup(() => observer.disconnect())
  }
  const own = styleProps(inputOtp.container, inputOtp.containerKirana)
  return (
    <Otp.Root
      ref={measure}
      length={local.maxLength}
      mode={local.type ?? "alphanumeric"}
      {...root}
      onValueChange={(value: string) => local.onValueChange?.({ value })}
      class={own.class}
      style={{ ...own.style, "--root-height": `${height()}px` }}
    >
      {local.children}
      <Otp.Input
        data-slot="input-otp"
        spellcheck={false}
        {...rest}
        {...styleProps(
          local.class,
          inputOtp.input,
          inputOtp.inputKirana,
          local.sx
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="input-otp-group"
      {...rest}
      {...styleProps(local.class, inputOtp.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function InputOTPSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      {...rest}
      {...styleProps(local.class, inputOtp.separator, local.sx)}
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
  const [local, rest] = splitProps(props, ["index", "asChild", "class", "sx"])
  return (
    <Otp.Slot
      render={asRender(local.asChild)}
      data-slot="input-otp-slot"
      index={local.index}
      {...rest}
      {...styleProps(local.class, inputOtp.slot, local.sx)}
    >
      <Otp.Caret {...styleProps(inputOtp.caret)}>
        <div sx={inputOtp.caretLine} />
      </Otp.Caret>
    </Otp.Slot>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
