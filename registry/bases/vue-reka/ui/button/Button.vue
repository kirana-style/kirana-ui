<script setup lang="ts">
import { Primitive } from "reka-ui"
import { props as styleProps } from "@kirana-style/core"
import { createTextVNode, Fragment, h, Text, useSlots } from "vue"
import type { VNode } from "vue"
import { useSx } from "@kirana-style/core/vue"

import { button, buttonLabel } from "../../../../styles/button.styles"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    asChild?: boolean
  }>(),
  { variant: "default", size: "default", asChild: false }
)

const { sx, attrs } = useSx()

const slots = useSlots()
const label = styleProps(buttonLabel).className

/**
 * Each run of text, trimmed to its capitals; icons and elements pass through. White space alone
 * stays bare text, which the flex container drops: a label of its own would add a gap. A slot a
 * part passes on (Input Group's button) arrives as a fragment keyed by its name (`_default`), read
 * through when `fragments`; a `<template v-if>`'s fragment is not, as React labels no text inside
 * a JSX fragment.
 */
const labelled = (nodes: VNode[], fragments = false): VNode[] =>
  nodes.map((node: VNode) =>
    node.type === Text && String(node.children).trim()
      ? h(
          "span",
          { "data-slot": "button-label", class: label },
          node.children as string
        )
      : fragments &&
          node.type === Fragment &&
          Array.isArray(node.children) &&
          // A slot passed on (`_default`), not a template's own `v-if` or `v-for`.
          typeof node.key === "string" &&
          node.key.startsWith("_")
        ? h(Fragment, labelled(node.children as VNode[], true))
        : node
  )
const Labelled = () => labelled(slots.default?.() ?? [], true)

/**
 * As its child (`as-child`): that element, its own text labelled, as React's Button labels its
 * children inside the element it renders (`render={<span />}`). Text a part passes on through a
 * slot of its own arrives as a fragment and stays bare, as the text of React's rendered element
 * itself does (Pagination's links).
 */
function child(): VNode | undefined {
  const nodes = slots.default?.() ?? []
  const node = nodes.find((each: VNode) => typeof each.type === "string")
  if (!node) return nodes[0]
  const children =
    typeof node.children === "string"
      ? [createTextVNode(node.children)]
      : Array.isArray(node.children)
        ? (node.children as VNode[])
        : undefined
  return children
    ? h(node.type as string, node.props, labelled(children))
    : node
}
</script>

<template>
  <!-- `data-slot` before the caller's attributes, so a trigger rendering the button names it, as
       React's Button. -->
  <Primitive
    as="button"
    data-slot="button"
    v-bind="attrs"
    :sx="[button({ variant: props.variant, size: props.size }), sx]"
    :as-child="asChild"
  >
    <component :is="child()" v-if="asChild" />
    <Labelled v-else />
  </Primitive>
</template>
