/**
 * An attachment wrapping each run of text directly inside an element in a label (`<span
 * data-slot="…" class="…">`), as React's and Vue's Button wrap their text children: Svelte gives a
 * component its children as one snippet, which cannot be read before it renders, so the runs are
 * wrapped once they are in the page, and again as they change. Svelte keeps updating a text node it
 * created after it moves, so a reactive label stays reactive. White space alone stays bare, which
 * a flex container drops.
 */
export function textLabels(slot: string, className: string) {
  return (element: HTMLElement) => {
    const wrap = () => {
      // A copy: wrapping a text node changes the live list.
      for (const node of Array.from(element.childNodes)) {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim())
          continue
        const label = document.createElement("span")
        label.dataset.slot = slot
        label.className = className
        node.replaceWith(label)
        label.append(node)
      }
    }
    wrap()
    const observer = new MutationObserver(wrap)
    observer.observe(element, { childList: true })
    return () => observer.disconnect()
  }
}
