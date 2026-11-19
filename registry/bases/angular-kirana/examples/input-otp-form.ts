import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "input-otp-form",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.mxAutoMaxWMd">
        <div kuiCardHeader>
          <div kuiCardTitle>Verify your login</div>
          <div kuiCardDescription>
            Enter the verification code we sent to your email address:
            <span [sx]="styles.medium">m{{ "@" }}example.com</span>
            .
          </div>
        </div>
        <div kuiCardContent>
          <div kuiField>
            <div [sx]="styles.flexItemsCenterJustifyBe">
              <label kuiFieldLabel for="otp-verification"
                >Verification code</label
              >
              <button kuiButton variant="outline" size="xs">
                <svg
                  iconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RepeatIcon"
                  phosphor="ArrowsClockwiseIcon"
                  remixicon="RiRefreshLine"
                ></svg>
                Resend Code
              </button>
            </div>
            <div kuiInputOTP [maxLength]="6" id="otp-verification" required>
              <div kuiInputOTPGroup>
                <div
                  kuiInputOTPSlot
                  [index]="0"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
                <div
                  kuiInputOTPSlot
                  [index]="1"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
                <div
                  kuiInputOTPSlot
                  [index]="2"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
              </div>
              <div kuiInputOTPSeparator [sx]="styles.mx2"></div>
              <div kuiInputOTPGroup>
                <div
                  kuiInputOTPSlot
                  [index]="3"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
                <div
                  kuiInputOTPSlot
                  [index]="4"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
                <div
                  kuiInputOTPSlot
                  [index]="5"
                  [sx]="styles.dataSlotInputOtpSlotH12D"
                ></div>
              </div>
            </div>
            <p kuiFieldDescription>
              <a href="#">I no longer have access to this email address.</a>
            </p>
          </div>
        </div>
        <div kuiCardFooter>
          <div kuiField>
            <button kuiButton type="submit" [sx]="styles.full">Verify</button>
            <div [sx]="styles.textSmTextMutedForegroun">
              Having trouble signing in?
              <a href="#" [sx]="styles.underlineUnderlineOffset"
                >Contact support</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputOtpForm {
  protected readonly styles = styles
  protected readonly page = page
}
