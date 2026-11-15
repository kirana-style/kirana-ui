import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
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
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoMaxWMd: css({ marginInline: "auto", maxWidth: containerSize.md }),
  medium: css({ fontWeight: fontWeight.medium }),
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  dataSlotInputOtpSlotH12D: css({
    // `*:data-[slot=input-otp-slot]:h-12 w-11 text-xl`, on each slot: a group's reach into its
    // slots would lose to their own size.
    width: { "*": null, base: space[11] },
    height: { "*": null, base: space[12] },
    fontSize: { "*": null, base: fontSize.xl },
    lineHeight: { "*": null, base: lineHeight.xl },
  }),
  mx2: css({ marginInline: space[2] }),
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

export default function InputOTPForm() {
  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoMaxWMd}>
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span sx={styles.medium}>m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <div sx={styles.flexItemsCenterJustifyBe}>
              <FieldLabel htmlFor="otp-verification">
                Verification code
              </FieldLabel>
              <Button variant="outline" size="xs">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RepeatIcon"
                  phosphor="ArrowsClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
                Resend Code
              </Button>
            </div>
            <InputOTP maxLength={6} id="otp-verification" required>
              <InputOTPGroup>
                <InputOTPSlot index={0} sx={styles.dataSlotInputOtpSlotH12D} />
                <InputOTPSlot index={1} sx={styles.dataSlotInputOtpSlotH12D} />
                <InputOTPSlot index={2} sx={styles.dataSlotInputOtpSlotH12D} />
              </InputOTPGroup>
              <InputOTPSeparator sx={styles.mx2} />
              <InputOTPGroup>
                <InputOTPSlot index={3} sx={styles.dataSlotInputOtpSlotH12D} />
                <InputOTPSlot index={4} sx={styles.dataSlotInputOtpSlotH12D} />
                <InputOTPSlot index={5} sx={styles.dataSlotInputOtpSlotH12D} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
              <a href="#">I no longer have access to this email address.</a>
            </FieldDescription>
          </Field>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" sx={styles.full}>
              Verify
            </Button>
            <div sx={styles.textSmTextMutedForegroun}>
              Having trouble signing in?{" "}
              <a href="#" sx={styles.underlineUnderlineOffset}>
                Contact support
              </a>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
