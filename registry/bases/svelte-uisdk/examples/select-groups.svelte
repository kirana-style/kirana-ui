<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    wFullMaxW48: css({ width: { "*": null, base: "100%" }, maxWidth: space[48] }),
  }

  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]

  const vegetables = [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" },
    { label: "Spinach", value: "spinach" },
  ]

  const allItems = [
    { label: "Select a fruit", value: null },
    ...fruits,
    ...vegetables,
  ]
</script>

<div sx={page.example}>
  <Select items={allItems}>
    <SelectTrigger sx={styles.wFullMaxW48}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          Fruits
        </SelectLabel>
        {#each fruits as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>
          Vegetables
        </SelectLabel>
        {#each vegetables as item (item.value)}
          <SelectItem value={item.value}>
            {item.label}
          </SelectItem>
        {/each}
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
