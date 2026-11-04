import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { page } from "../../../styles/page.styles"

export default function ComboboxClear() {
  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const

  return (
    <div sx={page.example}>
      <Combobox items={frameworks} defaultValue={frameworks[0]}>
        <ComboboxInput placeholder="Select a framework" showClear />
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
