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
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "../ui/questionnaire"
import { containerSize, fontWeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoMaxWMd: css({ marginInline: "auto", maxWidth: containerSize.md }),
  medium: css({ fontWeight: fontWeight.medium }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

const items = [
  {
    choices: [
      { value: "tool-calls" },
      { value: "approvals" },
      { value: "handoffs" },
    ],
    name: "direction",
    required: true,
  },
  {
    choices: [
      { value: "progress" },
      { value: "decisions" },
      { value: "risks" },
      { value: "next-step" },
    ],
    name: "signals",
  },
  {
    choices: [{ value: "now" }, { value: "next-cycle" }, { value: "backlog" }],
    name: "timing",
    required: true,
  },
] as const

export default function QuestionnaireDemo() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const answers = {
      direction: formData.get("direction"),
      signals: formData.getAll("signals"),
      timing: formData.get("timing"),
    }

    toast("Agent plan saved", {
      description: `Direction: ${answers.direction ?? "None"} · Progress signals: ${answers.signals.join(", ") || "None"} · Timing: ${answers.timing ?? "None"}`,
    })
  }

  return (
    <div sx={page.example}>
      <Questionnaire
        sx={styles.mxAutoMaxWMd}
        defaultItem="direction"
        items={items}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="direction" required>
          <QuestionnaireTitle>
            What should the agent build next?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose a direction or describe another task.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="tool-calls">
              <span sx={styles.medium}>Tool call timeline</span>
              <span sx={styles.textMutedForeground}>
                Show what the agent ran and what came back.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="approvals">
              <span sx={styles.medium}>Approval checkpoints</span>
              <span sx={styles.textMutedForeground}>
                Ask before sensitive or destructive actions.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="handoffs">
              <span sx={styles.medium}>Sub-agent handoffs</span>
              <span sx={styles.textMutedForeground}>
                Make delegated work and results easier to follow.
              </span>
            </QuestionnaireChoice>
            <QuestionnaireInput
              aria-label="Another agent feature"
              placeholder="Describe another feature…"
            />
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="signals" multiple>
          <QuestionnaireTitle>
            What should every progress update include?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Select all that apply, or skip this question.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="progress">Progress</QuestionnaireChoice>
            <QuestionnaireChoice value="decisions">
              Decisions
            </QuestionnaireChoice>
            <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
            <QuestionnaireChoice value="next-step">
              Next step
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="timing" required>
          <QuestionnaireTitle>When should work begin?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose when the agent should begin the work.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="now">Start now</QuestionnaireChoice>
            <QuestionnaireChoice value="next-cycle">
              Next development cycle
            </QuestionnaireChoice>
            <QuestionnaireChoice value="backlog">
              Add it to the backlog
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
