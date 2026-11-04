---
title: Tabs
description: A set of layered sections of content, displayed one at a time.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark]
keywords: [tabs, component, base, aria, ark, ark, vue, svelte, solid]
---

# Tabs

<!-- ::preview item="tabs-demo" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

`TabsList` takes `variant="line"` for an underlined list, and `Tabs` an `orientation`.

## Installation

<!-- ::installation name="tabs" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
```

### React Aria

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Example() {
  return (
    <Tabs defaultSelectedKey="account">
      <TabsList>
        <TabsTrigger id="account">Account</TabsTrigger>
        <TabsTrigger id="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent id="account">Make changes to your account here.</TabsContent>
      <TabsContent id="password">Change your password here.</TabsContent>
    </Tabs>
  )
}
```

### Vue

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account"
      >Make changes to your account here.</TabsContent
    >
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
</template>
```

### Svelte

```svelte
<script lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
</script>

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

### Solid

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

;<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

<!-- ::end:tabs -->

## Composition

Use the following composition to build `Tabs`:

```text
Tabs
├── TabsList
│   ├── TabsTrigger
│   └── TabsTrigger
├── TabsContent
└── TabsContent
```

## Line

Use the `variant="line"` prop on `TabsList` for a line style.

<!-- ::preview item="tabs-line" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Vertical

Use `orientation="vertical"` for vertical tabs.

<!-- ::preview item="tabs-vertical" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Disabled

<!-- ::preview item="tabs-disabled" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Icons

<!-- ::preview item="tabs-icons" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

<!-- ::start:only react/base,react/aria,vue/ark,svelte/ark,solid/ark -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="tabs-rtl" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" direction="rtl" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Tabs](https://base-ui.com/react/components/tabs#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Tabs](https://react-aria.adobe.com/Tabs#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Tabs](https://ark-ui.com/vue/docs/components/tabs#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Tabs](https://ark-ui.com/svelte/docs/components/tabs#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Tabs](https://ark-ui.com/solid/docs/components/tabs#api-reference) documentation.

<!-- ::end:only -->
