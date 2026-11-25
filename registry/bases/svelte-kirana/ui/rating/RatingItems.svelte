<script lang="ts">
  import type { Snippet } from "svelte"
  import { Rating } from "@kirana-ui/svelte/rating"

  /** The stars, one from 1 to `count`: draws `children` once for each place. */
  let {
    children,
  }: {
    children: Snippet<[place: number]>
  } = $props()
</script>

<Rating.Items {children} />
