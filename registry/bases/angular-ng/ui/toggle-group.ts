import {
  Directive,
  HostAttributeToken,
  InjectionToken,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpToggleGroup,
  NgpToggleGroupItem,
  injectToggleGroupState,
  provideToggleGroupConfig,
} from "ng-primitives/toggle-group"

import { toggleGroup } from "../../../styles/toggle-group.styles"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** The group's look, which its items take unless they set their own. */
type GroupContext = {
  variant: () => ToggleVariants["variant"] | undefined
  size: () => ToggleVariants["size"] | undefined
  spacing: () => number
}
const TOGGLE_GROUP = new InjectionToken<GroupContext>("kui toggle group")

/**
 * ng-primitives reads whether a group presses one item or several (`type`) from its config (LF-014,
 * as the accordion's): set per group from its `multiple` attribute, Base UI's.
 */
const TOGGLE_GROUP_CONFIG = (
  provideToggleGroupConfig({}) as { provide: unknown }[]
)[0]!.provide

/**
 * Toggles that work as one: `<div kuiToggleGroup [defaultValue]="['bold']" multiple>`, on
 * ng-primitives' `NgpToggleGroup`. Base UI's API: its value is the pressed items' values, one at a
 * time unless `multiple`; `variant`, `size` and `spacing` (steps of 0.25rem between the items, 0
 * joining them) reach the items.
 */
@Directive({
  selector: "[kuiToggleGroup]",
  hostDirectives: [
    {
      directive: NgpToggleGroup,
      inputs: [
        "ngpToggleGroupValue: value",
        "ngpToggleGroupDefaultValue: defaultValue",
        "ngpToggleGroupDisabled: disabled",
        "ngpToggleGroupOrientation: orientation",
      ],
      outputs: ["ngpToggleGroupValueChange: valueChange"],
    },
  ],
  providers: [
    provideSxPart(),
    {
      provide: TOGGLE_GROUP_CONFIG,
      useFactory: () => ({
        type:
          inject(new HostAttributeToken("multiple"), { optional: true }) ===
          null
            ? "single"
            : "multiple",
        allowDeselection: true,
        wrap: true,
        orientation: "horizontal",
      }),
    },
    {
      provide: TOGGLE_GROUP,
      useFactory: (): GroupContext => {
        const group = inject(ToggleGroup)
        return {
          variant: group.variant,
          size: group.size,
          spacing: group.spacing,
        }
      },
    },
  ],
  host: {
    "data-slot": "toggle-group",
    "[attr.data-variant]": "variant() ?? null",
    "[attr.data-size]": "size() ?? null",
    "[attr.data-spacing]": "spacing()",
    "[attr.multiple]": "null",
    "[style.--gap]": "spacing()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ToggleGroup {
  readonly variant = input<ToggleVariants["variant"]>()
  readonly size = input<ToggleVariants["size"]>()
  readonly spacing = input(2, { transform: numberAttribute })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(toggleGroup.root, this.sx()))
}

/** One of its toggles: `<button kuiToggleGroupItem value="bold">`. */
@Directive({
  selector: "button[kuiToggleGroupItem]",
  hostDirectives: [
    {
      directive: NgpToggleGroupItem,
      inputs: [
        "ngpToggleGroupItemValue: value",
        "ngpToggleGroupItemDisabled: disabled",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "toggle-group-item",
    // A native button's `disabled`, which Base UI's item takes and the styles read (`:disabled`).
    "[disabled]": "disabled()",
    "[attr.data-variant]": "chosen().variant",
    "[attr.data-size]": "chosen().size",
    "[attr.data-spacing]": "group.spacing()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ToggleGroupItem {
  readonly variant = input<ToggleVariants["variant"]>("default")
  readonly size = input<ToggleVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly group = inject(TOGGLE_GROUP)
  readonly #item = inject(NgpToggleGroupItem)
  readonly #group = injectToggleGroupState()
  /** The item's own, or its group's, as ng-primitives reads both. */
  protected readonly disabled = computed(
    () => this.#item.disabled() || this.#group().disabled()
  )
  protected readonly chosen = computed(() => ({
    variant: this.group.variant() || this.variant(),
    size: this.group.size() || this.size(),
  }))
  protected readonly part = computed(() =>
    partSx(
      [toggleScope.anchor, toggle(this.chosen()), toggleGroup.item],
      this.sx()
    )
  )
}

export { ToggleGroup, ToggleGroupItem }
