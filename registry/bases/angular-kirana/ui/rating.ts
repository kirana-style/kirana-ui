import {
  Component,
  Directive,
  TemplateRef,
  computed,
  contentChild,
  input,
} from "@angular/core"
import { NgTemplateOutlet } from "@angular/common"
import { KpRating, KpRatingItem, KpRatingItems } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { rating, ratingItem } from "../../../styles/rating.styles"

type RatingVariants = NonNullable<Parameters<typeof rating>[0]>

/**
 * The stars, one from 1 to `count`: `<span *kuiRatingItems="let place" kuiRatingItem
 * [place]="place">`, Kirana UI's structural part (`KpRatingItems`), which draws its element once
 * for each place.
 */
@Directive({
  selector: "[kuiRatingItems]",
  hostDirectives: [KpRatingItems],
})
class RatingItems {
  static ngTemplateContextGuard(
    _directive: RatingItems,
    _context: unknown
  ): _context is { $implicit: number } {
    return true
  }
}

/**
 * One star, at `place`: `<span kuiRatingItem [place]="place">`, on Kirana UI's item
 * (`KpRatingItem`). Its icon, a star by default, is drawn twice: empty, and filled over it, whole or
 * by half. Angular projects content once, so another icon is given as an `<ng-template>` inside it,
 * which is drawn in both places, where React draws its `children` twice.
 */
@Component({
  selector: "[kuiRatingItem]",
  imports: [IconPlaceholder, NgTemplateOutlet, SxDirective],
  hostDirectives: [{ directive: KpRatingItem, inputs: ["place"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "rating-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-container *ngTemplateOutlet="icon() ?? star" /><span
      data-slot="rating-item-fill"
      aria-hidden="true"
      [sx]="fill"
      ><ng-container *ngTemplateOutlet="icon() ?? star" /></span
    ><ng-template #star
      ><svg
        iconPlaceholder
        lucide="StarIcon"
        tabler="IconStar"
        hugeicons="StarIcon"
        phosphor="StarIcon"
        remixicon="RiStarLine"
      ></svg
    ></ng-template>`,
})
class RatingItem {
  readonly sx = input<SxInput>()
  protected readonly icon = contentChild(TemplateRef)
  protected readonly fill = ratingItem.fill
  protected readonly part = computed(() => partSx(ratingItem.item, this.sx()))
}

/**
 * A score from a row of stars: `<div kuiRating [(value)]="score" aria-label="…">`, on Kirana UI's
 * rating (`KpRating`), its `[(value)]`, `defaultValue`, `count`, `allowHalf`, `disabled`,
 * `readOnly`, `required`, `name` and `form` the primitive's, `(valueChanged)` the change with its
 * details and `(hoverChanged)` the value under the pointer. It draws a star for each place unless
 * given content, and the hidden input a form reads as its last child.
 */
@Component({
  selector: "[kuiRating]",
  imports: [KpRatingItems, RatingItem],
  hostDirectives: [
    {
      directive: KpRating,
      inputs: [
        "value",
        "defaultValue",
        "count",
        "allowHalf",
        "disabled",
        "readOnly",
        "required",
        "name",
        "form",
      ],
      outputs: ["valueChange", "valueChanged", "hoverChanged"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "rating",
    "[attr.data-size]": "size()",
    // The primitive's: Angular leaves the caller's static attributes on this element too.
    "[attr.name]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.form]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content
    ><span *kpRatingItems="let place" kuiRatingItem [place]="place"></span
  ></ng-content>`,
})
class Rating {
  readonly size = input<RatingVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(rating({ size: this.size() }), this.sx())
  )
}

export { Rating, RatingItem, RatingItems, rating as ratingVariants }
export type { RatingVariants }
