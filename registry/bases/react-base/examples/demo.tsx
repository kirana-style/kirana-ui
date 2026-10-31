import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Field, FieldGroup } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css, defineTokens, select } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  breakpoint,
  containerSize,
  fontFamily,
  space,
} from "../../../core/scales"

const modes = defineTokens(
  "ex-base-demo-modes",
  {
    mixBlendMode: { light: "darken", dark: "lighten" },
  },
  { variable: true }
)

/** Upstream's swatches, each named by its variable and drawn in the design's token. */
const SWATCHES = [
  ["--background", theme.background],
  ["--foreground", theme.foreground],
  ["--primary", theme.primary],
  ["--secondary", theme.secondary],
  ["--muted", theme.muted],
  ["--accent", theme.accent],
  ["--border", theme.border],
  ["--chart-1", theme.chart1],
  ["--chart-2", theme.chart2],
  ["--chart-3", theme.chart3],
  ["--chart-4", theme.chart4],
  ["--chart-5", theme.chart5],
] as const

const styles = {
  div: css({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    padding: {
      base: space[4],
      [breakpoint.sm]: space[6],
      [breakpoint.lg]: space[12],
    },
  }),
  div2: css({
    display: "grid",
    maxWidth: containerSize["3xl"],
    gap: space[4],
    gridTemplateColumns: { [breakpoint.sm]: "repeat(2, minmax(0, 1fr))" },
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  cardDescription: css({
    WebkitLineClamp: { "*": null, base: "2" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  div4: css({
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: space[3],
  }),
  div5: css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  div6: css({
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: radius.lg,
    "::after": {
      content: '""',
      position: "absolute",
      insetBlock: space["0"],
      insetInline: space["0"],
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
      mixBlendMode: modes.mixBlendMode,
    },
  }),
  div7: css({
    display: { base: "none", [breakpoint.md]: "block" },
    maxWidth: space[14],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.60rem",
  }),
  div8: css({
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
    placeItems: "center",
    gap: space[4],
  }),
  card: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card2: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card3: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card4: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card5: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card6: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card7: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card8: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card9: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card10: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card11: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card12: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card13: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card14: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card15: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  card16: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space["0"] },

    boxShadow: "none",
    [select.child("svg")]: {
      width: space[4],
      height: space[4],
    },
  }),
  div9: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  card17: css({
    width: { "*": null, base: "100%" },
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[6] },
  }),
  div10: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  div11: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  itemDescription: css({
    textWrap: { "*": null, base: "pretty" },
    display: { [breakpoint.xl]: "none", [breakpoint["2xl"]]: "block" },
  }),
  itemActions: css({
    display: { "*": null, base: "none", [breakpoint.md]: "flex" },
  }),
  slider: css({
    flex: "1 1 0%",
  }),
  field: css({
    flex: "1 1 0%",
  }),
  textarea: css({
    resize: { "*": null, base: "none" },
  }),
  div12: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  div13: css({
    display: "flex",
    gap: space[2],
  }),
  radioGroup: css({
    marginLeft: { "*": null, base: "auto" },
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "fit-content" },
    gap: { "*": null, base: space[3] },
  }),
  div14: css({
    display: "flex",
    gap: space[3],
  }),
  div15: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
  }),
  span: css({
    display: { base: "none", [breakpoint.md]: "block" },
  }),
  span2: css({
    display: { base: "block", [breakpoint.md]: "none" },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: "fit-content" },
  }),
  switch: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

export default function Demo() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setSliderValue([value])
      } else {
        setSliderValue([...value])
      }
    },
    []
  )

  return (
    <div sx={styles.div}>
      <div sx={styles.div2}>
        <div sx={styles.div3}>
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription sx={styles.cardDescription}>
                Designers love packing quirky glyphs into test phrases. This is
                a preview of the typography styles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div sx={styles.div4}>
                {SWATCHES.map(([variant, color]) => (
                  <div key={variant} sx={styles.div5}>
                    <div sx={styles.div6} style={{ backgroundColor: color }} />
                    <div sx={styles.div7}>{variant}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div sx={styles.div8}>
                <Card sx={styles.card}>
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                </Card>
                <Card sx={styles.card2}>
                  <IconPlaceholder
                    lucide="CircleAlertIcon"
                    tabler="IconExclamationCircle"
                    hugeicons="AlertCircleIcon"
                    phosphor="WarningCircleIcon"
                    remixicon="RiErrorWarningLine"
                  />
                </Card>
                <Card sx={styles.card3}>
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                </Card>
                <Card sx={styles.card4}>
                  <IconPlaceholder
                    lucide="ShareIcon"
                    tabler="IconShare"
                    hugeicons="Share03Icon"
                    phosphor="ShareIcon"
                    remixicon="RiShareLine"
                  />
                </Card>
                <Card sx={styles.card5}>
                  <IconPlaceholder
                    lucide="ShoppingBagIcon"
                    tabler="IconShoppingBag"
                    hugeicons="ShoppingBag01Icon"
                    phosphor="BagIcon"
                    remixicon="RiShoppingBagLine"
                  />
                </Card>
                <Card sx={styles.card6}>
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeIcon"
                    remixicon="RiMoreLine"
                  />
                </Card>
                <Card sx={styles.card7}>
                  <IconPlaceholder
                    lucide="Loader2Icon"
                    tabler="IconLoader"
                    hugeicons="Loading03Icon"
                    phosphor="SpinnerIcon"
                    remixicon="RiLoaderLine"
                  />
                </Card>
                <Card sx={styles.card8}>
                  <IconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  />
                </Card>
                <Card sx={styles.card9}>
                  <IconPlaceholder
                    lucide="MinusIcon"
                    tabler="IconMinus"
                    hugeicons="MinusSignIcon"
                    phosphor="MinusIcon"
                    remixicon="RiSubtractLine"
                  />
                </Card>
                <Card sx={styles.card10}>
                  <IconPlaceholder
                    lucide="ArrowLeftIcon"
                    tabler="IconArrowLeft"
                    hugeicons="ArrowLeft02Icon"
                    phosphor="ArrowLeftIcon"
                    remixicon="RiArrowLeftLine"
                  />
                </Card>
                <Card sx={styles.card11}>
                  <IconPlaceholder
                    lucide="ArrowRightIcon"
                    tabler="IconArrowRight"
                    hugeicons="ArrowRight02Icon"
                    phosphor="ArrowRightIcon"
                    remixicon="RiArrowRightLine"
                  />
                </Card>
                <Card sx={styles.card12}>
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                </Card>
                <Card sx={styles.card13}>
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </Card>
                <Card sx={styles.card14}>
                  <IconPlaceholder
                    lucide="ChevronRightIcon"
                    tabler="IconChevronRight"
                    hugeicons="ArrowRight01Icon"
                    phosphor="CaretRightIcon"
                    remixicon="RiArrowRightSLine"
                  />
                </Card>
                <Card sx={styles.card15}>
                  <IconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  />
                </Card>
                <Card sx={styles.card16}>
                  <IconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="Settings01Icon"
                    phosphor="GearIcon"
                    remixicon="RiSettingsLine"
                  />
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <div sx={styles.div9}>
          <Card sx={styles.card17}>
            <CardContent sx={styles.cardContent}>
              <div sx={styles.div10}>
                <div sx={styles.div11}>
                  <Button>Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Two-factor authentication</ItemTitle>
                    <ItemDescription sx={styles.itemDescription}>
                      Verify via email or phone number.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions sx={styles.itemActions}>
                    <Button size="sm" variant="secondary">
                      Enable
                    </Button>
                  </ItemActions>
                </Item>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={handleSliderValueChange}
                max={1000}
                min={0}
                step={10}
                sx={styles.slider}
                aria-label="Slider"
              />
              <FieldGroup>
                <Field>
                  <InputGroup>
                    <InputGroupInput placeholder="Name" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>
                        <IconPlaceholder
                          lucide="SearchIcon"
                          tabler="IconSearch"
                          hugeicons="Search01Icon"
                          phosphor="MagnifyingGlassIcon"
                          remixicon="RiSearchLine"
                        />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field sx={styles.field}>
                  <Textarea placeholder="Message" sx={styles.textarea} />
                </Field>
              </FieldGroup>
              <div sx={styles.div12}>
                <div sx={styles.div13}>
                  <Badge>Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <RadioGroup defaultValue="apple" sx={styles.radioGroup}>
                  <RadioGroupItem value="apple" />
                  <RadioGroupItem value="banana" />
                </RadioGroup>
                <div sx={styles.div14}>
                  <Checkbox defaultChecked />
                  <Checkbox />
                </div>
              </div>
              <div sx={styles.div15}>
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="outline" />}>
                    <span sx={styles.span}>Alert Dialog</span>
                    <span sx={styles.span2}>Dialog</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Allow accessory to connect?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to allow the USB accessory to connect to
                        this device and your data?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                      <AlertDialogAction>Allow</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <ButtonGroup>
                  <Button variant="outline">Button Group</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="outline" size="icon" />}
                    >
                      <IconPlaceholder
                        lucide="ChevronUpIcon"
                        tabler="IconChevronUp"
                        hugeicons="ArrowUp01Icon"
                        phosphor="CaretUpIcon"
                        remixicon="RiArrowUpSLine"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="top"
                      sx={styles.dropdownMenuContent}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                        <DropdownMenuItem>Block User</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                        <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
                <Switch defaultChecked sx={styles.switch} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
