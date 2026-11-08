/**
 * How each package manager installs and runs a package, for the docs' install blocks: the page
 * draws them as tabs (`InstallTabs` in docs-ui) and the markdown twin writes them out
 * (`plainInstall`), from this one table.
 *
 * Three kinds of command:
 * - install: `packages` as dependencies, `dev` as dev dependencies;
 * - run: a package that is not installed, fetched for one command (`npx kirana-style@latest init`);
 * - exec: a package the project has installed (`pnpm exec kirana-style check`);
 * - create: a `create-<name>` package scaffolding a project (`pnpm create vite-plus …`), named
 *   without its prefix, the first word; npm takes the arguments after `--`;
 * - install: the project's packages, as its lockfile has them (`pnpm install`).
 *
 * `vp` is Vite+'s runner, which drives the project's own package manager (`vp install`, `vpx` for
 * a package to run); Deno takes npm packages as `npm:` specifiers, and runs one with every
 * permission (`-A`), as a command line that reads and writes the project needs.
 */
export const PACKAGE_MANAGERS = [
  "npm",
  "pnpm",
  "yarn",
  "bun",
  "vp",
  "deno",
] as const

export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

type Commands = {
  add: string
  dev: string
  install: string
  /** Prefixes the package and its arguments; `npm:` joins without a space. */
  run: string
  exec: string
  /** Prefixes the `create-` package's name; `{name}` where it goes when it is not last. */
  create: string
  /** Whether each package is written as an `npm:` specifier. */
  specifiers?: boolean
}

const COMMANDS: Record<PackageManager, Commands> = {
  npm: {
    add: "npm install",
    dev: "npm install -D",
    install: "npm install",
    run: "npx ",
    exec: "npx ",
    create: "npm create {name}@latest --",
  },
  pnpm: {
    add: "pnpm add",
    dev: "pnpm add -D",
    install: "pnpm install",
    run: "pnpm dlx ",
    exec: "pnpm exec ",
    create: "pnpm create {name}",
  },
  yarn: {
    add: "yarn add",
    dev: "yarn add -D",
    install: "yarn install",
    run: "yarn dlx ",
    exec: "yarn ",
    create: "yarn create {name}",
  },
  // `--bun` runs the command under Bun even when its file asks for Node.
  bun: {
    add: "bun add",
    dev: "bun add -d",
    install: "bun install",
    run: "bunx --bun ",
    exec: "bunx ",
    create: "bun create {name}",
  },
  vp: {
    add: "vp install",
    dev: "vp install -D",
    install: "vp install",
    run: "vpx ",
    exec: "vpx ",
    create: "vpx create-{name}",
  },
  deno: {
    add: "deno add",
    dev: "deno add -D",
    install: "deno install",
    run: "deno run -A npm:",
    exec: "deno run -A npm:",
    create: "deno run -A npm:create-{name}",
    specifiers: true,
  },
}

/** What an install block asks for; the attributes of `<!-- ::install … -->`. */
export type InstallRequest = {
  packages?: string
  dev?: string
  run?: string
  exec?: string
  create?: string
  install?: boolean
}

/** The lines a block shows for one package manager. */
export function installLines(
  manager: PackageManager,
  request: InstallRequest
): string[] {
  const commands = COMMANDS[manager]
  const names = (list: string) =>
    list
      .split(/\s+/)
      .filter(Boolean)
      .map((name) => (commands.specifiers ? `npm:${name}` : name))
      .join(" ")
  const [created = "", ...creation] = (request.create ?? "").split(/\s+/)
  return [
    request.install ? commands.install : "",
    request.create
      ? [commands.create.replace("{name}", created), ...creation].join(" ")
      : "",
    request.packages ? `${commands.add} ${names(request.packages)}` : "",
    request.dev ? `${commands.dev} ${names(request.dev)}` : "",
    request.run ? `${commands.run}${request.run}` : "",
    request.exec ? `${commands.exec}${request.exec}` : "",
  ].filter(Boolean)
}
