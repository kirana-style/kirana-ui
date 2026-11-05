import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/registry/bases/angular-ng/ui/sidebar"
import { SidebarSection } from "./sidebar-section"

const styles = {
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

@Component({
  selector: "kui-sidebar-nav",
  imports: [
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSection,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div">
      <kui-sidebar-section label="Overview" [sx]="styles.sidebarSection">
        <li kuiSidebarMenuItem>
          <button kuiSidebarMenuButton isActive>
            <svg
              iconPlaceholder
              lucide="FileChartColumnIcon"
              tabler="IconReport"
              hugeicons="Analytics01Icon"
              phosphor="ChartLineIcon"
              remixicon="RiFileChartLine"
            ></svg>
            Analytics
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
      </kui-sidebar-section>
      <kui-sidebar-section label="Planning" [sx]="styles.sidebarSection2">
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
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="Calendar03Icon"
              phosphor="CalendarIcon"
              remixicon="RiCalendarLine"
            ></svg>
            Calendar
          </button>
        </li>
      </kui-sidebar-section>
      <kui-sidebar-section label="Support" [sx]="styles.sidebarSection3">
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
              lucide="BookOpenIcon"
              tabler="IconBook"
              hugeicons="BookOpen02Icon"
              phosphor="BookOpenIcon"
              remixicon="RiBookOpenLine"
            ></svg>
            Docs
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
              lucide="ActivityIcon"
              tabler="IconActivity"
              hugeicons="ActivityIcon"
              phosphor="ActivityIcon"
              remixicon="RiPulseLine"
            ></svg>
            Status
          </button>
        </li>
        <li kuiSidebarMenuItem>
          <button kuiSidebarMenuButton>
            <svg
              iconPlaceholder
              lucide="GlobeIcon"
              tabler="IconWorld"
              hugeicons="Globe02Icon"
              phosphor="GlobeIcon"
              remixicon="RiGlobalLine"
            ></svg>
            Community
          </button>
        </li>
      </kui-sidebar-section>
      <kui-sidebar-section label="Account" [sx]="styles.sidebarSection4">
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
      </kui-sidebar-section>
    </div>
  `,
})
export class SidebarNav {
  protected readonly styles = styles
}
