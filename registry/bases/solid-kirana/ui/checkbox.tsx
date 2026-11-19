import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Checkbox as CheckboxPrimitive } from "@kirana-ui/solid/checkbox"
import { asRender } from "../../../lib/solid/element"
import { IconPlaceholder } from "./icon-placeholder"
import { checkbox } from "../../../styles/checkbox.styles"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/**
 * Kirana UI's checkbox, with Solid's Ark UI part's props: `checked` (`true`, `false` or
 * `"indeterminate"`, Kirana UI's `checked` and `indeterminate`), Base UI's `defaultChecked`, and
 * `onCheckedChange({ checked })`. The box holds the hidden native checkbox, so an `id` on it is
 * what a `<Label for>` beside it reaches, and `aria-invalid` marks it as upstream's demos do.
 */
function Checkbox(props: {
  id?: string
  defaultChecked?: boolean
  checked?: boolean | "indeterminate"
  onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "checked",
    "onCheckedChange",
    "asChild",
    "class",
    "sx",
  ])
  return (
    <CheckboxPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="checkbox"
      {...rest}
      checked={local.checked === undefined ? undefined : local.checked === true}
      indeterminate={
        local.checked === undefined
          ? (rest.indeterminate as boolean | undefined)
          : local.checked === "indeterminate"
      }
      onCheckedChange={(checked: boolean) =>
        local.onCheckedChange?.({ checked })
      }
      {...styleProps(local.class, checkbox.root, local.sx)}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        {...styleProps(checkbox.indicator)}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
