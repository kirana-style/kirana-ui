/**
 * The component states the styles read, with each base's key for them, from `@kirana-style/states`.
 * A style writes a state once, `...when(item.highlighted, menuCtx.highlight)`, and gets every base's
 * key: each base only ever writes its own attributes, so a key from another base never matches, and
 * flattening for one base keeps that base's key alone.
 *
 * Where a base has no such state the key is left out. Ark UI marks a popup's enter and exit with
 * `data-state` and keeps it mounted only for a CSS animation, not a transition, so its motion is
 * keyframes on `presence` rather than a transition on `overlay.starting`.
 */
import * as Base from "@kirana-style/states/base-ui"
import * as Aria from "@kirana-style/states/react-aria"
import * as Ark from "@kirana-style/states/ark-ui"
import * as NgPrimitives from "@kirana-style/states/ng-primitives"
import * as Reka from "@kirana-style/states/reka-ui"
import * as Bits from "@kirana-style/states/bits-ui"
import * as UiSdk from "@kirana-style/states/ui-sdk"
import * as Kirana from "@kirana-style/states/kirana-ui"

/**
 * Each base's key for a state. `ng` is ng-primitives, Angular's base, which writes Base UI's
 * attribute names nearly everywhere (`data-checked`, `data-open`, `data-active`, `aria-pressed`), so
 * Base UI's keys already match it; a state gets an `ng` key only where they differ (an accordion's
 * disabled trigger). `reka` is Reka UI, Vue's second base, which writes Radix's attributes
 * (`data-state`, `data-highlighted`): often Ark UI's selectors too. `bits` is Bits UI, Svelte's
 * second base, which writes `data-state` as Reka UI does and Base UI's `data-starting-style` and
 * `data-ending-style` on its popups and panels, so its motion is Base UI's transitions. `uisdk` is
 * ui-sdk (P9), one core for React, Vue, Svelte and Solid, which writes Base UI's names nearly
 * everywhere (`data-open`, `data-closed`, `data-starting-style`, `data-checked`, `data-highlighted`)
 * and a few of its own (`data-selected` on a tab, `data-pressed` on a toggle). Its keys are
 * `@kirana-style/states/ui-sdk`'s; a selector written out here is an attribute the registry's own
 * part writes (a toast's `data-behind`, a resizable group's `data-group`) or one of the platform's
 * (`aria-current`, `:disabled`), which no vocabulary names.
 */
export type StateKeys = {
  base?: string
  aria?: string
  ark?: string
  ng?: string
  reka?: string
  bits?: string
  uisdk?: string
  /**
   * Kirana UI Primitives (`@kirana-ui/*`), which write Base UI's vocabulary: Base UI's key holds
   * for them (a flattened install for `kirana` keeps it), so a state gets a `kirana` key only where
   * they differ.
   */
  kirana?: string
}

/**
 * `value` under every base's key for `state`. Marked free of side effects, so a compiled style
 * module's leftover calls are dropped from a page's JavaScript (KF-146, until Kirana drops them).
 */
/* @__NO_SIDE_EFFECTS__ */
export function when<Value>(state: StateKeys, value: Value) {
  return {
    ...(state.base ? { [state.base]: value } : {}),
    ...(state.aria ? { [state.aria]: value } : {}),
    ...(state.ark ? { [state.ark]: value } : {}),
    ...(state.ng ? { [state.ng]: value } : {}),
    ...(state.reka ? { [state.reka]: value } : {}),
    ...(state.bits ? { [state.bits]: value } : {}),
    ...(state.uisdk ? { [state.uisdk]: value } : {}),
    ...(state.kirana ? { [state.kirana]: value } : {}),
  }
}

/** A popup's or a modal's first frame, and its exit. */
export const overlay = {
  starting: {
    base: Base.Dialog.Popup.startingStyle,
    aria: Aria.Modal.entering,
    bits: Bits.Dialog.Content.startingStyle,
    uisdk: UiSdk.Dialog.Content.startingStyle,
  },
  ending: {
    base: Base.Dialog.Popup.endingStyle,
    aria: Aria.Modal.exiting,
    bits: Bits.Dialog.Content.endingStyle,
    uisdk: UiSdk.Dialog.Content.endingStyle,
  },
} as const satisfies Record<string, StateKeys>

/**
 * Ark UI's popups and modals, open or leaving: Ark keeps a closing one mounted only while a CSS
 * animation runs, so their motion is keyframes on these rather than a transition (`overlay.styles`).
 */
export const presence = {
  // Reka UI's tooltip is `delayed-open` or `instant-open`, its other popups `open`.
  open: { ark: Ark.Dialog.Content.state.open, reka: '[data-state$="open"]' },
  closed: {
    ark: Ark.Dialog.Content.state.closed,
    reka: Reka.Popover.Content.state.closed,
  },
} as const satisfies Record<string, StateKeys>

/** The side a popup opened on, against its trigger. React Aria has no logical sides. */
export const side = {
  // Bits UI's popups write the physical side as Base UI's do (`data-side`).
  top: {
    base: Base.Menu.Popup.side.top,
    aria: Aria.Popover.placement.top,
    bits: Bits.Popover.Content.side.top,
    uisdk: UiSdk.Menu.Content.side.top,
  },
  bottom: {
    base: Base.Menu.Popup.side.bottom,
    aria: Aria.Popover.placement.bottom,
    bits: Bits.Popover.Content.side.bottom,
    uisdk: UiSdk.Menu.Content.side.bottom,
  },
  left: {
    base: Base.Menu.Popup.side.left,
    aria: Aria.Popover.placement.left,
    bits: Bits.Popover.Content.side.left,
    uisdk: UiSdk.Menu.Content.side.left,
  },
  right: {
    base: Base.Menu.Popup.side.right,
    aria: Aria.Popover.placement.right,
    bits: Bits.Popover.Content.side.right,
    uisdk: UiSdk.Menu.Content.side.right,
  },
  inlineStart: { base: Base.Menu.Popup.side.inlineStart },
  inlineEnd: { base: Base.Menu.Popup.side.inlineEnd },
} as const satisfies Record<string, StateKeys>

/** A row of a menu or a list box. */
export const item = {
  highlighted: {
    base: Base.Menu.Item.highlighted,
    aria: Aria.MenuItem.focused,
    ark: Ark.Menu.Item.highlighted,
    reka: Reka.DropdownMenu.Item.highlighted,
    bits: Bits.DropdownMenu.Item.highlighted,
    uisdk: UiSdk.Menu.Item.highlighted,
  },
  disabled: {
    base: Base.Menu.Item.disabled,
    aria: Aria.MenuItem.disabled,
    ark: Ark.Menu.Item.disabled,
    reka: Reka.DropdownMenu.Item.disabled,
    bits: Bits.DropdownMenu.Item.disabled,
    uisdk: UiSdk.Menu.Item.disabled,
  },
  /** A submenu trigger whose submenu is open. */
  open: {
    base: Base.Menu.SubmenuTrigger.popupOpen,
    aria: Aria.MenuItem.open,
    ark: Ark.Menu.Trigger.state.open,
    reka: Reka.DropdownMenu.SubTrigger.state.open,
    // Bits UI names a submenu's trigger by its menu (`data-dropdown-menu-sub-trigger` …).
    bits: '[data-state="open"]',
    uisdk: UiSdk.Menu.Trigger.open,
  },
} as const satisfies Record<string, StateKeys>

/** A tab: the chosen one, and one that cannot be chosen. */
export const tab = {
  active: {
    base: Base.Tabs.Tab.active,
    aria: Aria.Tab.selected,
    ark: Ark.Tabs.Trigger.selected,
    reka: Reka.Tabs.Trigger.state.active,
    bits: Bits.Tabs.Trigger.state.active,
    uisdk: UiSdk.Tabs.Tab.selected,
  },
  disabled: {
    base: Base.Tabs.Tab.disabled,
    aria: Aria.Tab.disabled,
    ark: Ark.Tabs.Trigger.disabled,
    reka: Reka.Tabs.Trigger.disabled,
    bits: Bits.Tabs.Trigger.disabled,
    uisdk: UiSdk.Tabs.Tab.disabled,
  },
} as const satisfies Record<string, StateKeys>

/** A Tabs root's direction, which every base writes with the same two values (ng-primitives too). */
export const tabOrientation = {
  horizontal: {
    base: Base.Tabs.Root.orientation.horizontal,
    aria: Aria.Tabs.orientation.horizontal,
    ark: Ark.Tabs.Root.orientation.horizontal,
    ng: NgPrimitives.Tabs.Tabset.orientation.horizontal,
    reka: '[data-orientation="horizontal"]',
    bits: '[data-orientation="horizontal"]',
    uisdk: UiSdk.Tabs.Root.orientation.horizontal,
  },
  vertical: {
    base: Base.Tabs.Root.orientation.vertical,
    aria: Aria.Tabs.orientation.vertical,
    ark: Ark.Tabs.Root.orientation.vertical,
    ng: NgPrimitives.Tabs.Tabset.orientation.vertical,
    reka: '[data-orientation="vertical"]',
    bits: '[data-orientation="vertical"]',
    uisdk: UiSdk.Tabs.Root.orientation.vertical,
  },
} as const satisfies Record<string, StateKeys>

/** A collapsible section that is open: Base UI's Collapsible, React Aria's Disclosure. */
export const disclosure = {
  open: {
    base: Base.Collapsible.Root.open,
    aria: Aria.Disclosure.expanded,
    ark: Ark.Collapsible.Root.state.open,
    ng: NgPrimitives.Collapsible.Root.open,
    reka: Reka.Collapsible.Root.state.open,
    bits: Bits.Collapsible.Root.state.open,
    uisdk: UiSdk.Collapsible.Root.open,
  },
} as const satisfies Record<string, StateKeys>

/**
 * An accordion's item and panel. Upstream dims a disabled trigger with `aria-disabled:` on Base UI
 * (whose native button is `disabled`, so it never matches) and `disabled:` on React Aria.
 */
export const accordion = {
  /**
   * shadcn/ui's `data-open:`, which Base UI's item writes, and Ark UI's as `data-state`; React
   * Aria's never matches it.
   */
  open: {
    base: Base.Accordion.Item.open,
    ark: Ark.Accordion.Item.state.open,
    reka: Reka.Accordion.Item.state.open,
    bits: Bits.Accordion.Item.state.open,
    uisdk: UiSdk.Accordion.Item.open,
  },
  /** An open item on either base: `data-open:`, React Aria's `data-expanded:`. */
  expanded: {
    base: Base.Accordion.Item.open,
    aria: Aria.Disclosure.expanded,
    uisdk: UiSdk.Accordion.Item.open,
  },
  panelOpen: {
    base: Base.Accordion.Panel.open,
    uisdk: UiSdk.Accordion.Panel.open,
  },
  panelClosed: {
    base: Base.Accordion.Panel.closed,
    uisdk: UiSdk.Accordion.Panel.closed,
  },
  /** Ark UI's content, which moves over its own `--height` (`accordion.contentArk`). */
  contentOpen: {
    ark: Ark.Accordion.ItemContent.state.open,
    reka: Reka.Accordion.Content.state.open,
    bits: Bits.Accordion.Content.state.open,
  },
  contentClosed: {
    ark: Ark.Accordion.ItemContent.state.closed,
    reka: Reka.Accordion.Content.state.closed,
    bits: Bits.Accordion.Content.state.closed,
  },
  triggerDisabled: {
    base: '[aria-disabled="true"]',
    aria: ":disabled",
    ng: NgPrimitives.Accordion.Trigger.disabled,
    uisdk: UiSdk.Accordion.Trigger.disabled,
  },
} as const satisfies Record<string, StateKeys>

/**
 * A resizable group and handle. `react-resizable-panels`, on both React bases, marks a group of
 * stacked panels `aria-orientation="vertical"` and the handle between them, which lies across,
 * `aria-orientation="horizontal"` (the line's own direction); Ark UI's Splitter gives both the
 * group's `data-orientation`, and its handle the group's `aria-orientation` too, so the library's keys
 * also ask for its own markers (`data-group`, `data-separator`): the site serves every base's keys.
 */
export const resizable = {
  stacked: {
    base: '[data-group][aria-orientation="vertical"]',
    aria: '[data-group][aria-orientation="vertical"]',
    ark: Ark.Splitter.Root.orientation.vertical,
    // Reka UI's Splitter gives its group and its handles the group's `data-orientation`, as Ark's.
    reka: '[data-orientation="vertical"]',
    // paneforge (on Bits UI) gives its group and its resizers the group's `data-direction`.
    bits: '[data-direction="vertical"]',
    // react-resizable-panels' on ui-sdk: React's part keeps that library, and Vue's ui-sdk Resizable
    // writes its `data-group` and `data-separator` (`ui/resizable` in `bases/vue-uisdk`).
    uisdk: '[data-group][aria-orientation="vertical"]',
    // Kirana UI Primitives give the group and its handles the group's `data-orientation`, as Ark's:
    // Base UI's key (react-resizable-panels') never matches them.
    kirana: Kirana.Resizable.Group.orientation.vertical,
  },
  across: {
    base: '[data-separator][aria-orientation="horizontal"]',
    aria: '[data-separator][aria-orientation="horizontal"]',
    ark: Ark.Splitter.ResizeTrigger.orientation.vertical,
    reka: '[data-orientation="vertical"]',
    bits: '[data-direction="vertical"]',
    uisdk: '[data-separator][aria-orientation="horizontal"]',
    kirana: Kirana.Resizable.Handle.orientation.vertical,
  },
} as const satisfies Record<string, StateKeys>

/**
 * A Base UI toast and its content. React Aria has no toast. Reka UI's writes Base UI's `data-expanded`
 * and `data-limited`, and Vue's part writes the first frame and the content's states itself, under
 * Base UI's names; it leaves on Reka's `data-state` (`toast.rootReka`).
 */
export const toast = {
  // ui-sdk's toast writes Base UI's names on the toast; its content is the part's own element,
  // which the part gives Base UI's `data-expanded` and `data-behind` (`ui/toast.tsx`).
  expanded: {
    base: Base.Toast.Root.expanded,
    reka: "[data-expanded]",
    uisdk: UiSdk.Toast.Root.expanded,
  },
  limited: { base: Base.Toast.Root.limited, reka: "[data-limited]" },
  starting: {
    base: Base.Toast.Root.startingStyle,
    reka: "[data-starting-style]",
    uisdk: UiSdk.Toast.Root.startingStyle,
  },
  ending: {
    base: Base.Toast.Root.endingStyle,
    uisdk: UiSdk.Toast.Root.endingStyle,
  },
  swipeUp: {
    base: Base.Toast.Root.swipeDirection.up,
    uisdk: UiSdk.Toast.Root.swipeDirection.up,
  },
  swipeDown: {
    base: Base.Toast.Root.swipeDirection.down,
    uisdk: UiSdk.Toast.Root.swipeDirection.down,
  },
  swipeLeft: {
    base: Base.Toast.Root.swipeDirection.left,
    uisdk: UiSdk.Toast.Root.swipeDirection.left,
  },
  swipeRight: {
    base: Base.Toast.Root.swipeDirection.right,
    uisdk: UiSdk.Toast.Root.swipeDirection.right,
  },
  contentExpanded: {
    base: Base.Toast.Content.expanded,
    reka: "[data-expanded]",
    uisdk: UiSdk.Toast.Root.expanded,
  },
  behind: {
    base: Base.Toast.Content.behind,
    reka: "[data-behind]",
    uisdk: "[data-behind]",
  },
} as const satisfies Record<string, StateKeys>

/** A collapsible panel's first frame and its exit, which it animates its height over. */
export const collapsiblePanel = {
  starting: {
    base: Base.Collapsible.Panel.startingStyle,
    uisdk: UiSdk.Collapsible.Panel.startingStyle,
  },
  ending: {
    base: Base.Collapsible.Panel.endingStyle,
    uisdk: UiSdk.Collapsible.Panel.endingStyle,
  },
  // Ark UI's content, opening or leaving: its motion is keyframes over the `--height` it sets.
  open: {
    ark: Ark.Collapsible.Content.state.open,
    reka: Reka.Collapsible.Content.state.open,
    bits: Bits.Collapsible.Content.state.open,
  },
  closed: {
    ark: Ark.Collapsible.Content.state.closed,
    reka: Reka.Collapsible.Content.state.closed,
    bits: Bits.Collapsible.Content.state.closed,
  },
} as const satisfies Record<string, StateKeys>

/**
 * A checkbox's states, as upstream reads them on each base: Base UI's root is a `span`, so its
 * `disabled:` never matches (a disabled one dims through its Field, `group-has-disabled/field:`).
 * React Aria's root is the `label` around a hidden input, and Base UI's root writes
 * `data-disabled` too, so React Aria's key also asks for the `data-rac` every React Aria element
 * carries: the site serves every base's keys at once, and Base UI's checkbox must not read it.
 * Ark UI's box is the root's Control, and its radio's and switch's write the same attributes
 * (`data-state`, `data-focus-visible`, `data-invalid`), so one key reads all three. Reka UI's
 * checkbox, radio and switch are buttons: its checkbox's `data-state` reads all three, and focus,
 * invalidity and disabling are the button's own, as on Base UI.
 */
export const check = {
  checked: {
    base: Base.Checkbox.Root.checked,
    aria: Aria.Checkbox.selected,
    ark: Ark.Checkbox.Control.state.checked,
    reka: Reka.Checkbox.Root.state.checked,
    bits: Bits.Checkbox.Root.state.checked,
    uisdk: UiSdk.Checkbox.Root.checked,
  },
  focusVisible: {
    base: ":focus-visible",
    aria: Aria.Checkbox.focusVisible,
    ark: Ark.Checkbox.Control.focusVisible,
    reka: ":focus-visible",
    bits: ":focus-visible",
    uisdk: ":focus-visible",
  },
  invalid: {
    base: '[aria-invalid="true"]',
    aria: Aria.Checkbox.invalid,
    ark: Ark.Checkbox.Control.invalid,
    reka: '[aria-invalid="true"]',
    bits: '[aria-invalid="true"]',
    uisdk: '[aria-invalid="true"]',
  },
  disabled: {
    base: ":disabled",
    aria: `[data-rac]${Aria.Checkbox.disabled}`,
    // None on Ark UI, as none holds on Base UI (its box is never `:disabled`): a disabled one dims
    // through its Field, whose hidden input is `:disabled`.
    reka: ":disabled",
    bits: ":disabled",
    // Base UI's, which ui-sdk's box, a `span` as Base UI's, never holds either: it dims through its
    // Field. A bare `[data-disabled]` would also match React Aria's box.
    uisdk: ":disabled",
  },
} as const satisfies Record<string, StateKeys>

/**
 * A navigation menu's open trigger and current link: Base UI's `data-popup-open` and
 * `data-active`, Ark UI's `data-state="open"` (on its own parts, `data-scope`) and `data-current`.
 */
export const navigationMenuState = {
  triggerOpen: {
    base: Base.NavigationMenu.Trigger.popupOpen,
    ark: '[data-scope="navigation-menu"][data-part="trigger"][data-state="open"]',
    reka: `${Reka.NavigationMenu.Trigger.navigationMenuTrigger}${Reka.NavigationMenu.Trigger.state.open}`,
    bits: `[data-navigation-menu-trigger]${Bits.NavigationMenu.Trigger.state.open}`,
    uisdk: '[data-slot="navigation-menu-trigger"][data-open]',
  },
  linkActive: {
    base: Base.NavigationMenu.Link.active,
    ark: Ark.NavigationMenu.Link.current,
    reka: Reka.NavigationMenu.Link.active,
    bits: Bits.NavigationMenu.Link.active,
    uisdk: '[aria-current="page"]',
  },
} as const satisfies Record<string, StateKeys>

/**
 * A pressed toggle, alone or in a group: Base UI's `aria-pressed`, React Aria's `data-selected`,
 * Ark UI's `data-state`, which a single-choice group's items write too (they are radios there,
 * `aria-checked`, where Base UI's stay `aria-pressed`).
 */
export const toggleState = {
  pressed: {
    base: '[aria-pressed="true"]',
    aria: Aria.ToggleButton.selected,
    ark: Ark.Toggle.Root.state.on,
    reka: Reka.Toggle.Root.state.on,
    bits: Bits.Toggle.Root.state.on,
    // ng-primitives' toggle and a single-choice group's items (radios, `aria-checked`).
    ng: NgPrimitives.Toggle.Root.selected,
    uisdk: UiSdk.Toggle.Root.pressed,
  },
} as const satisfies Record<string, StateKeys>

/** A select's trigger with no value chosen. React Aria marks its value element instead. */
export const placeholder = {
  trigger: {
    base: Base.Select.Trigger.placeholder,
    ark: Ark.Select.Trigger.placeholderShown,
    reka: Reka.Select.Trigger.placeholder,
    bits: Bits.Select.Trigger.placeholder,
    uisdk: UiSdk.Select.Trigger.placeholder,
  },
  value: { aria: Aria.SelectValue.placeholder },
} as const satisfies Record<string, StateKeys>

/** A separator's direction, declared beside the configuration that makes its keys exclusive. */
export { orientation } from "./kirana"

/**
 * The states of the components Kirana UI Primitives added in 0.4.0, which only its bases have:
 * each part's, from `@kirana-style/states/kirana-ui`; a state with values is one key per value.
 */
export const ratingState = {
  root: {
    disabled: { kirana: Kirana.Rating.Root.disabled },
    readonly: { kirana: Kirana.Rating.Root.readonly },
    required: { kirana: Kirana.Rating.Root.required },
    hovering: { kirana: Kirana.Rating.Root.hovering },
  },
  item: {
    checked: { kirana: Kirana.Rating.Item.checked },
    filled: { kirana: Kirana.Rating.Item.filled },
    half: { kirana: Kirana.Rating.Item.half },
    disabled: { kirana: Kirana.Rating.Item.disabled },
    readonly: { kirana: Kirana.Rating.Item.readonly },
    required: { kirana: Kirana.Rating.Item.required },
  },
} as const

export const stepsState = {
  root: {
    orientation: {
      horizontal: { kirana: Kirana.Steps.Root.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Root.orientation.vertical },
    },
    complete: { kirana: Kirana.Steps.Root.complete },
  },
  list: {
    orientation: {
      horizontal: { kirana: Kirana.Steps.List.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.List.orientation.vertical },
    },
  },
  item: {
    current: { kirana: Kirana.Steps.Item.current },
    complete: { kirana: Kirana.Steps.Item.complete },
    incomplete: { kirana: Kirana.Steps.Item.incomplete },
    orientation: {
      horizontal: { kirana: Kirana.Steps.Item.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Item.orientation.vertical },
    },
  },
  trigger: {
    current: { kirana: Kirana.Steps.Trigger.current },
    complete: { kirana: Kirana.Steps.Trigger.complete },
    incomplete: { kirana: Kirana.Steps.Trigger.incomplete },
    orientation: {
      horizontal: { kirana: Kirana.Steps.Trigger.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Trigger.orientation.vertical },
    },
    disabled: { kirana: Kirana.Steps.Trigger.disabled },
  },
  indicator: {
    current: { kirana: Kirana.Steps.Indicator.current },
    complete: { kirana: Kirana.Steps.Indicator.complete },
    incomplete: { kirana: Kirana.Steps.Indicator.incomplete },
    orientation: {
      horizontal: { kirana: Kirana.Steps.Indicator.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Indicator.orientation.vertical },
    },
  },
  separator: {
    current: { kirana: Kirana.Steps.Separator.current },
    complete: { kirana: Kirana.Steps.Separator.complete },
    incomplete: { kirana: Kirana.Steps.Separator.incomplete },
    orientation: {
      horizontal: { kirana: Kirana.Steps.Separator.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Separator.orientation.vertical },
    },
  },
  content: {
    current: { kirana: Kirana.Steps.Content.current },
    complete: { kirana: Kirana.Steps.Content.complete },
    incomplete: { kirana: Kirana.Steps.Content.incomplete },
    orientation: {
      horizontal: { kirana: Kirana.Steps.Content.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Content.orientation.vertical },
    },
  },
  completed: {
    orientation: {
      horizontal: { kirana: Kirana.Steps.Completed.orientation.horizontal },
      vertical: { kirana: Kirana.Steps.Completed.orientation.vertical },
    },
  },
  previous: {
    disabled: { kirana: Kirana.Steps.Previous.disabled },
  },
  next: {
    disabled: { kirana: Kirana.Steps.Next.disabled },
  },
} as const

export const editableState = {
  root: {
    editing: { kirana: Kirana.Editable.Root.editing },
    disabled: { kirana: Kirana.Editable.Root.disabled },
    readonly: { kirana: Kirana.Editable.Root.readonly },
    placeholder: { kirana: Kirana.Editable.Root.placeholder },
    touched: { kirana: Kirana.Editable.Root.touched },
    dirty: { kirana: Kirana.Editable.Root.dirty },
    filled: { kirana: Kirana.Editable.Root.filled },
    focused: { kirana: Kirana.Editable.Root.focused },
    valid: { kirana: Kirana.Editable.Root.valid },
    invalid: { kirana: Kirana.Editable.Root.invalid },
  },
  preview: {
    editing: { kirana: Kirana.Editable.Preview.editing },
    disabled: { kirana: Kirana.Editable.Preview.disabled },
    readonly: { kirana: Kirana.Editable.Preview.readonly },
    placeholder: { kirana: Kirana.Editable.Preview.placeholder },
    touched: { kirana: Kirana.Editable.Preview.touched },
    dirty: { kirana: Kirana.Editable.Preview.dirty },
    filled: { kirana: Kirana.Editable.Preview.filled },
    focused: { kirana: Kirana.Editable.Preview.focused },
    valid: { kirana: Kirana.Editable.Preview.valid },
    invalid: { kirana: Kirana.Editable.Preview.invalid },
  },
  input: {
    editing: { kirana: Kirana.Editable.Input.editing },
    disabled: { kirana: Kirana.Editable.Input.disabled },
    readonly: { kirana: Kirana.Editable.Input.readonly },
    placeholder: { kirana: Kirana.Editable.Input.placeholder },
    touched: { kirana: Kirana.Editable.Input.touched },
    dirty: { kirana: Kirana.Editable.Input.dirty },
    filled: { kirana: Kirana.Editable.Input.filled },
    focused: { kirana: Kirana.Editable.Input.focused },
    valid: { kirana: Kirana.Editable.Input.valid },
    invalid: { kirana: Kirana.Editable.Input.invalid },
  },
  editTrigger: {
    editing: { kirana: Kirana.Editable.EditTrigger.editing },
    disabled: { kirana: Kirana.Editable.EditTrigger.disabled },
    readonly: { kirana: Kirana.Editable.EditTrigger.readonly },
    placeholder: { kirana: Kirana.Editable.EditTrigger.placeholder },
    touched: { kirana: Kirana.Editable.EditTrigger.touched },
    dirty: { kirana: Kirana.Editable.EditTrigger.dirty },
    filled: { kirana: Kirana.Editable.EditTrigger.filled },
    focused: { kirana: Kirana.Editable.EditTrigger.focused },
    valid: { kirana: Kirana.Editable.EditTrigger.valid },
    invalid: { kirana: Kirana.Editable.EditTrigger.invalid },
  },
  submitTrigger: {
    editing: { kirana: Kirana.Editable.SubmitTrigger.editing },
    disabled: { kirana: Kirana.Editable.SubmitTrigger.disabled },
    readonly: { kirana: Kirana.Editable.SubmitTrigger.readonly },
    placeholder: { kirana: Kirana.Editable.SubmitTrigger.placeholder },
    touched: { kirana: Kirana.Editable.SubmitTrigger.touched },
    dirty: { kirana: Kirana.Editable.SubmitTrigger.dirty },
    filled: { kirana: Kirana.Editable.SubmitTrigger.filled },
    focused: { kirana: Kirana.Editable.SubmitTrigger.focused },
    valid: { kirana: Kirana.Editable.SubmitTrigger.valid },
    invalid: { kirana: Kirana.Editable.SubmitTrigger.invalid },
  },
  cancelTrigger: {
    editing: { kirana: Kirana.Editable.CancelTrigger.editing },
    disabled: { kirana: Kirana.Editable.CancelTrigger.disabled },
    readonly: { kirana: Kirana.Editable.CancelTrigger.readonly },
    placeholder: { kirana: Kirana.Editable.CancelTrigger.placeholder },
    touched: { kirana: Kirana.Editable.CancelTrigger.touched },
    dirty: { kirana: Kirana.Editable.CancelTrigger.dirty },
    filled: { kirana: Kirana.Editable.CancelTrigger.filled },
    focused: { kirana: Kirana.Editable.CancelTrigger.focused },
    valid: { kirana: Kirana.Editable.CancelTrigger.valid },
    invalid: { kirana: Kirana.Editable.CancelTrigger.invalid },
  },
} as const

export const passwordInputState = {
  root: {
    visible: { kirana: Kirana.PasswordInput.Root.visible },
    disabled: { kirana: Kirana.PasswordInput.Root.disabled },
  },
  input: {
    visible: { kirana: Kirana.PasswordInput.Input.visible },
    disabled: { kirana: Kirana.PasswordInput.Input.disabled },
    touched: { kirana: Kirana.PasswordInput.Input.touched },
    dirty: { kirana: Kirana.PasswordInput.Input.dirty },
    filled: { kirana: Kirana.PasswordInput.Input.filled },
    focused: { kirana: Kirana.PasswordInput.Input.focused },
    valid: { kirana: Kirana.PasswordInput.Input.valid },
    invalid: { kirana: Kirana.PasswordInput.Input.invalid },
  },
  toggle: {
    visible: { kirana: Kirana.PasswordInput.Toggle.visible },
    disabled: { kirana: Kirana.PasswordInput.Toggle.disabled },
  },
  indicator: {
    visible: { kirana: Kirana.PasswordInput.Indicator.visible },
    disabled: { kirana: Kirana.PasswordInput.Indicator.disabled },
  },
} as const

export const tagsInputState = {
  root: {
    disabled: { kirana: Kirana.TagsInput.Root.disabled },
    readonly: { kirana: Kirana.TagsInput.Root.readonly },
    required: { kirana: Kirana.TagsInput.Root.required },
    focused: { kirana: Kirana.TagsInput.Root.focused },
    empty: { kirana: Kirana.TagsInput.Root.empty },
  },
  list: {
    disabled: { kirana: Kirana.TagsInput.List.disabled },
    readonly: { kirana: Kirana.TagsInput.List.readonly },
    required: { kirana: Kirana.TagsInput.List.required },
  },
  item: {
    disabled: { kirana: Kirana.TagsInput.Item.disabled },
    readonly: { kirana: Kirana.TagsInput.Item.readonly },
    required: { kirana: Kirana.TagsInput.Item.required },
    editing: { kirana: Kirana.TagsInput.Item.editing },
  },
  itemText: {
    disabled: { kirana: Kirana.TagsInput.ItemText.disabled },
    readonly: { kirana: Kirana.TagsInput.ItemText.readonly },
    required: { kirana: Kirana.TagsInput.ItemText.required },
  },
  itemInput: {
    disabled: { kirana: Kirana.TagsInput.ItemInput.disabled },
    readonly: { kirana: Kirana.TagsInput.ItemInput.readonly },
    required: { kirana: Kirana.TagsInput.ItemInput.required },
  },
  itemRemove: {
    disabled: { kirana: Kirana.TagsInput.ItemRemove.disabled },
    readonly: { kirana: Kirana.TagsInput.ItemRemove.readonly },
    required: { kirana: Kirana.TagsInput.ItemRemove.required },
  },
  input: {
    disabled: { kirana: Kirana.TagsInput.Input.disabled },
    readonly: { kirana: Kirana.TagsInput.Input.readonly },
    required: { kirana: Kirana.TagsInput.Input.required },
  },
  clear: {
    disabled: { kirana: Kirana.TagsInput.Clear.disabled },
    readonly: { kirana: Kirana.TagsInput.Clear.readonly },
    required: { kirana: Kirana.TagsInput.Clear.required },
  },
} as const

export const fileUploadState = {
  root: {
    disabled: { kirana: Kirana.FileUpload.Root.disabled },
    dragging: { kirana: Kirana.FileUpload.Root.dragging },
    required: { kirana: Kirana.FileUpload.Root.required },
    empty: { kirana: Kirana.FileUpload.Root.empty },
  },
  dropzone: {
    disabled: { kirana: Kirana.FileUpload.Dropzone.disabled },
    dragging: { kirana: Kirana.FileUpload.Dropzone.dragging },
    required: { kirana: Kirana.FileUpload.Dropzone.required },
  },
  trigger: {
    disabled: { kirana: Kirana.FileUpload.Trigger.disabled },
    dragging: { kirana: Kirana.FileUpload.Trigger.dragging },
    required: { kirana: Kirana.FileUpload.Trigger.required },
  },
  list: {
    disabled: { kirana: Kirana.FileUpload.List.disabled },
    dragging: { kirana: Kirana.FileUpload.List.dragging },
    required: { kirana: Kirana.FileUpload.List.required },
  },
  item: {
    disabled: { kirana: Kirana.FileUpload.Item.disabled },
    dragging: { kirana: Kirana.FileUpload.Item.dragging },
    required: { kirana: Kirana.FileUpload.Item.required },
  },
  itemName: {
    disabled: { kirana: Kirana.FileUpload.ItemName.disabled },
    dragging: { kirana: Kirana.FileUpload.ItemName.dragging },
    required: { kirana: Kirana.FileUpload.ItemName.required },
  },
  itemSize: {
    disabled: { kirana: Kirana.FileUpload.ItemSize.disabled },
    dragging: { kirana: Kirana.FileUpload.ItemSize.dragging },
    required: { kirana: Kirana.FileUpload.ItemSize.required },
  },
  itemRemove: {
    disabled: { kirana: Kirana.FileUpload.ItemRemove.disabled },
    dragging: { kirana: Kirana.FileUpload.ItemRemove.dragging },
    required: { kirana: Kirana.FileUpload.ItemRemove.required },
  },
  clear: {
    disabled: { kirana: Kirana.FileUpload.Clear.disabled },
    dragging: { kirana: Kirana.FileUpload.Clear.dragging },
    required: { kirana: Kirana.FileUpload.Clear.required },
  },
} as const

export const timeFieldState = {
  root: {
    disabled: { kirana: Kirana.TimeField.Root.disabled },
    readonly: { kirana: Kirana.TimeField.Root.readonly },
    invalid: { kirana: Kirana.TimeField.Root.invalid },
    touched: { kirana: Kirana.TimeField.Root.touched },
    dirty: { kirana: Kirana.TimeField.Root.dirty },
    filled: { kirana: Kirana.TimeField.Root.filled },
    focused: { kirana: Kirana.TimeField.Root.focused },
    valid: { kirana: Kirana.TimeField.Root.valid },
  },
  segment: {
    segment: {
      hour: { kirana: Kirana.TimeField.Segment.segment.hour },
      minute: { kirana: Kirana.TimeField.Segment.segment.minute },
      second: { kirana: Kirana.TimeField.Segment.segment.second },
      dayPeriod: { kirana: Kirana.TimeField.Segment.segment.dayPeriod },
      literal: { kirana: Kirana.TimeField.Segment.segment.literal },
    },
    placeholder: { kirana: Kirana.TimeField.Segment.placeholder },
    disabled: { kirana: Kirana.TimeField.Segment.disabled },
    invalid: { kirana: Kirana.TimeField.Segment.invalid },
    touched: { kirana: Kirana.TimeField.Segment.touched },
    dirty: { kirana: Kirana.TimeField.Segment.dirty },
    filled: { kirana: Kirana.TimeField.Segment.filled },
    focused: { kirana: Kirana.TimeField.Segment.focused },
    valid: { kirana: Kirana.TimeField.Segment.valid },
  },
} as const

export const treeState = {
  item: {
    selected: { kirana: Kirana.Tree.Item.selected },
    highlighted: { kirana: Kirana.Tree.Item.highlighted },
    disabled: { kirana: Kirana.Tree.Item.disabled },
    open: { kirana: Kirana.Tree.Item.open },
    closed: { kirana: Kirana.Tree.Item.closed },
    loading: { kirana: Kirana.Tree.Item.loading },
  },
  itemRow: {
    selected: { kirana: Kirana.Tree.ItemRow.selected },
    highlighted: { kirana: Kirana.Tree.ItemRow.highlighted },
    disabled: { kirana: Kirana.Tree.ItemRow.disabled },
    open: { kirana: Kirana.Tree.ItemRow.open },
    closed: { kirana: Kirana.Tree.ItemRow.closed },
    loading: { kirana: Kirana.Tree.ItemRow.loading },
  },
  itemIndicator: {
    open: { kirana: Kirana.Tree.ItemIndicator.open },
    closed: { kirana: Kirana.Tree.ItemIndicator.closed },
    loading: { kirana: Kirana.Tree.ItemIndicator.loading },
  },
  group: {
    open: { kirana: Kirana.Tree.Group.open },
    closed: { kirana: Kirana.Tree.Group.closed },
    startingStyle: { kirana: Kirana.Tree.Group.startingStyle },
    endingStyle: { kirana: Kirana.Tree.Group.endingStyle },
  },
} as const

export const colorPickerState = {
  root: {
    disabled: { kirana: Kirana.ColorPicker.Root.disabled },
    readonly: { kirana: Kirana.ColorPicker.Root.readonly },
    required: { kirana: Kirana.ColorPicker.Root.required },
    dragging: { kirana: Kirana.ColorPicker.Root.dragging },
    format: {
      hex: { kirana: Kirana.ColorPicker.Root.format.hex },
      rgb: { kirana: Kirana.ColorPicker.Root.format.rgb },
      hsl: { kirana: Kirana.ColorPicker.Root.format.hsl },
    },
  },
  area: {
    disabled: { kirana: Kirana.ColorPicker.Area.disabled },
    readonly: { kirana: Kirana.ColorPicker.Area.readonly },
    required: { kirana: Kirana.ColorPicker.Area.required },
    dragging: { kirana: Kirana.ColorPicker.Area.dragging },
  },
  areaThumb: {
    disabled: { kirana: Kirana.ColorPicker.AreaThumb.disabled },
    readonly: { kirana: Kirana.ColorPicker.AreaThumb.readonly },
    required: { kirana: Kirana.ColorPicker.AreaThumb.required },
    dragging: { kirana: Kirana.ColorPicker.AreaThumb.dragging },
  },
  channelSlider: {
    disabled: { kirana: Kirana.ColorPicker.ChannelSlider.disabled },
    readonly: { kirana: Kirana.ColorPicker.ChannelSlider.readonly },
    required: { kirana: Kirana.ColorPicker.ChannelSlider.required },
    dragging: { kirana: Kirana.ColorPicker.ChannelSlider.dragging },
    channel: {
      hue: { kirana: Kirana.ColorPicker.ChannelSlider.channel.hue },
      alpha: { kirana: Kirana.ColorPicker.ChannelSlider.channel.alpha },
    },
    orientation: {
      horizontal: {
        kirana: Kirana.ColorPicker.ChannelSlider.orientation.horizontal,
      },
      vertical: {
        kirana: Kirana.ColorPicker.ChannelSlider.orientation.vertical,
      },
    },
  },
  channelSliderTrack: {
    disabled: { kirana: Kirana.ColorPicker.ChannelSliderTrack.disabled },
    readonly: { kirana: Kirana.ColorPicker.ChannelSliderTrack.readonly },
    required: { kirana: Kirana.ColorPicker.ChannelSliderTrack.required },
    dragging: { kirana: Kirana.ColorPicker.ChannelSliderTrack.dragging },
    channel: {
      hue: { kirana: Kirana.ColorPicker.ChannelSliderTrack.channel.hue },
      alpha: { kirana: Kirana.ColorPicker.ChannelSliderTrack.channel.alpha },
    },
    orientation: {
      horizontal: {
        kirana: Kirana.ColorPicker.ChannelSliderTrack.orientation.horizontal,
      },
      vertical: {
        kirana: Kirana.ColorPicker.ChannelSliderTrack.orientation.vertical,
      },
    },
  },
  channelSliderThumb: {
    disabled: { kirana: Kirana.ColorPicker.ChannelSliderThumb.disabled },
    readonly: { kirana: Kirana.ColorPicker.ChannelSliderThumb.readonly },
    required: { kirana: Kirana.ColorPicker.ChannelSliderThumb.required },
    dragging: { kirana: Kirana.ColorPicker.ChannelSliderThumb.dragging },
    channel: {
      hue: { kirana: Kirana.ColorPicker.ChannelSliderThumb.channel.hue },
      alpha: { kirana: Kirana.ColorPicker.ChannelSliderThumb.channel.alpha },
    },
    orientation: {
      horizontal: {
        kirana: Kirana.ColorPicker.ChannelSliderThumb.orientation.horizontal,
      },
      vertical: {
        kirana: Kirana.ColorPicker.ChannelSliderThumb.orientation.vertical,
      },
    },
  },
  channelInput: {
    disabled: { kirana: Kirana.ColorPicker.ChannelInput.disabled },
    readonly: { kirana: Kirana.ColorPicker.ChannelInput.readonly },
    required: { kirana: Kirana.ColorPicker.ChannelInput.required },
    dragging: { kirana: Kirana.ColorPicker.ChannelInput.dragging },
    channel: {
      hex: { kirana: Kirana.ColorPicker.ChannelInput.channel.hex },
      red: { kirana: Kirana.ColorPicker.ChannelInput.channel.red },
      green: { kirana: Kirana.ColorPicker.ChannelInput.channel.green },
      blue: { kirana: Kirana.ColorPicker.ChannelInput.channel.blue },
      hue: { kirana: Kirana.ColorPicker.ChannelInput.channel.hue },
      saturation: {
        kirana: Kirana.ColorPicker.ChannelInput.channel.saturation,
      },
      lightness: { kirana: Kirana.ColorPicker.ChannelInput.channel.lightness },
      alpha: { kirana: Kirana.ColorPicker.ChannelInput.channel.alpha },
    },
  },
  swatch: {
    disabled: { kirana: Kirana.ColorPicker.Swatch.disabled },
    readonly: { kirana: Kirana.ColorPicker.Swatch.readonly },
    required: { kirana: Kirana.ColorPicker.Swatch.required },
    dragging: { kirana: Kirana.ColorPicker.Swatch.dragging },
  },
  swatchTrigger: {
    disabled: { kirana: Kirana.ColorPicker.SwatchTrigger.disabled },
    readonly: { kirana: Kirana.ColorPicker.SwatchTrigger.readonly },
    required: { kirana: Kirana.ColorPicker.SwatchTrigger.required },
    dragging: { kirana: Kirana.ColorPicker.SwatchTrigger.dragging },
    selected: { kirana: Kirana.ColorPicker.SwatchTrigger.selected },
  },
  eyeDropperTrigger: {
    disabled: { kirana: Kirana.ColorPicker.EyeDropperTrigger.disabled },
    readonly: { kirana: Kirana.ColorPicker.EyeDropperTrigger.readonly },
    required: { kirana: Kirana.ColorPicker.EyeDropperTrigger.required },
    dragging: { kirana: Kirana.ColorPicker.EyeDropperTrigger.dragging },
  },
  valueText: {
    disabled: { kirana: Kirana.ColorPicker.ValueText.disabled },
    readonly: { kirana: Kirana.ColorPicker.ValueText.readonly },
    required: { kirana: Kirana.ColorPicker.ValueText.required },
    dragging: { kirana: Kirana.ColorPicker.ValueText.dragging },
    format: {
      hex: { kirana: Kirana.ColorPicker.ValueText.format.hex },
      rgb: { kirana: Kirana.ColorPicker.ValueText.format.rgb },
      hsl: { kirana: Kirana.ColorPicker.ValueText.format.hsl },
    },
  },
  formatTrigger: {
    disabled: { kirana: Kirana.ColorPicker.FormatTrigger.disabled },
    readonly: { kirana: Kirana.ColorPicker.FormatTrigger.readonly },
    required: { kirana: Kirana.ColorPicker.FormatTrigger.required },
    dragging: { kirana: Kirana.ColorPicker.FormatTrigger.dragging },
    format: {
      hex: { kirana: Kirana.ColorPicker.FormatTrigger.format.hex },
      rgb: { kirana: Kirana.ColorPicker.FormatTrigger.format.rgb },
      hsl: { kirana: Kirana.ColorPicker.FormatTrigger.format.hsl },
    },
  },
} as const

export const tourState = {
  spotlight: {
    open: { kirana: Kirana.Tour.Spotlight.open },
    closed: { kirana: Kirana.Tour.Spotlight.closed },
    startingStyle: { kirana: Kirana.Tour.Spotlight.startingStyle },
    endingStyle: { kirana: Kirana.Tour.Spotlight.endingStyle },
    centered: { kirana: Kirana.Tour.Spotlight.centered },
  },
  positioner: {
    open: { kirana: Kirana.Tour.Positioner.open },
    closed: { kirana: Kirana.Tour.Positioner.closed },
    side: {
      top: { kirana: Kirana.Tour.Positioner.side.top },
      right: { kirana: Kirana.Tour.Positioner.side.right },
      bottom: { kirana: Kirana.Tour.Positioner.side.bottom },
      left: { kirana: Kirana.Tour.Positioner.side.left },
      "inline-start": { kirana: Kirana.Tour.Positioner.side.inlineStart },
      "inline-end": { kirana: Kirana.Tour.Positioner.side.inlineEnd },
    },
    align: {
      start: { kirana: Kirana.Tour.Positioner.align.start },
      center: { kirana: Kirana.Tour.Positioner.align.center },
      end: { kirana: Kirana.Tour.Positioner.align.end },
    },
    centered: { kirana: Kirana.Tour.Positioner.centered },
    anchorHidden: { kirana: Kirana.Tour.Positioner.anchorHidden },
  },
  popup: {
    open: { kirana: Kirana.Tour.Popup.open },
    closed: { kirana: Kirana.Tour.Popup.closed },
    startingStyle: { kirana: Kirana.Tour.Popup.startingStyle },
    endingStyle: { kirana: Kirana.Tour.Popup.endingStyle },
    side: {
      top: { kirana: Kirana.Tour.Popup.side.top },
      right: { kirana: Kirana.Tour.Popup.side.right },
      bottom: { kirana: Kirana.Tour.Popup.side.bottom },
      left: { kirana: Kirana.Tour.Popup.side.left },
      "inline-start": { kirana: Kirana.Tour.Popup.side.inlineStart },
      "inline-end": { kirana: Kirana.Tour.Popup.side.inlineEnd },
    },
    align: {
      start: { kirana: Kirana.Tour.Popup.align.start },
      center: { kirana: Kirana.Tour.Popup.align.center },
      end: { kirana: Kirana.Tour.Popup.align.end },
    },
    centered: { kirana: Kirana.Tour.Popup.centered },
  },
  arrow: {
    open: { kirana: Kirana.Tour.Arrow.open },
    closed: { kirana: Kirana.Tour.Arrow.closed },
    side: {
      top: { kirana: Kirana.Tour.Arrow.side.top },
      right: { kirana: Kirana.Tour.Arrow.side.right },
      bottom: { kirana: Kirana.Tour.Arrow.side.bottom },
      left: { kirana: Kirana.Tour.Arrow.side.left },
      "inline-start": { kirana: Kirana.Tour.Arrow.side.inlineStart },
      "inline-end": { kirana: Kirana.Tour.Arrow.side.inlineEnd },
    },
    align: {
      start: { kirana: Kirana.Tour.Arrow.align.start },
      center: { kirana: Kirana.Tour.Arrow.align.center },
      end: { kirana: Kirana.Tour.Arrow.align.end },
    },
    uncentered: { kirana: Kirana.Tour.Arrow.uncentered },
    centered: { kirana: Kirana.Tour.Arrow.centered },
  },
  previous: {
    disabled: { kirana: Kirana.Tour.Previous.disabled },
  },
  next: {
    last: { kirana: Kirana.Tour.Next.last },
  },
} as const

/** A progress bar with no value yet, which Kirana UI Primitives mark on its root. */
export const progressState = {
  root: { indeterminate: { kirana: Kirana.Progress.Root.indeterminate } },
} as const
