import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"

@Component({
  selector: "pagination-demo",
  imports: [
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
    <div [sx]="page.example">
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
  `,
})
export default class PaginationDemo {
  protected readonly page = page
}
