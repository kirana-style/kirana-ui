import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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

@Component({
  selector: "kui-sidebar-nav",
  imports: [
    Card,
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
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div">
      <div kuiCard [sx]="styles.card">
        <div kuiSidebarProvider [sx]="styles.sidebarProvider">
          <div kuiSidebar collapsible="none" [sx]="styles.sidebar">
            <div kuiSidebarContent [sx]="styles.sidebarContent">
              <div kuiSidebarGroup [sx]="styles.sidebarGroup">
                <div kuiSidebarGroupLabel>Overview</div>
                <div kuiSidebarGroupContent>
                  <ul kuiSidebarMenu>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton isActive>
                        <svg
                          iconPlaceholder
                          lucide="LayoutDashboardIcon"
                          tabler="IconLayoutDashboard"
                          hugeicons="DashboardSquare01Icon"
                          phosphor="SquaresFourIcon"
                          remixicon="RiDashboardLine"
                        ></svg>
                        Dashboard
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="ArrowLeftRightIcon"
                          tabler="IconArrowsLeftRight"
                          hugeicons="ArrowDataTransferHorizontalIcon"
                          phosphor="ArrowsLeftRightIcon"
                          remixicon="RiArrowLeftRightLine"
                        ></svg>
                        Transactions
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="TrendingUpIcon"
                          tabler="IconTrendingUp"
                          hugeicons="AnalyticsUpIcon"
                          phosphor="TrendUpIcon"
                          remixicon="RiLineChartLine"
                        ></svg>
                        Investments
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="Building2Icon"
                          tabler="IconBuildingBank"
                          hugeicons="BankIcon"
                          phosphor="BankIcon"
                          remixicon="RiBankLine"
                        ></svg>
                        Accounts
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="PieChartIcon"
                          tabler="IconChartPie"
                          hugeicons="PieChartIcon"
                          phosphor="ChartPieIcon"
                          remixicon="RiPieChartLine"
                        ></svg>
                        Spending
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div kuiSidebarSeparator [sx]="styles.sidebarSeparator"></div>
              <div kuiSidebarGroup [sx]="styles.sidebarGroup2">
                <div kuiSidebarGroupLabel>Planning</div>
                <div kuiSidebarGroupContent>
                  <ul kuiSidebarMenu>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="TargetIcon"
                          tabler="IconTarget"
                          hugeicons="Target02Icon"
                          phosphor="TargetIcon"
                          remixicon="RiFocus3Line"
                        ></svg>
                        Goals
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="WalletIcon"
                          tabler="IconWallet"
                          hugeicons="Wallet01Icon"
                          phosphor="WalletIcon"
                          remixicon="RiWalletLine"
                        ></svg>
                        Budget
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="FileBarChartIcon"
                          tabler="IconReportAnalytics"
                          hugeicons="ChartBarLineIcon"
                          phosphor="ChartBarIcon"
                          remixicon="RiBarChartLine"
                        ></svg>
                        Reports
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="FileTextIcon"
                          tabler="IconFileText"
                          hugeicons="File02Icon"
                          phosphor="FileTextIcon"
                          remixicon="RiFileTextLine"
                        ></svg>
                        Documents
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div kuiCard [sx]="styles.card2">
        <div kuiSidebarProvider [sx]="styles.sidebarProvider2">
          <div kuiSidebar collapsible="none" [sx]="styles.sidebar2">
            <div kuiSidebarContent [sx]="styles.sidebarContent2">
              <div kuiSidebarGroup [sx]="styles.sidebarGroup3">
                <div kuiSidebarGroupLabel>Account</div>
                <div kuiSidebarGroupContent>
                  <ul kuiSidebarMenu>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="UserIcon"
                          tabler="IconUser"
                          hugeicons="UserIcon"
                          phosphor="UserIcon"
                          remixicon="RiUserLine"
                        ></svg>
                        Profile
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton isActive>
                        <svg
                          iconPlaceholder
                          lucide="CreditCardIcon"
                          tabler="IconCreditCard"
                          hugeicons="CreditCardIcon"
                          phosphor="CreditCardIcon"
                          remixicon="RiBankCardLine"
                        ></svg>
                        Billing
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="BellIcon"
                          tabler="IconBell"
                          hugeicons="Notification03Icon"
                          phosphor="BellIcon"
                          remixicon="RiBellLine"
                        ></svg>
                        Notifications
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="ShieldIcon"
                          tabler="IconShield"
                          hugeicons="ShieldIcon"
                          phosphor="ShieldIcon"
                          remixicon="RiShieldLine"
                        ></svg>
                        Security
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="PaintbrushIcon"
                          tabler="IconPalette"
                          hugeicons="PaintBoardIcon"
                          phosphor="PaletteIcon"
                          remixicon="RiPaletteLine"
                        ></svg>
                        Appearance
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div kuiSidebarSeparator [sx]="styles.sidebarSeparator2"></div>
              <div kuiSidebarGroup [sx]="styles.sidebarGroup4">
                <div kuiSidebarGroupLabel>Support</div>
                <div kuiSidebarGroupContent>
                  <ul kuiSidebarMenu>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="CircleHelpIcon"
                          tabler="IconHelp"
                          hugeicons="HelpCircleIcon"
                          phosphor="QuestionIcon"
                          remixicon="RiQuestionLine"
                        ></svg>
                        Help Center
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="MessageSquareIcon"
                          tabler="IconMessage"
                          hugeicons="Message01Icon"
                          phosphor="ChatIcon"
                          remixicon="RiChat1Line"
                        ></svg>
                        Contact Us
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="BookOpenIcon"
                          tabler="IconBook"
                          hugeicons="BookOpen02Icon"
                          phosphor="BookOpenIcon"
                          remixicon="RiBookOpenLine"
                        ></svg>
                        Documentation
                      </button>
                    </li>
                    <li kuiSidebarMenuItem>
                      <button kuiSidebarMenuButton>
                        <svg
                          iconPlaceholder
                          lucide="ActivityIcon"
                          tabler="IconActivity"
                          hugeicons="ActivityIcon"
                          phosphor="ActivityIcon"
                          remixicon="RiPulseLine"
                        ></svg>
                        Status
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarNav {
  protected readonly styles = styles
}
