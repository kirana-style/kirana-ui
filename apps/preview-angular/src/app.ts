import { Component } from "@angular/core"
import { NgComponentOutlet } from "@angular/common"
import { css, props } from "@kirana-style/core"
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
  imports: [NgComponentOutlet, Showcase],
  template: `
    @if (item === "showcase") {
      <preview-showcase />
    } @else if (current) {
      <ng-container *ngComponentOutlet="current" />
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
  protected readonly current =
    item && item in previews ? previews[item as keyof typeof previews] : null
  protected readonly names = [...Object.keys(previews), "showcase"]
  protected readonly list = props(list).className
}
