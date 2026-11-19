import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"

@Component({
  selector: "input-otp-alphanumeric",
  imports: [
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiInputOTP [maxLength]="6" type="alphanumeric">
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
  `,
})
export default class InputOtpAlphanumeric {
  protected readonly page = page
}
