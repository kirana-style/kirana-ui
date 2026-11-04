import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { alert } from "../../../styles/alert.styles"

type AlertVariants = NonNullable<Parameters<typeof alert.root>[0]>

@Directive({
  selector: "[kuiAlert]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert",
    "[attr.data-variant]": "variant()",
    role: "alert",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Alert {
  readonly variant = input<AlertVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([alert.scope, alert.root({ variant: this.variant() })], this.sx())
  )
}

@Directive({
  selector: "[kuiAlertAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-action",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertAction {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alert.action, this.sx()))
}

@Directive({
  selector: "[kuiAlertDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alert.description, this.sx()))
}

@Directive({
  selector: "[kuiAlertTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "alert-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AlertTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(alert.title, this.sx()))
}

export { Alert, AlertAction, AlertDescription, AlertTitle }
