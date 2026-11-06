import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import {
  OPEN,
  collapsibleScope,
} from "../../../../../styles/collapsible.styles"
import { radius, theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../../../ui/sidebar"

const styles = {
  sidebarGroupLabel: css({
    width: "100%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
  }),
  iconPlaceholder: css({
    marginLeft: "auto",
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [OPEN.base]: "90deg" },
  }),
  calendarsDiv: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[4],
    height: space[4],
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    borderWidth: "1px",
    borderColor: {
      base: theme.sidebarBorder,
      '[data-active="true"]': theme.sidebarPrimary,
    },
    color: theme.sidebarPrimaryForeground,
    backgroundColor: { '[data-active="true"]': theme.sidebarPrimary },
    // Its check, shown while the calendar is chosen (upstream's `group/calendar-item`).
    [select.child("svg")]: {
      display: { base: "none", '[data-active="true"]': "block" },
    },
  }),
  iconPlaceholder2: css({
    width: space[3],
    height: space[3],
  }),
  sidebarSeparator: css({
    marginInline: { "*": null, base: space["0"] },
  }),
}

@Component({
  selector: "kui-calendars",
  imports: [
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @for (calendar of calendars(); track calendar.name; let index = $index) {
      <div kuiSidebarGroup>
        <div
          kuiCollapsible
          [defaultOpen]="index === 0"
          [sx]="collapsibleAnchor"
        >
          <button
            kuiCollapsibleTrigger
            kuiSidebarGroupLabel
            dataSlot="sidebar-group-label"
            [sx]="styles.sidebarGroupLabel"
          >
            {{ calendar.name }}
            {{ " " }}
            <svg
              iconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              [sx]="styles.iconPlaceholder"
            ></svg>
          </button>
          <div kuiCollapsibleContent>
            <div kuiSidebarGroupContent>
              <ul kuiSidebarMenu>
                @for (
                  item of calendar.items;
                  track item;
                  let itemIndex = $index
                ) {
                  <li kuiSidebarMenuItem>
                    <button kuiSidebarMenuButton>
                      <div
                        [attr.data-active]="itemIndex < 2"
                        [sx]="styles.calendarsDiv"
                      >
                        <svg
                          iconPlaceholder
                          lucide="CheckIcon"
                          tabler="IconCheck"
                          hugeicons="Tick02Icon"
                          phosphor="CheckIcon"
                          remixicon="RiCheckLine"
                          [sx]="styles.iconPlaceholder2"
                        ></svg>
                      </div>
                      {{ item }}
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div kuiSidebarSeparator [sx]="styles.sidebarSeparator"></div>
    }
  `,
})
export class Calendars {
  readonly calendars = input.required<
    {
      name: string
      items: string[]
    }[]
  >()
  protected readonly styles = styles
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
