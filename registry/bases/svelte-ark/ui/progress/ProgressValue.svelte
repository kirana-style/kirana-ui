<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ProgressValueText } from "@ark-ui/svelte"
  import type { ProgressValueTextProps } from "@ark-ui/svelte"
  import type { Snippet } from "svelte"

  import { progress } from "../../../../styles/progress.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ProgressValueTextProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Ark prints its value unless given children, which pass on only when given. -->
<ProgressValueText
  {asChild}
  {children}
  data-slot="progress-value"
  {...rest}
  sx={[progress.value, className as Sx]}
/>
