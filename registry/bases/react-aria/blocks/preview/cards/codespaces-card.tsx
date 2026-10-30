"use client"

import * as React from "react"

import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  DropdownMenu,
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
import { Tooltip, TooltipTrigger } from "../../../ui/tooltip"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, select, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  tabsList: css({
    width: { "*": null, base: "100%" },
  }),
  item: css({
    paddingInline: { "*": null, base: space[1] },
    // Item pads by `paddingBlock`, so the card's `pt-2` is its block start.
    paddingBlockStart: { "*": null, base: space[2] },
  }),
  dropdownMenu: css({
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

export function CodespacesCard() {
  const [isCreatingCodespace, setIsCreatingCodespace] = React.useState(false)
  return (
    <Card>
      <CardContent>
        <Tabs defaultSelectedKey="codespaces">
          <TabsList sx={styles.tabsList}>
            <TabsTrigger id="codespaces">Codespaces</TabsTrigger>
            <TabsTrigger id="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent id="codespaces">
            <Item size="sm" sx={styles.item}>
              <ItemContent>
                <ItemTitle>Codespaces</ItemTitle>
                <ItemDescription>Your workspaces in the cloud</ItemDescription>
              </ItemContent>
              <ItemActions>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="PlusIcon"
                      tabler="IconPlus"
                      hugeicons="PlusSignIcon"
                      phosphor="PlusIcon"
                      remixicon="RiAddLine"
                    />
                  </Button>
                  <Tooltip placement="bottom">
                    Create a codespace on main
                  </Tooltip>
                </TooltipTrigger>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end" sx={styles.dropdownMenu}>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="PlusIcon"
                          tabler="IconPlus"
                          hugeicons="PlusSignIcon"
                          phosphor="PlusIcon"
                          remixicon="RiAddLine"
                        />
                        New with options...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ContainerIcon"
                          tabler="IconBox"
                          hugeicons="CubeIcon"
                          phosphor="CubeIcon"
                          remixicon="RiBox1Line"
                        />
                        Configure container
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ZapIcon"
                          tabler="IconBolt"
                          hugeicons="ZapIcon"
                          phosphor="LightningIcon"
                          remixicon="RiFlashlightLine"
                        />
                        Set up prebuilds
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ServerIcon"
                          tabler="IconServer"
                          hugeicons="ServerStackIcon"
                          phosphor="HardDrivesIcon"
                          remixicon="RiHardDriveLine"
                        />
                        Manage codespaces
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ShareIcon"
                          tabler="IconShare2"
                          hugeicons="Share03Icon"
                          phosphor="ShareIcon"
                          remixicon="RiShareLine"
                        />
                        Share deep link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="InfoIcon"
                          tabler="IconInfoCircle"
                          hugeicons="AlertCircleIcon"
                          phosphor="InfoIcon"
                          remixicon="RiInformationLine"
                        />
                        What are codespaces?
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </ItemActions>
            </Item>
            <Separator sx={styles.separator} />
            <Empty sx={styles.empty}>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconPlaceholder
                    lucide="ServerIcon"
                    tabler="IconServer"
                    hugeicons="ServerStackIcon"
                    phosphor="HardDrivesIcon"
                    remixicon="RiHardDriveLine"
                  />
                </EmptyMedia>
                <EmptyTitle>No codespaces</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any codespaces with this repository
                  checked out
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreatingCodespace(true)
                    setTimeout(() => {
                      setIsCreatingCodespace(false)
                    }, 2000)
                  }}
                  isDisabled={isCreatingCodespace}
                >
                  {isCreatingCodespace ? (
                    <Spinner data-icon="inline-start" />
                  ) : (
                    ""
                  )}
                  Create Codespace
                </Button>
                <a href="#learn-more" sx={styles.a}>
                  Learn more about codespaces
                </a>
              </EmptyContent>
            </Empty>
            <Separator sx={styles.separator2} />
            <div sx={styles.div}>
              Codespace usage for this repository is paid for by{" "}
              <span sx={styles.span}>shadcn</span>.
            </div>
          </TabsContent>
          <TabsContent id="local">
            <Item size="sm" sx={styles.item2}>
              <ItemContent>
                <ItemTitle sx={styles.itemTitle}>
                  <IconPlaceholder
                    lucide="TerminalIcon"
                    tabler="IconTerminal"
                    hugeicons="ComputerTerminal01Icon"
                    phosphor="TerminalIcon"
                    remixicon="RiTerminalBoxLine"
                    {...styleProps(styles.iconPlaceholder)}
                  />
                  Clone
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <TooltipTrigger>
                  <Button variant="ghost" size="icon">
                    <IconPlaceholder
                      lucide="InfoIcon"
                      tabler="IconInfoCircle"
                      hugeicons="AlertCircleIcon"
                      phosphor="InfoIcon"
                      remixicon="RiInformationLine"
                    />
                  </Button>
                  <Tooltip placement="left">
                    Which remote URL should I use?
                  </Tooltip>
                </TooltipTrigger>
              </ItemActions>
            </Item>
            <Tabs defaultSelectedKey="https">
              <TabsList variant="line" sx={styles.tabsList2}>
                <TabsTrigger id="https">HTTPS</TabsTrigger>
                <TabsTrigger id="ssh">SSH</TabsTrigger>
                <TabsTrigger id="cli">GitHub CLI</TabsTrigger>
              </TabsList>
              <div sx={styles.div2}>
                <TabsContent id="https">
                  <Field sx={styles.field}>
                    <FieldLabel htmlFor="https-url" sx={styles.fieldLabel}>
                      HTTPS URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="https-url"
                        defaultValue="https://github.com/shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Clone using the web URL.
                    </FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent id="ssh">
                  <Field sx={styles.field2}>
                    <FieldLabel htmlFor="ssh-url" sx={styles.fieldLabel2}>
                      SSH URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="ssh-url"
                        defaultValue="git@github.com:shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Use a password-protected SSH key.
                    </FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent id="cli">
                  <Field sx={styles.field3}>
                    <FieldLabel htmlFor="cli-command" sx={styles.fieldLabel3}>
                      CLI Command
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder
                            lucide="CopyIcon"
                            tabler="IconCopy"
                            hugeicons="Copy01Icon"
                            phosphor="CopyIcon"
                            remixicon="RiFileCopyLine"
                          />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="cli-command"
                        defaultValue="gh repo clone shadcn-ui/ui"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Work fast with our official CLI.{" "}
                      <a href="#learn-more">Learn more</a>
                    </FieldDescription>
                  </Field>
                </TabsContent>
              </div>
            </Tabs>
            <Separator sx={styles.separator3} />
            <div sx={styles.div3}>
              <Button variant="ghost" size="sm" sx={styles.button}>
                <IconPlaceholder
                  lucide="MonitorIcon"
                  tabler="IconDeviceDesktop"
                  hugeicons="ComputerIcon"
                  phosphor="MonitorIcon"
                  remixicon="RiComputerLine"
                  data-icon="inline-start"
                />
                Open with GitHub Desktop
              </Button>
              <Button variant="ghost" size="sm" sx={styles.button2}>
                <IconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  hugeicons="DownloadIcon"
                  phosphor="DownloadIcon"
                  remixicon="RiDownloadLine"
                  data-icon="inline-start"
                />
                Download ZIP
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
