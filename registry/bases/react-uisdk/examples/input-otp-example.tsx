import { css } from "@kirana-style/core"

import { axes } from "../../../core/axes"

import * as React from "react"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

export default function InputOTPExample() {
  return (
    <ExampleWrapper>
      <InputOTPForm />
      <InputOTPSimple />
      <InputOTPPattern />
      <InputOTPWithSeparator />
      <InputOTPAlphanumeric />
      <InputOTPDisabled />
      <InputOTPFourDigits />
      <InputOTPInvalid />
    </ExampleWrapper>
  )
}

function InputOTPSimple() {
  return (
    <Example title="Simple">
      <Field>
        <FieldLabel htmlFor="simple">Simple</FieldLabel>
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
  )
}

function InputOTPPattern() {
  return (
    <Example title="Digits Only">
      <Field>
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
    </Example>
  )
}

function InputOTPWithSeparator() {
  const [value, setValue] = React.useState("123456")

  return (
    <Example title="With Separator">
      <Field>
        <FieldLabel htmlFor="with-separator">With Separator</FieldLabel>
        <InputOTP
          id="with-separator"
          maxLength={6}
          value={value}
          onChange={setValue}
        >
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
  )
}

function InputOTPAlphanumeric() {
  return (
    <Example title="Alphanumeric">
      <Field>
        <FieldLabel htmlFor="alphanumeric">Alphanumeric</FieldLabel>
        <FieldDescription>Accepts both letters and numbers.</FieldDescription>
        <InputOTP
          id="alphanumeric"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
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
  )
}

function InputOTPDisabled() {
  return (
    <Example title="Disabled">
      <Field>
        <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
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
  )
}

function InputOTPFourDigits() {
  return (
    <Example title="4 Digits">
      <Field>
        <FieldLabel htmlFor="four-digits">4 Digits</FieldLabel>
        <FieldDescription>Common pattern for PIN codes.</FieldDescription>
        <InputOTP id="four-digits" maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPInvalid() {
  const [value, setValue] = React.useState("000000")

  return (
    <Example title="Invalid State">
      <Field>
        <FieldLabel htmlFor="invalid">Invalid State</FieldLabel>
        <FieldDescription>
          Example showing the invalid error state.
        </FieldDescription>
        <InputOTP id="invalid" maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} aria-invalid />
            <InputOTPSlot index={5} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
        <FieldError errors={[{ message: "Invalid code. Please try again." }]} />
      </Field>
    </Example>
  )
}

function InputOTPForm() {
  return (
    <Example title="Form">
      <Card sx={styles.mxAutoMaxWMd}>
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span sx={styles.medium}>m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Field>
              <div sx={styles.flexItemsCenterJustifyBe}>
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button variant="outline" size="xs">
                  <IconPlaceholder
                    lucide="RefreshCwIcon"
                    hugeicons="RefreshIcon"
                    tabler="IconRefresh"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                    data-icon="inline-start"
                  />
                  Resend Code
                </Button>
              </div>
              <InputOTP maxLength={6} id="otp-verification" required>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                  <InputOTPSlot
                    index={1}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                  <InputOTPSlot
                    index={2}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={3}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                  <InputOTPSlot
                    index={4}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                  <InputOTPSlot
                    index={5}
                    sx={styles.dataSlotInputOtpSlotText}
                  />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter sx={styles.flexColGap2}>
          <Button type="submit" sx={styles.full}>
            Verify
          </Button>
          <div sx={styles.textSmTextMutedForegroun}>
            Having trouble signing in?{" "}
            <a href="#" sx={styles.underlineUnderlineOffset}>
              Contact support
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}
