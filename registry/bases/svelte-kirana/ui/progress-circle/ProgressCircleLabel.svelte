<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Progress } from "@kirana-ui/svelte/progress"

  import { progressCircleParts } from "../../../../styles/progress-circle.styles"

  /**
   * The value, written (a percentage of the range by default), for the middle of the ring;
   * `children`, given the text, draws something else.
   */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet<[text: string | undefined]>
    [attribute: string]: unknown
  } = $props()
</script>

<Progress.Value data-slot="progress-circle-label" {children} {...rest} sx={[progressCircleParts.label, className as Sx]} />
