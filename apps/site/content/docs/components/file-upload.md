---
title: File Upload
description: Files chosen with a button or dropped on an area, then listed. Built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [file upload, upload, dropzone, drag and drop, files, form, component, kirana]
---

# File Upload

<!-- ::preview item="file-upload-demo" height="420" combinations="react/kirana" -->

File Upload is the registry's own component, built on the [File Upload](/docs/primitives/components/file-upload) of Kirana UI Primitives. Its dropzone is drawn as an [Empty](/docs/components/empty) area with a dashed border, its trigger is an outline [Button](/docs/components/button), and each file is a row in the outline [Item](/docs/components/item)'s look, with its name, its size and a button that removes it.

## Installation

<!-- ::installation name="file-upload" combinations="react/kirana" -->

## Usage

```tsx
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
```

```tsx
<FileUpload multiple>
  <FileUploadDropzone aria-label="Upload files">
    <FileUploadTrigger>Browse files</FileUploadTrigger>
  </FileUploadDropzone>
  <FileUploadList />
</FileUpload>
```

`FileUploadList` draws a row for each file when it is given no children, and each row draws its icon, name, size and remove button when it is given none. Write the parts yourself to change what a row shows:

```tsx
<FileUploadList>
  <FileUploadItems>
    {(entry) => (
      <FileUploadItem entry={entry}>
        <FileUploadItemName />
        <FileUploadItemSize />
        <FileUploadItemRemove />
      </FileUploadItem>
    )}
  </FileUploadItems>
</FileUploadList>
```

## Examples

### Button

A trigger and a list, with no area to drop on. The dropzone holds the hidden file input, so the example keeps one in the page with `hidden`.

<!-- ::preview item="file-upload-button" height="300" combinations="react/kirana" -->

### Multiple

`multiple` holds several files and `maxFiles` caps them. `onFilesReject` tells the page which files were left out and why, and `FileUploadClear` removes every file.

<!-- ::preview item="file-upload-multiple" height="520" combinations="react/kirana" -->

### Accept

`accept` takes what a file input's `accept` takes. A file of another type, or one larger than `maxSize`, reaches `onFilesReject` with its reasons, which the example shows in a [Field](/docs/components/field)'s error.

<!-- ::preview item="file-upload-accept" height="420" combinations="react/kirana" -->

### Disabled

`disabled` on the root: no file can be added or removed.

<!-- ::preview item="file-upload-disabled" height="420" combinations="react/kirana" -->

## API Reference

Every part takes the props of its primitive's part, listed on the [File Upload primitive](/docs/primitives/components/file-upload)'s page, and Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

### FileUpload

The root: its parts in a column.

| Prop            | Type                                              | Default | Description                                                     |
| --------------- | ------------------------------------------------- | ------- | --------------------------------------------------------------- |
| `files`         | `readonly File[]`                                 | -       | The files it holds, when the caller holds them.                 |
| `defaultFiles`  | `readonly File[]`                                 | -       | The files it starts with. Read once.                            |
| `onFilesChange` | `(files: File[], details: ChangeDetails) => void` | -       | Heard as the files are about to change.                         |
| `onFilesReject` | `(rejections: FileRejection[]) => void`           | -       | Told the files that were not taken, each with its reasons.      |
| `accept`        | `string \| readonly string[]`                     | -       | What may be taken: extensions, types and kinds (`"image/*"`).   |
| `multiple`      | `boolean`                                         | `false` | Whether several files are held.                                 |
| `maxFiles`      | `number`                                          | -       | With `multiple`, how many files it holds at most.               |
| `maxSize`       | `number`                                          | -       | The largest a file may be, in bytes.                            |
| `minSize`       | `number`                                          | -       | The smallest a file may be, in bytes.                           |
| `validate`      | `(file: File) => boolean`                         | -       | Whether a file may be taken, asked after the checks above.      |
| `disabled`      | `boolean`                                         | `false` | No file can be taken or removed.                                |
| `required`      | `boolean`                                         | `false` | In a `Field`, holding none is invalid.                          |
| `name`          | `string`                                          | -       | With a name, the files are submitted with the form around them. |
| `sx`            | `Sx`                                              | -       | Styles merged with the root's own.                              |

### FileUploadDropzone

The dashed area files are dropped on. Pressed, it opens the file picker; its border and surface change while files are dragged over it. It holds the hidden file input.

| Prop | Type | Default | Description                            |
| ---- | ---- | ------- | -------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the dropzone's own. |

### FileUploadTrigger

A [Button](/docs/components/button) that opens the file picker.

| Prop      | Type                   | Default     | Description                    |
| --------- | ---------------------- | ----------- | ------------------------------ |
| `variant` | The Button's `variant` | `"outline"` | The Button's look.             |
| `size`    | The Button's `size`    | `"default"` | The Button's size.             |
| `sx`      | `Sx`                   | -           | Styles merged with the Button. |

### FileUploadList

The list of files, hidden while it holds none. Without children it draws a `FileUploadItem` for each file.

| Prop       | Type        | Default | Description                        |
| ---------- | ----------- | ------- | ---------------------------------- |
| `children` | `ReactNode` | -       | The list's own `FileUploadItems`.  |
| `sx`       | `Sx`        | -       | Styles merged with the list's own. |

### FileUploadItems

Draws its child once for each file. It draws no element.

| Prop       | Type                                    | Default | Description               |
| ---------- | --------------------------------------- | ------- | ------------------------- |
| `children` | `(entry: FileUploadEntry) => ReactNode` | -       | Required. Draws one file. |

### FileUploadItem

One file. Without children it draws a file icon, `FileUploadItemName`, `FileUploadItemSize` and `FileUploadItemRemove`.

| Prop    | Type              | Default | Description                                       |
| ------- | ----------------- | ------- | ------------------------------------------------- |
| `entry` | `FileUploadEntry` | -       | Required. The file, as `FileUploadItems` gave it. |
| `sx`    | `Sx`              | -       | Styles merged with the row's own.                 |

### FileUploadItemName

The file's name, cut short with an ellipsis, unless it is given children.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the name's own. |

### FileUploadItemSize

The file's size as people read one, in muted text, unless it is given children.

| Prop     | Type     | Default      | Description                            |
| -------- | -------- | ------------ | -------------------------------------- |
| `locale` | `string` | The reader's | The language the number is written in. |
| `sx`     | `Sx`     | -            | Styles merged with the size's own.     |

### FileUploadItemRemove

A ghost icon [Button](/docs/components/button) that removes its file. Without children it draws a cross named "Remove" and the file's name.

| Prop      | Type                   | Default     | Description                    |
| --------- | ---------------------- | ----------- | ------------------------------ |
| `variant` | The Button's `variant` | `"ghost"`   | The Button's look.             |
| `size`    | The Button's `size`    | `"icon-xs"` | The Button's size.             |
| `sx`      | `Sx`                   | -           | Styles merged with the Button. |

### FileUploadClear

A [Button](/docs/components/button) that removes every file, hidden while there is none.

| Prop      | Type                   | Default   | Description                    |
| --------- | ---------------------- | --------- | ------------------------------ |
| `variant` | The Button's `variant` | `"ghost"` | The Button's look.             |
| `size`    | The Button's `size`    | `"sm"`    | The Button's size.             |
| `sx`      | `Sx`                   | -         | Styles merged with the Button. |
