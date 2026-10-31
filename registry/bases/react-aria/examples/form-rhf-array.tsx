import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
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
import { alpha, radius, theme } from "../../../core/tokens"
import { cardCtx } from "../../../core/context"
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
  cardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    // The header's `[.border-b]:pb-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockEnd: cardCtx.spacing,
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
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
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

export default function FormRhfArray() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: [{ address: "" }, { address: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
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
        <CardHeader sx={styles.cardHeader}>
          <CardTitle>Contact Emails</CardTitle>
          <CardDescription>
            Manage your contact email addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet sx={styles.fieldSet}>
              <FieldLegend variant="label">Email Addresses</FieldLegend>
              <FieldDescription>
                Add up to 5 email addresses where we can contact you.
              </FieldDescription>
              <FieldGroup sx={styles.fieldGroup}>
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`emails.${index}.address`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              {...controllerField}
                              id={`form-rhf-array-email-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder="name@example.com"
                              type="email"
                              autoComplete="email"
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => remove(index)}
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
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ address: "" })}
                  isDisabled={fields.length >= 5}
                >
                  Add Email Address
                </Button>
              </FieldGroup>
              {form.formState.errors.emails?.root && (
                <FieldError errors={[form.formState.errors.emails.root]} />
              )}
            </FieldSet>
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
            <Button type="submit" form="form-rhf-array">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
