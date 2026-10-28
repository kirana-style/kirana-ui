"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  Checkbox as CheckboxPrimitive,
  composeRenderProps,
} from "react-aria-components"
import type { CheckboxProps } from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { checkbox } from "../../../styles/checkbox.styles"

function Checkbox({
  sx,
  children,
  ...props
}: Omit<CheckboxProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      {...props}
      {...styleProps(checkbox.root, sx)}
    >
      {composeRenderProps(
        children,
        (content, { isSelected, isIndeterminate }) => (
          <>
            <span data-slot="checkbox-indicator" sx={checkbox.indicator}>
              {(isSelected || isIndeterminate) && (
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                />
              )}
            </span>
            {content}
          </>
        )
      )}
    </CheckboxPrimitive>
  )
}

export { Checkbox }
