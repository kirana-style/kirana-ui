import { Form, Field as FormischField, reset, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import { toast } from "sonner"
import * as v from "valibot"

import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { Switch } from "../ui/switch"
import { css, props as styleProps } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { alpha, radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  // The toast upstream's demos raise: `rounded-[calc(var(--radius)+4px)]`, its content
  // `flex flex-col gap-2`.
  toast: css({ "--border-radius": `calc(${radius.lg} + 4px)` }),
  toastContent: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  handleSubmitPre: css({
    // `bg-code text-code-foreground`: upstream's site's code surface.
    backgroundColor: alpha.muted50,
    color: `light-dark(${theme.foreground}, ${theme.mutedForeground})`,
    marginTop: space[2],
    width: "320px",
    overflowX: "auto",
    borderRadius: radius.md,
    padding: space[4],
  }),
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { [breakpoint.sm]: containerSize.md },
  }),
}

const FormSchema = v.object({
  twoFactor: v.pipe(
    v.boolean(),
    v.check(
      (value) => value === true,
      "It is highly recommended to enable two-factor authentication."
    )
  ),
})

export default function FormFormischSwitch() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      twoFactor: false,
    },
  })

  const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
    toast("You submitted the following values:", {
      description: (
        <pre sx={styles.handleSubmitPre}>
          <code>{JSON.stringify(output, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        toast: styleProps(styles.toast).className,
        content: styleProps(styles.toastContent).className,
      },
    })
  }

  return (
    <div sx={page.example}>
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form of={form} id="form-formisch-switch" onSubmit={handleSubmit}>
            <FieldGroup>
              <FormischField of={form} path={["twoFactor"]}>
                {(field) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={field.errors !== null}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-formisch-switch-twoFactor">
                        Multi-factor authentication
                      </FieldLabel>
                      <FieldDescription>
                        Enable multi-factor authentication to secure your
                        account.
                      </FieldDescription>
                      {field.errors && (
                        <FieldError
                          errors={field.errors.map((message) => ({ message }))}
                        />
                      )}
                    </FieldContent>
                    <Switch
                      id="form-formisch-switch-twoFactor"
                      isSelected={field.input ?? false}
                      onChange={(checked: boolean) => field.onChange(checked)}
                    />
                  </Field>
                )}
              </FormischField>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => reset(form)}>
              Reset
            </Button>
            <Button type="submit" form="form-formisch-switch">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
