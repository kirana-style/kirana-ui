import { Link, useRouterState } from "@tanstack/react-router"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@workspace/registry/lib/sx"
import { useSavedCombination } from "@workspace/docs-ui/combination.ts"

import { PAGES } from "@/generated/content.gen"
import { variantOfPath } from "@/lib/variants"

/** Each component's variants by the URL they share: `/docs/components/button` → `vue/ark` → its page. */
const VARIANT_PAGES = new Map<string, Map<string, string>>()
for (const page of PAGES) {
  const variant = page.variant
  if (!variant) continue
  const pages = VARIANT_PAGES.get(variant.of) ?? new Map<string, string>()
  pages.set(variant.id, page.href)
  if (variant.default) pages.set("default", page.href)
  VARIANT_PAGES.set(variant.of, pages)
}

/**
 * Where a link to a component's shared URL (the nav's, search's, the pager's, a page's own) leads:
 * the variant the reader is on (the page's, else the one they chose), or the component's default
 * where it has no page for that one.
 */
function useVariantHref(path: string): string {
  const pages = VARIANT_PAGES.get(path)
  const here = useRouterState({
    select: (state) => variantOfPath(state.location.pathname),
  })
  const saved = useSavedCombination()
  if (!pages) return path
  const chosen = here ?? saved
  return (chosen && pages.get(chosen)) ?? pages.get("default") ?? path
}

/**
 * A link to a documentation page. A link to a component's shared URL leads to the reader's
 * framework and base (`useVariantHref`).
 *
 * Every page is served by the `/docs/$` splat route, so a plain `to="/docs/x"`
 * does not typecheck. This turns an href from the generated manifest into the
 * splat the router expects, and spreads the compiled styles, because `Link` is
 * an installed component and never reads `sx`.
 */
export function DocsLink({
  href,
  sx,
  className,
  children,
  ...rest
}: {
  href: string
  sx?: Sx
  children?: React.ReactNode
} & Omit<React.ComponentProps<"a">, "href" | "sx" | "children">) {
  // `props()` takes class strings too, so a `className` handed down by a
  // component that renders this one (Button's `render`) is merged, not dropped.
  const styled = styleProps(sx, className)

  // The fragment is the router's `hash`, not part of the path: inside the splat
  // it would be encoded (`editor%23hover`) and the page would not be found.
  const [shared = href, hash] = href.split("#", 2)
  const path = useVariantHref(shared)
  // A file the Worker serves (`/llms.txt`, a page's `.md`, `/r/<item>.json`) is not a route.
  if (path.startsWith("/") && /\.\w+$/.test(path)) {
    return (
      <a {...rest} {...styled} href={href}>
        {children}
      </a>
    )
  }
  if (path.startsWith("/docs")) {
    const splat = path.slice("/docs".length).replace(/^\//, "")
    return (
      <Link
        {...rest}
        {...styled}
        to="/docs/$"
        params={{ _splat: splat }}
        hash={hash}
        activeOptions={{ exact: true }}
      >
        {children}
      </Link>
    )
  }
  if (path.startsWith("/")) {
    return (
      <Link
        {...rest}
        {...styled}
        to={path}
        hash={hash}
        activeOptions={{ exact: true }}
      >
        {children}
      </Link>
    )
  }
  return (
    <a {...rest} {...styled} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  )
}
