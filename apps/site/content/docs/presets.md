---
title: Preset codes
description: A whole design, every axis, in a short code you can share, paste or give to init.
section: start
order: 5
keywords: [preset, code, design, share, k code, shadcn preset]
---

# Preset codes

A preset code is a whole design in a few characters: the style, the base colour,
the theme, the chart colours, the fonts, the radius, the icon library, the menus,
and the framework and base. Nothing is stored anywhere; the code holds it.

```text
k0          the default: Nova, Neutral, Inter, Lucide, Base UI on React
klmNKQS     Lyra on Stone, the blue theme, square corners
```

kirana/ui writes `k` codes. It also reads shadcn/ui's own `a` and `b` codes, so a
preset made on shadcn/ui's site opens here as it looks there, with React on Base UI
for the framework and base those codes do not hold.

## Where a code comes from

**Customize**, in the header of every page, changes the site's design and shows its code at the
bottom of the sheet. The site keeps your choice for your next visit, and every page, preview and
code panel shows it.

## Where a code goes

- **A new project:** `npx @kirana-style/registry init --template vite-react my-app --preset klmNKQS`.
- **A project you have:** `npx kirana-style ui preset klmNKQS` changes its design and
  places every installed component again.
- **A preview:** any preview page takes `?preset=`, as
  `/preview/react/base/button-demo?preset=klmNKQS`; the axes also go one by one,
  as shadcn/ui's do: `?style=lyra&theme=blue`.

## Codes stay readable

A value is only ever added at the end of its axis's list, each axis's default is
its first value, and a new axis comes after the last. So a code made today means
the same design after any release.
