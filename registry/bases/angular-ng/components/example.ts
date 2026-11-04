/**
 * The frame upstream's `-example` pages share, Vue's `components/example` on Angular: the page
 * (`<div kuiExampleWrapper>`) and each example in it (`<div kuiExample title="…">`). As Vue's, the
 * caller's `sx` styles the inner element: the wrapper's grid, the example's content.
 */
import { Component, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { example } from "../../../styles/example.styles"

@Component({
  selector: "[kuiExample]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "example",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    @if (title()) {
      <div [sx]="example.title">{{ title() }}</div>
    }
    <div data-slot="example-content" [sx]="content()"><ng-content /></div>
  `,
})
class Example {
  readonly title = input<string>()
  readonly containerSx = input<SxInput>()
  readonly sx = input<SxInput>()
  protected readonly example = example
  protected readonly content = computed(
    () => [example.content, this.sx()] as SxInput
  )
  protected readonly part = computed(() =>
    partSx(example.root, this.containerSx())
  )
}

@Component({
  selector: "[kuiExampleWrapper]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<div data-slot="example-wrapper" [sx]="inner()">
    <ng-content />
  </div>`,
})
class ExampleWrapper {
  readonly sx = input<SxInput>()
  protected readonly inner = computed(
    () => [example.wrapper, this.sx()] as SxInput
  )
  protected readonly part = computed(() => partSx(example.page, undefined))
}

export { Example, ExampleWrapper }
