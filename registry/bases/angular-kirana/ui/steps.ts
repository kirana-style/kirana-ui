import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from "@angular/core"
import {
  KpSteps,
  KpStepsCompleted,
  KpStepsContent,
  KpStepsIndicator,
  KpStepsItem,
  KpStepsList,
  KpStepsNext,
  KpStepsPrevious,
  KpStepsSeparator,
  KpStepsTrigger,
  hostInputs,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { steps } from "../../../styles/steps.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A task in steps: `<div kuiSteps [(step)]="step">`, on Kirana UI's steps (`KpSteps`), its
 * `[(step)]`, `defaultStep`, `count`, `linear` and `orientation` (`horizontal` by default) the
 * primitive's, `(stepChanged)` the change with its details.
 */
@Directive({
  selector: "[kuiSteps]",
  hostDirectives: [
    {
      directive: KpSteps,
      inputs: ["step", "defaultStep", "count", "linear", "orientation"],
      outputs: ["stepChange", "stepChanged"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Steps {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.root, this.sx()))

  constructor() {
    hostInputs(KpSteps, { orientation: () => "horizontal" })
  }
}

/** The row of steps. */
@Directive({
  selector: "[kuiStepsList]",
  hostDirectives: [KpStepsList],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsList {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.list, this.sx()))
}

/** The line from a step to the next. */
@Directive({
  selector: "[kuiStepsSeparator]",
  hostDirectives: [KpStepsSeparator],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-separator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.separator, this.sx()))
}

/**
 * A step: `<div kuiStepsItem [index]="0">`, on Kirana UI's item (`KpStepsItem`), its content, then
 * the line to the next step (unless `separator` is false), which the last step hides.
 */
@Component({
  selector: "[kuiStepsItem]",
  imports: [StepsSeparator],
  hostDirectives: [{ directive: KpStepsItem, inputs: ["index"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content />
    @if (separator()) {
      <div kuiStepsSeparator></div>
    }`,
})
class StepsItem {
  readonly separator = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.item, this.sx()))
}

/** What names a step and goes to it: `<button kuiStepsTrigger>`. */
@Directive({
  selector: "[kuiStepsTrigger]",
  hostDirectives: [KpStepsTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.trigger, this.sx()))
}

/**
 * The step's mark: `<span kuiStepsIndicator>`, on Kirana UI's indicator (`KpStepsIndicator`). Given
 * no content it is empty, so the style draws its number, and draws a check once the step is done.
 */
@Component({
  selector: "[kuiStepsIndicator]",
  imports: [IconPlaceholder],
  hostDirectives: [KpStepsIndicator],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-indicator",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>
    @if (complete()) {
      <svg
        iconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      ></svg>
    }
  </ng-content>`,
})
class StepsIndicator {
  readonly sx = input<SxInput>()
  private readonly indicator = inject(KpStepsIndicator, { self: true })
  protected readonly complete = computed(
    () => this.indicator.state().complete === true
  )
  protected readonly part = computed(() => partSx(steps.indicator, this.sx()))
}

@Directive({
  selector: "[kuiStepsTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.title, this.sx()))
}

@Directive({
  selector: "[kuiStepsDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.description, this.sx()))
}

/** What a step shows: `<div kuiStepsContent [index]="0">`, hidden unless its step is the one shown. */
@Directive({
  selector: "[kuiStepsContent]",
  hostDirectives: [{ directive: KpStepsContent, inputs: ["index"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.content, this.sx()))
}

/** What is shown once every step is done. */
@Directive({
  selector: "[kuiStepsCompleted]",
  hostDirectives: [KpStepsCompleted],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-completed",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsCompleted {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(steps.content, this.sx()))
}

/** What the two buttons share: drawn as a Button, its text trimmed as a Button's. */
@Directive()
abstract class StepsNavigation {
  abstract readonly variant: () => ButtonVariants["variant"]
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/** Goes to the step before: `<button kuiStepsPrevious>`, an outline Button. */
@Directive({
  selector: "button[kuiStepsPrevious]",
  hostDirectives: [KpStepsPrevious],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-previous",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsPrevious extends StepsNavigation {
  readonly variant = input<ButtonVariants["variant"]>("outline")
}

/** Goes to the step after, and from the last to every step done: `<button kuiStepsNext>`, a Button. */
@Directive({
  selector: "button[kuiStepsNext]",
  hostDirectives: [KpStepsNext],
  providers: [provideSxPart()],
  host: {
    "data-slot": "steps-next",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class StepsNext extends StepsNavigation {
  readonly variant = input<ButtonVariants["variant"]>("default")
}

export {
  Steps,
  StepsCompleted,
  StepsContent,
  StepsDescription,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNext,
  StepsPrevious,
  StepsSeparator,
  StepsTitle,
  StepsTrigger,
}
