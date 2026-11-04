import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "./icon-placeholder"
import { nativeSelect } from "../../../styles/native-select.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function NativeSelect(
  props: Omit<
    JSX.SelectHTMLAttributes<HTMLSelectElement>,
    "class" | "value" | "size"
  > & {
    value?: string
    size?: "sm" | "default"
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["value", "size", "class", "sx", "children"]
  )
  /** `value` on the select, as on a native one; the caller's `sx` is the wrapper's. */
  return (
    <div
      data-slot="native-select-wrapper"
      data-size={local.size}
      {...styleProps(local.class, nativeSelect.wrapper, local.sx)}
    >
      <select
        data-slot="native-select"
        data-size={local.size}
        value={local.value}
        {...rest}
        sx={nativeSelect.select}
      >
        {local.children}
      </select>
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

function NativeSelectOptGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <optgroup
      data-slot="native-select-optgroup"
      {...rest}
      {...styleProps(local.class, nativeSelect.option, local.sx)}
    >
      {local.children}
    </optgroup>
  )
}

function NativeSelectOption(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <option
      data-slot="native-select-option"
      {...rest}
      {...styleProps(local.class, nativeSelect.option, local.sx)}
    >
      {local.children}
    </option>
  )
}

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup }
