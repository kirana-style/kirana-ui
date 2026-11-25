---
title: Tour
description: Walks a reader through a page step by step, a popover by each element with the page dimmed around it, built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords:
  [
    tour,
    onboarding,
    walkthrough,
    spotlight,
    steps,
    popover,
    component,
    kirana,
    primitives,
  ]
---

# Tour

<!-- ::preview item="tour-demo" height="400" combinations="react/kirana" -->

Tour is built on the [Tour primitive](/docs/primitives/components/tour) of Kirana UI Primitives. Each step points at an element of the page: the page is dimmed around it, with a hole the shape of the [Popover](/docs/components/popover)'s corners, and a popup with an arrow stands beside it, on the Popover's surface, coming and going as it does. The popup holds the step's title and description, its place in the tour ("1 of 3"), Back and Next buttons, and a close button in its corner. ArrowRight and ArrowLeft go on and back a step, Escape ends the tour, and the rest of the page cannot be used while it is open.

## Installation

<!-- ::installation name="tour" combinations="react/kirana" -->

## Usage

```tsx
import { Tour, TourContent, type TourStep } from "@/components/ui/tour"
```

```tsx
const steps: TourStep[] = [
  {
    id: "search",
    target: () => searchRef.current,
    title: "Search",
    description: "Find any file in the project by its name.",
  },
  {
    id: "settings",
    target: "#settings",
    title: "Settings",
    description: "Change the theme and your account.",
  },
]

<Tour steps={steps} open={open} onOpenChange={setOpen}>
  <TourContent />
</Tour>
```

A step's `target` is an element, a CSS selector, or a function that gives an element, asked when the step is shown. A step with no target, or whose target is not in the page, is shown in the middle of the viewport. Given no children, `TourContent` draws the step's `title` and `description` and the buttons; its children may also be a function of the step shown:

```tsx
<TourContent>
  {({ step }) => (
    <>
      <TourHeader>
        <TourTitle>{step?.title}</TourTitle>
        <TourDescription>{step?.description}</TourDescription>
      </TourHeader>
      <TourFooter>
        <TourProgress />
        <TourPrevious />
        <TourNext />
      </TourFooter>
    </>
  )}
</TourContent>
```

## Examples

### Controlled

Hold the step shown with `step` and `onStepChange`: here the page says which step is shown, and a button starts the tour at its last step.

<!-- ::preview item="tour-controlled" height="420" combinations="react/kirana" -->

### Placement

A step's `side` (and `align`) says where its popup stands against the target; the popup flips to the other side when there is no room. Here one target has a step on each side.

<!-- ::preview item="tour-placement" height="460" combinations="react/kirana" -->

## API Reference

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own. The other props are the primitive's: see the [Tour primitive](/docs/primitives/components/tour).

### Tour

The root: the steps, and whether the tour is open and which step it shows. It draws no element.

| Prop                  | Type                                              | Default | Description                                                              |
| --------------------- | ------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `steps`               | `readonly TourStep[]`                             | -       | Required. The steps, in order.                                           |
| `open`                | `boolean`                                         | -       | Whether it is open, when the caller holds it.                            |
| `defaultOpen`         | `boolean`                                         | `false` | Whether it starts open.                                                  |
| `onOpenChange`        | `(open: boolean, details: ChangeDetails) => void` | -       | Called as it is about to open or close; the last step's Next closes it.  |
| `step`                | `number`                                          | -       | The index of the step shown, from 0, when the caller holds it.           |
| `defaultStep`         | `number`                                          | `0`     | The step it starts at.                                                   |
| `onStepChange`        | `(step: number, details: ChangeDetails) => void`  | -       | Called as another step is about to be shown.                             |
| `spotlightPadding`    | `number`                                          | `4`     | The room between the target and the edge of the hole, in pixels.         |
| `closeOnOutsidePress` | `boolean`                                         | `false` | Whether a press on the dimmed page ends the tour.                        |
| `interactive`         | `boolean`                                         | `false` | Whether the target can be used while its step is shown.                  |
| `keyboardNavigation`  | `boolean`                                         | `true`  | Whether ArrowRight and ArrowLeft go on and back a step.                  |
| `waitForTarget`       | `number`                                          | `1000`  | How long a step waits for its target to be in the page, in milliseconds. |

### TourStep

A step, the primitive's with what `TourContent` draws by itself.

| Field         | Type                                                        | Default    | Description                                     |
| ------------- | ----------------------------------------------------------- | ---------- | ----------------------------------------------- |
| `id`          | `string`                                                    | -          | Required. Names the step.                       |
| `target`      | `Element \| string \| (() => Element \| null \| undefined)` | -          | The element the step is about.                  |
| `side`        | `Side`                                                      | `"bottom"` | The side of the target the popup is on.         |
| `align`       | `"start" \| "center" \| "end"`                              | `"center"` | Where along that side it is.                    |
| `title`       | `ReactNode`                                                 | -          | The step's title, drawn by `TourContent`.       |
| `description` | `ReactNode`                                                 | -          | The step's description, drawn by `TourContent`. |

### TourContent

The spotlight over the page and the popup by the step's target, with its arrow and, unless `showCloseButton` is `false`, a `TourClose` in its corner. Given no children, it draws a `TourHeader` with the step's title and description and a `TourFooter` with `TourProgress`, `TourPrevious` and `TourNext`. A step's own `side` and `align` win over the ones given here.

| Prop              | Type                                                 | Default    | Description                                                                                  |
| ----------------- | ---------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode \| ((shown: TourShownStep) => ReactNode)` | -          | What the popup holds, or a function of the step shown (`step`, `index`, `current`, `total`). |
| `showCloseButton` | `boolean`                                            | `true`     | Whether the close button is drawn in the corner.                                             |
| `side`            | `Side`                                               | `"bottom"` | The side of the target, for a step with none.                                                |
| `align`           | `"start" \| "center" \| "end"`                       | `"center"` | Where along that side, for a step with none.                                                 |
| `sideOffset`      | `number`                                             | `12`       | The gap from the target, in pixels.                                                          |
| `alignOffset`     | `number`                                             | `0`        | How far the popup is moved along the side.                                                   |
| `sx`              | `Sx`                                                 | -          | Styles merged with the popup's own.                                                          |

### TourHeader

The title and description, in a column, leaving room for the close button.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the header's own. |

### TourTitle

The heading that names the step, the Popover's title.

| Prop | Type | Default | Description                         |
| ---- | ---- | ------- | ----------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the title's own. |

### TourDescription

The text that describes the step, in muted text.

| Prop | Type | Default | Description                               |
| ---- | ---- | ------- | ----------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the description's own. |

### TourFooter

A row of the step's buttons, at the end.

| Prop | Type | Default | Description                          |
| ---- | ---- | ------- | ------------------------------------ |
| `sx` | `Sx` | -       | Styles merged with the footer's own. |

### TourProgress

The step's place in the tour, "1 of 3", in muted text at the footer's start.

| Prop       | Type        | Default    | Description                        |
| ---------- | ----------- | ---------- | ---------------------------------- |
| `children` | `ReactNode` | `"1 of 3"` | What it says.                      |
| `sx`       | `Sx`        | -          | Styles merged with the text's own. |

### TourPrevious

A small outline Button that goes back a step; faded on the first step, where it does nothing.

| Prop       | Type        | Default  | Description                          |
| ---------- | ----------- | -------- | ------------------------------------ |
| `children` | `ReactNode` | `"Back"` | What the button says.                |
| `sx`       | `Sx`        | -        | Styles merged with the button's own. |

### TourNext

A small Button that goes on a step, and finishes the tour on the last one.

| Prop       | Type        | Default                                | Description                          |
| ---------- | ----------- | -------------------------------------- | ------------------------------------ |
| `children` | `ReactNode` | `"Next"`, or `"Done"` on the last step | What the button says.                |
| `sx`       | `Sx`        | -                                      | Styles merged with the button's own. |

### TourClose

A ghost icon Button in the popup's corner that ends the tour, named "Close".

| Prop       | Type        | Default | Description                          |
| ---------- | ----------- | ------- | ------------------------------------ |
| `children` | `ReactNode` | a cross | What the button draws.               |
| `sx`       | `Sx`        | -       | Styles merged with the button's own. |
