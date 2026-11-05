import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { axes } from "../../../core/axes"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupText } from "../ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
  w12: css({ width: { "*": null, base: space[12] } }),
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
  hFit: css({ height: "fit-content" }),
}

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
]

const durationItems = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
]

@Component({
  selector: "button-group-example",
  imports: [
    Button,
    ButtonGroup,
    ButtonGroupText,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    Field,
    FieldGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ButtonGroupBasic -->
      <div kuiExample title="Basic">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiButtonGroup>
            <button kuiButton variant="outline">Button</button>
            <button kuiButton variant="outline">Another Button</button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithInput -->
      <div kuiExample title="With Input">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiButtonGroup>
            <button kuiButton variant="outline">Button</button>
            <input kuiInput placeholder="Type something here..." />
          </div>
          <div kuiButtonGroup>
            <input kuiInput placeholder="Type something here..." />
            <button kuiButton variant="outline">Button</button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithText -->
      <div kuiExample title="With Text">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiButtonGroup>
            <div kuiButtonGroupText>Text</div>
            <button kuiButton variant="outline">Another Button</button>
          </div>
          <div kuiButtonGroup>
            <label kuiLabel kuiButtonGroupText for="input-text">GPU Size</label>
            <input
              kuiInput
              id="input-text"
              placeholder="Type something here..."
              [sx]="styles.styleLumaBorderBorder"
            />
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithDropdown -->
      <div kuiExample title="With Dropdown">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiButtonGroup>
            <button kuiButton variant="outline">Update</button>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                size="icon"
              >
                <svg
                  iconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                ></svg>
              </button>
              <div kuiDropdownMenuContent align="end">
                <div kuiDropdownMenuItem>Disable</div>
                <div kuiDropdownMenuItem variant="destructive">Uninstall</div>
              </div>
            </ng-container>
          </div>
          <div kuiButtonGroup>
            <button kuiButton variant="outline">Follow</button>
            <ng-container kuiDropdownMenu>
              <button
                kuiButton
                kuiDropdownMenuTrigger
                variant="outline"
                size="icon"
              >
                <svg
                  iconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                ></svg>
              </button>
              <div kuiDropdownMenuContent align="end" [sx]="styles.w50">
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="VolumeX"
                      tabler="IconVolume"
                      hugeicons="VolumeOffIcon"
                      phosphor="SpeakerSlashIcon"
                      remixicon="RiVolumeMuteLine"
                    ></svg>
                    Mute Conversation
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="CheckIcon"
                      tabler="IconCheck"
                      hugeicons="Tick02Icon"
                      phosphor="CheckIcon"
                      remixicon="RiCheckLine"
                    ></svg>
                    Mark as Read
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="AlertTriangleIcon"
                      tabler="IconAlertTriangle"
                      hugeicons="AlertCircleIcon"
                      phosphor="WarningIcon"
                      remixicon="RiErrorWarningLine"
                    ></svg>
                    Report Conversation
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="UserRoundXIcon"
                      tabler="IconUserX"
                      hugeicons="UserRemove01Icon"
                      phosphor="UserMinusIcon"
                      remixicon="RiUserUnfollowLine"
                    ></svg>
                    Block User
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="ShareIcon"
                      tabler="IconShare"
                      hugeicons="Share03Icon"
                      phosphor="ShareIcon"
                      remixicon="RiShareLine"
                    ></svg>
                    Share Conversation
                  </div>
                  <div kuiDropdownMenuItem>
                    <svg
                      iconPlaceholder
                      lucide="CopyIcon"
                      tabler="IconCopy"
                      hugeicons="Copy01Icon"
                      phosphor="CopyIcon"
                      remixicon="RiFileCopyLine"
                    ></svg>
                    Copy Conversation
                  </div>
                </div>
                <div kuiDropdownMenuSeparator></div>
                <div kuiDropdownMenuGroup>
                  <div kuiDropdownMenuItem variant="destructive">
                    <svg
                      iconPlaceholder
                      lucide="TrashIcon"
                      tabler="IconTrash"
                      hugeicons="Delete02Icon"
                      phosphor="TrashIcon"
                      remixicon="RiDeleteBinLine"
                    ></svg>
                    Delete Conversation
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithSelect -->
      <div kuiExample title="With Select">
        <div kuiField>
          <label kuiLabel for="amount">Amount</label>
          <div kuiButtonGroup>
            <ng-container
              kuiSelect
              [items]="currencyItems"
              [defaultValue]="currencyItems[0].value"
            >
              <button kuiSelectTrigger>
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of currencyItems; track item.value) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <input kuiInput placeholder="Enter amount to send" />
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight01Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithIcons -->
      <div kuiExample title="With Icons">
        <div [sx]="styles.flexFlexColGap4">
          <div kuiButtonGroup>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="FlipHorizontalIcon"
                tabler="IconFlipHorizontal"
                hugeicons="FlipHorizontalIcon"
                phosphor="ArrowsHorizontalIcon"
                remixicon="RiArrowLeftRightLine"
              ></svg>
            </button>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="FlipVerticalIcon"
                tabler="IconFlipVertical"
                hugeicons="FlipVerticalIcon"
                phosphor="ArrowsVerticalIcon"
                remixicon="RiArrowUpDownLine"
              ></svg>
            </button>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="RotateCwIcon"
                tabler="IconRotateClockwise2"
                hugeicons="Rotate01Icon"
                phosphor="ArrowClockwiseIcon"
                remixicon="RiRefreshLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithInputGroup -->
      <div kuiExample title="With Input Group">
        <div [sx]="[styles.flexFlexColGap4, styles.row]">
          <div kuiInputGroup>
            <input kuiInputGroupInput placeholder="Type to search..." />
            <div
              kuiInputGroupAddon
              align="inline-start"
              [sx]="styles.textMutedForeground"
            >
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="Search01Icon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              ></svg>
            </div>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithFields -->
      <div kuiExample title="With Fields">
        <div kuiFieldGroup [sx]="styles.gridGridCols3Gap4">
          <div kuiField [sx]="styles.colSpan2">
            <label kuiLabel for="width">Width</label>
            <div kuiButtonGroup>
              <div kuiInputGroup>
                <input kuiInputGroupInput id="width" />
                <div kuiInputGroupAddon [sx]="styles.textMutedForeground">
                  W
                </div>
                <div
                  kuiInputGroupAddon
                  align="inline-end"
                  [sx]="styles.textMutedForeground"
                >
                  px
                </div>
              </div>
              <button kuiButton variant="outline" size="icon">
                <svg
                  iconPlaceholder
                  lucide="MinusIcon"
                  tabler="IconMinus"
                  hugeicons="MinusSignIcon"
                  phosphor="MinusIcon"
                  remixicon="RiSubtractLine"
                ></svg>
              </button>
              <button kuiButton variant="outline" size="icon">
                <svg
                  iconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- ButtonGroupWithLike -->
      <div kuiExample title="With Like">
        <div kuiButtonGroup>
          <button kuiButton variant="outline">
            <svg
              iconPlaceholder
              lucide="HeartIcon"
              tabler="IconBell"
              hugeicons="Notification02Icon"
              phosphor="HeartIcon"
              remixicon="RiHeartLine"
              data-icon="inline-start"
            ></svg>
            Like
          </button>
          <span kuiButton variant="outline" size="icon" [sx]="styles.w12"
            >1.2K</span
          >
        </div>
      </div>
      <!-- ButtonGroupWithSelectAndInput -->
      <div kuiExample title="With Select and Input">
        <div kuiButtonGroup>
          <ng-container
            kuiSelect
            [items]="durationItems"
            [defaultValue]="durationItems[0].value"
          >
            <button kuiSelectTrigger id="duration">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent align="start">
              <div kuiSelectGroup>
                @for (item of durationItems; track item.value) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
          <input kuiInput />
        </div>
      </div>
      <!-- ButtonGroupNested -->
      <div kuiExample title="Nested">
        <div kuiButtonGroup>
          <div kuiButtonGroup>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
            </button>
          </div>
          <div kuiButtonGroup>
            <div kuiInputGroup>
              <input kuiInputGroupInput placeholder="Send a message..." />
              <ng-container kuiTooltip>
                <div kuiInputGroupAddon kuiTooltipTrigger align="inline-end">
                  <svg
                    iconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconHeadphones"
                    hugeicons="AudioWave01Icon"
                    phosphor="MicrophoneIcon"
                    remixicon="RiMicLine"
                  ></svg>
                </div>
                <div kuiTooltipContent>Voice Mode</div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <!-- ButtonGroupPagination -->
      <div kuiExample title="Pagination">
        <div kuiButtonGroup>
          <button kuiButton variant="outline" size="sm">
            <svg
              iconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft02Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
              data-icon="inline-start"
            ></svg>
            Previous
          </button>
          <button kuiButton variant="outline" size="sm">1</button>
          <button kuiButton variant="outline" size="sm">2</button>
          <button kuiButton variant="outline" size="sm">3</button>
          <button kuiButton variant="outline" size="sm">4</button>
          <button kuiButton variant="outline" size="sm">5</button>
          <button kuiButton variant="outline" size="sm">
            Next
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ButtonGroupPaginationSplit -->
      <div kuiExample title="Pagination Split">
        <div kuiButtonGroup>
          <div kuiButtonGroup>
            <button kuiButton variant="outline" size="sm">1</button>
            <button kuiButton variant="outline" size="sm">2</button>
            <button kuiButton variant="outline" size="sm">3</button>
            <button kuiButton variant="outline" size="sm">4</button>
            <button kuiButton variant="outline" size="sm">5</button>
          </div>
          <div kuiButtonGroup>
            <button kuiButton variant="outline" size="icon-xs">
              <svg
                iconPlaceholder
                lucide="ArrowLeftIcon"
                tabler="IconArrowLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="ArrowLeftIcon"
                remixicon="RiArrowLeftLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon-xs">
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight01Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupNavigation -->
      <div kuiExample title="Navigation">
        <div kuiButtonGroup>
          <div kuiButtonGroup>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="ArrowLeftIcon"
                tabler="IconArrowLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="ArrowLeftIcon"
                remixicon="RiArrowLeftLine"
              ></svg>
            </button>
            <button kuiButton variant="outline">
              <svg
                iconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight01Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              ></svg>
            </button>
          </div>
          <div kuiButtonGroup aria-label="Single navigation button">
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="ArrowLeftIcon"
                tabler="IconArrowLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="ArrowLeftIcon"
                remixicon="RiArrowLeftLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupTextAlignment -->
      <div kuiExample title="Text Alignment">
        <div kuiField>
          <label kuiLabel id="alignment-label">Text Alignment</label>
          <div kuiButtonGroup aria-labelledby="alignment-label">
            <button kuiButton variant="outline" size="sm">Left</button>
            <button kuiButton variant="outline" size="sm">Center</button>
            <button kuiButton variant="outline" size="sm">Right</button>
            <button kuiButton variant="outline" size="sm">Justify</button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupVertical -->
      <div kuiExample title="Vertical">
        <div [sx]="styles.flexGap6">
          <div
            kuiButtonGroup
            orientation="vertical"
            aria-label="Media controls"
            [sx]="styles.hFit"
          >
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="MinusIcon"
                tabler="IconMinus"
                hugeicons="MinusSignIcon"
                phosphor="MinusIcon"
                remixicon="RiSubtractLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ButtonGroupVerticalNested -->
      <div kuiExample title="Vertical Nested">
        <div
          kuiButtonGroup
          orientation="vertical"
          aria-label="Design tools palette"
        >
          <div kuiButtonGroup orientation="vertical">
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="Search01Icon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare"
                hugeicons="Share03Icon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              ></svg>
            </button>
          </div>
          <div kuiButtonGroup orientation="vertical">
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="FlipHorizontalIcon"
                tabler="IconFlipHorizontal"
                hugeicons="FlipHorizontalIcon"
                phosphor="ArrowsHorizontalIcon"
                remixicon="RiArrowLeftRightLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="FlipVerticalIcon"
                tabler="IconFlipVertical"
                hugeicons="FlipVerticalIcon"
                phosphor="ArrowsVerticalIcon"
                remixicon="RiArrowUpDownLine"
              ></svg>
            </button>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="RotateCwIcon"
                tabler="IconRotateClockwise2"
                hugeicons="Rotate01Icon"
                phosphor="ArrowClockwiseIcon"
                remixicon="RiRefreshLine"
              ></svg>
            </button>
          </div>
          <div kuiButtonGroup>
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="Delete02Icon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupExample {
  protected readonly styles = styles
  protected readonly currencyItems = currencyItems
  protected readonly durationItems = durationItems
}
