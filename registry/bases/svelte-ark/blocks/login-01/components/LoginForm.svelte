<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
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

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    root: css({ display: "flex", flexDirection: "column", gap: space[6] }),
    labelRow: css({ display: "flex", alignItems: "center" }),
    forgot: css({
      marginInlineStart: "auto",
      display: "inline-block",
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      textUnderlineOffset: "4px",
      textDecorationLine: { base: "none", ":hover": "underline" },
    }),
    centred: css({ textAlign: "center" }),
  }
</script>

<div sx={[styles.root, className as Sx]} {...rest}>
  <Card>
    <CardHeader>
      <CardTitle>
        Login to your account
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="email">
              Email
            </FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </Field>
          <Field>
            <div sx={styles.labelRow}>
              <FieldLabel for="password">
                Password
              </FieldLabel>
              <a href="#" sx={styles.forgot}>
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">
              Login
            </Button>
            <Button variant="outline" type="button">
              Login with Google
            </Button>
            <FieldDescription sx={styles.centred}>
              Don't have an account?
              <a href="#">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</div>
