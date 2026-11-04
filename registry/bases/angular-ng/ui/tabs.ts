import { Directive, computed, effect, input, untracked } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpTabButton,
  NgpTabList,
  NgpTabPanel,
  NgpTabset,
  injectTabPanelState,
  injectTabsetState,
} from "ng-primitives/tabs"

import { presence } from "../../../lib/angular/presence"
import { tabs } from "../../../styles/tabs.styles"

/**
 * Tabs: `<div kuiTabs defaultValue="overview">`, on ng-primitives' `NgpTabset`, which writes its
 * `data-orientation`. It takes Base UI's `value` (`[(value)]`), `defaultValue` and `orientation`.
 */
@Directive({
  selector: "[kuiTabs]",
  hostDirectives: [
    {
      directive: NgpTabset,
      inputs: ["ngpTabsetValue: value", "ngpTabsetOrientation: orientation"],
      outputs: ["ngpTabsetValueChange: valueChange"],
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
  readonly defaultValue = input<string>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tabs.root, this.sx()))

  constructor() {
    const state = injectTabsetState()
    let applied = false
    effect(() => {
      const value = this.defaultValue()
      untracked(() => {
        if (applied || value === undefined) return
        applied = true
        state().select(value)
      })
    })
  }
}

/** The row of tabs (`role="tablist"`), filled or underlined (`variant="line"`). */
@Directive({
  selector: "[kuiTabsList]",
  hostDirectives: [NgpTabList],
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

/** A tab: `<button kuiTabsTrigger value="overview">`, Base UI's `data-active` while chosen. */
@Directive({
  selector: "button[kuiTabsTrigger]",
  hostDirectives: [
    {
      directive: NgpTabButton,
      inputs: ["ngpTabButtonValue: value", "ngpTabButtonDisabled: disabled"],
    },
  ],
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

/** A tab's panel, in the page only while its tab is chosen, as Base UI's (`presence`). */
@Directive({
  selector: "[kuiTabsContent]",
  hostDirectives: [
    { directive: NgpTabPanel, inputs: ["ngpTabPanelValue: value"] },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "tabs-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TabsContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(tabs.content, this.sx()))

  constructor() {
    const state = injectTabPanelState()
    presence(() => state().active())
  }
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
