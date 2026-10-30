---
title: Questionnaire
description: A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions.
section: components
variants: [react/base, react/aria]
keywords: [questionnaire, chat, component, base, aria]
---

# Questionnaire

<!-- ::preview item="questionnaire-demo" height="400" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="questionnaire" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
```

```tsx
const items = [
  {
    name: "direction",
    required: true,
    prompt: "What should we prototype next?",
    description: "Choose a direction or write your own.",
    choices: [
      {
        value: "delegation",
        label: "Delegation",
        description: "Show how work moves to a specialist.",
      },
      {
        value: "questions",
        label: "Question prompts",
        description: "Show choices while the interface waits.",
      },
      { value: "both", label: "Both together" },
    ],
    input: { label: "Another answer", placeholder: "Type another answer…" },
  },
  {
    name: "detail",
    required: false,
    prompt: "How much detail should it include?",
    description: "Skip this if you are not sure yet.",
    choices: [
      { value: "focused", label: "Focused" },
      { value: "complete", label: "Complete flow" },
    ],
  },
] as const
```

Define the collection once: pass it to `Questionnaire` for server-rendered
progress, actions, and shortcuts, then map it into the parts.

```tsx
<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  {items.map((question) => (
    <QuestionnaireItem
      key={question.name}
      name={question.name}
      required={question.required}
    >
      <QuestionnaireTitle>{question.prompt}</QuestionnaireTitle>
      <QuestionnaireDescription>
        {question.description}
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        {question.choices.map((choice) => (
          <QuestionnaireChoice key={choice.value} value={choice.value}>
            <span>{choice.label}</span>
            {"description" in choice ? <span>{choice.description}</span> : null}
          </QuestionnaireChoice>
        ))}
        {"input" in question ? (
          <QuestionnaireInput
            aria-label={question.input.label}
            placeholder={question.input.placeholder}
          />
        ) : null}
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>
  ))}
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>
```

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const answers = new FormData(event.currentTarget)
  // answers.get("direction"), answers.getAll(...) for multiple items.
}
```

## Composition

```text
Questionnaire
├── QuestionnaireProgress
├── QuestionnaireItem
│   ├── QuestionnaireTitle
│   ├── QuestionnaireDescription
│   ├── QuestionnaireChoices
│   │   ├── QuestionnaireChoice
│   │   └── QuestionnaireInput
│   └── QuestionnaireError
└── QuestionnaireActions
    ├── QuestionnairePrevious
    ├── QuestionnaireSkip
    ├── QuestionnaireNext
    └── QuestionnaireSubmit
```

Questionnaire owns the ordered items, active item, answer state, validation,
progress, and navigation. The containing page, card, dialog, or drawer owns
close and cancellation behavior, persistence, transport, and branching.

## Server Rendering

Pass `items` to server-render the active item, progress, actions, and answer
shortcuts. See the
headless Questionnaire for the complete behavior.

## Multiple Selection

Use `multiple` for an item that accepts more than one fixed answer.

<!-- ::preview item="questionnaire-multiple" height="400" combinations="react/base,react/aria" -->

## Freeform Answer

Compose `QuestionnaireInput` with fixed choices when the user can provide another answer.

<!-- ::preview item="questionnaire-freeform" height="400" combinations="react/base,react/aria" -->

## Explicit Skip

Add `QuestionnaireSkip` when an optional item may be intentionally left unanswered.

<!-- ::preview item="questionnaire-skip" height="400" combinations="react/base,react/aria" -->

## Shortcuts

Assign a letter or number key to each answer with `shortcuts`.

<!-- ::preview item="questionnaire-shortcuts" height="400" combinations="react/base,react/aria" -->

## Custom Validation

Combine controlled navigation with an external schema such as Zod to return to an invalid item and present its error.

<!-- ::preview item="questionnaire-validation" height="400" combinations="react/base,react/aria" -->

## Controlled

Control the active item from host state, such as returning to an invalid step.

<!-- ::preview item="questionnaire-controlled" height="400" combinations="react/base,react/aria" -->

## Resume

Restore a saved active item and default answers, then reset changes back to that saved state.

<!-- ::preview item="questionnaire-resume" height="400" combinations="react/base,react/aria" -->

## Conditional Items

Disable items that do not apply to the user's earlier answers.

<!-- ::preview item="questionnaire-conditional" height="400" combinations="react/base,react/aria" -->

## Navigation State

Read item status to opt into disabled navigation and custom action styling.

<!-- ::preview item="questionnaire-navigation-state" height="400" combinations="react/base,react/aria" -->

## Custom Progress

Use the Progress render state to build a custom progress indicator.

<!-- ::preview item="questionnaire-progress" height="400" combinations="react/base,react/aria" -->

## Animated Items

Animate the active item while keeping progress and navigation stationary.

<!-- ::preview item="questionnaire-animated" height="400" combinations="react/base,react/aria" -->

## Card

Compose Questionnaire with Card slots while keeping the question title and description semantic.

<!-- ::preview item="questionnaire-card" height="400" combinations="react/base,react/aria" -->

## Dialog

Compose Questionnaire inside a Dialog while keeping cancellation and dismissal host-owned.

<!-- ::preview item="questionnaire-dialog" height="400" combinations="react/base,react/aria" -->

## Accessibility

`QuestionnaireItem` renders a `fieldset`, and `QuestionnaireTitle` renders its
`legend`. Descriptions and active errors are associated with the current item,
and invalid items and answer controls expose `aria-invalid`.

Fixed choices preserve native radio and checkbox behavior. Progress is exposed
as a named progressbar, navigation uses real buttons, and inactive items and
actions are hidden and inert. Successful navigation focuses the newly active
item; failed validation focuses an available answer control.

Always give `QuestionnaireInput` an accessible name with a visible label,
`aria-label`, or `aria-labelledby`. A placeholder is not a label. See the
Questionnaire accessibility guide
for labeling custom compositions and the complete keyboard behavior.

## Unstyled

The behavior in `Questionnaire` comes from the `@shadcn/react` package. To use
it directly with your own markup and styles, see
Questionnaire under @shadcn/react.

## API Reference

The props, data attributes, and render states for every part are documented on
the @shadcn/react Questionnaire page.
The styled components inherit the corresponding unstyled props. Navigation
components also accept Button `size` and `variant` props, and
`QuestionnaireActions` is a styled-only layout helper.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
