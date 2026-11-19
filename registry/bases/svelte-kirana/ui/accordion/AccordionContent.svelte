<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Accordion } from "@kirana-ui/svelte/accordion"

  import { accordion } from "../../../../styles/accordion.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Base UI's panel variables, which Kirana UI's panel writes, as React's part reads them. -->
<Accordion.Panel data-slot="accordion-content" {...rest} sx={[accordion.content, accordion.contentBase]}>
  <div sx={[accordion.contentInner, accordion.contentInnerBase, className as Sx]}>
    {@render children?.()}
  </div>
</Accordion.Panel>
