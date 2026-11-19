import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

@Component({
  selector: "breadcrumb-separator",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <nav kuiBreadcrumb>
        <ol kuiBreadcrumbList>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="/">Home</a>
          </li>
          <li kuiBreadcrumbSeparator>
            <svg
              iconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            ></svg>
          </li>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="/components">Components</a>
          </li>
          <li kuiBreadcrumbSeparator>
            <svg
              iconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            ></svg>
          </li>
          <li kuiBreadcrumbItem>
            <span kuiBreadcrumbPage>Breadcrumb</span>
          </li>
        </ol>
      </nav>
    </div>
  `,
})
export default class BreadcrumbSeparatorExample {
  protected readonly page = page
}
