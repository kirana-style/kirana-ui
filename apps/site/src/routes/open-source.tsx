import { createFileRoute } from "@tanstack/react-router"
import {
  CheckmarkCircle02Icon,
  FavouriteIcon,
  GitBranchIcon,
  JusticeScale01Icon,
  PackageIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons"

import { Card, CardGrid } from "@/components/page/cards"
import { Accent, Page, PageHero, PageSection } from "@/components/page/page"
import registryCss from "@/styles/registry.css?url"

/** `/open-source`, as the Kirana site's: why kirana/ui is free, and how to take part. */
export const Route = createFileRoute("/open-source")({
  head: () => ({
    meta: [
      { title: "Open source · kirana/ui" },
      {
        name: "description",
        content:
          "Why kirana/ui is MIT licensed, what it owes shadcn/ui, and how to take part.",
      },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: OpenSource,
})

function OpenSource() {
  return (
    <Page scene="old-hall">
      <PageHero
        label="Open source"
        title={
          <>
            Built in the open, <Accent>kept free.</Accent>
          </>
        }
        lede="kirana/ui is MIT licensed and built in public, part of Kirana. Every component you install is a file in your project, yours to change."
      />
      <PageSection number="01" label="Principles" title="Four principles">
        <CardGrid cols={4}>
          <Card icon={JusticeScale01Icon} title="The code stays free">
            Everything in the repository is MIT licensed, and the components you
            install carry no other terms.
          </Card>
          <Card icon={PackageIcon} title="Yours once installed">
            Installing copies the source into your project, as shadcn/ui does.
            Nothing at runtime ties you to the registry.
          </Card>
          <Card icon={SourceCodeIcon} title="Upstream, credited">
            Every component is ported from shadcn/ui, MIT licensed, and the
            registry records the commit each one was ported from.
          </Card>
          <Card icon={CheckmarkCircle02Icon} title="Checked in the open">
            Every pull request runs the public checks, and each page is compared
            with shadcn/ui&apos;s own site, property by property.
          </Card>
        </CardGrid>
      </PageSection>
      <PageSection number="02" label="Taking part" title="Taking part">
        <CardGrid>
          <Card
            icon={GitBranchIcon}
            title="Contribute"
            href="/docs/project/contributing"
          >
            Report a bug, port a component or a block, fix a page.
          </Card>
          <Card icon={FavouriteIcon} title="Sponsor" href="/sponsor">
            Support Kirana, and kirana/ui with it.
          </Card>
          <Card icon={JusticeScale01Icon} title="The licence" href="/license">
            MIT, and what kirana/ui builds on.
          </Card>
        </CardGrid>
      </PageSection>
    </Page>
  )
}
