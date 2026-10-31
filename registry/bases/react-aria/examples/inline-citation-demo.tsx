import { Button } from "../ui/button"
import { HoverCard, HoverCardTrigger } from "../ui/hover-card"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  citationHoverCard: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  citationDiv: css({
    fontWeight: fontWeight.medium,
  }),
  citationP: css({
    color: theme.mutedForeground,
  }),
  citationA: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  citationSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
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

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "")
}

function Citation({ source }: { source: Source }) {
  const host = hostname(source.url)

  return (
    <HoverCardTrigger delay={10} closeDelay={100}>
      <Button variant="secondary" size="xs">
        {host}
      </Button>
      <HoverCard sx={styles.citationHoverCard}>
        <div sx={styles.citationDiv}>{source.title}</div>
        <p sx={styles.citationP}>{source.description}</p>
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          sx={styles.citationA}
        >
          {host}
          <span sx={styles.citationSpan}> (opens in a new tab)</span>
        </a>
      </HoverCard>
    </HoverCardTrigger>
  )
}

export default function InlineCitationDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <p>
          Next.js streams a route in chunks, so the page shows up before every
          request finishes. <Citation source={sources.streaming} />
        </p>
        <p>
          Wrap a slow part of the page in a Suspense boundary and React sends
          the fallback first. When the data resolves, the finished HTML streams
          into the same response and replaces the fallback, with no extra
          request from the browser. <Citation source={sources.suspense} />{" "}
          Server Components help here, because their code never ships to the
          browser. <Citation source={sources.serverComponents} />
        </p>
        <p>
          A loading.tsx file does the same for a whole route segment.{" "}
          <Citation source={sources.loading} /> It all runs over chunked
          transfer encoding, so there is nothing extra to set up.{" "}
          <Citation source={sources.chunked} />
        </p>
      </div>
    </div>
  )
}
