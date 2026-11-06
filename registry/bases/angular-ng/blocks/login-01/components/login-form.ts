import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../../../core/scales"
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
  root: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  labelRow: css({ display: "flex", alignItems: "center" }),
  forgot: css({
    marginInlineStart: "auto",
    display: "inline-block",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textUnderlineOffset: "4px",
    textDecorationLine: { base: "none", ":hover": "underline" },
  }),
  centred: css({ textAlign: "center" }),
}

@Component({
  selector: "kui-login-form",
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
    <div [sx]="styles.root">
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiCardTitle>Login to your account</div>
          <div kuiCardDescription>
            Enter your email below to login to your account
          </div>
        </div>
        <div kuiCardContent>
          <form>
            <div kuiFieldGroup>
              <div kuiField>
                <label kuiFieldLabel for="email">Email</label>
                <input
                  kuiInput
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div kuiField>
                <div [sx]="styles.labelRow">
                  <label kuiFieldLabel for="password">Password</label>
                  <a href="#" [sx]="styles.forgot">Forgot your password?</a>
                </div>
                <input kuiInput id="password" type="password" required />
              </div>
              <div kuiField>
                <button kuiButton type="submit">Login</button>
                <button kuiButton variant="outline" type="button">
                  Login with Google
                </button>
                <p kuiFieldDescription [sx]="styles.centred">
                  Don't have an account?
                  <a href="#">Sign up</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginForm {
  protected readonly styles = styles
}
