import { For, splitProps } from "solid-js"
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
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function ComboboxMultiple(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  return (
    <Example
      title="Combobox Multiple"
      {...rest}
      class={local.class}
      sx={[local.sx]}
    >
      <Combobox
        multiple
        autoHighlight
        items={frameworks}
        defaultValue={[frameworks[0]]}
      >
        <ComboboxChips sx={example.row}>
          <ComboboxValue>
            {(values) => (
              <>
                <For each={values}>
                  {(value) => (
                    <ComboboxChip value={value}>{value}</ComboboxChip>
                  )}
                </For>
                <ComboboxChipsInput />
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
    </Example>
  )
}
