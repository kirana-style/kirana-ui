import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
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
  FieldSeparator,
} from "../../../ui/field"
import { Input } from "../../../ui/input"

const styles = {
  loginFormDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[6],
  }),
  cardHeader: css({
    textAlign: { "*": null, base: "center" },
  }),
  cardTitle: css({
    fontSize: { "*": null, base: fontSize.xl },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xl,
      [axes.style.lyra]: lineHeight.xl,
      [axes.style.mira]: lineHeight.xl,
      [axes.style.luma]: lineHeight.xl,
      [axes.style.rhea]: lineHeight.xl,
      [axes.style.sera]: lineHeight.xl,
    },
  }),
  fieldSeparator: css({
    [select.child('[data-slot="field-separator-content"]')]: {
      backgroundColor: theme.card,
    },
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
  }),
  loginFormA: css({
    marginLeft: "auto",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  fieldDescription: css({
    textAlign: { "*": null, base: "center" },
  }),
  fieldDescription2: css({
    paddingInline: { "*": null, base: space[6] },
    textAlign: { "*": null, base: "center" },
  }),
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
    FieldSeparator,
    Input,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.loginFormDiv">
      <div kuiCard>
        <div kuiCardHeader [sx]="styles.cardHeader">
          <div kuiCardTitle [sx]="styles.cardTitle">Welcome back</div>
          <div kuiCardDescription>Login with your Apple or Google account</div>
        </div>
        <div kuiCardContent>
          <form>
            <div kuiFieldGroup>
              <div kuiField>
                <button kuiButton variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Login with Apple
                </button>
                <button kuiButton variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Login with Google
                </button>
              </div>
              <div kuiFieldSeparator [sx]="styles.fieldSeparator">
                Or continue with
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
              </div>
              <div kuiField>
                <div [sx]="styles.div2">
                  <label kuiFieldLabel for="password">Password</label>
                  <a href="#" [sx]="styles.loginFormA">Forgot your password?</a>
                </div>
                <input kuiInput id="password" type="password" required />
              </div>
              <div kuiField>
                <button kuiButton type="submit">Login</button>
                <p kuiFieldDescription [sx]="styles.fieldDescription">
                  Don't have an account?
                  <a href="#">Sign up</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p kuiFieldDescription [sx]="styles.fieldDescription2">
        By clicking continue, you agree to our
        <a href="#">Terms of Service</a>
        {{ " " }}and
        <a href="#">Privacy Policy</a>
        .
      </p>
    </div>
  `,
})
export class LoginForm {
  protected readonly styles = styles
}
