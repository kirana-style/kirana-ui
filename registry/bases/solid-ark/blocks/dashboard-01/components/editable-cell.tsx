import { splitProps } from "solid-js"
import { toast } from "solid-sonner"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"
import type { Item } from "./table"

export function EditableCell(props: {
  item: Item
  field: "target" | "limit"
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["item", "field", "sx", "class"])
  // The target's and the limit's inline field: saved, as a toast says, when it is submitted.

  function save() {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `Saving ${local.item.header}`,
      success: "Done",
      error: "Error",
    })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        save()
      }}
    >
      <Label
        for={`${local.item.id}-${local.field}`}
        sx={local.field === "target" ? styles.label : styles.label2}
      >
        {local.field === "target" ? "Target" : "Limit"}
      </Label>
      <Input
        sx={local.field === "target" ? styles.input : styles.input2}
        value={local.item[local.field]}
        id={`${local.item.id}-${local.field}`}
      />
    </form>
  )
}
