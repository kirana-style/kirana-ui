import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

@Component({
  selector: "input-otp-demo",
  imports: [InputOTP, InputOTPGroup, InputOTPSlot, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiInputOTP [maxLength]="6" defaultValue="123456">
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
  `,
})
export default class InputOtpDemo {
  protected readonly page = page
}
