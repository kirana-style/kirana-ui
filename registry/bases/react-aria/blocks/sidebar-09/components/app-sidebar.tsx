"use client"

import * as React from "react"

import { NavUser } from "./nav-user"
import { Label } from "../../../ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../../ui/sidebar"
import { Switch } from "../../../ui/switch"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { axes } from "../../../../../core/axes"
import { css, props as styleProps } from "@kirana-style/core"
import { sidebarCtx } from "../../../../../core/context"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../../core/scales"

/**
 * Upstream's `md:h-8 md:p-0` and `px-2.5 md:px-2` are utilities, which beat the menu button's own
 * size and padding in every style. Here the button's values sit under each style's condition, so
 * the block's entries are given again under each style that sets its own.
 */
const overButton = <T extends object>(entries: T) => ({
  ...entries,
  [axes.style.maia]: entries,
  [axes.style.luma]: entries,
  [axes.style.rhea]: {
    ...entries,
    ":has(> svg:first-child)": entries,
    ":has(> svg:last-child)": entries,
  },
  [axes.style.sera]: entries,
})

const styles = {
  appSidebarSidebar: css({
    overflow: { "*": null, base: "hidden" },
  }),
  // The two sidebars side by side, upstream's `*:data-[sidebar=sidebar]:flex-row`: a row inside the
  // outer sidebar's own column, whose direction a parent's rule cannot change.
  row: css({
    display: "flex",
    flex: "1 1 0%",
    minHeight: 0,
    flexDirection: "row",
  }),
  sidebar2: css({
    width: { "*": null, base: `calc(${sidebarCtx.widthIcon} + 1px)` },
    borderRightWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderRightColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
  }),
  sidebarMenuButton: css({
    height: overButton({ [breakpoint.md]: space[8] }),
    paddingBlock: overButton({ [breakpoint.md]: space["0"] }),
    paddingInlineStart: overButton({ [breakpoint.md]: space["0"] }),
    paddingInlineEnd: overButton({ [breakpoint.md]: space["0"] }),
  }),
  appSidebarDiv: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: space[8],
    height: space[8],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  div2: css({
    display: "grid",
    flex: "1 1 0%",
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  appSidebarSpan: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  sidebarGroupContent: css({
    paddingInline: {
      "*": null,
      base: space["1.5"],
      [breakpoint.md]: space["0"],
    },
  }),
  sidebarMenuButton2: css({
    paddingInlineStart: overButton({
      base: space["2.5"],
      [breakpoint.md]: space[2],
    }),
    paddingInlineEnd: overButton({
      base: space["2.5"],
      [breakpoint.md]: space[2],
    }),
  }),
  sidebar3: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
    flex: "1 1 0%",
  }),
  sidebarHeader: css({
    gap: { "*": null, base: space["3.5"] },
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    padding: { "*": null, base: space[4] },
  }),
  div3: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  div4: css({
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  }),
  appSidebarLabel: css({
    display: { "*": null, base: "flex" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
    fontSize: { "*": null, base: fontSize.sm },
  }),
  // `shadow-none`: Vega's switch casts a shadow under its own condition; the focus ring stays.
  appSidebarSwitch: css({
    boxShadow: { base: "none", [axes.style.vega]: "none" },
  }),
  sidebarGroup: css({
    paddingInline: { "*": null, base: space["0"] },
  }),
  appSidebarA: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[2],
    borderBottomWidth: { base: "1px", ":last-child": "0px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { base: "solid", ":last-child": "solid" },
    padding: space[4],
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
    whiteSpace: "nowrap",
    backgroundColor: { ":hover": theme.sidebarAccent },
    color: { ":hover": theme.sidebarAccentForeground },
  }),
  div5: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: space[2],
  }),
  span3: css({
    marginLeft: "auto",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  span4: css({
    fontWeight: fontWeight.medium,
  }),
  span5: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    width: "260px",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    whiteSpace: "break-spaces",
  }),
}

// This is sample data
const data = {
  user: {
    name: "kirana",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="InboxIcon"
          tabler="IconInbox"
          hugeicons="InboxIcon"
          phosphor="TrayIcon"
          remixicon="RiInboxLine"
        />
      ),
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="FileIcon"
          tabler="IconFile"
          hugeicons="FileIcon"
          phosphor="FileIcon"
          remixicon="RiFileLine"
        />
      ),
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="SendIcon"
          tabler="IconSend"
          hugeicons="SentIcon"
          phosphor="PaperPlaneTiltIcon"
          remixicon="RiSendPlaneLine"
        />
      ),
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="ArchiveXIcon"
          tabler="IconArchiveOff"
          hugeicons="ArchiveIcon"
          phosphor="ArchiveIcon"
          remixicon="RiArchiveLine"
        />
      ),
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="Trash2Icon"
          tabler="IconTrash"
          hugeicons="Delete02Icon"
          phosphor="TrashIcon"
          remixicon="RiDeleteBinLine"
        />
      ),
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar()
  return (
    <Sidebar collapsible="icon" sx={styles.appSidebarSidebar} {...props}>
      <div sx={styles.row}>
        {/* This is the first sidebar */}
        {/* We disable collapsible and adjust width to icon. */}
        {/* This will make the sidebar appear as icons. */}
        <Sidebar collapsible="none" sx={styles.sidebar2}>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  href="#"
                  size="lg"
                  sx={styles.sidebarMenuButton}
                >
                  <div sx={styles.appSidebarDiv}>
                    <IconPlaceholder
                      lucide="CommandIcon"
                      tabler="IconCommand"
                      hugeicons="CommandIcon"
                      phosphor="CommandIcon"
                      remixicon="RiCommandLine"
                      {...styleProps(styles.iconPlaceholder)}
                    />
                  </div>
                  <div sx={styles.div2}>
                    <span sx={styles.appSidebarSpan}>Acme Inc</span>
                    <span sx={styles.span2}>Enterprise</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent sx={styles.sidebarGroupContent}>
                <SidebarMenu>
                  {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item)
                          const mail = data.mails.sort(
                            () => Math.random() - 0.5
                          )
                          setMails(
                            mail.slice(
                              0,
                              Math.max(5, Math.floor(Math.random() * 10) + 1)
                            )
                          )
                          setOpen(true)
                        }}
                        isActive={activeItem?.title === item.title}
                        sx={styles.sidebarMenuButton2}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar>
        {/* This is the second sidebar */}
        {/* We disable collapsible and let it fill remaining space */}
        <Sidebar collapsible="none" sx={styles.sidebar3}>
          <SidebarHeader sx={styles.sidebarHeader}>
            <div sx={styles.div3}>
              <div sx={styles.div4}>{activeItem?.title}</div>
              <Label sx={styles.appSidebarLabel}>
                <span>Unreads</span>
                <Switch sx={styles.appSidebarSwitch} />
              </Label>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup sx={styles.sidebarGroup}>
              <SidebarGroupContent>
                {mails.map((mail) => (
                  <a href="#" key={mail.email} sx={styles.appSidebarA}>
                    <div sx={styles.div5}>
                      <span>{mail.name}</span>{" "}
                      <span sx={styles.span3}>{mail.date}</span>
                    </div>
                    <span sx={styles.span4}>{mail.subject}</span>
                    <span sx={styles.span5}>{mail.teaser}</span>
                  </a>
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </Sidebar>
  )
}
