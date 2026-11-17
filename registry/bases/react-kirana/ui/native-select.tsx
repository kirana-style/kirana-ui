import * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { nativeSelect } from "../../../styles/native-select.styles"

type NativeSelectProps = Omit<
  React.ComponentProps<"select">,
  "size" | "className"
> & {
  size?: "sm" | "default"
  sx?: Sx
}

function NativeSelect({ sx, size = "default", ...props }: NativeSelectProps) {
  return (
    <div
      data-slot="native-select-wrapper"
      data-size={size}
      sx={[nativeSelect.wrapper, sx]}
    >
      <select
        data-slot="native-select"
        data-size={size}
        {...props}
        sx={nativeSelect.select}
      />
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        aria-hidden="true"
        data-slot="native-select-icon"
        {...styleProps(nativeSelect.icon)}
      />
    </div>
  )
}

function NativeSelectOption({
  sx,
  ...props
}: Omit<React.ComponentProps<"option">, "className"> & { sx?: Sx }) {
  return (
    <option
      data-slot="native-select-option"
      {...props}
      sx={[nativeSelect.option, sx]}
    />
  )
}

function NativeSelectOptGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<"optgroup">, "className"> & { sx?: Sx }) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      {...props}
      sx={[nativeSelect.option, sx]}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
