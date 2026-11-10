<script lang="ts">
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../ui/input-otp"
  import { page } from "../../../styles/page.styles"

  let value = $state("000000")
</script>

<div sx={page.example}>
  <InputOTP maxLength={6} value={value} onValueChange={(details: { value: typeof value }) => (value = details.value)}>
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
