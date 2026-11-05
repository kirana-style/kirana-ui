import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
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
import { DirectionProvider } from "../ui/direction"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[6],
  }),
  div2: css({
    display: "grid",
    gap: space[2],
  }),
  div3: css({
    display: "grid",
    gap: space[2],
  }),
  div4: css({
    display: "flex",
    alignItems: "center",
  }),
  a: css({
    marginInlineStart: "auto",
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

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "Login to your account",
      description: "Enter your email below to login to your account",
      signUp: "Sign Up",
      email: "Email",
      emailPlaceholder: "m@example.com",
      password: "Password",
      forgotPassword: "Forgot your password?",
      login: "Login",
      loginWithGoogle: "Login with Google",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "تسجيل الدخول إلى حسابك",
      description: "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
      signUp: "إنشاء حساب",
      email: "البريد الإلكتروني",
      emailPlaceholder: "m@example.com",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      login: "تسجيل الدخول",
      loginWithGoogle: "تسجيل الدخول باستخدام Google",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "התחבר לחשבון שלך",
      description: "הזן את האימייל שלך למטה כדי להתחבר לחשבון שלך",
      signUp: "הירשם",
      email: "אימייל",
      emailPlaceholder: "m@example.com",
      password: "סיסמה",
      forgotPassword: "שכחת את הסיסמה?",
      login: "התחבר",
      loginWithGoogle: "התחבר עם Google",
    },
  },
}

@Component({
  selector: "card-rtl",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    DirectionProvider,
    Input,
    Label,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiCard [sx]="styles.card" [attr.dir]="dir()">
          <div kuiCardHeader>
            <div kuiCardTitle>{{ t().title }}</div>
            <div kuiCardDescription>{{ t().description }}</div>
            <div kuiCardAction>
              <button kuiButton variant="link">{{ t().signUp }}</button>
            </div>
          </div>
          <div kuiCardContent>
            <form>
              <div [sx]="styles.div">
                <div [sx]="styles.div2">
                  <label kuiLabel for="email-rtl">{{ t().email }}</label>
                  <input
                    kuiInput
                    id="email-rtl"
                    type="email"
                    [attr.placeholder]="t().emailPlaceholder"
                    required
                  />
                </div>
                <div [sx]="styles.div3">
                  <div [sx]="styles.div4">
                    <label kuiLabel for="password-rtl">{{
                      t().password
                    }}</label>
                    <a href="#" [sx]="styles.a">{{ t().forgotPassword }}</a>
                  </div>
                  <input kuiInput id="password-rtl" type="password" required />
                </div>
              </div>
            </form>
          </div>
          <div kuiCardFooter [sx]="styles.cardFooter">
            <button kuiButton type="submit" [sx]="styles.button">
              {{ t().login }}
            </button>
            <button kuiButton variant="outline" [sx]="styles.button2">
              {{ t().loginWithGoogle }}
            </button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class CardRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
