import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

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

@Component({
  selector: "input-otp-controlled",
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.spaceY2">
        <div kuiInputOTP [(value)]="value" [maxLength]="6">
          <div kuiInputOTPGroup>
            <div kuiInputOTPSlot [index]="0"></div>
            <div kuiInputOTPSlot [index]="1"></div>
            <div kuiInputOTPSlot [index]="2"></div>
            <div kuiInputOTPSlot [index]="3"></div>
            <div kuiInputOTPSlot [index]="4"></div>
            <div kuiInputOTPSlot [index]="5"></div>
          </div>
        </div>
        <div [sx]="styles.textCenterTextSm">
          @if (value() === "") {
            Enter your one-time password.
          } @else {
            You entered:
            {{ value() }}
          }
        </div>
      </div>
    </div>
  `,
})
export default class InputOtpControlled {
  protected readonly value = signal("")
  protected readonly styles = styles
  protected readonly page = page
}
