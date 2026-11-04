<script lang="ts">
  // The selection column: the header's box selects the page's rows, a row's box selects its row.
  import { Checkbox } from "../../../ui/checkbox"
  import { styles } from "./data-table"

  let {
    checked,
    label,
    header = false,
    onToggle,
  }: {
    checked: boolean | "indeterminate"
    label: string
    header?: boolean
    onToggle: (checked: boolean) => void
  } = $props()
</script>

<div sx={header ? styles.div : styles.div2}>
  <Checkbox
    {checked}
    aria-label={label}
    onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
      onToggle(details.checked === true)}
  />
</div>
