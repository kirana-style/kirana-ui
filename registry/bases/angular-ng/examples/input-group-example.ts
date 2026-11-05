import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import {
  color,
  fontFamily,
  fontWeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { toast } from "ngx-sonner"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupText } from "../ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { Spinner } from "../ui/spinner"
import { Textarea } from "../ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const pulse = keyframes({ "50%": { opacity: 0.5 } })

const { maia, luma, sera } = axes.style

const styles = {
  textMutedForegroundTabul: css({
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
  roundedFull: css({ borderRadius: { "*": null, base: radius.full } }),
  pl1TextMutedForeground: css({
    paddingInlineStart: { "*": null, base: space[1] },
    color: theme.mutedForeground,
  }),
  minW16: css({ minWidth: { "*": null, base: space[16] } }),
  minW0: css({ minWidth: space[0] }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  animatePulseTextRed500: css({
    // `animate-pulse text-red-500`
    animationName: pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
    color: color.red[500],
  }),
  hAuto: css({ height: { "*": null, base: "auto" } }),
  mlAutoTextMutedForegroun: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
  }),
  flexSize4ItemsCenterJust: css({
    // `flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800`
    display: "flex",
    width: space[4],
    height: space[4],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: `light-dark(${color.green[500]}, ${color.green[800]})`,
  }),
  size3TextWhite: css({
    width: { "*": null, base: space[3] },
    height: { "*": null, base: space[3] },
    color: "white",
  }),
  textGreen700: css({ color: color.green[700] }),
  gridGridCols2Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
  minH100Px: css({ minHeight: { "*": null, base: "100px" } }),
  justifyEndGap2: css({
    justifyContent: "flex-end",
    gap: { "*": null, base: space[2] },
  }),
  mlAutoRoundedFull: css({
    marginLeft: "auto",
    borderRadius: { "*": null, base: radius.full },
  }),
  minH120Px: css({ minHeight: { "*": null, base: "120px" } }),
  mlAuto: css({ marginLeft: "auto" }),
  minH300PxPy3: css({
    minHeight: { "*": null, base: "300px" },
    paddingBlock: { "*": null, base: space[3] },
  }),
  // `border-b`, and the addon's `[.border-b]:pb-*` that a Kirana style cannot key on a class.
  borderB: css({
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
    paddingBlockEnd: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
  fontMonoFontMedium: css({
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  }),
  // `border-t`, and the addon's `[.border-t]:pt-*` that a Kirana style cannot key on a class.
  borderT: css({
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    paddingBlockStart: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
}

@Component({
  selector: "input-group-example",
  imports: [
    Button,
    ButtonGroup,
    ButtonGroupText,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    Kbd,
    KbdGroup,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    Spinner,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper [sx]="styles.minW0">
      <!-- InputGroupBasic -->
      <div kuiExample title="Basic">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-default-01"
              >Default (No Input Group)</label
            >
            <input kuiInput placeholder="Placeholder" id="input-default-01" />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-group-02">Input Group</label>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-group-02"
                placeholder="Placeholder"
              />
            </div>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="input-disabled-03">Disabled</label>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-disabled-03"
                placeholder="This field is disabled"
                disabled
              />
            </div>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="input-invalid-04">Invalid</label>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-invalid-04"
                placeholder="This field is invalid"
                aria-invalid="true"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- InputGroupWithAddons -->
      <div kuiExample title="With Addons">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-icon-left-05"
              >Addon (inline-start)</label
            >
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-icon-left-05" />
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                  [sx]="styles.textMutedForeground"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-icon-right-07"
              >Addon (inline-end)</label
            >
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-icon-right-07" />
              <div kuiInputGroupAddon align="inline-end">
                <svg
                  iconPlaceholder
                  lucide="EyeOffIcon"
                  tabler="IconEyeClosed"
                  hugeicons="ViewOffIcon"
                  phosphor="EyeSlashIcon"
                  remixicon="RiEyeOffLine"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-icon-both-09"
              >Addon (inline-start and inline-end)</label
            >
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-icon-both-09" />
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="MicIcon"
                  tabler="IconMicrophone"
                  hugeicons="VoiceIcon"
                  phosphor="MicrophoneIcon"
                  remixicon="RiMicLine"
                  [sx]="styles.textMutedForeground"
                ></svg>
              </div>
              <div kuiInputGroupAddon align="inline-end">
                <svg
                  iconPlaceholder
                  lucide="RadioIcon"
                  tabler="IconPlayerRecordFilled"
                  hugeicons="RecordIcon"
                  phosphor="RecordIcon"
                  remixicon="RiRecordCircleLine"
                  [sx]="styles.animatePulseTextRed500"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-addon-20"
              >Addon (block-start)</label
            >
            <div kuiInputGroup [sx]="styles.hAuto">
              <input kuiInputGroupInput id="input-addon-20" />
              <div kuiInputGroupAddon align="block-start">
                <span kuiInputGroupText>First Name</span>
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                  [sx]="styles.mlAutoTextMutedForegroun"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-addon-21">Addon (block-end)</label>
            <div kuiInputGroup [sx]="styles.hAuto">
              <input kuiInputGroupInput id="input-addon-21" />
              <div kuiInputGroupAddon align="block-end">
                <span kuiInputGroupText>20/240 characters</span>
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                  [sx]="styles.mlAutoTextMutedForegroun"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-icon-both-10">Multiple Icons</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-icon-both-10" />
              <div kuiInputGroupAddon align="inline-end">
                <svg
                  iconPlaceholder
                  lucide="StarIcon"
                  tabler="IconStar"
                  hugeicons="StarIcon"
                  phosphor="StarIcon"
                  remixicon="RiStarLine"
                ></svg>
                <button
                  kuiInputGroupButton
                  size="icon-xs"
                  (click)="toast('Copied to clipboard')"
                >
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                </button>
              </div>
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="RadioIcon"
                  tabler="IconPlayerRecordFilled"
                  hugeicons="RecordIcon"
                  phosphor="RecordIcon"
                  remixicon="RiRecordCircleLine"
                  [sx]="styles.animatePulseTextRed500"
                ></svg>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-description-10">Description</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-description-10" />
              <div kuiInputGroupAddon align="inline-end">
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                ></svg>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-label-10">Label</label>
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <label kuiFieldLabel for="input-label-10">Label</label>
              </div>
              <input kuiInputGroupInput id="input-label-10" />
            </div>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-optional-12"
                aria-label="Optional"
              />
              <div kuiInputGroupAddon align="inline-end">
                <span kuiInputGroupText>(optional)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputGroupWithButtons -->
      <div kuiExample title="With Buttons">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-button-13">Button</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-13" />
              <div kuiInputGroupAddon>
                <button kuiInputGroupButton>Default</button>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-14" />
              <div kuiInputGroupAddon>
                <button kuiInputGroupButton variant="outline">Outline</button>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-15" />
              <div kuiInputGroupAddon>
                <button kuiInputGroupButton variant="secondary">
                  Secondary
                </button>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-16" />
              <div kuiInputGroupAddon align="inline-end">
                <button kuiInputGroupButton variant="secondary">Button</button>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-17" />
              <div kuiInputGroupAddon align="inline-end">
                <button kuiInputGroupButton size="icon-xs">
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                </button>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-button-18" />
              <div kuiInputGroupAddon align="inline-end">
                <button kuiInputGroupButton variant="secondary" size="icon-xs">
                  <svg
                    iconPlaceholder
                    lucide="TrashIcon"
                    tabler="IconTrash"
                    hugeicons="DeleteIcon"
                    phosphor="TrashIcon"
                    remixicon="RiDeleteBinLine"
                  ></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- InputGroupWithTooltip -->
      <div kuiExample title="With Tooltip, Dropdown, Popover">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-tooltip-20">Tooltip</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-tooltip-20" />
              <div kuiInputGroupAddon align="inline-end">
                <ng-container kuiTooltip>
                  <button
                    kuiInputGroupButton
                    kuiTooltipTrigger
                    [sx]="styles.roundedFull"
                    size="icon-xs"
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
                  <div kuiTooltipContent>This is content in a tooltip.</div>
                </ng-container>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-dropdown-21">Dropdown</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-dropdown-21" />
              <div kuiInputGroupAddon>
                <ng-container kuiDropdownMenu>
                  <button
                    kuiInputGroupButton
                    kuiDropdownMenuTrigger
                    [sx]="styles.textMutedForegroundTabul"
                  >
                    {{ country() }}
                    <svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDownIcon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                    ></svg>
                  </button>
                  <div
                    kuiDropdownMenuContent
                    align="start"
                    [sx]="styles.minW16"
                    [sideOffset]="10"
                    [alignOffset]="-8"
                  >
                    <div kuiDropdownMenuItem (click)="country.set('+1')">
                      +1
                    </div>
                    <div kuiDropdownMenuItem (click)="country.set('+44')">
                      +44
                    </div>
                    <div kuiDropdownMenuItem (click)="country.set('+46')">
                      +46
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-secure-19">Popover</label>
            <div kuiInputGroup>
              <ng-container kuiPopover>
                <div kuiInputGroupAddon kuiPopoverTrigger>
                  <button
                    kuiInputGroupButton
                    variant="secondary"
                    size="icon-xs"
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
                </div>
                <div kuiPopoverContent align="start">
                  <div kuiPopoverHeader>
                    <h2 kuiPopoverTitle>Your connection is not secure.</h2>
                    <p kuiPopoverDescription>
                      You should not enter any sensitive information on this
                      site.
                    </p>
                  </div>
                </div>
              </ng-container>
              <div kuiInputGroupAddon [sx]="styles.pl1TextMutedForeground">
                https://
              </div>
              <input kuiInputGroupInput id="input-secure-19" />
              <div kuiInputGroupAddon align="inline-end">
                <button
                  kuiInputGroupButton
                  size="icon-xs"
                  (click)="toast('Added to favorites')"
                >
                  <svg
                    iconPlaceholder
                    lucide="StarIcon"
                    tabler="IconStar"
                    hugeicons="StarIcon"
                    phosphor="StarIcon"
                    remixicon="RiStarLine"
                  ></svg>
                </button>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="url">Button Group</label>
            <div kuiButtonGroup>
              <div kuiButtonGroupText>https://</div>
              <div kuiInputGroup>
                <input kuiInputGroupInput id="url" />
                <div kuiInputGroupAddon align="inline-end">
                  <svg
                    iconPlaceholder
                    lucide="InfoIcon"
                    tabler="IconInfoCircle"
                    hugeicons="AlertCircleIcon"
                    phosphor="InfoIcon"
                    remixicon="RiInformationLine"
                  ></svg>
                </div>
              </div>
              <div kuiButtonGroupText>.com</div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
        </div>
      </div>
      <!-- InputGroupWithKbd -->
      <div kuiExample title="With Kbd">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="input-kbd-22">Input Group with Kbd</label>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-kbd-22" />
              <div kuiInputGroupAddon>
                <kbd kuiKbd>⌘K</kbd>
              </div>
            </div>
            <div kuiInputGroup>
              <input kuiInputGroupInput id="input-kbd-23" />
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbd>⌘K</kbd>
              </div>
            </div>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-search-apps-24"
                placeholder="Search for Apps..."
              />
              <div kuiInputGroupAddon align="inline-end">Ask AI</div>
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbd>Tab</kbd>
              </div>
            </div>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-search-type-25"
                placeholder="Type to search..."
              />
              <div kuiInputGroupAddon align="inline-start">
                <svg
                  iconPlaceholder
                  lucide="SparklesIcon"
                  tabler="IconServerSpark"
                  hugeicons="SparklesIcon"
                  phosphor="SparkleIcon"
                  remixicon="RiSparklingLine"
                ></svg>
              </div>
              <div kuiInputGroupAddon align="inline-end">
                <kbd kuiKbdGroup>
                  <kbd kuiKbd>Ctrl</kbd>
                  <kbd kuiKbd>C</kbd>
                </kbd>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="input-username-26">Username</label>
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-username-26"
                default-value="shadcn"
              />
              <div kuiInputGroupAddon align="inline-end">
                <div [sx]="styles.flexSize4ItemsCenterJust">
                  <svg
                    iconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                    [sx]="styles.size3TextWhite"
                  ></svg>
                </div>
              </div>
            </div>
            <p kuiFieldDescription [sx]="styles.textGreen700">
              This username is available.
            </p>
          </div>
          <div kuiInputGroup>
            <input
              kuiInputGroupInput
              id="input-search-docs-27"
              placeholder="Search documentation..."
            />
            <div kuiInputGroupAddon>
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              ></svg>
            </div>
            <div kuiInputGroupAddon align="inline-end">12 results</div>
          </div>
          <div kuiInputGroup data-disabled="true">
            <input
              kuiInputGroupInput
              id="input-search-disabled-28"
              placeholder="Search documentation..."
              disabled
            />
            <div kuiInputGroupAddon>
              <svg
                iconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              ></svg>
            </div>
            <div kuiInputGroupAddon align="inline-end">Disabled</div>
          </div>
          <div kuiFieldGroup [sx]="styles.gridGridCols2Gap4">
            <div kuiField>
              <label kuiFieldLabel for="input-group-11">First Name</label>
              <div kuiInputGroup>
                <input
                  kuiInputGroupInput
                  id="input-group-11"
                  placeholder="First Name"
                />
                <div kuiInputGroupAddon align="inline-end">
                  <svg
                    iconPlaceholder
                    lucide="InfoIcon"
                    tabler="IconInfoCircle"
                    hugeicons="AlertCircleIcon"
                    phosphor="InfoIcon"
                    remixicon="RiInformationLine"
                  ></svg>
                </div>
              </div>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="input-group-12">Last Name</label>
              <div kuiInputGroup>
                <input
                  kuiInputGroupInput
                  id="input-group-12"
                  placeholder="Last Name"
                />
                <div kuiInputGroupAddon align="inline-end">
                  <svg
                    iconPlaceholder
                    lucide="InfoIcon"
                    tabler="IconInfoCircle"
                    hugeicons="AlertCircleIcon"
                    phosphor="InfoIcon"
                    remixicon="RiInformationLine"
                  ></svg>
                </div>
              </div>
            </div>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="input-group-29"
              >Loading ("data-disabled="true")</label
            >
            <div kuiInputGroup>
              <input
                kuiInputGroupInput
                id="input-group-29"
                disabled
                default-value="shadcn"
              />
              <div kuiInputGroupAddon align="inline-end">
                <svg kuiSpinner></svg>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
        </div>
      </div>
      <!-- InputGroupInCard -->
      <div kuiExample title="In Card">
        <div kuiCard [sx]="styles.full">
          <div kuiCardHeader>
            <div kuiCardTitle>Card with Input Group</div>
            <div kuiCardDescription>This is a card with an input group.</div>
          </div>
          <div kuiCardContent>
            <div kuiFieldGroup>
              <div kuiField>
                <label kuiFieldLabel for="email-input">Email Address</label>
                <div kuiInputGroup>
                  <input
                    kuiInputGroupInput
                    id="email-input"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <div kuiInputGroupAddon align="inline-end">
                    <svg
                      iconPlaceholder
                      lucide="MailIcon"
                      tabler="IconMail"
                      hugeicons="MailIcon"
                      phosphor="EnvelopeIcon"
                      remixicon="RiMailLine"
                    ></svg>
                  </div>
                </div>
              </div>
              <div kuiField>
                <label kuiFieldLabel for="website-input">Website URL</label>
                <div kuiInputGroup>
                  <div kuiInputGroupAddon>
                    <span kuiInputGroupText>https://</span>
                  </div>
                  <input
                    kuiInputGroupInput
                    id="website-input"
                    placeholder="example.com"
                  />
                  <div kuiInputGroupAddon align="inline-end">
                    <svg
                      iconPlaceholder
                      lucide="ExternalLinkIcon"
                      tabler="IconExternalLink"
                      hugeicons="LinkSquare02Icon"
                      phosphor="ArrowSquareOutIcon"
                      remixicon="RiExternalLinkLine"
                    ></svg>
                  </div>
                </div>
              </div>
              <div kuiField>
                <label kuiFieldLabel for="feedback-textarea"
                  >Feedback & Comments</label
                >
                <div kuiInputGroup>
                  <textarea
                    kuiInputGroupTextarea
                    id="feedback-textarea"
                    placeholder="Share your thoughts..."
                    [sx]="styles.minH100Px"
                  ></textarea>
                  <div kuiInputGroupAddon align="block-end">
                    <span kuiInputGroupText>0/500 characters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div kuiCardFooter [sx]="styles.justifyEndGap2">
            <button kuiButton variant="outline">Cancel</button>
            <button kuiButton>Submit</button>
          </div>
        </div>
      </div>
      <!-- InputGroupTextareaExamples -->
      <div kuiExample title="Textarea">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="textarea-header-footer-12"
              >Default Textarea (No Input Group)</label
            >
            <textarea
              kuiTextarea
              id="textarea-header-footer-12"
              placeholder="Enter your text here..."
            ></textarea>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-header-footer-13"
              >Input Group</label
            >
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-header-footer-13"
                placeholder="Enter your text here..."
              ></textarea>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="textarea-header-footer-14">Invalid</label>
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-header-footer-14"
                placeholder="Enter your text here..."
                aria-invalid="true"
              ></textarea>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField data-disabled="true">
            <label kuiFieldLabel for="textarea-header-footer-15"
              >Disabled</label
            >
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-header-footer-15"
                placeholder="Enter your text here..."
                disabled
              ></textarea>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="prompt-31">Addon (block-start)</label>
            <div kuiInputGroup>
              <textarea kuiInputGroupTextarea id="prompt-31"></textarea>
              <div kuiInputGroupAddon align="block-start">
                <span kuiInputGroupText>Ask, Search or Chat...</span>
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                  [sx]="styles.mlAutoTextMutedForegroun"
                ></svg>
              </div>
            </div>
            <p kuiFieldDescription>This is a description of the input group.</p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-header-footer-30"
              >Addon (block-end)</label
            >
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-header-footer-30"
                placeholder="Enter your text here..."
              ></textarea>
              <div kuiInputGroupAddon align="block-end">
                <span kuiInputGroupText>0/280 characters</span>
                <button
                  kuiInputGroupButton
                  variant="default"
                  size="icon-xs"
                  [sx]="styles.mlAutoRoundedFull"
                >
                  <svg
                    iconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUpIcon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  ></svg>
                  <span [sx]="visuallyHidden">Send</span>
                </button>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-comment-31"
              >Addon (Buttons)</label
            >
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-comment-31"
                placeholder="Share your thoughts..."
                [sx]="styles.minH120Px"
              ></textarea>
              <div kuiInputGroupAddon align="block-end">
                <button
                  kuiInputGroupButton
                  variant="ghost"
                  [sx]="styles.mlAuto"
                  size="sm"
                >
                  Cancel
                </button>
                <button kuiInputGroupButton variant="default" size="sm">
                  Post Comment
                </button>
              </div>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="textarea-code-32">Code Editor</label>
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="textarea-code-32"
                placeholder="console.log('Hello, world!');"
                [sx]="styles.minH300PxPy3"
              ></textarea>
              <div kuiInputGroupAddon align="block-start" [sx]="styles.borderB">
                <span kuiInputGroupText [sx]="styles.fontMonoFontMedium">
                  <svg
                    iconPlaceholder
                    lucide="CodeIcon"
                    tabler="IconBrandJavascript"
                    hugeicons="CodeIcon"
                    phosphor="CodeIcon"
                    remixicon="RiCodeLine"
                  ></svg>
                  script.js
                </span>
                <button kuiInputGroupButton size="icon-xs" [sx]="styles.mlAuto">
                  <svg
                    iconPlaceholder
                    lucide="RefreshCwIcon"
                    tabler="IconRefresh"
                    hugeicons="RefreshIcon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <button kuiInputGroupButton size="icon-xs" variant="ghost">
                  <svg
                    iconPlaceholder
                    lucide="CopyIcon"
                    tabler="IconCopy"
                    hugeicons="CopyIcon"
                    phosphor="CopyIcon"
                    remixicon="RiFileCopyLine"
                  ></svg>
                </button>
              </div>
              <div kuiInputGroupAddon align="block-end" [sx]="styles.borderT">
                <span kuiInputGroupText>Line 1, Column 1</span>
                <span kuiInputGroupText [sx]="styles.mlAuto">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupExample {
  protected readonly country = signal("+1")
  protected readonly styles = styles
  protected readonly visuallyHidden = visuallyHidden
  protected readonly toast = toast
  protected readonly console = console
}
