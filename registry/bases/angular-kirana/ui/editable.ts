import type { ElementRef } from "@angular/core"
import { Component, Directive, computed, input, viewChild } from "@angular/core"
import {
  KpEditable,
  KpEditableCancelTrigger,
  KpEditableEditTrigger,
  KpEditableInput,
  KpEditablePreview,
  KpEditableSubmitTrigger,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { editable } from "../../../styles/editable.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A text edited in place: `<div kuiEditable defaultValue="…">` around its preview, input and
 * triggers, on Kirana UI's editable (`KpEditable`), its `[(value)]`, `defaultValue`, `[(editing)]`,
 * `defaultEditing`, `placeholder`, `activation`, `submitOnBlur`, `selectOnFocus`, `disabled`,
 * `readOnly`, `required`, `name` and `form` the primitive's, `(valueChanged)` and
 * `(editingChanged)` its changes with their details.
 */
@Directive({
  selector: "[kuiEditable]",
  hostDirectives: [
    {
      directive: KpEditable,
      inputs: [
        "value",
        "defaultValue",
        "editing",
        "defaultEditing",
        "placeholder",
        "activation",
        "submitOnBlur",
        "selectOnFocus",
        "disabled",
        "readOnly",
        "required",
        "name",
        "form",
      ],
      outputs: [
        "valueChange",
        "editingChange",
        "valueChanged",
        "editingChanged",
      ],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "editable",
    // The primitive's: Angular leaves the caller's static attributes on this element too.
    "[attr.placeholder]": "null",
    "[attr.name]": "null",
    "[attr.required]": "null",
    "[attr.disabled]": "null",
    "[attr.form]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Editable {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(editable.root, this.sx()))
}

/** The text as it reads, or the placeholder while there is none: `<span kuiEditablePreview>`. */
@Directive({
  selector: "[kuiEditablePreview]",
  hostDirectives: [KpEditablePreview],
  providers: [provideSxPart()],
  host: {
    "data-slot": "editable-preview",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EditablePreview {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, editable.preview], this.sx())
  )
}

/** Where the text is typed: `<input kuiEditableInput>`, hidden unless editing. */
@Directive({
  selector: "[kuiEditableInput]",
  hostDirectives: [KpEditableInput],
  providers: [provideSxPart()],
  host: {
    "data-slot": "editable-input",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class EditableInput {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([inputStyle, editable.input], this.sx())
  )
}

/**
 * What the three triggers share: drawn as a Button (`ghost`, `icon-sm` by default), named by
 * `label` while it shows its own icon (a caller's `aria-label` wins), and its text trimmed as a
 * Button's.
 */
@Directive()
abstract class EditableTrigger {
  protected abstract readonly label: string
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("icon-sm")
  readonly ariaLabel = input<string>(undefined, { alias: "aria-label" })
  readonly sx = input<SxInput>()
  /** The icon it draws when given no content, which `<ng-content>`'s fallback holds. */
  protected readonly icon = viewChild<ElementRef<SVGElement>>("icon")
  protected readonly name = computed(
    () => this.ariaLabel() ?? (this.icon() ? this.label : null)
  )
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

const TRIGGER_HOST = {
  "[attr.aria-label]": "name()",
  "[class]": "part().class",
  "[style]": "part().style",
}

/** Starts an edit: `<button kuiEditableEditTrigger>`, a ghost icon button with a pencil unless given content. */
@Component({
  selector: "button[kuiEditableEditTrigger]",
  imports: [IconPlaceholder],
  hostDirectives: [KpEditableEditTrigger],
  providers: [provideSxPart()],
  host: { "data-slot": "editable-edit-trigger", ...TRIGGER_HOST },
  template: `<ng-content
    ><svg
      #icon
      iconPlaceholder
      lucide="PencilIcon"
      tabler="IconPencil"
      hugeicons="EditIcon"
      phosphor="PencilIcon"
      remixicon="RiPencilLine"
    ></svg
  ></ng-content>`,
})
class EditableEditTrigger extends EditableTrigger {
  protected readonly label = "Edit"
}

/** Keeps the edit: `<button kuiEditableSubmitTrigger>`, a ghost icon button with a check unless given content. */
@Component({
  selector: "button[kuiEditableSubmitTrigger]",
  imports: [IconPlaceholder],
  hostDirectives: [KpEditableSubmitTrigger],
  providers: [provideSxPart()],
  host: { "data-slot": "editable-submit-trigger", ...TRIGGER_HOST },
  template: `<ng-content
    ><svg
      #icon
      iconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
    ></svg
  ></ng-content>`,
})
class EditableSubmitTrigger extends EditableTrigger {
  protected readonly label = "Save"
}

/** Drops the edit: `<button kuiEditableCancelTrigger>`, a ghost icon button with a cross unless given content. */
@Component({
  selector: "button[kuiEditableCancelTrigger]",
  imports: [IconPlaceholder],
  hostDirectives: [KpEditableCancelTrigger],
  providers: [provideSxPart()],
  host: { "data-slot": "editable-cancel-trigger", ...TRIGGER_HOST },
  template: `<ng-content
    ><svg
      #icon
      iconPlaceholder
      lucide="XIcon"
      tabler="IconX"
      hugeicons="Cancel01Icon"
      phosphor="XIcon"
      remixicon="RiCloseLine"
    ></svg
  ></ng-content>`,
})
class EditableCancelTrigger extends EditableTrigger {
  protected readonly label = "Cancel"
}

export {
  Editable,
  EditableCancelTrigger,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
}
