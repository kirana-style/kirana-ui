import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp"

@Component({
  selector: "input-otp-invalid",
  imports: [
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiInputOTP [maxLength]="6" [(value)]="value">
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
    </div>
  `,
})
export default class InputOtpInvalid {
  protected readonly value = signal("000000")
  protected readonly page = page
}
