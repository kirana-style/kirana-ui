/**
 * The anatomy view (`?view=anatomy`): the live component, opened, with a named line to each of
 * its parts. Every part's element carries its name (`data-part`, written by the build from the
 * demo's own markup), so the picture is read from the component and cannot disagree with it. A
 * name and its part light each other when either is under the pointer.
 */
import "./anatomy.css"

const SVG = "http://www.w3.org/2000/svg"
const GAP = 26
const REACH = 30

/** How many parts deep an element holds others: none for a part with no part inside it. */
function levels(element: Element): number {
  let most = 0
  for (const inner of element.querySelectorAll("[data-part]")) {
    let depth = 0
    for (
      let up: Element | null = inner;
      up && up !== element;
      up = up.parentElement
    )
      if (up.hasAttribute("data-part")) depth++
    most = Math.max(most, depth)
  }
  return most
}

interface Entry {
  part: string
  elements: Element[]
  box: DOMRect
}

const visible = (element: Element) => {
  const box = element.getBoundingClientRect()
  return (
    box.width > 0 &&
    box.height > 0 &&
    (element as HTMLElement).checkVisibility?.({ opacityProperty: true }) !==
      false
  )
}

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

/** Opens what the component opens, so its popup's parts are in the picture. */
async function open(name: string): Promise<void> {
  const stage = document.getElementById("stage")
  if (!stage) return
  if (name === "context-menu") {
    // Opened on its area, by a secondary press: no control says so.
    const area = stage.querySelector<HTMLElement>("[data-part]")
    if (!area) return
    const place = area.getBoundingClientRect()
    const secondary = {
      bubbles: true,
      cancelable: true,
      button: 2,
      buttons: 2,
      clientX: place.left + 24,
      clientY: place.top + 24,
      pointerType: "mouse",
    }
    area.dispatchEvent(new PointerEvent("pointerdown", secondary))
    area.dispatchEvent(new MouseEvent("mousedown", secondary))
    area.dispatchEvent(new MouseEvent("contextmenu", secondary))
    return
  }
  // What says it opens something comes first; a demo with none is used by its first control.
  const first =
    stage.querySelector<HTMLElement>(
      '[aria-haspopup], [aria-expanded="false"]'
    ) ??
    stage.querySelector<HTMLElement>(
      "button, [role=combobox], a, [data-part][tabindex]"
    )
  if (!first) return
  const box = first.getBoundingClientRect()
  const at = {
    bubbles: true,
    cancelable: true,
    clientX: box.left + 4,
    clientY: box.top + 4,
    pointerType: "mouse",
  }
  if (name === "tooltip" || name === "hover-card") {
    first.dispatchEvent(new PointerEvent("pointerenter", at))
    first.dispatchEvent(new PointerEvent("pointermove", at))
    first.focus({ preventScroll: true })
  } else if (name === "toast") {
    first.click()
    await wait(200)
    // A toast leaves when its time is up: the pointer over the list holds it there.
    const list = document.querySelector<HTMLElement>(
      '[data-part="Toast.Viewport"]'
    )
    list?.dispatchEvent(new PointerEvent("pointerenter", at))
    list?.dispatchEvent(new MouseEvent("mouseenter", at))
    list?.dispatchEvent(new PointerEvent("pointermove", at))
  } else if (
    first.hasAttribute("aria-haspopup") ||
    first.getAttribute("aria-expanded") === "false"
  ) {
    first.click()
    await wait(60)
    if (first.getAttribute("aria-expanded") === "false") {
      first.focus({ preventScroll: true })
      first.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      )
    }
  }
}

export async function anatomy(
  name: string,
  source: string,
  hold: (top: number) => void
): Promise<void> {
  document.documentElement.dataset.view = "anatomy"
  // Outside `<body>`: a modal makes everything else in the body inert, and the names stay usable.
  const layer = document.createElement("div")
  layer.id = "anatomy"
  const drawing = document.createElementNS(SVG, "svg")
  const rest = document.createElement("div")
  rest.className = "rest"
  layer.append(drawing, rest)
  document.documentElement.append(layer)
  // Every part the demo writes: one that draws no element, or is not shown just now (a mark
  // for a choice not made), is named under the picture, so none is left out.
  const written = new Set(
    [
      ...source.matchAll(
        /(?<![\w)\]])<([A-Z][A-Za-z]*(?:\.[A-Z][A-Za-z]*)?)(?=[\s/>])/g
      ),
    ].map((found) => found[1]!)
  )
  written.delete("Fragment")
  // Once the frame has its size: the demo is held where it is, then opened.
  for (
    let tries = 0;
    tries < 100 &&
    !(
      window.innerHeight > 100 && document.getElementById("stage")?.offsetHeight
    );
    tries++
  )
    await new Promise((resolve) => setTimeout(resolve, 30))
  hold(64)
  await open(name)
  await wait(120)
  // Drawn as large as the frame has room for beside the names: the demos are sized in `rem`.
  const first = [...document.querySelectorAll("[data-part]")]
    .map((element) => element.getBoundingClientRect())
    .filter((box) => box.width > 0 && box.width < window.innerWidth - 4)
  const natural =
    Math.max(...first.map((box) => box.right)) -
    Math.min(...first.map((box) => box.left))
  const scale = Math.min(
    1.4,
    Math.max(1, (window.innerWidth - 320) / Math.max(natural, 1))
  )
  document.documentElement.style.fontSize = `${Math.round(16 * scale * 10) / 10}px`
  // What is placed against a trigger is placed again at the new size.
  window.dispatchEvent(new Event("resize"))
  await wait(120)

  const names = new Map<string, HTMLElement>()
  let last = ""
  const activate = (part: string | undefined) => {
    if (part) layer.dataset.active = part
    else delete layer.dataset.active
    for (const node of layer.querySelectorAll("[data-for]"))
      node.classList.toggle(
        "active",
        (node as HTMLElement | SVGElement).dataset.for === part
      )
  }

  function draw() {
    const found = new Map<string, Element[]>()
    for (const element of document.querySelectorAll("[data-part]")) {
      if (!visible(element)) continue
      const part = (element as HTMLElement).dataset.part!
      found.set(part, [...(found.get(part) ?? []), element])
    }
    const all: Entry[] = [...found].map(([part, elements]) => ({
      part,
      elements,
      box: elements[0]!.getBoundingClientRect(),
    }))
    // A part that covers the frame (a backdrop) has no edge to draw a line to: it is named in
    // the corner, and the others are laid out without it.
    const covers = (box: DOMRect) =>
      box.width >= window.innerWidth - 4 && box.height >= window.innerHeight - 4
    const entries = all.filter(({ box }) => !covers(box))
    const whole = all.filter(({ box }) => covers(box))
    const key = all
      .map(
        ({ part, box }) =>
          `${part}:${Math.round(box.x)},${Math.round(box.y)},${Math.round(box.width)},${Math.round(box.height)}`
      )
      .join("|")
    if (key === last) return
    last = key
    const width = window.innerWidth
    const height = window.innerHeight
    // The names stand clear of the whole demo, its own text too, not only of its parts.
    const around = document.getElementById("stage")?.getBoundingClientRect()
    const left = Math.min(
      around?.left ?? Infinity,
      ...entries.map(({ box }) => box.left)
    )
    const right = Math.max(
      around?.right ?? -Infinity,
      ...entries.map(({ box }) => box.right)
    )
    // A name goes to the side its part is nearer, the two sides kept even.
    const sides: Record<"left" | "right", Entry[]> = { left: [], right: [] }
    const middle = (left + right) / 2
    // A demo against an edge of the frame (a toast in its corner) has room on one side only.
    const roomLeft = left > 140 || left >= width - right
    const roomRight = width - right > 140 || width - right > left
    for (const entry of [...entries].sort(
      (a, b) => a.box.top - b.box.top || a.box.left - b.box.left
    )) {
      const centre = entry.box.left + entry.box.width / 2
      const wanted =
        centre < middle - 4 ? "left" : centre > middle + 4 ? "right" : undefined
      const side = !roomRight
        ? "left"
        : !roomLeft
          ? "right"
          : wanted && sides[wanted].length <= Math.ceil(entries.length / 2)
            ? wanted
            : sides.left.length <= sides.right.length
              ? "left"
              : "right"
      sides[side].push(entry)
    }
    drawing.replaceChildren()
    const kept = new Set<string>()
    for (const side of ["left", "right"] as const) {
      const list = sides[side]
      // Each name beside its part, and never on top of the one above it.
      const rows: number[] = []
      list.forEach((entry, at) => {
        const wanted = entry.box.top + Math.min(entry.box.height / 2, 14)
        rows.push(Math.max(wanted, (rows[at - 1] ?? -Infinity) + GAP, 18))
      })
      const over = (rows.at(-1) ?? 0) - (height - 44)
      if (over > 0)
        for (let at = rows.length - 1; at >= 0; at--)
          rows[at] = Math.max(18 + at * GAP, rows[at]! - over)
      list.forEach((entry, at) => {
        const y = rows[at]!
        kept.add(entry.part)
        let label = names.get(entry.part)
        if (!label) {
          label = document.createElement("span")
          label.className = "name"
          label.dataset.for = entry.part
          label.textContent = entry.part
          label.addEventListener("pointerenter", () => activate(entry.part))
          label.addEventListener("pointerleave", () => activate(undefined))
          names.set(entry.part, label)
          layer.append(label)
        }
        let edge = side === "left" ? left - REACH : right + REACH
        label.style.top = `${y - 11}px`
        label.style.right = ""
        // Kept inside the frame: beside a wide component a name lies over its edge.
        const wide = label.offsetWidth
        const from =
          side === "left"
            ? Math.max(6, edge - wide)
            : Math.min(width - 6 - wide, edge)
        label.style.left = `${from}px`
        edge = side === "left" ? from + wide : from
        // The line: out from the name, then to the part's own edge.
        const inside = -(3 + Math.min(levels(entry.elements[0]!), 3) * 4)
        const ax =
          side === "left" ? entry.box.left + inside : entry.box.right - inside
        const ay = Math.min(
          Math.max(y, entry.box.top + inside),
          entry.box.bottom - inside
        )
        const turn = side === "left" ? edge + 10 : edge - 10
        const line = document.createElementNS(SVG, "path")
        line.setAttribute("class", "line")
        line.dataset.for = entry.part
        line.setAttribute("d", `M ${edge} ${y} H ${turn} V ${ay} H ${ax}`)
        const dot = document.createElementNS(SVG, "circle")
        dot.setAttribute("class", "dot")
        dot.dataset.for = entry.part
        dot.setAttribute("cx", String(ax))
        dot.setAttribute("cy", String(ay))
        dot.setAttribute("r", "2.5")
        drawing.append(line, dot)
        entry.elements.forEach((element, nth) => {
          const box = element.getBoundingClientRect()
          // A part that holds others is drawn further out than they are, so two outlines never
          // lie on one another; of a part written many times (an item), one is outlined at rest.
          const out = 3 + Math.min(levels(element), 3) * 4
          const outline = document.createElementNS(SVG, "rect")
          outline.setAttribute("class", nth ? "box more" : "box")
          outline.dataset.for = entry.part
          outline.setAttribute("x", String(box.x - out))
          outline.setAttribute("y", String(box.y - out))
          outline.setAttribute("width", String(box.width + out * 2))
          outline.setAttribute("height", String(box.height + out * 2))
          outline.setAttribute("rx", String(4 + out / 2))
          drawing.prepend(outline)
        })
      })
    }
    whole.forEach((entry, at) => {
      kept.add(entry.part)
      let label = names.get(entry.part)
      if (!label) {
        label = document.createElement("span")
        label.className = "name"
        label.dataset.for = entry.part
        label.textContent = entry.part
        label.addEventListener("pointerenter", () => activate(entry.part))
        label.addEventListener("pointerleave", () => activate(undefined))
        names.set(entry.part, label)
        layer.append(label)
      }
      label.style.right = ""
      label.style.left = "12px"
      label.style.top = `${12 + at * GAP}px`
      const outline = document.createElementNS(SVG, "rect")
      outline.setAttribute("class", "box")
      outline.dataset.for = entry.part
      outline.setAttribute("x", "3")
      outline.setAttribute("y", "3")
      outline.setAttribute("width", String(width - 6))
      outline.setAttribute("height", String(height - 6))
      outline.setAttribute("rx", "6")
      drawing.prepend(outline)
    })
    for (const [part, label] of names) {
      if (kept.has(part)) continue
      label.remove()
      names.delete(part)
    }
    const none = [...written].filter((part) => !found.has(part))
    rest.replaceChildren(
      ...(none.length
        ? [
            "Not in this picture:",
            ...none.map((part) =>
              Object.assign(document.createElement("code"), {
                textContent: part,
              })
            ),
          ]
        : [])
    )
    activate(layer.dataset.active)
  }

  // A part under the pointer lights its name.
  document.addEventListener("pointermove", (event) => {
    if ((event.target as Element).closest?.("#anatomy")) return
    const part = (event.target as Element).closest?.<HTMLElement>("[data-part]")
      ?.dataset.part
    if (part !== layer.dataset.active) activate(part)
  })
  // The component moves as it opens, and when the frame is resized: read again while it does.
  window.setInterval(draw, 200)
  draw()
  // How tall the picture is, for the page that frames it: said once it has come to rest, and
  // again only if it grows, so a part placed by the frame's own height cannot chase it.
  let said = 0
  const tell = () => {
    const boxes = [...layer.querySelectorAll<SVGRectElement>("rect.box")]
      .map((box) => box.getBoundingClientRect())
      .filter((box) => box.height < window.innerHeight - 8)
    const labels = [...layer.querySelectorAll<HTMLElement>(".name")].map(
      (label) => label.getBoundingClientRect()
    )
    if (!boxes.length) return
    const bottom = Math.max(
      ...boxes.map((box) => box.bottom),
      ...labels.map((box) => box.bottom)
    )
    const needed = Math.ceil(
      bottom + 28 + (rest.childElementCount ? rest.offsetHeight + 22 : 0)
    )
    if (said && needed <= said) return
    said = needed
    window.parent.postMessage(
      { type: "kui-anatomy", name, height: needed },
      window.location.origin
    )
  }
  window.setTimeout(tell, 500)
  window.setInterval(tell, 1500)
}
