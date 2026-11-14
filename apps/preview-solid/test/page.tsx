/**
 * Mounting a registry item for one test, as the preview's page mounts it (`src/main.tsx`: the icon
 * library's and the language's contexts), and what went wrong while it was on the page.
 */
import type { Component, JSX } from "solid-js"
import { ErrorBoundary } from "solid-js"
import { render } from "solid-js/web"
import { onTestFinished } from "vite-plus/test"

import stylesheet from "@kirana-style/core/stylesheet.css?url"
import {
  frames,
  refreshStyles,
  watchPage,
} from "@workspace/vite-config/browser-page"
import { LanguageContext } from "@workspace/registry/bases/solid-ark/components/language-selector.tsx"
import { previews } from "@workspace/registry/bases/solid-ark/previews.ts"
import { IconLibraryContext } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"

import { design } from "../src/design"

export { previews }

/** Lets Solid and the item settle: two frames. */
export const settle = frames

/** Kirana's stylesheet with every module compiled so far (`refreshStyles`, KF-124). */
export const styles = () => refreshStyles(stylesheet)

/** `view` on the page in the preview's contexts, disposed when the test ends. */
export async function mountView(view: () => JSX.Element) {
  await styles()
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
          <LanguageContext.Provider value={() => design().options.language}>
            {view()}
          </LanguageContext.Provider>
        </IconLibraryContext.Provider>
      </ErrorBoundary>
    ),
    container
  )
  await settle()
  // What the item loaded on mounting has compiled by now.
  await styles()
  await settle()
  onTestFinished(() => {
    dispose()
    container.remove()
    watch.stop()
  })
  return { container, errors: watch.errors }
}

/** The example `item` on the page, as its preview page holds it. */
export async function mountItem(item: string) {
  const load = previews[item]
  if (!load) throw new Error(`no ark/${item}`)
  const { default: Item } = (await load()) as { default: Component }
  return mountView(() => <Item />)
}
