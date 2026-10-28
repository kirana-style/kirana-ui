import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { props } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes.ts"
import { followPageDesign } from "@workspace/registry/core/preview.ts"
import { root } from "@workspace/registry/core/root.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { mount } from "svelte"
import { loadDesignFonts } from "@workspace/fonts"

import App from "./App.svelte"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className = props(root, axes.anchor, page.document)
  .className as string
document.body.className = props(page.body).className as string
// The design's families, loaded when it names them: the page links Inter and Geist only.
void loadDesignFonts(
  followPageDesign((next) => void loadDesignFonts(next.system)).system
)

mount(App, { target: document.getElementById("app")! })
