import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "@workspace/registry/core/scales"
import { radius } from "@workspace/registry/core/tokens"
import { Card } from "@workspace/registry/bases/angular-ng/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from "@workspace/registry/bases/angular-ng/ui/sidebar"

const styles = {
  sidebarSectionCard: css({
    width: { "*": null, base: "100%" },
    overflow: { "*": null, base: "hidden" },
    borderRadius: { "*": null, base: radius["3xl"] },
    // Longhands: Card sets `paddingTop` and `paddingBottom`, which a `paddingBlock` loses to
    // (KF-083; Kirana reports it since 0.3.7).
    paddingTop: { "*": null, base: space["0"] },
    paddingBottom: { "*": null, base: space["0"] },
  }),
  sidebarSectionSidebarProvider: css({
    minHeight: { "*": null, base: space["0"] },
  }),
  sidebarSectionSidebar: css({
    width: { "*": null, base: "100%" },
    backgroundColor: "transparent",
  }),
  sidebarSectionSidebarContent: css({
    gap: { "*": null, base: space["0"] },
    overflow: { "*": null, base: "hidden" },
  }),
  sidebarSectionSidebarMenu: css({
    gap: { "*": null, base: space[1] },
  }),
}

@Component({
  selector: "kui-sidebar-section",
  imports: [
    Card,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="card()">
      <div kuiSidebarProvider [sx]="styles.sidebarSectionSidebarProvider">
        <div kuiSidebar collapsible="none" [sx]="styles.sidebarSectionSidebar">
          <div kuiSidebarContent [sx]="styles.sidebarSectionSidebarContent">
            <div kuiSidebarGroup>
              <div kuiSidebarGroupLabel>{{ label() }}</div>
              <div kuiSidebarGroupContent>
                <ul kuiSidebarMenu [sx]="styles.sidebarSectionSidebarMenu">
                  <ng-content />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarSection {
  readonly label = input.required<string>()
  // The caller's styles, on the card, as React's takes them.
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  protected readonly card = computed(
    () => [styles.sidebarSectionCard, this.sx()] as SxInput
  )
}
