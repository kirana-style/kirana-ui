import { Component, computed, input } from "@angular/core"
import { props } from "@kirana-style/core"
import { NgxSonnerToaster } from "ngx-sonner"

import { theme } from "../../../core/tokens"
import { sonner } from "../../../styles/sonner.styles"

type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

/**
 * Sonner's toaster: `<kui-toaster position="top-center" />` once in the app, and `toast()` from
 * `ngx-sonner` wherever a toast is shown. `ngx-sonner`, Sonner's Angular port, draws Sonner's
 * markup inside an element of its own, and takes the registry's colours and radius as variables;
 * it has no way to give the toasts shadcn/ui's icons, so they keep Sonner's own (LF-017). It ports
 * Sonner 1, whose toaster sat 32px from the edge; Sonner 2's, React's, sits 24px away.
 */
@Component({
  selector: "kui-toaster",
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [theme]="theme()"
      [position]="position()"
      offset="24px"
      [class]="toasterClass"
      [style]="style()"
    />
  `,
})
class Toaster {
  readonly theme = input<"light" | "dark" | "system">("system")
  readonly position = input<Position>("bottom-right")
  protected readonly toasterClass = props(sonner.toaster).className ?? ""
  protected readonly style = computed(() => ({
    "--normal-bg": theme.popover,
    "--normal-text": theme.popoverForeground,
    "--normal-border": theme.border,
    "--border-radius": "var(--sonner-radius)",
    ...(props(sonner.toaster).style as Record<string, string> | undefined),
  }))
}

export { Toaster }
