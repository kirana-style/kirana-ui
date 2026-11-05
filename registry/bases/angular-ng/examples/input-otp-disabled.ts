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
  selector: "input-otp-disabled",
  imports: [
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiInputOTP id="disabled" [maxLength]="6" disabled value="123456">
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
export default class InputOtpDisabled {
  protected readonly page = page
}
