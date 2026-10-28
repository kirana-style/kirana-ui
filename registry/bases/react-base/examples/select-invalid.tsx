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

export default function SelectInvalid() {
  return (
    <div sx={page.example}>
      <Field data-invalid sx={styles.wFullMaxW48}>
        <FieldLabel>Fruit</FieldLabel>
        <Select items={items}>
          <SelectTrigger aria-invalid>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError>Please select a fruit.</FieldError>
      </Field>
    </div>
  )
}
