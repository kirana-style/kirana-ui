import { createFileRoute } from "@tanstack/react-router"
import {
  FavouriteIcon,
  Invoice01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { SecondaryCta } from "@/components/cta"
import { Card, CardGrid } from "@/components/page/cards"
import { Accent, Page, PageHero, PageSection } from "@/components/page/page"
import registryCss from "@/styles/registry.css?url"

const KIRANA_SPONSORS = "https://kirana.style/sponsors"

/** `/sponsor`, as the Kirana site's: kirana/ui is part of Kirana, so its sponsors are Kirana's. */
export const Route = createFileRoute("/sponsor")({
  head: () => ({
    meta: [
      { title: "Sponsor · kirana/ui" },
      {
        name: "description",
        content:
          "kirana/ui is part of Kirana; sponsoring Kirana keeps both free and independent.",
      },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: Sponsor,
})

function Sponsor() {
  return (
    <Page scene="golden-fields">
      <PageHero
        label="Sponsor"
        title={
          <>
            Keep it <Accent>independent.</Accent>
          </>
        }
        lede="kirana/ui is part of Kirana, built by the same people. Sponsoring Kirana supports both: the compiler, its installer and this registry."
        actions={
          <SecondaryCta
            render={
              <a href={KIRANA_SPONSORS} target="_blank" rel="noreferrer" />
            }
          >
            Sponsor Kirana
          </SecondaryCta>
        }
      />
      <PageSection
        number="01"
        label="How"
        title="Monthly or once, as a person or a company"
        lede="Kirana takes support through GitHub Sponsors, Open Collective, Polar or an invoice. Its sponsor page has each channel and its terms."
      >
        <CardGrid>
          <Card icon={FavouriteIcon} title="As a person" href={KIRANA_SPONSORS}>
            Monthly or once, through the channel that suits you.
          </Card>
          <Card
            icon={UserGroupIcon}
            title="As a company"
            href={KIRANA_SPONSORS}
          >
            A tier, with the visibility it buys, never features.
          </Card>
          <Card icon={Invoice01Icon} title="By invoice" href={KIRANA_SPONSORS}>
            For a company that pays against an invoice.
          </Card>
        </CardGrid>
      </PageSection>
    </Page>
  )
}
