---
title: Alert
description: Displays a callout for user attention.
section: components
variants: [react/base, react/aria]
keywords: [alert, callout, notice, banner, component, base, aria]
---

# Alert

<!-- ::preview item="alert-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="alert" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
```

```tsx
<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

## Composition

Use the following composition to build an `Alert`:

```text
Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction
```

## Basic

A basic alert with an icon, title and description.

<!-- ::preview item="alert-basic" height="360" combinations="react/base,react/aria" -->

## Destructive

Use `variant="destructive"` to create a destructive alert.

<!-- ::preview item="alert-destructive" height="360" combinations="react/base,react/aria" -->

## Action

Use `AlertAction` to add a button or other action element to the alert.

<!-- ::preview item="alert-action" height="360" combinations="react/base,react/aria" -->

## Custom Colors

You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `Alert` component.

<!-- ::preview item="alert-colors" height="360" combinations="react/base,react/aria" -->

## API Reference

### Alert

The `Alert` component displays a callout for user attention.

| Prop      | Type                         | Default     |
| --------- | ---------------------------- | ----------- |
| `variant` | `"default" \| "destructive"` | `"default"` |

### AlertTitle

The `AlertTitle` component displays the title of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AlertDescription

The `AlertDescription` component displays the description or content of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AlertAction

The `AlertAction` component displays an action element (like a button) positioned absolutely in the top-right corner of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
