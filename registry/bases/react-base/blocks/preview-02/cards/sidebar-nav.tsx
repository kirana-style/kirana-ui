"use client"

import { Card } from "../../../ui/card"
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
  SidebarSeparator,
} from "../../../ui/sidebar"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "flex-start",
    gap: space[6],
  }),
  card: css({
    overflow: { "*": null, base: "hidden" },
    paddingTop: { "*": null, base: space["0"] },
    paddingBottom: { "*": null, base: space["0"] },
  }),
  sidebarProvider: css({
    minHeight: { "*": null, base: space["0"] },
  }),
  sidebar: css({
    width: { "*": null, base: "100%" },
    backgroundColor: "transparent",
  }),
  sidebarContent: css({
    gap: { "*": null, base: space["0"] },
  }),
  sidebarGroup: css({
    paddingBottom: { "*": null, base: space[1] },
  }),
  sidebarSeparator: css({
    width: { "*": null, base: "auto" },
  }),
  sidebarGroup2: css({
    paddingTop: { "*": null, base: space[1] },
  }),
  card2: css({
    overflow: { "*": null, base: "hidden" },
    paddingTop: { "*": null, base: space["0"] },
    paddingBottom: { "*": null, base: space["0"] },
  }),
  sidebarProvider2: css({
    minHeight: { "*": null, base: space["0"] },
  }),
  sidebar2: css({
    width: { "*": null, base: "100%" },
    backgroundColor: "transparent",
  }),
  sidebarContent2: css({
    gap: { "*": null, base: space["0"] },
  }),
  sidebarGroup3: css({
    paddingBottom: { "*": null, base: space[1] },
  }),
  sidebarSeparator2: css({
    width: { "*": null, base: "auto" },
  }),
  sidebarGroup4: css({
    paddingTop: { "*": null, base: space[1] },
  }),
}

export function SidebarNav() {
  return (
    <div sx={styles.div}>
      <Card sx={styles.card}>
        <SidebarProvider sx={styles.sidebarProvider}>
          <Sidebar collapsible="none" sx={styles.sidebar}>
            <SidebarContent sx={styles.sidebarContent}>
              <SidebarGroup sx={styles.sidebarGroup}>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconPlaceholder
                          lucide="LayoutDashboardIcon"
                          tabler="IconLayoutDashboard"
                          hugeicons="DashboardSquare01Icon"
                          phosphor="SquaresFourIcon"
                          remixicon="RiDashboardLine"
                        />
                        Dashboard
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator sx={styles.sidebarSeparator} />
              <SidebarGroup sx={styles.sidebarGroup2}>
                <SidebarGroupLabel>Planning</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
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
                          lucide="FileTextIcon"
                          tabler="IconFileText"
                          hugeicons="File02Icon"
                          phosphor="FileTextIcon"
                          remixicon="RiFileTextLine"
                        />
                        Documents
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
      <Card sx={styles.card2}>
        <SidebarProvider sx={styles.sidebarProvider2}>
          <Sidebar collapsible="none" sx={styles.sidebar2}>
            <SidebarContent sx={styles.sidebarContent2}>
              <SidebarGroup sx={styles.sidebarGroup3}>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator sx={styles.sidebarSeparator2} />
              <SidebarGroup sx={styles.sidebarGroup4}>
                <SidebarGroupLabel>Support</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
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
                          lucide="BookOpenIcon"
                          tabler="IconBook"
                          hugeicons="BookOpen02Icon"
                          phosphor="BookOpenIcon"
                          remixicon="RiBookOpenLine"
                        />
                        Documentation
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
    </div>
  )
}
