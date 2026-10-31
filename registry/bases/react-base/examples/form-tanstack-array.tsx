import { alpha, radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
/* eslint-disable react/no-children-prop */
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { z } from "zod"

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
  FieldLegend,
  FieldSet,
} from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { css, props as styleProps } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"

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
  cardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
  }),
  fieldSet: css({
    gap: { "*": null, base: space[4] },
  }),
  fieldGroup: css({
    gap: { "*": null, base: space[4] },
  }),
  cardFooter: css({
    borderStyle: { "*": null, base: "solid" },
    borderTopWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
  }),
}

const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
})

export default function FormTanstackArray() {
  const form = useForm({
    defaultValues: {
      emails: [{ address: "" }],
    },
    validators: {
      onBlur: formSchema,
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
        <CardHeader sx={styles.cardHeader}>
          <CardTitle>Contact Emails</CardTitle>
          <CardDescription>
            Manage your contact email addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-tanstack-array"
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
          >
            <form.Field name="emails" mode="array">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet sx={styles.fieldSet}>
                    <FieldLegend variant="label">Email Addresses</FieldLegend>
                    <FieldDescription>
                      Add up to 5 email addresses where we can contact you.
                    </FieldDescription>
                    <FieldGroup sx={styles.fieldGroup}>
                      {field.state.value.map((_, index) => (
                        <form.Field
                          key={index}
                          name={`emails[${index}].address`}
                          children={(subField) => {
                            const isSubFieldInvalid =
                              subField.state.meta.isTouched &&
                              !subField.state.meta.isValid
                            return (
                              <Field
                                orientation="horizontal"
                                data-invalid={isSubFieldInvalid}
                              >
                                <FieldContent>
                                  <InputGroup>
                                    <InputGroupInput
                                      id={`form-tanstack-array-email-${index}`}
                                      name={subField.name}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      aria-invalid={isSubFieldInvalid}
                                      placeholder="name@example.com"
                                      type="email"
                                      autoComplete="email"
                                    />
                                    {field.state.value.length > 1 && (
                                      <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                          type="button"
                                          variant="ghost"
                                          size="icon-xs"
                                          onClick={() =>
                                            field.removeValue(index)
                                          }
                                          aria-label={`Remove email ${index + 1}`}
                                        >
                                          <IconPlaceholder
                                            lucide="XIcon"
                                            tabler="IconX"
                                            hugeicons="Cancel01Icon"
                                            phosphor="XIcon"
                                            remixicon="RiCloseLine"
                                          />
                                        </InputGroupButton>
                                      </InputGroupAddon>
                                    )}
                                  </InputGroup>
                                  {isSubFieldInvalid && (
                                    <FieldError
                                      errors={subField.state.meta.errors}
                                    />
                                  )}
                                </FieldContent>
                              </Field>
                            )
                          }}
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => field.pushValue({ address: "" })}
                        disabled={field.state.value.length >= 5}
                      >
                        Add Email Address
                      </Button>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            </form.Field>
          </form>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-tanstack-array">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
