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

/**
 * Each base's key for a state. `ng` is ng-primitives, Angular's base, which writes Base UI's
 * attribute names nearly everywhere (`data-checked`, `data-open`, `data-active`, `aria-pressed`), so
 * Base UI's keys already match it; a state gets an `ng` key only where they differ (an accordion's
 * disabled trigger).
 */
export type StateKeys = {
  base?: string
  aria?: string
  ark?: string
  ng?: string
}

/** `value` under every base's key for `state`. */
export function when<Value>(state: StateKeys, value: Value) {
  return {
    ...(state.base ? { [state.base]: value } : {}),
    ...(state.aria ? { [state.aria]: value } : {}),
    ...(state.ark ? { [state.ark]: value } : {}),
    ...(state.ng ? { [state.ng]: value } : {}),
  }
}

/** A popup's or a modal's first frame, and its exit. */
export const overlay = {
  starting: {
    base: Base.Dialog.Popup.startingStyle,
    aria: Aria.Modal.entering,
  },
  ending: { base: Base.Dialog.Popup.endingStyle, aria: Aria.Modal.exiting },
} as const satisfies Record<string, StateKeys>

/**
 * Ark UI's popups and modals, open or leaving: Ark keeps a closing one mounted only while a CSS
 * animation runs, so their motion is keyframes on these rather than a transition (`overlay.styles`).
 */
export const presence = {
  open: { ark: Ark.Dialog.Content.state.open },
  closed: { ark: Ark.Dialog.Content.state.closed },
} as const satisfies Record<string, StateKeys>

/** The side a popup opened on, against its trigger. React Aria has no logical sides. */
export const side = {
  top: { base: Base.Menu.Popup.side.top, aria: Aria.Popover.placement.top },
  bottom: {
    base: Base.Menu.Popup.side.bottom,
    aria: Aria.Popover.placement.bottom,
  },
  left: { base: Base.Menu.Popup.side.left, aria: Aria.Popover.placement.left },
  right: {
    base: Base.Menu.Popup.side.right,
    aria: Aria.Popover.placement.right,
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
  },
  disabled: {
    base: Base.Menu.Item.disabled,
    aria: Aria.MenuItem.disabled,
    ark: Ark.Menu.Item.disabled,
  },
  /** A submenu trigger whose submenu is open. */
  open: {
    base: Base.Menu.SubmenuTrigger.popupOpen,
    aria: Aria.MenuItem.open,
    ark: Ark.Menu.Trigger.state.open,
  },
} as const satisfies Record<string, StateKeys>

/** A tab: the chosen one, and one that cannot be chosen. */
export const tab = {
  active: {
    base: Base.Tabs.Tab.active,
    aria: Aria.Tab.selected,
    ark: Ark.Tabs.Trigger.selected,
  },
  disabled: {
    base: Base.Tabs.Tab.disabled,
    aria: Aria.Tab.disabled,
    ark: Ark.Tabs.Trigger.disabled,
  },
} as const satisfies Record<string, StateKeys>

/** A Tabs root's direction, which every base writes with the same two values (ng-primitives too). */
export const tabOrientation = {
  horizontal: {
    base: Base.Tabs.Root.orientation.horizontal,
    aria: Aria.Tabs.orientation.horizontal,
    ark: Ark.Tabs.Root.orientation.horizontal,
    ng: NgPrimitives.Tabs.Tabset.orientation.horizontal,
  },
  vertical: {
    base: Base.Tabs.Root.orientation.vertical,
    aria: Aria.Tabs.orientation.vertical,
    ark: Ark.Tabs.Root.orientation.vertical,
    ng: NgPrimitives.Tabs.Tabset.orientation.vertical,
  },
} as const satisfies Record<string, StateKeys>

/** A collapsible section that is open: Base UI's Collapsible, React Aria's Disclosure. */
export const disclosure = {
  open: {
    base: Base.Collapsible.Root.open,
    aria: Aria.Disclosure.expanded,
    ark: Ark.Collapsible.Root.state.open,
    ng: NgPrimitives.Collapsible.Root.open,
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
  open: { base: Base.Accordion.Item.open, ark: Ark.Accordion.Item.state.open },
  /** An open item on either base: `data-open:`, React Aria's `data-expanded:`. */
  expanded: { base: Base.Accordion.Item.open, aria: Aria.Disclosure.expanded },
  panelOpen: { base: Base.Accordion.Panel.open },
  panelClosed: { base: Base.Accordion.Panel.closed },
  /** Ark UI's content, which moves over its own `--height` (`accordion.contentArk`). */
  contentOpen: { ark: Ark.Accordion.ItemContent.state.open },
  contentClosed: { ark: Ark.Accordion.ItemContent.state.closed },
  triggerDisabled: {
    base: '[aria-disabled="true"]',
    aria: ":disabled",
    ng: NgPrimitives.Accordion.Trigger.disabled,
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
  },
  across: {
    base: '[data-separator][aria-orientation="horizontal"]',
    aria: '[data-separator][aria-orientation="horizontal"]',
    ark: Ark.Splitter.ResizeTrigger.orientation.vertical,
  },
} as const satisfies Record<string, StateKeys>

/** A Base UI toast and its content. React Aria has no toast. */
export const toast = {
  expanded: { base: Base.Toast.Root.expanded },
  limited: { base: Base.Toast.Root.limited },
  starting: { base: Base.Toast.Root.startingStyle },
  ending: { base: Base.Toast.Root.endingStyle },
  swipeUp: { base: Base.Toast.Root.swipeDirection.up },
  swipeDown: { base: Base.Toast.Root.swipeDirection.down },
  swipeLeft: { base: Base.Toast.Root.swipeDirection.left },
  swipeRight: { base: Base.Toast.Root.swipeDirection.right },
  contentExpanded: { base: Base.Toast.Content.expanded },
  behind: { base: Base.Toast.Content.behind },
} as const satisfies Record<string, StateKeys>

/** A collapsible panel's first frame and its exit, which it animates its height over. */
export const collapsiblePanel = {
  starting: { base: Base.Collapsible.Panel.startingStyle },
  ending: { base: Base.Collapsible.Panel.endingStyle },
  // Ark UI's content, opening or leaving: its motion is keyframes over the `--height` it sets.
  open: { ark: Ark.Collapsible.Content.state.open },
  closed: { ark: Ark.Collapsible.Content.state.closed },
} as const satisfies Record<string, StateKeys>

/**
 * A checkbox's states, as upstream reads them on each base: Base UI's root is a `span`, so its
 * `disabled:` never matches (a disabled one dims through its Field, `group-has-disabled/field:`).
 * React Aria's root is the `label` around a hidden input, and Base UI's root writes
 * `data-disabled` too, so React Aria's key also asks for the `data-rac` every React Aria element
 * carries: the site serves every base's keys at once, and Base UI's checkbox must not read it.
 * Ark UI's box is the root's Control, and its radio's and switch's write the same attributes
 * (`data-state`, `data-focus-visible`, `data-invalid`), so one key reads all three.
 */
export const check = {
  checked: {
    base: Base.Checkbox.Root.checked,
    aria: Aria.Checkbox.selected,
    ark: Ark.Checkbox.Control.state.checked,
  },
  focusVisible: {
    base: ":focus-visible",
    aria: Aria.Checkbox.focusVisible,
    ark: Ark.Checkbox.Control.focusVisible,
  },
  invalid: {
    base: '[aria-invalid="true"]',
    aria: Aria.Checkbox.invalid,
    ark: Ark.Checkbox.Control.invalid,
  },
  disabled: {
    base: ":disabled",
    aria: `[data-rac]${Aria.Checkbox.disabled}`,
    // None on Ark UI, as none holds on Base UI (its box is never `:disabled`): a disabled one dims
    // through its Field, whose hidden input is `:disabled`.
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
  },
  linkActive: {
    base: Base.NavigationMenu.Link.active,
    ark: Ark.NavigationMenu.Link.current,
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
    // ng-primitives' toggle and a single-choice group's items (radios, `aria-checked`).
    ng: NgPrimitives.Toggle.Root.selected,
  },
} as const satisfies Record<string, StateKeys>

/** A select's trigger with no value chosen. React Aria marks its value element instead. */
export const placeholder = {
  trigger: {
    base: Base.Select.Trigger.placeholder,
    ark: Ark.Select.Trigger.placeholderShown,
  },
  value: { aria: Aria.SelectValue.placeholder },
} as const satisfies Record<string, StateKeys>

/** A separator's direction, declared beside the configuration that makes its keys exclusive. */
export { orientation } from "./kirana"
