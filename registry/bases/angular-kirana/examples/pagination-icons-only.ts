import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: { "*": null, base: space[4] },
  }),
  fit: css({ width: "fit-content" }),
  w20: css({ width: { "*": null, base: space[20] } }),
  mx0WAuto: css({ marginInline: space[0], width: "auto" }),
}

@Component({
  selector: "pagination-icons-only",
  imports: [
    Field,
    FieldLabel,
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexItemsCenterJustifyBe">
        <div kuiField orientation="horizontal" [sx]="styles.fit">
          <label kuiFieldLabel for="select-rows-per-page">Rows per page</label>
          <ng-container kuiSelect defaultValue="25">
            <button
              kuiSelectTrigger
              [sx]="styles.w20"
              id="select-rows-per-page"
            >
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent align="start">
              <div kuiSelectGroup>
                <div kuiSelectItem value="10">10</div>
                <div kuiSelectItem value="25">25</div>
                <div kuiSelectItem value="50">50</div>
                <div kuiSelectItem value="100">100</div>
              </div>
            </div>
          </ng-container>
        </div>
        <nav kuiPagination [sx]="styles.mx0WAuto">
          <ul kuiPaginationContent>
            <li kuiPaginationItem>
              <a kuiPaginationPrevious href="#"></a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationNext href="#"></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
})
export default class PaginationIconsOnly {
  protected readonly styles = styles
  protected readonly page = page
}
