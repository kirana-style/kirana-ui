import { Show, createMemo, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  RadioGroupItem as ArkRadioGroupItem,
  RadioGroupItemContext,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupRoot,
} from "@ark-ui/solid"
import { radioGroup } from "../../../styles/radio-group.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { RadioGroupItemProps, RadioGroupRootProps } from "@ark-ui/solid"

function RadioGroup(props: {
  asChild?: RadioGroupRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <RadioGroupRoot
      asChild={local.asChild}
      data-slot="radio-group"
      {...rest}
      {...styleProps(local.class, radioGroup.root, local.sx)}
    >
      {local.children}
    </RadioGroupRoot>
  )
}

function RadioGroupItem(props: {
  value: string
  id?: string
  asChild?: RadioGroupItemProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "id",
    "asChild",
    "class",
    "sx",
  ])
  // Ark's required `value` is declared here and passed on. `id` names the hidden input, so a
  // `<Label for>` beside the item reaches it, as React's `htmlFor`.

  // `aria-invalid`, as upstream's demos mark an invalid radio: Ark marks only a whole group invalid,
  // so the item marks its own radio as Ark would.
  const invalid = createMemo(() =>
    [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
  return (
    <ArkRadioGroupItem
      asChild={local.asChild}
      value={local.value}
      {...rest}
      {...styleProps(radioGroup.itemWrapper)}
    >
      <RadioGroupItemControl
        asChild={(childProps) => (
          <span
            {...childProps()}
            data-slot="radio-group-item"
            data-invalid={invalid() ? "" : undefined}
            {...styleProps(
              childProps().class,
              local.class,
              radioGroup.item,
              local.sx
            )}
          >
            <RadioGroupItemContext>
              {(item) => (
                <Show when={item().checked}>
                  <span
                    data-slot="radio-group-indicator"
                    sx={radioGroup.indicator}
                  >
                    <span sx={radioGroup.dot} />
                  </span>
                </Show>
              )}
            </RadioGroupItemContext>
          </span>
        )}
      />
      <RadioGroupItemHiddenInput id={local.id} />
    </ArkRadioGroupItem>
  )
}

export { RadioGroup, RadioGroupItem }
