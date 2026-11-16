import { Carousel } from "@kirana-ui/react/carousel"

import type { Styles } from "../../styled.ts"

const TIPS = [
  { title: "Water in the morning", text: "Roots drink before the heat." },
  { title: "Turn the pot weekly", text: "Every side gets its light." },
  { title: "Feed in spring", text: "Growth starts, so does hunger." },
]

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "viewport"
    | "item"
    | "title"
    | "text"
    | "controls"
    | "arrow"
    | "dots"
    | "dot"
  >
}) {
  return (
    <Carousel.Root aria-label="Plant care tips" {...s.root}>
      <Carousel.Viewport {...s.viewport}>
        {TIPS.map((each, index) => (
          <Carousel.Item key={each.title} index={index} {...s.item}>
            <p {...s.title}>{each.title}</p>
            <p {...s.text}>{each.text}</p>
          </Carousel.Item>
        ))}
      </Carousel.Viewport>
      <div {...s.controls}>
        <Carousel.Previous aria-label="Previous tip" {...s.arrow}>
          ‹
        </Carousel.Previous>
        <div {...s.dots}>
          {TIPS.map((each, index) => (
            <Carousel.Indicator
              key={each.title}
              index={index}
              aria-label={`Tip ${index + 1}`}
              {...s.dot}
            />
          ))}
        </div>
        <Carousel.Next aria-label="Next tip" {...s.arrow}>
          ›
        </Carousel.Next>
      </div>
    </Carousel.Root>
  )
}
