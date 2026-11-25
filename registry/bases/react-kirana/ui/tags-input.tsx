"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { TagsInput as TagsInputPrimitive } from "@kirana-ui/react/tags-input"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { combobox } from "../../../styles/combobox.styles"
import { tagsInput } from "../../../styles/tags-input.styles"
import { Button } from "./button"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

/**
 * The field: its tags, one `TagsInputItem` for each, then its children (the input, and a clear
 * button where there is one). With no children, a bare input.
 */
function TagsInput({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof TagsInputPrimitive.Root>>) {
  return (
    <TagsInputPrimitive.Root
      data-slot="tags-input"
      {...props}
      {...styleProps(combobox.chips, tagsInput.root, sx)}
    >
      <TagsInputPrimitive.List
        data-slot="tags-input-list"
        {...styleProps(combobox.contents)}
      >
        <TagsInputPrimitive.Items>
          {(entry) => <TagsInputItem key={entry.key} entry={entry} />}
        </TagsInputPrimitive.Items>
      </TagsInputPrimitive.List>
      {children ?? <TagsInputInput />}
    </TagsInputPrimitive.Root>
  )
}

/**
 * A tag: its text (its children, given any), the input it is edited in, and its remove button.
 */
function TagsInputItem({
  sx,
  children,
  showRemove = true,
  ...props
}: Props<React.ComponentProps<typeof TagsInputPrimitive.Item>> & {
  showRemove?: boolean
}) {
  return (
    <TagsInputPrimitive.Item
      data-slot="tags-input-item"
      {...props}
      {...styleProps(combobox.chip, tagsInput.item, sx)}
    >
      <TagsInputPrimitive.ItemText data-slot="tags-input-item-text">
        {children}
      </TagsInputPrimitive.ItemText>
      <TagsInputPrimitive.ItemInput
        data-slot="tags-input-item-input"
        {...styleProps(tagsInput.itemInput)}
      />
      {showRemove && (
        <TagsInputPrimitive.ItemRemove
          data-slot="tags-input-item-remove"
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              sx={[combobox.chipRemove, tagsInput.itemRemove]}
            />
          }
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </TagsInputPrimitive.ItemRemove>
      )}
    </TagsInputPrimitive.Item>
  )
}

function TagsInputInput({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TagsInputPrimitive.Input>>) {
  return (
    <TagsInputPrimitive.Input
      data-slot="tags-input-input"
      {...props}
      {...styleProps(combobox.chipInput, tagsInput.input, sx)}
    />
  )
}

/** Takes every tag away: a ghost `icon-xs` Button, hidden by the primitive while there is none. */
function TagsInputClear({
  sx,
  children,
  ...props
}: Props<
  Omit<React.ComponentProps<typeof TagsInputPrimitive.Clear>, "render">
>) {
  return (
    <TagsInputPrimitive.Clear
      data-slot="tags-input-clear"
      {...props}
      render={
        <Button variant="ghost" size="icon-xs" sx={[tagsInput.clear, sx]} />
      }
    >
      {children ?? (
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      )}
    </TagsInputPrimitive.Clear>
  )
}

export { TagsInput, TagsInputItem, TagsInputInput, TagsInputClear }
