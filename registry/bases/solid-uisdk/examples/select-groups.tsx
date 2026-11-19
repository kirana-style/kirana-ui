import { For } from "solid-js"
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

export default function SelectGroups() {
  const styles = {
    wFullMaxW48: css({
      width: { "*": null, base: "100%" },
      maxWidth: space[48],
    }),
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

  return (
    <div sx={page.example}>
      <Select items={allItems}>
        <SelectTrigger sx={styles.wFullMaxW48}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <For each={fruits}>
              {(item) => (
                <SelectItem value={item.value}>{item.label}</SelectItem>
              )}
            </For>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <For each={vegetables}>
              {(item) => (
                <SelectItem value={item.value}>{item.label}</SelectItem>
              )}
            </For>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
