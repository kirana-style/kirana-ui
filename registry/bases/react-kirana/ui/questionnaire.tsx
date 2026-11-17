"use client"

import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"

import type { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { button } from "../../../styles/button.styles"
import { input } from "../../../styles/input.styles"
import { questionnaire } from "../../../styles/questionnaire.styles"

type Own<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Questionnaire({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      {...props}
      {...styleProps(questionnaire.root, sx)}
    />
  )
}

function QuestionnaireProgress({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      {...props}
      {...styleProps(questionnaire.progress, sx)}
    />
  )
}

function QuestionnaireItem({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      {...props}
      {...styleProps(questionnaire.item, sx)}
    />
  )
}

function QuestionnaireTitle({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      {...props}
      {...styleProps(questionnaire.title, sx)}
    />
  )
}

function QuestionnaireDescription({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      {...props}
      {...styleProps(questionnaire.description, sx)}
    />
  )
}

function QuestionnaireChoices({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      {...props}
      {...styleProps(questionnaire.choices, sx)}
    />
  )
}

function QuestionnaireChoice({
  children,
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      {...props}
      {...styleProps(questionnaire.choice, sx)}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        {...styleProps(questionnaire.choiceInput)}
      />
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        sx={questionnaire.indicator}
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          sx={[questionnaire.dot, questionnaire.dotDark]}
        />
        <IconPlaceholder
          data-slot="questionnaire-choice-indicator-check"
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
          {...styleProps(questionnaire.check)}
        />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        {...styleProps(questionnaire.label)}
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        {...styleProps(questionnaire.shortcut)}
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireChoiceDescription({ sx, ...props }: Own<"span">) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      {...props}
      {...styleProps(questionnaire.choiceDescription, sx)}
    />
  )
}

function QuestionnaireInput({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Input>) {
  return (
    <div
      data-slot="questionnaire-input-wrapper"
      sx={questionnaire.inputWrapper}
    >
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        {...props}
        {...styleProps(input, questionnaire.input, sx)}
      />
    </div>
  )
}

function QuestionnaireError({
  sx,
  ...props
}: Own<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      {...props}
      {...styleProps(questionnaire.error, sx)}
    />
  )
}

function QuestionnaireActions({ sx, ...props }: Own<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      {...props}
      {...styleProps(questionnaire.actions, sx)}
    />
  )
}

function QuestionnairePrevious({
  children,
  sx,
  size = "default",
  variant = "outline",
  ...props
}: Own<typeof QuestionnairePrimitive.Previous> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      data-size={size}
      data-variant={variant}
      {...props}
      {...styleProps(button({ size, variant }), questionnaire.previous, sx)}
    >
      {children ?? "Previous"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  children,
  sx,
  size = "default",
  variant = "outline",
  ...props
}: Own<typeof QuestionnairePrimitive.Skip> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      data-size={size}
      data-variant={variant}
      {...props}
      {...styleProps(button({ size, variant }), questionnaire.skip, sx)}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  children,
  sx,
  size = "default",
  variant = "default",
  ...props
}: Own<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      data-size={size}
      data-variant={variant}
      {...props}
      {...styleProps(button({ size, variant }), questionnaire.next, sx)}
    >
      {children ?? "Next"}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  children,
  sx,
  size = "default",
  variant = "default",
  ...props
}: Own<typeof QuestionnairePrimitive.Submit> &
  Pick<React.ComponentProps<typeof Button>, "size" | "variant">) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      data-size={size}
      data-variant={variant}
      {...props}
      {...styleProps(button({ size, variant }), questionnaire.next, sx)}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
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
}
