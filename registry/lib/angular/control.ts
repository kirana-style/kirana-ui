/**
 * What Angular's form controls on ng-primitives share (Switch, Checkbox, Radio Group's items …).
 *
 * `keepAriaInvalid`: ng-primitives' form-control binding owns `aria-invalid`, from an Angular form's
 * status, and clears the one a caller writes when no form is attached (LF-012). Upstream's demos mark
 * an invalid control with `aria-invalid`, as Base UI's take it, so a part reads it as an input and
 * writes it again once ng-primitives has rendered.
 */
import { ElementRef, afterRenderEffect, inject } from "@angular/core"
import type { Signal } from "@angular/core"

export function keepAriaInvalid(invalid: Signal<string | boolean | undefined>) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  afterRenderEffect(() => {
    const value = invalid()
    if (value === undefined || value === false || value === "false") return
    element.setAttribute(
      "aria-invalid",
      value === true || value === "" ? "true" : value
    )
  })
}
