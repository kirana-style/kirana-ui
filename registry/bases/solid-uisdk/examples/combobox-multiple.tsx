import { For } from "solid-js"
import { css } from "@kirana-style/core"
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
} from "../ui/combobox"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function ComboboxMultiple() {
  const styles = {
    wFullMaxWXs: css({
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.xs,
    }),
  }

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  return (
    <div sx={page.example}>
      <Combobox
        multiple
        autoHighlight
        items={frameworks}
        defaultValue={[frameworks[0]]}
      >
        <ComboboxChips sx={styles.wFullMaxWXs}>
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
    </div>
  )
}
