import { page } from "../../../styles/page.styles"
/* eslint-disable react/no-children-prop */
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { css, props as styleProps } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
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
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  field: css({
    justifyContent: { "*": null, base: "flex-end" },
  }),
}

const addons = [
  {
    id: "analytics",
    title: "Analytics",
    description: "Advanced analytics and reporting",
  },
  {
    id: "backup",
    title: "Backup",
    description: "Automated daily backups",
  },
  {
    id: "support",
    title: "Priority Support",
    description: "24/7 premium customer support",
  },
] as const

/** What the trigger shows for each value: Base UI's select reads it from `items`. */
const billingPeriods = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
]

const formSchema = z.object({
  plan: z
    .string({
      error: "Please select a subscription plan",
    })
    .min(1, "Please select a subscription plan")
    .refine((value) => value === "basic" || value === "pro", {
      message: "Invalid plan selection. Please choose Basic or Pro",
    }),
  billingPeriod: z
    .string({
      error: "Please select a billing period",
    })
    .min(1, "Please select a billing period"),
  addons: z
    .array(z.string())
    .min(1, "Please select at least one add-on")
    .max(3, "You can select up to 3 add-ons")
    .refine(
      (value) => value.every((addon) => addons.some((a) => a.id === addon)),
      {
        message: "You selected an invalid add-on",
      }
    ),
  emailNotifications: z.boolean(),
})

export default function FormTanstackComplex() {
  const form = useForm({
    defaultValues: {
      plan: "basic",
      billingPeriod: "monthly",
      addons: [] as string[],
      emailNotifications: false,
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
        <CardContent>
          <form
            id="subscription-form"
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="plan"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldSet>
                      <FieldLegend>Subscription Plan</FieldLegend>
                      <FieldDescription>
                        Choose your subscription plan.
                      </FieldDescription>
                      <RadioGroup
                        name={field.name}
                        value={field.state.value}
                        onValueChange={field.handleChange}
                      >
                        <FieldLabel htmlFor="basic">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>Basic</FieldTitle>
                              <FieldDescription>
                                For individuals and small teams
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value="basic"
                              id="basic"
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                        <FieldLabel htmlFor="pro">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <FieldContent>
                              <FieldTitle>Pro</FieldTitle>
                              <FieldDescription>
                                For businesses with higher demands
                              </FieldDescription>
                            </FieldContent>
                            <RadioGroupItem
                              value="pro"
                              id="pro"
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                      </RadioGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  )
                }}
              />
              <FieldSeparator />
              <form.Field
                name="billingPeriod"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Billing Period
                      </FieldLabel>
                      <Select
                        items={billingPeriods}
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(value ?? "")
                        }
                        aria-invalid={isInvalid}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Choose how often you want to be billed.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <FieldSeparator />
              <form.Field
                name="addons"
                mode="array"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <FieldSet>
                      <FieldLegend>Add-ons</FieldLegend>
                      <FieldDescription>
                        Select additional features you&apos;d like to include.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        {addons.map((addon) => (
                          <Field
                            key={addon.id}
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id={addon.id}
                              name={field.name}
                              aria-invalid={isInvalid}
                              checked={field.state.value.includes(addon.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.pushValue(addon.id)
                                } else {
                                  const index = field.state.value.indexOf(
                                    addon.id
                                  )
                                  if (index > -1) {
                                    field.removeValue(index)
                                  }
                                }
                              }}
                            />
                            <FieldContent>
                              <FieldLabel htmlFor={addon.id}>
                                {addon.title}
                              </FieldLabel>
                              <FieldDescription>
                                {addon.description}
                              </FieldDescription>
                            </FieldContent>
                          </Field>
                        ))}
                      </FieldGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
                  )
                }}
              />
              <FieldSeparator />
              <form.Field
                name="emailNotifications"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>
                          Email Notifications
                        </FieldLabel>
                        <FieldDescription>
                          Receive email updates about your subscription
                        </FieldDescription>
                      </FieldContent>
                      <Switch
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={field.handleChange}
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" sx={styles.field}>
            <Button type="submit" form="subscription-form">
              Save Preferences
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
