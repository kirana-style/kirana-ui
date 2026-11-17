"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { OTPInput, OTPInputContext } from "input-otp"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { inputOtp } from "../../../styles/input-otp.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

/** `Omit` over each member of a union, as `OTPInput`'s props are. */
type OmitEach<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

function InputOTP({
  sx,
  containerSx,
  ...props
}: OmitEach<
  React.ComponentProps<typeof OTPInput>,
  "className" | "containerClassName"
> & {
  sx?: Sx
  /** The container around the slots (upstream's `containerClassName`). */
  containerSx?: Sx
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      spellCheck={false}
      {...props}
      containerClassName={styleProps(inputOtp.container, containerSx).className}
      className={styleProps(inputOtp.input, sx).className}
    />
  )
}

function InputOTPGroup({ sx, ...props }: El) {
  return (
    <div data-slot="input-otp-group" {...props} sx={[inputOtp.group, sx]} />
  )
}

function InputOTPSlot({ index, sx, ...props }: El & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      {...props}
      sx={[inputOtp.slot, sx]}
    >
      {char}
      {hasFakeCaret && (
        <div sx={inputOtp.caret}>
          <div sx={inputOtp.caretLine} />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ sx, ...props }: El) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      {...props}
      sx={[inputOtp.separator, sx]}
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

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
