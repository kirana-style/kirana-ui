import { For } from "solid-js"
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

export default function SelectInvalid() {
  const styles = {
    wFullMaxW48: css({
      width: { "*": null, base: "100%" },
      maxWidth: space[48],
    }),
  }

  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]

  return (
    <div sx={page.example}>
      <Field data-invalid="true" sx={styles.wFullMaxW48}>
        <FieldLabel>Fruit</FieldLabel>
        <Select items={items}>
          <SelectTrigger aria-invalid="true">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <For each={items}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError>Please select a fruit.</FieldError>
      </Field>
    </div>
  )
}
