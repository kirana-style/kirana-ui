import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
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
  signupFormDiv: css({
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
  signupFormField: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
    gap: { "*": null, base: space[4] },
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
    <div [sx]="styles.signupFormDiv">
      <div kuiCard>
        <div kuiCardHeader [sx]="styles.cardHeader">
          <div kuiCardTitle [sx]="styles.cardTitle">Create your account</div>
          <div kuiCardDescription>
            Enter your email below to create your account
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
              </div>
              <div kuiField>
                <div kuiField [sx]="styles.signupFormField">
                  <div kuiField>
                    <label kuiFieldLabel for="password">Password</label>
                    <input kuiInput id="password" type="password" required />
                  </div>
                  <div kuiField>
                    <label kuiFieldLabel for="confirm-password"
                      >Confirm Password</label
                    >
                    <input
                      kuiInput
                      id="confirm-password"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <p kuiFieldDescription>Must be at least 8 characters long.</p>
              </div>
              <div kuiField>
                <button kuiButton type="submit">Create Account</button>
                <p kuiFieldDescription [sx]="styles.fieldDescription">
                  Already have an account?
                  <a href="#">Sign in</a>
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
export class SignupForm {
  protected readonly styles = styles
}
