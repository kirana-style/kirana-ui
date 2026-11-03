---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark]
keywords:
  [resizable, panels, split, layout, component, base, aria, ark, vue, svelte]
---

# Resizable

<!-- ::preview item="resizable-demo" height="320" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## About

The `Resizable` component is built on top of
[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) by
[bvaughn](https://github.com/bvaughn).

## Installation

<!-- ::installation name="resizable" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Usage

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<!-- Ark's Splitter names the panels on the group, and each handle the two it sits between. -->
<template>
  <ResizablePanelGroup
    :panels="[{ id: 'one' }, { id: 'two' }]"
    :default-size="[50, 50]"
    orientation="horizontal"
  >
    <ResizablePanel id="one">One</ResizablePanel>
    <ResizableHandle id="one:two" />
    <ResizablePanel id="two">Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<!-- Ark's Splitter names the panels on the group, and each handle the two it sits between. -->
<ResizablePanelGroup panels={[{ id: "one" }, { id: "two" }]} defaultSize={[50, 50]} orientation="horizontal">
  <ResizablePanel id="one">One</ResizablePanel>
  <ResizableHandle id="one:two" />
  <ResizablePanel id="two">Two</ResizablePanel>
</ResizablePanelGroup>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `ResizablePanelGroup`:

```text
ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel
```

## Vertical

Use `orientation="vertical"` for vertical resizing.

<!-- ::preview item="resizable-vertical" height="320" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## Handle

Use the `withHandle` prop on `ResizableHandle` to show a visible handle.

<!-- ::preview item="resizable-handle" height="320" combinations="react/base,react/aria,vue/ark,svelte/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="resizable-rtl" height="320" combinations="react/base,react/aria,vue/ark,svelte/ark" direction="rtl" -->

## API Reference

See the [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels) documentation.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
