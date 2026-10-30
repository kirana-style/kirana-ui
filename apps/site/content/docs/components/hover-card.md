---
title: Hover Card
description: For sighted users to preview content available behind a link.
section: components
variants: [react/base, react/aria]
keywords: [hover card, preview, tooltip, link, component, base, aria]
---

# Hover Card

<!-- ::preview item="hover-card-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="hover-card" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
```

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
```

```tsx
<HoverCardTrigger>
  <Button variant="link">Hover</Button>
  <HoverCard>
    The React Framework – created and maintained by @vercel.
  </HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `HoverCard`:

<!-- ::start:only react/base -->

```text
HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
HoverCardTrigger
├── Button
└── HoverCard
```

<!-- ::end:only -->

## Trigger Delays

<!-- ::start:only react/base -->

Use `delay` and `closeDelay` on the trigger to control when the card opens and
closes.

```tsx
<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `delay` and `closeDelay` on the `HoverCardTrigger` to control when the card
opens and closes.

```tsx
<HoverCardTrigger delay={100} closeDelay={200}>
  <Button variant="link">Hover</Button>
  <HoverCard>Content</HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## Positioning

<!-- ::start:only react/base -->

Use the `side` and `align` props on `HoverCardContent` to control placement.

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use the `placement` prop on `HoverCard` to control placement.

```tsx
<HoverCardTrigger>
  <Button variant="link">Hover</Button>
  <HoverCard placement="top">Content</HoverCard>
</HoverCardTrigger>
```

<!-- ::end:only -->

## Basic

<!-- ::preview item="hover-card-demo" height="360" combinations="react/base,react/aria" -->

## Sides

<!-- ::preview item="hover-card-sides" height="352" combinations="react/base,react/aria" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="hover-card-rtl" height="320" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/hover-card#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/PreviewTrigger#api) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
