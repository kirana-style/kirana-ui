---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
section: components
variants: [react/base, react/aria]
keywords: [alert dialog, confirm, modal, dialog, component, base, aria]
---

# Alert Dialog

<!-- ::preview item="alert-dialog-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="alert-dialog" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

```tsx
<AlertDialogTrigger>
  <Button variant="outline">Show Dialog</Button>
  <AlertDialog>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialog>
</AlertDialogTrigger>
```

<!-- ::end:only -->

## Composition

Use the following composition to build an `AlertDialog`:

<!-- ::start:only react/base -->

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
AlertDialogTrigger
├── Button
└── AlertDialog
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

<!-- ::end:only -->

## Basic

A basic alert dialog with a title, description, and cancel and continue buttons.

<!-- ::preview item="alert-dialog-basic" height="360" combinations="react/base,react/aria" -->

## Small

Use the `size="sm"` prop to make the alert dialog smaller.

<!-- ::preview item="alert-dialog-small" height="360" combinations="react/base,react/aria" -->

## Media

Use the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.

<!-- ::preview item="alert-dialog-media" height="360" combinations="react/base,react/aria" -->

## Small with Media

Use the `size="sm"` prop to make the alert dialog smaller and the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.

<!-- ::preview item="alert-dialog-small-media" height="360" combinations="react/base,react/aria" -->

## Destructive

Use the `AlertDialogAction` component to add a destructive action button to the alert dialog.

<!-- ::preview item="alert-dialog-destructive" height="360" combinations="react/base,react/aria" -->

## API Reference

### size

<!-- ::start:only react/base -->

Use the `size` prop on the `AlertDialogContent` component to control the size of the alert dialog. It accepts the following values:

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `size` props on the `AlertDialogContent` component to control the size of the alert dialog. It accepts the following values:

<!-- ::end:only -->

| Prop   | Type                | Default     |
| ------ | ------------------- | ----------- |
| `size` | `"default" \| "sm"` | `"default"` |

<!-- ::start:only react/base -->

For more information about the other components and their props, see the [Base UI documentation](https://base-ui.com/react/components/alert-dialog#api-reference).

<!-- ::end:only -->

<!-- ::start:only react/aria -->

For more information about the other components and their props, see the [React Aria documentation](https://react-aria.adobe.com/Modal#api).

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
