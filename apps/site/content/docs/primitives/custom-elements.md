---
title: Custom elements
description: Every component as a custom element with no shadow root: the element holds the component, and its parts are the page's own elements.
section: primitives
order: 7
keywords: [custom elements, web components, html, no framework, kui-part, template]
---

# Custom elements

`@kirana-ui/web` is every component as a custom element, for a page with no framework. Importing
an entry defines its element; `@kirana-ui/web` alone defines them all.

```html
<kui-dialog>
  <button kui-part="trigger">Open</button>
  <div kui-part="portal">
    <div kui-part="backdrop" class="backdrop"></div>
    <div kui-part="popup" class="dialog">
      <h2 kui-part="title">Edit profile</h2>
      <button kui-part="close">Close</button>
    </div>
  </div>
</kui-dialog>

<script type="module">
  import "@kirana-ui/web/dialog"
</script>
```

- **The element holds the component and draws nothing.** It has no shadow root and no box
  (`display: contents`), so your CSS reaches everything.
- **Every part is your own element**, named by `kui-part`. The page it makes is the page the
  framework adapters draw: the library compares the two in its tests.
- **A part that is not shown is taken out of the page**, and put back where it was.
  `kui-keep-mounted` keeps it.
- **A `portal` part is drawn at the end of `<body>`** while the component is open.

## Props, values and changes

A prop is an attribute in kebab case (`default-open`, `side-offset` on a positioner as
`kui-side-offset`) and a property of the same name in camel case. A prop that is a function or an
object is a property only.

```js
const dialog = document.querySelector("kui-dialog")
dialog.open = true

dialog.addEventListener("open-change", (event) => {
  const { open, details } = event.detail
  if (details.reason === "escape-key") event.preventDefault() // keeps it open
})
```

A change is an event named for its callback (`open-change`, `value-change`, `checked-change`),
with the value and the same `details` as on the frameworks. Preventing it refuses the change.

A part's own options are `kui-` attributes: `kui-value` for an item, `kui-disabled`, `kui-index`,
and a positioner's `kui-side`, `kui-align` and `kui-side-offset`. The component's id is `kui-id`.

## Components inside components

A component reads the one it is written in. A control inside `<kui-field>` is the field's, a
`<kui-toggle>` inside `<kui-toggle-group>` is one of the group's, and a `<kui-menu>` inside a
menu is its submenu.

## Lists

A list the component draws (a calendar's weeks, a toast for each message, pagination's pages) is
written once, as a template where the list goes:

```html
<kui-pagination count="200">
  <nav kui-part="root">
    <button kui-part="previous">Previous</button>
    <template kui-each="items">
      <button kui-part="item" kui-when="page">{page}</button>
      <span kui-part="ellipsis" kui-when="ellipsis">…</span>
    </template>
    <button kui-part="next">Next</button>
  </nav>
</kui-pagination>
```

The element stamps a copy for each entry. An entry that stays keeps its elements, so focus is not
lost. `{name}` in text and attributes is the entry's value of that name, `kui-when` keeps an
element for entries of one type, and a template inside a copy is a list of that entry's own (a
week's days).

The elements for each component are on its page under [Components](/docs/primitives/components),
in the Custom elements tab.
