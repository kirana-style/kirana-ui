import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

const styles = {
  dropdownMenuContent: css({
    width: { "*": null, base: space[44] },
  }),
}

const notifications = {
  email: true,
  sms: false,
  push: true,
}

@Component({
  selector: "dropdown-menu-complex",
  imports: [
    Button,
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
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">
          Complex Menu
        </button>
        <div kuiDropdownMenuContent [sx]="styles.dropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>File</div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="FileIcon"
                tabler="IconFile"
                hugeicons="FileIcon"
                phosphor="FileIcon"
                remixicon="RiFileLine"
              ></svg>
              New File
              <span kuiDropdownMenuShortcut>⌘N</span>
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="FolderIcon"
                tabler="IconFolder"
                hugeicons="FolderIcon"
                phosphor="FolderIcon"
                remixicon="RiFolderLine"
              ></svg>
              New Folder
              <span kuiDropdownMenuShortcut>⇧⌘N</span>
            </div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger>
                <svg
                  iconPlaceholder
                  lucide="FolderOpenIcon"
                  tabler="IconFolderOpen"
                  hugeicons="FolderOpenIcon"
                  phosphor="FolderOpenIcon"
                  remixicon="RiFolderOpenLine"
                ></svg>
                Open Recent
              </div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>Recent Projects</div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="File01Icon"
                        phosphor="FileCodeIcon"
                        remixicon="RiFileCodeLine"
                      ></svg>
                      Project Alpha
                    </div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="File01Icon"
                        phosphor="FileCodeIcon"
                        remixicon="RiFileCodeLine"
                      ></svg>
                      Project Beta
                    </div>
                    <ng-container kuiDropdownMenuSub>
                      <div kuiDropdownMenuSubTrigger>
                        <svg
                          iconPlaceholder
                          lucide="MoreHorizontalIcon"
                          tabler="IconDots"
                          hugeicons="MoreHorizontalCircle01Icon"
                          phosphor="DotsThreeOutlineIcon"
                          remixicon="RiMoreLine"
                        ></svg>
                        More Projects
                      </div>
                      <ng-container kuiDropdownMenuPortal>
                        <div kuiDropdownMenuSubContent>
                          <div kuiDropdownMenuItem>
                            <svg
                              iconPlaceholder
                              lucide="FileCodeIcon"
                              tabler="IconFileCode"
                              hugeicons="File01Icon"
                              phosphor="FileCodeIcon"
                              remixicon="RiFileCodeLine"
                            ></svg>
                            Project Gamma
                          </div>
                          <div kuiDropdownMenuItem>
                            <svg
                              iconPlaceholder
                              lucide="FileCodeIcon"
                              tabler="IconFileCode"
                              hugeicons="File01Icon"
                              phosphor="FileCodeIcon"
                              remixicon="RiFileCodeLine"
                            ></svg>
                            Project Delta
                          </div>
                        </div>
                      </ng-container>
                    </ng-container>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="FolderSearchIcon"
                        tabler="IconFolderSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      ></svg>
                      Browse...
                    </div>
                  </div>
                </div>
              </ng-container>
            </ng-container>
            <div kuiDropdownMenuSeparator></div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="SaveIcon"
                tabler="IconDeviceFloppy"
                hugeicons="FloppyDiskIcon"
                phosphor="FloppyDiskIcon"
                remixicon="RiSaveLine"
              ></svg>
              Save
              <span kuiDropdownMenuShortcut>⌘S</span>
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="DownloadIcon"
                tabler="IconDownload"
                hugeicons="DownloadIcon"
                phosphor="DownloadIcon"
                remixicon="RiDownloadLine"
              ></svg>
              Export
              <span kuiDropdownMenuShortcut>⇧⌘E</span>
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>View</div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.email">
              <svg
                iconPlaceholder
                lucide="EyeIcon"
                tabler="IconEye"
                hugeicons="EyeIcon"
                phosphor="EyeIcon"
                remixicon="RiEyeLine"
              ></svg>
              Show Sidebar
            </div>
            <div kuiDropdownMenuCheckboxItem [(checked)]="notifications.sms">
              <svg
                iconPlaceholder
                lucide="LayoutIcon"
                tabler="IconLayout"
                hugeicons="LayoutIcon"
                phosphor="LayoutIcon"
                remixicon="RiLayoutLine"
              ></svg>
              Show Status Bar
            </div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger>
                <svg
                  iconPlaceholder
                  lucide="PaletteIcon"
                  tabler="IconPalette"
                  hugeicons="PaintBoardIcon"
                  phosphor="PaletteIcon"
                  remixicon="RiPaletteLine"
                ></svg>
                Theme
              </div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>Appearance</div>
                    <div kuiDropdownMenuRadioGroup [(value)]="theme">
                      <div kuiDropdownMenuRadioItem value="light">
                        <svg
                          iconPlaceholder
                          lucide="SunIcon"
                          tabler="IconSun"
                          hugeicons="Sun03Icon"
                          phosphor="SunIcon"
                          remixicon="RiSunLine"
                        ></svg>
                        Light
                      </div>
                      <div kuiDropdownMenuRadioItem value="dark">
                        <svg
                          iconPlaceholder
                          lucide="MoonIcon"
                          tabler="IconMoon"
                          hugeicons="MoonIcon"
                          phosphor="MoonIcon"
                          remixicon="RiMoonLine"
                        ></svg>
                        Dark
                      </div>
                      <div kuiDropdownMenuRadioItem value="system">
                        <svg
                          iconPlaceholder
                          lucide="MonitorIcon"
                          tabler="IconDeviceDesktop"
                          hugeicons="ComputerIcon"
                          phosphor="MonitorIcon"
                          remixicon="RiComputerLine"
                        ></svg>
                        System
                      </div>
                    </div>
                  </div>
                </div>
              </ng-container>
            </ng-container>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>Account</div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              ></svg>
              Profile
              <span kuiDropdownMenuShortcut>⇧⌘P</span>
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
              Billing
            </div>
            <ng-container kuiDropdownMenuSub>
              <div kuiDropdownMenuSubTrigger>
                <svg
                  iconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="TerminalIcon"
                  remixicon="RiSettingsLine"
                ></svg>
                Settings
              </div>
              <ng-container kuiDropdownMenuPortal>
                <div kuiDropdownMenuSubContent>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuLabel>Preferences</div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="KeyboardIcon"
                        tabler="IconKeyboard"
                        hugeicons="KeyboardIcon"
                        phosphor="KeyboardIcon"
                        remixicon="RiKeyboardLine"
                      ></svg>
                      Keyboard Shortcuts
                    </div>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="LanguagesIcon"
                        tabler="IconLanguage"
                        hugeicons="LanguageCircleIcon"
                        phosphor="TranslateIcon"
                        remixicon="RiTranslate"
                      ></svg>
                      Language
                    </div>
                    <ng-container kuiDropdownMenuSub>
                      <div kuiDropdownMenuSubTrigger>
                        <svg
                          iconPlaceholder
                          lucide="BellIcon"
                          tabler="IconBell"
                          hugeicons="NotificationIcon"
                          phosphor="BellIcon"
                          remixicon="RiNotificationLine"
                        ></svg>
                        Notifications
                      </div>
                      <ng-container kuiDropdownMenuPortal>
                        <div kuiDropdownMenuSubContent>
                          <div kuiDropdownMenuGroup>
                            <div kuiDropdownMenuLabel>Notification Types</div>
                            <div
                              kuiDropdownMenuCheckboxItem
                              [(checked)]="notifications.push"
                            >
                              <svg
                                iconPlaceholder
                                lucide="BellIcon"
                                tabler="IconBell"
                                hugeicons="NotificationIcon"
                                phosphor="BellIcon"
                                remixicon="RiNotificationLine"
                              ></svg>
                              Push Notifications
                            </div>
                            <div
                              kuiDropdownMenuCheckboxItem
                              [(checked)]="notifications.email"
                            >
                              <svg
                                iconPlaceholder
                                lucide="MailIcon"
                                tabler="IconMail"
                                hugeicons="Mail01Icon"
                                phosphor="EnvelopeIcon"
                                remixicon="RiMailLine"
                              ></svg>
                              Email Notifications
                            </div>
                          </div>
                        </div>
                      </ng-container>
                    </ng-container>
                  </div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>
                      <svg
                        iconPlaceholder
                        lucide="ShieldIcon"
                        tabler="IconShield"
                        hugeicons="ShieldIcon"
                        phosphor="ShieldIcon"
                        remixicon="RiShieldLine"
                      ></svg>
                      Privacy & Security
                    </div>
                  </div>
                </div>
              </ng-container>
            </ng-container>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="HelpCircleIcon"
                tabler="IconHelpCircle"
                hugeicons="HelpCircleIcon"
                phosphor="QuestionIcon"
                remixicon="RiQuestionLine"
              ></svg>
              Help & Support
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="FileTextIcon"
                tabler="IconFileText"
                hugeicons="FileIcon"
                phosphor="FileTextIcon"
                remixicon="RiFileTextLine"
              ></svg>
              Documentation
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem variant="destructive">
              <svg
                iconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              ></svg>
              Sign Out
              <span kuiDropdownMenuShortcut>⇧⌘Q</span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuComplex {
  protected readonly theme = signal("light")
  protected readonly styles = styles
  protected readonly notifications = notifications
  protected readonly page = page
}
