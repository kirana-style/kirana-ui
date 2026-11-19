import { Component, signal } from "@angular/core"
import type { Type } from "@angular/core"
import { NgComponentOutlet } from "@angular/common"
import { css, props } from "@kirana-style/core"
import { previews as ngPreviews } from "@workspace/registry/bases/angular-ng/previews"
import { previews as kiranaPreviews } from "@workspace/registry/bases/angular-kirana/previews"
import { space } from "@workspace/registry/core/scales"

import { Charts } from "./charts"
import { Showcase } from "./showcase"
import { KiranaToasters, NgToasters } from "./toasters"

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/**
 * One page per item, as `/preview/angular/<base>/<item>` (NG Primitives' or Kirana UI's), and the
 * showcase (NG Primitives'); the root lists them. An item that is not there, or fails to load, says
 * so rather than showing the list.
 */
const route = location.pathname.match(
  /\/(ng|kirana)\/([a-z0-9-]+?)(?:\.html)?\/?$/
)
const base = route?.[1] === "kirana" ? "kirana" : "ng"
const item = route?.[2]
const previews = base === "kirana" ? kiranaPreviews : ngPreviews

@Component({
  selector: "preview-root",
  imports: [Charts, KiranaToasters, NgComponentOutlet, NgToasters, Showcase],
  template: `
    @if (item === "showcase") {
      <preview-showcase />
    } @else if (item === "charts") {
      <preview-charts />
    } @else if (failure()) {
      <p [class]="list">{{ failure() }}</p>
    } @else if (current()) {
      <ng-container *ngComponentOutlet="current()" />
      <!-- Sonner's toaster, as upstream's site mounts it on every page (\`top-center\`), and
           Toast's, as React's Base UI pages do; loaded after the page, since only the items that
           show a toast need them. -->
      @defer (on idle) {
        @if (base === "kirana") {
          <preview-kirana-toasters />
        } @else {
          <preview-ng-toasters />
        }
      }
    } @else if (!item) {
      <nav [class]="list">
        @for (name of names; track name) {
          <a [href]="'/preview/angular/' + base + '/' + name">{{ name }}</a>
        }
      </nav>
    }
  `,
})
export class App {
  protected readonly item = item
  protected readonly base = base
  // Loaded only on its own page, as the other previews'.
  protected readonly current = signal<Type<unknown> | null>(null)
  protected readonly failure = signal<string | null>(null)
  protected readonly names = [
    ...Object.keys(previews),
    ...(base === "ng" ? ["showcase", "charts"] : []),
  ]
  protected readonly list = props(list).className

  constructor() {
    if (!item || item === "showcase" || item === "charts") return
    const load = previews[item]
    if (!load) {
      this.failure.set(`There is no Angular preview named “${item}”.`)
      return
    }
    // A development server that has just re-bundled its dependencies answers the module after a
    // reload: one reload, then the error.
    const key = `kui-preview-reload:${item}`
    const storage = (() => {
      try {
        return sessionStorage
      } catch {
        return null
      }
    })()
    load()
      .then((module) => {
        storage?.removeItem(key)
        this.current.set(module.default)
      })
      .catch((error: unknown) => {
        if (storage && !storage.getItem(key)) {
          storage.setItem(key, "1")
          location.reload()
          return
        }
        storage?.removeItem(key)
        console.error(error)
        this.failure.set(
          `The Angular preview “${item}” failed to load: ${String(error)}`
        )
      })
  }
}
