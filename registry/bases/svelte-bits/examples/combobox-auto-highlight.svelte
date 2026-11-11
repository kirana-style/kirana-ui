<script lang="ts">

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
</script>

<div sx={page.example}>
  <Combobox items={frameworks} autoHighlight>
    <ComboboxInput placeholder="Select a framework" />
    <ComboboxContent>
      <ComboboxEmpty>
        No items found.
      </ComboboxEmpty>
      <ComboboxList>
        {#snippet children({ item })}
          <ComboboxItem value={item}>
            {item}
          </ComboboxItem>
        {/snippet}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>
