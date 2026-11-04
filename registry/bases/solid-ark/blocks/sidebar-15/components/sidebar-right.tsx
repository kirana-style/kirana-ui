import { Calendars } from "./calendars"
import { DatePicker } from "./date-picker"
import { NavUser } from "./nav-user"
import { splitProps } from "solid-js"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export function SidebarRight(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  const styles = {
    sidebarRightSidebar: css({
      position: { "*": null, base: "sticky" },
      top: { "*": null, base: space["0"] },
      display: { "*": null, base: "none", [breakpoint.lg]: "flex" },
      height: { "*": null, base: "100svh" },
      borderLeftWidth: { "*": null, base: "1px" },
      // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
      borderLeftColor: theme.border,
      borderStyle: { "*": null, base: "solid" },
    }),
    sidebarHeader: css({
      height: { "*": null, base: space[16] },
      borderBottomWidth: { "*": null, base: "1px" },
      borderStyle: { "*": null, base: "solid" },
      borderColor: theme.sidebarBorder,
    }),
    sidebarSeparator: css({
      marginInline: { "*": null, base: space["0"] },
    }),
  }

  const data = {
    user: {
      name: "kirana",
      email: "m@example.com",
      avatar: "/avatars/kirana.png",
    },
    calendars: [
      {
        name: "My Calendars",
        items: ["Personal", "Work", "Family"],
      },
      {
        name: "Favorites",
        items: ["Holidays", "Birthdays"],
      },
      {
        name: "Other",
        items: ["Travel", "Reminders", "Deadlines"],
      },
    ],
  }

  return (
    <Sidebar
      collapsible="none"
      class={local.class}
      sx={[styles.sidebarRightSidebar, local.sx]}
      {...rest}
    >
      <SidebarHeader sx={styles.sidebarHeader}>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator sx={styles.sidebarSeparator} />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
