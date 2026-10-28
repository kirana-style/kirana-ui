import { useEffect } from "react"
import { createFileRoute, notFound, redirect } from "@tanstack/react-router"
import { Markdown } from "@tanstack/markdown/react"

import { chooseCombination } from "@workspace/docs-ui/combination.ts"
import { DocsPage } from "@workspace/docs-ui/docs-page.tsx"

import { markdownComponents } from "@/components/markdown"
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
 * framework and base (`lib/variants.ts`); the URL its variants share answers with a permanent
 * redirect to the default one, as shadcn/ui's `/docs/components/<name>` does to its Base UI page.
 */
export const Route = createFileRoute("/docs/$")({
  loader: async ({ params }) => {
    const href = pageHref(params._splat)
    const meta = findPage(href)
    if (!meta) {
      const variant = defaultVariant(href)
      if (variant) throw redirect({ href: variant.href, statusCode: 301 })
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
  }, [variant])

  return (
    <DocsPage meta={meta} previous={previous} next={next}>
      <Markdown components={markdownComponents}>{document}</Markdown>
    </DocsPage>
  )
}
