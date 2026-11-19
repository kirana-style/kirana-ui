import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      previous: "Previous",
      next: "Next",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      previous: "السابق",
      next: "التالي",
    },
  },
  he: {
    dir: "rtl",
    values: {
      previous: "הקודם",
      next: "הבא",
    },
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

@Component({
  selector: "pagination-rtl",
  imports: [
    DirectionProvider,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <nav kuiPagination [attr.dir]="dir()">
          <ul kuiPaginationContent>
            <li kuiPaginationItem>
              <a kuiPaginationPrevious href="#" [text]="t().previous"></a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">{{ formatNumber(1) }}</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#" isActive>{{ formatNumber(2) }}</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">{{ formatNumber(3) }}</a>
            </li>
            <li kuiPaginationItem>
              <span kuiPaginationEllipsis></span>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationNext href="#" [text]="t().next"></a>
            </li>
          </ul>
        </nav>
      </div>
    </ng-container>
  `,
})
export default class PaginationRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly formatNumber = (num: number): string => {
    if (this.language() === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  protected readonly page = page
}
