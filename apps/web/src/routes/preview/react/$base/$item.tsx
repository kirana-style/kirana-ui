import { Suspense, use, useEffect } from "react"
import type { ComponentType } from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router"
import { I18nProvider } from "react-aria-components"

import previewCss from "@/styles/preview.css?url"
import {
  forwardModeKey,
  listenForDesign,
  previewQuery,
} from "@workspace/registry/core/preview"
import { IconLibraryProvider } from "@workspace/registry/icons/icon-placeholder"

/**
 * Each base's items, `/preview/react/base/<item>` and `/preview/react/aria/<item>`, loaded only on
 * their own pages: the demo and the other base never download them.
 */
const BASES: Record<
  string,
  () => Promise<{ previews: Record<string, ComponentType> }>
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
    pending = BASES[base]().then(({ previews }) => previews[item])
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
 * `pointer`), which the root route writes on `<html>`. A framing page changes it live with
 * upstream's `design-system-params` message: the URL takes the new design, so the root renders it
 * as the server would, and a reload keeps it.
 */
export const Route = createFileRoute("/preview/react/$base/$item")({
  head: ({ params }) => ({
    meta: [{ title: `${params.item} · Preview` }],
    links: [{ rel: "stylesheet", href: previewCss }],
  }),
  loader: async ({ params }) => {
    const load = BASES[params.base]
    if (!load || !(params.item in (await load()).previews)) throw notFound()
  },
  component: Preview,
})

function Preview() {
  const { base, item } = Route.useParams()
  const { preview } = Route.useRouteContext()
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

  const rtl = preview?.options.rtl ?? false
  return (
    <DirectionProvider direction={rtl ? "rtl" : "ltr"}>
      <I18nProvider locale={rtl ? "ar" : "en-US"}>
        <IconLibraryProvider library={preview?.system.iconLibrary ?? "lucide"}>
          <Suspense>
            <PreviewItem base={base} item={item} />
          </Suspense>
        </IconLibraryProvider>
      </I18nProvider>
    </DirectionProvider>
  )
}
