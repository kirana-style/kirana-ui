import { createSignal } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import { Button } from "../ui/button"
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
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function DropdownMenuRtl() {
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

  const translation = useTranslation(translations, "ar")

  const [showStatusBar, setShowStatusBar] = createSignal(true)

  const [showActivityBar, setShowActivityBar] = createSignal(false)

  const [showPanel, setShowPanel] = createSignal(false)

  const [position, setPosition] = createSignal("bottom")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                {translation.t.open}
              </Button>
            )}
          />
          <DropdownMenuContent
            align={translation.dir === "rtl" ? "end" : "start"}
            dir={translation.dir}
            sx={styles.dropdownMenuContent}
            data-lang={
              translation.dir === "rtl" ? translation.language : undefined
            }
          >
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {translation.t.account}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    dir={translation.dir}
                    data-lang={
                      translation.dir === "rtl"
                        ? translation.language
                        : undefined
                    }
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="UserIcon"
                          tabler="IconUser"
                          hugeicons="UserIcon"
                          phosphor="UserIcon"
                          remixicon="RiUserLine"
                        />{" "}
                        {translation.t.profile}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="CreditCardIcon"
                          tabler="IconCreditCard"
                          hugeicons="CreditCardIcon"
                          phosphor="CreditCardIcon"
                          remixicon="RiBankCardLine"
                        />{" "}
                        {translation.t.billing}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="SettingsIcon"
                          tabler="IconSettings"
                          hugeicons="SettingsIcon"
                          phosphor="TerminalIcon"
                          remixicon="RiSettingsLine"
                        />{" "}
                        {translation.t.settings}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{translation.t.team}</DropdownMenuLabel>
              <DropdownMenuItem>{translation.t.team}</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {translation.t.inviteUsers}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    dir={translation.dir}
                    data-lang={
                      translation.dir === "rtl"
                        ? translation.language
                        : undefined
                    }
                  >
                    <DropdownMenuItem>{translation.t.email}</DropdownMenuItem>
                    <DropdownMenuItem>{translation.t.message}</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        {translation.t.more}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          dir={translation.dir}
                          data-lang={
                            translation.dir === "rtl"
                              ? translation.language
                              : undefined
                          }
                        >
                          <DropdownMenuItem>
                            {translation.t.calendar}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {translation.t.chat}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {translation.t.webhook}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {translation.t.advanced}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                {translation.t.newTeam}{" "}
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{translation.t.view}</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showStatusBar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showStatusBar>
                }) => setShowStatusBar(details.checked)}
              >
                {translation.t.statusBar}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showActivityBar>
                }) => setShowActivityBar(details.checked)}
              >
                {translation.t.activityBar}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel()}
                onCheckedChange={(details: {
                  checked: ReturnType<typeof showPanel>
                }) => setShowPanel(details.checked)}
              >
                {translation.t.panel}
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{translation.t.position}</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={position()}
                onValueChange={(details: {
                  value: ReturnType<typeof position>
                }) => setPosition(details.value)}
              >
                <DropdownMenuRadioItem value="top">
                  {translation.t.top}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  {translation.t.bottom}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  {translation.t.right}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">
                  {translation.t.left}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                {translation.t.logout}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DirectionProvider>
  )
}
