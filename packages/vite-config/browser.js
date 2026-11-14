/**
 * The browser tests' configuration, shared by the preview apps that have them (`test/*.test.*`):
 * Vitest in a real browser through Vite+'s Playwright provider, with the app's own plugins, so the
 * registry's components compile with Kirana as in the app. `vp run browser` runs them.
 *
 * The engines are `BROWSERS` (`chromium,firefox,webkit`, default `chromium`): CI runs each in a job
 * of its own. Chromium runs without the GPU: headless, it can stop drawing frames, and an animation
 * then never ends.
 */

/** The engines `BROWSERS` names. */
export function browsers() {
  return (process.env.BROWSERS ?? "chromium").split(",").filter(Boolean)
}

/**
 * The `test` block of a preview app's config. `playwright` is the app's own import of
 * `vite-plus/test/browser-playwright`, so the provider resolves from the app.
 */
export function browserTest(
  playwright,
  { name, include = ["test/**/*.test.{ts,tsx}"], setupFiles = [] }
) {
  return {
    name,
    include,
    setupFiles,
    // A page with forty triggers presses and waits on each: well past Vitest's 15 s.
    testTimeout: 60_000,
    // One page per file, and nothing left between tests: each test mounts and unmounts its own.
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      // A desktop page, as the preview pages are compared at; Vitest's own frame is a phone's.
      viewport: { width: 1280, height: 900 },
      provider: playwright(),
      instances: browsers().map((browser) =>
        browser === "chromium"
          ? {
              browser,
              provider: playwright({
                launchOptions: {
                  args: ["--disable-gpu", "--disable-software-rasterizer"],
                },
              }),
            }
          : { browser }
      ),
    },
  }
}

/**
 * What the browser tests' dependency scan starts from: every file a test may load. An item's
 * libraries are imported lazily, so a scan from the tests alone finds them late, re-bundles
 * mid-run, and the late copy reads another React (or Svelte) than the page's: every hook fails.
 * Only under Vitest: the app's dev server keeps scanning from its page.
 */
export function browserDeps(entries) {
  return process.env.VITEST ? { entries } : {}
}

/**
 * Under Vitest, `@/components/…` resolved to `stub`: the code block demos hold a project's code as
 * text, and the dependency scan reads its imports as if they were the demo's own. Nothing loads
 * them; the stub only answers the scan.
 */
export function browserAliases(stub) {
  return process.env.VITEST
    ? [{ find: /^@\/components\/.*$/, replacement: stub }]
    : []
}
