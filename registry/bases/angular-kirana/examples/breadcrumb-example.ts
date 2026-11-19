import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  breadcrumbBasicExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  breadcrumbWithDropdownExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  breadcrumbWithDropdownSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  breadcrumbWithLinkExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
}

@Component({
  selector: "breadcrumb-example",
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
    DropdownMenuItem,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- BreadcrumbBasic -->
      <div kuiExample title="Basic" [sx]="styles.breadcrumbBasicExample">
        <nav kuiBreadcrumb>
          <ol kuiBreadcrumbList>
            <li kuiBreadcrumbItem>
              <a kuiBreadcrumbLink href="#">Home</a>
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
      <!-- BreadcrumbWithDropdown -->
      <div
        kuiExample
        title="With Dropdown"
        [sx]="styles.breadcrumbWithDropdownExample"
      >
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
                  <span [sx]="styles.breadcrumbWithDropdownSpan"
                    >Toggle menu</span
                  >
                </button>
                <div kuiDropdownMenuContent align="start">
                  <div kuiDropdownMenuItem>Documentation</div>
                  <div kuiDropdownMenuItem>Themes</div>
                  <div kuiDropdownMenuItem>GitHub</div>
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
      <!-- BreadcrumbWithLink -->
      <div kuiExample title="With Link" [sx]="styles.breadcrumbWithLinkExample">
        <nav kuiBreadcrumb>
          <ol kuiBreadcrumbList>
            <li kuiBreadcrumbItem>
              <a kuiBreadcrumbLink href="#">Home</a>
            </li>
            <li kuiBreadcrumbSeparator></li>
            <li kuiBreadcrumbItem>
              <span kuiBreadcrumbEllipsis></span>
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
    </div>
  `,
})
export default class BreadcrumbExample {
  protected readonly styles = styles
}
