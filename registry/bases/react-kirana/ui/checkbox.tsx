"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { Checkbox as CheckboxPrimitive } from "@kirana-ui/react/checkbox"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { checkbox } from "../../../styles/checkbox.styles"

function Checkbox({
  sx,
  ...props
}: Omit<PartProps<typeof CheckboxPrimitive.Root>, "className"> & { sx?: Sx }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      {...props}
      {...styleProps(checkbox.root, sx)}
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
