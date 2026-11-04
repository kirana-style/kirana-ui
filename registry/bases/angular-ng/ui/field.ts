import type { ElementRef } from "@angular/core"
import {
  Component,
  Directive,
  afterNextRender,
  computed,
  input,
  signal,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { field } from "../../../styles/field.styles"
import { label } from "../../../styles/label.styles"
import { Separator } from "./separator"

@Directive({
  selector: "[kuiField]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field",
    role: "group",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Field {
  readonly orientation = input<"vertical" | "horizontal" | "responsive">(
    "vertical"
  )
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.root, this.sx()))
}

@Directive({
  selector: "[kuiFieldContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.content, this.sx()))
}

@Directive({
  selector: "[kuiFieldDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.description, this.sx()))
}

/** The errors' messages, each once. */
@Directive({
  selector: "[kuiFieldError]",
  providers: [provideSxPart()],
  host: {
    role: "alert",
    "data-slot": "field-error",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldError {
  readonly errors = input<Array<{ message?: string } | undefined> | undefined>(
    undefined
  )
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.error, this.sx()))
}

@Directive({
  selector: "[kuiFieldGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.group, this.sx()))
}

@Directive({
  selector: "[kuiFieldLabel]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldLabel {
  readonly sx = input<SxInput>()
  // Label's own styles first, as Vue's FieldLabel is a Label: one merge, so the field's win.
  protected readonly part = computed(() =>
    partSx([label, field.label], this.sx())
  )
}

@Directive({
  selector: "[kuiFieldLegend]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-legend",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldLegend {
  readonly variant = input<"legend" | "label">("legend")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.legend, this.sx()))
}

/**
 * A separator, with its text when the caller writes one (`<div kuiFieldSeparator>Or</div>`): the
 * text's span leaves the page when nothing is projected into it, as React's renders it only with
 * children.
 */
@Component({
  selector: "[kuiFieldSeparator]",
  imports: [Separator, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-separator",
    "[attr.data-content]": "content()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <div kuiSeparator [sx]="field.separatorLine"></div>
    <span
      #text
      data-slot="field-separator-content"
      [sx]="field.separatorContent"
      ><ng-content
    /></span>
  `,
})
class FieldSeparator {
  readonly sx = input<SxInput>()
  protected readonly field = field
  protected readonly part = computed(() => partSx(field.separator, this.sx()))
  protected readonly content = signal(false)
  private readonly text =
    viewChild.required<ElementRef<HTMLSpanElement>>("text")

  constructor() {
    afterNextRender(() => {
      const text = this.text().nativeElement
      const written = !!text.textContent?.trim() || text.children.length > 0
      this.content.set(written)
      if (!written) text.remove()
    })
  }
}

@Directive({
  selector: "[kuiFieldSet]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-set",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldSet {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.set, this.sx()))
}

@Directive({
  selector: "[kuiFieldTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "field-label",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FieldTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(field.title, this.sx()))
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
}
