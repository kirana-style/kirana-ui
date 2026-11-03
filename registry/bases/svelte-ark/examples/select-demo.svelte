<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  import { page } from "../../../styles/page.styles"

  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
</script>

<div sx={page.example}>
  <Select items={fruits}>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          Fruits
        </SelectLabel>
        {#each fruits as fruit (fruit.value)}
          <SelectItem value={fruit.value}>
            {fruit.label}
          </SelectItem>
        {/each}
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
