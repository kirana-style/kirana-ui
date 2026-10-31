import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  FieldArray,
  Form,
  Field as FormischField,
  insert,
  remove,
  reset,
  useForm,
} from "@formisch/react"
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

const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty("Enter an email address."),
          v.email("Enter a valid email address.")
        ),
      })
    ),
    v.minLength(1, "Add at least one email address."),
    v.maxLength(5, "You can add up to 5 email addresses.")
  ),
})

export default function FormFormischArray() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      emails: [{ address: "" }, { address: "" }],
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
        <CardHeader sx={styles.cardHeader}>
          <CardTitle>Contact Emails</CardTitle>
          <CardDescription>
            Manage your contact email addresses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form of={form} id="form-formisch-array" onSubmit={handleSubmit}>
            <FieldArray of={form} path={["emails"]}>
              {(fieldArray) => (
                <FieldSet sx={styles.fieldSet}>
                  <FieldLegend variant="label">Email Addresses</FieldLegend>
                  <FieldDescription>
                    Add up to 5 email addresses where we can contact you.
                  </FieldDescription>
                  <FieldGroup sx={styles.fieldGroup}>
                    {fieldArray.items.map((item, index) => (
                      <FormischField
                        key={item}
                        of={form}
                        path={["emails", index, "address"]}
                      >
                        {(field) => (
                          <Field
                            orientation="horizontal"
                            data-invalid={field.errors !== null}
                          >
                            <FieldContent>
                              <InputGroup>
                                <InputGroupInput
                                  {...field.props}
                                  id={`form-formisch-array-email-${index}`}
                                  value={field.input ?? ""}
                                  aria-invalid={field.errors !== null}
                                  placeholder="name@example.com"
                                  type="email"
                                  autoComplete="email"
                                />
                                {fieldArray.items.length > 1 && (
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      size="icon-xs"
                                      onClick={() =>
                                        remove(form, {
                                          path: ["emails"],
                                          at: index,
                                        })
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
                              {field.errors && (
                                <FieldError
                                  errors={field.errors.map((message) => ({
                                    message,
                                  }))}
                                />
                              )}
                            </FieldContent>
                          </Field>
                        )}
                      </FormischField>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        insert(form, {
                          path: ["emails"],
                          initialInput: { address: "" },
                        })
                      }
                      isDisabled={fieldArray.items.length >= 5}
                    >
                      Add Email Address
                    </Button>
                  </FieldGroup>
                  {fieldArray.errors && (
                    <FieldError
                      errors={fieldArray.errors.map((message) => ({ message }))}
                    />
                  )}
                </FieldSet>
              )}
            </FieldArray>
          </Form>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => reset(form)}>
              Reset
            </Button>
            <Button type="submit" form="form-formisch-array">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
