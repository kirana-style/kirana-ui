"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    borderRadius: radius.md,
    paddingInline: space["2.5"],
    paddingBlock: space[2],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

export function EnvironmentVariables() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        {[
          { key: "DATABASE_URL", masked: true },
          { key: "NEXT_PUBLIC_API", masked: false },
          { key: "STRIPE_SECRET", masked: true },
        ].map((env) => (
          <div key={env.key} sx={styles.div}>
            <span sx={styles.span}>{env.key}</span>
            <span sx={styles.span2}>
              {env.masked ? "••••••••" : "https://api.example.com"}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit</Button>
        <Button sx={styles.button}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
