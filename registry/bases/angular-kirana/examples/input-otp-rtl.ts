import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldLabel } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

const styles = {
  inputOTPRtlField: css({
    marginInline: { "*": null, base: "auto" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      verificationCode: "Verification code",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      verificationCode: "رمز التحقق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      verificationCode: "קוד אימות",
    },
  },
}

@Component({
  selector: "input-otp-rtl",
  imports: [
    DirectionProvider,
    Field,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiField [sx]="styles.inputOTPRtlField">
          <label kuiFieldLabel for="input-otp-rtl">{{
            t().verificationCode
          }}</label>
          <div
            kuiInputOTP
            [maxLength]="6"
            defaultValue="123456"
            [attr.dir]="dir()"
            id="input-otp-rtl"
          >
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
    </ng-container>
  `,
})
export default class InputOtpRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
