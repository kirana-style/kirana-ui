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
 * it restores them.
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
      if (!children.has(child)) child.remove()
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
    // In a section that is closing: inert at once, while its height still animates (Firefox on
    // CI paints it slowly), so the trigger has a box but nothing can press it.
    !element.closest("[inert]") &&
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
    // The bounds are generous: they catch a trigger that never becomes pressable, not a slow
    // engine. CI's Firefox, with four Vue bases in one worker, took 2.3s to move the pointer.
    await page.getByTestId(`trigger-${index}`).click({ timeout: 10000 })
    await settle()
    check(label)
    await userEvent.keyboard("{Escape}")
    // The pointer off to a corner of the page, so a popup that opens on hover (a hover card)
    // closes too, and until nothing is open outside the item: an open popup would cover the next
    // trigger.
    // Forced: an open drawer's overlay may cover the corner, and the pointer only needs to move.
    await page.getByTestId(away()).hover({ force: true, timeout: 10000 })
    // And focus off the trigger: a popup that opens on focus after a delay (a hover card) would
    // otherwise open once Escape and the wait below are past, and cover the next trigger for
    // good. Seen in WebKit under load, on Reka UI's hover card.
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur()
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
 * Resolves once the page's stylesheets have stopped changing for `quiet` ms (at most `limit` ms):
 * in development Kirana's stylesheet grows in place as each module compiles, and a change restyles
 * the page, which ends a chart's entrance at once (LF-005). A mount waits for it, once its item's
 * modules have been imported, so a first run, which compiles everything, behaves as a later one.
 */
export function stylesSettled(quiet = 300, limit = 5000) {
  return new Promise((resolve) => {
    let timer
    const done = () => {
      observer.disconnect()
      clearTimeout(timer)
      clearTimeout(cap)
      resolve(undefined)
    }
    const observer = new MutationObserver((records) => {
      if (!records.some((record) => isStyle(record.target))) return
      clearTimeout(timer)
      timer = setTimeout(done, quiet)
    })
    const isStyle = (node) =>
      node.nodeName === "STYLE" ||
      node.nodeName === "LINK" ||
      node.parentNode?.nodeName === "STYLE"
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    })
    timer = setTimeout(done, quiet)
    const cap = setTimeout(done, limit)
  })
}

/** Two animation frames: what a press or a mount needs to show its result. */
export function frames() {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  )
}
