import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { signal } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { loadDesignFonts } from "@workspace/fonts"
import { props } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes"
import { DEFAULT_DESIGN_SYSTEM } from "@workspace/registry/core/config"
import type { IconLibrary } from "@workspace/registry/core/config"
import { followPageDesign } from "@workspace/registry/core/preview"
import { root } from "@workspace/registry/core/root"
import { LANGUAGE } from "@workspace/registry/bases/angular-ng/components/language-selector"
import type { Language } from "@workspace/registry/core/language"
import { ICON_LIBRARY } from "@workspace/registry/icons/angular"
import { page } from "@workspace/registry/styles/page.styles"

import { App } from "./app"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className = props(root, axes.anchor, page.document)
  .className as string
document.body.className = props(page.body).className as string
// The design's families, loaded when it names them: the page links Inter and Geist only. Its icon
// library, which every icon placeholder reads, follows it too.
const iconLibrary = signal<IconLibrary>(DEFAULT_DESIGN_SYSTEM.iconLibrary)
// A right-to-left demo's language; one that the URL does not name is the demo's own.
const language = signal<Language | undefined>(undefined)
const first = followPageDesign((next) => {
  void loadDesignFonts(next.system)
  iconLibrary.set(next.system.iconLibrary)
  language.set(next.options.language)
})
iconLibrary.set(first.system.iconLibrary)
language.set(first.options.language)
void loadDesignFonts(first.system)

void bootstrapApplication(App, {
  providers: [
    { provide: ICON_LIBRARY, useValue: iconLibrary.asReadonly() },
    { provide: LANGUAGE, useValue: language.asReadonly() },
  ],
})
