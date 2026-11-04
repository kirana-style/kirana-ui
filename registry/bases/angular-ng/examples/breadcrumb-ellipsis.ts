import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

@Component({
  selector: "breadcrumb-ellipsis",
  imports: [
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <nav kuiBreadcrumb>
        <ol kuiBreadcrumbList>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="/">Home</a>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <span kuiBreadcrumbEllipsis></span>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="/docs/components">Components</a>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <span kuiBreadcrumbPage>Breadcrumb</span>
          </li>
        </ol>
      </nav>
    </div>
  `,
})
export default class BreadcrumbEllipsisExample {
  protected readonly page = page
}
