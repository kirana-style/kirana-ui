import { css } from "@kirana-style/core"

import { REGEXP_ONLY_DIGITS } from "input-otp"

import { Field, FieldLabel } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
}

export default function InputOTPPattern() {
  return (
    <div sx={page.example}>
      <Field sx={styles.fit}>
        <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
        <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </div>
  )
}
