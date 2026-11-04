import { For } from "solid-js"
import { css } from "@kirana-style/core"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function FieldSelect() {
  const styles = {
    narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  }

  const items = [
    { label: "Choose department", value: null },
    { label: "Engineering", value: "engineering" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Sales", value: "sales" },
    { label: "Customer Support", value: "support" },
    { label: "Human Resources", value: "hr" },
    { label: "Finance", value: "finance" },
    { label: "Operations", value: "operations" },
  ]

  return (
    <div sx={page.example}>
      <Field sx={styles.narrow}>
        <FieldLabel>Department</FieldLabel>
        <Select items={items}>
          <SelectTrigger>
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
        <FieldDescription>
          Select your department or area of work.
        </FieldDescription>
      </Field>
    </div>
  )
}
