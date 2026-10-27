---
title: Icons
description: Five icon libraries, and how a component draws whichever one your project uses.
section: design
order: 4
keywords: [icons, lucide, hugeicons, tabler, phosphor, remix icon]
---

# Icons

The icon library is an axis like the others: Lucide (the default), Hugeicons,
Tabler, Phosphor or Remix Icon.

A component names each icon once for every library, as shadcn/ui's do (the select's
trigger):

```tsx
<IconPlaceholder
  lucide="ChevronDownIcon"
  tabler="IconSelector"
  hugeicons="UnfoldMoreIcon"
  phosphor="CaretDownIcon"
  remixicon="RiArrowDownSLine"
/>
```

When you install, each placeholder becomes your library's own component, imported
from its package (`lucide-react` for Lucide on React, `@lucide/vue` on Vue), and
the package is installed with it. Your project's library is `ui.iconLibrary` in
`kirana.config.ts`, set from your preset.

An icon's size is the control's: a button, a menu row or an input sizes the icons
inside it, so an icon needs no size of its own.

On this site, the previews draw Lucide and Hugeicons; a design with another library
shows Lucide's icons until the site has that library's.
