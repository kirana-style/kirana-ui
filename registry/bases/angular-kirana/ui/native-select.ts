import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
  output,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"

import { nativeSelect } from "../../../styles/native-select.styles"

/**
 * A native select in its wrapper (`<div kuiNativeSelect>` holding the options): the wrapper takes
 * the caller's `sx`, the `<select>` its `disabled`, `aria-invalid`, `name`, `id` and value, as
 * React's spreads the rest of its props on the select.
 */
@Component({
  selector: "[kuiNativeSelect]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "native-select-wrapper",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <select
      data-slot="native-select"
      [attr.data-size]="size()"
      [disabled]="disabled()"
      [attr.aria-invalid]="ariaInvalid()"
      [attr.aria-label]="ariaLabel()"
      [attr.name]="name()"
      [attr.id]="selectId()"
      [value]="value()"
      (change)="valueChange.emit($any($event.target).value)"
      [sx]="nativeSelect.select"
    >
      <ng-content />
    </select>
    <svg
      iconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      aria-hidden="true"
      data-slot="native-select-icon"
      [sx]="nativeSelect.icon"
    ></svg>
  `,
})
class NativeSelect {
  readonly size = input<"sm" | "default">("default")
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly ariaInvalid = input<string | boolean | undefined>(undefined, {
    alias: "aria-invalid",
  })
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  })
  readonly name = input<string | undefined>(undefined)
  readonly selectId = input<string | undefined>(undefined, {
    alias: "selectId",
  })
  readonly value = input<string | undefined>(undefined)
  readonly valueChange = output<string>()
  readonly sx = input<SxInput>()
  protected readonly nativeSelect = nativeSelect
  protected readonly part = computed(() =>
    partSx(nativeSelect.wrapper, this.sx())
  )
}

@Directive({
  selector: "[kuiNativeSelectOptGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "native-select-optgroup",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NativeSelectOptGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(nativeSelect.option, this.sx())
  )
}

@Directive({
  selector: "[kuiNativeSelectOption]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "native-select-option",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class NativeSelectOption {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(nativeSelect.option, this.sx())
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
