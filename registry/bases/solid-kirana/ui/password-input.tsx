import { Show, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { PasswordInput as PasswordInputPrimitive } from "@kirana-ui/solid/password-input"
import type {
  IndicatorProps,
  InputProps,
  RootProps,
  ToggleProps,
} from "@kirana-ui/solid/password-input"
import type { Sx } from "@kirana-style/core"

import { button } from "../../../styles/button.styles"
import { input } from "../../../styles/input.styles"
import { inputGroup } from "../../../styles/input-group.styles"
import { passwordInput } from "../../../styles/password-input.styles"
import { IconPlaceholder } from "./icon-placeholder"

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

/** The root's own props, which `PasswordInput` takes beside its input's. */
type PasswordInputOwnProps = Pick<
  RootProps,
  | "visible"
  | "defaultVisible"
  | "onVisibleChange"
  | "onValueChange"
  | "disabled"
  | "toggleLabels"
>

/**
 * The whole field: the input and its show/hide button. Its props are the input's (`id`, `name`,
 * `placeholder`, `autocomplete` …) and the root's own, `toggleLabels` (`{ show, hide }`) among them,
 * what the show/hide button is called; `sx` styles the field, as the root draws it.
 */
function PasswordInput(
  props: Omit<Styled<InputProps>, "disabled"> & PasswordInputOwnProps
) {
  const rest = omit(
    props,
    "class",
    "sx",
    "visible",
    "defaultVisible",
    "onVisibleChange",
    "onValueChange",
    "disabled",
    "toggleLabels"
  )
  return (
    <PasswordInputRoot
      visible={props.visible}
      defaultVisible={props.defaultVisible}
      onVisibleChange={props.onVisibleChange}
      onValueChange={props.onValueChange}
      disabled={props.disabled}
      toggleLabels={props.toggleLabels}
      class={props.class}
      sx={props.sx}
    >
      <PasswordInputInput {...rest} />
      <PasswordInputToggle />
    </PasswordInputRoot>
  )
}

function PasswordInputRoot(props: Styled<RootProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <PasswordInputPrimitive.Root
      data-slot="password-input"
      {...rest}
      {...styleProps(
        props.class,
        inputGroup.root,
        passwordInput.root,
        props.sx
      )}
    />
  )
}

function PasswordInputInput(props: Styled<InputProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <PasswordInputPrimitive.Input
      data-slot="password-input-input"
      {...rest}
      {...styleProps(props.class, input, inputGroup.input, props.sx)}
    />
  )
}

/** The show/hide button, in its addon at the field's inline end; it draws its indicator unless given children. */
function PasswordInputToggle(props: Styled<ToggleProps>) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="password-input-addon"
      data-align="inline-end"
      sx={inputGroup.addon({ align: "inline-end" })}
    >
      <PasswordInputPrimitive.Toggle
        data-slot="password-input-toggle"
        data-size="icon-xs"
        {...rest}
        {...styleProps(
          props.class,
          button({ variant: "ghost" }),
          inputGroup.button({ size: "icon-xs" }),
          props.sx
        )}
      >
        {"children" in props ? props.children : <PasswordInputIndicator />}
      </PasswordInputPrimitive.Toggle>
    </div>
  )
}

/** An eye, struck through while the password can be read; children replace it. */
function PasswordInputIndicator(props: Styled<IndicatorProps>) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <PasswordInputPrimitive.Indicator
      data-slot="password-input-indicator"
      render={(indicatorProps, state) => (
        <span {...indicatorProps()}>
          {"children" in props ? (
            props.children
          ) : (
            <Show
              when={state().visible}
              fallback={
                <IconPlaceholder
                  lucide="EyeIcon"
                  tabler="IconEye"
                  hugeicons="EyeIcon"
                  phosphor="EyeIcon"
                  remixicon="RiEyeLine"
                />
              }
            >
              <IconPlaceholder
                lucide="EyeOffIcon"
                tabler="IconEyeClosed"
                hugeicons="ViewOffIcon"
                phosphor="EyeSlashIcon"
                remixicon="RiEyeOffLine"
              />
            </Show>
          )}
        </span>
      )}
      {...rest}
      {...styleProps(props.class, passwordInput.indicator, props.sx)}
    />
  )
}

export {
  PasswordInput,
  PasswordInputRoot,
  PasswordInputInput,
  PasswordInputToggle,
  PasswordInputIndicator,
}
