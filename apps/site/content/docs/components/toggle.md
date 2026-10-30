---
title: Toggle
description: A two-state button that can be either on or off.
section: components
variants: [react/base, react/aria]
keywords: [toggle, button, pressed, component, base, aria]
---

# Toggle

<!-- ::preview item="toggle-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="toggle" combinations="react/base,react/aria" -->

## Usage

```tsx
import { Toggle } from "@/components/ui/toggle"
```

```tsx
<Toggle>Toggle</Toggle>
```

## Outline

Use `variant="outline"` for an outline style.

<!-- ::preview item="toggle-outline" height="360" combinations="react/base,react/aria" -->

## With Text

<!-- ::preview item="toggle-text" height="360" combinations="react/base,react/aria" -->

## Size

Use the `size` prop to change the size of the toggle.

<!-- ::preview item="toggle-sizes" height="360" combinations="react/base,react/aria" -->

## Disabled

<!-- ::preview item="toggle-disabled" height="360" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="toggle-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Toggle](https://base-ui.com/react/components/toggle#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria ToggleButton](https://react-aria.adobe.com/ToggleButton#api) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
