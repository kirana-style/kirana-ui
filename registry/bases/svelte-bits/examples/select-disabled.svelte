<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    wFullMaxW48: css({ width: { "*": null, base: "100%" }, maxWidth: space[48] }),
  }

  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes", disabled: true },
    { label: "Pineapple", value: "pineapple" },
  ]
</script>

<div sx={page.example}>
  <Select items={items} disabled>
    <SelectTrigger sx={styles.wFullMaxW48}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {#each items as item (item.label)}
          <SelectItem value={item.value} disabled={item.disabled}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
