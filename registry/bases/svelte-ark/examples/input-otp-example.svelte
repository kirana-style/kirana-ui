<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { axes } from "../../../core/axes"
  import { Example, ExampleWrapper } from "../components/example"
  import { Button } from "../ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card"
  import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../ui/input-otp"
  import {
    containerSize,
    fontSize,
    fontWeight,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { theme } from "../../../core/tokens"

  const { nova, vega, lyra, maia, mira, luma } = axes.style

  const styles = {
    mxAutoMaxWMd: css({ marginInline: "auto", maxWidth: containerSize.md }),
    medium: css({ fontWeight: fontWeight.medium }),
    flexItemsCenterJustifyBe: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),
    dataSlotInputOtpSlotText: css({
      // `*:data-[slot=input-otp-slot]:text-xl` and each style's size, on each slot: a group's reach
      // into its slots would lose to their own size. Rhea and Sera keep the slot's.
      width: {
        [nova]: space[11],
        [vega]: space[12],
        [lyra]: space[11],
        [maia]: space[12],
        [mira]: space[11],
        [luma]: space[12],
      },
      height: {
        [nova]: space[12],
        [vega]: space[16],
        [lyra]: space[12],
        [maia]: space[16],
        [mira]: space[12],
        [luma]: space[16],
      },
      fontSize: { "*": null, base: fontSize.xl },
      lineHeight: { "*": null, base: lineHeight.xl },
    }),
    flexColGap2: css({
      flexDirection: "column",
      gap: { "*": null, base: space[2] },
    }),
    full: css({ width: "100%" }),
    textSmTextMutedForegroun: css({
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      color: theme.mutedForeground,
    }),
    underlineUnderlineOffset: css({
      textDecorationLine: "underline",
      textUnderlineOffset: "4px",
      transitionProperty: "color, background-color, border-color",
      transitionDuration: "150ms",
      color: { ":hover": theme.primary },
    }),
  }

  let value = $state("123456")

  let invalidValue = $state("000000")
</script>

<ExampleWrapper>
  <!-- InputOTPForm -->
  <Example title="Form">
    <Card sx={styles.mxAutoMaxWMd}>
      <CardHeader>
        <CardTitle>
          Verify your login
        </CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:
          <span sx={styles.medium}>
            m@example.com
          </span>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Field>
            <div sx={styles.flexItemsCenterJustifyBe}>
              <FieldLabel for="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs">
                <IconPlaceholder lucide="RefreshCwIcon" hugeicons="RefreshIcon" tabler="IconRefresh" phosphor="ArrowClockwiseIcon" remixicon="RiRefreshLine" data-icon="inline-start" />
                Resend Code
              </Button>
            </div>
            <InputOTP maxLength={6} id="otp-verification" required>
              <InputOTPGroup>
                <InputOTPSlot index={0} sx={styles.dataSlotInputOtpSlotText} />
                <InputOTPSlot index={1} sx={styles.dataSlotInputOtpSlotText} />
                <InputOTPSlot index={2} sx={styles.dataSlotInputOtpSlotText} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} sx={styles.dataSlotInputOtpSlotText} />
                <InputOTPSlot index={4} sx={styles.dataSlotInputOtpSlotText} />
                <InputOTPSlot index={5} sx={styles.dataSlotInputOtpSlotText} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
              <a href="#">
                I no longer have access to this email address.
              </a>
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter sx={styles.flexColGap2}>
        <Button type="submit" sx={styles.full}>
          Verify
        </Button>
        <div sx={styles.textSmTextMutedForegroun}>
          Having trouble signing in?
          <a href="#" sx={styles.underlineUnderlineOffset}>
            Contact support
          </a>
        </div>
      </CardFooter>
    </Card>
  </Example>
  <!-- InputOTPSimple -->
  <Example title="Simple">
    <Field>
      <FieldLabel for="simple">
        Simple
      </FieldLabel>
      <InputOTP id="simple" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  </Example>
  <!-- InputOTPPattern -->
  <Example title="Digits Only">
    <Field>
      <FieldLabel for="digits-only">
        Digits Only
      </FieldLabel>
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
  </Example>
  <!-- InputOTPWithSeparator -->
  <Example title="With Separator">
    <Field>
      <FieldLabel for="with-separator">
        With Separator
      </FieldLabel>
      <InputOTP id="with-separator" maxLength={6} value={value} onValueChange={(details: { value: typeof value }) => (value = details.value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  </Example>
  <!-- InputOTPAlphanumeric -->
  <Example title="Alphanumeric">
    <Field>
      <FieldLabel for="alphanumeric">
        Alphanumeric
      </FieldLabel>
      <FieldDescription>
        Accepts both letters and numbers.
      </FieldDescription>
      <InputOTP id="alphanumeric" maxLength={6} type="alphanumeric">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  </Example>
  <!-- InputOTPDisabled -->
  <Example title="Disabled">
    <Field>
      <FieldLabel for="disabled">
        Disabled
      </FieldLabel>
      <InputOTP id="disabled" maxLength={6} disabled value="123456">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  </Example>
  <!-- InputOTPFourDigits -->
  <Example title="4 Digits">
    <Field>
      <FieldLabel for="four-digits">
        4 Digits
      </FieldLabel>
      <FieldDescription>
        Common pattern for PIN codes.
      </FieldDescription>
      <InputOTP id="four-digits" maxLength={4} type="numeric">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  </Example>
  <!-- InputOTPInvalid -->
  <Example title="Invalid State">
    <Field>
      <FieldLabel for="invalid">
        Invalid State
      </FieldLabel>
      <FieldDescription>
        Example showing the invalid error state.
      </FieldDescription>
      <InputOTP id="invalid" maxLength={6} value={invalidValue} onValueChange={(details: { value: typeof invalidValue }) => (invalidValue = details.value)}>
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
      <FieldError errors={[{ message: 'Invalid code. Please try again.' }]} />
    </Field>
  </Example>
</ExampleWrapper>
