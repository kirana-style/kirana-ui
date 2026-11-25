# Testing a page built with Kirana UI

## In jsdom (Vitest's or Jest's default DOM)

Click-level tests of Select, Dialog, AlertDialog, Combobox and the others work. jsdom has no Web
Animations API: on the Kirana UI base the components run without it (a popup opens and closes at
once), but its testing kit's `settled()` asks the document for its animations, so give jsdom a
polyfill in the test setup whenever a test awaits `settled()`, and on the other bases, whose
popups wait for their exit animation through `element.getAnimations()`:

```ts
// test/setup.ts
if (!Element.prototype.getAnimations) Element.prototype.getAnimations = () => []
if (!document.getAnimations) document.getAnimations = () => []
```

jsdom has no layout either: positions, sizes and scroll are 0. Test what a user does and sees
(roles, names, text, `aria-*`, `data-*` states), not where things are.

## In a real browser

Vitest's browser mode (Playwright) runs the real layout and animations. Prefer it for a popup's
placement, scrolling, focus and motion.

## The Kirana UI base's testing kit

On the Kirana UI base, `@kirana-ui/<framework>/testing` has what the primitives' own checks are made
of (its section of `llms.txt` has every export):

- `faults(root)`: what is wrong under `root`, as sentences: an attribute no vocabulary names, a
  state written as a value it does not take (`data-open="false"`), a reference to an id that is not
  in the page, one id twice. `expect(faults(container)).toEqual([])`.
- `settled()`: resolves once nothing is moving (no frame of an entrance or exit, no animation).
  Await it after a press instead of a timeout.
- `recorder()`: hand it as a change callback (`onValueChange: heard.listen`) and assert what it
  heard: `heard.said()` is `["value reason", …]`; `heard.refuse()` makes every change refused.

## What to assert

- Every trigger can be pressed and opens what it controls; Escape closes it; focus returns.
- A form submits once, with the controls' values, and a trigger inside it does not submit it.
- No console error and no unhandled rejection while the page is used.
- In both colour modes, and right to left if the project is.
