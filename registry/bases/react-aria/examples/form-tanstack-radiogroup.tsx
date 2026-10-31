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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { css, props as styleProps } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
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
  formTanstackRadioGroupPre: css({
    // `bg-code text-code-foreground`: upstream's site's code surface.
    backgroundColor: alpha.muted50,
    color: `light-dark(${theme.foreground}, ${theme.mutedForeground})`,
    marginTop: space[2],
    width: "320px",
    overflowX: "auto",
    borderRadius: radius.md,
    padding: space[4],
  }),
  formTanstackRadioGroupCard: css({
    width: { "*": null, base: "100%" },
    maxWidth: { [breakpoint.sm]: containerSize.md },
  }),
}

const plans = [
  {
    id: "starter",
    title: "Starter (100K tokens/month)",
    description: "For everyday use with basic features.",
  },
  {
    id: "pro",
    title: "Pro (1M tokens/month)",
    description: "For advanced AI usage with more features.",
  },
  {
    id: "enterprise",
    title: "Enterprise (Unlimited tokens)",
    description: "For large teams and heavy usage.",
  },
] as const

const formSchema = z.object({
  plan: z.string().min(1, "You must select a subscription plan to continue."),
})

export default function FormTanstackRadioGroup() {
  const form = useForm({
    defaultValues: {
      plan: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre sx={styles.formTanstackRadioGroupPre}>
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
      <Card sx={styles.formTanstackRadioGroupCard}>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            See pricing and features for each plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-tanstack-radiogroup"
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
                      <FieldLegend>Plan</FieldLegend>
                      <FieldDescription>
                        You can upgrade or downgrade your plan at any time.
                      </FieldDescription>
                      <RadioGroup
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}
                      >
                        {plans.map((plan) => (
                          <FieldLabel
                            key={plan.id}
                            htmlFor={`form-tanstack-radiogroup-${plan.id}`}
                          >
                            <Field
                              orientation="horizontal"
                              data-invalid={isInvalid}
                            >
                              <FieldContent>
                                <FieldTitle>{plan.title}</FieldTitle>
                                <FieldDescription>
                                  {plan.description}
                                </FieldDescription>
                              </FieldContent>
                              <RadioGroupItem
                                value={plan.id}
                                id={`form-tanstack-radiogroup-${plan.id}`}
                                aria-invalid={isInvalid}
                              />
                            </Field>
                          </FieldLabel>
                        ))}
                      </RadioGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldSet>
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
            <Button type="submit" form="form-tanstack-radiogroup">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
