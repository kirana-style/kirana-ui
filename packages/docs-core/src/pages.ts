import type { MarkdownDocument } from "@tanstack/markdown"

import type { PageHeading, PageMeta } from "./types.ts"

/**
 * A page's table of contents: its document's second- and third-level headings. They travel with
 * the page's own document, not the manifest, which every page of the site loads.
 */
export function pageHeadings(document: MarkdownDocument): PageHeading[] {
  return (document.headings ?? [])
    .filter((heading) => heading.level >= 2 && heading.level <= 3)
    .map(({ id, text, level }) => ({ id, text, level }))
}

/**
 * Page lookup and lazy document loading, for an app that generated its content
 * with `generate()`.
 *
 * The app passes its own `import.meta.glob` of the generated page documents —
 * never eager, or every page of the site lands in the first chunk — and the
 * manifest's `PAGES`, which carries what the nav, search and pager need.
 */
export function createPages(options: {
  pages: readonly PageMeta[]
  /** `import.meta.glob("<generatedDir>/pages/**\/*.json")`, lazy. */
  documents: Record<string, () => Promise<{ default: MarkdownDocument }>>
  /** The glob's key prefix, e.g. `"../generated/pages/"`. */
  prefix: string
  /** The URL the docs live under. Default `/docs`. */
  basePath?: string
}) {
  const { pages, documents, prefix } = options
  const base = options.basePath ?? "/docs"
  const byHref = new Map(pages.map((page) => [page.href, page]))
  /** A variant source once, at the URL its variants share, as the nav lists it. */
  const reading = pages
    .filter((page) => !page.variant || page.variant.default)
    .map((page) => (page.variant ? { ...page, href: page.variant.of } : page))

  /** The file a page's document lives in, as the glob keys it. */
  const moduleKey = (href: string) => {
    const slug = href === base ? "index" : href.slice(base.length + 1)
    return `${prefix}${slug}.json`
  }

  return {
    findPage(href: string): PageMeta | undefined {
      return byHref.get(href)
    },

    /** The page a `<base>/$` splat resolves to, with trailing slashes ignored. */
    pageHref(splat: string | undefined): string {
      const path = (splat ?? "").replace(/^\/+|\/+$/g, "")
      return path ? `${base}/${path}` : base
    },

    async loadDocument(href: string): Promise<MarkdownDocument> {
      const load = documents[moduleKey(href)]
      if (!load) throw new Error(`no generated document for ${href}`)
      return (await load()).default
    },

    /**
     * The default variant of a source published per variant, by the URL they share: where that URL
     * leads.
     */
    defaultVariant(href: string): PageMeta | undefined {
      return pages.find(
        (page) => page.variant?.default && page.variant.of === href
      )
    },

    /**
     * The pages either side of this one, in reading order. A variant's neighbours are its source's,
     * at their shared URLs, which the app's link sends to the reader's variant.
     */
    neighbours(href: string): { previous?: PageMeta; next?: PageMeta } {
      const own = byHref.get(href)
      const at = own?.variant?.of ?? href
      const index = reading.findIndex((page) => page.href === at)
      if (index < 0) return {}
      return {
        ...(index > 0 ? { previous: reading[index - 1] } : {}),
        ...(index < reading.length - 1 ? { next: reading[index + 1] } : {}),
      }
    },
  }
}
