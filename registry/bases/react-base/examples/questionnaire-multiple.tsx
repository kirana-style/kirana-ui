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
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../ui/questionnaire"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoMaxWMd: css({ marginInline: "auto", maxWidth: containerSize.md }),
}

const items = [
  {
    choices: [
      { value: "source" },
      { value: "tests" },
      { value: "docs" },
      { value: "history" },
    ],
    name: "context",
    required: true,
  },
] as const

export default function QuestionnaireMultiple() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const context = new FormData(event.currentTarget).getAll("context")

    toast("Context selected", {
      description: `Context: ${context.join(", ") || "None"}`,
    })
  }

  return (
    <div sx={page.example}>
      <Questionnaire
        sx={styles.mxAutoMaxWMd}
        items={items}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="context" multiple required>
          <QuestionnaireTitle>
            What context should the agent inspect?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select every source that may affect the implementation.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="source">
              Relevant source files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              Existing tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="docs">
              Architecture documentation
            </QuestionnaireChoice>
            <QuestionnaireChoice value="history">
              Recent commit history
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnaireSubmit>Share context</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
