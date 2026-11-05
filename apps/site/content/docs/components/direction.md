---
title: Direction
description: A provider component that sets the text direction for your application.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [
    direction,
    rtl,
    ltr,
    provider,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    angular,
  ]
---

# Direction

The `DirectionProvider` component is used to set the text direction (`ltr` or `rtl`) for your
application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and
Persian.

Here's a preview of the component in RTL mode. Use the language selector to switch the language. To
see more examples, look for the RTL section on components pages.

<!-- ::preview item="card-rtl" height="480" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## Installation

<!-- ::installation name="direction" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Usage

```tsx
import { DirectionProvider } from "@/components/ui/direction"
```

<!-- ::start:only react/base,react/aria -->

```tsx
<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<!-- Ark UI reads the direction from the locale. -->
<template>
  <DirectionProvider locale="ar">
    <!-- Your app content -->
  </DirectionProvider>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<!-- Ark UI reads the direction from the locale. -->
<DirectionProvider locale="ar">
  <!-- Your app content -->
</DirectionProvider>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
{
  /* Ark UI reads the direction from the locale. */
}
;<DirectionProvider locale="ar">{/* Your app content */}</DirectionProvider>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { DirectionProvider } from "@/components/ui/direction"

@Component({
  selector: "app-example",
  imports: [DirectionProvider],
  template: `
    <div dir="rtl">
      <ng-container kuiDirectionProvider direction="rtl">
        <!-- Your app content -->
      </ng-container>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

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

<!-- ::start:only vue/ark -->

See the [Ark UI Locale](https://ark-ui.com/vue/docs/utilities/locale#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Locale](https://ark-ui.com/svelte/docs/utilities/locale#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Locale](https://ark-ui.com/solid/docs/utilities/locale#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's provides the Angular CDK's [`Directionality`](https://material.angular.dev/cdk/bidi/overview), which a part reads with `inject(Directionality)`; the registry's own parts read the page's direction where they place things, as Base UI's do.

<!-- ::end:only -->
