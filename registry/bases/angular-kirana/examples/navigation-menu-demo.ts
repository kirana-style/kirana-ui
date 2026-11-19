import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { ListItem } from "../components/navigation-menu-demo/list-item"

const styles = {
  w96: css({ width: { "*": null, base: space[96] } }),
  mdFlex: css({ display: { base: "none", [breakpoint.md]: "flex" } }),
  componentsGrid: css({
    display: "grid",
    width: {
      base: "400px",
      [breakpoint.md]: "500px",
      [breakpoint.lg]: "600px",
    },
    gap: space[2],
    gridTemplateColumns: { [breakpoint.md]: "repeat(2, minmax(0, 1fr))" },
  }),
  grid200: css({ display: "grid", width: "200px" }),
  rowCenter2: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
  }),
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

@Component({
  selector: "navigation-menu-demo",
  imports: [
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <nav kuiNavigationMenu>
        <ul kuiNavigationMenuList>
          <li kuiNavigationMenuItem>
            <button kuiNavigationMenuTrigger>Getting started</button>
            <div kuiNavigationMenuContent>
              <ul [sx]="styles.w96">
                <kui-list-item href="/docs" title="Introduction">
                  Re-usable components built with Kirana.
                </kui-list-item>
                <kui-list-item href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </kui-list-item>
                <kui-list-item
                  href="/docs/primitives/typography"
                  title="Typography"
                >
                  Styles for headings, paragraphs, lists...etc
                </kui-list-item>
              </ul>
            </div>
          </li>
          <li kuiNavigationMenuItem [sx]="styles.mdFlex">
            <button kuiNavigationMenuTrigger>Components</button>
            <div kuiNavigationMenuContent>
              <ul [sx]="styles.componentsGrid">
                @for (component of components; track component.title) {
                  <kui-list-item
                    [title]="component.title"
                    [href]="component.href"
                  >
                    {{ component.description }}
                  </kui-list-item>
                }
              </ul>
            </div>
          </li>
          <li kuiNavigationMenuItem>
            <button kuiNavigationMenuTrigger>With Icon</button>
            <div kuiNavigationMenuContent>
              <ul [sx]="styles.grid200">
                <li>
                  <a kuiNavigationMenuLink [sx]="styles.rowCenter2" href="#">
                    <svg
                      iconPlaceholder
                      lucide="CircleAlertIcon"
                      tabler="IconExclamationCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningCircleIcon"
                      remixicon="RiErrorWarningLine"
                    ></svg>
                    Backlog
                  </a>
                  <a kuiNavigationMenuLink [sx]="styles.rowCenter2" href="#">
                    <svg
                      iconPlaceholder
                      lucide="CircleDashedIcon"
                      tabler="IconCircleDashed"
                      hugeicons="DashedLineCircleIcon"
                      phosphor="CircleDashedIcon"
                      remixicon="RiLoaderLine"
                    ></svg>
                    To Do
                  </a>
                  <a kuiNavigationMenuLink [sx]="styles.rowCenter2" href="#">
                    <svg
                      iconPlaceholder
                      lucide="CircleCheckIcon"
                      tabler="IconCircleCheckFilled"
                      hugeicons="CheckmarkCircle01Icon"
                      phosphor="CheckCircleIcon"
                      remixicon="RiCheckboxCircleFill"
                    ></svg>
                    Done
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li kuiNavigationMenuItem>
            <a
              kuiNavigationMenuLink
              [sx]="navigationMenuTriggerStyle"
              href="/docs"
              >Docs</a
            >
          </li>
        </ul>
      </nav>
    </div>
  `,
})
export default class NavigationMenuDemo {
  protected readonly styles = styles
  protected readonly components = components
  protected readonly navigationMenuTriggerStyle = navigationMenuTriggerStyle
  protected readonly page = page
}
