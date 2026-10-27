import { Link, createFileRoute } from "@tanstack/react-router"

import { Customizer } from "@/components/customizer"
import { PageHeader } from "@/components/page-header"
import { Showcase } from "@/components/showcase"
import { SiteHeader } from "@/components/site-header"
import registryCss from "@/styles/registry.css?url"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

/**
 * The home page: what the registry is and the two ways in, the docs and `/create`, as shadcn/ui's
 * home has them. The demo is the maintainer's check, served at `/demo` and linked from nowhere.
 */
export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "stylesheet", href: registryCss }] }),
  component: Home,
})

function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          heading="shadcn/ui's components, styled with Kirana"
          description="Every component, block and style of shadcn/ui, rebuilt on Kirana's compiled styles for React, Vue and more. Choose a design and install it into your own project."
          actions={
            <>
              <Button render={<Link to="/docs" />} nativeButton={false}>
                Get Started
              </Button>
              <Button
                variant="outline"
                render={<Link to="/create" />}
                nativeButton={false}
              >
                New Project
              </Button>
            </>
          }
        />
        <Showcase />
      </main>
      <Customizer />
    </>
  )
}
