import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import {
  LanguageProvider,
  LanguageSelector,
  useTranslation,
} from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { DirectionProvider } from "../ui/direction"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
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
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { collapsibleScope, OPEN } from "../../../styles/collapsible.styles"
import { COLLAPSED, WRAPPER_COLLAPSED } from "../../../styles/sidebar.styles"

const styles = {
  appSidebarWithProviderDiv: css({
    position: "relative",
  }),
  appSidebarWithProviderLanguageSelector: css({
    position: "absolute",
    top: space[4],
    right: { base: space[4], ":dir(rtl)": "auto" },
    zIndex: 10,
    left: { ":dir(rtl)": space[4] },
  }),
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
      [OPEN.aria]: "90deg",
      ":dir(rtl)": {
        base: "180deg",
        [OPEN.aria]: "90deg",
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
  sidebarContentInnerDropdownMenu: css({
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
  sidebarContentInnerDropdownMenu2: css({
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

export default function SidebarRtl() {
  return (
    <div sx={page.example}>
      <LanguageProvider defaultLanguage="ar">
        <AppSidebarWithProvider />
      </LanguageProvider>
    </div>
  )
}

function AppSidebarWithProvider() {
  const { language, locale, setLanguage, dir } = useTranslation(
    translations,
    "ar"
  )

  return (
    <DirectionProvider locale={locale}>
      <div sx={styles.appSidebarWithProviderDiv} dir={dir}>
        <LanguageSelector
          value={language}
          onValueChange={setLanguage}
          sx={styles.appSidebarWithProviderLanguageSelector}
        />
        <AppSidebar />
      </div>
    </DirectionProvider>
  )
}

function AppSidebar() {
  const { dir, t } = useTranslation(translations, "ar")

  const navMain = [
    {
      title: t.playground,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="TerminalSquareIcon"
          tabler="IconTerminal2"
          hugeicons="ComputerTerminalIcon"
          phosphor="TerminalIcon"
          remixicon="RiTerminalBoxLine"
        />
      ),
      isActive: true,
      items: [
        { title: t.history, url: "#" },
        { title: t.starred, url: "#" },
        { title: t.settings, url: "#" },
      ],
    },
    {
      title: t.models,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="BotIcon"
          tabler="IconRobot"
          hugeicons="RoboticIcon"
          phosphor="RobotIcon"
          remixicon="RiRobotLine"
        />
      ),
      items: [
        { title: t.genesis, url: "#" },
        { title: t.explorer, url: "#" },
        { title: t.quantum, url: "#" },
      ],
    },
    {
      title: t.documentation,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="BookOpenIcon"
          tabler="IconBook"
          hugeicons="BookOpen02Icon"
          phosphor="BookOpenIcon"
          remixicon="RiBookOpenLine"
        />
      ),
      items: [
        { title: t.introduction, url: "#" },
        { title: t.getStarted, url: "#" },
        { title: t.tutorials, url: "#" },
        { title: t.changelog, url: "#" },
      ],
    },
    {
      title: t.settings,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="Settings2Icon"
          tabler="IconSettings"
          hugeicons="Settings05Icon"
          phosphor="GearIcon"
          remixicon="RiSettingsLine"
        />
      ),
      items: [
        { title: t.general, url: "#" },
        { title: t.team, url: "#" },
        { title: t.billing, url: "#" },
        { title: t.limits, url: "#" },
      ],
    },
  ]

  const projects = [
    {
      name: t.designEngineering,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="FrameIcon"
          tabler="IconFrame"
          hugeicons="CropIcon"
          phosphor="CropIcon"
          remixicon="RiCropLine"
        />
      ),
    },
    {
      name: t.salesMarketing,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="PieChartIcon"
          tabler="IconChartPie"
          hugeicons="PieChartIcon"
          phosphor="ChartPieIcon"
          remixicon="RiPieChartLine"
        />
      ),
    },
    {
      name: t.travel,
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="MapIcon"
          tabler="IconMap"
          hugeicons="MapsIcon"
          phosphor="MapTrifoldIcon"
          remixicon="RiMapLine"
        />
      ),
    },
  ]

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/kirana.png",
  }

  return (
    <SidebarProvider>
      <SidebarContentInner
        dir={dir}
        t={t}
        navMain={navMain}
        projects={projects}
        user={user}
      />
    </SidebarProvider>
  )
}

function SidebarContentInner({
  dir,
  t,
  navMain,
  projects,
  user,
}: {
  dir: "ltr" | "rtl"
  t: typeof translations.ar.values
  navMain: Array<{
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: Array<{ title: string; url: string }>
  }>
  projects: Array<{
    name: string
    url: string
    icon: React.ReactNode
  }>
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <>
      <Sidebar
        collapsible="icon"
        dir={dir}
        side={dir === "ltr" ? "left" : "right"}
        variant="floating"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" size="lg">
                <div sx={styles.sidebarContentInnerDiv}>
                  <IconPlaceholder
                    lucide="GalleryVerticalEndIcon"
                    tabler="IconLayoutRows"
                    hugeicons="LayoutBottomIcon"
                    phosphor="RowsIcon"
                    remixicon="RiGalleryLine"
                    {...styleProps(styles.sidebarContentInnerIconPlaceholder)}
                  />
                </div>
                <div sx={styles.sidebarContentInnerDiv2}>
                  <span sx={styles.sidebarContentInnerSpan}>{t.teamName}</span>
                  <span>{t.teamPlan}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t.platform}</SidebarGroupLabel>
            <SidebarMenu>
              {navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultExpanded={item.isActive}
                  sx={collapsibleScope.anchor}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton slot="trigger" tooltip={item.title}>
                      {item.icon}
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
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton href={subItem.url}>
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup sx={styles.sidebarContentInnerSidebarGroup}>
            <SidebarGroupLabel>{t.projects}</SidebarGroupLabel>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton href={item.url}>
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                  <DropdownMenuTrigger>
                    <SidebarMenuAction showOnHover>
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                      <span sx={styles.sidebarContentInnerSpan2}>{t.more}</span>
                    </SidebarMenuAction>
                    <DropdownMenu
                      sx={styles.sidebarContentInnerDropdownMenu}
                      placement={isMobile ? "bottom end" : "end top"}
                      dir={dir}
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
                          <span>{t.viewProject}</span>
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
                          <span>{t.shareProject}</span>
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
                          <span>{t.deleteProject}</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenu>
                  </DropdownMenuTrigger>
                </SidebarMenuItem>
              ))}
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
                  <span>{t.more}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  size="lg"
                  sx={styles.sidebarContentInnerSidebarMenuButton2}
                >
                  <Avatar sx={styles.sidebarContentInnerAvatar}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback
                      sx={styles.sidebarContentInnerAvatarFallback}
                    >
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.sidebarContentInnerDiv3}>
                    <span sx={styles.sidebarContentInnerSpan3}>
                      {user.name}
                    </span>
                    <span sx={styles.sidebarContentInnerSpan4}>
                      {user.email}
                    </span>
                  </div>
                  <IconPlaceholder
                    lucide="ChevronsUpDownIcon"
                    tabler="IconSelector"
                    hugeicons="UnfoldMoreIcon"
                    phosphor="CaretUpDownIcon"
                    remixicon="RiArrowUpDownLine"
                    {...styleProps(styles.sidebarContentInnerIconPlaceholder7)}
                  />
                </SidebarMenuButton>
                <DropdownMenu
                  sx={styles.sidebarContentInnerDropdownMenu2}
                  placement={isMobile ? "bottom end" : "end bottom"}
                  offset={4}
                  dir={dir}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel
                      sx={styles.sidebarContentInnerDropdownMenuLabel}
                    >
                      <div sx={styles.sidebarContentInnerDiv4}>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback
                            sx={styles.sidebarContentInnerAvatarFallback2}
                          >
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div sx={styles.sidebarContentInnerDiv5}>
                          <span sx={styles.sidebarContentInnerSpan5}>
                            {user.name}
                          </span>
                          <span sx={styles.sidebarContentInnerSpan6}>
                            {user.email}
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
                      />
                      {t.upgradeToPro}
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
                      />
                      {t.account}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="CreditCardIcon"
                        tabler="IconCreditCard"
                        hugeicons="CreditCardIcon"
                        phosphor="CreditCardIcon"
                        remixicon="RiBankCardLine"
                      />
                      {t.billing}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="BellIcon"
                        tabler="IconBell"
                        hugeicons="NotificationIcon"
                        phosphor="BellIcon"
                        remixicon="RiNotificationLine"
                      />
                      {t.notifications}
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
                      />
                      {t.logOut}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenu>
              </DropdownMenuTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header sx={styles.sidebarContentInnerHeader} dir={dir}>
          <div sx={styles.sidebarContentInnerDiv6}>
            <SidebarTrigger sx={styles.sidebarContentInnerSidebarTrigger} />
          </div>
        </header>
      </SidebarInset>
    </>
  )
}
