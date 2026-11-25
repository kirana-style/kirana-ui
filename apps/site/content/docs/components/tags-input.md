---
title: Tags Input
description: A field that holds short texts as tags, typed one after another. Built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords: [tags, tags input, chips, tokens, multiple, form, component, kirana]
---

# Tags Input

<!-- ::preview item="tags-input-demo" height="360" combinations="react/kirana" -->

Tags Input is built on the [Tags Input primitive](/docs/primitives/components/tags-input) of Kirana UI Primitives: Enter or a comma makes what is typed a tag, a pasted list is cut into tags, the arrow keys move between the tags, Backspace or Delete takes one away, and pressing a tag twice edits it in place. Its tags look like the Combobox's chips.

## Installation

<!-- ::installation name="tags-input" combinations="react/kirana" -->

## Usage

```tsx
import { TagsInput, TagsInputInput } from "@/components/ui/tags-input"
```

```tsx
<TagsInput defaultValue={["React", "TypeScript"]}>
  <TagsInputInput aria-label="Skills" placeholder="Add a skill" />
</TagsInput>
```

`TagsInput` draws its tags itself, one `TagsInputItem` for each, then its children.

## Examples

### Max

Use `max` to limit how many tags it holds.

<!-- ::preview item="tags-input-max" height="360" combinations="react/kirana" -->

### Disabled

Use `disabled` so that nothing can be added or taken away.

<!-- ::preview item="tags-input-disabled" height="360" combinations="react/kirana" -->

### Form

With a `name`, each tag is submitted under it with the form around them. `validate` decides whether a text may be a tag, and `required` makes holding none invalid.

<!-- ::preview item="tags-input-form" height="360" combinations="react/kirana" -->

### Clear

Add `TagsInputClear` after the input for a button that takes every tag away. It is hidden while there is none.

<!-- ::preview item="tags-input-clear" height="360" combinations="react/kirana" -->

## API Reference

Every part takes the props of the primitive's part it wraps (listed on the [Tags Input primitive](/docs/primitives/components/tags-input) page) and Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

### TagsInput

The field: its tags, then its children. It draws a `div`, with the tags in a list inside it. With no children, it draws a `TagsInputInput`.

| Prop              | Type                                                                | Default |
| ----------------- | ------------------------------------------------------------------- | ------- |
| `value`           | `readonly string[]`                                                 |         |
| `defaultValue`    | `readonly string[]`                                                 |         |
| `onValueChange`   | `(value: string[], details: ChangeDetails) => void`                 |         |
| `onValueInvalid`  | `(text: string, reason: "duplicate" \| "max" \| "invalid") => void` |         |
| `validate`        | `(text: string, value: readonly string[]) => boolean`               |         |
| `max`             | `number`                                                            |         |
| `allowDuplicates` | `boolean`                                                           | `false` |
| `delimiter`       | `string \| RegExp \| null`                                          | `","`   |
| `addOnBlur`       | `boolean`                                                           | `false` |
| `addOnPaste`      | `boolean`                                                           | `true`  |
| `editable`        | `boolean`                                                           | `true`  |
| `disabled`        | `boolean`                                                           | `false` |
| `readOnly`        | `boolean`                                                           | `false` |
| `required`        | `boolean`                                                           | `false` |
| `name`            | `string`                                                            |         |
| `form`            | `string`                                                            |         |

A read-only field shows its tags without their remove buttons.

### TagsInputItem

One tag: its text, the input it is edited in, and its remove button. It draws a `span`. `TagsInput` draws one for each tag; it is exported for whoever composes the primitive's list themselves.

| Prop         | Type             | Default |
| ------------ | ---------------- | ------- |
| `entry`      | `TagsInputEntry` |         |
| `showRemove` | `boolean`        | `true`  |
| `children`   | `ReactNode`      |         |

`entry` is the tag as the primitive's `Items` gives it (`key`, `value`, `index`). Children replace the tag's text.

### TagsInputInput

Where a new tag is typed. It draws an `input`; give it an `aria-label`, or an `id` that a `FieldLabel` names.

### TagsInputClear

Takes every tag away. It draws a ghost `Button` with a cross, hidden while there is no tag; its children replace the cross.
