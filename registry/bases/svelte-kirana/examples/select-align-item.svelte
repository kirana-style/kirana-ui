<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "../ui/field"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  import { Switch } from "../ui/switch"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  }

  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]

  let alignItemWithTrigger = $state(true)
</script>

<div sx={page.example}>
  <FieldGroup sx={styles.narrow}>
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel for="align-item">
          Align Item
        </FieldLabel>
        <FieldDescription>
          Toggle to align the item with the trigger.
        </FieldDescription>
      </FieldContent>
      <Switch id="align-item" checked={alignItemWithTrigger} onCheckedChange={(details: { checked: typeof alignItemWithTrigger }) => (alignItemWithTrigger = details.checked)} />
    </Field>
    <Field>
      <Select items={items} defaultValue="banana">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
          <SelectGroup>
            {#each items as item (item.label)}
              <SelectItem value={item.value}>
                {item.label}
              </SelectItem>
            {/each}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  </FieldGroup>
</div>
