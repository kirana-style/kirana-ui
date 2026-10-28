import { css } from "@kirana-style/core"

import { Focusable } from "react-aria-components"

import { Example, ExampleWrapper } from "../components/example"
import { Button, buttonVariants } from "../ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
  buttonGroupVariants,
} from "../ui/button-group"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { axes } from "../../../core/axes"

const styles = {
  // A row of the example's card, which upstream's `*:[div:not([class*='w-'])]:w-full` widens.
  row: css({ width: "100%" }),
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  styleLumaBorderBorder: css({
    borderColor: { [axes.style.luma]: theme.border },
  }),
  w50: css({ width: { "*": null, base: spacing(50) } }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  gridGridCols3Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
  colSpan2: css({ gridColumn: "span 2 / span 2" }),
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
  w12: css({ width: { "*": null, base: space[12] } }),
  hFit: css({ height: "fit-content" }),
}

export default function ButtonGroupExample() {
  return (
    <ExampleWrapper>
      <ButtonGroupBasic />
      <ButtonGroupWithInput />
      <ButtonGroupWithText />
      <ButtonGroupWithDropdown />
      <ButtonGroupWithSelect />
      <ButtonGroupWithIcons />
      <ButtonGroupWithInputGroup />
      <ButtonGroupWithFields />
      <ButtonGroupWithLike />
      <ButtonGroupWithSelectAndInput />
      <ButtonGroupNested />
      <ButtonGroupPagination />
      <ButtonGroupPaginationSplit />
      <ButtonGroupNavigation />
      <ButtonGroupTextAlignment />
      <ButtonGroupVertical />
      <ButtonGroupVerticalNested />
    </ExampleWrapper>
  )
}

function ButtonGroupBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.flexFlexColGap4}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithInput() {
  return (
    <Example title="With Input">
      <div sx={styles.flexFlexColGap4}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Input placeholder="Type something here..." />
        </ButtonGroup>
        <ButtonGroup>
          <Input placeholder="Type something here..." />
          <Button variant="outline">Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithText() {
  return (
    <Example title="With Text">
      <div sx={styles.flexFlexColGap4}>
        <ButtonGroup>
          <ButtonGroupText>Text</ButtonGroupText>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText
            render={(props) => (
              // React Aria's Label sets its own classes over the text's: they go as its `sx`.
              <Label
                htmlFor="input-text"
                {...props}
                sx={buttonGroupVariants.text}
              />
            )}
          >
            GPU Size
          </ButtonGroupText>
          <Input
            id="input-text"
            placeholder="Type something here..."
            sx={styles.styleLumaBorderBorder}
          />
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithDropdown() {
  return (
    <Example title="With Dropdown">
      <div sx={styles.flexFlexColGap4}>
        <ButtonGroup>
          <Button variant="outline">Update</Button>

          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </Button>
            <DropdownMenu placement="bottom end">
              <DropdownMenuItem>Disable</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Uninstall
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Follow</Button>

          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
              />
            </Button>
            <DropdownMenu placement="bottom end" sx={styles.w50}>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="VolumeX"
                    tabler="IconVolume"
                    hugeicons="VolumeOffIcon"
                    phosphor="SpeakerSlashIcon"
                    remixicon="RiVolumeMuteLine"
                  />
                  Mute Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="AlertTriangleIcon"
                    tabler="IconAlertTriangle"
                    hugeicons="AlertCircleIcon"
                    phosphor="WarningIcon"
                    remixicon="RiErrorWarningLine"
                  />
                  Report Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="UserRoundXIcon"
                    tabler="IconUserX"
                    hugeicons="UserRemove01Icon"
                    phosphor="UserMinusIcon"
                    remixicon="RiUserUnfollowLine"
                  />
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ShareIcon"
                    tabler="IconShare"
                    hugeicons="Share03Icon"
                    phosphor="ShareIcon"
                    remixicon="RiShareLine"
                  />
                  Share Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="Copy01Icon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  />
                  Copy Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <IconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="Delete02Icon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </ButtonGroup>
      </div>
    </Example>
  )
}

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
]

function ButtonGroupWithSelect() {
  return (
    <Example title="With Select">
      <Field>
        <Label htmlFor="amount">Amount</Label>
        <ButtonGroup>
          <Select aria-label="Currency" defaultValue={currencyItems[0].value}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyItems.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="Enter amount to send" />
          <Button variant="outline">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </Button>
        </ButtonGroup>
      </Field>
    </Example>
  )
}

function ButtonGroupWithIcons() {
  return (
    <Example title="With Icons">
      <div sx={styles.flexFlexColGap4}>
        <ButtonGroup>
          <Button variant="outline">
            <IconPlaceholder
              lucide="FlipHorizontalIcon"
              tabler="IconFlipHorizontal"
              hugeicons="FlipHorizontalIcon"
              phosphor="ArrowsHorizontalIcon"
              remixicon="RiArrowLeftRightLine"
            />
          </Button>
          <Button variant="outline">
            <IconPlaceholder
              lucide="FlipVerticalIcon"
              tabler="IconFlipVertical"
              hugeicons="FlipVerticalIcon"
              phosphor="ArrowsVerticalIcon"
              remixicon="RiArrowUpDownLine"
            />
          </Button>
          <Button variant="outline">
            <IconPlaceholder
              lucide="RotateCwIcon"
              tabler="IconRotateClockwise2"
              hugeicons="Rotate01Icon"
              phosphor="ArrowClockwiseIcon"
              remixicon="RiRefreshLine"
            />
          </Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithInputGroup() {
  return (
    <Example title="With Input Group">
      <div sx={[styles.flexFlexColGap4, styles.row]}>
        <InputGroup>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-start" sx={styles.textMutedForeground}>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithFields() {
  return (
    <Example title="With Fields">
      <FieldGroup sx={styles.gridGridCols3Gap4}>
        <Field sx={styles.colSpan2}>
          <Label htmlFor="width">Width</Label>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput id="width" />
              <InputGroupAddon sx={styles.textMutedForeground}>
                W
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                sx={styles.textMutedForeground}
              >
                px
              </InputGroupAddon>
            </InputGroup>
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="MinusIcon"
                tabler="IconMinus"
                hugeicons="MinusSignIcon"
                phosphor="MinusIcon"
                remixicon="RiSubtractLine"
              />
            </Button>
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </Button>
          </ButtonGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function ButtonGroupWithLike() {
  return (
    <Example title="With Like">
      <ButtonGroup>
        <Button variant="outline">
          <IconPlaceholder
            lucide="HeartIcon"
            tabler="IconBell"
            hugeicons="Notification02Icon"
            phosphor="HeartIcon"
            remixicon="RiHeartLine"
            data-icon="inline-start"
          />{" "}
          Like
        </Button>
        <span
          data-slot="button"
          sx={[
            buttonVariants({ variant: "outline", size: "icon" }),
            styles.w12,
          ]}
        >
          1.2K
        </span>
      </ButtonGroup>
    </Example>
  )
}

const durationItems = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
]

function ButtonGroupWithSelectAndInput() {
  return (
    <Example title="With Select and Input">
      <ButtonGroup>
        <Select aria-label="Duration" defaultValue={durationItems[0].value}>
          <SelectTrigger id="duration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent placement="bottom start">
            <SelectGroup>
              {durationItems.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input />
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupNested() {
  return (
    <Example title="Nested">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." />
            <TooltipTrigger>
              <Focusable>
                <InputGroupAddon align="inline-end" role="button">
                  <IconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconHeadphones"
                    hugeicons="AudioWave01Icon"
                    phosphor="MicrophoneIcon"
                    remixicon="RiMicLine"
                  />
                </InputGroupAddon>
              </Focusable>
              <Tooltip>Voice Mode</Tooltip>
            </TooltipTrigger>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupPagination() {
  return (
    <Example title="Pagination">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          <IconPlaceholder
            lucide="ArrowLeftIcon"
            tabler="IconArrowLeft"
            hugeicons="ArrowLeft02Icon"
            phosphor="ArrowLeftIcon"
            remixicon="RiArrowLeftLine"
            data-icon="inline-start"
          />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
        <Button variant="outline" size="sm">
          Next
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupPaginationSplit() {
  return (
    <Example title="Pagination Split">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon-xs">
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />
          </Button>
          <Button variant="outline" size="icon-xs">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupNavigation() {
  return (
    <Example title="Navigation">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />
          </Button>
          <Button variant="outline">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Single navigation button">
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupTextAlignment() {
  return (
    <Example title="Text Alignment">
      <Field>
        <Label id="alignment-label">Text Alignment</Label>
        <ButtonGroup aria-labelledby="alignment-label">
          <Button variant="outline" size="sm">
            Left
          </Button>
          <Button variant="outline" size="sm">
            Center
          </Button>
          <Button variant="outline" size="sm">
            Right
          </Button>
          <Button variant="outline" size="sm">
            Justify
          </Button>
        </ButtonGroup>
      </Field>
    </Example>
  )
}

function ButtonGroupVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.flexGap6}>
        <ButtonGroup
          orientation="vertical"
          aria-label="Media controls"
          sx={styles.hFit}
        >
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="MinusIcon"
              tabler="IconMinus"
              hugeicons="MinusSignIcon"
              phosphor="MinusIcon"
              remixicon="RiSubtractLine"
            />
          </Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupVerticalNested() {
  return (
    <Example title="Vertical Nested">
      <ButtonGroup orientation="vertical" aria-label="Design tools palette">
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="CopyIcon"
              tabler="IconCopy"
              hugeicons="Copy01Icon"
              phosphor="CopyIcon"
              remixicon="RiFileCopyLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="ShareIcon"
              tabler="IconShare"
              hugeicons="Share03Icon"
              phosphor="ShareIcon"
              remixicon="RiShareLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="FlipHorizontalIcon"
              tabler="IconFlipHorizontal"
              hugeicons="FlipHorizontalIcon"
              phosphor="ArrowsHorizontalIcon"
              remixicon="RiArrowLeftRightLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="FlipVerticalIcon"
              tabler="IconFlipVertical"
              hugeicons="FlipVerticalIcon"
              phosphor="ArrowsVerticalIcon"
              remixicon="RiArrowUpDownLine"
            />
          </Button>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="RotateCwIcon"
              tabler="IconRotateClockwise2"
              hugeicons="Rotate01Icon"
              phosphor="ArrowClockwiseIcon"
              remixicon="RiRefreshLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="TrashIcon"
              tabler="IconTrash"
              hugeicons="Delete02Icon"
              phosphor="TrashIcon"
              remixicon="RiDeleteBinLine"
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}
