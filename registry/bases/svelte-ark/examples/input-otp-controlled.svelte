<script lang="ts">
  import { css, select } from "@kirana-style/core"
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

  let value = $state("")
</script>

<div sx={page.example}>
  <div sx={styles.spaceY2}>
    <InputOTP value={value} onValueChange={(details: { value: typeof value }) => (value = details.value)} maxLength={6}>
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
      {#if value === ''}
        Enter your one-time password.
      {:else}
        You entered:
        {value}
      {/if}
    </div>
  </div>
</div>
