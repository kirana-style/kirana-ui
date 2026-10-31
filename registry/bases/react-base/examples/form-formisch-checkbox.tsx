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
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field"
import { css, props as styleProps } from "@kirana-style/core"
import {
  breakpoint,
  containerSize,
  fontWeight,
  space,
} from "../../../core/scales"
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
  fieldLabel: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  fieldLabel2: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
}

const tasks = [
  {
    id: "push",
    label: "Push notifications",
  },
  {
    id: "email",
    label: "Email notifications",
  },
] as const

const FormSchema = v.object({
  responses: v.boolean(),
  tasks: v.pipe(
    v.array(v.string()),
    v.minLength(1, "Please select at least one notification type."),
    v.check(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      "Invalid notification type selected."
    )
  ),
})

export default function FormFormischCheckbox() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      responses: true,
      tasks: [],
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
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form of={form} id="form-formisch-checkbox" onSubmit={handleSubmit}>
            <FieldGroup>
              <FormischField of={form} path={["responses"]}>
                {(field) => (
                  <div>
                    <FieldSet data-invalid={field.errors !== null}>
                      <FieldLegend variant="label">Responses</FieldLegend>
                      <FieldDescription>
                        Get notified for requests that take time, like research
                        or image generation.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox
                            id="form-formisch-checkbox-responses"
                            checked={field.input ?? false}
                            onCheckedChange={(checked) =>
                              field.onChange(checked === true)
                            }
                            disabled
                          />
                          <FieldLabel
                            htmlFor="form-formisch-checkbox-responses"
                            sx={styles.fieldLabel}
                          >
                            Push notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </div>
                )}
              </FormischField>
              <FieldSeparator />
              <FormischField of={form} path={["tasks"]}>
                {(field) => (
                  <FieldGroup>
                    <FieldSet data-invalid={field.errors !== null}>
                      <FieldLegend variant="label">Tasks</FieldLegend>
                      <FieldDescription>
                        Get notified when tasks you&apos;ve created have
                        updates.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        {tasks.map((task) => {
                          const current = field.input ?? []
                          return (
                            <Field
                              key={task.id}
                              orientation="horizontal"
                              data-invalid={field.errors !== null}
                            >
                              <Checkbox
                                id={`form-formisch-checkbox-${task.id}`}
                                aria-invalid={field.errors !== null}
                                checked={current.includes(task.id)}
                                onCheckedChange={(checked) => {
                                  field.onChange(
                                    checked === true
                                      ? [...current, task.id]
                                      : current.filter(
                                          (value) => value !== task.id
                                        )
                                  )
                                }}
                              />
                              <FieldLabel
                                htmlFor={`form-formisch-checkbox-${task.id}`}
                                sx={styles.fieldLabel2}
                              >
                                {task.label}
                              </FieldLabel>
                            </Field>
                          )
                        })}
                      </FieldGroup>
                    </FieldSet>
                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({ message }))}
                      />
                    )}
                  </FieldGroup>
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
            <Button type="submit" form="form-formisch-checkbox">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
