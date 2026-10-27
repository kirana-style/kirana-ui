import { createFileRoute } from "@tanstack/react-router"

import { Customizer } from "@/components/customizer"
import { Hero } from "@/components/home/hero"
import { SiteFooter } from "@/components/site-footer"
import { Showcase } from "@/components/showcase"
import { SiteHeader } from "@/components/site-header"
import registryCss from "@/styles/registry.css?url"

/**
 * The home page: the hero as the Kirana site's (the claim, Create and Get started, the scene with
 * what kirana/ui is made of), the showcase of cards in the reader's design, and the footer. The demo is the maintainer's check, served at `/demo` and linked from nowhere.
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
        <Hero />
        <Showcase />
      </main>
      <SiteFooter />
      <Customizer />
    </>
  )
}
