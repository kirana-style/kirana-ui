import { css, props as styleProps } from "@kirana-style/core"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { page } from "../../../styles/page.styles"

const styles = {
  w250: css({ width: { "*": null, base: "250px" }, maxWidth: "100%" }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export default function ComboboxMultiple() {
  return (
    <div sx={page.example}>
      <Combobox
        aria-label="Frameworks"
        selectionMode="multiple"
        defaultValue={[frameworks[0]]}
        allowsEmptyCollection
        {...styleProps(styles.w250)}
      >
        <ComboboxChips>
          <ComboboxChipList<{ name: string }>>
            {(value) => (
              <ComboboxChip id={value.name}>{value.name}</ComboboxChip>
            )}
          </ComboboxChipList>
          <ComboboxChipsInput />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxList
            renderEmptyState={() => (
              <ComboboxEmpty>No items found.</ComboboxEmpty>
            )}
          >
            {frameworks.map((item) => (
              <ComboboxItem key={item} id={item} value={{ name: item }}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
