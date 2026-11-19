import { Component, Directive, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"

import { breadcrumb } from "../../../styles/breadcrumb.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

@Directive({
  selector: "[kuiBreadcrumb]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb",
    "aria-label": "breadcrumb",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Breadcrumb {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(this.sx(), this.sx()))
}

@Component({
  selector: "[kuiBreadcrumbEllipsis]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "aria-hidden": "true",
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
    <span [sx]="visuallyHidden">More</span>
  `,
})
class BreadcrumbEllipsis {
  readonly sx = input<SxInput>()
  protected readonly visuallyHidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(breadcrumb.ellipsis, this.sx())
  )
}

@Directive({
  selector: "[kuiBreadcrumbItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BreadcrumbItem {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(breadcrumb.item, this.sx()))
}

@Directive({
  selector: "[kuiBreadcrumbLink]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-link",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BreadcrumbLink {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(breadcrumb.link, this.sx()))
}

@Directive({
  selector: "[kuiBreadcrumbList]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BreadcrumbList {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(breadcrumb.list, this.sx()))
}

@Directive({
  selector: "[kuiBreadcrumbPage]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class BreadcrumbPage {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(breadcrumb.page, this.sx()))
}

/** Its content, or a chevron when it has none (`<ng-content>`'s fallback). */
@Component({
  selector: "[kuiBreadcrumbSeparator]",
  imports: [IconPlaceholder],
  providers: [provideSxPart()],
  host: {
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <svg
        iconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      ></svg>
    </ng-content>
  `,
})
class BreadcrumbSeparator {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(breadcrumb.separator, this.sx())
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
