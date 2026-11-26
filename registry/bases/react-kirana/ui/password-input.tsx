"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { PasswordInput as PasswordInputPrimitive } from "@kirana-ui/react/password-input"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { button } from "../../../styles/button.styles"
import { input } from "../../../styles/input.styles"
import { inputGroup } from "../../../styles/input-group.styles"
import { passwordInput } from "../../../styles/password-input.styles"

type RootProps = Omit<
  React.ComponentProps<typeof PasswordInputPrimitive.Root>,
  "className"
> & { sx?: Sx }
type InputProps = Omit<
  React.ComponentProps<typeof PasswordInputPrimitive.Input>,
  "className"
> & { sx?: Sx }
type ToggleProps = Omit<
  React.ComponentProps<typeof PasswordInputPrimitive.Toggle>,
  "className"
> & { sx?: Sx }
type IndicatorProps = Omit<
  React.ComponentProps<typeof PasswordInputPrimitive.Indicator>,
  "className"
> & { sx?: Sx }

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
 * `placeholder`, `autoComplete` …) and the root's own, `toggleLabels` (`{ show, hide }`) among them,
 * what the show/hide button is called; `sx` styles the field, as the root draws it.
 */
function PasswordInput({
  sx,
  visible,
  defaultVisible,
  onVisibleChange,
  onValueChange,
  disabled,
  toggleLabels,
  ...props
}: Omit<InputProps, "sx" | "disabled"> & PasswordInputOwnProps & { sx?: Sx }) {
  return (
    <PasswordInputRoot
      visible={visible}
      defaultVisible={defaultVisible}
      onVisibleChange={onVisibleChange}
      onValueChange={onValueChange}
      disabled={disabled}
      toggleLabels={toggleLabels}
      sx={sx}
    >
      <PasswordInputInput {...props} />
      <PasswordInputToggle />
    </PasswordInputRoot>
  )
}

function PasswordInputRoot({ sx, ...props }: RootProps) {
  return (
    <PasswordInputPrimitive.Root
      data-slot="password-input"
      {...props}
      {...styleProps(inputGroup.root, passwordInput.root, sx)}
    />
  )
}

function PasswordInputInput({ sx, ...props }: InputProps) {
  return (
    <PasswordInputPrimitive.Input
      data-slot="password-input-input"
      {...props}
      {...styleProps(input, inputGroup.input, sx)}
    />
  )
}

/** The show/hide button, in its addon at the field's inline end; it draws its indicator unless given children. */
function PasswordInputToggle({ sx, children, ...props }: ToggleProps) {
  return (
    <div
      data-slot="password-input-addon"
      data-align="inline-end"
      sx={inputGroup.addon({ align: "inline-end" })}
    >
      <PasswordInputPrimitive.Toggle
        data-slot="password-input-toggle"
        data-size="icon-xs"
        {...props}
        {...styleProps(
          button({ variant: "ghost" }),
          inputGroup.button({ size: "icon-xs" }),
          sx
        )}
      >
        {children ?? <PasswordInputIndicator />}
      </PasswordInputPrimitive.Toggle>
    </div>
  )
}

/** An eye, struck through while the password can be read; children replace it. */
function PasswordInputIndicator({ sx, children, ...props }: IndicatorProps) {
  return (
    <PasswordInputPrimitive.Indicator
      data-slot="password-input-indicator"
      render={(indicatorProps, state) => (
        <span {...indicatorProps}>
          {children ??
            (state.visible ? (
              <IconPlaceholder
                lucide="EyeOffIcon"
                tabler="IconEyeClosed"
                hugeicons="ViewOffIcon"
                phosphor="EyeSlashIcon"
                remixicon="RiEyeOffLine"
              />
            ) : (
              <IconPlaceholder
                lucide="EyeIcon"
                tabler="IconEye"
                hugeicons="EyeIcon"
                phosphor="EyeIcon"
                remixicon="RiEyeLine"
              />
            ))}
        </span>
      )}
      {...props}
      {...styleProps(passwordInput.indicator, sx)}
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
