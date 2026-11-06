import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"
import { Field, FieldDescription, FieldLabel } from "../../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../../../ui/item"
import { Separator } from "../../../ui/separator"
import { Spinner } from "../../../ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip"

const styles = {
  tabsList: css({
    width: { "*": null, base: "100%" },
  }),
  item: css({
    paddingInline: { "*": null, base: space[1] },
    // Item pads by `paddingBlock`, so the card's `pt-2` is its block start.
    paddingBlockStart: { "*": null, base: space[2] },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[56] },
  }),
  separator: css({
    marginInline: { "*": null, base: `calc(${space[2]} * -1)` },
    marginBlock: { "*": null, base: space[2] },
    width: { "*": null, base: "auto" },
  }),
  empty: css({
    padding: { "*": null, base: space[4] },
  }),
  a: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
  separator2: css({
    marginInline: { "*": null, base: `calc(${space[2]} * -1)` },
    marginBlock: { "*": null, base: space[2] },
    width: { "*": null, base: "auto" },
  }),
  div: css({
    padding: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  item2: css({
    display: { "*": null, base: "none" },
    padding: { "*": null, base: space["0"] },
  }),
  itemTitle: css({
    gap: { "*": null, base: space[2] },
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  tabsList2: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    [select.child("button")]: {
      flex: "0",
    },
  }),
  div2: css({
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 30%, transparent)`,
    padding: space[2],
  }),
  field: css({
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  field2: css({
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel2: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  field3: css({
    gap: { "*": null, base: space[2] },
  }),
  fieldLabel3: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  separator3: css({
    marginInline: { "*": null, base: `calc(${space[2]} * -1)` },
    marginBlock: { "*": null, base: space[2] },
    width: { "*": null, base: "auto" },
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
  }),
  button: css({
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
  }),
  button2: css({
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
  }),
}

@Component({
  selector: "kui-codespaces-card",
  imports: [
    Button,
    Card,
    CardContent,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Field,
    FieldDescription,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
    Separator,
    Spinner,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiTabs defaultValue="codespaces">
          <div kuiTabsList [sx]="styles.tabsList">
            <button kuiTabsTrigger value="codespaces">Codespaces</button>
            <button kuiTabsTrigger value="local">Local</button>
          </div>
          <div kuiTabsContent value="codespaces">
            <div kuiItem size="sm" [sx]="styles.item">
              <div kuiItemContent>
                <div kuiItemTitle>Codespaces</div>
                <p kuiItemDescription>Your workspaces in the cloud</p>
              </div>
              <div kuiItemActions>
                <ng-container kuiTooltip>
                  <button
                    kuiButton
                    kuiTooltipTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                    ></svg>
                  </button>
                  <div kuiTooltipContent side="bottom">
                    Create a codespace on main
                  </div>
                </ng-container>
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    ></svg>
                  </button>
                  <div
                    kuiDropdownMenuContent
                    align="end"
                    [sx]="styles.dropdownMenuContent"
                  >
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="PlusIcon"
                          tabler="IconPlus"
                          hugeicons="PlusSignIcon"
                          phosphor="PlusIcon"
                          remixicon="RiAddLine"
                        ></svg>
                        New with options...
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ContainerIcon"
                          tabler="IconBox"
                          hugeicons="CubeIcon"
                          phosphor="CubeIcon"
                          remixicon="RiBox1Line"
                        ></svg>
                        Configure container
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ZapIcon"
                          tabler="IconBolt"
                          hugeicons="ZapIcon"
                          phosphor="LightningIcon"
                          remixicon="RiFlashlightLine"
                        ></svg>
                        Set up prebuilds
                      </div>
                    </div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuGroup>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ServerIcon"
                          tabler="IconServer"
                          hugeicons="ServerStackIcon"
                          phosphor="HardDrivesIcon"
                          remixicon="RiHardDriveLine"
                        ></svg>
                        Manage codespaces
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ShareIcon"
                          tabler="IconShare2"
                          hugeicons="Share03Icon"
                          phosphor="ShareIcon"
                          remixicon="RiShareLine"
                        ></svg>
                        Share deep link
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="InfoIcon"
                          tabler="IconInfoCircle"
                          hugeicons="AlertCircleIcon"
                          phosphor="InfoIcon"
                          remixicon="RiInformationLine"
                        ></svg>
                        What are codespaces?
                      </div>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
            <div kuiSeparator [sx]="styles.separator"></div>
            <div kuiEmpty [sx]="styles.empty">
              <div kuiEmptyHeader>
                <div kuiEmptyMedia variant="icon">
                  <svg
                    iconPlaceholder
                    lucide="ServerIcon"
                    tabler="IconServer"
                    hugeicons="ServerStackIcon"
                    phosphor="HardDrivesIcon"
                    remixicon="RiHardDriveLine"
                  ></svg>
                </div>
                <div kuiEmptyTitle>No codespaces</div>
                <div kuiEmptyDescription>
                  You don't have any codespaces with this repository checked out
                </div>
              </div>
              <div kuiEmptyContent>
                <button
                  kuiButton
                  size="sm"
                  (click)="createCodespace()"
                  [disabled]="isCreatingCodespace()"
                >
                  @if (isCreatingCodespace()) {
                    <svg kuiSpinner data-icon="inline-start"></svg>
                  } @else {
                    {{ "" }}
                  }
                  Create Codespace
                </button>
                <a href="#learn-more" [sx]="styles.a"
                  >Learn more about codespaces</a
                >
              </div>
            </div>
            <div kuiSeparator [sx]="styles.separator2"></div>
            <div [sx]="styles.div">
              Codespace usage for this repository is paid for by{{ " " }}
              <span [sx]="styles.span">shadcn</span>
              .
            </div>
          </div>
          <div kuiTabsContent value="local">
            <div kuiItem size="sm" [sx]="styles.item2">
              <div kuiItemContent>
                <div kuiItemTitle [sx]="styles.itemTitle">
                  <svg
                    iconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                    [sx]="styles.iconPlaceholder"
                  ></svg>
                  Clone
                </div>
              </div>
              <div kuiItemActions>
                <ng-container kuiTooltip>
                  <button
                    kuiButton
                    kuiTooltipTrigger
                    variant="ghost"
                    size="icon"
                  >
                    <svg
                      iconPlaceholder
                      lucide="InfoIcon"
                      tabler="IconInfoCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="InfoIcon"
                      remixicon="RiInformationLine"
                    ></svg>
                  </button>
                  <div kuiTooltipContent side="left">
                    Which remote URL should I use?
                  </div>
                </ng-container>
              </div>
            </div>
            <div kuiTabs defaultValue="https">
              <div kuiTabsList variant="line" [sx]="styles.tabsList2">
                <button kuiTabsTrigger value="https">HTTPS</button>
                <button kuiTabsTrigger value="ssh">SSH</button>
                <button kuiTabsTrigger value="cli">GitHub CLI</button>
              </div>
              <div [sx]="styles.div2">
                <div kuiTabsContent value="https">
                  <div kuiField [sx]="styles.field">
                    <label
                      kuiFieldLabel
                      for="https-url"
                      [sx]="styles.fieldLabel"
                      >HTTPS URL</label
                    >
                    <div kuiInputGroup>
                      <div kuiInputGroupAddon align="inline-end">
                        <button
                          kuiInputGroupButton
                          variant="ghost"
                          size="icon-xs"
                        >
                          <svg
                            iconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          ></svg>
                        </button>
                      </div>
                      <input
                        kuiInputGroupInput
                        id="https-url"
                        default-value="https://github.com/shadcn-ui/ui.git"
                        readonly
                      />
                    </div>
                    <p kuiFieldDescription>Clone using the web URL.</p>
                  </div>
                </div>
                <div kuiTabsContent value="ssh">
                  <div kuiField [sx]="styles.field2">
                    <label kuiFieldLabel for="ssh-url" [sx]="styles.fieldLabel2"
                      >SSH URL</label
                    >
                    <div kuiInputGroup>
                      <div kuiInputGroupAddon align="inline-end">
                        <button
                          kuiInputGroupButton
                          variant="ghost"
                          size="icon-xs"
                        >
                          <svg
                            iconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          ></svg>
                        </button>
                      </div>
                      <input
                        kuiInputGroupInput
                        id="ssh-url"
                        default-value="git@github.com:shadcn-ui/ui.git"
                        readonly
                      />
                    </div>
                    <p kuiFieldDescription>Use a password-protected SSH key.</p>
                  </div>
                </div>
                <div kuiTabsContent value="cli">
                  <div kuiField [sx]="styles.field3">
                    <label
                      kuiFieldLabel
                      for="cli-command"
                      [sx]="styles.fieldLabel3"
                      >CLI Command</label
                    >
                    <div kuiInputGroup>
                      <div kuiInputGroupAddon align="inline-end">
                        <button
                          kuiInputGroupButton
                          variant="ghost"
                          size="icon-xs"
                        >
                          <svg
                            iconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          ></svg>
                        </button>
                      </div>
                      <input
                        kuiInputGroupInput
                        id="cli-command"
                        default-value="gh repo clone shadcn-ui/ui"
                        readonly
                      />
                    </div>
                    <p kuiFieldDescription>
                      Work fast with our official CLI.{{ " " }}
                      <a href="#learn-more">Learn more</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div kuiSeparator [sx]="styles.separator3"></div>
            <div [sx]="styles.div3">
              <button kuiButton variant="ghost" size="sm" [sx]="styles.button">
                <svg
                  iconPlaceholder
                  lucide="MonitorIcon"
                  tabler="IconDeviceDesktop"
                  hugeicons="ComputerIcon"
                  phosphor="MonitorIcon"
                  remixicon="RiComputerLine"
                  data-icon="inline-start"
                ></svg>
                Open with GitHub Desktop
              </button>
              <button kuiButton variant="ghost" size="sm" [sx]="styles.button2">
                <svg
                  iconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                  data-icon="inline-start"
                ></svg>
                Download ZIP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CodespacesCard {
  protected readonly isCreatingCodespace = signal(false)
  protected readonly styles = styles
  // Creating, for two seconds.
  protected createCodespace() {
    this.isCreatingCodespace.set(true)
    setTimeout(() => (this.isCreatingCodespace.set(false), 2000))
  }
}
