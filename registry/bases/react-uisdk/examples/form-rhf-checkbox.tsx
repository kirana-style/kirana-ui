import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
  onSubmitPre: css({
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

export default function FormRhfCheckbox() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: true,
      tasks: [],
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre sx={styles.onSubmitPre}>
          <code>{JSON.stringify(data, null, 2)}</code>
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
          <form id="form-rhf-checkbox" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="responses"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <FieldSet data-invalid={fieldState.invalid}>
                      <FieldLegend variant="label">Responses</FieldLegend>
                      <FieldDescription>
                        Get notified for requests that take time, like research
                        or image generation.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox
                            id="form-rhf-checkbox-responses"
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                          />
                          <FieldLabel
                            htmlFor="form-rhf-checkbox-responses"
                            sx={styles.fieldLabel}
                          >
                            Push notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                )}
              />
              <FieldSeparator />
              <Controller
                name="tasks"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldGroup>
                    <FieldSet data-invalid={fieldState.invalid}>
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
                            data-invalid={fieldState.invalid}
                          >
                            <Checkbox
                              id={`form-rhf-checkbox-${task.id}`}
                              name={field.name}
                              aria-invalid={fieldState.invalid}
                              checked={field.value.includes(task.id)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value, task.id]
                                  : field.value.filter(
                                      (value) => value !== task.id
                                    )
                                field.onChange(newValue)
                              }}
                            />
                            <FieldLabel
                              htmlFor={`form-rhf-checkbox-${task.id}`}
                              sx={styles.fieldLabel2}
                            >
                              {task.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </FieldGroup>
                    </FieldSet>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldGroup>
                )}
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
            <Button type="submit" form="form-rhf-checkbox">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
