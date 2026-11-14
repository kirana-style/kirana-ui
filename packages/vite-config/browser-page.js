/**
 * The browser tests' page-side helpers, shared by every preview app's tests: what went wrong while
 * an item was on the page, and pressing every trigger it has. Runs in the browser.
 */

/**
 * Collects, until `stop()`, every error the page raises (a thrown render or effect, a rejected
 * promise) and every form submission: no trigger may submit the form it sits in (a `<button>`
 * defaults to `type="submit"`), and an example's own form never submits in a test. `stop()` also
 * puts the page back as it found it: what an item wrote on `<html>` and `<body>` (a direction, a
 * scroll lock) and what it left in `<body>` (a portal) would lay out the next test's item otherwise.
 */
export function watchPage() {
  const restore = snapshot()
  const errors = []
  const onError = (event) => {
    // The browser deferring a resize notice to the next frame, which Firefox reports as an error
    // event: not the page failing.
    if (/ResizeObserver loop/.test(event.message)) return
    errors.push(String(event.error ?? event.message))
  }
  const onRejection = (event) => errors.push(String(event.reason))
  const onSubmit = (event) => {
    event.preventDefault()
    errors.push(`a form was submitted by ${describe(event.submitter)}`)
  }
  window.addEventListener("error", onError)
  window.addEventListener("unhandledrejection", onRejection)
  document.addEventListener("submit", onSubmit, true)
  return {
    errors,
    stop() {
      window.removeEventListener("error", onError)
      window.removeEventListener("unhandledrejection", onRejection)
      document.removeEventListener("submit", onSubmit, true)
      restore()
    },
  }
}

/**
 * The attributes of `<html>` and `<body>`, and the children of `<head>` and `<body>`, now; calling
 * it restores them. Kirana's live stylesheet stays (`refreshStyles`).
 */
function snapshot() {
  const elements = [document.documentElement, document.body]
  const attributes = elements.map((element) =>
    [...element.attributes].map((attribute) => [
      attribute.name,
      attribute.value,
    ])
  )
  const children = new Set([
    ...document.head.children,
    ...document.body.children,
  ])
  return () => {
    elements.forEach((element, index) => {
      for (const name of element.getAttributeNames())
        element.removeAttribute(name)
      for (const [name, value] of attributes[index])
        element.setAttribute(name, value)
    })
    for (const child of [
      ...document.head.children,
      ...document.body.children,
    ]) {
      if (!children.has(child) && !child.matches("style[data-kirana-live]"))
        child.remove()
    }
  }
}

/** An element as a failure names it: its slot and text. */
export function describe(element) {
  if (!element) return "(nothing)"
  const slot = element.getAttribute("data-slot")
  const text = (element.getAttribute("aria-label") ?? element.textContent ?? "")
    .trim()
    .slice(0, 40)
  return `<${element.localName}${slot ? ` data-slot="${slot}"` : ""}> "${text}"`
}

/**
 * The triggers a reader can press: popups (`aria-haspopup`), disclosures (`aria-expanded`) and
 * every part named a trigger; enabled, with a box, visible (a control revealed on hover, at opacity
 * 0 until then, is not pressed blind), and never a link, which would leave the page.
 */
export function triggers(container) {
  const found = container.querySelectorAll(
    '[aria-haspopup], [aria-expanded], [data-slot$="-trigger"]'
  )
  return [...new Set(found)].filter(pressable)
}

/** What `uncovered` answers for a trigger that can no longer be pressed. */
const HIDDEN = "hidden"

/** Whether a reader can press `element` now. */
function pressable(element) {
  const box = element.getBoundingClientRect()
  return (
    element.isConnected &&
    !element.closest("a[href]") &&
    !element.matches(":disabled, [aria-disabled='true'], [data-disabled]") &&
    box.width > 0 &&
    box.height > 0 &&
    element.checkVisibility({ opacityProperty: true, visibilityProperty: true })
  )
}

/**
 * Presses each of `container`'s triggers with a real click, lets the page settle, and closes
 * whatever opened with Escape; `check(label)` runs after each press. The trigger is marked with a
 * test id of its own, so the click lands on it and not on the first element sharing its
 * accessible name, which Vitest's own locator for an element would press.
 */
export async function pressTriggers(
  container,
  { page, userEvent, settle, check }
) {
  for (const [index, trigger] of triggers(container).entries()) {
    // An earlier press can have hidden it (a section collapsed): pressed only if it still can be.
    if (!pressable(trigger)) continue
    const label = `pressing trigger ${index}, ${describe(trigger)}`
    trigger.dataset.testid = `trigger-${index}`
    const covered = await uncovered(trigger)
    // Hidden meanwhile: the section it sits in finished collapsing.
    if (covered === HIDDEN) continue
    if (covered) throw new Error(`${label} is covered: ${covered}`)
    await page.getByTestId(`trigger-${index}`).click({ timeout: 3000 })
    await settle()
    check(label)
    await userEvent.keyboard("{Escape}")
    // The pointer off to a corner of the page, so a popup that opens on hover (a hover card)
    // closes too, and until nothing is open outside the item: an open popup would cover the next
    // trigger.
    // Forced: an open drawer's overlay may cover the corner, and the pointer only needs to move.
    await page.getByTestId(away()).hover({ force: true, timeout: 2000 })
    await closed(container)
    await settle()
  }
}

/** A spot in the page's corner, over everything, for the pointer to rest on: its test id. */
function away() {
  if (!document.querySelector("[data-testid='pointer-away']")) {
    const spot = document.createElement("div")
    spot.dataset.testid = "pointer-away"
    spot.style.cssText =
      "position: fixed; right: 0; bottom: 0; width: 4px; height: 4px; z-index: 2147483647"
    document.body.append(spot)
  }
  return "pointer-away"
}

/**
 * Until `trigger` holds still (a section an earlier press opened can still be growing) and is what
 * a press at its centre reaches (a closing overlay can hold the page's pointer events for its
 * exit), scrolled into view; at most a second. What still covers it then, `HIDDEN` once it can no
 * longer be pressed, or nothing.
 */
async function uncovered(trigger) {
  let hit
  let last = ""
  for (let tries = 0; tries < 20; tries++) {
    trigger.scrollIntoView({ block: "center", inline: "center" })
    await frames()
    if (!pressable(trigger)) return HIDDEN
    const box = trigger.getBoundingClientRect()
    const where = `${box.x},${box.y},${box.width},${box.height}`
    const still = where === last
    last = where
    hit = document.elementFromPoint(
      box.x + box.width / 2,
      box.y + box.height / 2
    )
    if (still && (!hit || trigger.contains(hit))) return undefined
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  if (!hit || trigger.contains(hit)) return undefined
  const locked = [document.documentElement, document.body]
    .map(
      (element) =>
        `${element.localName} pointer-events: ${getComputedStyle(element).pointerEvents}`
    )
    .join(", ")
  const at = (element) => {
    const box = element.getBoundingClientRect()
    return `${Math.round(box.x)},${Math.round(box.y)} ${Math.round(box.width)}x${Math.round(box.height)}`
  }
  return `${describe(hit)} at ${at(hit)} is on top of it at ${at(trigger)}, scrolled ${Math.round(scrollX)},${Math.round(scrollY)} (${locked}; its own pointer-events: ${getComputedStyle(trigger).pointerEvents})`
}

/** Until no popup is open outside `container` (at most a second). */
async function closed(container) {
  const open = () =>
    [...document.querySelectorAll("[data-open], [data-state='open']")].some(
      (element) => !container.contains(element)
    )
  for (let tries = 0; tries < 20 && open(); tries++) {
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
}

/**
 * Puts Kirana's stylesheet on the page as it stands now. In development the plugin fills
 * `@kirana-style/core/stylesheet.css` with every module compiled so far and sends the page its
 * updates, which do not reach Vitest's test frame: the page keeps the stylesheet the setup loaded,
 * before any item compiled, and every item draws unstyled (KF-124). So each mount fetches it again,
 * once its item's modules have compiled; `url` is the app's `stylesheet.css?url` import.
 */
let refreshes = 0

export async function refreshStyles(url) {
  // A query of its own each time: Vite strips `t` and serves the stylesheet it cached, which the
  // plugin replaces only once its updates go out, 50 ms after the last transform.
  const query = `direct&kirana-test=${++refreshes}`
  const response = await fetch(`${url}${url.includes("?") ? "&" : "?"}${query}`)
  let style = document.querySelector("style[data-kirana-live]")
  if (!style) {
    style = document.createElement("style")
    style.dataset.kiranaLive = ""
    document.head.append(style)
  }
  // Only when it changed: a new stylesheet restyles the page, and a chart's entrance ends at a
  // repaint (LF-005).
  const text = await response.text()
  if (style.textContent !== text) style.textContent = text
}

/** Two animation frames: what a press or a mount needs to show its result. */
export function frames() {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  )
}
