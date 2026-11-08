import { describe, expect, it } from "vite-plus/test"

import { DEFAULT_DESIGN_SYSTEM } from "@workspace/registry/core/config"

import { TEMPLATES } from "../src/catalog.ts"
import {
  DEFAULT_CHOICES,
  everySkeleton,
  isResolved,
  parseSkeletonId,
  resolveChoices,
  skeletonId,
} from "../src/choices.ts"
import { commandLines, projectSteps } from "../src/commands.ts"
import { composeProject } from "../src/compose.ts"
import { tar, untar } from "../src/tar.ts"

const versions = { kirana: "0.4.0", vitePlus: "1.5.0" }

describe("choices", () => {
  it("keeps the rules between them", () => {
    // A template follows its framework, the base too.
    expect(
      resolveChoices({ framework: "vue", template: "vite-react" })
    ).toMatchObject({ template: "vite-vue", base: "ark" })
    // Vite+'s monorepo is checked by Vite+ alone, and goes with Vite's build.
    expect(
      resolveChoices({ monorepo: "vite-plus", tooling: "biome" }).tooling
    ).toBe("vite-plus")
    expect(
      resolveChoices({ template: "next-turbopack", monorepo: "vite-plus" })
        .monorepo
    ).toBe("none")
    expect(
      resolveChoices({
        framework: "angular",
        template: "angular-cli",
        tooling: "vite-plus",
      }).tooling
    ).toBe("eslint")
    // Turborepo runs one of the other three.
    expect(
      resolveChoices({ monorepo: "turbo", tooling: "vite-plus" }).tooling
    ).toBe("eslint")
    expect(isResolved(DEFAULT_CHOICES)).toBe(true)
  })

  it("names every skeleton once, and reads the name back", () => {
    const all = everySkeleton()
    const ids = all.map(skeletonId)
    expect(new Set(ids).size).toBe(ids.length)
    // 9 templates: 7 on Vite (3 monorepos; none takes 4 toolings, turbo 3, vite-plus 1), 2 not (2 × 3).
    expect(all).toHaveLength(7 * (4 + 3 + 1) + 2 * (3 + 3))
    for (const skeleton of all) {
      const parsed = parseSkeletonId(skeletonId(skeleton))
      expect(parsed).toEqual(skeleton)
      expect(isResolved(resolveChoices(skeleton))).toBe(true)
    }
    expect(parseSkeletonId("vite-react--vite-plus--biome")).toBeUndefined()
    expect(parseSkeletonId("nope")).toBeUndefined()
  })
})

describe("compose", () => {
  it("writes an app with its scripts, aliases and Kirana's packages", () => {
    const files = composeProject(
      { template: "vite-react", monorepo: "none", tooling: "eslint" },
      versions
    )
    const manifest = JSON.parse(files.get("package.json")!)
    expect(Object.keys(manifest.scripts)).toEqual([
      "dev",
      "build",
      "preview",
      "lint",
      "format",
      "format:check",
      "typecheck",
    ])
    expect(manifest.dependencies["@kirana-style/core"]).toBe("0.4.0")
    expect(manifest.devDependencies["kirana-style"]).toBe("0.4.0")
    expect(manifest.devDependencies["@kirana-style/registry"]).toBe("0.4.0")
    expect(manifest.devDependencies["@kirana-style/eslint-plugin"]).toBe(
      "0.4.0"
    )
    expect(
      JSON.parse(files.get("tsconfig.json")!).compilerOptions.paths
    ).toEqual({
      "@/*": ["./src/*"],
    })
    expect(files.get("vite.config.ts")).toContain('from "vite"')
    expect(files.get("vite.config.ts")).toContain("tsconfigPaths: true")
    expect(files.get("eslint.config.js")).toContain(
      "kirana.configs.recommended"
    )
    expect(files.has(".prettierrc")).toBe(true)
    expect(files.has(".gitignore")).toBe(true)
  })

  it("gives each tooling its files and scripts", () => {
    const oxlint = composeProject(
      { template: "vite-vue", monorepo: "none", tooling: "oxlint" },
      versions
    )
    expect(JSON.parse(oxlint.get(".oxlintrc.json")!).jsPlugins[0].name).toBe(
      "kirana"
    )
    expect(JSON.parse(oxlint.get("package.json")!).scripts.typecheck).toBe(
      "vue-tsc --noEmit"
    )
    const biome = composeProject(
      { template: "angular-cli", monorepo: "none", tooling: "biome" },
      versions
    )
    expect(JSON.parse(biome.get("biome.json")!).plugins).toHaveLength(2)
    expect(biome.has("vite.config.ts")).toBe(false)
    const vitePlus = composeProject(
      { template: "vite-solid", monorepo: "none", tooling: "vite-plus" },
      versions
    )
    const manifest = JSON.parse(vitePlus.get("package.json")!)
    expect(manifest.scripts).toMatchObject({
      dev: "vp dev",
      build: "vp build",
      check: "vp check",
    })
    expect(manifest.devDependencies.vite).toBe(
      "npm:@voidzero-dev/vite-plus-core@1.5.0"
    )
    expect(vitePlus.get("vite.config.ts")).toContain('from "vite-plus"')
    expect(vitePlus.get("vite.config.ts")).toContain("kirana/diagnostics")
  })

  it("puts the app in a workspace's apps/web", () => {
    const turbo = composeProject(
      { template: "tanstack-start", monorepo: "turbo", tooling: "biome" },
      versions
    )
    expect(turbo.has("turbo.json")).toBe(true)
    expect(turbo.has("pnpm-workspace.yaml")).toBe(true)
    expect(JSON.parse(turbo.get("package.json")!).scripts.build).toBe(
      "turbo build"
    )
    expect(JSON.parse(turbo.get("apps/web/package.json")!).name).toBe("web")
    expect(turbo.has("apps/web/biome.json")).toBe(true)
    const vitePlus = composeProject(
      { template: "vite-svelte", monorepo: "vite-plus", tooling: "vite-plus" },
      versions
    )
    expect(vitePlus.get("vite.config.ts")).toContain("kirana/diagnostics")
    // The app's config holds the plugins; the root's the checks.
    expect(vitePlus.get("apps/web/vite.config.ts")).not.toContain(
      "kirana/diagnostics"
    )
    expect(vitePlus.get("apps/web/vite.config.ts")).toContain(
      'from "vite-plus"'
    )
    expect(JSON.parse(vitePlus.get("package.json")!).scripts.check).toBe(
      "vp check"
    )
  })

  it("composes every skeleton deterministically", () => {
    for (const skeleton of everySkeleton()) {
      const once = composeProject(skeleton, versions)
      const twice = composeProject(skeleton, versions)
      expect([...once]).toEqual([...twice])
      expect(once.has("package.json")).toBe(true)
    }
  })
})

describe("tar", () => {
  it("round-trips the files under one folder", () => {
    const files = new Map([
      ["package.json", "{}\n"],
      ["src/deep/".padEnd(120, "x") + "/file.ts", "export {}\n"],
    ])
    const archive = tar(files, "skeleton")
    expect(archive.length % 512).toBe(0)
    const back = untar(archive)
    expect([...back.keys()].sort()).toEqual(
      [...files.keys()].map((name) => `skeleton/${name}`).sort()
    )
    expect(back.get("skeleton/package.json")).toBe("{}\n")
  })
})

describe("commands", () => {
  it("writes the steps for each runner", () => {
    const design = { ...DEFAULT_DESIGN_SYSTEM, base: "aria" } as const
    const alone = projectSteps(
      resolveChoices({ base: "aria", tooling: "oxlint", pointer: true }),
      design,
      "npm"
    )
    const npm = commandLines(alone, "npm")
    expect(npm).toHaveLength(2)
    expect(npm[0]).toMatch(
      /^npx giget@[\d.]+ https:\/\/.*\/templates\/vite-react--none--oxlint\.tgz my-app$/
    )
    expect(npm[1]).toContain(
      "cd my-app && npm install && npx kirana-style ui init --framework react --base aria --preset "
    )
    expect(npm[1]).toContain(" --pointer --registry @kirana=")
    const workspace = projectSteps(
      resolveChoices({ monorepo: "vite-plus" }),
      DEFAULT_DESIGN_SYSTEM,
      "vp"
    )
    const vp = commandLines(workspace, "vp")
    expect(vp[0]).toMatch(/^vpx giget@/)
    expect(vp[1]).toBe("cd my-app && vp install")
    expect(vp[2]).toMatch(/^cd apps\/web && vpx kirana-style ui init /)
    expect(commandLines(workspace, "pnpm")[1]).toBe("cd my-app && pnpm install")
    // A Turborepo's skeleton is the runner's: it names the package manager turbo runs with.
    const turbo = resolveChoices({ monorepo: "turbo" })
    expect(
      commandLines(projectSteps(turbo, design, "pnpm"), "pnpm")[0]
    ).toContain("vite-react--turbo--eslint.pnpm.tgz")
    expect(commandLines(projectSteps(turbo, design, "vp"), "vp")[0]).toContain(
      "vite-react--turbo--eslint.bun.tgz"
    )
    expect(
      JSON.parse(
        composeProject(turbo, versions, { packageManager: "pnpm" }).get(
          "package.json"
        )!
      ).packageManager
    ).toMatch(/^pnpm@/)
  })

  it("offers every template of the catalog a skeleton", () => {
    for (const templates of Object.values(TEMPLATES))
      for (const template of templates)
        expect(
          everySkeleton().some((entry) => entry.template === template)
        ).toBe(true)
  })
})
