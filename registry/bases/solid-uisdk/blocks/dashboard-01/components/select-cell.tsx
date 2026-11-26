import { Checkbox } from "../../../ui/checkbox"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"
import { withDefaults } from "../../../../../lib/solid2/with-defaults"

export function SelectCell(props: {
  checked: boolean | "indeterminate"
  label: string
  header?: boolean
  onToggle: (checked: boolean) => void

  sx?: Sx
  class?: string
}) {
  const local = withDefaults({ header: false } as const, props)
  // The selection column: the header's box selects the page's rows, a row's box selects its row.

  return (
    <div sx={local.header ? styles.div : styles.div2}>
      <Checkbox
        checked={local.checked}
        aria-label={local.label}
        onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
          local.onToggle(details.checked === true)
        }
      />
    </div>
  )
}
