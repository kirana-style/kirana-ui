/** Upstream's `preview` block's environment variables: rows of keys, masked or shown. */
import { css } from "@kirana-style/core"

import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  variables: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  variable: css({
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
  variableKey: css({ fontWeight: fontWeight.medium }),
  variableValue: css({
    marginInlineStart: "auto",
    color: theme.mutedForeground,
  }),
  end: css({ marginInlineStart: "auto" }),
}

const VARIABLES = [
  { key: "DATABASE_URL", masked: true },
  { key: "NEXT_PUBLIC_API", masked: false },
  { key: "STRIPE_SECRET", masked: true },
]

export function EnvironmentVariables() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent sx={styles.variables}>
        {VARIABLES.map((variable) => (
          <div key={variable.key} sx={styles.variable}>
            <span sx={styles.variableKey}>{variable.key}</span>
            <span sx={styles.variableValue}>
              {variable.masked ? "••••••••" : "https://api.example.com"}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit</Button>
        <Button sx={styles.end}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
