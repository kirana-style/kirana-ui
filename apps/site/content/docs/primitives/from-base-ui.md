---
title: Coming from Base UI
description: What is the same as Base UI, what is named differently, what works another way, and what is not here yet.
section: primitives
order: 10
keywords:
  [base ui, migration, migrate, radix, render, preview card, toast manager, map]
---

# Coming from Base UI

The primitives write the attributes and CSS variables Base UI writes, so a stylesheet written for
Base UI mostly carries over. The parts and props are close and not identical. This page is for
React, where the two meet; it compares with Base UI 1.9.

## What is the same

| What                   | Both                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| An entry per component | `@base-ui/react/dialog` becomes `@kirana-ui/react/dialog`                                                                                                                                  |
| Parts as members       | `Dialog.Root`, `Dialog.Trigger`, `Dialog.Popup`                                                                                                                                            |
| State attributes       | `data-open`, `data-checked`, `data-disabled`, `data-side`, `data-starting-style`, `data-ending-style`                                                                                      |
| Geometry               | `--anchor-width`, `--available-height`, `--transform-origin`, `--collapsible-panel-height`                                                                                                 |
| Composition            | `render` takes an element or a function `(props, state) => …`; the `render` element's own props win over the props given to the part, classes are joined, styles merged, both handlers run |
| Changes                | `(value, details)` with `details.reason`, and `details.cancel()` to refuse                                                                                                                 |
| Popups                 | `Portal`, then `Positioner`, then `Popup`, with `side`, `align`, `sideOffset`, `alignOffset`, `collisionPadding`, `anchor`                                                                 |

## What is named differently

| Base UI                                                            | Here                                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `PreviewCard`                                                      | `HoverCard`                                                                    |
| `Radio.Root` inside `RadioGroup`                                   | `RadioGroup.Item` inside `RadioGroup.Root`; the mark is `RadioGroup.Indicator` |
| `OTPField` (`@base-ui/react/otp-field`)                            | `Otp` (`@kirana-ui/react/otp`)                                                 |
| `DirectionProvider` from `…/direction-provider`                    | `DirectionProvider` from `@kirana-ui/react/direction`                          |
| `useRender` from `…/use-render`, `mergeProps` from `…/merge-props` | Both from `@kirana-ui/react/use-render`                                        |
| `Tabs.Root.Props`, `Tabs.Tab.Props`                                | `RootProps`, `TabProps`: types the component's entry exports                   |
| A select's `multiple`, its list as `value`                         | `multiple`, its list as `values` (`onValuesChange`)                            |

The types are imported from the same entry as the component, or read from it:

```ts
import type { RootProps, TabProps } from "@kirana-ui/react/tabs"

type Same = React.ComponentProps<typeof Tabs.Tab>
```

## What works another way

| Topic              | Base UI                                                                   | Here                                                                                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toasts             | `Toast.Provider`, `Toast.Portal`, `createToastManager`, `useToastManager` | A toaster is made once in a module with `createToaster()`, and given to `Toast.Viewport`. Anything on the page calls `toaster.add({ title })`. `Toast.List` draws each toast with a function child. Nothing is provided                                          |
| A tooltip's delay  | `Tooltip.Provider` shares one delay                                       | No provider: one tooltip is open at a time, and moving to a neighbour skips the wait, by themselves. `delay` and `closeDelay` are props of `Tooltip.Root` and `Tooltip.Trigger`. For one delay across an app, keep a context of your own that your tooltip reads |
| A select's icon    | `Select.Icon`                                                             | A `<span aria-hidden="true">` of your own. The trigger has `data-popup-open` to turn it                                                                                                                                                                          |
| A combobox's items | `items` on the root, and `Combobox.List` draws them with a function child | Each item is written as a `Combobox.Item`, and the root filters them by their label. `items` only names values before the list has opened. `Combobox.List` is the listbox, for a popup that also holds the input                                                 |
| `nativeButton`     | On every part that draws a button                                         | On `Button` only                                                                                                                                                                                                                                                 |
| A drawer           | `Drawer.Viewport`, `Drawer.Content`                                       | `Drawer.Popup` holds the content; no viewport part                                                                                                                                                                                                               |

As on Base UI, a root whose value has a type is generic in it, and a value that may be none is
`Value | null`, so a state setter fits its callback:

```tsx
const [fruit, setFruit] = useState<string | null>("apple")

<Select.Root value={fruit} onValueChange={setFruit}>
```

## Small differences in what is drawn

| Part                 | Base UI                          | Here                                                                           |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `Combobox.Chip`      | A `<div>`                        | A `<span>`; `render={<div />}` where a design wants a `div`                    |
| A `Portal`           | An element that takes your props | Draws one element of its own and takes no attributes: put a class on the popup |
| `Dialog.Backdrop`    | Writes `user-select: none`       | Writes no style: a design that wants it writes it on its backdrop              |
| `Progress.Indicator` | Writes `inset-inline-start: 0`   | Does not; the indicator's box is the same                                      |

## What is not here yet

These Base UI parts and props have no equal in this version. Each is planned, none is promised
for a date.

| Component    | Not here                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Popover      | `Popover.Arrow`, `Popover.Backdrop`, `Popover.Viewport`; `modal` and `openOnHover` on the root  |
| Dialog       | `Dialog.Viewport`                                                                               |
| Combobox     | `Combobox.Value`, `Combobox.Collection`, `Combobox.Status`                                      |
| Number field | `NumberField.ScrubArea`                                                                         |
| Checkbox     | `CheckboxGroup`                                                                                 |
| Positioner   | `sticky`, `collisionBoundary`, `arrowPadding`, `positionMethod`, and `sideOffset` as a function |
| Controls     | `readOnly` on Select, Combobox and Slider                                                       |

## What is here and not in Base UI

Calendar, DateField and DatePicker, Carousel, Command, Listbox, MessageScroller, Pagination,
QrCode, Resizable, Label and Autosize, each on every framework, and
[the agent bridge](/docs/ai/agent-bridge). See [Components](/docs/primitives/components).
