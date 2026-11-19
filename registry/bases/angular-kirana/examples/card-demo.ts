import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  card: css({ width: "100%", maxWidth: "24rem" }),
  fields: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  field: css({ display: "grid", gap: space[2] }),
  labelRow: css({ display: "flex", alignItems: "center" }),
  forgot: css({
    marginInlineStart: "auto",
    display: "inline-block",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: "inherit",
    textUnderlineOffset: "4px",
    textDecorationLine: { base: "none", ":hover": "underline" },
  }),
  footer: css({ flexDirection: "column", gap: space[2] }),
  full: css({ width: "100%" }),
}

@Component({
  selector: "card-demo",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.card">
        <div kuiCardHeader>
          <div kuiCardTitle>Login to your account</div>
          <div kuiCardDescription>
            Enter your email below to login to your account
          </div>
          <div kuiCardAction>
            <button kuiButton variant="link">Sign Up</button>
          </div>
        </div>
        <div kuiCardContent>
          <form>
            <div [sx]="styles.fields">
              <div [sx]="styles.field">
                <label kuiLabel for="email">Email</label>
                <input
                  kuiInput
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div [sx]="styles.field">
                <div [sx]="styles.labelRow">
                  <label kuiLabel for="password">Password</label>
                  <a href="#" [sx]="styles.forgot">Forgot your password?</a>
                </div>
                <input kuiInput id="password" type="password" required />
              </div>
            </div>
          </form>
        </div>
        <div kuiCardFooter [sx]="styles.footer">
          <button kuiButton type="submit" [sx]="styles.full">Login</button>
          <button kuiButton variant="outline" [sx]="styles.full">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class CardDemo {
  protected readonly styles = styles
  protected readonly page = page
}
