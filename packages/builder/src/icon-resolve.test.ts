import { describe, expect, it } from "vite-plus/test"

import type { Item } from "./items"
import { dependenciesOf, ownersOf, resolvedIcons } from "./registry"

const file = (installed: string, content: string) => ({
  source: installed,
  installed,
  content,
})
const NAMES =
  'lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine"'

/** What a file depends on, the placeholder's items installed beside it. */
function dependencies(built: ReturnType<typeof file>) {
  const owner = ownersOf([
    [
      { name: "icon-placeholder" } as Item,
      [
        file("lib/kirana/icons/IconPlaceholder.vue", ""),
        file("lib/kirana/icons/IconPlaceholder.svelte", ""),
        file("lib/kirana/icons/angular.ts", ""),
        file("ui/icon-placeholder.tsx", ""),
      ],
    ],
  ])
  return dependenciesOf([built], "x", owner, "@/registry", () => "1.0.0")
}

describe("An icon placeholder", () => {
  it("written with every library's name resolves at install, on every framework", () => {
    for (const built of [
      file(
        "components/a.vue",
        `<script setup lang="ts">\nimport IconPlaceholder from "@/registry/lib/kirana/icons/IconPlaceholder.vue"\n</script>\n\n<template>\n  <IconPlaceholder ${NAMES} />\n</template>\n`
      ),
      file(
        "components/a.svelte",
        `<script lang="ts">\n  import IconPlaceholder from "@/registry/lib/kirana/icons/IconPlaceholder.svelte"\n</script>\n\n<IconPlaceholder ${NAMES} />\n`
      ),
      file(
        "components/a.tsx",
        `import { IconPlaceholder } from "@/registry/ui/icon-placeholder"\n\nexport const A = () => <IconPlaceholder ${NAMES} />\n`
      ),
      file(
        "components/a.ts",
        `import { Component } from "@angular/core"\nimport { IconPlaceholder } from "@/registry/lib/kirana/icons/angular"\n\n@Component({\n  selector: "a",\n  imports: [IconPlaceholder],\n  template: \`<svg iconPlaceholder ${NAMES}></svg>\`,\n})\nexport class A {}\n`
      ),
    ]) {
      expect(resolvedIcons(built).problems).toEqual([])
      const found = dependencies(built)
      expect(found.registryDependencies).toEqual([])
      expect(found.problems).toEqual([])
    }
  })

  it("named at run time is a problem, and keeps the dependency", () => {
    for (const built of [
      file(
        "components/a.vue",
        `<script setup lang="ts">\nimport IconPlaceholder from "@/registry/lib/kirana/icons/IconPlaceholder.vue"\nconst Icon = () => h(IconPlaceholder, { lucide: "SearchIcon" })\n</script>\n`
      ),
      file(
        "components/a.svelte",
        `<script lang="ts">\n  import IconPlaceholder from "@/registry/lib/kirana/icons/IconPlaceholder.svelte"\n  let { icon } = $props()\n</script>\n\n<IconPlaceholder {...icon} />\n`
      ),
      file(
        "components/a.ts",
        `import { IconPlaceholder } from "@/registry/lib/kirana/icons/angular"\nconst t = \`<svg iconPlaceholder [lucide]="icon.lucide"></svg>\`\n`
      ),
    ]) {
      const found = dependencies(built)
      expect(found.problems.length).toBeGreaterThan(0)
      expect(found.registryDependencies).toEqual(["icon-placeholder"])
    }
  })

  it("drawn by the run-time base class still needs the placeholder's item", () => {
    const found = dependencies(
      file(
        "ui/spinner.ts",
        `import { IconDrawing } from "@/registry/lib/kirana/icons/angular"\nexport class Spinner extends IconDrawing {}\n`
      )
    )
    expect(found.registryDependencies).toEqual(["icon-placeholder"])
    expect(found.problems).toEqual([])
  })
})
