import { For, Show, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../../ui/sidebar"
import { radius, theme } from "../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../../core/scales"
import { OPEN, collapsibleScope } from "../../../../styles/collapsible.styles"
import { COLLAPSED, WRAPPER_COLLAPSED } from "../../../../styles/sidebar.styles"
import type { Sx } from "@kirana-style/core"
import type { Translations } from "../../components/language-selector"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      teamName: "Acme Inc",
      teamPlan: "Enterprise",
      platform: "Platform",
      projects: "Projects",
      viewProject: "View Project",
      shareProject: "Share Project",
      deleteProject: "Delete Project",
      more: "More",
      upgradeToPro: "Upgrade to Pro",
      account: "Account",
      billing: "Billing",
      notifications: "Notifications",
      logOut: "Log out",
      playground: "Playground",
      history: "History",
      starred: "Starred",
      settings: "Settings",
      models: "Models",
      genesis: "Genesis",
      explorer: "Explorer",
      quantum: "Quantum",
      documentation: "Documentation",
      introduction: "Introduction",
      getStarted: "Get Started",
      tutorials: "Tutorials",
      changelog: "Changelog",
      general: "General",
      team: "Team",
      limits: "Limits",
      designEngineering: "Design Engineering",
      salesMarketing: "Sales & Marketing",
      travel: "Travel",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      teamName: "شركة أكمي",
      teamPlan: "المؤسسة",
      platform: "المنصة",
      projects: "المشاريع",
      viewProject: "عرض المشروع",
      shareProject: "مشاركة المشروع",
      deleteProject: "حذف المشروع",
      more: "المزيد",
      upgradeToPro: "ترقية إلى Pro",
      account: "الحساب",
      billing: "الفوترة",
      notifications: "الإشعارات",
      logOut: "تسجيل الخروج",
      playground: "ملعب",
      history: "السجل",
      starred: "المميز",
      settings: "الإعدادات",
      models: "النماذج",
      genesis: "جينيسيس",
      explorer: "إكسبلورر",
      quantum: "كوانتوم",
      documentation: "التوثيق",
      introduction: "مقدمة",
      getStarted: "ابدأ",
      tutorials: "الدروس",
      changelog: "سجل التغييرات",
      general: "عام",
      team: "الفريق",
      limits: "الحدود",
      designEngineering: "هندسة التصميم",
      salesMarketing: "المبيعات والتسويق",
      travel: "السفر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      teamName: "אקמי בע״מ",
      teamPlan: "ארגוני",
      platform: "פלטפורמה",
      projects: "פרויקטים",
      viewProject: "הצג פרויקט",
      shareProject: "שתף פרויקט",
      deleteProject: "מחק פרויקט",
      more: "עוד",
      upgradeToPro: "שדרג ל-Pro",
      account: "חשבון",
      billing: "חיוב",
      notifications: "התראות",
      logOut: "התנתק",
      playground: "מגרש משחקים",
      history: "היסטוריה",
      starred: "מועדפים",
      settings: "הגדרות",
      models: "מודלים",
      genesis: "ג'נסיס",
      explorer: "אקספלורר",
      quantum: "קוונטום",
      documentation: "תיעוד",
      introduction: "מבוא",
      getStarted: "התחל",
      tutorials: "מדריכים",
      changelog: "יומן שינויים",
      general: "כללי",
      team: "צוות",
      limits: "מגבלות",
      designEngineering: "הנדסת עיצוב",
      salesMarketing: "מכירות ושיווק",
      travel: "נסיעות",
    },
  },
}

export function SidebarContentInner(props: {
  dir: "ltr" | "rtl"
  t: typeof translations.ar.values
  navMain: Array<{
    title: string
    url: string
    icon?: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
    isActive?: boolean
    items?: Array<{ title: string; url: string }>
  }>
  projects: Array<{
    name: string
    url: string
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
  }>
  user: {
    name: string
    email: string
    avatar: string
  }
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "dir",
    "t",
    "navMain",
    "projects",
    "user",
    "sx",
    "class",
  ])
  const styles = {
    sidebarContentInnerDiv: css({
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
    sidebarContentInnerIconPlaceholder: css({
      width: space[4],
      height: space[4],
    }),
    sidebarContentInnerDiv2: css({
      display: "flex",
      flexDirection: "column",
      gap: space["0.5"],
      lineHeight: "1",
    }),
    sidebarContentInnerSpan: css({
      fontWeight: fontWeight.medium,
    }),
    sidebarContentInnerIconPlaceholder2: css({
      marginInlineStart: "auto",
      transitionDuration: duration[200],
      transitionProperty: "transform, translate, scale, rotate",
      transitionTimingFunction: easing.inOut,
      rotate: {
        [OPEN.base]: "90deg",
        ":dir(rtl)": {
          base: "180deg",
          [OPEN.base]: "90deg",
        },
      },
    }),
    sidebarContentInnerSidebarGroup: css({
      display: { [COLLAPSED]: "none" },
    }),
    sidebarContentInnerSpan2: css({
      borderWidth: "0",
      clipPath: "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    }),
    sidebarContentInnerDropdownMenuContent: css({
      width: { "*": null, base: space[48] },
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarContentInnerIconPlaceholder3: css({
      color: theme.mutedForeground,
    }),
    sidebarContentInnerIconPlaceholder4: css({
      color: theme.mutedForeground,
    }),
    sidebarContentInnerIconPlaceholder5: css({
      color: theme.mutedForeground,
    }),
    sidebarContentInnerSidebarMenuButton: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
    sidebarContentInnerIconPlaceholder6: css({
      color: `color-mix(in oklab, ${theme.sidebarForeground} 70%, transparent)`,
    }),
    sidebarContentInnerSidebarMenuButton2: css({
      backgroundColor: { "[data-open]": theme.sidebarAccent },
      color: { "[data-open]": theme.sidebarAccentForeground },
    }),
    sidebarContentInnerAvatar: css({
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarContentInnerAvatarFallback: css({
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarContentInnerDiv3: css({
      display: "grid",
      flex: "1 1 0%",
      textAlign: "start",
      fontSize: fontSize.sm,
      lineHeight: leading.tight,
    }),
    sidebarContentInnerSpan3: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontWeight: fontWeight.medium,
    }),
    sidebarContentInnerSpan4: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
    }),
    sidebarContentInnerIconPlaceholder7: css({
      marginInlineStart: "auto",
      width: space[4],
      height: space[4],
    }),
    sidebarContentInnerDropdownMenuContent2: css({
      width: { "*": null, base: "var(--radix-dropdown-menu-trigger-width)" },
      minWidth: { "*": null, base: space[56] },
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarContentInnerDropdownMenuLabel: css({
      padding: { "*": null, base: space["0"] },
      fontWeight: { "*": null, base: fontWeight.normal },
    }),
    sidebarContentInnerDiv4: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      paddingInline: space[1],
      paddingBlock: space["1.5"],
      textAlign: "left",
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    sidebarContentInnerAvatarFallback2: css({
      borderRadius: { "*": null, base: radius.lg },
    }),
    sidebarContentInnerDiv5: css({
      display: "grid",
      flex: "1 1 0%",
      textAlign: "start",
      fontSize: fontSize.sm,
      lineHeight: leading.tight,
    }),
    sidebarContentInnerSpan5: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontWeight: fontWeight.medium,
    }),
    sidebarContentInnerSpan6: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
    }),
    sidebarContentInnerHeader: css({
      display: "flex",
      height: {
        base: space[16],
        [WRAPPER_COLLAPSED]: space[12],
      },
      flexShrink: "0",
      alignItems: "center",
      gap: space[2],
      transitionProperty: "width,height",
      transitionDuration: duration[150],
      transitionTimingFunction: "linear",
    }),
    sidebarContentInnerDiv6: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      paddingInline: space[4],
    }),
    sidebarContentInnerSidebarTrigger: css({
      marginLeft: { "*": null, base: `calc(${space[1]} * -1)` },
    }),
  }

  const ctx = useSidebar()

  return (
    <>
      <Sidebar
        collapsible="icon"
        dir={local.dir}
        side={local.dir === "ltr" ? "left" : "right"}
        variant="floating"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild={(childProps) => (
                  <a {...childProps()} href="#">
                    <div sx={styles.sidebarContentInnerDiv}>
                      <IconPlaceholder
                        lucide="GalleryVerticalEndIcon"
                        tabler="IconLayoutRows"
                        hugeicons="LayoutBottomIcon"
                        phosphor="RowsIcon"
                        remixicon="RiGalleryLine"
                        {...styleProps(
                          styles.sidebarContentInnerIconPlaceholder
                        )}
                      />
                    </div>
                    <div sx={styles.sidebarContentInnerDiv2}>
                      <span sx={styles.sidebarContentInnerSpan}>
                        {local.t.teamName}
                      </span>
                      <span>{local.t.teamPlan}</span>
                    </div>
                  </a>
                )}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{local.t.platform}</SidebarGroupLabel>
            <SidebarMenu>
              <For each={local.navMain}>
                {(item) => (
                  <Collapsible
                    defaultOpen={item.isActive}
                    sx={collapsibleScope.anchor}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        asChild={(childProps) => (
                          <SidebarMenuButton
                            {...childProps()}
                            tooltip={item.title}
                          >
                            <Show when={item.icon}>
                              {(icon) => <IconPlaceholder {...icon()} />}
                            </Show>
                            <span>{item.title}</span>
                            <IconPlaceholder
                              lucide="ChevronRightIcon"
                              tabler="IconChevronRight"
                              hugeicons="ArrowRight01Icon"
                              phosphor="CaretRightIcon"
                              remixicon="RiArrowRightSLine"
                              {...styleProps(
                                styles.sidebarContentInnerIconPlaceholder2
                              )}
                            />
                          </SidebarMenuButton>
                        )}
                      />
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <For each={item.items}>
                            {(subItem) => (
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                  asChild={(childProps) => (
                                    <a {...childProps()} href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  )}
                                />
                              </SidebarMenuSubItem>
                            )}
                          </For>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup sx={styles.sidebarContentInnerSidebarGroup}>
            <SidebarGroupLabel>{local.t.projects}</SidebarGroupLabel>
            <SidebarMenu>
              <For each={local.projects}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild={(childProps) => (
                        <a {...childProps()} href={item.url}>
                          <Show when={item.icon}>
                            {(icon) => <IconPlaceholder {...icon()} />}
                          </Show>
                          <span>{item.name}</span>
                        </a>
                      )}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild={(childProps) => (
                          <SidebarMenuAction {...childProps()} showOnHover>
                            <IconPlaceholder
                              lucide="MoreHorizontalIcon"
                              tabler="IconDots"
                              hugeicons="MoreHorizontalCircle01Icon"
                              phosphor="DotsThreeOutlineIcon"
                              remixicon="RiMoreLine"
                            />
                            <span sx={styles.sidebarContentInnerSpan2}>
                              {local.t.more}
                            </span>
                          </SidebarMenuAction>
                        )}
                      />
                      <DropdownMenuContent
                        sx={styles.sidebarContentInnerDropdownMenuContent}
                        side={ctx.isMobile ? "bottom" : "inline-end"}
                        align={ctx.isMobile ? "end" : "start"}
                        dir={local.dir}
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <IconPlaceholder
                              lucide="FolderIcon"
                              tabler="IconFolder"
                              hugeicons="FolderIcon"
                              phosphor="FolderIcon"
                              remixicon="RiFolderLine"
                              {...styleProps(
                                styles.sidebarContentInnerIconPlaceholder3
                              )}
                            />
                            <span>{local.t.viewProject}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconPlaceholder
                              lucide="ForwardIcon"
                              tabler="IconCornerUpRight"
                              hugeicons="RedoIcon"
                              phosphor="ArrowBendUpRightIcon"
                              remixicon="RiCornerUpRightLine"
                              {...styleProps(
                                styles.sidebarContentInnerIconPlaceholder4
                              )}
                            />
                            <span>{local.t.shareProject}</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <IconPlaceholder
                              lucide="Trash2Icon"
                              tabler="IconTrash"
                              hugeicons="Delete02Icon"
                              phosphor="TrashIcon"
                              remixicon="RiDeleteBinLine"
                              {...styleProps(
                                styles.sidebarContentInnerIconPlaceholder5
                              )}
                            />
                            <span>{local.t.deleteProject}</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                )}
              </For>
              <SidebarMenuItem>
                <SidebarMenuButton
                  sx={styles.sidebarContentInnerSidebarMenuButton}
                >
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                    {...styleProps(styles.sidebarContentInnerIconPlaceholder6)}
                  />
                  <span>{local.t.more}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild={(childProps) => (
                    <SidebarMenuButton
                      {...childProps()}
                      size="lg"
                      sx={styles.sidebarContentInnerSidebarMenuButton2}
                    >
                      <Avatar sx={styles.sidebarContentInnerAvatar}>
                        <AvatarImage
                          src={local.user.avatar}
                          alt={local.user.name}
                        />
                        <AvatarFallback
                          sx={styles.sidebarContentInnerAvatarFallback}
                        >
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div sx={styles.sidebarContentInnerDiv3}>
                        <span sx={styles.sidebarContentInnerSpan3}>
                          {local.user.name}
                        </span>
                        <span sx={styles.sidebarContentInnerSpan4}>
                          {local.user.email}
                        </span>
                      </div>
                      <IconPlaceholder
                        lucide="ChevronsUpDownIcon"
                        tabler="IconSelector"
                        hugeicons="UnfoldMoreIcon"
                        phosphor="CaretUpDownIcon"
                        remixicon="RiArrowUpDownLine"
                        {...styleProps(
                          styles.sidebarContentInnerIconPlaceholder7
                        )}
                      />
                    </SidebarMenuButton>
                  )}
                />
                <DropdownMenuContent
                  sx={styles.sidebarContentInnerDropdownMenuContent2}
                  side={ctx.isMobile ? "bottom" : "inline-end"}
                  align="end"
                  sideOffset={4}
                  dir={local.dir}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel
                      sx={styles.sidebarContentInnerDropdownMenuLabel}
                    >
                      <div sx={styles.sidebarContentInnerDiv4}>
                        <Avatar>
                          <AvatarImage
                            src={local.user.avatar}
                            alt={local.user.name}
                          />
                          <AvatarFallback
                            sx={styles.sidebarContentInnerAvatarFallback2}
                          >
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div sx={styles.sidebarContentInnerDiv5}>
                          <span sx={styles.sidebarContentInnerSpan5}>
                            {local.user.name}
                          </span>
                          <span sx={styles.sidebarContentInnerSpan6}>
                            {local.user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="SparklesIcon"
                        tabler="IconSparkles"
                        hugeicons="SparklesIcon"
                        phosphor="SparkleIcon"
                        remixicon="RiSparklingLine"
                      />{" "}
                      {local.t.upgradeToPro}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="BadgeCheck"
                        tabler="IconRosetteDiscountCheck"
                        hugeicons="CheckmarkBadge02Icon"
                        phosphor="CheckCircleIcon"
                        remixicon="RiCheckboxCircleLine"
                      />{" "}
                      {local.t.account}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="CreditCardIcon"
                        tabler="IconCreditCard"
                        hugeicons="CreditCardIcon"
                        phosphor="CreditCardIcon"
                        remixicon="RiBankCardLine"
                      />{" "}
                      {local.t.billing}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="BellIcon"
                        tabler="IconBell"
                        hugeicons="NotificationIcon"
                        phosphor="BellIcon"
                        remixicon="RiNotificationLine"
                      />{" "}
                      {local.t.notifications}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="LogOutIcon"
                        tabler="IconLogout"
                        hugeicons="LogoutIcon"
                        phosphor="SignOutIcon"
                        remixicon="RiLogoutBoxLine"
                      />{" "}
                      {local.t.logOut}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header sx={styles.sidebarContentInnerHeader} dir={local.dir}>
          <div sx={styles.sidebarContentInnerDiv6}>
            <SidebarTrigger sx={styles.sidebarContentInnerSidebarTrigger} />
          </div>
        </header>
      </SidebarInset>
    </>
  )
}
