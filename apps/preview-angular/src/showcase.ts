import { Component } from "@angular/core"
import { props } from "@kirana-style/core"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import { Skeleton } from "@workspace/registry/bases/angular-ng/ui/skeleton"
import { showcase } from "@workspace/registry/styles/showcase.styles"

/**
 * The cards Angular draws with what it has today: Button, Card and Skeleton. The parts take `[sx]`;
 * plain elements take their classes as strings, since Kirana's `SxDirective` would also match the
 * parts.
 */
@Component({
  selector: "preview-showcase",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Skeleton,
  ],
  template: `
    <main [class]="grid">
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiCardTitle>Buttons</div>
          <div kuiCardDescription>Every variant, in the design you chose.</div>
        </div>
        <div kuiCardContent>
          <div [class]="wrap">
            <button kuiButton>Default</button>
            <button kuiButton variant="secondary">Secondary</button>
            <button kuiButton variant="outline">Outline</button>
            <button kuiButton variant="ghost">Ghost</button>
            <button kuiButton variant="destructive">Destructive</button>
            <button kuiButton variant="link">Link</button>
          </div>
        </div>
      </div>
      <div kuiCard>
        <div kuiCardContent [sx]="s.stack">
          <div [class]="row">
            <div kuiSkeleton [sx]="s.avatar"></div>
            <div [class]="lines">
              <div kuiSkeleton [sx]="s.lineLg"></div>
              <div kuiSkeleton [sx]="s.lineMd"></div>
            </div>
          </div>
          <div [class]="lines">
            <div kuiSkeleton [sx]="s.line"></div>
            <div kuiSkeleton [sx]="s.line"></div>
            <div kuiSkeleton [sx]="s.lineShort"></div>
          </div>
          <div [class]="row">
            <div kuiSkeleton [sx]="s.block"></div>
            <div kuiSkeleton [sx]="s.block"></div>
          </div>
        </div>
      </div>
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiSkeleton [sx]="s.title"></div>
          <div kuiSkeleton [sx]="s.subtitle"></div>
        </div>
        <div kuiCardContent [sx]="s.stack">
          <div [class]="lines">
            <div kuiSkeleton [sx]="s.label"></div>
            <div kuiSkeleton [sx]="s.control"></div>
          </div>
          <div [class]="lines">
            <div [class]="between">
              <div kuiSkeleton [sx]="s.labelWide"></div>
              <div kuiSkeleton [sx]="s.labelShort"></div>
            </div>
            <div kuiSkeleton [sx]="s.control"></div>
          </div>
        </div>
        <div kuiCardFooter [sx]="s.footer">
          <div kuiSkeleton [sx]="s.control"></div>
          <div kuiSkeleton [sx]="s.panel"></div>
        </div>
      </div>
    </main>
  `,
})
export class Showcase {
  protected readonly s = showcase
  protected readonly grid = props(showcase.grid).className
  protected readonly wrap = props(showcase.wrap).className
  protected readonly row = props(showcase.row).className
  protected readonly lines = props(showcase.lines).className
  protected readonly between = props(showcase.between).className
}
