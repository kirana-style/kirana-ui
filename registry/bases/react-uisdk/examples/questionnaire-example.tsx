import { css } from "@kirana-style/core"

import * as React from "react"
import { toast } from "sonner"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
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
} from "../ui/questionnaire"
import {
  breakpoint,
  containerSize,
  fontWeight,
  letterSpacing,
} from "../../../core/scales"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { theme } from "../../../core/tokens"

import { questionnaire } from "../../../styles/questionnaire.styles"

const styles = {
  // `md:col-span-2`, on an example's container.
  colSpan2: css({ gridColumn: { [breakpoint.md]: "span 2 / span 2" } }),
  mxAutoMaxWLg: css({ marginInline: "auto", maxWidth: containerSize.lg }),
  medium: css({ fontWeight: fontWeight.medium }),
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fontSemiboldTrackingWide: css({
    fontWeight: fontWeight.semibold,
    letterSpacing: { "*": null, base: letterSpacing.widest },
    color: theme.foreground,
    textTransform: "uppercase",
  }),
  mxAutoWFullMaxWLg: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
  }),
  full: css({ width: "100%" }),
}

const questionnaireItems = [
  {
    choices: [
      { value: "delegation" },
      { value: "questions" },
      { value: "both" },
    ],
    name: "direction",
    required: true,
  },
  {
    choices: [
      { value: "progress" },
      { value: "decisions" },
      { value: "risks" },
    ],
    name: "signals",
  },
  {
    choices: [{ value: "week" }, { value: "cycle" }, { value: "later" }],
    name: "timing",
    required: true,
  },
] as const

const taskItems = [
  {
    choices: [
      { value: "inspect" },
      { value: "implement" },
      { value: "review" },
    ],
    name: "task",
    required: true,
  },
] as const

const planItems = [
  {
    choices: [
      { value: "plus" },
      { value: "pro" },
      { value: "enterprise", disabled: true },
    ],
    name: "plan",
    required: true,
  },
] as const

export default function QuestionnaireExample() {
  return (
    <ExampleWrapper>
      <QuestionnaireStandalone />
      <QuestionnaireCard />
      <QuestionnaireDialog />
      <QuestionnaireNoDescription />
      <QuestionnaireDisabled />
    </ExampleWrapper>
  )
}

function QuestionnaireDisabled() {
  return (
    <Example title="Disabled" containerSx={styles.colSpan2}>
      <Questionnaire
        sx={styles.mxAutoMaxWLg}
        defaultItem="plan"
        items={planItems}
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="plan" required>
          <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
          <QuestionnaireDescription>
            Enterprise is not available on your account.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="plus">
              <span sx={styles.medium}>Plus</span>
              <QuestionnaireChoiceDescription>
                For individuals and small teams
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="pro">
              <span sx={styles.medium}>Pro</span>
              <QuestionnaireChoiceDescription>
                For growing businesses
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="enterprise" disabled>
              <span sx={styles.medium}>Enterprise</span>
              <QuestionnaireChoiceDescription>
                For large teams and enterprises
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireNavigation />
      </Questionnaire>
    </Example>
  )
}

function QuestionnaireNoDescription() {
  return (
    <Example title="No description" containerSx={styles.colSpan2}>
      <Questionnaire
        sx={styles.mxAutoMaxWLg}
        defaultItem="task"
        items={taskItems}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="task" required>
          <QuestionnaireTitle>
            What should the agent do next?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">
              Inspect the codebase
            </QuestionnaireChoice>
            <QuestionnaireChoice value="implement">
              Implement the change
            </QuestionnaireChoice>
            <QuestionnaireChoice value="review">
              Review the result
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireNavigation />
      </Questionnaire>
    </Example>
  )
}

function QuestionnaireStandalone() {
  return (
    <Example title="Standalone" containerSx={styles.colSpan2}>
      <Questionnaire
        sx={styles.mxAutoMaxWLg}
        defaultItem="direction"
        items={questionnaireItems}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireQuestions />
        <QuestionnaireNavigation />
      </Questionnaire>
    </Example>
  )
}

function QuestionnaireCard() {
  return (
    <Example title="Card" containerSx={styles.colSpan2}>
      <Questionnaire
        defaultItem="direction"
        items={questionnaireItems}
        shortcuts="numbers"
        onSubmit={handleSubmit}
      >
        <QuestionnaireCardQuestions />
      </Questionnaire>
    </Example>
  )
}

function QuestionnaireDialog() {
  return (
    <Example
      title="Dialog"
      sx={styles.itemsCenterJustifyCenter}
      containerSx={styles.colSpan2}
    >
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open questionnaire
        </DialogTrigger>
        <DialogContent>
          <Questionnaire
            defaultItem="direction"
            items={questionnaireItems}
            onSubmit={handleSubmit}
          >
            <DialogHeader>
              <DialogTitle sx={visuallyHidden}>
                Plan an agent interface
              </DialogTitle>
              <DialogDescription sx={visuallyHidden}>
                Answer three questions to shape the next prototype.
              </DialogDescription>
              <QuestionnaireProgress
                sx={styles.fontSemiboldTrackingWide}
                render={(props, state) => (
                  <span {...props}>
                    Question {state.current} of {state.total}
                  </span>
                )}
              />
            </DialogHeader>
            <QuestionnaireQuestions />
            <DialogFooter>
              <QuestionnaireNavigation />
            </DialogFooter>
          </Questionnaire>
        </DialogContent>
      </Dialog>
    </Example>
  )
}

function QuestionnaireCardQuestions() {
  const directionTitleId = React.useId()
  const signalsTitleId = React.useId()
  const timingTitleId = React.useId()

  return (
    <>
      <QuestionnaireItem
        aria-labelledby={directionTitleId}
        name="direction"
        required
      >
        <Card sx={styles.mxAutoWFullMaxWLg}>
          <CardHeader>
            <QuestionnaireTitle
              id={directionTitleId}
              render={<CardTitle sx={questionnaire.title} />}
            >
              What should we prototype next?
            </QuestionnaireTitle>
            <QuestionnaireDescription
              render={<CardDescription sx={questionnaire.description} />}
            >
              Choose one direction or write another answer.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="delegation">
                <span sx={styles.medium}>Sub-agent delegation</span>
                <QuestionnaireChoiceDescription>
                  Show when work is delegated and what comes back.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="questions">
                <span sx={styles.medium}>Question prompts</span>
                <QuestionnaireChoiceDescription>
                  Show choices while the agent waits for input.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="both">
                <span sx={styles.medium}>Both together</span>
                <QuestionnaireChoiceDescription>
                  Explore one unified interaction pattern.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireInput
                aria-label="Another direction"
                placeholder="Type another direction…"
              />
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
      <QuestionnaireItem
        aria-labelledby={signalsTitleId}
        name="signals"
        multiple
      >
        <Card sx={styles.mxAutoWFullMaxWLg}>
          <CardHeader>
            <QuestionnaireTitle
              id={signalsTitleId}
              render={<CardTitle sx={questionnaire.title} />}
            >
              What should every progress update include?
            </QuestionnaireTitle>
            <QuestionnaireDescription
              render={<CardDescription sx={questionnaire.description} />}
            >
              Select all that apply, or skip this question.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="progress">
                Progress
              </QuestionnaireChoice>
              <QuestionnaireChoice value="decisions">
                Decisions
              </QuestionnaireChoice>
              <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
      <QuestionnaireItem aria-labelledby={timingTitleId} name="timing" required>
        <Card sx={styles.mxAutoWFullMaxWLg}>
          <CardHeader>
            <QuestionnaireTitle
              id={timingTitleId}
              render={<CardTitle sx={questionnaire.title} />}
            >
              When should this be revisited?
            </QuestionnaireTitle>
            <QuestionnaireDescription
              render={<CardDescription sx={questionnaire.description} />}
            >
              Choose when this should be revisited.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
              <QuestionnaireChoice value="cycle">
                Next cycle
              </QuestionnaireChoice>
              <QuestionnaireChoice value="later">
                Revisit later
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
    </>
  )
}

function QuestionnaireQuestions() {
  return (
    <>
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose one direction or write another answer.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span sx={styles.medium}>Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span sx={styles.medium}>Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span sx={styles.medium}>Both together</span>
            <QuestionnaireChoiceDescription>
              Explore one unified interaction pattern.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
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
          <QuestionnaireChoice value="decisions">Decisions</QuestionnaireChoice>
          <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should this be revisited?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose when this should be revisited.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
          <QuestionnaireChoice value="cycle">Next cycle</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Revisit later</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    </>
  )
}

function QuestionnaireNavigation() {
  return (
    <QuestionnaireActions sx={styles.full}>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext>Next</QuestionnaireNext>
      <QuestionnaireSubmit>Save answers</QuestionnaireSubmit>
    </QuestionnaireActions>
  )
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const values = {
    direction: formData.get("direction"),
    signals: formData.getAll("signals"),
    timing: formData.get("timing"),
  }

  toast("Questionnaire submitted", {
    description: `Direction: ${values.direction ?? "None"} · Progress signals: ${values.signals.join(", ") || "None"} · Timing: ${values.timing ?? "None"}`,
  })
}
