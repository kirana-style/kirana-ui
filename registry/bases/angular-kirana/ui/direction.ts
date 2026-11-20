import { Directive } from "@angular/core"
import { KpDirection } from "@kirana-ui/angular"

/**
 * The reading direction for every part inside: `<ng-container kuiDirectionProvider
 * [direction]="dir()">`, drawing no element, as Base UI's `DirectionProvider`. It is Kirana UI's
 * (`kpDirection`), which its parts read where they place things and move with the arrows; a part
 * of the registry's reads it with `useDirection()` (Kirana UI's `injectDirection()`).
 */
@Directive({
  selector: "[kuiDirectionProvider]",
  hostDirectives: [
    { directive: KpDirection, inputs: ["kpDirection: direction"] },
  ],
})
class DirectionProvider {}

/** The direction the nearest `DirectionProvider` gives, `ltr` outside one. */
export { injectDirection as useDirection } from "@kirana-ui/angular"
export { DirectionProvider }
