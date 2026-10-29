import { css } from "@kirana-style/core"
import * as React from "react"

import { Example, ExampleWrapper } from "../components/example"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { example } from "../../../styles/example.styles"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { axes } from "../../../core/axes"
import { theme } from "../../../core/tokens"

const styles = {
  w96: css({ width: { "*": null, base: space[96] } }),
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
  listItem: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    fontSize: {
      [axes.style.nova]: fontSize.sm,
      [axes.style.vega]: fontSize.sm,
      [axes.style.lyra]: fontSize.xs,
      [axes.style.maia]: fontSize.sm,
      [axes.style.mira]: fontSize.xs,
      [axes.style.luma]: fontSize.sm,
    },
    lineHeight: {
      [axes.style.nova]: lineHeight.sm,
      [axes.style.vega]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.maia]: lineHeight.sm,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.sm,
    },
  }),
  title: css({ lineHeight: "1", fontWeight: fontWeight.medium }),
  description: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    color: theme.mutedForeground,
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

export default function NavigationMenuExample() {
  return (
    <ExampleWrapper sx={example.oneColumn}>
      <NavigationMenuBasic />
    </ExampleWrapper>
  )
}

function NavigationMenuBasic() {
  return (
    <Example title="Basic">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.w96}>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Kirana.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.componentsGrid}>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.grid200}>
                <li>
                  <NavigationMenuLink
                    render={<a href="#" />}
                    sx={styles.rowCenter2}
                  >
                    <IconPlaceholder
                      lucide="CircleAlertIcon"
                      tabler="IconExclamationCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningCircleIcon"
                      remixicon="RiErrorWarningLine"
                    />
                    Backlog
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    render={<a href="#" />}
                    sx={styles.rowCenter2}
                  >
                    <IconPlaceholder
                      lucide="CircleAlertIcon"
                      tabler="IconExclamationCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningCircleIcon"
                      remixicon="RiErrorWarningLine"
                    />
                    To Do
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    render={<a href="#" />}
                    sx={styles.rowCenter2}
                  >
                    <IconPlaceholder
                      lucide="CircleAlertIcon"
                      tabler="IconExclamationCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningCircleIcon"
                      remixicon="RiErrorWarningLine"
                    />
                    Done
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<a href="/docs" />}
              sx={navigationMenuTriggerStyle}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Example>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href} />}>
        <div sx={styles.listItem}>
          <div sx={styles.title}>{title}</div>
          <div sx={styles.description}>{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
