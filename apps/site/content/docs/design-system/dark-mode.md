---
title: Dark mode
description: Every colour is a light-dark() pair, so dark mode is the colour scheme on html. Add a light, dark and system switch to your project, remember it, and paint it from the first frame.
section: design
order: 7
keywords:
  [
    dark mode,
    light mode,
    color-scheme,
    light-dark,
    theme toggle,
    mode switch,
    data-mode,
    cookie,
    flash,
    server rendering,
  ]
---

# Dark mode

Every colour token is a `light-dark()` pair: the light value and the dark one in a single
declaration. There is no `dark:` variant and no second set of variables. What chooses between the
two halves is the colour scheme of `<html>`.

This page starts from a project made with `kirana-style ui init` and ends with a switch offering
Light, Dark and System, built from the registry's own components, that remembers the reader's
choice and paints it from the first frame, on a static page and on a server.

## What `init` already gives you

The command below makes a Vite and React project with the design system installed, and this page
builds on it. The script, the cookie and the server's part are the same on any framework; only
the switch is React's.

```sh
npx @kirana-style/registry init --template @kirana/vite-react--none--eslint my-app --framework react --base base --preset k0 --registry @kirana=https://ui.kirana-style.workers.dev/r/{name}.json
```

Two things in it make dark mode work already.

**The colours are pairs.** Each colour axis is a palette in `src/lib/kirana/`, and every value in
it is a `light-dark()` pair, one value when both modes agree:

```ts title="src/lib/kirana/base-color-palette.ts"
background: "light-dark(oklch(1 0 0), oklch(0.145 0 0))",
foreground: "light-dark(oklch(0.145 0 0), oklch(0.985 0 0))",
```

**`<html>` sets the scheme.** `src/lib/kirana/document.ts` holds what `<html>` takes, and `init`
applies it there (in `src/main.tsx` on Vite, as `<html sx={htmlStyles}>` in a framework that
renders the document):

```ts title="src/lib/kirana/document.ts"
const html = css({
  // The system's scheme unless the page chose one (`data-mode`, as the site's colour mode writes it).
  colorScheme: {
    base: "light dark",
    '[data-mode="light"]': "light",
    '[data-mode="dark"]': "dark",
  },
  backgroundColor: theme.background,
  color: theme.foreground,
  fontFamily: font.sans,
})
```

| `data-mode` on `<html>` | `color-scheme` | Each `light-dark()` pair shows |
| ----------------------- | -------------- | ------------------------------ |
| absent, or `system`     | `light dark`   | the operating system's half    |
| `light`                 | `light`        | the light half                 |
| `dark`                  | `dark`         | the dark half                  |

**You should see**, with `npm run dev`, a page in your operating system's mode. Switch the system
to dark and the page follows, with no JavaScript of yours.

## 1. Try a mode by hand

Open the browser's console on your page and run:

```js
document.documentElement.dataset.mode = "dark"
```

**You should see** the whole page turn dark at once: one attribute changes `color-scheme`, and
every pair in every component picks its dark half. `"light"` pins the light page, and removing the
attribute (`delete document.documentElement.dataset.mode`) gives the system's back. A switch only
has to write this attribute, and keep it.

## 2. Keep the mode in one place

The three modes, the cookie that keeps the choice, and the two things done with it: read it, and
save it.

```ts title="src/lib/theme.ts"
/** The three colour modes: `system` follows the operating system, `light` and `dark` pin it. */
export const MODES = ["system", "light", "dark"] as const

export type Mode = (typeof MODES)[number]

/** The cookie that keeps the reader's choice. A server can read it too. */
export const MODE_COOKIE = "theme"

/** A year: the choice outlives the session, and every choice renews it. */
const MAX_AGE = 60 * 60 * 24 * 365

export function isMode(value: unknown): value is Mode {
  return MODES.includes(value as Mode)
}

/** The mode saved in a `Cookie` header or in `document.cookie`, if it names one. */
export function readMode(cookies: string | null | undefined): Mode {
  const value = cookies
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${MODE_COOKIE}=`))
    ?.slice(MODE_COOKIE.length + 1)
  return isMode(value) ? value : "system"
}

/** Shows `mode` and keeps it for the next visit. */
export function saveMode(mode: Mode) {
  document.documentElement.dataset.mode = mode
  document.cookie = `${MODE_COOKIE}=${mode}; path=/; max-age=${MAX_AGE}; samesite=lax`
}
```

The choice is kept in a cookie rather than in `localStorage` because a cookie goes with every
request: a server can render the page in the reader's mode (step 6). On a site with no server
either works; a cookie keeps both open.

Nothing on the page changes yet.

## 3. Add the switch

The switch is the registry's Dropdown Menu, opened by an icon Button, with a radio group for the
three modes. Add both:

<!-- ::install exec="kirana-style ui add dropdown-menu button" -->

They arrive in `src/components/ui/`, with `@base-ui/react` and `lucide-react` installed for them.

```tsx title="src/components/mode-toggle.tsx"
import { useState } from "react"
import { css, props } from "@kirana-style/core"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { axes, DARK_SCHEME } from "@/lib/kirana/axes"
import { isMode, saveMode, type Mode } from "@/lib/theme"

const styles = {
  // The sun in the light scheme, the moon in the dark one: `display` is no colour, so it reads
  // the scheme through the mode's conditions instead of `light-dark()`.
  sun: css({
    display: {
      base: "block",
      [DARK_SCHEME]: { base: "none", [axes.mode.light]: "block" },
      [axes.mode.dark]: "none",
    },
  }),
  moon: css({
    display: {
      base: "none",
      [DARK_SCHEME]: { base: "block", [axes.mode.light]: "none" },
      [axes.mode.dark]: "block",
    },
  }),
}

export function ModeToggle({ defaultMode }: { defaultMode: Mode }) {
  const [mode, setMode] = useState(defaultMode)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Colour mode" />
        }
      >
        <SunIcon {...props(styles.sun)} />
        <MoonIcon {...props(styles.moon)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Colour mode</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={mode}
            onValueChange={(value) => {
              if (!isMode(value)) return
              setMode(value)
              saveMode(value)
            }}
          >
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

A few things to notice:

- **Which icon shows is not a colour**, so `light-dark()` cannot choose it. `axes.mode.light` and
  `axes.mode.dark` (in `src/lib/kirana/axes.ts`) are conditions on `<html>`'s `data-mode`, and
  `DARK_SCHEME` is `@media (prefers-color-scheme: dark)`. Written as above, the icon follows the
  system's scheme, and a chosen mode overrides it. Any value that is not a colour (an image per
  scheme, a shadow's strength) is written the same way.
- **The label is inside its group.** `DropdownMenuLabel` must sit in a `DropdownMenuGroup` or a
  `DropdownMenuRadioGroup`: alone, Base UI throws when the menu opens.
- **The lucide icons do not read `sx`**: a component from a package takes the styles through
  `props()`.

Put it on the page, starting from the saved mode:

```tsx title="src/App.tsx"
import { css } from "@kirana-style/core"

import { ModeToggle } from "@/components/mode-toggle"
import { readMode } from "@/lib/theme"

const styles = {
  header: css({
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  }),
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "80svh",
    textAlign: "center",
  }),
}

export function App() {
  return (
    <>
      <header sx={styles.header}>
        <ModeToggle defaultMode={readMode(document.cookie)} />
      </header>
      <main sx={styles.main}>
        <h1>Hello, Kirana.</h1>
      </main>
    </>
  )
}
```

**You should see** an outlined icon button at the top right: a sun in a light page, a moon in a
dark one. It opens a menu titled "Colour mode" with Light, Dark and System, the current one
ticked. Choosing Dark turns the page dark and swaps the sun for the moon.

## 4. Remember the choice

`saveMode` already writes the cookie with each choice, for a year, and `App` hands the switch
`readMode(document.cookie)`. Choose Dark and reload.

**You should see** Dark still ticked in the menu, but the page back in its system mode: the cookie
holds the choice, and nothing puts it on `<html>` when the page loads. Putting it there from your
app's script would come too late, after the browser has started to draw, and the page would show
its system mode for a moment first. The next step puts it there before the first paint.

## 5. Apply it before the first paint

A small script in `<head>` runs before the page is drawn. It puts the saved mode on `<html>`, and
tells the browser which scheme to paint with until your app's styles are on `<html>`:

```html title="index.html"
<meta name="color-scheme" content="light dark" />
<script>
  // Before the first paint: the saved mode on <html>, and the scheme the browser paints
  // with until the app's styles arrive. The cookie's name is MODE_COOKIE's.
  {
    const mode = document.cookie.match(/(?:^|; )theme=(light|dark|system)/)?.[1]
    if (mode) {
      document.documentElement.dataset.mode = mode
      if (mode !== "system")
        document.querySelector('meta[name="color-scheme"]').content = mode
    }
  }
</script>
```

On Vite, `<html>`'s classes (its `color-scheme` and its background) are written by `src/main.tsx`,
a module that runs after the page has been read. Until then the browser paints with the
`color-scheme` meta tag, so the script sets it too: a reader who chose dark gets a dark page from
the first frame, never a white one. Once the classes are on `<html>`, its own `color-scheme` wins
over the meta tag, so the switch does not need to change it.

The script is plain text in the page, not part of your bundle: keep the cookie's name in its
pattern the same as `MODE_COOKIE`. The braces keep `mode` out of the page's global names.

**You should see** no flash on reload, in any mode. To check, block your app's script in the
browser's developer tools (Network, block request URL): the page is still painted in the saved
mode.

## 6. Read it on a server

A framework that renders the page on a server can write `data-mode` into the HTML itself, from the
cookie on the request, so the page arrives in the reader's mode with no script at all. On
TanStack Start (`--template @kirana/tanstack-start--none--eslint`), add the same two components,
and copy `src/lib/theme.ts` and `src/components/mode-toggle.tsx` as they are above. Then read the
cookie on the server, and from `document.cookie` in the browser:

```ts title="src/lib/theme-mode.ts"
import { createIsomorphicFn } from "@tanstack/react-start"
import { getCookie } from "@tanstack/react-start/server"

import { isMode, MODE_COOKIE, readMode, type Mode } from "./theme"

/** The saved mode: from the request on the server, from `document.cookie` in the browser. */
export const getMode = createIsomorphicFn()
  .server((): Mode => {
    const value = getCookie(MODE_COOKIE)
    return isMode(value) ? value : "system"
  })
  .client((): Mode => readMode(document.cookie))
```

Read it before the document renders, in the root route's `beforeLoad`, and write it on `<html>`
beside the attributes `init` put there:

```tsx title="src/routes/__root.tsx"
import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import "@/components/ui/reset.css"
import { htmlStyles } from "@/lib/kirana/document"
import { getMode } from "@/lib/theme-mode"
import "@fontsource-variable/inter"

export const Route = createRootRoute({
  beforeLoad: () => ({ mode: getMode() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kirana on TanStack Start" },
    ],
    links: [{ rel: "stylesheet", href: kiranaCss }],
  }),
  shellComponent: RootDocument,
  component: Outlet,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { mode } = Route.useRouteContext()
  return (
    <html
      data-mode={mode}
      data-font-heading="inherit"
      data-chart-color="neutral"
      data-style="nova"
      data-base-color="neutral"
      data-theme="neutral"
      data-font="inter"
      data-radius="default"
      data-menu-accent="subtle"
      data-menu-color="default"
      sx={htmlStyles}
      lang="en"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

A route below the root reads the same context for the switch:

```tsx title="src/routes/index.tsx"
function Home() {
  const { mode } = Route.useRouteContext()
  return (
    <main sx={styles.main}>
      <ModeToggle defaultMode={mode} />
      {/* … */}
    </main>
  )
}
```

**You should see** the page's HTML, as the server sends it, carry `data-mode="dark"` after you
chose Dark (view the page's source, not the inspector). A request with no cookie, or a cookie
naming no mode, gets `data-mode="system"`.

The same holds on any server: read the `Cookie` header with `readMode(request.headers.get("cookie"))`
and write the result on `<html>`. A page that is prerendered at build time has no request to read:
give it the script of step 5, and render `<html>` with `suppressHydrationWarning` on React, since
the script changes `<html>` before React hydrates it.

## What can go wrong

| What you see                                                   | Why, and what to do                                                                                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| A colour of yours stays the same in both modes                 | It is a plain value. Write it as `light-dark(<light>, <dark>)`, or use a theme token, which already is one                                      |
| Something that is not a colour does not follow the mode        | `light-dark()` takes colours only. Write the value under `DARK_SCHEME`, `axes.mode.light` and `axes.mode.dark`, as the switch's icons are       |
| The page shows its system mode for a moment after a reload     | Nothing sets the mode before the first paint. Add the script of step 5 in `<head>`, before any stylesheet or script of the app, not as a module |
| The switch is ticked on System while the page is dark          | The switch started from its default, not from the cookie. Pass `readMode(document.cookie)` (or the server's mode) as `defaultMode`              |
| React warns that `<html>`'s attributes differ when it hydrates | A prerendered page was changed by the script before hydration. Render `<html>` with `suppressHydrationWarning`                                  |
| `Base UI: MenuGroupContext is missing` when the menu opens     | `DropdownMenuLabel` is outside a group. Wrap it in `DropdownMenuGroup`, as above                                                                |
| Another app on the same domain changes your mode               | Both use a cookie named `theme`. Give `MODE_COOKIE` a name of your own, and the script of step 5 the same one                                   |

## How this site does it

This site uses the same pieces, in `packages/shell` and `packages/docs-ui` of its repository:

| Piece                                   | What it does                                                                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| The `kirana-theme` cookie               | Keeps the choice for a year; read on the server in the root route's `beforeLoad`, and from `document.cookie` in the browser |
| `THEME_SCRIPT`                          | The script before the first paint: the mode from a preview frame's `?theme=` or from the cookie, written on `<html>`        |
| `ThemeProvider`                         | Holds the mode, writes the cookie, and tells the site's other open tabs over a `BroadcastChannel`, so they switch with it   |
| `data-mode` and `schemeMarker`          | On `<html>`: `data-mode` picks the scheme, and the marker is what the theme controls' icons read                            |
| `ThemeMenu`, `ThemeToggle`, the `D` key | A menu in the docs bar, a switch in the footer, and a key that steps System, Light, Dark                                    |

## Next

- [Colours and theming](/docs/design-system/theming): the base colour, the theme and the chart
  colours, every one a pair.
- [Dropdown Menu](/docs/components/dropdown-menu): the menu the switch is built from.
- [Right to left](/docs/design-system/rtl): the other attribute `<html>` carries for the page.
