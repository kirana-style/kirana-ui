import type { ElementRef } from "@angular/core"
import { Component, signal, viewChild } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
  toolbar: css({ display: "flex", alignItems: "center", gap: space[2] }),
}

@Component({
  selector: "tour-demo",
  imports: [Button, IconPlaceholder, SxDirective, Tour, TourContent],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.stack">
        <div [sx]="styles.toolbar">
          <button #search kuiButton variant="outline">
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
            Search
          </button>
          <button #share kuiButton variant="outline">Share</button>
          <button
            #settings
            kuiButton
            variant="outline"
            size="icon"
            aria-label="Settings"
          >
            <svg
              iconPlaceholder
              lucide="SettingsIcon"
              tabler="IconSettings"
              hugeicons="SettingsIcon"
              phosphor="GearIcon"
              remixicon="RiSettingsLine"
            ></svg>
          </button>
        </div>
        <button kuiButton (click)="open.set(true)">Start the tour</button>
      </div>
      <ng-container
        kuiTour
        [steps]="steps"
        [open]="open()"
        (openChanged)="open.set($event.open)"
      >
        <div kuiTourContent></div>
      </ng-container>
    </div>
  `,
})
export default class TourDemo {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly open = signal(false)
  private readonly search = viewChild<ElementRef<HTMLElement>>("search")
  private readonly share = viewChild<ElementRef<HTMLElement>>("share")
  private readonly settings = viewChild<ElementRef<HTMLElement>>("settings")

  protected readonly steps: TourStep[] = [
    {
      id: "search",
      target: () => this.search()?.nativeElement ?? null,
      title: "Search",
      description: "Find any file in the project by its name.",
    },
    {
      id: "share",
      target: () => this.share()?.nativeElement ?? null,
      title: "Share",
      description: "Invite people to edit with you.",
    },
    {
      id: "settings",
      target: () => this.settings()?.nativeElement ?? null,
      title: "Settings",
      description: "Change the theme, your shortcuts and your account.",
    },
  ]
}
