import { Component, Directive, computed, input } from "@angular/core"
import {
  KuiTabs,
  KuiTabsList,
  KuiTabsPanel,
  KuiTabsTab,
} from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { tabs } from "../../../styles/tabs.styles"

/**
 * Tabs: `<div kuiTabs defaultValue="overview">`, on Kirana UI's tabs (`KuiTabs`), which write
 * their `data-orientation`: its `[(value)]`, `defaultValue` and `orientation` are the primitive's.
 */
@Directive({
  selector: "[kuiTabs]",
  hostDirectives: [
    {
      directive: KuiTabs,
      inputs: ["value", "defaultValue", "orientation"],
      outputs: ["valueChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tabs",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Tabs {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tabs.root, this.sx()))
}

/**
 * The row of tabs, Kirana UI's list (`KuiTabsList`, `role="tablist"`), filled or underlined
 * (`variant="line"`).
 */
@Directive({
  selector: "[kuiTabsList]",
  hostDirectives: [KuiTabsList],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tabs-list",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TabsList {
  readonly variant = input<"default" | "line">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [tabs.list, this.variant() === "line" ? tabs.listLine : tabs.listDefault],
      this.sx()
    )
  )
}

/**
 * A tab: `<button kuiTabsTrigger value="overview">`, Kirana UI's tab (`KuiTabsTab`, `data-active`
 * while chosen): its `value` and `disabled` are the primitive's.
 */
@Directive({
  selector: "button[kuiTabsTrigger]",
  hostDirectives: [{ directive: KuiTabsTab, inputs: ["value", "disabled"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tabs-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TabsTrigger {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tabs.trigger, this.sx()))
}

/**
 * A tab's panel: `<div kuiTabsContent value="overview">`. Kirana UI's panel is structural
 * (`*kuiTabsPanel`, in the page only while its tab is chosen), which an attribute cannot put around
 * its own element: the part draws it around the caller's content, its own element drawing nothing.
 */
@Component({
  selector: "[kuiTabsContent]",
  imports: [KuiTabsPanel],
  providers: [provideSxPart()],
  host: { style: "display: contents" },
  template: `
    <div
      *kuiTabsPanel="value()"
      data-slot="tabs-content"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </div>
  `,
})
class TabsContent {
  readonly value = input<unknown>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tabs.content, this.sx()))
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
