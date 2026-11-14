/**
 * Mounting a registry item for one test, as the preview's page mounts it (`Host.vue`, the icon
 * library provided as `src/main.ts` provides it), and what went wrong while it was on the page.
 */
import type { Component } from "vue"
import { computed, createApp, nextTick } from "vue"
import { onTestFinished } from "vite-plus/test"

import stylesheet from "@kirana-style/core/stylesheet.css?url"
import {
  frames,
  refreshStyles,
  watchPage,
} from "@workspace/vite-config/browser-page"
import { previews as arkPreviews } from "@workspace/registry/bases/vue-ark/previews.ts"
import { previews as rekaPreviews } from "@workspace/registry/bases/vue-reka/previews.ts"
import { ICON_LIBRARY } from "@workspace/registry/icons/vue.ts"

import { design } from "../src/design"
import Host from "./Host.vue"

export const BASES = { ark: arkPreviews, reka: rekaPreviews }

/** Lets Vue and the item settle: the next tick, then two frames. */
export async function settle() {
  await nextTick()
  await frames()
  await nextTick()
}

/** Kirana's stylesheet with every module compiled so far (`refreshStyles`, KF-124). */
export const styles = () => refreshStyles(stylesheet)

/** `component` mounted on the page with the preview's providers, unmounted when the test ends. */
export async function mountComponent(
  component: Component,
  props: Record<string, unknown> = {}
) {
  await styles()
  const watch = watchPage()
  const container = document.createElement("div")
  document.body.append(container)
  const app = createApp(component, props)
  app.config.errorHandler = (error) => watch.errors.push(String(error))
  app.provide(
    ICON_LIBRARY,
    computed(() => design.value.system.iconLibrary)
  )
  app.mount(container)
  await settle()
  // What the item loaded on mounting has compiled by now.
  await styles()
  await settle()
  onTestFinished(() => {
    app.unmount()
    container.remove()
    watch.stop()
  })
  return { container, errors: watch.errors }
}

/** The item `base/item` on the page, as its preview page holds it. */
export async function mountItem(base: keyof typeof BASES, item: string) {
  const load = BASES[base][item]
  if (!load) throw new Error(`no ${base}/${item}`)
  const { default: component } = await load()
  return mountComponent(Host, { base, item: component })
}
