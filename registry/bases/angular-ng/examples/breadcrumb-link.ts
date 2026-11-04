import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

@Component({
  selector: "breadcrumb-link",
  imports: [
    Breadcrumb,
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
            <a kuiBreadcrumbLink href="#link-component">Home</a>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="#link-component">Components</a>
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
export default class BreadcrumbLinkExample {
  protected readonly page = page
}
