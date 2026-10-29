import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
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
 * The cards Angular draws with what it has today: Button, Card and Skeleton. Parts and plain
 * elements alike take `[sx]`: the parts keep Kirana's `SxDirective` off themselves.
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
    SxDirective,
  ],
  template: `
    <main [sx]="s.grid">
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiCardTitle>Buttons</div>
          <div kuiCardDescription>Every variant, in the design you chose.</div>
        </div>
        <div kuiCardContent>
          <div [sx]="s.wrap">
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
          <div [sx]="s.row">
            <div kuiSkeleton [sx]="s.avatar"></div>
            <div [sx]="s.lines">
              <div kuiSkeleton [sx]="s.lineLg"></div>
              <div kuiSkeleton [sx]="s.lineMd"></div>
            </div>
          </div>
          <div [sx]="s.lines">
            <div kuiSkeleton [sx]="s.line"></div>
            <div kuiSkeleton [sx]="s.line"></div>
            <div kuiSkeleton [sx]="s.lineShort"></div>
          </div>
          <div [sx]="s.row">
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
          <div [sx]="s.lines">
            <div kuiSkeleton [sx]="s.label"></div>
            <div kuiSkeleton [sx]="s.control"></div>
          </div>
          <div [sx]="s.lines">
            <div [sx]="s.between">
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
}
