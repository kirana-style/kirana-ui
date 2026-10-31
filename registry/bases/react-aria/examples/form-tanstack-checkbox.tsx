import { page } from "../../../styles/page.styles"
/* eslint-disable react/no-children-prop */
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

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

const styles = {
  // The toast upstream's demos raise: `rounded-[calc(var(--radius)+4px)]`, its content
  // `flex flex-col gap-2`.
  toast: css({ "--border-radius": `calc(${radius.lg} + 4px)` }),
  toastContent: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  pre: css({
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

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, "Please select at least one notification type.")
    .refine(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      {
        message: "Invalid notification type selected.",
      }
    ),
})

export default function FormTanstackCheckbox() {
  const form = useForm({
    defaultValues: {
      responses: true,
      tasks: [] as string[],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre sx={styles.pre}>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          toast: styleProps(styles.toast).className,
          content: styleProps(styles.toastContent).className,
        },
      })
    },
  })

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
          <form
            id="form-tanstack-checkbox"
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="responses"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <div>
                      <FieldSet>
                        <FieldLegend variant="label">Responses</FieldLegend>
                        <FieldDescription>
                          Get notified for requests that take time, like
                          research or image generation.
                        </FieldDescription>
                        <FieldGroup data-slot="checkbox-group">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id="form-tanstack-checkbox-responses"
                              name={field.name}
                              isSelected={field.state.value}
                              onChange={(checked: boolean) =>
                                field.handleChange(checked === true)
                              }
                              isDisabled
                            />
                            <FieldLabel
                              htmlFor="form-tanstack-checkbox-responses"
                              sx={styles.fieldLabel}
                            >
                              Push notifications
                            </FieldLabel>
                          </Field>
                        </FieldGroup>
                      </FieldSet>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </div>
                  )
                }}
              />
              <FieldSeparator />
              <form.Field
                name="tasks"
                mode="array"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldGroup>
                      <FieldSet data-invalid={isInvalid}>
                        <FieldLegend variant="label">Tasks</FieldLegend>
                        <FieldDescription>
                          Get notified when tasks you&apos;ve created have
                          updates.
                        </FieldDescription>
                        <FieldGroup data-slot="checkbox-group">
                          {tasks.map((task) => (
                            <Field
                              key={task.id}
                              orientation="horizontal"
                              data-invalid={isInvalid}
                            >
                              <Checkbox
                                id={`form-tanstack-checkbox-${task.id}`}
                                name={field.name}
                                isInvalid={isInvalid}
                                isSelected={field.state.value.includes(task.id)}
                                onChange={(checked: boolean) => {
                                  if (checked) {
                                    field.pushValue(task.id)
                                  } else {
                                    const index = field.state.value.indexOf(
                                      task.id
                                    )
                                    if (index > -1) {
                                      field.removeValue(index)
                                    }
                                  }
                                }}
                              />
                              <FieldLabel
                                htmlFor={`form-tanstack-checkbox-${task.id}`}
                                sx={styles.fieldLabel2}
                              >
                                {task.label}
                              </FieldLabel>
                            </Field>
                          ))}
                        </FieldGroup>
                      </FieldSet>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldGroup>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-tanstack-checkbox">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
