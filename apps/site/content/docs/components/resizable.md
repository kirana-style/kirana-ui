---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
section: components
variants: [react/base, react/aria]
keywords: [resizable, panels, split, layout, component, base, aria]
---

# Resizable

<!-- ::preview item="resizable-demo" height="320" combinations="react/base,react/aria" -->

## About

The `Resizable` component is built on top of
[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) by
[bvaughn](https://github.com/bvaughn).

## Installation

<!-- ::installation name="resizable" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
```

```tsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

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

<!-- ::preview item="resizable-vertical" height="320" combinations="react/base,react/aria" -->

## Handle

Use the `withHandle` prop on `ResizableHandle` to show a visible handle.

<!-- ::preview item="resizable-handle" height="320" combinations="react/base,react/aria" -->

## API Reference

See the [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels) documentation.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
