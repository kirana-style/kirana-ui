import { createSignal } from "solid-js"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"
import { page } from "../../../styles/page.styles"

export default function InputOtpInvalid() {
  const [value, setValue] = createSignal("000000")

  return (
    <div sx={page.example}>
      <InputOTP
        maxLength={6}
        value={value()}
        onValueChange={(details: { value: ReturnType<typeof value> }) =>
          setValue(details.value)
        }
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid="true" />
          <InputOTPSlot index={1} aria-invalid="true" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} aria-invalid="true" />
          <InputOTPSlot index={3} aria-invalid="true" />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} aria-invalid="true" />
          <InputOTPSlot index={5} aria-invalid="true" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}
