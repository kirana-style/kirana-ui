import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { useIsMobile } from "../../../lib/angular/use-mobile"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  flex1ScrollFadeOverflowY: css({
    flex: "1 1 0%",
    overflowY: "auto",
    padding: space[4],
  }),
  gap2: css({ gap: { "*": null, base: space[2] } }),
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  h34Px: css({ height: { "*": null, base: "34px" } }),
}

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

@Component({
  selector: "drawer-demo",
  imports: [
    Badge,
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container
        kuiDrawer
        [(open)]="open"
        [showSwipeHandle]="isMobile()"
        [swipeDirection]="isMobile() ? 'down' : 'right'"
      >
        <button kuiButton kuiDrawerTrigger variant="secondary">
          Open Drawer
        </button>
        <div kuiDrawerContent>
          <div kuiDrawerHeader>
            <h2 kuiDrawerTitle>Pick a delivery time</h2>
            <p kuiDrawerDescription>
              We'll prepare your order as soon as possible.
            </p>
          </div>
          <div [sx]="[scrollFade, styles.flex1ScrollFadeOverflowY]">
            <div kuiRadioGroup [(value)]="deliveryTime" [sx]="styles.gap2">
              @for (time of deliveryTimes; track time.value) {
                <label kuiFieldLabel [attr.for]="time.id">
                  <div kuiField orientation="horizontal">
                    <div kuiFieldContent>
                      <div kuiFieldTitle [sx]="styles.pair">
                        {{ time.label }}
                        @if (time.badge) {
                          <span kuiBadge variant="secondary">{{
                            time.badge
                          }}</span>
                        }
                      </div>
                      <p kuiFieldDescription>{{ time.description }}</p>
                    </div>
                    <span
                      kuiRadioGroupItem
                      [value]="time.value"
                      [id]="time.id"
                    ></span>
                  </div>
                </label>
              }
            </div>
          </div>
          <div kuiDrawerFooter>
            <button kuiButton (click)="handleConfirm()" [sx]="styles.h34Px">
              Confirm Delivery Time
            </button>
            <button kuiButton kuiDrawerClose variant="outline">Cancel</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DrawerDemo {
  protected readonly open = signal(false)
  protected readonly deliveryTime = signal("asap")
  protected readonly styles = styles
  protected readonly deliveryTimes = deliveryTimes
  protected readonly isMobile = useIsMobile()

  protected handleConfirm() {
    const selected = deliveryTimes.find(
      (time) => time.value === this.deliveryTime()
    )
    if (!selected) return
    this.open.set(false)
    toast("Delivery time confirmed", { description: selected.label })
  }
  protected readonly page = page
  protected readonly scrollFade = scrollFade
}
