<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { field } from "../../../../styles/field.styles"

  let {
    errors,
    class: className,
    children,
    ...rest
  }: {
    errors?: Array<{ message?: string } | undefined>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  /** The errors' messages, each once. */
  const messages = $derived.by(() => [
    ...new Set(
      (errors ?? []).flatMap((error) => (error?.message ? [error.message] : []))
    ),
  ])
</script>

{#if children || messages.length}
  <div role="alert" data-slot="field-error" {...rest} class={className} sx={field.error}>
    {#if children}{@render children()}{:else}
      {#if messages.length === 1}
        {messages[0]}
      {:else}
        <ul sx={field.errorList}>
          {#each messages as message (message)}
            <li>
              {message}
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>
{/if}
