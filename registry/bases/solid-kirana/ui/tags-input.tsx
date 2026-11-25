import { omit, Show } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { TagsInput as TagsInputPrimitive } from "@kirana-ui/solid/tags-input"
import type { RootProps } from "@kirana-ui/solid/tags-input"
import type { TagsInputEntry } from "@kirana-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { combobox } from "../../../styles/combobox.styles"
import { tagsInput } from "../../../styles/tags-input.styles"
import { Button } from "./button"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

/**
 * The field: its tags, one `TagsInputItem` for each, then its children (the input, and a clear
 * button where there is one). With no children, a bare input. It takes Kirana UI's props as they
 * are: `value`, `defaultValue` and `onValueChange(value, details)`.
 */
function TagsInput(
  props: Omit<RootProps, "class" | "render"> & { class?: string; sx?: Sx }
) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <TagsInputPrimitive.Root
      data-slot="tags-input"
      {...rest}
      {...styleProps(props.class, combobox.chips, tagsInput.root, props.sx)}
    >
      <TagsInputPrimitive.List
        data-slot="tags-input-list"
        {...styleProps(combobox.contents)}
      >
        <TagsInputPrimitive.Items>
          {(entry) => <TagsInputItem entry={entry} />}
        </TagsInputPrimitive.Items>
      </TagsInputPrimitive.List>
      {props.children ?? <TagsInputInput />}
    </TagsInputPrimitive.Root>
  )
}

/**
 * A tag: its text (its children, given any), the input it is edited in, and its remove button.
 */
function TagsInputItem(props: {
  entry: TagsInputEntry
  showRemove?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "showRemove", "class", "sx", "children")
  return (
    <TagsInputPrimitive.Item
      data-slot="tags-input-item"
      {...rest}
      {...styleProps(props.class, combobox.chip, tagsInput.item, props.sx)}
    >
      <TagsInputPrimitive.ItemText data-slot="tags-input-item-text">
        {props.children}
      </TagsInputPrimitive.ItemText>
      <TagsInputPrimitive.ItemInput
        data-slot="tags-input-item-input"
        {...styleProps(tagsInput.itemInput)}
      />
      <Show when={props.showRemove ?? true}>
        <TagsInputPrimitive.ItemRemove
          data-slot="tags-input-item-remove"
          render={(removeProps) => (
            <Button
              {...removeProps()}
              variant="ghost"
              size="icon-xs"
              sx={[combobox.chipRemove, tagsInput.itemRemove]}
            />
          )}
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </TagsInputPrimitive.ItemRemove>
      </Show>
    </TagsInputPrimitive.Item>
  )
}

function TagsInputInput(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <TagsInputPrimitive.Input
      data-slot="tags-input-input"
      {...rest}
      {...styleProps(
        props.class,
        combobox.chipInput,
        tagsInput.input,
        props.sx
      )}
    />
  )
}

/** Takes every tag away: a ghost `icon-xs` Button, hidden by the primitive while there is none. */
function TagsInputClear(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "sx", "children")
  return (
    <TagsInputPrimitive.Clear
      data-slot="tags-input-clear"
      {...rest}
      render={(clearProps) => (
        <Button
          {...clearProps()}
          variant="ghost"
          size="icon-xs"
          sx={[tagsInput.clear, props.sx]}
        />
      )}
    >
      {props.children ?? (
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
