"use client"

import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../../ui/breadcrumb"
import { Button } from "../../../ui/button"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { WRAPPER_COLLAPSED } from "../../../../../styles/sidebar.styles"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  containerSize,
  duration,
  space,
} from "../../../../../core/scales"

const styles = {
  settingsDialogDialog: css({
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
    maxHeight: { [breakpoint.md]: "500px" },
    maxWidth: { [breakpoint.md]: "700px", [breakpoint.lg]: "800px" },
  }),
  dialogTitle: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  dialogDescription: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  sidebarProvider: css({
    alignItems: { "*": null, base: "flex-start" },
  }),
  settingsDialogSidebar: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  settingsDialogMain: css({
    display: "flex",
    height: "480px",
    flex: "1 1 0%",
    flexDirection: "column",
    overflow: "hidden",
  }),
  settingsDialogHeader: css({
    display: "flex",
    height: { base: space[16], [WRAPPER_COLLAPSED]: space[12] },
    flexShrink: "0",
    alignItems: "center",
    gap: space[2],
    transitionProperty: "width,height",
    transitionDuration: duration[150],
    transitionTimingFunction: "linear",
  }),
  settingsDialogDiv: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[4],
  }),
  breadcrumbItem: css({
    display: { "*": null, base: "none", [breakpoint.md]: "inline-flex" },
  }),
  div2: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    gap: space[4],
    overflowY: "auto",
    padding: space[4],
    paddingTop: space["0"],
  }),
  div3: css({
    aspectRatio: "16 / 9",
    maxWidth: containerSize["3xl"],
    borderRadius: radius.xl,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
  }),
}

const data = {
  nav: [
    {
      name: "Notifications",
      icon: (
        <IconPlaceholder
          lucide="BellIcon"
          tabler="IconBell"
          hugeicons="NotificationIcon"
          phosphor="BellIcon"
          remixicon="RiNotificationLine"
        />
      ),
    },
    {
      name: "Navigation",
      icon: (
        <IconPlaceholder
          lucide="MenuIcon"
          tabler="IconMenu"
          hugeicons="Menu09Icon"
          phosphor="ListIcon"
          remixicon="RiMenuLine"
        />
      ),
    },
    {
      name: "Home",
      icon: (
        <IconPlaceholder
          lucide="HomeIcon"
          tabler="IconHome"
          hugeicons="HomeIcon"
          phosphor="HouseIcon"
          remixicon="RiHomeLine"
        />
      ),
    },
    {
      name: "Appearance",
      icon: (
        <IconPlaceholder
          lucide="PaintbrushIcon"
          tabler="IconPalette"
          hugeicons="PaintBoardIcon"
          phosphor="PaletteIcon"
          remixicon="RiPaletteLine"
        />
      ),
    },
    {
      name: "Messages & media",
      icon: (
        <IconPlaceholder
          lucide="MessageCircleIcon"
          tabler="IconMessageQuestion"
          hugeicons="MessageIcon"
          phosphor="ChatCircleIcon"
          remixicon="RiChat1Line"
        />
      ),
    },
    {
      name: "Language & region",
      icon: (
        <IconPlaceholder
          lucide="GlobeIcon"
          tabler="IconWorld"
          hugeicons="Globe02Icon"
          phosphor="GlobeIcon"
          remixicon="RiGlobalLine"
        />
      ),
    },
    {
      name: "Accessibility",
      icon: (
        <IconPlaceholder
          lucide="KeyboardIcon"
          tabler="IconKeyboard"
          hugeicons="KeyboardIcon"
          phosphor="KeyboardIcon"
          remixicon="RiKeyboardLine"
        />
      ),
    },
    {
      name: "Mark as read",
      icon: (
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      ),
    },
    {
      name: "Audio & video",
      icon: (
        <IconPlaceholder
          lucide="VideoIcon"
          tabler="IconVideoPlus"
          hugeicons="RecordIcon"
          phosphor="VideoIcon"
          remixicon="RiVideoLine"
        />
      ),
    },
    {
      name: "Connected accounts",
      icon: (
        <IconPlaceholder
          lucide="LinkIcon"
          tabler="IconLink"
          hugeicons="LinkIcon"
          phosphor="LinkIcon"
          remixicon="RiLinksLine"
        />
      ),
    },
    {
      name: "Privacy & visibility",
      icon: (
        <IconPlaceholder
          lucide="LockIcon"
          tabler="IconLock"
          hugeicons="ShieldIcon"
          phosphor="LockIcon"
          remixicon="RiLockLine"
        />
      ),
    },
    {
      name: "Advanced",
      icon: (
        <IconPlaceholder
          lucide="SettingsIcon"
          tabler="IconSettings"
          hugeicons="SettingsIcon"
          phosphor="GearIcon"
          remixicon="RiSettingsLine"
        />
      ),
    },
  ],
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true)
  return (
    <DialogTrigger isOpen={open} onOpenChange={setOpen}>
      <Button size="sm">Open Dialog</Button>
      <Dialog sx={styles.settingsDialogDialog}>
        <DialogTitle sx={styles.dialogTitle}>Settings</DialogTitle>
        <DialogDescription sx={styles.dialogDescription}>
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider sx={styles.sidebarProvider}>
          <Sidebar collapsible="none" sx={styles.settingsDialogSidebar}>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === "Messages & media"}
                          href="#"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main sx={styles.settingsDialogMain}>
            <header sx={styles.settingsDialogHeader}>
              <div sx={styles.settingsDialogDiv}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem sx={styles.breadcrumbItem}>
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div sx={styles.div2}>
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <div key={i} sx={styles.div3} />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </Dialog>
    </DialogTrigger>
  )
}
