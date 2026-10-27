---
title: Fonts
description: The body and heading fonts, as tokens every component follows.
section: design
order: 3
keywords: [font, typography, heading font, inter, geist, fontsource]
---

# Fonts

Two axes choose the type: the **font** for everything, and the **heading font**,
which inherits the font unless you choose another. Both take the same 26
families, sans, serif and mono: Inter, Noto Sans, Nunito Sans, Figtree, Roboto,
Raleway, DM Sans, Public Sans, Outfit, JetBrains Mono, Geist, Geist Mono, Lora,
Merriweather, Playfair Display, Noto Serif, Roboto Slab, Oxanium, Manrope, Space
Grotesk, Montserrat, IBM Plex Sans, Source Sans 3, Instrument Sans, EB Garamond
and Instrument Serif.

They are tokens, `font.sans` and `font.heading`, reassigned on `<html>` like the
colours, so a component's type follows the design.

## The font's files

The design names the family; the files are yours to install, from Fontsource. Inter,
the default:

<!-- ::install packages="@fontsource-variable/inter" -->

```ts
// src/main.tsx, or your root layout
import "@fontsource-variable/inter"
```

Each family's package is Fontsource's: `@fontsource-variable/<name>` where the
family is variable, `@fontsource/<name>` otherwise.
