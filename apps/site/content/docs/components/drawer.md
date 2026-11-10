---
title: Drawer
description: A drawer component for React.
section: components
variants:
  [
    react/base,
    react/aria,
    vue/ark,
    vue/reka,
    svelte/ark,
    svelte/bits,
    solid/ark,
    angular/ng,
  ]
keywords:
  [
    drawer,
    bottom sheet,
    panel,
    swipe,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    solid,
  ]
---

# Drawer

<!-- ::preview item="drawer-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="drawer" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

On iOS Safari, the drawer's overlay is absolutely positioned, and covers the viewport after the page
is scrolled only inside a positioned `body`. Add it to your global styles (see the
[Base UI docs](https://base-ui.com/react/overview/quick-start#ios-26-safari)):

```css
body {
  position: relative;
}
```

## Usage

```tsx
import { css } from "@kirana-style/core"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const styles = {
  body: css({ padding: "1rem" }),
}
```

<!-- ::start:only react/base,react/aria -->

```tsx
<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div sx={styles.body}>{/* Content here */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark,vue/reka -->

```vue
<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Open</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <div :sx="styles.body"><!-- Content here --></div>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose as-child>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
<Drawer>
  <DrawerTrigger>
    {#snippet asChild(props)}
      <Button {...props()} variant="outline">Open</Button>
    {/snippet}
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div sx={styles.body}>
      <!-- Content here -->
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        {#snippet asChild(props)}
          <Button {...props()} variant="outline">Cancel</Button>
        {/snippet}
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
<Drawer>
  <DrawerTrigger
    asChild={(props) => (
      <Button {...props()} variant="outline">
        Open
      </Button>
    )}
  />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div sx={styles.body} />
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose
        asChild={(props) => (
          <Button {...props()} variant="outline">
            Cancel
          </Button>
        )}
      />
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

@Component({
  selector: "app-example",
  imports: [
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    SxDirective,
  ],
  template: `
    <ng-container kuiDrawer>
      <button kuiButton kuiDrawerTrigger variant="outline">Open</button>
      <div kuiDrawerContent>
        <div kuiDrawerHeader>
          <h2 kuiDrawerTitle>Are you absolutely sure?</h2>
          <p kuiDrawerDescription>This action cannot be undone.</p>
        </div>
        <div [sx]="styles.body">
          <!-- Content here -->
        </div>
        <div kuiDrawerFooter>
          <button kuiButton>Submit</button>
          <button kuiButton kuiDrawerClose variant="outline">Cancel</button>
        </div>
      </div>
    </ng-container>
  `,
})
// `styles`: the handles declared above.
export class Example {
  protected readonly styles = styles
}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Drawer`:

```text
Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    └── DrawerFooter
```

`DrawerContent` composes the portal, overlay, viewport, and popup from Base UI. For lower-level control, `DrawerPortal`, `DrawerOverlay`, and `DrawerSwipeHandle` are also exported.

## Custom Sizes

A vertical drawer sizes itself to its content and is capped at `calc(100dvh - 6rem)` by default. A side drawer spans `75%` of the viewport width, or `24rem` on larger screens.

To customize the height of a vertical drawer, give `DrawerContent` a `height` or `maxHeight` in its `sx`.

```tsx
const half = css({ height: "50vh" })

;<DrawerContent sx={half}>
```

To customize the width of a side drawer, give it a `width` or `maxWidth`.

```tsx
const narrow = css({ width: "24rem" })

;<DrawerContent sx={narrow}>
```

When the same component renders in multiple directions, scope an override to one axis with its `data-swipe-axis` attribute.

```tsx
const sized = css({
  maxHeight: { '[data-swipe-axis="y"]': "50vh" },
  width: { '[data-swipe-axis="x"]': "24rem" },
})

;<DrawerContent sx={sized}>
```

To make a region of the drawer scrollable, make the scroll container a flex item. Avoid a `height` of `100%`, which does not resolve inside a content-sized drawer.

```tsx
const scrolling = css({ flex: 1, overflowY: "auto", padding: "1rem" })

;<DrawerContent>
  <DrawerHeader>...</DrawerHeader>
  <div sx={scrolling}>{/* Scrollable content */}</div>
  <DrawerFooter>...</DrawerFooter>
</DrawerContent>
```

## Styling

The drawer exposes CSS variables for style-level customization. Set the sizing variables on `DrawerContent` through its `sx`, and the overlay variable on `DrawerOverlay`'s.

| Variable                       | Default            | Description                                                             |
| ------------------------------ | ------------------ | ----------------------------------------------------------------------- |
| `--drawer-inset`               | `0px`              | Floats the drawer from the viewport edges.                              |
| `--drawer-bleed-background`    | the popover colour | Fills the gap behind the drawer on swipe overshoot.                     |
| `--drawer-overlay-min-opacity` | `0`                | Minimum overlay opacity. Defaults to `0.5` when snap points are active. |

The drawer also sets data attributes a style can key on: on `DrawerContent` itself (`'[data-swipe-direction="down"]': …`), or, from a part inside it, through the popup's relation (`[drawerScope.within('[data-swipe-axis="y"]')]: …`, `drawerScope` from the drawer's style module).

| Attribute                 | Values                        | Set when                              |
| ------------------------- | ----------------------------- | ------------------------------------- |
| `data-swipe-direction`    | `up`, `right`, `down`, `left` | Always.                               |
| `data-swipe-axis`         | `x`, `y`                      | Always.                               |
| `data-snap-points`        | Present                       | The drawer has snap points.           |
| `data-expanded`           | Present                       | The drawer is at the full snap point. |
| `data-swiping`            | Present                       | A swipe is in progress.               |
| `data-nested-drawer-open` | Present                       | A nested drawer is open on top.       |

## Position

Use the `swipeDirection` prop to set the side of the drawer.

Available options are `up`, `right`, `down`, and `left`.

<!-- ::start:only vue/ark -->

Vue's `Drawer` takes the same sides and hands Ark UI its own, which are logical (`start` and `end`
for left and right, read with the page's direction), so a right-to-left page keeps a drawer on the
side it names.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

Svelte's `Drawer` takes the same sides and hands Ark UI its own, which are logical (`start` and `end`
for left and right, read with the page's direction), so a right-to-left page keeps a drawer on the
side it names.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

Solid's `Drawer` takes the same sides and hands Ark UI its own, which are logical (`start` and `end`
for left and right, read with the page's direction), so a right-to-left page keeps a drawer on the
side it names.

<!-- ::end:only -->

<!-- ::preview item="drawer-sides" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Swipe Handle

Use `showSwipeHandle` on `Drawer` to render a swipe handle.

<!-- ::preview item="drawer-swipe-handle" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Nested

Open drawers from inside another drawer. Parent drawers stay mounted and stack behind the frontmost drawer.

<!-- ::start:only vue/ark -->

Ark UI places each drawer itself, from its swipe and snap point, so a parent drawer stays full size
behind the frontmost one where Base UI's shrinks into the stack.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

Ark UI places each drawer itself, from its swipe and snap point, so a parent drawer stays full size
behind the frontmost one where Base UI's shrinks into the stack.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

Ark UI places each drawer itself, from its swipe and snap point, so a parent drawer stays full size
behind the frontmost one where Base UI's shrinks into the stack.

<!-- ::end:only -->

<!-- ::preview item="drawer-nested" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Non Modal

Set `modal={false}` to allow interaction with the rest of the page while the drawer is open. Combine with `disablePointerDismissal` to prevent the drawer from closing on outside presses. Use `modal="trap-focus"` to keep focus inside the drawer while leaving scroll and pointer interaction unrestricted.

<!-- ::start:only vue/ark -->

On Vue, `modal` is `true` or `false`: Ark UI's drawer has no focus-only mode.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

On Svelte, `modal` is `true` or `false`: Ark UI's drawer has no focus-only mode.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

On Solid, `modal` is `true` or `false`: Ark UI's drawer has no focus-only mode.

<!-- ::end:only -->

<!-- ::preview item="drawer-non-modal" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Snap Points

Use `snapPoints` to snap a drawer to preset heights. Numbers between `0` and `1` represent fractions of the viewport. Numbers greater than `1` are treated as pixel values. String values support `px` and `rem` units. Snap points apply to vertical drawers.

Track the active snap point with the controlled `snapPoint` and `onSnapPointChange` props. At the full snap point, the drawer gets a `data-expanded` attribute you can style with the `data-expanded:` variant.

<!-- ::preview item="drawer-snap-points" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Responsive

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<!-- ::preview item="drawer-dialog" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,solid/ark,angular/ng" -->

## API Reference

See the [Base UI documentation](https://base-ui.com/react/components/drawer) for the full API reference.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

<!-- ::start:only angular/ng -->

Angular's is the registry's own, on its modal (`lib/angular/modal.ts`), in Base UI's markup: `swipeDirection`, `snapPoints`, `modal`, `showSwipeHandle`, `[(open)]` or `defaultOpen`. A swipe toward its edge moves it and closes it, or moves it between its snap points, through the custom properties Base UI's drawer hands its styles.

<!-- ::end:only -->
