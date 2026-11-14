<!-- An item as the preview's page holds it (`src/App.svelte`): the icon library's and the
     language's contexts, from the page's design. -->
<script lang="ts">
  import type { Component } from "svelte"
  import { setContext } from "svelte"

  import { LANGUAGE } from "@workspace/registry/bases/svelte-ark/components/language-selector/index.ts"
  import type { LanguageContext } from "@workspace/registry/bases/svelte-ark/components/language-selector/index.ts"
  import { ICON_LIBRARY } from "@workspace/registry/icons/svelte.ts"
  import type { IconLibraryContext } from "@workspace/registry/icons/svelte.ts"

  import { design } from "../src/design.svelte"

  let { item }: { item: Component } = $props()

  setContext<IconLibraryContext>(ICON_LIBRARY, () => design.current.system.iconLibrary)
  setContext<LanguageContext>(LANGUAGE, () => design.current.options.language)

  const Item = $derived(item)
</script>

<Item />
