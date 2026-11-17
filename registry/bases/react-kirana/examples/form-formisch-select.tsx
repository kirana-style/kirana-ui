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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
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
    maxWidth: { [breakpoint.sm]: containerSize.lg },
  }),
  selectTrigger: css({
    minWidth: { "*": null, base: "120px" },
  }),
}

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

/** What the trigger shows for each value: Base UI's select reads it from `items`. */
const languageItems = [{ label: "Auto", value: "auto" }, ...spokenLanguages]

const FormSchema = v.object({
  language: v.pipe(
    v.string(),
    v.minLength(1, "Please select your spoken language."),
    v.check(
      (value) => value !== "auto",
      "Auto-detection is not allowed. Please select a specific language."
    )
  ),
})

export default function FormFormischSelect() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      language: "",
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
          <CardTitle>Language Preferences</CardTitle>
          <CardDescription>
            Select your preferred spoken language.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form of={form} id="form-formisch-select" onSubmit={handleSubmit}>
            <FieldGroup>
              <FormischField of={form} path={["language"]}>
                {(field) => (
                  <Field
                    orientation="responsive"
                    data-invalid={field.errors !== null}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="form-formisch-select-language">
                        Spoken Language
                      </FieldLabel>
                      <FieldDescription>
                        For best results, select the language you speak.
                      </FieldDescription>
                      {field.errors && (
                        <FieldError
                          errors={field.errors.map((message) => ({ message }))}
                        />
                      )}
                    </FieldContent>
                    <Select
                      items={languageItems}
                      value={field.input ?? ""}
                      onValueChange={(value) => field.onChange(value ?? "")}
                    >
                      <SelectTrigger
                        id="form-formisch-select-language"
                        aria-invalid={field.errors !== null}
                        sx={styles.selectTrigger}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <Button type="submit" form="form-formisch-select">
              Save
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
