---
title: Editable
description: Text that is pressed to edit in place, then kept or put back, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [editable, inline edit, rename, input, form, component, kirana, primitives]
---

# Editable

<!-- ::preview item="editable-demo" height="360" combinations="react/kirana" -->

Editable is built on the [Editable primitive](/docs/primitives/components/editable) of Kirana UI Primitives. The preview and the input are drawn in the same box, so nothing moves when an edit starts. Enter keeps the edit and Escape puts the text back; by default, focus leaving the input keeps it too.

## Installation

<!-- ::installation name="editable" combinations="react/kirana" -->

## Usage

```tsx
import {
  Editable,
  EditableInput,
  EditablePreview,
} from "@/components/ui/editable"
```

```tsx
<Editable defaultValue="Marketing site" placeholder="Untitled project">
  <EditablePreview />
  <EditableInput aria-label="Project name" />
</Editable>
```

## Examples

### Triggers

`EditableEditTrigger`, `EditableSubmitTrigger` and `EditableCancelTrigger` are ghost icon buttons, with a pencil, a check and a cross unless given children. The edit trigger is hidden while editing, and the other two unless editing.

<!-- ::preview item="editable-triggers" height="360" combinations="react/kirana" -->

### Double-click

Use `activation` to choose what on the preview starts an edit: `"focus"` (the default), `"click"`, `"dblclick"`, or `"none"`, where only the edit trigger does.

<!-- ::preview item="editable-double-click" height="360" combinations="react/kirana" -->

### Disabled

<!-- ::preview item="editable-disabled" height="360" combinations="react/kirana" -->

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Editable primitive](/docs/primitives/components/editable).

### Editable

The root, a row holding the preview, the input and the triggers.

| Prop              | Type                                                 | Default   | Description                                                        |
| ----------------- | ---------------------------------------------------- | --------- | ------------------------------------------------------------------ |
| `value`           | `string`                                             | -         | The text, when the caller holds it.                                |
| `defaultValue`    | `string`                                             | `""`      | The text it starts with, when the caller does not hold `value`.    |
| `onValueChange`   | `(value: string, details: ChangeDetails) => void`    | -         | Called as an edit is about to be kept.                             |
| `editing`         | `boolean`                                            | -         | Whether it is being edited, when the caller holds it.              |
| `defaultEditing`  | `boolean`                                            | `false`   | Whether it starts being edited.                                    |
| `onEditingChange` | `(editing: boolean, details: ChangeDetails) => void` | -         | Called as editing is about to start or end.                        |
| `placeholder`     | `string`                                             | `""`      | What the preview shows while the text is empty.                    |
| `activation`      | `"focus" \| "click" \| "dblclick" \| "none"`         | `"focus"` | What on the preview starts an edit.                                |
| `submitOnBlur`    | `boolean`                                            | `true`    | Whether focus leaving the input keeps the edit.                    |
| `selectOnFocus`   | `boolean`                                            | `true`    | Whether the text is selected as editing starts.                    |
| `disabled`        | `boolean`                                            | `false`   | Whether it cannot be edited.                                       |
| `readOnly`        | `boolean`                                            | `false`   | Whether it is shown as it is, not editable.                        |
| `required`        | `boolean`                                            | `false`   | Whether the text is needed.                                        |
| `name`            | `string`                                             | -         | The name the text is submitted under.                              |
| `form`            | `string`                                             | -         | The id of the form the input belongs to, when it is not inside it. |
| `sx`              | `Sx`                                                 | -         | Styles merged with the root's own.                                 |

### EditablePreview

The text as it reads, or the placeholder while there is none, in the muted text colour. It has the input's box and a surface on hover, and is hidden while editing.

| Prop | Type | Default | Description                           |
| ---- | ---- | ------- | ------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the preview's own. |

### EditableInput

Where the text is typed, drawn as the [Input](/docs/components/input). It is hidden unless editing.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the input's own. |

### EditableEditTrigger, EditableSubmitTrigger, EditableCancelTrigger

Buttons that start an edit, keep it and drop it, drawn as the [Button](/docs/components/button). Without children each draws its icon and is labelled "Edit", "Save" or "Cancel" for a screen reader.

| Prop       | Type               | Default     | Description                          |
| ---------- | ------------------ | ----------- | ------------------------------------ |
| `variant`  | Button's `variant` | `"ghost"`   | The button's variant.                |
| `size`     | Button's `size`    | `"icon-sm"` | The button's size.                   |
| `children` | `ReactNode`        | an icon     | What the button shows.               |
| `sx`       | `Sx`               | -           | Styles merged with the button's own. |
