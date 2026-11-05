import { Component, signal } from "@angular/core"
import type { Type } from "@angular/core"
import { NgComponentOutlet } from "@angular/common"
import { css, props } from "@kirana-style/core"
import { Toaster } from "@workspace/registry/bases/angular-ng/ui/sonner"
import { previews } from "@workspace/registry/bases/angular-ng/previews"
import { space } from "@workspace/registry/core/scales"

import { Showcase } from "./showcase"

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/** One page per item, as `/preview/angular/ng/<item>`, and the showcase; anything else lists them. */
const item = location.pathname.match(/\/ng\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]

@Component({
  selector: "preview-root",
  imports: [NgComponentOutlet, Showcase, Toaster],
  template: `
    @if (item === "showcase") {
      <preview-showcase />
    } @else if (current()) {
      <ng-container *ngComponentOutlet="current()" />
      <!-- Sonner's toaster, as upstream's site mounts it on every page (\`top-center\`), loaded
           after the page, since only the items that call \`toast()\` need it. -->
      @defer (on idle) {
        <kui-toaster position="top-center" />
      }
    } @else {
      <nav [class]="list">
        @for (name of names; track name) {
          <a [href]="'/preview/angular/ng/' + name">{{ name }}</a>
        }
      </nav>
    }
  `,
})
export class App {
  protected readonly item = item
  // Loaded only on its own page, as the other previews'.
  protected readonly current = signal<Type<unknown> | null>(null)
  protected readonly names = [...Object.keys(previews), "showcase"]
  protected readonly list = props(list).className

  constructor() {
    const load = item ? previews[item] : undefined
    void load?.().then((module) => this.current.set(module.default))
  }
}
