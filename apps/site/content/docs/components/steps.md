---
title: Steps
description: A task taken in steps, each with its mark, its title and what it shows. Built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords: [steps, stepper, wizard, progress, checkout, component, kirana]
---

# Steps

<!-- ::preview item="steps-demo" height="360" combinations="react/kirana" -->

Steps is built on the [Steps primitive](/docs/primitives/components/steps) of Kirana UI Primitives, which holds the step shown, moves between the triggers with the arrow keys, and hides each step's content until its step is shown.

## Installation

<!-- ::installation name="steps" combinations="react/kirana" -->

## Usage

```tsx
import {
  Steps,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNext,
  StepsPrevious,
  StepsTitle,
  StepsTrigger,
} from "@/components/ui/steps"
```

```tsx
<Steps>
  <StepsList aria-label="Checkout">
    <StepsItem index={0}>
      <StepsTrigger>
        <StepsIndicator />
        <StepsTitle>Shipping</StepsTitle>
      </StepsTrigger>
    </StepsItem>
    <StepsItem index={1}>
      <StepsTrigger>
        <StepsIndicator />
        <StepsTitle>Payment</StepsTitle>
      </StepsTrigger>
    </StepsItem>
  </StepsList>
  <StepsContent index={0}>Where should we send your order?</StepsContent>
  <StepsContent index={1}>How would you like to pay?</StepsContent>
  <StepsPrevious>Back</StepsPrevious>
  <StepsNext>Next</StepsNext>
</Steps>
```

Each item draws the line to the next step itself, and the last item hides it. An indicator with no children shows its step's number, and a check once the step is done.

## Examples

### Vertical

Use `orientation="vertical"` to lay the steps out down the side, the content beside them. A `StepsDescription` under the title adds a line of muted text.

<!-- ::preview item="steps-vertical" height="360" combinations="react/kirana" -->

### Linear

Use `linear` so that a step not done yet cannot be gone to by its trigger: the reader moves on with Next.

<!-- ::preview item="steps-linear" height="360" combinations="react/kirana" -->

### Icons

Give `StepsIndicator` children to draw an icon in place of the number.

<!-- ::preview item="steps-icons" height="360" combinations="react/kirana" -->

## API Reference

Every part takes the props of the primitive's part it wraps (listed on the [Steps primitive](/docs/primitives/components/steps) page) and Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

### Steps

The root, around the list and the content. It draws a `div`.

| Prop           | Type                                             | Default        |
| -------------- | ------------------------------------------------ | -------------- |
| `step`         | `number`                                         |                |
| `defaultStep`  | `number`                                         | `0`            |
| `onStepChange` | `(step: number, details: ChangeDetails) => void` |                |
| `count`        | `number`                                         |                |
| `linear`       | `boolean`                                        | `false`        |
| `orientation`  | `"horizontal" \| "vertical"`                     | `"horizontal"` |

`step` equal to the number of steps means every step is done, and `StepsCompleted` is shown.

### StepsList

The row of steps, or the column when vertical. It draws a `div`; give it an `aria-label`.

### StepsItem

One step, around its trigger. It draws a `div`, then the line to the next step.

| Prop        | Type      | Default |
| ----------- | --------- | ------- |
| `index`     | `number`  |         |
| `separator` | `boolean` | `true`  |

Give `index` on a page a server draws. `separator={false}` leaves out the line, for a caller who places a `StepsSeparator` itself.

### StepsTrigger

Names a step, and goes to it when pressed. It draws a `button`, holding the indicator, the title and the description.

### StepsIndicator

The step's round mark: in the primary colour while its step is shown, filled once done, muted while to come. It draws a `span`. With no children it shows the step's number, then a check once the step is done; its children replace both.

### StepsSeparator

The line from a step to the next, in the primary colour once its step is done. It draws a `div`. `StepsItem` draws one already.

### StepsTitle

A step's title, inside its trigger. It draws a `span`.

### StepsDescription

A line of muted text under the title, inside the trigger. It draws a `span`.

### StepsContent

What a step shows, hidden unless its step is shown. It draws a `div`.

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `index` | `number` |         |

### StepsCompleted

What is shown once every step is done. It draws a `div`.

### StepsPrevious

Goes to the step before. It draws an outline `Button`.

| Prop      | Type               | Default     |
| --------- | ------------------ | ----------- |
| `variant` | Button's `variant` | `"outline"` |
| `size`    | Button's `size`    | `"default"` |

### StepsNext

Goes to the step after; from the last step, to every step done. It draws a `Button`.

| Prop      | Type               | Default     |
| --------- | ------------------ | ----------- |
| `variant` | Button's `variant` | `"default"` |
| `size`    | Button's `size`    | `"default"` |
