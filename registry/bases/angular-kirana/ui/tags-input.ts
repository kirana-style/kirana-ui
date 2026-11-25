import {
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
} from "@angular/core"
import {
  KpTagsInput,
  KpTagsInputClear,
  KpTagsInputInput,
  KpTagsInputItem,
  KpTagsInputItemInput,
  KpTagsInputItemRemove,
  KpTagsInputItemText,
  KpTagsInputItems,
  KpTagsInputList,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { combobox } from "../../../styles/combobox.styles"
import { tagsInput } from "../../../styles/tags-input.styles"
import { buttonLabels } from "./button"

const CROSS = `<svg
  iconPlaceholder
  lucide="XIcon"
  tabler="IconX"
  hugeicons="Cancel01Icon"
  phosphor="XIcon"
  remixicon="RiCloseLine"
></svg>`

/**
 * A tag: `<span kuiTagsInputItem [entry]="entry">`, Kirana UI's (`KpTagsInputItem`): its text (the
 * caller's content, given any), the input it is edited in, and its remove button, drawn as a ghost
 * `icon-xs` Button, unless `showRemove` is false.
 */
@Component({
  selector: "[kuiTagsInputItem]",
  imports: [
    IconPlaceholder,
    KpTagsInputItemInput,
    KpTagsInputItemRemove,
    KpTagsInputItemText,
  ],
  hostDirectives: [{ directive: KpTagsInputItem, inputs: ["entry"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tags-input-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <span kpTagsInputItemText data-slot="tags-input-item-text"
      ><ng-content
    /></span>
    <input
      kpTagsInputItemInput
      data-slot="tags-input-item-input"
      [class]="itemInput"
    />
    @if (showRemove()) {
      <button
        kpTagsInputItemRemove
        data-slot="tags-input-item-remove"
        [class]="remove"
      >
        ${CROSS}
      </button>
    }
  `,
})
class TagsInputItem {
  readonly showRemove = input(true, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly itemInput = partSx(tagsInput.itemInput, undefined).class
  protected readonly remove = partSx(
    [
      button({ variant: "ghost", size: "icon-xs" }),
      combobox.chipRemove,
      tagsInput.itemRemove,
    ],
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx([combobox.chip, tagsInput.item], this.sx())
  )
}

/** Where a new tag is typed: `<input kuiTagsInputInput placeholder="…">`, Kirana UI's. */
@Directive({
  selector: "input[kuiTagsInputInput]",
  hostDirectives: [KpTagsInputInput],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tags-input-input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TagsInputInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([combobox.chipInput, tagsInput.input], this.sx())
  )
}

/**
 * The field: `<div kuiTagsInput [defaultValue]="['React']">`, on Kirana UI's (`KpTagsInput`), its
 * `[(value)]`, `defaultValue`, `validate`, `max`, `allowDuplicates`, `delimiter`, `addOnBlur`,
 * `addOnPaste`, `editable`, `disabled`, `readOnly`, `required`, `name` and `form` the primitive's,
 * `(valueChanged)` and `(valueInvalid)` its outputs. It draws its tags, one `TagsInputItem` for
 * each, then its content (the input, and a clear button where there is one); with no content, a
 * bare input.
 */
@Component({
  selector: "[kuiTagsInput]",
  imports: [KpTagsInputItems, KpTagsInputList, TagsInputInput, TagsInputItem],
  hostDirectives: [
    {
      directive: KpTagsInput,
      inputs: [
        "value",
        "defaultValue",
        "validate",
        "max",
        "allowDuplicates",
        "delimiter",
        "addOnBlur",
        "addOnPaste",
        "editable",
        "disabled",
        "readOnly",
        "required",
        "name",
        "form",
      ],
      outputs: ["valueChange", "valueChanged", "valueInvalid"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tags-input",
    // The primitive's inputs: Angular leaves a caller's static attributes on the element too.
    "[attr.name]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
    "[attr.max]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div kpTagsInputList data-slot="tags-input-list" [class]="list">
      <span
        *kpTagsInputItems="let entry"
        kuiTagsInputItem
        [entry]="entry"
      ></span>
    </div>
    <ng-content><input kuiTagsInputInput /></ng-content>
  `,
})
class TagsInput {
  readonly sx = input<SxInput>()
  protected readonly list = partSx(combobox.contents, undefined).class
  protected readonly part = computed(() =>
    partSx([combobox.chips, tagsInput.root], this.sx())
  )
}

/**
 * Takes every tag away: `<button kuiTagsInputClear>`, a ghost `icon-xs` Button drawing a cross
 * unless given content, hidden by the primitive while there is no tag.
 */
@Component({
  selector: "button[kuiTagsInputClear]",
  imports: [IconPlaceholder],
  hostDirectives: [KpTagsInputClear],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tags-input-clear",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content>${CROSS}</ng-content>`,
})
class TagsInputClear {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [button({ variant: "ghost", size: "icon-xs" }), tagsInput.clear],
      this.sx()
    )
  )

  constructor() {
    buttonLabels()
  }
}

export { TagsInput, TagsInputClear, TagsInputInput, TagsInputItem }
