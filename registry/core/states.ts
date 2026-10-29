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

/**
 * Each base's key for a state. `ng` is ng-primitives, Angular's base: no style reads one of its
 * states yet, since the components Angular has so far (Button, Card, Skeleton) write none a style
 * keys on; its keys come from `@kirana-style/states/ng-primitives` with the first that does.
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

/** A Tabs root's direction, which every base writes with the same two values. */
export const tabOrientation = {
  horizontal: {
    base: Base.Tabs.Root.orientation.horizontal,
    aria: Aria.Tabs.orientation.horizontal,
    ark: Ark.Tabs.Root.orientation.horizontal,
  },
  vertical: {
    base: Base.Tabs.Root.orientation.vertical,
    aria: Aria.Tabs.orientation.vertical,
    ark: Ark.Tabs.Root.orientation.vertical,
  },
} as const satisfies Record<string, StateKeys>

/** A collapsible section that is open: Base UI's Collapsible, React Aria's Disclosure. */
export const disclosure = {
  open: {
    base: Base.Collapsible.Root.open,
    aria: Aria.Disclosure.expanded,
    ark: Ark.Collapsible.Root.state.open,
  },
} as const satisfies Record<string, StateKeys>

/**
 * An accordion's item and panel. Upstream dims a disabled trigger with `aria-disabled:` on Base UI
 * (whose native button is `disabled`, so it never matches) and `disabled:` on React Aria.
 */
export const accordion = {
  /** shadcn/ui's `data-open:`, which only Base UI's item writes. */
  open: { base: Base.Accordion.Item.open },
  /** An open item on either base: `data-open:`, React Aria's `data-expanded:`. */
  expanded: { base: Base.Accordion.Item.open, aria: Aria.Disclosure.expanded },
  panelOpen: { base: Base.Accordion.Panel.open },
  // Kirana's vocabulary has no `closed` on `Accordion.Panel` (KF-072, for 0.3.6); Base UI's
  // accordion panel is its collapsible panel and writes the same `data-closed`.
  panelClosed: { base: Base.Collapsible.Panel.closed },
  triggerDisabled: { base: '[aria-disabled="true"]', aria: ":disabled" },
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

/**
 * A checkbox's states, as upstream reads them on each base: Base UI's root is a `span`, so its
 * `disabled:` never matches (a disabled one dims through its Field, `group-has-disabled/field:`).
 * React Aria's root is the `label` around a hidden input, and Base UI's root writes
 * `data-disabled` too, so React Aria's key also asks for the `data-rac` every React Aria element
 * carries: the site serves every base's keys at once, and Base UI's checkbox must not read it.
 */
export const check = {
  checked: { base: Base.Checkbox.Root.checked, aria: Aria.Checkbox.selected },
  focusVisible: { base: ":focus-visible", aria: Aria.Checkbox.focusVisible },
  invalid: { base: '[aria-invalid="true"]', aria: Aria.Checkbox.invalid },
  disabled: {
    base: ":disabled",
    aria: `[data-rac]${Aria.Checkbox.disabled}`,
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
