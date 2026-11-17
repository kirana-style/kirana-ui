import { css } from "@kirana-style/core"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "../ui/item"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius } from "../../../core/tokens"

const styles = {
  flexWFullMaxWXlFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xl,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
  }),
  gridGridCols3Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
  aspectSquareWFullRounded: css({
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: radius.sm,
    objectFit: "cover",
  }),
}

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    credit: "Cherry Laithang on Unsplash",
  },
]

export default function ItemHeaderDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWXlFlexColGa}>
        <ItemGroup sx={styles.gridGridCols3Gap4}>
          {models.map((model) => (
            <Item key={model.name} variant="outline">
              <ItemHeader>
                <img
                  src={model.image}
                  alt={model.name}
                  width={128}
                  height={128}
                  sx={styles.aspectSquareWFullRounded}
                />
              </ItemHeader>
              <ItemContent>
                <ItemTitle>{model.name}</ItemTitle>
                <ItemDescription>{model.description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  )
}
