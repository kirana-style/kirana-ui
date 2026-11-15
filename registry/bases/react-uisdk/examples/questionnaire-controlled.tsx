import { css } from "@kirana-style/core"

import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../ui/questionnaire"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  relativeMxAutoFlexHFullW: css({
    position: "relative",
    marginInline: "auto",
    display: "flex",
    height: "100%",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
  }),
  absoluteEnd0Top0TextSmTe: css({
    position: "absolute",
    insetInlineEnd: "0",
    top: "0",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  mtAuto: css({ marginTop: "auto" }),
}

const items = [
  { name: "scope", required: true },
  { name: "checks", required: true },
  { name: "output", required: true },
] as const

const itemLabels: Record<string, string> = {
  scope: "Change scope",
  checks: "Verification",
  output: "Final output",
}

export default function QuestionnaireControlled() {
  const [item, setItem] = React.useState("scope")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Agent workflow configured", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("checks") ?? "None"} · Output: ${formData.get("output") ?? "None"}`,
    })
  }

  return (
    <div sx={page.example}>
      <div sx={styles.relativeMxAutoFlexHFullW}>
        <p sx={styles.absoluteEnd0Top0TextSmTe} role="status">
          Current checkpoint: {itemLabels[item]}
        </p>

        <Questionnaire
          sx={styles.mtAuto}
          item={item}
          items={items}
          onItemChange={setItem}
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress />

          <QuestionnaireItem name="scope" required>
            <QuestionnaireTitle>What may the agent change?</QuestionnaireTitle>
            <QuestionnaireDescription>
              The host stores the active checkpoint while Questionnaire
              navigates.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="component">
                Only the target component
              </QuestionnaireChoice>
              <QuestionnaireChoice value="tests">
                Component and related tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="feature">
                The complete feature area
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem name="checks" required>
            <QuestionnaireTitle>
              Which verification level should it use?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="targeted">
                Targeted tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="package">
                Package tests and typecheck
              </QuestionnaireChoice>
              <QuestionnaireChoice value="full">
                Full workspace verification
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem name="output" required>
            <QuestionnaireTitle>
              What should the agent return when finished?
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="summary">
                Concise summary
              </QuestionnaireChoice>
              <QuestionnaireChoice value="diff">
                Summary with changed files
              </QuestionnaireChoice>
              <QuestionnaireChoice value="handoff">
                Detailed implementation handoff
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save workflow</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      </div>
    </div>
  )
}
