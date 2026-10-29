"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Button as ButtonPrimitive,
  Collection,
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  ComboBoxValue as ComboBoxValuePrimitive,
  composeRenderProps,
  Group,
  Header as HeaderPrimitive,
  Input as InputPrimitive,
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
  ListBoxSection as ListBoxSectionPrimitive,
  Popover as PopoverPrimitive,
  Separator as SeparatorPrimitive,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
} from "react-aria-components"
import type {
  ButtonProps,
  ComboBoxValueProps,
  GroupProps,
  HeaderProps,
  InputProps,
  ListBoxItemProps,
  ListBoxProps,
  ListBoxSectionProps,
  SeparatorProps,
  TagListProps,
  TagProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { combobox } from "../../../styles/combobox.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuLabel,
  menuRowBase,
  menuSeparator,
  menuSurface,
} from "../../../styles/menu.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import { Button } from "./button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group"

type WithSx<P> = Omit<P, "className" | "style"> & { sx?: Sx }

function ComboboxValue<T>({ ...props }: ComboBoxValueProps<T>) {
  return <ComboBoxValuePrimitive data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  sx,
  children,
  ...props
}: WithSx<Omit<ButtonProps, "children">> & {
  children?: React.ReactNode
}) {
  return (
    <ButtonPrimitive
      data-slot="combobox-trigger"
      {...props}
      {...styleProps(combobox.triggerOwn, sx)}
    >
      {children}
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        {...styleProps(combobox.triggerIcon)}
      />
    </ButtonPrimitive>
  )
}

function ComboboxClear({
  ...props
}: React.ComponentProps<typeof InputGroupButton>) {
  const state = React.useContext(ComboBoxStateContext)
  if (state?.inputValue === "") {
    return null
  }

  return (
    <InputGroupButton
      data-slot="combobox-clear"
      variant="ghost"
      size="icon-xs"
      aria-label="Clear"
      onPress={() => {
        state?.setValue(null)
      }}
      slot={null}
      {...props}
    >
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  )
}

function ComboboxInput({
  sx,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: Omit<React.ComponentProps<"input">, "className"> & {
  showTrigger?: boolean
  showClear?: boolean
  sx?: Sx
}) {
  return (
    <InputGroup sx={[combobox.input, sx]}>
      <InputGroupInput disabled={disabled} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="combobox-trigger"
            sx={combobox.trigger}
            isDisabled={disabled}
          >
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              {...styleProps(combobox.triggerIcon)}
            />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear isDisabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  sx,
  placement = "bottom",
  offset = 6,
  crossOffset = 0,
  anchor,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverPrimitive>,
  "className" | "style" | "children"
> & {
  sx?: Sx
  children?: React.ReactNode
  anchor?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <PopoverPrimitive
      data-slot="combobox-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      triggerRef={anchor}
      {...props}
      {...styleProps(popupMotion, menuSurface, combobox.contentAria, sx)}
    />
  )
}

function ComboboxList<T extends object>({
  sx,
  ...props
}: WithSx<ListBoxProps<T>>) {
  return (
    <ListBoxPrimitive
      data-slot="combobox-list"
      {...props}
      {...styleProps(combobox.list, combobox.listAria, sx)}
    />
  )
}

function ComboboxItem<T extends object>({
  sx,
  children,
  ...props
}: WithSx<ListBoxItemProps<T>>) {
  return (
    <ListBoxItemPrimitive
      data-slot="combobox-item"
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      {...styleProps(menuRowBase, menuCheckableRowPadding, combobox.item, sx)}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {content}
          <span sx={[menuIndicator, combobox.indicator]}>
            {isSelected ? (
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            ) : null}
          </span>
        </>
      ))}
    </ListBoxItemPrimitive>
  )
}

function ComboboxGroup<T extends object>({
  sx,
  ...props
}: WithSx<ListBoxSectionProps<T>>) {
  return (
    <ListBoxSectionPrimitive
      data-slot="combobox-group"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function ComboboxLabel({ sx, ...props }: WithSx<HeaderProps>) {
  return (
    <HeaderPrimitive
      data-slot="combobox-label"
      {...props}
      {...styleProps(menuLabel, combobox.label, sx)}
    />
  )
}

function ComboboxEmpty({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="combobox-empty" {...props} sx={[combobox.empty, sx]} />
}

function ComboboxSeparator({ sx, ...props }: WithSx<SeparatorProps>) {
  return (
    <SeparatorPrimitive
      data-slot="combobox-separator"
      {...props}
      {...styleProps(menuSeparator, sx)}
    />
  )
}

function ComboboxChips({ children, sx, ...props }: WithSx<GroupProps>) {
  return (
    <Group
      data-slot="combobox-chips"
      {...props}
      {...styleProps(combobox.chips, sx)}
    >
      {children}
    </Group>
  )
}

function ComboboxChipList<T extends object>({
  sx,
  ...props
}: WithSx<Omit<TagListProps<T>, "items">>) {
  return (
    <ComboBoxValuePrimitive<T> {...styleProps(combobox.contents)}>
      {({ selectedItems, state }) => (
        <TagGroupPrimitive
          data-slot="combobox-chip-list"
          {...styleProps(combobox.contents, sx)}
          onRemove={(keys) => {
            if (Array.isArray(state.value)) {
              state.setValue(state.value.filter((k) => !keys.has(k)))
            }
          }}
        >
          <TagListPrimitive
            {...styleProps(combobox.contents)}
            items={selectedItems.filter((item) => item != null)}
            {...props}
          />
        </TagGroupPrimitive>
      )}
    </ComboBoxValuePrimitive>
  )
}

function ComboboxChip({
  sx,
  children,
  showRemove = true,
  ...props
}: WithSx<Omit<TagProps, "children">> & {
  showRemove?: boolean
  children?: React.ReactNode
}) {
  return (
    <TagPrimitive
      data-slot="combobox-chip"
      {...props}
      {...styleProps(combobox.chip, sx)}
    >
      {children}
      {showRemove && (
        <Button
          slot="remove"
          variant="ghost"
          size="icon-xs"
          sx={combobox.chipRemove}
          data-slot="combobox-chip-remove"
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </Button>
      )}
    </TagPrimitive>
  )
}

function ComboboxChipsInput({ sx, ...props }: WithSx<InputProps>) {
  const state = React.useContext(ComboBoxStateContext)
  return (
    <InputPrimitive
      data-slot="combobox-chip-input"
      onKeyDown={(e) => {
        if (
          e.key === "Backspace" &&
          e.currentTarget.value === "" &&
          Array.isArray(state?.value) &&
          state.value.length > 0
        ) {
          e.preventDefault()
          state.setValue(state.value.slice(0, -1))
        }
      }}
      {...props}
      {...styleProps(combobox.chipInput, sx)}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  ComboBoxPrimitive as Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  Collection as ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
