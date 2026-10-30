import * as React from "react"

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

export default function CardSpacing() {
  const [cardSpacing, setCardSpacing] = React.useState("4")
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === cardSpacing
  )

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <ToggleGroup
          selectedKeys={[cardSpacing]}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0]
            if (key) {
              setCardSpacing(String(key))
            }
          }}
          variant="outline"
          size="sm"
          sx={styles.toggleGroup}
        >
          {spacingOptions.map((option) => (
            <ToggleGroupItem key={option.value} id={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Card sx={selectedSpacing?.sx}>
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
              <div sx={styles.div2}>
                <div sx={styles.div3}>
                  <Label htmlFor="email-spacing">Email</Label>
                  <Input
                    id="email-spacing"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div sx={styles.div4}>
                  <div sx={styles.div5}>
                    <Label htmlFor="password-spacing">Password</Label>
                    <a href="#" sx={styles.a}>
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password-spacing" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter sx={styles.cardFooter}>
            <Button type="submit" sx={styles.button}>
              Login
            </Button>
            <Button variant="outline" sx={styles.button2}>
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
