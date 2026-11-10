---
title: Alert
description: Displays a callout for user attention.
section: components
variants:
  [react/base, react/aria, vue/ark, vue/reka, svelte/ark, solid/ark, angular/ng]
keywords:
  [alert, callout, notice, banner, component, base, aria, ark, vue, svelte]
---

# Alert

<!-- ::preview item="alert-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="alert" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
```

<!-- ::start:only react/base,react/aria -->

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

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
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
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
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

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

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

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

@Component({
  selector: "app-example",
  imports: [
    IconPlaceholder,
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
    Button,
  ],
  template: `
    <div kuiAlert>
      <svg
        iconPlaceholder
        lucide="InfoIcon"
        tabler="IconInfoCircle"
        hugeicons="AlertCircleIcon"
        phosphor="InfoIcon"
        remixicon="RiInformationLine"
      ></svg>
      <div kuiAlertTitle>Heads up!</div>
      <div kuiAlertDescription>
        You can add components and dependencies to your app using the cli.
      </div>
      <div kuiAlertAction>
        <button kuiButton variant="outline">Enable</button>
      </div>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

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

<!-- ::preview item="alert-basic" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Destructive

Use `variant="destructive"` to create a destructive alert.

<!-- ::preview item="alert-destructive" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Action

Use `AlertAction` to add a button or other action element to the alert.

<!-- ::preview item="alert-action" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## Custom Colors

You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `Alert` component.

<!-- ::preview item="alert-colors" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="alert-rtl" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

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
