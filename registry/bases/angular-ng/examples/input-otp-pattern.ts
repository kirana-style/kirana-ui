import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

const styles = {
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "input-otp-pattern",
  imports: [
    Field,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.fit">
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
  `,
})
export default class InputOtpPattern {
  protected readonly styles = styles
  protected readonly page = page
}
