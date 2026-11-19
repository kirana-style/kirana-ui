import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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
import { Calendars } from "./calendars"
import { DatePicker } from "./date-picker"
import { NavUser } from "./nav-user"

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

@Component({
  selector: "kui-sidebar-right",
  imports: [
    Calendars,
    DatePicker,
    NavUser,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiSidebar collapsible="none" [sx]="styles.sidebarRightSidebar">
      <div kuiSidebarHeader [sx]="styles.sidebarHeader">
        <kui-nav-user [user]="data.user" />
      </div>
      <div kuiSidebarContent>
        <kui-date-picker />
        <div kuiSidebarSeparator [sx]="styles.sidebarSeparator"></div>
        <kui-calendars [calendars]="data.calendars" />
      </div>
      <div kuiSidebarFooter>
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem>
            <button kuiSidebarMenuButton>
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
              <span>New Calendar</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class SidebarRight {
  protected readonly styles = styles
  protected readonly data = data
}
