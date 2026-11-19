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
 * and a few of its own (`data-selected` on a tab, `data-pressed` on a toggle). Kirana has no ui-sdk
 * vocabulary yet, so its keys are written here as selectors, from each component's Data Attributes
 * in ui-sdk's docs (0.1.0-beta.2), each checked in the browser: the vocabulary's keys once a release
 * carries KF-125 (found on 0.4.1).
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
    uisdk: "[data-starting-style]",
  },
  ending: {
    base: Base.Dialog.Popup.endingStyle,
    aria: Aria.Modal.exiting,
    bits: Bits.Dialog.Content.endingStyle,
    uisdk: "[data-ending-style]",
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
  // Bits UI's popups write the physical side as Base UI's do (`data-side`). Its vocabulary names it
  // only on the arrows, the same strings: the contents' keys once a release fixes KF-117 (found on 0.4.1).
  top: {
    base: Base.Menu.Popup.side.top,
    aria: Aria.Popover.placement.top,
    bits: Bits.Popover.Arrow.side.top,
    uisdk: '[data-side="top"]',
  },
  bottom: {
    base: Base.Menu.Popup.side.bottom,
    aria: Aria.Popover.placement.bottom,
    bits: Bits.Popover.Arrow.side.bottom,
    uisdk: '[data-side="bottom"]',
  },
  left: {
    base: Base.Menu.Popup.side.left,
    aria: Aria.Popover.placement.left,
    bits: Bits.Popover.Arrow.side.left,
    uisdk: '[data-side="left"]',
  },
  right: {
    base: Base.Menu.Popup.side.right,
    aria: Aria.Popover.placement.right,
    bits: Bits.Popover.Arrow.side.right,
    uisdk: '[data-side="right"]',
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
    uisdk: "[data-disabled]",
  },
  /** A submenu trigger whose submenu is open. */
  open: {
    base: Base.Menu.SubmenuTrigger.popupOpen,
    aria: Aria.MenuItem.open,
    ark: Ark.Menu.Trigger.state.open,
    reka: Reka.DropdownMenu.SubTrigger.state.open,
    // Bits UI names a submenu's trigger by its menu (`data-dropdown-menu-sub-trigger` …).
    bits: '[data-state="open"]',
    uisdk: "[data-open]",
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
    uisdk: "[data-selected]",
  },
  disabled: {
    base: Base.Tabs.Tab.disabled,
    aria: Aria.Tab.disabled,
    ark: Ark.Tabs.Trigger.disabled,
    reka: Reka.Tabs.Trigger.disabled,
    bits: Bits.Tabs.Trigger.disabled,
    uisdk: "[data-disabled]",
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
    uisdk: "[data-open]",
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
    uisdk: "[data-open]",
  },
  /** An open item on either base: `data-open:`, React Aria's `data-expanded:`. */
  expanded: {
    base: Base.Accordion.Item.open,
    aria: Aria.Disclosure.expanded,
    uisdk: "[data-open]",
  },
  panelOpen: { base: Base.Accordion.Panel.open, uisdk: "[data-open]" },
  panelClosed: { base: Base.Accordion.Panel.closed, uisdk: "[data-closed]" },
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
    uisdk: "[data-expanded]",
  },
  limited: { base: Base.Toast.Root.limited, reka: "[data-limited]" },
  starting: {
    base: Base.Toast.Root.startingStyle,
    reka: "[data-starting-style]",
    uisdk: "[data-starting-style]",
  },
  ending: { base: Base.Toast.Root.endingStyle, uisdk: "[data-ending-style]" },
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
    uisdk: "[data-expanded]",
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
    uisdk: "[data-starting-style]",
  },
  ending: {
    base: Base.Collapsible.Panel.endingStyle,
    uisdk: "[data-ending-style]",
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
    uisdk: "[data-checked]",
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
    uisdk: "[data-placeholder]",
  },
  value: { aria: Aria.SelectValue.placeholder },
} as const satisfies Record<string, StateKeys>

/** A separator's direction, declared beside the configuration that makes its keys exclusive. */
export { orientation } from "./kirana"
