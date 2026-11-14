/**
 * Mounting a registry item for one test, as the preview's page mounts it (`Host.svelte`), and what
 * went wrong while it was on the page.
 */
import { flushSync, mount, unmount } from "svelte"
import { onTestFinished } from "vite-plus/test"

import stylesheet from "@kirana-style/core/stylesheet.css?url"
import {
  frames,
  refreshStyles,
  watchPage,
} from "@workspace/vite-config/browser-page"
import { previews as arkPreviews } from "@workspace/registry/bases/svelte-ark/previews.ts"
import { previews as bitsPreviews } from "@workspace/registry/bases/svelte-bits/previews.ts"

import Host from "./Host.svelte"

export const BASES = { ark: arkPreviews, bits: bitsPreviews }

/** Lets Svelte and the item settle: pending effects, then two frames. */
export async function settle() {
  flushSync()
  await frames()
  flushSync()
}

/** Kirana's stylesheet with every module compiled so far (`refreshStyles`, KF-124). */
export const styles = () => refreshStyles(stylesheet)

/**
 * The item `base/item` on the page, unmounted when the test ends. `errors` collects every error
 * the page raised meanwhile and every form a press submitted.
 */
export async function mountItem(base: keyof typeof BASES, item: string) {
  const load = BASES[base][item]
  if (!load) throw new Error(`no ${base}/${item}`)
  const { default: component } = await load()
  await styles()
  const watch = watchPage()
  const container = document.createElement("div")
  document.body.append(container)
  let app: ReturnType<typeof mount> | undefined
  try {
    app = mount(Host, { target: container, props: { item: component } })
  } catch (error) {
    watch.errors.push(String(error))
  }
  await settle()
  // What the item loaded on mounting has compiled by now.
  await styles()
  await settle()
  onTestFinished(async () => {
    if (app) await unmount(app)
    container.remove()
    watch.stop()
  })
  return { container, errors: watch.errors }
}
