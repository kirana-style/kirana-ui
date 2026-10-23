import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { props } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { ICON_LIBRARY } from "@workspace/registry/icons/vue.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { computed, createApp } from "vue"

import App from "./App.vue"
import { design, followDesign } from "./design"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className = props(root, axes.anchor, page.document)
  .className as string
document.body.className = props(page.body).className as string
followDesign()

createApp(App)
  .provide(
    ICON_LIBRARY,
    computed(() => design.value.system.iconLibrary)
  )
  .mount("#app")
