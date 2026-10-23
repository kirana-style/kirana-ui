import "@fontsource-variable/inter"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { props } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { createApp } from "vue"

import App from "./App.vue"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, and the colour scheme. No attribute means the default design.
document.documentElement.className = props(root, axes.anchor, page.document)
  .className as string
document.body.className = props(page.body).className as string

createApp(App).mount("#app")
