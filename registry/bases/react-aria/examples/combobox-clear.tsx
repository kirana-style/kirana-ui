import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { page } from "../../../styles/page.styles"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export default function ComboboxWithClear() {
  return (
    <div sx={page.example}>
      <Combobox
        defaultValue={frameworks[0]}
        allowsEmptyCollection
        aria-label="Framework"
      >
        <ComboboxInput placeholder="Select a framework" showClear />
        <ComboboxContent>
          <ComboboxList
            renderEmptyState={() => (
              <ComboboxEmpty>No items found.</ComboboxEmpty>
            )}
          >
            {frameworks.map((item) => (
              <ComboboxItem key={item} id={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
