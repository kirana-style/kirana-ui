<script lang="ts">
  import { css } from "@kirana-style/core"
  import { containerSize, fontSize, leading, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import Citation from "../components/inline-citation-demo/Citation.svelte"

  const styles = {
    div: css({
      marginInline: "auto",
      display: "flex",
      maxWidth: containerSize.sm,
      flexDirection: "column",
      gap: space[3],
      paddingBlock: space[6],
      fontSize: fontSize.sm,
      lineHeight: leading.relaxed,
    }),
  }

  type Source = {
    url: string
    title: string
    description: string
  }

  const sources = {
    streaming: {
      url: "https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming",
      title: "Linking and Navigating",
      description: "How the App Router streams a route to the browser.",
    },
    suspense: {
      url: "https://react.dev/reference/react/Suspense",
      title: "<Suspense>",
      description: "Display a fallback until its children have finished loading.",
    },
    serverComponents: {
      url: "https://react.dev/reference/rsc/server-components",
      title: "Server Components",
      description: "Components that render ahead of time, on the server.",
    },
    loading: {
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      title: "loading.js",
      description: "Show an instant loading state for a route segment.",
    },
    chunked: {
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding",
      title: "Transfer-Encoding",
      description: "Send a response as a series of chunks.",
    },
  } satisfies Record<string, Source>
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <p>
      Next.js streams a route in chunks, so the page shows up before every request finishes.
      <Citation source={sources.streaming} />
    </p>
    <p>
      Wrap a slow part of the page in a Suspense boundary and React sends the fallback first. When the data resolves, the finished HTML streams into the same response and replaces the fallback, with no extra request from the browser.
      <Citation source={sources.suspense} />
      {" "}Server Components help here, because their code never ships to the browser.
      <Citation source={sources.serverComponents} />
    </p>
    <p>
      A loading.tsx file does the same for a whole route segment.{" "}
      <Citation source={sources.loading} />
      It all runs over chunked transfer encoding, so there is nothing extra to set up.{" "}
      <Citation source={sources.chunked} />
    </p>
  </div>
</div>
