---
title: Porting from Tailwind
description: How a shadcn/ui component's Tailwind classes become a style module, and the four patterns that do not translate one for one.
section: kirana
order: 2
keywords: [tailwind, port, migrate, classes, cn, cva, shadcn]
---

# Porting from Tailwind

Tailwind is a vocabulary of classes resolved by the cascade. Kirana is a compiler
over typed objects: you set a property, and the last style to set that property
under the same conditions owns it. Most of a port is a table lookup; four patterns
need a different shape.

## The vocabulary

| Tailwind                      | A style module                                                      |
| ----------------------------- | ------------------------------------------------------------------- |
| `bg-primary`                  | `backgroundColor: theme.primary`                                    |
| `bg-primary/80`               | `backgroundColor: alpha.primary80`                                  |
| `p-4`, `gap-2`                | `padding: space[4]`, `gap: space[2]`                                |
| `rounded-lg`                  | `borderRadius: radius.lg`                                           |
| `text-sm`                     | `fontSize: fontSize.sm` and `lineHeight: lineHeight.sm`             |
| `p-4 md:p-6`                  | `padding: { base: space[4], [breakpoint.md]: space[6] }`            |
| `hover:bg-muted`              | `backgroundColor: { base: …, ":hover": theme.muted }`               |
| `data-[state=open]:`          | `...when(state, value)`, every library's key for it                 |
| `dark:bg-card`                | nothing: every token is a `light-dark()` pair                       |
| `style-lyra:rounded-none`     | `borderRadius: { base: …, [axes.style.lyra]: "0" }`                 |
| `className={cn(a, b)}`        | `sx={[a, b]}`                                                       |
| `className` on a Base UI part | `{...styleProps(a, sx)}`: an installed component does not read `sx` |
| `cva(…)` variants             | `recipe()`, with `variants` and `defaultVariants`                   |
| `!important`                  | nothing: order the `sx` array, or nest the condition that must win  |

Conditions (pseudo-classes, attributes, breakpoints) nest inside a property's
value; only pseudo-elements are keys of their own.

## The four patterns

1. **Styling a descendant** (`[&_svg]:size-4`): a control sizes the icons inside it,
   and a component hands a value down rather than reaching into markup it does not
   render.
2. **Reading an ancestor or a sibling** (`group-data-[…]`, `peer-*`): a relation.
   The ancestor applies its anchor, and the child reads it,
   `[fieldScope.within('[data-orientation="vertical"]')]`.
3. **Position among siblings** (`:last-child`): headless libraries insert elements
   of their own, so let each child decide from its own position.
4. **Markup no component owns** (a chart library's SVG): a few scoped plain rules.

## Merging is per entry

Tailwind's `cn` drops a conflicting class whole. Kirana replaces only the entry with
the same property and conditions: a later `borderColor: x` replaces the base value,
and the earlier style's `:hover` value survives. To override a component's state,
write the override under the same condition. `null` removes an entry on purpose.

The repository's [full guide](https://github.com/kirana-style/kirana-ui/blob/main/docs/porting-from-tailwind.md)
lists every mapping and pitfall the port met.
