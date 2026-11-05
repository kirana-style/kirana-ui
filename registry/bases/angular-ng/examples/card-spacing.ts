import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { cardCtx } from "../../../core/context"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
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
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

const styles = {
  root: css({ [cardCtx.spacing]: { "*": null, base: spacing(4) } }),
  root2: css({ [cardCtx.spacing]: { "*": null, base: spacing(5) } }),
  root3: css({ [cardCtx.spacing]: { "*": null, base: spacing(6) } }),
  root4: css({ [cardCtx.spacing]: { "*": null, base: spacing(8) } }),
  div: css({
    marginInline: "auto",
    display: "grid",
    width: "100%",
    maxWidth: containerSize.sm,
    gap: space[4],
  }),
  toggleGroup: css({
    justifyContent: "center",
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[6],
  }),
  div3: css({
    display: "grid",
    gap: space[2],
  }),
  div4: css({
    display: "grid",
    gap: space[2],
  }),
  div5: css({
    display: "flex",
    alignItems: "center",
  }),
  a: css({
    marginLeft: "auto",
    display: "inline-block",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

const spacingOptions = [
  {
    sx: styles.root,
    label: "16px",
    value: "4",
  },
  {
    sx: styles.root2,
    label: "20px",
    value: "5",
  },
  {
    sx: styles.root3,
    label: "24px",
    value: "6",
  },
  {
    sx: styles.root4,
    label: "32px",
    value: "8",
  },
]

@Component({
  selector: "card-spacing",
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
    ToggleGroup,
    ToggleGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div
          kuiToggleGroup
          [value]="[cardSpacing()]"
          (valueChange)="pick($event)"
          variant="outline"
          size="sm"
          [sx]="styles.toggleGroup"
        >
          @for (option of spacingOptions; track option.value) {
            <button kuiToggleGroupItem [value]="option.value">
              {{ option.label }}
            </button>
          }
        </div>
        <div kuiCard [sx]="selectedSpacing()?.sx">
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
              <div [sx]="styles.div2">
                <div [sx]="styles.div3">
                  <label kuiLabel for="email-spacing">Email</label>
                  <input
                    kuiInput
                    id="email-spacing"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div [sx]="styles.div4">
                  <div [sx]="styles.div5">
                    <label kuiLabel for="password-spacing">Password</label>
                    <a href="#" [sx]="styles.a">Forgot your password?</a>
                  </div>
                  <input
                    kuiInput
                    id="password-spacing"
                    type="password"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div kuiCardFooter [sx]="styles.cardFooter">
            <button kuiButton type="submit" [sx]="styles.button">Login</button>
            <button kuiButton variant="outline" [sx]="styles.button2">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CardSpacing {
  protected readonly cardSpacing = signal("4")
  protected readonly styles = styles
  protected readonly spacingOptions = spacingOptions
  protected readonly selectedSpacing = computed(() =>
    spacingOptions.find((option) => option.value === this.cardSpacing())
  )
  protected readonly spacing = spacing
  protected readonly page = page

  protected pick(value: string[] | null) {
    if (value?.[0]) this.cardSpacing.set(value[0])
  }
}
