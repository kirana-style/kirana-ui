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
 * `@kirana-style/states/ui-sdk`'s; where that vocabulary names no such attribute on the part (a
 * menu item's `data-highlighted`, a toast's swipe direction …), ui-sdk still writes it, each checked
 * in the browser, so it is written here as a selector until the vocabulary has it (KF-133).
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

/** `value` under every base's key for `state`. */
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
    uisdk: "[data-highlighted]",
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
    uisdk: '[data-orientation="horizontal"]',
  },
  vertical: {
    base: Base.Tabs.Root.orientation.vertical,
    aria: Aria.Tabs.orientation.vertical,
    ark: Ark.Tabs.Root.orientation.vertical,
    ng: NgPrimitives.Tabs.Tabset.orientation.vertical,
    reka: '[data-orientation="vertical"]',
    bits: '[data-orientation="vertical"]',
    uisdk: '[data-orientation="vertical"]',
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
    uisdk: "[data-disabled]",
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
    kirana: '[data-orientation="vertical"]',
  },
  across: {
    base: '[data-separator][aria-orientation="horizontal"]',
    aria: '[data-separator][aria-orientation="horizontal"]',
    ark: Ark.Splitter.ResizeTrigger.orientation.vertical,
    reka: '[data-orientation="vertical"]',
    bits: '[data-direction="vertical"]',
    uisdk: '[data-separator][aria-orientation="horizontal"]',
    kirana: '[data-orientation="vertical"]',
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
    uisdk: '[data-swipe-direction="up"]',
  },
  swipeDown: {
    base: Base.Toast.Root.swipeDirection.down,
    uisdk: '[data-swipe-direction="down"]',
  },
  swipeLeft: {
    base: Base.Toast.Root.swipeDirection.left,
    uisdk: '[data-swipe-direction="left"]',
  },
  swipeRight: {
    base: Base.Toast.Root.swipeDirection.right,
    uisdk: '[data-swipe-direction="right"]',
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
    uisdk: "[data-pressed]",
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
 * each part's, as the primitives' vocabulary names them (`@kirana-ui/vocabulary`). Written as
 * selectors until `@kirana-style/states/kirana-ui` has these components (KF-139); a state with
 * values is one key per value.
 */
export const ratingState = {
  root: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    hovering: { kirana: "[data-hovering]" },
  },
  item: {
    checked: { kirana: "[data-checked]" },
    filled: { kirana: "[data-filled]" },
    half: { kirana: "[data-half]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
} as const

export const stepsState = {
  root: {
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
    complete: { kirana: "[data-complete]" },
  },
  list: {
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  item: {
    current: { kirana: "[data-current]" },
    complete: { kirana: "[data-complete]" },
    incomplete: { kirana: "[data-incomplete]" },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  trigger: {
    current: { kirana: "[data-current]" },
    complete: { kirana: "[data-complete]" },
    incomplete: { kirana: "[data-incomplete]" },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
    disabled: { kirana: "[data-disabled]" },
  },
  indicator: {
    current: { kirana: "[data-current]" },
    complete: { kirana: "[data-complete]" },
    incomplete: { kirana: "[data-incomplete]" },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  separator: {
    current: { kirana: "[data-current]" },
    complete: { kirana: "[data-complete]" },
    incomplete: { kirana: "[data-incomplete]" },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  content: {
    current: { kirana: "[data-current]" },
    complete: { kirana: "[data-complete]" },
    incomplete: { kirana: "[data-incomplete]" },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  completed: {
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  previous: {
    disabled: { kirana: "[data-disabled]" },
  },
  next: {
    disabled: { kirana: "[data-disabled]" },
  },
} as const

export const editableState = {
  root: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  preview: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  input: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  editTrigger: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  submitTrigger: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  cancelTrigger: {
    editing: { kirana: "[data-editing]" },
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    placeholder: { kirana: "[data-placeholder]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
} as const

export const passwordInputState = {
  root: {
    visible: { kirana: "[data-visible]" },
    disabled: { kirana: "[data-disabled]" },
  },
  input: {
    visible: { kirana: "[data-visible]" },
    disabled: { kirana: "[data-disabled]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
    invalid: { kirana: "[data-invalid]" },
  },
  toggle: {
    visible: { kirana: "[data-visible]" },
    disabled: { kirana: "[data-disabled]" },
  },
  indicator: {
    visible: { kirana: "[data-visible]" },
    disabled: { kirana: "[data-disabled]" },
  },
} as const

export const tagsInputState = {
  root: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    focused: { kirana: "[data-focused]" },
    empty: { kirana: "[data-empty]" },
  },
  list: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
  item: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    editing: { kirana: "[data-editing]" },
  },
  itemText: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
  itemInput: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
  itemRemove: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
  input: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
  clear: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
  },
} as const

export const fileUploadState = {
  root: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
    empty: { kirana: "[data-empty]" },
  },
  dropzone: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  trigger: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  list: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  item: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  itemName: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  itemSize: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  itemRemove: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
  clear: {
    disabled: { kirana: "[data-disabled]" },
    dragging: { kirana: "[data-dragging]" },
    required: { kirana: "[data-required]" },
  },
} as const

export const timeFieldState = {
  root: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    invalid: { kirana: "[data-invalid]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
  },
  segment: {
    segment: {
      hour: { kirana: '[data-segment="hour"]' },
      minute: { kirana: '[data-segment="minute"]' },
      second: { kirana: '[data-segment="second"]' },
      dayPeriod: { kirana: '[data-segment="dayPeriod"]' },
      literal: { kirana: '[data-segment="literal"]' },
    },
    placeholder: { kirana: "[data-placeholder]" },
    disabled: { kirana: "[data-disabled]" },
    invalid: { kirana: "[data-invalid]" },
    touched: { kirana: "[data-touched]" },
    dirty: { kirana: "[data-dirty]" },
    filled: { kirana: "[data-filled]" },
    focused: { kirana: "[data-focused]" },
    valid: { kirana: "[data-valid]" },
  },
} as const

export const treeState = {
  item: {
    selected: { kirana: "[data-selected]" },
    highlighted: { kirana: "[data-highlighted]" },
    disabled: { kirana: "[data-disabled]" },
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    loading: { kirana: "[data-loading]" },
  },
  itemRow: {
    selected: { kirana: "[data-selected]" },
    highlighted: { kirana: "[data-highlighted]" },
    disabled: { kirana: "[data-disabled]" },
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    loading: { kirana: "[data-loading]" },
  },
  itemIndicator: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    loading: { kirana: "[data-loading]" },
  },
  group: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    startingStyle: { kirana: "[data-starting-style]" },
    endingStyle: { kirana: "[data-ending-style]" },
  },
} as const

export const colorPickerState = {
  root: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    format: {
      hex: { kirana: '[data-format="hex"]' },
      rgb: { kirana: '[data-format="rgb"]' },
      hsl: { kirana: '[data-format="hsl"]' },
    },
  },
  area: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
  },
  areaThumb: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
  },
  channelSlider: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    channel: {
      hue: { kirana: '[data-channel="hue"]' },
      alpha: { kirana: '[data-channel="alpha"]' },
    },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  channelSliderTrack: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    channel: {
      hue: { kirana: '[data-channel="hue"]' },
      alpha: { kirana: '[data-channel="alpha"]' },
    },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  channelSliderThumb: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    channel: {
      hue: { kirana: '[data-channel="hue"]' },
      alpha: { kirana: '[data-channel="alpha"]' },
    },
    orientation: {
      horizontal: { kirana: '[data-orientation="horizontal"]' },
      vertical: { kirana: '[data-orientation="vertical"]' },
    },
  },
  channelInput: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    channel: {
      hex: { kirana: '[data-channel="hex"]' },
      red: { kirana: '[data-channel="red"]' },
      green: { kirana: '[data-channel="green"]' },
      blue: { kirana: '[data-channel="blue"]' },
      hue: { kirana: '[data-channel="hue"]' },
      saturation: { kirana: '[data-channel="saturation"]' },
      lightness: { kirana: '[data-channel="lightness"]' },
      alpha: { kirana: '[data-channel="alpha"]' },
    },
  },
  swatch: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
  },
  swatchTrigger: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    selected: { kirana: "[data-selected]" },
  },
  eyeDropperTrigger: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
  },
  valueText: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    format: {
      hex: { kirana: '[data-format="hex"]' },
      rgb: { kirana: '[data-format="rgb"]' },
      hsl: { kirana: '[data-format="hsl"]' },
    },
  },
  formatTrigger: {
    disabled: { kirana: "[data-disabled]" },
    readonly: { kirana: "[data-readonly]" },
    required: { kirana: "[data-required]" },
    dragging: { kirana: "[data-dragging]" },
    format: {
      hex: { kirana: '[data-format="hex"]' },
      rgb: { kirana: '[data-format="rgb"]' },
      hsl: { kirana: '[data-format="hsl"]' },
    },
  },
} as const

export const tourState = {
  spotlight: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    startingStyle: { kirana: "[data-starting-style]" },
    endingStyle: { kirana: "[data-ending-style]" },
    centered: { kirana: "[data-centered]" },
  },
  positioner: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    side: {
      top: { kirana: '[data-side="top"]' },
      right: { kirana: '[data-side="right"]' },
      bottom: { kirana: '[data-side="bottom"]' },
      left: { kirana: '[data-side="left"]' },
      "inline-start": { kirana: '[data-side="inline-start"]' },
      "inline-end": { kirana: '[data-side="inline-end"]' },
    },
    align: {
      start: { kirana: '[data-align="start"]' },
      center: { kirana: '[data-align="center"]' },
      end: { kirana: '[data-align="end"]' },
    },
    centered: { kirana: "[data-centered]" },
    anchorHidden: { kirana: "[data-anchor-hidden]" },
  },
  popup: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    startingStyle: { kirana: "[data-starting-style]" },
    endingStyle: { kirana: "[data-ending-style]" },
    side: {
      top: { kirana: '[data-side="top"]' },
      right: { kirana: '[data-side="right"]' },
      bottom: { kirana: '[data-side="bottom"]' },
      left: { kirana: '[data-side="left"]' },
      "inline-start": { kirana: '[data-side="inline-start"]' },
      "inline-end": { kirana: '[data-side="inline-end"]' },
    },
    align: {
      start: { kirana: '[data-align="start"]' },
      center: { kirana: '[data-align="center"]' },
      end: { kirana: '[data-align="end"]' },
    },
    centered: { kirana: "[data-centered]" },
  },
  arrow: {
    open: { kirana: "[data-open]" },
    closed: { kirana: "[data-closed]" },
    side: {
      top: { kirana: '[data-side="top"]' },
      right: { kirana: '[data-side="right"]' },
      bottom: { kirana: '[data-side="bottom"]' },
      left: { kirana: '[data-side="left"]' },
      "inline-start": { kirana: '[data-side="inline-start"]' },
      "inline-end": { kirana: '[data-side="inline-end"]' },
    },
    align: {
      start: { kirana: '[data-align="start"]' },
      center: { kirana: '[data-align="center"]' },
      end: { kirana: '[data-align="end"]' },
    },
    uncentered: { kirana: "[data-uncentered]" },
    centered: { kirana: "[data-centered]" },
  },
  previous: {
    disabled: { kirana: "[data-disabled]" },
  },
  next: {
    last: { kirana: "[data-last]" },
  },
} as const
