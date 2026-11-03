<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Field, FieldError, FieldLabel } from "../ui/field"
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
  ]
</script>

<div sx={page.example}>
  <Field data-invalid="true" sx={styles.wFullMaxW48}>
    <FieldLabel>
      Fruit
    </FieldLabel>
    <Select items={items}>
      <SelectTrigger aria-invalid="true">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {#each items as item (item.label)}
            <SelectItem value={item.value}>
              {item.label}
            </SelectItem>
          {/each}
        </SelectGroup>
      </SelectContent>
    </Select>
    <FieldError>
      Please select a fruit.
    </FieldError>
  </Field>
</div>
