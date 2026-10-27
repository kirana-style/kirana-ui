import { createFileRoute } from "@tanstack/react-router"

import { CreatePage } from "@/components/create-page"
import { SiteHeader } from "@/components/site-header"
import registryCss from "@/styles/registry.css?url"

/** `/create`: the full editor of the site's design, and the project it starts. */
export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [{ title: "Create · kirana/ui" }],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: Create,
})

function Create() {
  return (
    <>
      <SiteHeader />
      <CreatePage />
    </>
  )
}
