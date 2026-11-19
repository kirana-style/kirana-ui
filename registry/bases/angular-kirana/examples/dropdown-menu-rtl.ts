import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  dropdownMenuContent: css({
    width: { "*": null, base: space[36] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      open: "Open",
      account: "Account",
      profile: "Profile",
      billing: "Billing",
      settings: "Settings",
      logout: "Log out",
      team: "Team",
      inviteUsers: "Invite users",
      email: "Email",
      message: "Message",
      more: "More",
      calendar: "Calendar",
      chat: "Chat",
      webhook: "Webhook",
      advanced: "Advanced...",
      newTeam: "New Team",
      view: "View",
      statusBar: "Status Bar",
      activityBar: "Activity Bar",
      panel: "Panel",
      position: "Position",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      left: "Left",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      open: "افتح القائمة",
      account: "الحساب",
      profile: "الملف الشخصي",
      billing: "الفوترة",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      team: "الفريق",
      inviteUsers: "دعوة المستخدمين",
      email: "البريد الإلكتروني",
      message: "رسالة",
      more: "المزيد",
      calendar: "تقويم",
      chat: "دردشة",
      webhook: "خطاف ويب",
      advanced: "متقدم...",
      newTeam: "فريق جديد",
      view: "عرض",
      statusBar: "شريط الحالة",
      activityBar: "شريط النشاط",
      panel: "اللوحة",
      position: "الموضع",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      left: "يسار",
    },
  },
  he: {
    dir: "rtl",
    values: {
      open: "פתח תפריט",
      account: "חשבון",
      profile: "פרופיל",
      billing: "חיוב",
      settings: "הגדרות",
      logout: "התנתק",
      team: "הצוות",
      inviteUsers: "הזמן משתמשים",
      email: "אימייל",
      message: "הודעה",
      more: "עוד",
      calendar: "יומן",
      chat: "צ'אט",
      webhook: "Webhook",
      advanced: "מתקדם...",
      newTeam: "צוות חדש",
      view: "תצוגה",
      statusBar: "שורת סטטוס",
      activityBar: "שורת פעילות",
      panel: "לוח",
      position: "מיקום",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      left: "שמאל",
    },
  },
}

@Component({
  selector: "dropdown-menu-rtl",
  imports: [
    Button,
    DirectionProvider,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiDropdownMenu>
          <button kuiButton kuiDropdownMenuTrigger variant="outline">
            {{ t().open }}
          </button>
          <div
            kuiDropdownMenuContent
            [align]="dir() === 'rtl' ? 'end' : 'start'"
            [attr.dir]="dir()"
            [sx]="styles.dropdownMenuContent"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiDropdownMenuGroup>
              <ng-container kuiDropdownMenuSub>
                <div kuiDropdownMenuSubTrigger>{{ t().account }}</div>
                <ng-container kuiDropdownMenuPortal>
                  <div
                    kuiDropdownMenuSubContent
                    [attr.dir]="dir()"
                    [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                  >
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="UserIcon"
                          tabler="IconUser"
                          hugeicons="UserIcon"
                          phosphor="UserIcon"
                          remixicon="RiUserLine"
                        ></svg>
                        {{ t().profile }}
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
                          lucide="SettingsIcon"
                          tabler="IconSettings"
                          hugeicons="SettingsIcon"
                          phosphor="TerminalIcon"
                          remixicon="RiSettingsLine"
                        ></svg>
                        {{ t().settings }}
                      </div>
                    </div>
                  </div>
                </ng-container>
              </ng-container>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>{{ t().team }}</div>
              <div kuiDropdownMenuItem>{{ t().team }}</div>
              <ng-container kuiDropdownMenuSub>
                <div kuiDropdownMenuSubTrigger>{{ t().inviteUsers }}</div>
                <ng-container kuiDropdownMenuPortal>
                  <div
                    kuiDropdownMenuSubContent
                    [attr.dir]="dir()"
                    [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
                  >
                    <div kuiDropdownMenuItem>{{ t().email }}</div>
                    <div kuiDropdownMenuItem>{{ t().message }}</div>
                    <ng-container kuiDropdownMenuSub>
                      <div kuiDropdownMenuSubTrigger>{{ t().more }}</div>
                      <ng-container kuiDropdownMenuPortal>
                        <div
                          kuiDropdownMenuSubContent
                          [attr.dir]="dir()"
                          [attr.data-lang]="
                            dir() === 'rtl' ? language() : undefined
                          "
                        >
                          <div kuiDropdownMenuItem>{{ t().calendar }}</div>
                          <div kuiDropdownMenuItem>{{ t().chat }}</div>
                          <div kuiDropdownMenuSeparator></div>
                          <div kuiDropdownMenuItem>{{ t().webhook }}</div>
                        </div>
                      </ng-container>
                    </ng-container>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>{{ t().advanced }}</div>
                  </div>
                </ng-container>
              </ng-container>
              <div kuiDropdownMenuItem>
                {{ t().newTeam }}
                <span kuiDropdownMenuShortcut>⌘+T</span>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>{{ t().view }}</div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showStatusBar">
                {{ t().statusBar }}
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showActivityBar">
                {{ t().activityBar }}
              </div>
              <div kuiDropdownMenuCheckboxItem [(checked)]="showPanel">
                {{ t().panel }}
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuLabel>{{ t().position }}</div>
              <div kuiDropdownMenuRadioGroup [(value)]="position">
                <div kuiDropdownMenuRadioItem value="top">{{ t().top }}</div>
                <div kuiDropdownMenuRadioItem value="bottom">
                  {{ t().bottom }}
                </div>
                <div kuiDropdownMenuRadioItem value="right">
                  {{ t().right }}
                </div>
                <div kuiDropdownMenuRadioItem value="left">{{ t().left }}</div>
              </div>
            </div>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuGroup>
              <div kuiDropdownMenuItem variant="destructive">
                {{ t().logout }}
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class DropdownMenuRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly language = this.i18n.language
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly showStatusBar = signal(true)
  protected readonly showActivityBar = signal(false)
  protected readonly showPanel = signal(false)
  protected readonly position = signal("bottom")
  protected readonly styles = styles
  protected readonly page = page
}
