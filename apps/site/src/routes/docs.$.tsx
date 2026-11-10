import { useEffect } from "react"
import { createFileRoute, notFound, redirect } from "@tanstack/react-router"
import { Markdown } from "@tanstack/markdown/react"

import { pageHeadings } from "@workspace/docs-core/pages.ts"
import {
  chooseCombination,
  rememberCombination,
} from "@workspace/docs-ui/combination.ts"
import { DocsPage } from "@workspace/docs-ui/docs-page.tsx"

import { markdownComponents } from "@/components/markdown"
import { readerCombination } from "@/lib/reader-combination"
import {
  defaultVariant,
  findPage,
  loadDocument,
  neighbours,
  pageHref,
} from "@/lib/pages"

const SITE = "https://ui.kirana.style"

/**
 * A docs page, from the content the generator parsed (`content/docs`). A component is a page per
 * framework and base (`lib/variants.ts`); the URL its variants share redirects to the reader's
 * framework and base when the component has it (`readerCombination`), else to the default one,
 * as shadcn/ui's `/docs/components/<name>` does to its Base UI page. Temporarily: where it leads
 * depends on the reader.
 */
/** Where a shared URL leads: the variant the reader chose (`vue/ark`) when there is one, else the default. */
function variantFor(href: string, chosen: string | undefined) {
  const own = chosen
    ? findPage(href.replace(/\/([^/]+)$/, `/${chosen}/$1`))
    : undefined
  return own?.variant?.of === href ? own : defaultVariant(href)
}

export const Route = createFileRoute("/docs/$")({
  server: {
    handlers: {
      // A shared URL loaded as a document is redirected here, before anything renders. The crawl
      // leaves these URLs to the server (`dynamic` in `vite.config.ts`): a file written for one was
      // the default variant's page served at the shared URL, which the client then moved to the
      // reader's variant after hydrating from the wrong location (React's error #418).
      GET: ({ request, params, next }) => {
        const href = pageHref(params._splat)
        if (findPage(href)) return next()
        const variant = variantFor(href, readerCombination())
        if (!variant) return next()
        const url = new URL(request.url)
        return new Response(null, {
          status: 302,
          headers: { location: `${variant.href}${url.search}` },
        })
      },
    },
  },
  loader: async ({ params }) => {
    const href = pageHref(params._splat)
    const meta = findPage(href)
    if (!meta) {
      // Followed in the app (a link's navigation); a document's request was redirected above.
      const variant = variantFor(href, readerCombination())
      if (variant) throw redirect({ href: variant.href, statusCode: 302 })
      throw notFound()
    }
    return { meta, document: await loadDocument(href) }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { meta } = loaderData
    // A variant's title and description name its framework, as a search for one would.
    const variant = meta.variant
    return {
      meta: [
        {
          title: variant
            ? `${meta.title} for ${variant.name} · kirana/ui`
            : `${meta.title} · kirana/ui`,
        },
        {
          name: "description",
          content: variant
            ? `${meta.description.replace(/\.$/, "")}, for ${variant.name}.`
            : meta.description,
        },
      ],
      links: [{ rel: "canonical", href: `${SITE}${meta.href}` }],
    }
  },
  component: Page,
})

function Page() {
  const { meta, document } = Route.useLoaderData()
  const { previous, next } = neighbours(meta.href)
  // Arriving on a variant is choosing it: the rest of the site follows.
  const variant = meta.variant?.id
  useEffect(() => {
    if (variant) chooseCombination(variant)
    else rememberCombination()
  }, [variant])

  return (
    <DocsPage
      meta={meta}
      headings={pageHeadings(document)}
      previous={previous}
      next={next}
    >
      <Markdown components={markdownComponents}>{document}</Markdown>
    </DocsPage>
  )
}
