import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

@Component({
  selector: "input-otp-four-digits",
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiInputOTP [maxLength]="4" type="numeric">
        <div kuiInputOTPGroup>
          <div kuiInputOTPSlot [index]="0"></div>
          <div kuiInputOTPSlot [index]="1"></div>
          <div kuiInputOTPSlot [index]="2"></div>
          <div kuiInputOTPSlot [index]="3"></div>
        </div>
      </div>
    </div>
  `,
})
export default class InputOtpFourDigits {
  protected readonly page = page
}
