import {
  Directive,
  InjectionToken,
  computed,
  inject,
  input,
  numberAttribute,
  output,
} from "@angular/core"
import { KuiToggle, KuiToggleGroup } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

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
 * Toggles that work as one: `<div kuiToggleGroup [defaultValue]="['bold']" multiple>`, on Kirana
 * UI's toggle group (`KuiToggleGroup`), Base UI's API: its value is the pressed items' values, one
 * at a time unless `multiple`; its `value`, `defaultValue`, `multiple`, `disabled` and
 * `orientation` are the primitive's. `variant`, `size` and `spacing` (steps of 0.25rem between the
 * items, 0 joining them) reach the items.
 *
 * `valueChange` is the registry's, the values as a list of strings, as upstream's callers take it
 * (the primitive's model reports `readonly unknown[] | undefined`): it is told what the user
 * changed (the primitive's `valueChanged`).
 */
@Directive({
  selector: "[kuiToggleGroup]",
  hostDirectives: [
    {
      directive: KuiToggleGroup,
      inputs: ["value", "defaultValue", "multiple", "disabled", "orientation"],
    },
  ],
  providers: [
    provideSxPart(),
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
  readonly valueChange = output<string[]>()
  protected readonly part = computed(() => partSx(toggleGroup.root, this.sx()))

  constructor() {
    inject(KuiToggleGroup).valueChanged.subscribe(({ value }) =>
      this.valueChange.emit(value as string[])
    )
  }
}

/**
 * One of its toggles: `<button kuiToggleGroupItem value="bold">`, Kirana UI's toggle
 * (`KuiToggle`) with a `value`, which makes it one of the group's: its `value` and `disabled` are
 * the primitive's.
 */
@Directive({
  selector: "button[kuiToggleGroupItem]",
  hostDirectives: [{ directive: KuiToggle, inputs: ["value", "disabled"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "toggle-group-item",
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
