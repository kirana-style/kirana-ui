---
title: Right to left
description: Components written in logical properties, for pages that read right to left.
section: design
order: 8
keywords:
  [rtl, right to left, direction, dir, arabic, hebrew, logical properties]
---

# Right to left

The components are written in logical properties (`paddingInlineStart`,
`insetInlineEnd`), so they follow the page's direction: set `dir="rtl"` on
`<html>`.

The headless libraries need to know too, for keyboard navigation and positioning:

- **Base UI:** wrap your app in `DirectionProvider` from
  `@base-ui/react/direction-provider`, with `direction="rtl"`.
- **React Aria:** wrap it in `I18nProvider` from `react-aria-components` with a
  right-to-left locale, such as `locale="ar"`.

A popup that slides in from a logical side slides from the other way when the text
runs right to left, as shadcn/ui's do. Every preview takes `?rtl=true`, as
`/preview/react/base/select-example?rtl=true`.
