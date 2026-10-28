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

The design names the family; its files come from Fontsource, one package per
family. Each family is an item of the registry, `font-<name>`, which installs its
package. For Inter, the default:

<!-- ::install exec="kirana-style ui add font-inter" -->

Then import the package once, in your app's entry. `kirana-style ui` installs it
but does not write the import yet:

```ts
// src/main.tsx, or your root layout
import "@fontsource-variable/inter"
```

A heading font of its own is a second item, `font-lora` and the like. Each
family's package is Fontsource's: `@fontsource-variable/<name>` where the family
is variable, `@fontsource/<name>` otherwise (Instrument Serif). The item
`/r/font-<name>.json` names it, with the family's stack as the tokens write it.

## On this site

The customizer offers all 26 families. This site links Inter and Geist from the
start, and loads any other family the moment a design names it, or a picker
points at it, in the page and in every preview.
