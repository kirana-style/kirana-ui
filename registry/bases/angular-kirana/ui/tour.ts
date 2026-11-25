import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from "@angular/core"
import {
  KpTour,
  KpTourArrow,
  KpTourClose,
  KpTourDescription,
  KpTourNext,
  KpTourPopup,
  KpTourPortal,
  KpTourPositioner,
  KpTourPrevious,
  KpTourSpotlight,
  KpTourTitle,
} from "@kirana-ui/angular"
import type {
  Align,
  Side,
  TourShownStep,
  TourStep as TourStepPrimitive,
} from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import { tour } from "../../../styles/tour.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { buttonLabels } from "./button"

/** A step: the primitive's (`id`, `target`, `side`, `align`), with what `TourContent` draws by itself. */
type TourStep = TourStepPrimitive & {
  title?: string
  description?: string
}

/**
 * The root: `<ng-container kuiTour [steps]="steps" [(open)]="touring">`, Kirana UI's (`KpTour`),
 * drawing nothing: its `steps`, `[(open)]`, `defaultOpen`, `[(step)]`, `defaultStep`,
 * `waitForTarget`, `spotlightPadding`, `closeOnOutsidePress`, `interactive` and
 * `keyboardNavigation` are the primitive's, `(openChanged)` and `(stepChanged)` its outputs.
 */
@Directive({
  selector: "[kuiTour]",
  hostDirectives: [
    {
      directive: KpTour,
      inputs: [
        "steps",
        "open",
        "defaultOpen",
        "step",
        "defaultStep",
        "waitForTarget",
        "spotlightPadding",
        "closeOnOutsidePress",
        "interactive",
        "keyboardNavigation",
      ],
      outputs: ["openChange", "stepChange", "openChanged", "stepChanged"],
    },
  ],
})
class Tour {}

/** The step a `TourContent` shows, for the parts inside its popup: its progress and its next button's label. */
class TourShown {
  readonly step = signal<TourShownStep | null>(null)
}

/** Hands the step the popup's template is given to the parts inside it. */
@Directive({ selector: "[kuiTourShownStep]" })
class TourShownStepSink {
  readonly kuiTourShownStep = input.required<TourShownStep>()

  constructor() {
    const shown = inject(TourShown)
    effect(() => shown.step.set(this.kuiTourShownStep()))
  }
}

@Directive({
  selector: "[kuiTourHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TourHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([popover.header, tour.header], this.sx())
  )
}

/** The heading that names the step: `<h2 kuiTourTitle>`. */
@Directive({
  selector: "h2[kuiTourTitle]",
  hostDirectives: [KpTourTitle],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TourTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(popover.title, this.sx()))
}

/** The text that describes the step: `<p kuiTourDescription>`. */
@Directive({
  selector: "p[kuiTourDescription]",
  hostDirectives: [KpTourDescription],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TourDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(popover.description, this.sx())
  )
}

@Directive({
  selector: "[kuiTourFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TourFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tour.footer, this.sx()))
}

/** The step's place in the tour, "1 of 3", unless given content: `<span kuiTourProgress>`. */
@Component({
  selector: "[kuiTourProgress]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-progress",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>{{ text() }}</ng-content>`,
})
class TourProgress {
  readonly sx = input<SxInput>()
  private readonly shown = inject(TourShown, { optional: true })
  protected readonly text = computed(() => {
    const step = this.shown?.step()
    return step ? `${step.current} of ${step.total}` : ""
  })
  protected readonly part = computed(() => partSx(tour.progress, this.sx()))
}

/** An outline Button that goes back a step, "Back" unless given content: `<button kuiTourPrevious>`. */
@Component({
  selector: "button[kuiTourPrevious]",
  hostDirectives: [KpTourPrevious],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-previous",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>Back</ng-content>`,
})
class TourPrevious {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [button({ variant: "outline", size: "sm" }), tour.previous],
      this.sx()
    )
  )

  constructor() {
    buttonLabels()
  }
}

/**
 * A Button that goes on a step, "Next", or "Done" on the last step, unless given content:
 * `<button kuiTourNext>`.
 */
@Component({
  selector: "button[kuiTourNext]",
  hostDirectives: [KpTourNext],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-next",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>{{ label() }}</ng-content>`,
})
class TourNext {
  readonly sx = input<SxInput>()
  private readonly shown = inject(TourShown, { optional: true })
  protected readonly label = computed(() => {
    const step = this.shown?.step()
    return step != null && step.current === step.total ? "Done" : "Next"
  })
  protected readonly part = computed(() =>
    partSx(button({ size: "sm" }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/** A ghost icon Button in the popup's corner that ends the tour: `<button kuiTourClose>`. */
@Component({
  selector: "button[kuiTourClose]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KpTourClose],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tour-close",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <svg
        iconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      ></svg>
      <span [sx]="hidden">Close</span>
    </ng-content>
  `,
})
class TourClose {
  readonly sx = input<SxInput>()
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(
      [button({ variant: "ghost", size: "icon-sm" }), dialog.close],
      this.sx()
    )
  )

  constructor() {
    buttonLabels()
  }
}

/**
 * The spotlight over the page and the popup by the step's target: `<div kuiTourContent>`, with its
 * arrow and a close button in its corner unless `showCloseButton` is false; `side`, `align`,
 * `sideOffset` (12) and `alignOffset` (0) place it. Given no content, it draws the step's `title`
 * and `description`, its progress and the Back and Next buttons. Kirana UI's portal and popup are
 * structural, which an attribute cannot put around its own element: the content draws them in its
 * template, its children projected into the popup, and its own element stays where it was written,
 * drawing nothing. The parts inside it read the step shown from it.
 */
@Component({
  selector: "[kuiTourContent]",
  imports: [
    KpTourArrow,
    KpTourPopup,
    KpTourPortal,
    KpTourPositioner,
    KpTourSpotlight,
    TourClose,
    TourDescription,
    TourFooter,
    TourHeader,
    TourNext,
    TourPrevious,
    TourProgress,
    TourShownStepSink,
    TourTitle,
  ],
  providers: [provideSxPart(), TourShown],
  host: {
    style: "display: contents",
    // `align` is also HTML's presentational attribute (text-align), which the caller's
    // `align="end"` would leave on the element.
    "[attr.align]": "null",
  },
  template: `
    <ng-container *kpTourPortal>
      <div kpTourSpotlight data-slot="tour-spotlight" [class]="spotlight"></div>
      <div
        kpTourPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          *kpTourPopup="let shown"
          data-slot="tour-content"
          [kuiTourShownStep]="shown"
          [class]="part().class"
          [style]="part().style"
        >
          <div kpTourArrow data-slot="tour-arrow" [class]="arrow"></div>
          <ng-content>
            <div kuiTourHeader>
              <h2 kuiTourTitle>{{ stepOf(shown)?.title }}</h2>
              @if (stepOf(shown)?.description != null) {
                <p kuiTourDescription>{{ stepOf(shown)?.description }}</p>
              }
            </div>
            <div kuiTourFooter>
              <span kuiTourProgress></span>
              <button kuiTourPrevious></button>
              <button kuiTourNext></button>
            </div>
          </ng-content>
          @if (showCloseButton()) {
            <button kuiTourClose></button>
          }
        </div>
      </div>
    </ng-container>
  `,
})
class TourContent {
  readonly side = input<Side>()
  readonly align = input<Align>()
  readonly sideOffset = input(12, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly showCloseButton = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly spotlight = partSx(
    [backdropMotion, tour.spotlight],
    undefined
  ).class
  protected readonly positioner = partSx(popover.positioner, undefined).class
  protected readonly arrow = partSx(tour.arrow, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, popover.content, tour.content], this.sx())
  )

  /** The step shown, as this registry's `TourStep`, with its title and description. */
  protected stepOf(shown: TourShownStep): TourStep | undefined {
    return shown.step as TourStep | undefined
  }
}

export {
  Tour,
  TourClose,
  TourContent,
  TourDescription,
  TourFooter,
  TourHeader,
  TourNext,
  TourPrevious,
  TourProgress,
  TourTitle,
}
export type { TourStep }
