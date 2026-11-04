import { For } from "solid-js"
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

export default function SelectDemo() {
  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]

  return (
    <div sx={page.example}>
      <Select items={fruits}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <For each={fruits}>
              {(fruit) => (
                <SelectItem value={fruit.value}>{fruit.label}</SelectItem>
              )}
            </For>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
