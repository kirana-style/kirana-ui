import { createFileRoute } from "@tanstack/react-router"
import {
  CloudServerIcon,
  GitBranchIcon,
  PackageIcon,
} from "@hugeicons/core-free-icons"

import { SecondaryCta } from "@/components/cta"
import { Card, CardGrid } from "@/components/page/cards"
import { Accent, Page, PageHero, PageSection } from "@/components/page/page"
import registryCss from "@/styles/registry.css?url"

/** `/partners`, as the Kirana site's: the services kirana/ui is built and served on. */
export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners · kirana/ui" },
      {
        name: "description",
        content: "The services kirana/ui is built and served on.",
      },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: Partners,
})

function Partners() {
  return (
    <Page scene="old-hall">
      <PageHero
        label="Partners"
        title={
          <>
            The services it <Accent>runs on.</Accent>
          </>
        }
        lede="kirana/ui runs on the same services as Kirana. Kirana's partners, and how to become one, are on its own page."
        actions={
          <SecondaryCta
            render={
              <a
                href="https://kirana.style/partners"
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            Kirana&apos;s partners
          </SecondaryCta>
        }
      />
      <PageSection
        number="01"
        label="The services"
        title="Where it is built and served"
      >
        <CardGrid>
          <Card
            icon={CloudServerIcon}
            title="Cloudflare Workers"
            href="https://workers.cloudflare.com"
          >
            Serve the site and the registry: every page and every item&apos;s
            JSON is a static file.
          </Card>
          <Card
            icon={GitBranchIcon}
            title="GitHub"
            href="https://github.com/kirana-style/kirana-ui"
          >
            Holds the repository and runs its checks on every change.
          </Card>
          <Card
            icon={PackageIcon}
            title="npm"
            href="https://www.npmjs.com/org/kirana-style"
          >
            Publishes the Kirana packages a project installs.
          </Card>
        </CardGrid>
      </PageSection>
    </Page>
  )
}
