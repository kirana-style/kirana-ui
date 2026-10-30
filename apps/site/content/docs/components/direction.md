---
title: Direction
description: A provider component that sets the text direction for your application.
section: components
variants: [react/base, react/aria]
keywords: [direction, rtl, ltr, provider, component, base, aria]
---

# Direction

The `DirectionProvider` component is used to set the text direction (`ltr` or `rtl`) for your
application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and
Persian.

Here's a preview of the component in RTL mode. Use the language selector to switch the language. To
see more examples, look for the RTL section on components pages.

<!-- ::preview item="card-rtl" height="480" combinations="react/base,react/aria" direction="rtl" -->

## Installation

<!-- ::installation name="direction" combinations="react/base,react/aria" -->

## Usage

```tsx
import { DirectionProvider } from "@/components/ui/direction"
```

```tsx
<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

<!-- ::start:only react/aria -->

React Aria reads the direction from the locale: given only a `direction`, the provider keeps the
current locale and sets its script to Arabic or Latin, which forces that direction. Pass a
`locale` to choose it yourself.

<!-- ::end:only -->

## useDirection

The `useDirection` hook is used to get the current direction of the application.

```tsx
import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}
```

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Direction Provider](https://base-ui.com/react/utils/direction-provider#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria I18nProvider](https://react-aria.adobe.com/I18nProvider#api) documentation.

<!-- ::end:only -->
