import { splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { toast } from "solid-sonner"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Card, CardContent, CardFooter } from "../../ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox"
import { Field, FieldGroup, FieldLabel } from "../../ui/field"
import { containerSize } from "../../../../core/scales"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function ComboboxWithForm(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const styles = {
    wFullMaxWSm: css({
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
    }),
    wFull: css({ width: { "*": null, base: "100%" } }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const framework = formData.get("framework") as string
    toast(`You selected ${framework} as your framework.`)
  }

  return (
    <Example
      title="Form with Combobox"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Card sx={styles.wFullMaxWSm} size="sm">
        <CardContent>
          <form
            id="form-with-combobox"
            sx={styles.wFull}
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <Field>
                <FieldLabel for="framework">Framework</FieldLabel>
                <Combobox items={frameworks}>
                  <ComboboxInput
                    id="framework"
                    name="framework"
                    placeholder="Select a framework"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                      {({ item }) => (
                        <ComboboxItem value={item}>{item}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="form-with-combobox">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}
