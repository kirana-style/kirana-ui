import { Button } from "@workspace/registry/bases/solid-ark/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import { Skeleton } from "@workspace/registry/bases/solid-ark/ui/skeleton.tsx"
import { showcase as s } from "@workspace/registry/styles/showcase.styles.ts"

/** The cards Solid draws with what it has today: Button, Card and Skeleton. */
export function Showcase() {
  return (
    <main sx={s.grid}>
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Every variant, in the design you chose.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div sx={s.wrap}>
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={s.stack}>
          <div sx={s.row}>
            <Skeleton sx={s.avatar} />
            <div sx={s.lines}>
              <Skeleton sx={s.lineLg} />
              <Skeleton sx={s.lineMd} />
            </div>
          </div>
          <div sx={s.lines}>
            <Skeleton sx={s.line} />
            <Skeleton sx={s.line} />
            <Skeleton sx={s.lineShort} />
          </div>
          <div sx={s.row}>
            <Skeleton sx={s.block} />
            <Skeleton sx={s.block} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton sx={s.title} />
          <Skeleton sx={s.subtitle} />
        </CardHeader>
        <CardContent sx={s.stack}>
          <div sx={s.lines}>
            <Skeleton sx={s.label} />
            <Skeleton sx={s.control} />
          </div>
          <div sx={s.lines}>
            <div sx={s.between}>
              <Skeleton sx={s.labelWide} />
              <Skeleton sx={s.labelShort} />
            </div>
            <Skeleton sx={s.control} />
          </div>
        </CardContent>
        <CardFooter sx={s.footer}>
          <Skeleton sx={s.control} />
          <Skeleton sx={s.panel} />
        </CardFooter>
      </Card>
    </main>
  )
}
