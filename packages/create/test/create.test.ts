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

const versions = { kirana: "0.4.1", vitePlus: "1.5.0" }

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
    // 15 templates: 10 on Vite (3 monorepos; none takes 4 toolings, turbo 3, vite-plus 1), 5 not
    // (2 monorepos × 3 toolings); SvelteKit alone takes no Vite+ tooling (svelte-check).
    expect(all).toHaveLength(10 * (4 + 3 + 1) - 1 + 5 * (3 + 3))
    expect(parseSkeletonId("sveltekit--none--vite-plus")).toBeUndefined()
    expect(parseSkeletonId("sveltekit--vite-plus--vite-plus")).toBeDefined()
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
      "typecheck",
      "lint",
      "format",
      "format:check",
    ])
    expect(manifest.dependencies["@kirana-style/core"]).toBe("0.4.1")
    expect(manifest.devDependencies["kirana-style"]).toBe("0.4.1")
    expect(manifest.devDependencies["@kirana-style/registry"]).toBe("0.4.1")
    expect(manifest.devDependencies["@kirana-style/eslint-plugin"]).toBe(
      "0.4.1"
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

  it("puts the app in a workspace's apps/web, the components in packages/ui", () => {
    const turbo = composeProject(
      { template: "tanstack-start", monorepo: "turbo", tooling: "biome" },
      versions
    )
    expect(turbo.has("turbo.json")).toBe(true)
    expect(turbo.has("pnpm-workspace.yaml")).toBe(true)
    const root = JSON.parse(turbo.get("package.json")!)
    expect(root.scripts).toMatchObject({
      build: "turbo build",
      typecheck: "turbo typecheck",
      lint: "biome lint .",
    })
    // `init --template` fills the package manager and goes on in the app.
    expect(root.packageManager).toBe("{packageManager}")
    expect(root["kirana-template"]).toEqual({ project: "apps/web" })
    expect(root.devDependencies["@kirana-style/biome-plugin"]).toBe("0.4.1")
    // The tooling at the root, over every package; the app keeps dev, build and its type check.
    expect(turbo.has("biome.json")).toBe(true)
    expect(turbo.has("apps/web/biome.json")).toBe(false)
    const app = JSON.parse(turbo.get("apps/web/package.json")!)
    expect(app.name).toBe("web")
    expect(app.scripts.typecheck).toBe("tsc --noEmit")
    expect(app.scripts.lint).toBeUndefined()
    const ui = JSON.parse(turbo.get("packages/ui/package.json")!)
    expect(ui.name).toBe("@workspace/ui")
    expect(ui.scripts.typecheck).toBe("tsc --noEmit")
    expect(ui.dependencies.react).toBeDefined()
    expect(
      JSON.parse(turbo.get("packages/ui/tsconfig.json")!).compilerOptions.paths
    ).toEqual({ "@workspace/ui/*": ["./src/*"] })
    const vitePlus = composeProject(
      { template: "vite-svelte", monorepo: "vite-plus", tooling: "vite-plus" },
      versions
    )
    expect(vitePlus.get("vite.config.ts")).toContain("kirana/diagnostics")
    // The app's config holds the plugins, with Vite's defineConfig; the root's the checks.
    expect(vitePlus.get("apps/web/vite.config.ts")).not.toContain(
      "kirana/diagnostics"
    )
    expect(vitePlus.get("apps/web/vite.config.ts")).toContain('from "vite"')
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
  it("writes the one step for each runner", () => {
    const design = { ...DEFAULT_DESIGN_SYSTEM, base: "aria" } as const
    const alone = projectSteps(
      resolveChoices({ base: "aria", tooling: "oxlint", pointer: true }),
      design
    )
    const npm = commandLines(alone, "npm")
    expect(npm).toHaveLength(1)
    expect(npm[0]).toMatch(
      /^npx @kirana-style\/registry init --template @kirana\/vite-react--none--oxlint my-app --framework react --base aria --preset \S+ --pointer --registry @kirana=https:\/\/\S+\/r\/\{name\}\.json$/
    )
    expect(npm[0]).not.toContain("--workspace")
    // A workspace: `init` goes on in the app and installs into the package.
    const workspace = projectSteps(
      resolveChoices({ monorepo: "vite-plus" }),
      DEFAULT_DESIGN_SYSTEM
    )
    const vp = commandLines(workspace, "vp")
    expect(vp).toHaveLength(1)
    expect(vp[0]).toMatch(
      /^vpx @kirana-style\/registry init --template @kirana\/vite-react--vite-plus--vite-plus my-app /
    )
    expect(vp[0]).toContain(" --workspace packages/ui ")
    expect(commandLines(workspace, "pnpm")[0]).toMatch(/^pnpm dlx /)
    expect(commandLines(workspace, "bun")[0]).toMatch(/^bunx /)
    expect(commandLines(workspace, "yarn")[0]).toMatch(/^yarn dlx /)
  })

  it("offers every template of the catalog a skeleton", () => {
    for (const templates of Object.values(TEMPLATES))
      for (const template of templates)
        expect(
          everySkeleton().some((entry) => entry.template === template)
        ).toBe(true)
  })
})
