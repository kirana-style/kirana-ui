import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"
import { Input } from "../../../ui/input"

const styles = {
  fieldDescription: css({
    paddingInline: { "*": null, base: space[6] },
    textAlign: { "*": null, base: "center" },
  }),
}

@Component({
  selector: "kui-signup-form",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Create an account</div>
        <div kuiCardDescription>
          Enter your information below to create your account
        </div>
      </div>
      <div kuiCardContent>
        <form>
          <div kuiFieldGroup>
            <div kuiField>
              <label kuiFieldLabel for="name">Full Name</label>
              <input
                kuiInput
                id="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="email">Email</label>
              <input
                kuiInput
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <p kuiFieldDescription>
                We'll use this to contact you. We will not share your email with
                anyone else.
              </p>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="password">Password</label>
              <input kuiInput id="password" type="password" required />
              <p kuiFieldDescription>Must be at least 8 characters long.</p>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="confirm-password"
                >Confirm Password</label
              >
              <input kuiInput id="confirm-password" type="password" required />
              <p kuiFieldDescription>Please confirm your password.</p>
            </div>
            <div kuiFieldGroup>
              <div kuiField>
                <button kuiButton type="submit">Create Account</button>
                <button kuiButton variant="outline" type="button">
                  Sign up with Google
                </button>
                <p kuiFieldDescription [sx]="styles.fieldDescription">
                  Already have an account?
                  <a href="#">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class SignupForm {
  protected readonly styles = styles
}
