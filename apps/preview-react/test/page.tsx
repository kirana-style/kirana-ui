/**
 * Mounting a registry item for one test, as the preview page mounts it (`Preview`, its providers
 * and toasters), and what went wrong while it was on the page.
 */
import type { ComponentType } from "react"
import { act } from "react"
import { createRoot } from "react-dom/client"
import { onTestFinished } from "vite-plus/test"

import stylesheet from "@kirana-style/core/stylesheet.css?url"
import {
  frames,
  refreshStyles,
  watchPage,
} from "@workspace/vite-config/browser-page"

import { Preview, loadItem } from "../src/preview"

/** Lets React and the item settle: pending effects, then two frames. */
export async function settle() {
  await act(async () => frames())
}

/** Kirana's stylesheet with every module compiled so far (`refreshStyles`, KF-124). */
export const styles = () => refreshStyles(stylesheet)

/**
 * The item `base/item` on the page, unmounted when the test ends. `errors` collects every error
 * the page raised meanwhile (a thrown render, a rejected promise, React's own reports) and every
 * form a press submitted.
 */
export async function mountItem(base: string, item: string) {
  const Item = (await loadItem(base, item)) as ComponentType | undefined
  if (!Item) throw new Error(`no ${base}/${item}`)
  // The toasters `Preview` loads lazily, compiled before the stylesheet is taken: a stylesheet
  // that changes after mounting restyles the page, and a chart's entrance ends at a repaint.
  await Promise.all([
    import("@workspace/registry/bases/react-base/ui/sonner"),
    import("@workspace/registry/bases/react-base/ui/toast"),
  ])
  await styles()
  const watch = watchPage()
  const container = document.createElement("div")
  document.body.append(container)
  const root = createRoot(container, {
    onUncaughtError: (error) => watch.errors.push(String(error)),
    onCaughtError: (error) => watch.errors.push(String(error)),
  })
  await act(async () => root.render(<Preview base={base} Item={Item} />))
  await settle()
  // What the item loaded on mounting (a toaster, a lazy part) has compiled by now.
  await styles()
  await settle()
  let mounted = true
  const unmount = async () => {
    if (!mounted) return
    mounted = false
    await act(async () => root.unmount())
    container.remove()
    watch.stop()
  }
  onTestFinished(unmount)
  return { container, errors: watch.errors, unmount }
}
