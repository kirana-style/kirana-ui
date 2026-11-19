import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination"

@Component({
  selector: "pagination-simple",
  imports: [
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
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
  `,
})
export default class PaginationSimple {
  protected readonly page = page
}
