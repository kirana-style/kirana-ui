<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import Calendars from "./Calendars.svelte"
  import DatePicker from "./DatePicker.svelte"
  import NavUser from "./NavUser.svelte"
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
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { theme } from "../../../../../core/tokens"
  import { breakpoint, space } from "../../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

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
</script>

<Sidebar collapsible="none" sx={[styles.sidebarRightSidebar, className as Sx]} {...rest}>
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
          <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="PlusSignIcon" phosphor="PlusIcon" remixicon="RiAddLine" />
          <span>
            New Calendar
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
