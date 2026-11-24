# Known pitfalls, and what to do

Each is something a project met, with the fix. Read the one that matches before working around it.

## A popup loses a section's theme, `dir` or colour scheme

Popups (a select's list, a menu, a dialog, a tooltip) are drawn at the end of `<body>`: they read
what `<html>` has, which `kirana-style ui init` sets. A theme, `dir` or `color-scheme` on one
section does not reach the popups its components open.

- Set them on `<html>` when you can.
- On the Kirana UI base, wrap the section in `PortalProvider` (`container` = the section's
  element), from `@kirana-ui/<framework>` (Angular: `<ng-container kpPortalProvider [container]="el">`).
- On the other bases, the popups follow `<html>`.

## A menu or select label throws when it opens (Base UI)

`DropdownMenuLabel`, `ContextMenuLabel`, `MenubarLabel`, `SelectLabel`, `ComboboxLabel` must sit
inside their `*Group` (or `*RadioGroup`): Base UI throws "MenuGroupContext is missing" otherwise.
Type checks do not catch it. shadcn/ui's own examples sometimes have a lone label: wrap it.

## A select's list stays put while the page scrolls

A list opened over its trigger (`alignItemWithTrigger`, the default) is placed once. Base UI holds
the page's scroll while it is open; on the Kirana UI base the registry's React Select holds it
itself. If a project's own select drifts, keep `alignItemWithTrigger` and make sure the installed
`select` is the registry's current one (`ui diff select`), or pass `alignItemWithTrigger={false}`.

## A link drawn as a button is announced as a button

`<Button render={<a href />} nativeButton={false}>` must keep `role="link"`. The registry's
Button does on every base; a hand-written wrapper over a primitive may not. Do not add
`role="button"` to a link, and do not replace the registry's Button with `buttonVariants` on an
`<a>` unless you also keep its focus and disabled styles.

## A submit button does not submit

A button that submits its form passes `type="submit"`; every other button inside a form passes
`type="button"` (a trigger, a toggle), or it submits the form. The registry's parts do; check your
own triggers.

## A scroll area does not cap its height

Give the `ScrollArea` root a `height` or a `maxHeight` (`sx`): the viewport takes it and scrolls.
Do not wrap it in a flex container to force it.

## The lint rule `kirana/use-logical-properties` flags the installed components

The rule is off by default (a project's own policy). The components keep shadcn/ui's physical
sides where shadcn/ui does (centring with `left: 50%`, a sheet pinned to its side), so they behave
in a right-to-left page as shadcn/ui's do. If the project turns the rule on, leave the components
out: `{ files: ["src/components/ui/**"], rules: { "kirana/use-logical-properties": "off" } }`.
In your own code, prefer logical properties (`paddingInlineStart`, `insetInlineEnd`).

## `ui add` refuses to write over reformatted files

`ui add` checks each file against the hash it installed; a file the formatter reformatted counts as
changed. Run `npx kirana-style ui diff <item>` first: if the only change is formatting, add with
`--overwrite`. If the project changed the file, merge by hand or `ui update`, never `--overwrite`.

## A colour is right in light and wrong in dark

Every colour is a `light-dark()` pair. A raw colour, or a token used for something it was not made
for, keeps one value in both modes. Use the token whose name says the role (`theme.mutedForeground`),
or add a token with both values.

## An icon is the wrong size, or `sx` on it is reported

Icons take their size from the component they sit in. Do not size an icon with `sx`; if one must
differ, set the component's icon size where the component exposes it.

## A style compiles and does not apply

1. `npx kirana-style trace <file>:<line> <property>`: which rule wins, and why.
2. A component's state style beats a plain caller value: write yours under the same condition.
3. A style on a third-party part needs `styleProps`, not `sx`.
