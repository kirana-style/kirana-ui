---
title: Animation
description: An entrance starts from data-starting-style and an exit ends at data-ending-style; a part leaves the page when its own motion has ended.
section: primitives
order: 5
keywords:
  [animation, transition, enter, exit, starting style, ending style, presence]
---

# Animation

A part that comes and goes (a popup, a panel, a backdrop, a toast) is in the page only while it
is open, and it waits for its own motion before it leaves. You write the motion in CSS; there is
no animation prop.

- For the first style of its entrance the part has `[data-starting-style]`: what it animates in
  from.
- Through its exit it has `[data-ending-style]`: what it animates out to. It is removed when the
  element's own transitions and animations have ended.

Write the hidden style under both, and transition between:

```css
.popup {
  opacity: 1;
  transform: scale(1);
  transform-origin: var(--transform-origin);
  transition:
    opacity 150ms,
    transform 150ms;
}

.popup[data-starting-style],
.popup[data-ending-style] {
  opacity: 0;
  transform: scale(0.95);
}
```

CSS animations work the same way: key them on `[data-open]` and `[data-closed]`, and the part
stays until the closing animation ends.

A part with no motion leaves at once.

## Keeping a closed part in the page

`keepMounted` keeps a part in the page, hidden, while it is closed. Only these parts take it:

| Kind       | Parts                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| Panels     | `Accordion.Panel`, `Collapsible.Panel`, `Tabs.Panel`                                                                     |
| Indicators | `Checkbox.Indicator`, `RadioGroup.Indicator`, and the item indicators of Select, Combobox, Listbox, Menu and ContextMenu |
| Others     | `ScrollArea.Scrollbar`, `Combobox.Clear`, `Autocomplete.Clear`                                                           |

A popup, a backdrop and a toast do not take it: they are in the page only while they are open. On
a custom element's part it is `kui-keep-mounted`.
