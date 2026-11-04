import { createSignal, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputRoot,
} from "@ark-ui/solid"
import { inputOtp } from "../../../styles/input-otp.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PinInputInputProps } from "@ark-ui/solid"

function InputOTP(props: {
  maxLength: number
  /** Upstream's, one string: Ark's is a character per slot. */
  defaultValue?: string
  value?: string
  /** Ark's change, as a details object: the code as one string. */
  onValueChange?: (details: { value: string }) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "maxLength",
    "defaultValue",
    "value",
    "onValueChange",
    "class",
    "sx",
    "children",
  ])
  /**
   * `maxLength`, upstream's name for how many slots there are: Ark's `count`. The value is the
   * code as one string, as upstream's `value`; Ark's own is a character per slot. Any character, as
   * upstream's, unless `type` (Ark's `numeric`, `alphabetic`) narrows it: upstream's `pattern`.
   */
  return (
    <PinInputRoot
      data-slot="input-otp"
      count={local.maxLength}
      type="alphanumeric"
      defaultValue={
        local.defaultValue === undefined
          ? undefined
          : Array.from(local.defaultValue)
      }
      value={local.value === undefined ? undefined : Array.from(local.value)}
      otp
      {...rest}
      {...styleProps(local.class, inputOtp.container, local.sx)}
      onValueChange={(details) =>
        local.onValueChange?.({ value: details.valueAsString })
      }
    >
      <PinInputControl {...styleProps(inputOtp.controlArk)}>
        {local.children}
      </PinInputControl>
      <PinInputHiddenInput {...styleProps(inputOtp.input)} />
    </PinInputRoot>
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

function InputOTPSlot(props: {
  index: number
  asChild?: PinInputInputProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["index", "asChild", "class", "sx"])
  // The slot holding the focus is the active one, as React's slot marks it.
  const [active, setActive] = createSignal(false)
  return (
    <PinInputInput
      asChild={local.asChild}
      data-slot="input-otp-slot"
      index={local.index}
      data-active={active()}
      {...rest}
      {...styleProps(local.class, inputOtp.slot, inputOtp.slotArk, local.sx)}
      onFocus={() => {
        setActive(true)
      }}
      onBlur={() => {
        setActive(false)
      }}
    />
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
