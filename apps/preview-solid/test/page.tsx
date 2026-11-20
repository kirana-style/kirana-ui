/**
 * Mounting a registry item for one test, as the preview's page mounts it (`src/main.tsx`: the icon
 * library's and the language's contexts), and what went wrong while it was on the page.
 */
import type { Component, JSX } from "solid-js"
import { ErrorBoundary } from "solid-js"
import { render } from "solid-js/web"
import { onTestFinished } from "vite-plus/test"

import { frames, watchPage } from "@workspace/vite-config/browser-page"
import { LanguageContext } from "@workspace/registry/bases/solid-ark/components/language-selector.tsx"
import { previews as arkPreviews } from "@workspace/registry/bases/solid-ark/previews.ts"
import { IconLibraryContext } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { LanguageContext as KiranaLanguageContext } from "@workspace/registry/bases/solid-kirana/components/language-selector.tsx"
import { previews as kiranaPreviews } from "@workspace/registry/bases/solid-kirana/previews.ts"
import { IconLibraryContext as KiranaIconLibraryContext } from "@workspace/registry/bases/solid-kirana/ui/icon-placeholder.tsx"

import { design } from "../src/design"

/** Each base's example pages, as the preview's routes hold them. */
export const BASES = { ark: arkPreviews, kirana: kiranaPreviews }

/** Lets Solid and the item settle: two frames. */
export const settle = frames

/** `view` on the page in the preview's contexts, disposed when the test ends. */
export async function mountView(view: () => JSX.Element) {
  const watch = watchPage()
  const container = document.createElement("div")
  document.body.append(container)
  const dispose = render(
    () => (
      <ErrorBoundary
        fallback={(error) => {
          watch.errors.push(String(error))
          return null
        }}
      >
        <IconLibraryContext.Provider value={() => design().system.iconLibrary}>
          <KiranaIconLibraryContext.Provider
            value={() => design().system.iconLibrary}
          >
            <LanguageContext.Provider value={() => design().options.language}>
              <KiranaLanguageContext.Provider
                value={() => design().options.language}
              >
                {view()}
              </KiranaLanguageContext.Provider>
            </LanguageContext.Provider>
          </KiranaIconLibraryContext.Provider>
        </IconLibraryContext.Provider>
      </ErrorBoundary>
    ),
    container
  )
  await settle()
  // What the item loaded on mounting has compiled by now.
  await settle()
  onTestFinished(() => {
    dispose()
    container.remove()
    watch.stop()
  })
  return { container, errors: watch.errors }
}

/** The example `item` of `base` on the page, as its preview page holds it. */
export async function mountItem(base: keyof typeof BASES, item: string) {
  const load = BASES[base][item]
  if (!load) throw new Error(`no ${base}/${item}`)
  const { default: Item } = (await load()) as { default: Component }
  return mountView(() => <Item />)
}
