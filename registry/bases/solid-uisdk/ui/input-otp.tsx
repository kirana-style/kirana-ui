import { omit, Show } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { OTPInput, OTPInputSlot } from "@ui-sdk/solid/otp-input"
import type { OTPInputSlotState } from "@ui-sdk/solid/otp-input"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild, AsChildProps } from "../../../lib/solid2/uisdk-part"
import { inputOtp } from "../../../styles/input-otp.styles"
import { IconPlaceholder } from "./icon-placeholder"

/** Ark's `type` as ui-sdk's `pattern`: letters and digits unless the caller narrows it. */
const PATTERNS = {
  numeric: "digits",
  alphabetic: "letters",
  alphanumeric: "alphanumeric",
} as const

/**
 * ui-sdk's code input: one real input under the slots. `maxLength`, upstream's name for how many
 * slots there are; `value` and `defaultValue` the code as one string, as upstream's, with
 * `onValueChange` called with `{ value }` as Solid's Ark UI part calls it. Letters and digits, as
 * the Ark UI part took them, unless `type` (`numeric`, `alphabetic`) narrows it: ui-sdk's
 * `pattern`, which upstream also calls `pattern`. `id` and the `aria-*` names go to the input.
 */
function InputOTP(props: {
  maxLength: number
  /** Upstream's, one string: Ark's is a character per slot. */
  defaultValue?: string
  value?: string
  /** Ark's change, as a details object: the code as one string. */
  onValueChange?: (details: { value: string }) => void
  type?: keyof typeof PATTERNS
  disabled?: boolean
  required?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "onValueChange", "type", "class", "sx")
  return (
    <UisdkPart
      part={OTPInput}
      slotName="input-otp"
      pattern={PATTERNS[props.type ?? "alphanumeric"]}
      {...rest}
      onValueChange={(value: string) => props.onValueChange?.({ value })}
      {...styleProps(
        props.class,
        inputOtp.container,
        inputOtp.containerUisdk,
        props.sx
      )}
    />
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
 * A slot: its character, and the blinking caret while it is the active, empty one, as React's
 * `input-otp` slot draws them. ui-sdk marks the active slot `data-active=""`; the styles read
 * `input-otp`'s `data-active="true"`, so the slot writes that over it.
 */
function InputOTPSlot(props: {
  index: number
  asChild?: AsChild
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <OTPInputSlot
      {...rest}
      {...styleProps(props.class, inputOtp.slot, props.sx)}
      render={(given: Record<string, unknown>, state: OTPInputSlotState) => {
        const asChild = props.asChild
        return asChild ? (
          asChild(
            (userProps) =>
              ({
                ...userProps,
                ...given,
                "data-slot": "input-otp-slot",
                "data-active": state.active ? "true" : undefined,
              }) as AsChildProps
          )
        ) : (
          <div
            {...given}
            data-slot="input-otp-slot"
            data-active={state.active ? "true" : undefined}
          />
        )
      }}
    >
      {(state: OTPInputSlotState) => (
        <>
          {state.char}
          <Show when={state.hasFakeCaret}>
            <div sx={inputOtp.caret}>
              <div sx={inputOtp.caretLine} />
            </div>
          </Show>
        </>
      )}
    </OTPInputSlot>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
