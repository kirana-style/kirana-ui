---
title: Tabs
description: A set of layered sections of content, displayed one at a time.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [tabs, component, base, aria, ark]
---

# Tabs

<!-- ::preview item="tabs-demo" height="400" combinations="react/base,react/aria,vue/ark" -->

`TabsList` takes `variant="line"` for an underlined list, and `Tabs` an `orientation`.

## Installation

<!-- ::installation name="tabs" combinations="react/base,react/aria,vue/ark" -->

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

<!-- ::end:tabs -->
