import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function CardRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Card sx={styles.card} dir={dir}>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
          <CardAction>
            <Button variant="link">{t.signUp}</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div sx={styles.div}>
              <div sx={styles.div2}>
                <Label htmlFor="email-rtl">{t.email}</Label>
                <Input
                  id="email-rtl"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>
              <div sx={styles.div3}>
                <div sx={styles.div4}>
                  <Label htmlFor="password-rtl">{t.password}</Label>
                  <a href="#" sx={styles.a}>
                    {t.forgotPassword}
                  </a>
                </div>
                <Input id="password-rtl" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button type="submit" sx={styles.button}>
            {t.login}
          </Button>
          <Button variant="outline" sx={styles.button2}>
            {t.loginWithGoogle}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
