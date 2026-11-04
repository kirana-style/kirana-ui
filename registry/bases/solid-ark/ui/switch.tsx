import { createMemo, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@ark-ui/solid"
import { switchStyles } from "../../../styles/switch.styles"
import type { Sx } from "@kirana-style/core"
import type { SwitchRootProps } from "@ark-ui/solid"

function Switch(props: {
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
  size?: "sm" | "default"
  asChild?: SwitchRootProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["id", "defaultChecked", "size", "asChild", "class", "sx"]
  )
  // `id` names the hidden input, so a `<Label for>` beside the switch reaches it.

  // `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
  const invalid = createMemo(() =>
    [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
  return (
    <SwitchRoot
      asChild={local.asChild}
      defaultChecked={local.defaultChecked}
      invalid={invalid() || undefined}
      {...rest}
      ids={local.id ? { hiddenInput: local.id } : undefined}
      {...styleProps(switchStyles.wrapper)}
    >
      <SwitchControl
        data-slot="switch"
        data-size={local.size}
        {...styleProps(local.class, switchStyles.root, local.sx)}
      >
        <SwitchThumb
          data-slot="switch-thumb"
          {...styleProps(switchStyles.thumb)}
        />
      </SwitchControl>
      <SwitchHiddenInput />
    </SwitchRoot>
  )
}

export { Switch }
