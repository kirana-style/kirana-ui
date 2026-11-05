import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "breadcrumb-demo",
  imports: [
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <nav kuiBreadcrumb>
        <ol kuiBreadcrumbList>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="#">Home</a>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                size="icon-sm"
                variant="ghost"
              >
                <span kuiBreadcrumbEllipsis></span>
                <span [sx]="visuallyHidden">Toggle menu</span>
              </button>
              <div kuiDropdownMenuContent align="start">
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>Documentation</div>
                  <div kuiDropdownMenuItem>Themes</div>
                  <div kuiDropdownMenuItem>GitHub</div>
                </div>
              </div>
            </ng-container>
          </li>
          <li kuiBreadcrumbSeparator></li>
          <li kuiBreadcrumbItem>
            <a kuiBreadcrumbLink href="#">Components</a>
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
export default class BreadcrumbDemo {
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
