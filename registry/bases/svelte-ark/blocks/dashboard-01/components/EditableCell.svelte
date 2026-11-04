<script lang="ts">
  // The target's and the limit's inline field: saved, as a toast says, when it is submitted.
  import { toast } from "svelte-sonner"

  import { Input } from "../../../ui/input"
  import { Label } from "../../../ui/label"
  import { styles } from "./data-table"
  import type { Item } from "./data-table"

  let { item, field }: { item: Item; field: "target" | "limit" } = $props()

  function save() {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `Saving ${item.header}`,
      success: "Done",
      error: "Error",
    })
  }
</script>

<form onsubmit={(event) => { event.preventDefault(); save() }}>
  <Label for={`${item.id}-${field}`} sx={field === 'target' ? styles.label : styles.label2}>
    {field === "target" ? "Target" : "Limit"}
  </Label>
  <Input sx={field === 'target' ? styles.input : styles.input2} value={item[field]} id={`${item.id}-${field}`} />
</form>
