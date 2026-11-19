import { css } from "@kirana-style/core"
import { Field, FieldLabel } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { page } from "../../../styles/page.styles"

export default function InputOtpPattern() {
  const styles = {
    fit: css({ width: "fit-content" }),
  }

  return (
    <div sx={page.example}>
      <Field sx={styles.fit}>
        <FieldLabel for="digits-only">Digits Only</FieldLabel>
        <InputOTP id="digits-only" maxLength={6} type="numeric">
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
