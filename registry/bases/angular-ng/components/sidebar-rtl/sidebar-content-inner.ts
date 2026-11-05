import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { Translations } from "../../components/language-selector"
import {
  useSidebar,
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
} from "../../ui/sidebar"
import { css } from "@kirana-style/core"
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
import { collapsibleScope, OPEN } from "../../../../styles/collapsible.styles"
import { COLLAPSED, WRAPPER_COLLAPSED } from "../../../../styles/sidebar.styles"
import { IconPlaceholder } from "../../../../icons/angular"
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

@Component({
  selector: "kui-sidebar-content-inner",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
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
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div
      kuiSidebar
      collapsible="icon"
      [dir]="dir()"
      [side]="dir() === 'ltr' ? 'left' : 'right'"
      variant="floating"
    >
      <div kuiSidebarHeader>
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem>
            <a kuiSidebarMenuButton size="lg" href="#">
              <div [sx]="styles.sidebarContentInnerDiv">
                <svg
                  iconPlaceholder
                  lucide="GalleryVerticalEndIcon"
                  tabler="IconLayoutRows"
                  hugeicons="LayoutBottomIcon"
                  phosphor="RowsIcon"
                  remixicon="RiGalleryLine"
                  [sx]="styles.sidebarContentInnerIconPlaceholder"
                ></svg>
              </div>
              <div [sx]="styles.sidebarContentInnerDiv2">
                <span [sx]="styles.sidebarContentInnerSpan">{{
                  t().teamName
                }}</span>
                <span>{{ t().teamPlan }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div kuiSidebarContent>
        <div kuiSidebarGroup>
          <div kuiSidebarGroupLabel>{{ t().platform }}</div>
          <ul kuiSidebarMenu>
            @for (item of navMain(); track item.title) {
              <div
                kuiCollapsible
                [defaultOpen]="item.isActive"
                [sx]="collapsibleAnchor"
              >
                <li kuiSidebarMenuItem>
                  <button
                    kuiSidebarMenuButton
                    kuiCollapsibleTrigger
                    [tooltip]="item.title"
                  >
                    @if (item.icon) {
                      <svg
                        iconPlaceholder
                        [lucide]="item.icon.lucide"
                        [tabler]="item.icon.tabler"
                        [hugeicons]="item.icon.hugeicons"
                        [phosphor]="item.icon.phosphor"
                        [remixicon]="item.icon.remixicon"
                      ></svg>
                    }
                    <span>{{ item.title }}</span>
                    <svg
                      iconPlaceholder
                      lucide="ChevronRightIcon"
                      tabler="IconChevronRight"
                      hugeicons="ArrowRight01Icon"
                      phosphor="CaretRightIcon"
                      remixicon="RiArrowRightSLine"
                      [sx]="styles.sidebarContentInnerIconPlaceholder2"
                    ></svg>
                  </button>
                  <div kuiCollapsibleContent>
                    <ul kuiSidebarMenuSub>
                      @for (subItem of item.items; track subItem.title) {
                        <li kuiSidebarMenuSubItem>
                          <a kuiSidebarMenuSubButton [attr.href]="subItem.url">
                            <span>{{ subItem.title }}</span>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </li>
              </div>
            }
          </ul>
        </div>
        <div kuiSidebarGroup [sx]="styles.sidebarContentInnerSidebarGroup">
          <div kuiSidebarGroupLabel>{{ t().projects }}</div>
          <ul kuiSidebarMenu>
            @for (item of projects(); track item.name) {
              <li kuiSidebarMenuItem>
                <a kuiSidebarMenuButton [attr.href]="item.url">
                  @if (item.icon) {
                    <svg
                      iconPlaceholder
                      [lucide]="item.icon.lucide"
                      [tabler]="item.icon.tabler"
                      [hugeicons]="item.icon.hugeicons"
                      [phosphor]="item.icon.phosphor"
                      [remixicon]="item.icon.remixicon"
                    ></svg>
                  }
                  <span>{{ item.name }}</span>
                </a>
                <ng-container kuiDropdownMenu>
                  <button
                    kuiSidebarMenuAction
                    kuiDropdownMenuTrigger
                    showOnHover
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    ></svg>
                    <span [sx]="styles.sidebarContentInnerSpan2">{{
                      t().more
                    }}</span>
                  </button>
                  <div
                    kuiDropdownMenuContent
                    [sx]="styles.sidebarContentInnerDropdownMenuContent"
                    [side]="isMobile() ? 'bottom' : 'inline-end'"
                    [align]="isMobile() ? 'end' : 'start'"
                    [attr.dir]="dir()"
                  >
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="FolderIcon"
                          tabler="IconFolder"
                          hugeicons="FolderIcon"
                          phosphor="FolderIcon"
                          remixicon="RiFolderLine"
                          [sx]="styles.sidebarContentInnerIconPlaceholder3"
                        ></svg>
                        <span>{{ t().viewProject }}</span>
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ForwardIcon"
                          tabler="IconCornerUpRight"
                          hugeicons="RedoIcon"
                          phosphor="ArrowBendUpRightIcon"
                          remixicon="RiCornerUpRightLine"
                          [sx]="styles.sidebarContentInnerIconPlaceholder4"
                        ></svg>
                        <span>{{ t().shareProject }}</span>
                      </div>
                    </div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="Trash2Icon"
                          tabler="IconTrash"
                          hugeicons="Delete02Icon"
                          phosphor="TrashIcon"
                          remixicon="RiDeleteBinLine"
                          [sx]="styles.sidebarContentInnerIconPlaceholder5"
                        ></svg>
                        <span>{{ t().deleteProject }}</span>
                      </div>
                    </div>
                  </div>
                </ng-container>
              </li>
            }
            <li kuiSidebarMenuItem>
              <button
                kuiSidebarMenuButton
                [sx]="styles.sidebarContentInnerSidebarMenuButton"
              >
                <svg
                  iconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                  [sx]="styles.sidebarContentInnerIconPlaceholder6"
                ></svg>
                <span>{{ t().more }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div kuiSidebarFooter>
        <ul kuiSidebarMenu>
          <li kuiSidebarMenuItem>
            <ng-container kuiDropdownMenu>
              <button
                kuiSidebarMenuButton
                kuiDropdownMenuTrigger
                size="lg"
                [sx]="styles.sidebarContentInnerSidebarMenuButton2"
              >
                <span kuiAvatar [sx]="styles.sidebarContentInnerAvatar">
                  <img
                    kuiAvatarImage
                    [attr.src]="user().avatar"
                    [attr.alt]="user().name"
                  />
                  <span
                    kuiAvatarFallback
                    [sx]="styles.sidebarContentInnerAvatarFallback"
                    >CN</span
                  >
                </span>
                <div [sx]="styles.sidebarContentInnerDiv3">
                  <span [sx]="styles.sidebarContentInnerSpan3">{{
                    user().name
                  }}</span>
                  <span [sx]="styles.sidebarContentInnerSpan4">{{
                    user().email
                  }}</span>
                </div>
                <svg
                  iconPlaceholder
                  lucide="ChevronsUpDownIcon"
                  tabler="IconSelector"
                  hugeicons="UnfoldMoreIcon"
                  phosphor="CaretUpDownIcon"
                  remixicon="RiArrowUpDownLine"
                  [sx]="styles.sidebarContentInnerIconPlaceholder7"
                ></svg>
              </button>
              <div
                kuiDropdownMenuContent
                [sx]="styles.sidebarContentInnerDropdownMenuContent2"
                [side]="isMobile() ? 'bottom' : 'inline-end'"
                align="end"
                [sideOffset]="4"
                [attr.dir]="dir()"
              >
                <div kuiDropdownMenuGroup>
                  <div
                    kuiDropdownMenuLabel
                    [sx]="styles.sidebarContentInnerDropdownMenuLabel"
                  >
                    <div [sx]="styles.sidebarContentInnerDiv4">
                      <span kuiAvatar>
                        <img
                          kuiAvatarImage
                          [attr.src]="user().avatar"
                          [attr.alt]="user().name"
                        />
                        <span
                          kuiAvatarFallback
                          [sx]="styles.sidebarContentInnerAvatarFallback2"
                          >CN</span
                        >
                      </span>
                      <div [sx]="styles.sidebarContentInnerDiv5">
                        <span [sx]="styles.sidebarContentInnerSpan5">{{
                          user().name
                        }}</span>
                        <span [sx]="styles.sidebarContentInnerSpan6">{{
                          user().email
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="SparklesIcon"
                      tabler="IconSparkles"
                      hugeicons="SparklesIcon"
                      phosphor="SparkleIcon"
                      remixicon="RiSparklingLine"
                    ></svg>
                    {{ t().upgradeToPro }}
                  </div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="BadgeCheck"
                      tabler="IconRosetteDiscountCheck"
                      hugeicons="CheckmarkBadge02Icon"
                      phosphor="CheckCircleIcon"
                      remixicon="RiCheckboxCircleLine"
                    ></svg>
                    {{ t().account }}
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="CreditCardIcon"
                      tabler="IconCreditCard"
                      hugeicons="CreditCardIcon"
                      phosphor="CreditCardIcon"
                      remixicon="RiBankCardLine"
                    ></svg>
                    {{ t().billing }}
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="BellIcon"
                      tabler="IconBell"
                      hugeicons="NotificationIcon"
                      phosphor="BellIcon"
                      remixicon="RiNotificationLine"
                    ></svg>
                    {{ t().notifications }}
                  </div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="LogOutIcon"
                      tabler="IconLogout"
                      hugeicons="LogoutIcon"
                      phosphor="SignOutIcon"
                      remixicon="RiLogoutBoxLine"
                    ></svg>
                    {{ t().logOut }}
                  </div>
                </div>
              </div>
            </ng-container>
          </li>
        </ul>
      </div>
      <button kuiSidebarRail></button>
    </div>
    <main kuiSidebarInset>
      <header [sx]="styles.sidebarContentInnerHeader" [attr.dir]="dir()">
        <div [sx]="styles.sidebarContentInnerDiv6">
          <button
            kuiSidebarTrigger
            [sx]="styles.sidebarContentInnerSidebarTrigger"
          ></button>
        </div>
      </header>
    </main>
  `,
})
export class SidebarContentInner {
  readonly dir = input.required<"ltr" | "rtl">()
  readonly t = input.required<typeof translations.ar.values>()
  readonly navMain = input.required<
    Array<{
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
  >()
  readonly projects = input.required<
    Array<{
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
  >()
  readonly user = input.required<{
    name: string
    email: string
    avatar: string
  }>()
  protected readonly sidebar = useSidebar()
  protected readonly isMobile = this.sidebar.isMobile
  protected readonly styles = styles
  // The collapsible relation's anchor, which the chevron's `OPEN` rotation reads.
  protected readonly collapsibleAnchor = collapsibleScope.anchor
}
