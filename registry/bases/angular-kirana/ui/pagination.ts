import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { pagination } from "../../../styles/pagination.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

@Directive({
  selector: "[kuiPagination]",
  providers: [provideSxPart()],
  host: {
    role: "navigation",
    "aria-label": "pagination",
    "data-slot": "pagination",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Pagination {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(pagination.root, this.sx()))
}

@Directive({
  selector: "[kuiPaginationContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "pagination-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PaginationContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(pagination.content, this.sx())
  )
}

/** The dots for pages left out. */
@Component({
  selector: "span[kuiPaginationEllipsis]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "aria-hidden": "true",
    "data-slot": "pagination-ellipsis",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="MoreHorizontalIcon"
      tabler="IconDots"
      hugeicons="MoreHorizontalCircle01Icon"
      phosphor="DotsThreeIcon"
      remixicon="RiMoreLine"
    ></svg>
    <span [sx]="visuallyHidden">More pages</span>
  `,
})
class PaginationEllipsis {
  readonly sx = input<SxInput>()
  protected readonly visuallyHidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(pagination.ellipsis, this.sx())
  )
}

@Directive({
  selector: "li[kuiPaginationItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "pagination-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PaginationItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(undefined, this.sx()))
}

/**
 * A page's link, drawn as a Button: `<a kuiPaginationLink href="#" [isActive]="true">2</a>`. Its
 * text stays bare, as React's, whose Button renders the link and passes its children on.
 */
@Directive({
  selector: "a[kuiPaginationLink]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "pagination-link",
    "[attr.aria-current]": "isActive() ? 'page' : null",
    "[attr.data-active]": "isActive() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class PaginationLink {
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly size = input<ButtonVariants["size"]>("icon")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      button({
        variant: this.isActive() ? "outline" : "ghost",
        size: this.size(),
      }),
      this.sx()
    )
  )
}

/** The link to the page before, with its chevron and `text` ("Previous"). */
@Component({
  selector: "a[kuiPaginationPrevious]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "pagination-link",
    "aria-label": "Go to previous page",
    "[attr.aria-current]": "isActive() ? 'page' : null",
    "[attr.data-active]": "isActive() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <svg
      iconPlaceholder
      lucide="ChevronLeftIcon"
      tabler="IconChevronLeft"
      hugeicons="ArrowLeft01Icon"
      phosphor="CaretLeftIcon"
      remixicon="RiArrowLeftSLine"
      data-icon="inline-start"
      [sx]="pagination.flip"
    ></svg>
    <span [sx]="pagination.text">{{ text() }}</span>
  `,
})
class PaginationPrevious {
  readonly text = input("Previous")
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly pagination = pagination
  protected readonly part = computed(() =>
    partSx(
      [
        button({
          variant: this.isActive() ? "outline" : "ghost",
          size: "default",
        }),
        pagination.previous,
      ],
      this.sx()
    )
  )
}

/** The link to the page after, with `text` ("Next") and its chevron. */
@Component({
  selector: "a[kuiPaginationNext]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "pagination-link",
    "aria-label": "Go to next page",
    "[attr.aria-current]": "isActive() ? 'page' : null",
    "[attr.data-active]": "isActive() ? 'true' : null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span [sx]="pagination.text">{{ text() }}</span>
    <svg
      iconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      data-icon="inline-end"
      [sx]="pagination.flip"
    ></svg>
  `,
})
class PaginationNext {
  readonly text = input("Next")
  readonly isActive = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly pagination = pagination
  protected readonly part = computed(() =>
    partSx(
      [
        button({
          variant: this.isActive() ? "outline" : "ghost",
          size: "default",
        }),
        pagination.next,
      ],
      this.sx()
    )
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
