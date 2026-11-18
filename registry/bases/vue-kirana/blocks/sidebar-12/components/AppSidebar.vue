<script setup lang="ts">
import Calendars from "./Calendars.vue"
import DatePicker from "./DatePicker.vue"
import NavUser from "./NavUser.vue"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "../../../ui/sidebar"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
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

<template>
  <Sidebar>
    <SidebarHeader :sx="styles.sidebarHeader">
      <NavUser :user="data.user" />
    </SidebarHeader>
    <SidebarContent>
      <DatePicker />
      <SidebarSeparator :sx="styles.sidebarSeparator" />
      <Calendars :calendars="data.calendars" />
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
            <span> New Calendar </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
