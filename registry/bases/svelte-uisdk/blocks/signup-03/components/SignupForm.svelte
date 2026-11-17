<script lang="ts">
  import type { ClassValue } from "svelte/elements"

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
  import { css } from "@kirana-style/core"
  import { axes } from "../../../../../core/axes"
  import { fontSize, lineHeight, space } from "../../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
</script>

<div class={className} sx={styles.signupFormDiv} {...rest}>
  <Card>
    <CardHeader sx={styles.cardHeader}>
      <CardTitle sx={styles.cardTitle}>
        Create your account
      </CardTitle>
      <CardDescription>
        Enter your email below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="name">
              Full Name
            </FieldLabel>
            <Input id="name" type="text" placeholder="John Doe" required />
          </Field>
          <Field>
            <FieldLabel for="email">
              Email
            </FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </Field>
          <Field>
            <Field sx={styles.signupFormField}>
              <Field>
                <FieldLabel for="password">
                  Password
                </FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <FieldLabel for="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input id="confirm-password" type="password" required />
              </Field>
            </Field>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
          </Field>
          <Field>
            <Button type="submit">
              Create Account
            </Button>
            <FieldDescription sx={styles.fieldDescription}>
              Already have an account?
              <a href="#">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
  <FieldDescription sx={styles.fieldDescription2}>
    By clicking continue, you agree to our
    <a href="#">
      Terms of Service
    </a>
    {" "}and
    <a href="#">
      Privacy Policy
    </a>
    .
  </FieldDescription>
</div>
