import { splitProps } from "solid-js"
import { Label } from "../../../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"
import type { Item } from "./table"

export function ReviewerCell(props: { item: Item; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["item", "sx", "class"])
  const reviewers = [
    { label: "Eddie Lake", value: "Eddie Lake" },
    { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
  ]

  return (
    <>
      {local.item.reviewer !== "Assign reviewer" ? (
        local.item.reviewer
      ) : (
        <>
          <Label for={`${local.item.id}-reviewer`} sx={styles.label3}>
            Reviewer
          </Label>
          <Select items={reviewers}>
            <SelectTrigger
              sx={styles.selectTrigger}
              size="sm"
              id={`${local.item.id}-reviewer`}
            >
              <SelectValue
                sx={styles.selectValue}
                placeholder="Assign reviewer"
              />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">
                  Jamik Tashpulatov
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )}
    </>
  )
}
