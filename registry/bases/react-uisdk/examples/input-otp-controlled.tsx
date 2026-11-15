import { css, select } from "@kirana-style/core"

import * as React from "react"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  spaceY2: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  textCenterTextSm: css({
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div sx={page.example}>
      <div sx={styles.spaceY2}>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(next) => setValue(next)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div sx={styles.textCenterTextSm}>
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
    </div>
  )
}
