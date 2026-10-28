import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { SiteHeader } from "@/components/site-header"
import { TypesetPage } from "@/components/typeset/typeset-page"
import { readTypesetParams, typesetSearch } from "@/lib/typeset"
import type { TypesetParams } from "@/lib/typeset"
import registryCss from "@/styles/registry.css?url"

/** `/typeset`: the typeset builder, its choices in the URL's search. */
export const Route = createFileRoute("/typeset")({
  head: () => ({
    meta: [
      { title: "Typeset · kirana/ui" },
      {
        name: "description",
        content:
          "Typography for markdown you don't control: fonts and three rhythm values, previewed on real content, with the code.",
      },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  validateSearch: (search: Record<string, unknown>) =>
    typesetSearch(readTypesetParams(search)),
  component: Typeset,
})

function Typeset() {
  const params = readTypesetParams(Route.useSearch())
  const navigate = useNavigate()
  const onParams = (next: TypesetParams) =>
    void navigate({
      to: "/typeset",
      search: typesetSearch(next),
      replace: true,
    })
  return (
    <>
      <SiteHeader designer create />
      <TypesetPage params={params} onParams={onParams} />
    </>
  )
}
