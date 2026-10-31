import { IconPlaceholder } from "@workspace/registry/icons/icon-placeholder"
import * as React from "react"

import { Card } from "@workspace/registry/bases/react-base/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/registry/bases/react-base/ui/sidebar"
import { css } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { radius } from "@workspace/registry/core/tokens"

const styles = {
  sidebarSectionCard: css({
    width: { "*": null, base: "100%" },
    overflow: { "*": null, base: "hidden" },
    borderRadius: { "*": null, base: radius["3xl"] },
    // Longhands: Card sets `paddingTop` and `paddingBottom`, which a `paddingBlock` loses to
    // (KF-083, open on 0.3.6).
    paddingTop: { "*": null, base: space["0"] },
    paddingBottom: { "*": null, base: space["0"] },
  }),
  sidebarSectionSidebarProvider: css({
    minHeight: { "*": null, base: space["0"] },
  }),
  sidebarSectionSidebar: css({
    width: { "*": null, base: "100%" },
    backgroundColor: "transparent",
  }),
  sidebarSectionSidebarContent: css({
    gap: { "*": null, base: space["0"] },
    overflow: { "*": null, base: "hidden" },
  }),
  sidebarSectionSidebarMenu: css({
    gap: { "*": null, base: space[1] },
  }),
  div: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { base: space[4], [breakpoint.xl]: space[6] },
  }),
  sidebarSection: css({
    gridColumnStart: { [breakpoint.xl]: "1" },
    gridRowStart: { [breakpoint.xl]: "2" },
  }),
  sidebarSection2: css({
    gridColumnStart: { [breakpoint.xl]: "1" },
    gridRowStart: { [breakpoint.xl]: "1" },
  }),
  sidebarSection3: css({
    display: "flex",
    gridColumnStart: { [breakpoint.xl]: "2" },
    gridRowStart: { [breakpoint.xl]: "1" },
  }),
  sidebarSection4: css({
    display: "flex",
    gridColumnStart: { [breakpoint.xl]: "2" },
    gridRowStart: { [breakpoint.xl]: "2" },
  }),
}

function SidebarSection({
  label,
  children,
  sx,
}: {
  label: string
  children: React.ReactNode
  sx?: Sx
}) {
  return (
    <Card sx={[styles.sidebarSectionCard, sx]}>
      <SidebarProvider sx={styles.sidebarSectionSidebarProvider}>
        <Sidebar collapsible="none" sx={styles.sidebarSectionSidebar}>
          <SidebarContent sx={styles.sidebarSectionSidebarContent}>
            <SidebarGroup>
              <SidebarGroupLabel>{label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu sx={styles.sidebarSectionSidebarMenu}>
                  {children}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  )
}

export function SidebarNav() {
  return (
    <div sx={styles.div}>
      <SidebarSection label="Overview" sx={styles.sidebarSection}>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <IconPlaceholder
              lucide="FileChartColumnIcon"
              tabler="IconReport"
              hugeicons="Analytics01Icon"
              phosphor="ChartLineIcon"
              remixicon="RiFileChartLine"
            />
            Analytics
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="ArrowLeftRightIcon"
              tabler="IconArrowsLeftRight"
              hugeicons="ArrowDataTransferHorizontalIcon"
              phosphor="ArrowsLeftRightIcon"
              remixicon="RiArrowLeftRightLine"
            />
            Transactions
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="AnalyticsUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiLineChartLine"
            />
            Investments
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="Building2Icon"
              tabler="IconBuildingBank"
              hugeicons="BankIcon"
              phosphor="BankIcon"
              remixicon="RiBankLine"
            />
            Accounts
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="PieChartIcon"
              tabler="IconChartPie"
              hugeicons="PieChartIcon"
              phosphor="ChartPieIcon"
              remixicon="RiPieChartLine"
            />
            Spending
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Planning" sx={styles.sidebarSection2}>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="File02Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
            Documents
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="WalletIcon"
              tabler="IconWallet"
              hugeicons="Wallet01Icon"
              phosphor="WalletIcon"
              remixicon="RiWalletLine"
            />
            Budget
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="FileBarChartIcon"
              tabler="IconReportAnalytics"
              hugeicons="ChartBarLineIcon"
              phosphor="ChartBarIcon"
              remixicon="RiBarChartLine"
            />
            Reports
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="TargetIcon"
              tabler="IconTarget"
              hugeicons="Target02Icon"
              phosphor="TargetIcon"
              remixicon="RiFocus3Line"
            />
            Goals
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="Calendar03Icon"
              phosphor="CalendarIcon"
              remixicon="RiCalendarLine"
            />
            Calendar
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Support" sx={styles.sidebarSection3}>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="CircleHelpIcon"
              tabler="IconHelp"
              hugeicons="HelpCircleIcon"
              phosphor="QuestionIcon"
              remixicon="RiQuestionLine"
            />
            Help Center
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="BookOpenIcon"
              tabler="IconBook"
              hugeicons="BookOpen02Icon"
              phosphor="BookOpenIcon"
              remixicon="RiBookOpenLine"
            />
            Docs
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="MessageSquareIcon"
              tabler="IconMessage"
              hugeicons="Message01Icon"
              phosphor="ChatIcon"
              remixicon="RiChat1Line"
            />
            Contact Us
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="ActivityIcon"
              tabler="IconActivity"
              hugeicons="ActivityIcon"
              phosphor="ActivityIcon"
              remixicon="RiPulseLine"
            />
            Status
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="GlobeIcon"
              tabler="IconWorld"
              hugeicons="Globe02Icon"
              phosphor="GlobeIcon"
              remixicon="RiGlobalLine"
            />
            Community
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>

      <SidebarSection label="Account" sx={styles.sidebarSection4}>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="UserIcon"
              tabler="IconUser"
              hugeicons="UserIcon"
              phosphor="UserIcon"
              remixicon="RiUserLine"
            />
            Profile
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <IconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
              phosphor="CreditCardIcon"
              remixicon="RiBankCardLine"
            />
            Billing
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="BellIcon"
              tabler="IconBell"
              hugeicons="Notification03Icon"
              phosphor="BellIcon"
              remixicon="RiBellLine"
            />
            Notifications
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="ShieldIcon"
              tabler="IconShield"
              hugeicons="ShieldIcon"
              phosphor="ShieldIcon"
              remixicon="RiShieldLine"
            />
            Security
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <IconPlaceholder
              lucide="PaintbrushIcon"
              tabler="IconPalette"
              hugeicons="PaintBoardIcon"
              phosphor="PaletteIcon"
              remixicon="RiPaletteLine"
            />
            Appearance
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarSection>
    </div>
  )
}
