/** A demo page's frame and its titled examples, as React's `components/example.tsx`. */
import { Show, omit } from "solid-js"
import type { JSX } from "@solidjs/web"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"

import { example } from "../../../styles/example.styles"

type Div = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
  sx?: Sx
  class?: string
}

function ExampleWrapper(props: Div) {
  const local = props
  const rest = omit(props, "sx", "class", "children")
  return (
    <div sx={example.page}>
      <div
        data-slot="example-wrapper"
        {...rest}
        {...styleProps(local.class, example.wrapper, local.sx)}
      >
        {local.children}
      </div>
    </div>
  )
}

function Example(props: Div & { title?: string; containerSx?: Sx }) {
  const local = props
  const rest = omit(props, "sx", "class", "children", "title", "containerSx")
  return (
    <div data-slot="example" {...rest} sx={[example.root, local.containerSx]}>
      <Show when={local.title}>
        <div sx={example.title}>{local.title}</div>
      </Show>
      <div
        data-slot="example-content"
        {...styleProps(local.class, example.content, local.sx)}
      >
        {local.children}
      </div>
    </div>
  )
}

export { Example, ExampleWrapper }
