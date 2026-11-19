<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { inputGroup } from "../../../../styles/input-group.styles"
  import { Button } from "../button"

  let {
    type = "button",
    variant = "ghost",
    size = "xs",
    class: className,
    children,
    ...rest
  }: {
    type?: "button" | "submit" | "reset"
    variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    size?: ButtonOptions["size"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ButtonOptions = NonNullable<Parameters<typeof inputGroup.button>[0]>
</script>

<Button type={type} data-size={size} variant={variant} {...rest} sx={[inputGroup.button({ size }), className as Sx]}>
  {@render children?.()}
</Button>
