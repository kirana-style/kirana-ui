import { css } from "@kirana-style/core"

import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../ui/questionnaire"
import { containerSize, space, spacing } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  // `h-1.5 flex-1 rounded-full bg-muted`, `bg-primary` once answered.
  segment: css({
    height: spacing(1.5),
    flex: "1 1 0%",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
  }),
  segmentDone: css({ backgroundColor: theme.primary }),
  mxAutoMaxWMd: css({ marginInline: "auto", maxWidth: containerSize.md }),
  full: css({ width: "100%" }),
  mb2FlexGap15: css({
    marginBottom: space[2],
    display: "flex",
    gap: { "*": null, base: spacing(1.5) },
  }),
}

const items = [
  { name: "scope", required: true },
  { name: "strategy", required: true },
  { name: "tests", required: true },
  { name: "delivery", required: true },
] as const

export default function QuestionnaireProgressExample() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Pull request plan ready", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Commits: ${formData.get("strategy") ?? "None"} · Tests: ${formData.get("tests") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
    })
  }

  return (
    <div sx={page.example}>
      <Questionnaire
        sx={styles.mxAutoMaxWMd}
        defaultItem="scope"
        items={items}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress
          sx={styles.full}
          render={(props, state) => (
            <div {...props}>
              <div sx={styles.mb2FlexGap15} aria-hidden="true">
                {Array.from({ length: state.total }, (_, index) => (
                  <span
                    key={index}
                    sx={[
                      styles.segment,
                      index < state.current && styles.segmentDone,
                    ]}
                  />
                ))}
              </div>
              <span>
                Checkpoint {state.current} of {state.total}
              </span>
            </div>
          )}
        />

        <QuestionnaireItem name="scope" required>
          <QuestionnaireTitle>How large is the change?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="small">Small patch</QuestionnaireChoice>
            <QuestionnaireChoice value="medium">
              Feature-sized change
            </QuestionnaireChoice>
            <QuestionnaireChoice value="large">
              Cross-package change
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="strategy" required>
          <QuestionnaireTitle>
            How should commits be organized?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="single">
              Single commit
            </QuestionnaireChoice>
            <QuestionnaireChoice value="logical">
              Logical commits
            </QuestionnaireChoice>
            <QuestionnaireChoice value="squash">
              Squash before review
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="tests" required>
          <QuestionnaireTitle>Which tests should run?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">
              Targeted tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="package">
              Package suite
            </QuestionnaireChoice>
            <QuestionnaireChoice value="workspace">
              Full workspace
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="delivery" required>
          <QuestionnaireTitle>
            How should the work be delivered?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="patch">Patch only</QuestionnaireChoice>
            <QuestionnaireChoice value="commit">
              Committed locally
            </QuestionnaireChoice>
            <QuestionnaireChoice value="branch">
              Push a review branch
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Finish plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
