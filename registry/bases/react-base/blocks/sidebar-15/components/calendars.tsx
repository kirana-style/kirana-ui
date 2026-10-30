"use client"

import * as React from "react"

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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, select, props as styleProps } from "@kirana-style/core"
import {
  OPEN,
  collapsibleScope,
} from "../../../../../styles/collapsible.styles"
import { theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"

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
    // Tailwind's `rounded-xs`, outside the radius scale.
    borderRadius: "0.125rem",
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[4],
    height: space[4],
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
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

export function Calendars({
  calendars,
}: {
  calendars: {
    name: string
    items: string[]
  }[]
}) {
  return (
    <>
      {calendars.map((calendar, index) => (
        <React.Fragment key={calendar.name}>
          <SidebarGroup key={calendar.name}>
            <Collapsible defaultOpen={index === 0} sx={collapsibleScope.anchor}>
              <SidebarGroupLabel
                sx={styles.sidebarGroupLabel}
                render={<CollapsibleTrigger />}
              >
                {calendar.name}{" "}
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                  {...styleProps(styles.iconPlaceholder)}
                />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {calendar.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={item}>
                        <SidebarMenuButton>
                          <div
                            data-active={itemIndex < 2}
                            sx={styles.calendarsDiv}
                          >
                            <IconPlaceholder
                              lucide="CheckIcon"
                              tabler="IconCheck"
                              hugeicons="Tick02Icon"
                              phosphor="CheckIcon"
                              remixicon="RiCheckLine"
                              {...styleProps(styles.iconPlaceholder2)}
                            />
                          </div>
                          {item}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator sx={styles.sidebarSeparator} />
        </React.Fragment>
      ))}
    </>
  )
}
