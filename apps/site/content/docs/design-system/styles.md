---
title: Styles
description: shadcn/ui's eight visual styles, each a different set of padding, corners, borders and type over the same components.
section: design
order: 1
keywords: [style, nova, vega, maia, lyra, mira, luma, sera, rhea]
---

# Styles

A style is a component's whole look: its padding, corners, borders, shadows, type
and states. Every component comes in shadcn/ui's eight, and each is the same design
as on shadcn/ui's site, checked against it property by property.

| Style | In shadcn/ui's words            |
| ----- | ------------------------------- |
| Nova  | Reduced padding and margins.    |
| Vega  | Clean, neutral, and familiar.   |
| Maia  | Rounded, with generous spacing. |
| Lyra  | Boxy and sharp. For mono fonts. |
| Mira  | Made for compact interfaces.    |
| Luma  | Fluid, luminous, and soft.      |
| Sera  | Editorial and typographic.      |
| Rhea  | Like Luma but compact.          |

Nova is the default. Lyra and Sera draw square corners whatever the radius, and
Rhea has no large radius.

<!-- ::preview item="button-example" height="640" -->

## In your project

A component's styles are written once for every style, in one style module per
component (`button.styles.ts`): Nova's value for each property, and each other
style's where it differs. When you install, you get the module flattened for your
style: only its values, as plain `css()` you can read and change. Changing the
style later is `npx kirana-style ui preset <code>`, which installs every component
again in the new style.
