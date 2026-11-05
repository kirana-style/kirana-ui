import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Field, FieldLabel } from "../ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
  selector: "pagination-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldLabel,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
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
    <div kuiExampleWrapper>
      <!-- PaginationBasic -->
      <div kuiExample title="Basic">
        <nav kuiPagination>
          <ul kuiPaginationContent>
            <li kuiPaginationItem>
              <a kuiPaginationPrevious href="#"></a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">1</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#" isActive>2</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">3</a>
            </li>
            <li kuiPaginationItem>
              <span kuiPaginationEllipsis></span>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationNext href="#"></a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- PaginationSimple -->
      <div kuiExample title="Simple">
        <nav kuiPagination>
          <ul kuiPaginationContent>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">1</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#" isActive>2</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">3</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">4</a>
            </li>
            <li kuiPaginationItem>
              <a kuiPaginationLink href="#">5</a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- PaginationIconsOnly -->
      <div kuiExample title="With Select">
        <div [sx]="styles.flexItemsCenterJustifyBe">
          <div kuiField orientation="horizontal" [sx]="styles.fit">
            <label kuiFieldLabel for="select-rows-per-page"
              >Rows per page</label
            >
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
    </div>
  `,
})
export default class PaginationExample {
  protected readonly styles = styles
}
