import { createFileRoute } from "@tanstack/react-router"

import { SecondaryCta } from "@/components/cta"
import { REPOSITORY } from "@/components/header/nav"
import { Card, CardGrid } from "@/components/page/cards"
import { Accent, Page, PageHero, PageSection } from "@/components/page/page"
import registryCss from "@/styles/registry.css?url"

/** Each project kirana/ui builds on, with its licence, as each package declares it. */
const BUILDS_ON = [
  {
    name: "shadcn/ui",
    href: "https://ui.shadcn.com",
    license: "MIT",
    what: "The components, blocks, charts and styles it ports",
  },
  {
    name: "Kirana",
    href: "https://kirana.style",
    license: "MIT",
    what: "The compiler, and the installer, kirana-style ui",
  },
  {
    name: "Base UI",
    href: "https://base-ui.com",
    license: "MIT",
    what: "The React components' behaviour",
  },
  {
    name: "React Aria",
    href: "https://react-spectrum.adobe.com/react-aria/",
    license: "Apache-2.0",
    what: "The other React base",
  },
  {
    name: "Ark UI",
    href: "https://ark-ui.com",
    license: "MIT",
    what: "The Vue components' behaviour",
  },
  {
    name: "TanStack Charts",
    href: "https://tanstack.com/charts",
    license: "MIT",
    what: "The charts",
  },
  {
    name: "d3-shape",
    href: "https://d3js.org/d3-shape",
    license: "BSD-3-Clause",
    what: "The charts' curves",
  },
  {
    name: "Hugeicons",
    href: "https://hugeicons.com",
    license: "MIT",
    what: "The free icons",
  },
  {
    name: "Inter, Geist, EB Garamond, Crimson Pro",
    license: "OFL-1.1",
    what: "The site's fonts",
  },
] as const

/** `/license`, as the Kirana site's: kirana/ui's licence, and what it builds on. */
export const Route = createFileRoute("/license")({
  head: () => ({
    meta: [
      { title: "License · kirana/ui" },
      {
        name: "description",
        content:
          "kirana/ui is MIT licensed, and so is most of what it builds on.",
      },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: License,
})

function License() {
  return (
    <Page>
      <PageHero
        scene="old-hall"
        label="License"
        title={
          <>
            MIT, <Accent>and what it builds on.</Accent>
          </>
        }
        lede="kirana/ui is released under the MIT License, copyright the Kirana authors. The components you install are files in your project, yours to change."
        actions={
          <SecondaryCta
            render={
              <a
                href={`${REPOSITORY}/blob/main/LICENSE`}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            Read the licence
          </SecondaryCta>
        }
      />
      <PageSection
        number="01"
        label="What it builds on"
        title="Every project in it, and its licence"
        lede="Each licence as the project's own package declares it."
      >
        <CardGrid>
          {BUILDS_ON.map((project) => (
            <Card
              key={project.name}
              title={project.name}
              meta={project.license}
              href={"href" in project ? project.href : undefined}
            >
              {project.what}
            </Card>
          ))}
        </CardGrid>
      </PageSection>
      <PageSection
        number="02"
        label="The pictures"
        title="The landscapes and the mark"
        lede="shadcn/ui is copyright shadcn, under the MIT License. The landscapes and the petal K in the site's header, pages and footer come from Kirana's repository, MIT licensed by the Kirana authors."
      />
    </Page>
  )
}
