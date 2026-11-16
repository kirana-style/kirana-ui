import { NavigationMenu } from "@kirana-ui/react/navigation-menu"

import type { Styles } from "../../styled.ts"

const products = [
  {
    href: "#analytics",
    title: "Analytics",
    text: "See how people use your site.",
  },
  {
    href: "#automations",
    title: "Automations",
    text: "Run the routine work on a schedule.",
  },
  {
    href: "#reports",
    title: "Reports",
    text: "Share the numbers with your team.",
  },
]

const docs = [
  {
    href: "#getting-started",
    title: "Getting started",
    text: "Set up a project in five minutes.",
  },
  {
    href: "#api",
    title: "API reference",
    text: "Every endpoint, with examples.",
  },
]

export default function Demo({
  s,
}: {
  s: Styles<
    | "list"
    | "trigger"
    | "icon"
    | "link"
    | "popup"
    | "content"
    | "card"
    | "cardTitle"
    | "cardText"
  >
}) {
  return (
    <NavigationMenu.Root aria-label="Main">
      <NavigationMenu.List {...s.list}>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger {...s.trigger}>
            Products
            <NavigationMenu.Icon {...s.icon}>▾</NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content {...s.content}>
            {products.map((product) => (
              <NavigationMenu.Link
                key={product.href}
                href={product.href}
                {...s.card}
              >
                <span {...s.cardTitle}>{product.title}</span>
                <span {...s.cardText}>{product.text}</span>
              </NavigationMenu.Link>
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger {...s.trigger}>
            Docs
            <NavigationMenu.Icon {...s.icon}>▾</NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content {...s.content}>
            {docs.map((page) => (
              <NavigationMenu.Link key={page.href} href={page.href} {...s.card}>
                <span {...s.cardTitle}>{page.title}</span>
                <span {...s.cardText}>{page.text}</span>
              </NavigationMenu.Link>
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#pricing" {...s.link}>
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={8} align="start">
          <NavigationMenu.Popup {...s.popup}>
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  )
}
