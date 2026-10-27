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

export default function CardDemo() {
  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div sx={styles.fields}>
              <div sx={styles.field}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div sx={styles.field}>
                <div sx={styles.labelRow}>
                  <Label htmlFor="password">Password</Label>
                  <a href="#" sx={styles.forgot}>
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter sx={styles.footer}>
          <Button type="submit" sx={styles.full}>
            Login
          </Button>
          <Button variant="outline" sx={styles.full}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
