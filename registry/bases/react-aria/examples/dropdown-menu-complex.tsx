import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import type { Selection } from "react-aria-components"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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

const styles = {
  dropdownMenu: css({
    width: { "*": null, base: space[44] },
  }),
}

export default function DropdownMenuComplex() {
  const [notifications, setNotifications] = React.useState<Selection>(
    new Set(["email", "push"])
  )
  const [theme, setTheme] = React.useState("light")

  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">Complex Menu</Button>
        <DropdownMenu sx={styles.dropdownMenu}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
              />
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              />
              New Folder
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconPlaceholder
                  lucide="FolderOpenIcon"
                  tabler="IconFolderOpen"
                  hugeicons="FolderOpenIcon"
                  phosphor="FolderOpenIcon"
                  remixicon="RiFolderOpenLine"
                />
                Open Recent
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    />
                    Project Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    />
                    Project Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <IconPlaceholder
                        lucide="MoreHorizontalIcon"
                        tabler="IconDots"
                        hugeicons="MoreHorizontalCircle01Icon"
                        phosphor="DotsThreeOutlineIcon"
                        remixicon="RiMoreLine"
                      />
                      More Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="FileCodeIcon"
                          tabler="IconFileCode"
                          hugeicons="File01Icon"
                          phosphor="FileCodeIcon"
                          remixicon="RiFileCodeLine"
                        />
                        Project Gamma
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="FileCodeIcon"
                          tabler="IconFileCode"
                          hugeicons="File01Icon"
                          phosphor="FileCodeIcon"
                          remixicon="RiFileCodeLine"
                        />
                        Project Delta
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="FolderSearchIcon"
                      tabler="IconFolderSearch"
                      hugeicons="SearchIcon"
                      phosphor="MagnifyingGlassIcon"
                      remixicon="RiSearchLine"
                    />
                    Browse...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="SaveIcon"
                tabler="IconDeviceFloppy"
                hugeicons="FloppyDiskIcon"
                phosphor="FloppyDiskIcon"
                remixicon="RiSaveLine"
              />
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="DownloadIcon"
                tabler="IconDownload"
                hugeicons="DownloadIcon"
                phosphor="DownloadIcon"
                remixicon="RiDownloadLine"
              />
              Export
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup
            selectionMode="multiple"
            selectedKeys={notifications}
            onSelectionChange={setNotifications}
          >
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuItem id="email">
              <IconPlaceholder
                lucide="EyeIcon"
                tabler="IconEye"
                hugeicons="EyeIcon"
                phosphor="EyeIcon"
                remixicon="RiEyeLine"
              />
              Show Sidebar
            </DropdownMenuItem>
            <DropdownMenuItem id="sms">
              <IconPlaceholder
                lucide="LayoutIcon"
                tabler="IconLayout"
                hugeicons="LayoutIcon"
                phosphor="LayoutIcon"
                remixicon="RiLayoutLine"
              />
              Show Status Bar
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconPlaceholder
                  lucide="PaletteIcon"
                  tabler="IconPalette"
                  hugeicons="PaintBoardIcon"
                  phosphor="PaletteIcon"
                  remixicon="RiPaletteLine"
                />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup
                  selectionMode="single"
                  selectedKeys={[theme]}
                  onSelectionChange={(keys) =>
                    setTheme([...(keys as Set<string>)][0] as string)
                  }
                >
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuItem id="light">
                    <IconPlaceholder
                      lucide="SunIcon"
                      tabler="IconSun"
                      hugeicons="Sun03Icon"
                      phosphor="SunIcon"
                      remixicon="RiSunLine"
                    />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem id="dark">
                    <IconPlaceholder
                      lucide="MoonIcon"
                      tabler="IconMoon"
                      hugeicons="MoonIcon"
                      phosphor="MoonIcon"
                      remixicon="RiMoonLine"
                    />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem id="system">
                    <IconPlaceholder
                      lucide="MonitorIcon"
                      tabler="IconDeviceDesktop"
                      hugeicons="ComputerIcon"
                      phosphor="MonitorIcon"
                      remixicon="RiComputerLine"
                    />
                    System
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              />
              Billing
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="TerminalIcon"
                  remixicon="RiSettingsLine"
                />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="KeyboardIcon"
                      tabler="IconKeyboard"
                      hugeicons="KeyboardIcon"
                      phosphor="KeyboardIcon"
                      remixicon="RiKeyboardLine"
                    />
                    Keyboard Shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="LanguagesIcon"
                      tabler="IconLanguage"
                      hugeicons="LanguageCircleIcon"
                      phosphor="TranslateIcon"
                      remixicon="RiTranslate"
                    />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <IconPlaceholder
                        lucide="BellIcon"
                        tabler="IconBell"
                        hugeicons="NotificationIcon"
                        phosphor="BellIcon"
                        remixicon="RiNotificationLine"
                      />
                      Notifications
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup
                        selectionMode="multiple"
                        selectedKeys={notifications}
                        onSelectionChange={setNotifications}
                      >
                        <DropdownMenuLabel>
                          Notification Types
                        </DropdownMenuLabel>
                        <DropdownMenuItem id="push">
                          <IconPlaceholder
                            lucide="BellIcon"
                            tabler="IconBell"
                            hugeicons="NotificationIcon"
                            phosphor="BellIcon"
                            remixicon="RiNotificationLine"
                          />
                          Push Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem id="email">
                          <IconPlaceholder
                            lucide="MailIcon"
                            tabler="IconMail"
                            hugeicons="Mail01Icon"
                            phosphor="EnvelopeIcon"
                            remixicon="RiMailLine"
                          />
                          Email Notifications
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ShieldIcon"
                      tabler="IconShield"
                      hugeicons="ShieldIcon"
                      phosphor="ShieldIcon"
                      remixicon="RiShieldLine"
                    />
                    Privacy & Security
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="HelpCircleIcon"
                tabler="IconHelpCircle"
                hugeicons="HelpCircleIcon"
                phosphor="QuestionIcon"
                remixicon="RiQuestionLine"
              />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              />
              Documentation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
