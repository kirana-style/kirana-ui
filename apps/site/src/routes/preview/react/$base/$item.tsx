import { Suspense, use, useEffect, useSyncExternalStore } from "react"
import type { ComponentType } from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router"
import { I18nProvider } from "react-aria-components"

import registryCss from "@/styles/registry.css?url"
import {
  forwardModeKey,
  listenForDesign,
  previewQuery,
} from "@workspace/registry/core/preview"
import { usePageDesign } from "@/lib/page-design"
import { DEFAULT_DESIGN_SYSTEM } from "@workspace/registry/core/config"
import { IconLibraryProvider } from "@workspace/registry/icons/icon-placeholder"

/**
 * Each base's map of items, `/preview/react/base/<item>` and `/preview/react/aria/<item>`: small,
 * since each item is its own chunk, loaded only on its own page.
 */
const BASES: Record<
  string,
  () => Promise<{
    previews: Record<string, () => Promise<{ default: ComponentType }>>
  }>
> = {
  base: () => import("@workspace/registry/bases/react-base/previews"),
  aria: () => import("@workspace/registry/bases/react-aria/previews"),
}

/** An item's component, loaded once per page: the same promise every render, as `use` needs. */
const loading = new Map<string, Promise<ComponentType>>()
function loadItem(base: string, item: string) {
  const key = `${base}/${item}`
  let pending = loading.get(key)
  if (!pending) {
    pending = BASES[base]()
      .then(({ previews }) => previews[item]())
      .then((module) => module.default)
    loading.set(key, pending)
  }
  return pending
}

function PreviewItem({ base, item }: { base: string; item: string }) {
  const Item = use(loadItem(base, item))
  // Not created here: `use` returns the one component the cached promise resolved to.
  // oxlint-disable-next-line react/static-components
  return <Item />
}

/**
 * One item alone, in the design its URL names (`?preset=`, upstream's axis parameters, `rtl`,
 * `pointer`). The page is prerendered in the default design, and the root's inline script writes
 * the URL's on `<html>` before the first paint (X-7), so the page is a static file. A framing page
 * changes it live with upstream's `design-system-params` message: the URL takes the new design,
 * which the page reads from its location, and a reload keeps it.
 */
export const Route = createFileRoute("/preview/react/$base/$item")({
  head: ({ params }) => ({
    meta: [{ title: `${params.item} · Preview` }],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  loader: async ({ params }) => {
    const load = BASES[params.base]
    if (!load || !(params.item in (await load()).previews)) throw notFound()
  },
  component: Preview,
})

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

function Preview() {
  const { base, item } = Route.useParams()
  const preview = usePageDesign()
  const navigate = useNavigate()

  useEffect(() => {
    const stopKey = forwardModeKey(window)
    const stopDesign = listenForDesign(window, (design) => {
      void navigate({
        href: `${location.pathname}?${previewQuery(design)}`,
        replace: true,
      })
    })
    return () => {
      stopKey()
      stopDesign()
    }
  }, [navigate])

  // What `<html>` does not carry, the direction and the icon library, follows the URL once the page
  // has hydrated: it hydrates in the design it was prerendered in.
  const hydrated = useSyncExternalStore(subscribeNever, isClient, isServer)
  const design = hydrated ? preview : null
  const rtl = design?.options.rtl ?? false
  return (
    <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
      <I18nProvider locale={rtl ? "ar" : "en-US"}>
        <IconLibraryProvider
          library={
            design?.system.iconLibrary ?? DEFAULT_DESIGN_SYSTEM.iconLibrary
          }
        >
          <Suspense>
            <PreviewItem base={base} item={item} />
          </Suspense>
        </IconLibraryProvider>
      </I18nProvider>
    </DirectionProvider>
  )
}
