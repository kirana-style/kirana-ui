import { For, splitProps } from "solid-js"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { example } from "../../../../styles/example.styles"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../../ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "../../ui/field"
import { space } from "../../../../core/scales"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function ComboboxMultipleInvalid(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const styles = {
    flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  return (
    <Example
      title="Combobox Multiple Invalid"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <div sx={[styles.flexCol4, example.row]}>
        <Combobox
          multiple
          autoHighlight
          items={frameworks}
          defaultValue={[frameworks[0], frameworks[1]]}
        >
          <ComboboxChips>
            <ComboboxValue>
              {(values) => (
                <>
                  <For each={values}>
                    {(value) => (
                      <ComboboxChip value={value}>{value}</ComboboxChip>
                    )}
                  </For>
                  <ComboboxChipsInput aria-invalid="true" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {({ item }) => <ComboboxItem value={item}>{item}</ComboboxItem>}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Field data-invalid="true">
          <FieldLabel for="combobox-multiple-invalid">Frameworks</FieldLabel>
          <Combobox
            multiple
            autoHighlight
            items={frameworks}
            defaultValue={[frameworks[0], frameworks[1], frameworks[2]]}
          >
            <ComboboxChips>
              <ComboboxValue>
                {(values) => (
                  <>
                    <For each={values}>
                      {(value) => (
                        <ComboboxChip value={value}>{value}</ComboboxChip>
                      )}
                    </For>
                    <ComboboxChipsInput
                      id="combobox-multiple-invalid"
                      aria-invalid="true"
                    />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {({ item }) => <ComboboxItem value={item}>{item}</ComboboxItem>}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Please select at least one framework.
          </FieldDescription>
          <FieldError errors={[{ message: "This field is required." }]} />
        </Field>
      </div>
    </Example>
  )
}
