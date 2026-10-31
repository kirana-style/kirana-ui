import * as React from "react"

import { Example, ExampleWrapper } from "../components/example"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
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
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { containerSize, space } from "../../../core/scales"

const styles = {
  cardExampleExample: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  cardExampleCard: css({
    position: { "*": null, base: "relative" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    overflow: { "*": null, base: "hidden" },
    paddingTop: { "*": null, base: space["0"] },
  }),
  cardExampleDiv: css({
    position: "absolute",
    inset: space["0"],
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  }),
  cardExampleImg: css({
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  }),
  cardExampleBadge: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  formExampleCard: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.md },
  }),
  formExampleSpan: css({
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
  formExampleDropdownMenuContent: css({
    width: { "*": null, base: space[56] },
  }),
  formExampleDiv: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
}

export default function ComponentExample() {
  return (
    <ExampleWrapper>
      <CardExample />
      <FormExample />
    </ExampleWrapper>
  )
}

function CardExample() {
  return (
    <Example title="Card" sx={styles.cardExampleExample}>
      <Card sx={styles.cardExampleCard}>
        <div sx={styles.cardExampleDiv} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.cardExampleImg}
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger render={<Button />}>
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
                data-icon="inline-start"
              />
              Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <IconPlaceholder
                    lucide="BluetoothIcon"
                    tabler="IconBluetooth"
                    hugeicons="BluetoothIcon"
                    phosphor="BluetoothIcon"
                    remixicon="RiBluetoothLine"
                  />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Badge variant="secondary" sx={styles.cardExampleBadge}>
            Warning
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  )
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const roleItems = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Manager", value: "manager" },
  { label: "Other", value: "other" },
]

function FormExample() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [colorTheme, setColorTheme] = React.useState("light")

  return (
    <Example title="Form">
      <Card sx={styles.formExampleCard}>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please fill in your details below</CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <IconPlaceholder
                  lucide="MoreVerticalIcon"
                  tabler="IconDotsVertical"
                  hugeicons="MoreVerticalCircle01Icon"
                  phosphor="DotsThreeVerticalIcon"
                  remixicon="RiMore2Line"
                />
                <span sx={styles.formExampleSpan}>More options</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sx={styles.formExampleDropdownMenuContent}
              >
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
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <IconPlaceholder
                              lucide="FileCodeIcon"
                              tabler="IconFileCode"
                              hugeicons="CodeIcon"
                              phosphor="CodeIcon"
                              remixicon="RiCodeLine"
                            />
                            Project Alpha
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconPlaceholder
                              lucide="FileCodeIcon"
                              tabler="IconFileCode"
                              hugeicons="CodeIcon"
                              phosphor="CodeIcon"
                              remixicon="RiCodeLine"
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
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <IconPlaceholder
                                    lucide="FileCodeIcon"
                                    tabler="IconFileCode"
                                    hugeicons="CodeIcon"
                                    phosphor="CodeIcon"
                                    remixicon="RiCodeLine"
                                  />
                                  Project Gamma
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <IconPlaceholder
                                    lucide="FileCodeIcon"
                                    tabler="IconFileCode"
                                    hugeicons="CodeIcon"
                                    phosphor="CodeIcon"
                                    remixicon="RiCodeLine"
                                  />
                                  Project Delta
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
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
                    </DropdownMenuPortal>
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
                <DropdownMenuGroup>
                  <DropdownMenuLabel>View</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        email: checked === true,
                      })
                    }
                  >
                    <IconPlaceholder
                      lucide="EyeIcon"
                      tabler="IconEye"
                      hugeicons="EyeIcon"
                      phosphor="EyeIcon"
                      remixicon="RiEyeLine"
                    />
                    Show Sidebar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        sms: checked === true,
                      })
                    }
                  >
                    <IconPlaceholder
                      lucide="LayoutIcon"
                      tabler="IconLayout"
                      hugeicons="LayoutIcon"
                      phosphor="LayoutIcon"
                      remixicon="RiLayoutLine"
                    />
                    Show Status Bar
                  </DropdownMenuCheckboxItem>
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
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            value={colorTheme}
                            onValueChange={setColorTheme}
                          >
                            <DropdownMenuRadioItem value="light">
                              <IconPlaceholder
                                lucide="SunIcon"
                                tabler="IconSun"
                                hugeicons="SunIcon"
                                phosphor="SunIcon"
                                remixicon="RiSunLine"
                              />
                              Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark">
                              <IconPlaceholder
                                lucide="MoonIcon"
                                tabler="IconMoon"
                                hugeicons="MoonIcon"
                                phosphor="MoonIcon"
                                remixicon="RiMoonLine"
                              />
                              Dark
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="system">
                              <IconPlaceholder
                                lucide="MonitorIcon"
                                tabler="IconDeviceDesktop"
                                hugeicons="ComputerIcon"
                                phosphor="MonitorIcon"
                                remixicon="RiComputerLine"
                              />
                              System
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
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
                        phosphor="GearIcon"
                        remixicon="RiSettingsLine"
                      />
                      Settings
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
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
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuGroup>
                                  <DropdownMenuLabel>
                                    Notification Types
                                  </DropdownMenuLabel>
                                  <DropdownMenuCheckboxItem
                                    checked={notifications.push}
                                    onCheckedChange={(checked) =>
                                      setNotifications({
                                        ...notifications,
                                        push: checked === true,
                                      })
                                    }
                                  >
                                    <IconPlaceholder
                                      lucide="BellIcon"
                                      tabler="IconBell"
                                      hugeicons="NotificationIcon"
                                      phosphor="BellIcon"
                                      remixicon="RiNotificationLine"
                                    />
                                    Push Notifications
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuCheckboxItem
                                    checked={notifications.email}
                                    onCheckedChange={(checked) =>
                                      setNotifications({
                                        ...notifications,
                                        email: checked === true,
                                      })
                                    }
                                  >
                                    <IconPlaceholder
                                      lucide="MailIcon"
                                      tabler="IconMail"
                                      hugeicons="MailIcon"
                                      phosphor="EnvelopeIcon"
                                      remixicon="RiMailLine"
                                    />
                                    Email Notifications
                                  </DropdownMenuCheckboxItem>
                                </DropdownMenuGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
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
                    </DropdownMenuPortal>
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
                      hugeicons="File01Icon"
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
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <div sx={styles.formExampleDiv}>
                <Field>
                  <FieldLabel htmlFor="small-form-name">Name</FieldLabel>
                  <Input
                    id="small-form-name"
                    placeholder="Enter your name"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
                  <Select items={roleItems} defaultValue={null}>
                    <SelectTrigger id="small-form-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roleItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="small-form-framework">
                  Framework
                </FieldLabel>
                <Combobox items={frameworks}>
                  <ComboboxInput
                    id="small-form-framework"
                    placeholder="Select a framework"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
              <Field>
                <FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
                <Textarea
                  id="small-form-comments"
                  placeholder="Add any additional comments"
                />
              </Field>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Example>
  )
}
