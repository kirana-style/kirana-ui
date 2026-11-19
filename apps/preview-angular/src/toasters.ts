import { Component } from "@angular/core"
import { Toaster as KiranaSonner } from "@workspace/registry/bases/angular-kirana/ui/sonner"
import { Toaster as KiranaToast } from "@workspace/registry/bases/angular-kirana/ui/toast"
import { Toaster as NgSonner } from "@workspace/registry/bases/angular-ng/ui/sonner"
import { Toaster as NgToast } from "@workspace/registry/bases/angular-ng/ui/toast"

/**
 * Each base's toasters, Sonner's (`top-center`, as upstream's site mounts it) and Toast's: a
 * component per base, since both bases' toasters take the same selector and one template cannot
 * import two components that match it.
 */
@Component({
  selector: "preview-ng-toasters",
  imports: [NgSonner, NgToast],
  template: `<kui-toaster position="top-center" /><kui-toast-toaster />`,
})
export class NgToasters {}

@Component({
  selector: "preview-kirana-toasters",
  imports: [KiranaSonner, KiranaToast],
  template: `<kui-toaster position="top-center" /><kui-toast-toaster />`,
})
export class KiranaToasters {}
