---
title: Dark mode
description: Every colour is a light-dark() pair, so dark mode is the colour scheme, set on html.
section: design
order: 7
keywords: [dark mode, light mode, color-scheme, light-dark, theme toggle]
---

# Dark mode

Every colour token is a `light-dark()` pair: the light value and the dark one in a
single declaration. There is no `dark:` variant and no second set of variables.
What chooses between them is the colour scheme.

The design system sets `color-scheme` on `<html>`: the system's (`light dark`)
unless the page names one with `data-mode`.

```html
<html data-mode="dark"></html>
```

| `data-mode` | Scheme       |
| ----------- | ------------ |
| absent      | the system's |
| `light`     | light        |
| `dark`      | dark         |

A theme switch writes the attribute and keeps the reader's choice, in a cookie or
in storage. To paint the right mode on a server-rendered or static page from the
first frame, write the attribute before the page paints: in the server's render,
or from a small inline script in `<head>`, as this site does.
