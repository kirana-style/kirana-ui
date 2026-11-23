---
title: Coming from Base UI
description: What is the same as Base UI, what is named differently, what works another way, and what is not here.
section: primitives
order: 10
keywords:
  [
    base ui,
    migration,
    migrate,
    radix,
    render,
    preview card,
    toast manager,
    checkbox group,
    read only,
    map,
  ]
---

# Coming from Base UI

The primitives write the attributes and CSS variables Base UI writes, so a stylesheet written for
Base UI mostly carries over. The parts and props are close and not identical. This page is for
React, where the two meet; it compares the two part by part, against Base UI 1.9.

## What is the same

| What                   | Both                                                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An entry per component | `@base-ui/react/dialog` becomes `@kirana-ui/react/dialog`                                                                                                                                     |
| Parts as members       | `Dialog.Root`, `Dialog.Trigger`, `Dialog.Popup`                                                                                                                                               |
| State attributes       | `data-open`, `data-checked`, `data-disabled`, `data-side`, `data-starting-style`, `data-ending-style`                                                                                         |
| Geometry               | `--anchor-width`, `--available-height`, `--transform-origin`, `--collapsible-panel-height`                                                                                                    |
| Composition            | `render` takes an element or a function `(props, state) => …`; the `render` element's own props win over the props given to the part, classes are joined, styles merged, both handlers run    |
| Changes                | `(value, details)` with `details.reason`, and `details.cancel()` to refuse                                                                                                                    |
| Popups                 | `Portal`, then `Positioner`, then `Popup`, with an `Arrow` and a `Backdrop` where Base UI has them on Popover                                                                                 |
| Positioning            | `side`, `align`, `sideOffset` and `alignOffset` (a number or a function), `collisionPadding`, `collisionBoundary`, `collisionAvoidance`, `sticky`, `arrowPadding`, `positionMethod`, `anchor` |
| Popover                | `modal` (`true` or `"trap-focus"`), and `openOnHover` with `delay` and `closeDelay` on the trigger                                                                                            |
| Checkbox group         | `CheckboxGroup` with `value`, `allValues`, and `parent` on a checkbox                                                                                                                         |
| Read only              | `readOnly` on Select and Combobox locks the value, not the list: it still opens and can be gone through                                                                                       |
| Avatar                 | `onLoadingStatusChange` on the image, `delay` on the fallback                                                                                                                                 |
| Number field           | `NumberField.ScrubArea` and `ScrubAreaCursor`                                                                                                                                                 |
| A long dialog          | `Dialog.Viewport`, the box it scrolls in                                                                                                                                                      |

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

| Topic                 | Base UI                                                                   | Here                                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Toasts                | `Toast.Provider`, `Toast.Portal`, `createToastManager`, `useToastManager` | A toaster is made once in a module with `createToaster()`, and given to `Toast.Viewport`. Anything on the page calls `toaster.add({ title })`. `Toast.List` draws each toast with a function child. Nothing is provided                                                  |
| A tooltip's delay     | `Tooltip.Provider` shares one delay                                       | No provider: one tooltip is open at a time, and moving to a neighbour skips the wait, by themselves. `delay` and `closeDelay` are props of `Tooltip.Root` and `Tooltip.Trigger`. A design system passes `delay` on its own root: `<Tooltip.Root delay={0} {...props} />` |
| A combobox's data     | `items` on the root, drawn by a function child of `Combobox.List`         | `items` on the root (flat, or groups `{ value, items }`), drawn by a function child of `Combobox.Collection`; a group's items by `<Combobox.Collection of={group}>`. The child is given an entry (`{ key, value, label, disabled, item }`), not the item as you gave it  |
| A combobox's filter   | `filter(item, query)`, `itemToStringLabel`, `limit`                       | `filter(label, query)`, or `null` for no filtering. An item's label is in the data (`{ value, label }`)                                                                                                                                                                  |
| A select's icon       | `Select.Icon`                                                             | A `<span aria-hidden="true">` of your own. The trigger has `data-popup-open` to turn it                                                                                                                                                                                  |
| A modal popover       | Traps focus only when a `Close` is in the popup                           | `modal` is a dialog's modality whole: the page is inert and does not scroll, and Tab stays inside                                                                                                                                                                        |
| `nativeButton`        | On every part that draws a button                                         | On `Button` only                                                                                                                                                                                                                                                         |
| A drawer              | `Drawer.Viewport`, `Drawer.Content`, `Drawer.SwipeArea`                   | `Drawer.Popup` holds the content and is what is dragged; no viewport part                                                                                                                                                                                                |
| A nested dialog       | `data-nested` on the popup                                                | `data-nested` on `Dialog.Viewport`; the popup has `data-nested-dialog-open`                                                                                                                                                                                              |
| A checkbox group's id | A parent's `aria-controls` names the ids its boxes rendered               | The same, with ids the library makes from the group's `id` and each value's place in `allValues`, so a server writes them too                                                                                                                                            |

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
| `Avatar.Root`        | Writes no attribute              | Writes `data-image-loading-status`, to style the root by its picture's loading |
| A popup's arrow      | Placed for you                   | Placed for you, in a popup your design gives `position: relative`              |

## What is not here

These Base UI parts and props have no equal here. None is promised for a date; the first group
waits for a feature the library does not have, the rest for someone to need them.

| Waits for                              | Not here                                                                                                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One popup opened by several triggers   | `createHandle` and a detached trigger, on Dialog, AlertDialog, Popover, Menu, Tooltip and PreviewCard; with them `Popover.Viewport`, `Tooltip.Viewport` and `PreviewCard.Viewport` |
| A menu that filters                    | `Menu.Input`, `Menu.List`, `Menu.Empty`, `Menu.Clear`, `Menu.Viewport`                                                                                                             |
| A drawer that moves the page behind it | `Drawer.Indent`, `Drawer.IndentBackground`, `Drawer.Provider`, `Drawer.VirtualKeyboardProvider`                                                                                    |

| Component               | Not here                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Combobox, Autocomplete  | `Arrow`, `Backdrop`, `Icon`, `InputGroup`, `Row`, `Combobox.Label`, `Autocomplete.Value`                          |
| Combobox's data         | `itemToStringLabel`, `itemToStringValue`, `limit`, items as plain values, and `virtualized` together with `items` |
| Select                  | `Select.Arrow`, `Select.Backdrop`, `Select.Icon`, `Select.Label`                                                  |
| Menu, ContextMenu       | `Backdrop`                                                                                                        |
| Popover                 | `initialFocus`, `finalFocus`, `onOpenChangeComplete`, `actionsRef`                                                |
| PreviewCard (HoverCard) | `Backdrop`                                                                                                        |
| Checkbox                | `uncheckedValue`, `inputRef`                                                                                      |
| Field, Progress, Slider | `Field.Item`, `Progress.Status`, `Slider.Label`                                                                   |
| Whole components        | `CSPProvider`                                                                                                     |

## What is here and not in Base UI

- **Components:** Calendar, DateField and DatePicker, Carousel, Command, Listbox, MessageScroller,
  Pagination, QrCode, Resizable, Label and Autosize.
- **Every framework:** each of them, and every component above, on Vue, Svelte, Solid, Angular
  and as custom elements, compared with React's DOM state by state. See
  [Frameworks](/docs/primitives/frameworks).
- **`readOnly` on Slider**, which Base UI's slider does not take.
- **A one-time code's cells:** `Otp.Group`, `Otp.Slot`, `Otp.Caret` and `Otp.Separator` over one
  input, with `mode` and `pattern`.
- **[The agent bridge](/docs/ai/agent-bridge)**, and the checks in each package's `testing` entry.

See [Components](/docs/primitives/components) for each one's reference.
