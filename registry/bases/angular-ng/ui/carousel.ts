import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import EmblaCarousel from "embla-carousel"
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { carousel } from "../../../styles/carousel.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>
export type CarouselApi = EmblaCarouselType

/** One carousel's Embla instance and what its arrows read. */
class CarouselState {
  readonly api = signal<EmblaCarouselType | null>(null)
  readonly orientation = signal<"horizontal" | "vertical">("horizontal")
  readonly canScrollPrev = signal(false)
  readonly canScrollNext = signal(false)

  update() {
    const api = this.api()
    this.canScrollPrev.set(api?.canScrollPrev() ?? false)
    this.canScrollNext.set(api?.canScrollNext() ?? false)
  }
}

const CAROUSEL = new InjectionToken<CarouselState>("kui carousel")

/**
 * A carousel: `<div kuiCarousel [opts]="{ loop: true }">` around its content and arrows, on
 * Embla's core (`embla-carousel`), as React's is on its binding. `setApi` gives the Embla instance;
 * the left and right arrow keys move it.
 */
@Directive({
  selector: "[kuiCarousel]",
  providers: [
    provideSxPart(),
    { provide: CAROUSEL, useFactory: () => new CarouselState() },
  ],
  host: {
    "data-slot": "carousel",
    role: "region",
    "aria-roledescription": "carousel",
    "[class]": "part().class",
    "[style]": "part().style",
    "(keydown.capture)": "keydown($event)",
  },
})
class Carousel {
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly opts = input<EmblaOptionsType>()
  readonly plugins = input<EmblaPluginType[]>()
  readonly sx = input<SxInput>()
  readonly setApi = output<EmblaCarouselType>()
  protected readonly state = inject(CAROUSEL)
  protected readonly part = computed(() => partSx(carousel.root, this.sx()))

  protected keydown(event: Event) {
    if (!(event instanceof KeyboardEvent)) return
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      this.state.api()?.scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      this.state.api()?.scrollNext()
    }
  }
}

/** Its viewport, which Embla moves, and the track of slides inside it. */
@Component({
  selector: "[kuiCarouselContent]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "carousel-content",
    "[class]": "viewport",
  },
  template: `<div [sx]="track()"><ng-content /></div>`,
})
class CarouselContent {
  readonly sx = input<SxInput>()
  protected readonly state = inject(CAROUSEL)
  protected readonly viewport = partSx(carousel.viewport, undefined).class
  protected readonly track = computed(
    () =>
      [
        this.state.orientation() === "horizontal"
          ? carousel.content
          : carousel.contentVertical,
        this.sx(),
      ] as SxInput
  )

  constructor() {
    const root = inject(Carousel)
    const viewport = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const destroy = inject(DestroyRef)
    this.state.orientation.set(root.orientation())
    afterNextRender(() => {
      const orientation = root.orientation()
      this.state.orientation.set(orientation)
      const api = EmblaCarousel(
        viewport,
        { ...root.opts(), axis: orientation === "horizontal" ? "x" : "y" },
        root.plugins()
      )
      const update = () => this.state.update()
      api.on("reInit", update)
      api.on("select", update)
      this.state.api.set(api)
      update()
      root.setApi.emit(api)
      destroy.onDestroy(() => api.destroy())
    })
  }
}

/** One slide. */
@Directive({
  selector: "[kuiCarouselItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "carousel-item",
    role: "group",
    "aria-roledescription": "slide",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CarouselItem {
  readonly sx = input<SxInput>()
  protected readonly state = inject(CAROUSEL)
  protected readonly part = computed(() =>
    partSx(
      this.state.orientation() === "horizontal"
        ? carousel.item
        : carousel.itemVertical,
      this.sx()
    )
  )
}

/** The arrow to the slide before, drawn as a Button (`outline`, `icon-sm`). */
@Component({
  selector: "button[kuiCarouselPrevious]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "carousel-previous",
    type: "button",
    "[disabled]": "!state.canScrollPrev()",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "state.api()?.scrollPrev()",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="ChevronLeftIcon"
      tabler="IconChevronLeft"
      hugeicons="ArrowLeft01Icon"
      phosphor="CaretLeftIcon"
      remixicon="RiArrowLeftSLine"
      [sx]="flip"
    ></svg>
    <span [sx]="hidden">Previous slide</span>
  `,
})
class CarouselPrevious {
  readonly variant = input<ButtonVariants["variant"]>("outline")
  readonly size = input<ButtonVariants["size"]>("icon-sm")
  readonly sx = input<SxInput>()
  protected readonly state = inject(CAROUSEL)
  protected readonly flip = carousel.flip
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(
      [
        button({ variant: this.variant(), size: this.size() }),
        this.state.orientation() === "horizontal"
          ? carousel.previous
          : carousel.previousVertical,
      ],
      this.sx()
    )
  )
}

/** The arrow to the slide after. */
@Component({
  selector: "button[kuiCarouselNext]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "carousel-next",
    type: "button",
    "[disabled]": "!state.canScrollNext()",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "state.api()?.scrollNext()",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      [sx]="flip"
    ></svg>
    <span [sx]="hidden">Next slide</span>
  `,
})
class CarouselNext {
  readonly variant = input<ButtonVariants["variant"]>("outline")
  readonly size = input<ButtonVariants["size"]>("icon-sm")
  readonly sx = input<SxInput>()
  protected readonly state = inject(CAROUSEL)
  protected readonly flip = carousel.flip
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(
      [
        button({ variant: this.variant(), size: this.size() }),
        this.state.orientation() === "horizontal"
          ? carousel.next
          : carousel.nextVertical,
      ],
      this.sx()
    )
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
}
