---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
section: components
variants: [react/base, react/aria]
keywords: [attachment, chat, component, base, aria]
---

# Attachment

<!-- ::preview item="attachment-demo" height="400" combinations="react/base,react/aria" surface="true" -->

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.

## Installation

<!-- ::installation name="attachment" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
```

```tsx
<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>
```

## Composition

Use the following composition to build an attachment:

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Use `AttachmentGroup` to lay out multiple attachments in a scrollable row:

```text
AttachmentGroup
├── Attachment
└── Attachment
```

## Features

- Icon and image media through `AttachmentMedia`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `AttachmentTrigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `AttachmentGroup` with an edge fade
- Customizable styling through the `sx` prop on every part

## Image

Set `variant="image"` on `AttachmentMedia` and render an `<img>` inside it. Use `orientation="vertical"` to stack the media above the content.

<!-- ::preview item="attachment-image" height="400" combinations="react/base,react/aria" surface="true" -->

## States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

<!-- ::preview item="attachment-states" height="400" combinations="react/base,react/aria" surface="true" -->

## Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

<!-- ::preview item="attachment-sizes" height="400" combinations="react/base,react/aria" surface="true" -->

## Group

Wrap attachments in `AttachmentGroup` to lay them out in a horizontally scrollable, snapping row with an edge fade.

<!-- ::preview item="attachment-group" height="400" combinations="react/base,react/aria" surface="true" -->

## Trigger

Add an `AttachmentTrigger` to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable.

<!-- ::preview item="attachment-trigger" height="400" combinations="react/base,react/aria" surface="true" -->

<!-- ::start:only react/base -->

```tsx
<Dialog>
  <Attachment>
    {/* media, content, actions */}
    <DialogTrigger
      render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />}
    />
  </Attachment>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Dialog>
  <Attachment>
    {/* media, content, actions */}
    <DialogTrigger>
      <AttachmentTrigger aria-label="Preview research-summary.pdf" />
    </DialogTrigger>
  </Attachment>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>
```

<!-- ::end:only -->

## Accessibility

`AttachmentAction` renders a `Button`, and `AttachmentTrigger` renders a real `<button>` (or your element via `render`). Follow the guidance below so both are operable and announced.

### Label icon-only actions

`AttachmentAction` is usually icon-only, so give each one an `aria-label` describing the action and its target.

```tsx
<AttachmentAction aria-label="Remove sales-dashboard.pdf">
  <XIcon />
</AttachmentAction>
```

### Label the trigger

`AttachmentTrigger` covers the card with no text of its own, so give it an `aria-label` for what activating it does.

<!-- ::start:only react/base -->

```tsx
<AttachmentTrigger
  render={
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    />
  }
/>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<AttachmentTrigger
  render={(props) => (
    <a
      {...props}
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Open workspace.png"
    />
  )}
/>
```

<!-- ::end:only -->

The trigger sits behind the actions in the stacking order, so an `AttachmentAction` and the `AttachmentTrigger` never trap each other — both remain separately focusable and clickable.

### Keyboard scrolling

An `AttachmentGroup` scrolls horizontally. When its attachments are interactive: a trigger or actions, keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabIndex={0}`, `role="group"`, and an `aria-label`.

### Meaning beyond color

The `error` state uses a destructive color. Keep the failure reason in `AttachmentDescription` so the state is not conveyed by color alone.

## API Reference

### Attachment

The root attachment container.

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |
| `sx`          | `Sx`                                                         | -              | Styles merged with the root element's own.        |

### AttachmentMedia

The media slot for an icon or image preview.

| Prop      | Type                | Default  | Description                                    |
| --------- | ------------------- | -------- | ---------------------------------------------- |
| `variant` | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `sx`      | `Sx`                | -        | Styles merged with the media slot's own.       |

### AttachmentContent

Wraps the title and description.

| Prop | Type | Default | Description                                |
| ---- | ---- | ------- | ------------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the content slot's own. |

### AttachmentTitle

The attachment name. Shimmers while the attachment is `uploading` or `processing`.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the title's own. |

### AttachmentDescription

Secondary metadata such as the file type, size, or upload status.

| Prop | Type | Default | Description                               |
| ---- | ---- | ------- | ----------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the description's own. |

### AttachmentActions

A container for one or more actions, aligned to the end of the attachment.

| Prop | Type | Default | Description                           |
| ---- | ---- | ------- | ------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the actions's own. |

### AttachmentAction

An action button. Renders a [`Button`](/docs/components/button) and accepts all of its props.

| Prop       | Type                                  | Default     | Description                              |
| ---------- | ------------------------------------- | ----------- | ---------------------------------------- |
| `size`     | `Button["size"]`                      | `"icon-xs"` | The button size.                         |
| `...props` | `React.ComponentProps<typeof Button>` | -           | Props spread to the underlying `Button`. |

### AttachmentTrigger

A full-card overlay that activates the attachment. Renders a `<button>` by default.

| Prop       | Type                             | Default | Description                                    |
| ---------- | -------------------------------- | ------- | ---------------------------------------------- |
| `render`   | `ReactElement \| function`       | -       | Render as a different element, such as a link. |
| `...props` | `React.ComponentProps<"button">` | -       | Props spread to the trigger element.           |

### AttachmentGroup

Lays out attachments in a horizontally scrollable, snapping row.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the group's own. |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
