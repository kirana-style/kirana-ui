import { Component, signal } from "@angular/core"
import type { Type } from "@angular/core"
import { NgComponentOutlet } from "@angular/common"
import { css, props } from "@kirana-style/core"
import { Toaster } from "@workspace/registry/bases/angular-ng/ui/sonner"
import { Toaster as ToastToaster } from "@workspace/registry/bases/angular-ng/ui/toast"
import { previews } from "@workspace/registry/bases/angular-ng/previews"
import { space } from "@workspace/registry/core/scales"

import { Charts } from "./charts"
import { Showcase } from "./showcase"

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/**
 * One page per item, as `/preview/angular/ng/<item>`, and the showcase; the root lists them. An
 * item that is not there, or fails to load, says so rather than showing the list.
 */
const item = location.pathname.match(/\/ng\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]

@Component({
  selector: "preview-root",
  imports: [Charts, NgComponentOutlet, Showcase, Toaster, ToastToaster],
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
        <kui-toaster position="top-center" />
        <kui-toast-toaster />
      }
    } @else if (!item) {
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
  protected readonly failure = signal<string | null>(null)
  protected readonly names = [...Object.keys(previews), "showcase", "charts"]
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
