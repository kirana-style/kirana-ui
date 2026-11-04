import { Show, createMemo, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  CheckboxContext,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxRoot,
} from "@ark-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { checkbox } from "../../../styles/checkbox.styles"
import type { Sx } from "@kirana-style/core"
import type { CheckboxRootProps } from "@ark-ui/solid"

function Checkbox(props: {
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
  asChild?: CheckboxRootProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "id",
    "defaultChecked",
    "asChild",
    "class",
    "sx",
  ])
  // `id` names the hidden input, so a `<Label for>` beside the box reaches it, as React's `htmlFor`.

  // `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
  const invalid = createMemo(() =>
    [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
  return (
    <CheckboxRoot
      asChild={local.asChild}
      defaultChecked={local.defaultChecked}
      invalid={invalid() || undefined}
      {...rest}
      ids={local.id ? { hiddenInput: local.id } : undefined}
      {...styleProps(checkbox.wrapper)}
    >
      <CheckboxControl
        asChild={(childProps) => (
          <span
            {...childProps()}
            data-slot="checkbox"
            {...styleProps(
              childProps().class,
              local.class,
              checkbox.root,
              local.sx
            )}
          >
            <CheckboxContext>
              {(state) => (
                <Show when={state().checked || state().indeterminate}>
                  <>
                    <CheckboxIndicator
                      indeterminate={state().indeterminate}
                      asChild={(childProps2) => (
                        <span
                          {...childProps2()}
                          data-slot="checkbox-indicator"
                          {...styleProps(
                            childProps2().class,
                            checkbox.indicator
                          )}
                        >
                          <IconPlaceholder
                            lucide="CheckIcon"
                            tabler="IconCheck"
                            hugeicons="Tick02Icon"
                            phosphor="CheckIcon"
                            remixicon="RiCheckLine"
                          />
                        </span>
                      )}
                    />
                  </>
                </Show>
              )}
            </CheckboxContext>
          </span>
        )}
      />
      <CheckboxHiddenInput />
    </CheckboxRoot>
  )
}

export { Checkbox }
