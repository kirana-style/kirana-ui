import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "input-otp-example",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- InputOTPForm -->
      <div kuiExample title="Form">
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
            <form>
              <div kuiField>
                <div [sx]="styles.flexItemsCenterJustifyBe">
                  <label kuiFieldLabel for="otp-verification"
                    >Verification code</label
                  >
                  <button kuiButton variant="outline" size="xs">
                    <svg
                      iconPlaceholder
                      lucide="RefreshCwIcon"
                      hugeicons="RefreshIcon"
                      tabler="IconRefresh"
                      phosphor="ArrowClockwiseIcon"
                      remixicon="RiRefreshLine"
                      data-icon="inline-start"
                    ></svg>
                    Resend Code
                  </button>
                </div>
                <div kuiInputOTP [maxLength]="6" id="otp-verification" required>
                  <div kuiInputOTPGroup>
                    <div
                      kuiInputOTPSlot
                      [index]="0"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                    <div
                      kuiInputOTPSlot
                      [index]="1"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                    <div
                      kuiInputOTPSlot
                      [index]="2"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                  </div>
                  <div kuiInputOTPSeparator></div>
                  <div kuiInputOTPGroup>
                    <div
                      kuiInputOTPSlot
                      [index]="3"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                    <div
                      kuiInputOTPSlot
                      [index]="4"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                    <div
                      kuiInputOTPSlot
                      [index]="5"
                      [sx]="styles.dataSlotInputOtpSlotText"
                    ></div>
                  </div>
                </div>
                <p kuiFieldDescription>
                  <a href="#">I no longer have access to this email address.</a>
                </p>
              </div>
            </form>
          </div>
          <div kuiCardFooter [sx]="styles.flexColGap2">
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
      <!-- InputOTPSimple -->
      <div kuiExample title="Simple">
        <div kuiField>
          <label kuiFieldLabel for="simple">Simple</label>
          <div kuiInputOTP id="simple" [maxLength]="6">
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
              <div kuiInputOTPSlot [index]="2"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="3"></div>
              <div kuiInputOTPSlot [index]="4"></div>
              <div kuiInputOTPSlot [index]="5"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPPattern -->
      <div kuiExample title="Digits Only">
        <div kuiField>
          <label kuiFieldLabel for="digits-only">Digits Only</label>
          <div kuiInputOTP id="digits-only" [maxLength]="6" type="numeric">
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
              <div kuiInputOTPSlot [index]="2"></div>
              <div kuiInputOTPSlot [index]="3"></div>
              <div kuiInputOTPSlot [index]="4"></div>
              <div kuiInputOTPSlot [index]="5"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPWithSeparator -->
      <div kuiExample title="With Separator">
        <div kuiField>
          <label kuiFieldLabel for="with-separator">With Separator</label>
          <div
            kuiInputOTP
            id="with-separator"
            [maxLength]="6"
            [(value)]="value"
          >
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="2"></div>
              <div kuiInputOTPSlot [index]="3"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="4"></div>
              <div kuiInputOTPSlot [index]="5"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPAlphanumeric -->
      <div kuiExample title="Alphanumeric">
        <div kuiField>
          <label kuiFieldLabel for="alphanumeric">Alphanumeric</label>
          <p kuiFieldDescription>Accepts both letters and numbers.</p>
          <div
            kuiInputOTP
            id="alphanumeric"
            [maxLength]="6"
            type="alphanumeric"
          >
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
              <div kuiInputOTPSlot [index]="2"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="3"></div>
              <div kuiInputOTPSlot [index]="4"></div>
              <div kuiInputOTPSlot [index]="5"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPDisabled -->
      <div kuiExample title="Disabled">
        <div kuiField>
          <label kuiFieldLabel for="disabled">Disabled</label>
          <div
            kuiInputOTP
            id="disabled"
            [maxLength]="6"
            disabled
            value="123456"
          >
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
              <div kuiInputOTPSlot [index]="2"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="3"></div>
              <div kuiInputOTPSlot [index]="4"></div>
              <div kuiInputOTPSlot [index]="5"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPFourDigits -->
      <div kuiExample title="4 Digits">
        <div kuiField>
          <label kuiFieldLabel for="four-digits">4 Digits</label>
          <p kuiFieldDescription>Common pattern for PIN codes.</p>
          <div kuiInputOTP id="four-digits" [maxLength]="4" type="numeric">
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0"></div>
              <div kuiInputOTPSlot [index]="1"></div>
              <div kuiInputOTPSlot [index]="2"></div>
              <div kuiInputOTPSlot [index]="3"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputOTPInvalid -->
      <div kuiExample title="Invalid State">
        <div kuiField>
          <label kuiFieldLabel for="invalid">Invalid State</label>
          <p kuiFieldDescription>Example showing the invalid error state.</p>
          <div
            kuiInputOTP
            id="invalid"
            [maxLength]="6"
            [(value)]="invalidValue"
          >
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="0" aria-invalid="true"></div>
              <div kuiInputOTPSlot [index]="1" aria-invalid="true"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="2" aria-invalid="true"></div>
              <div kuiInputOTPSlot [index]="3" aria-invalid="true"></div>
            </div>
            <div kuiInputOTPSeparator></div>
            <div kuiInputOTPGroup>
              <div kuiInputOTPSlot [index]="4" aria-invalid="true"></div>
              <div kuiInputOTPSlot [index]="5" aria-invalid="true"></div>
            </div>
          </div>
          <div
            kuiFieldError
            [errors]="[{ message: 'Invalid code. Please try again.' }]"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export default class InputOtpExample {
  protected readonly value = signal("123456")
  protected readonly invalidValue = signal("000000")
  protected readonly styles = styles
}
