import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { Slider } from "../../../ui/slider"
import { Switch } from "../../../ui/switch"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  span: css({
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
  toggleGroup: css({
    flexWrap: "wrap",
  }),
  itemContent: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[3] },
  }),
  itemTitle: css({
    flexShrink: { "*": null, base: "0" },
  }),
  itemActions: css({
    flex: "1 1 0%",
  }),
  slider: css({
    width: "100%",
  }),
  itemContent2: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[3] },
  }),
  itemTitle2: css({
    flexShrink: { "*": null, base: "0" },
  }),
  itemActions2: css({
    flex: "1 1 0%",
  }),
  itemContent3: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[3] },
  }),
  itemTitle3: css({
    flexShrink: { "*": null, base: "0" },
  }),
  itemActions3: css({
    flex: "1 1 0%",
  }),
  itemContent4: css({
    flexDirection: { "*": null, base: "row" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[3] },
  }),
  itemTitle4: css({
    flexShrink: { "*": null, base: "0" },
  }),
  itemActions4: css({
    flex: "1 1 0%",
  }),
}

const SCENES = {
  cooking: { brightness: [90], colorTemp: [70], volume: [30], fade: [0] },
  dining: { brightness: [50], colorTemp: [40], volume: [20], fade: [60] },
  nightlight: { brightness: [15], colorTemp: [20], volume: [0], fade: [80] },
  focus: { brightness: [100], colorTemp: [85], volume: [0], fade: [0] },
} as const

@Component({
  selector: "kui-kitchen-island",
  imports: [
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Item,
    ItemActions,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    Slider,
    Switch,
    ToggleGroup,
    ToggleGroupItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Kitchen Island</div>
        <div kuiCardDescription>Hue Color Ambient</div>
        <div kuiCardAction>
          <span kuiSwitch [(checked)]="enabled"></span>
        </div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div [sx]="styles.div">
          <span [sx]="styles.span">Scenes</span>
          <div
            kuiToggleGroup
            [value]="[scene()]"
            (valueChange)="handleSceneChange($any($event)[0] ?? 'cooking')"
            variant="outline"
            [spacing]="1"
            [sx]="styles.toggleGroup"
          >
            <button kuiToggleGroupItem value="cooking" [disabled]="!enabled()">
              Cooking
            </button>
            <button kuiToggleGroupItem value="dining" [disabled]="!enabled()">
              Dining
            </button>
            <button
              kuiToggleGroupItem
              value="nightlight"
              [disabled]="!enabled()"
            >
              Nightlight
            </button>
            <button kuiToggleGroupItem value="focus" [disabled]="!enabled()">
              Focus
            </button>
          </div>
        </div>
        <div kuiItemGroup>
          <div kuiItem size="sm" variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="SunIcon"
                tabler="IconSun"
                hugeicons="Sun03Icon"
                phosphor="SunIcon"
                remixicon="RiSunLine"
              ></svg>
            </div>
            <div kuiItemContent [sx]="styles.itemContent">
              <div kuiItemTitle [sx]="styles.itemTitle">Brightness</div>
            </div>
            <div kuiItemActions [sx]="styles.itemActions">
              <div
                kuiSlider
                [(value)]="brightness"
                [max]="100"
                [disabled]="!enabled()"
                [sx]="styles.slider"
              ></div>
            </div>
          </div>
          <div kuiItem size="sm" variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="ThermometerIcon"
                tabler="IconThermometer"
                hugeicons="ThermometerWarmIcon"
                phosphor="ThermometerIcon"
                remixicon="RiThermometerLine"
              ></svg>
            </div>
            <div kuiItemContent [sx]="styles.itemContent2">
              <div kuiItemTitle [sx]="styles.itemTitle2">Color Temp</div>
            </div>
            <div kuiItemActions [sx]="styles.itemActions2">
              <div
                kuiSlider
                [(value)]="colorTemp"
                [max]="100"
                [disabled]="!enabled()"
              ></div>
            </div>
          </div>
          <div kuiItem size="sm" variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="Volume2Icon"
                tabler="IconVolume"
                hugeicons="VolumeHighIcon"
                phosphor="SpeakerHighIcon"
                remixicon="RiVolumeUpLine"
              ></svg>
            </div>
            <div kuiItemContent [sx]="styles.itemContent3">
              <div kuiItemTitle [sx]="styles.itemTitle3">Volume</div>
            </div>
            <div kuiItemActions [sx]="styles.itemActions3">
              <div
                kuiSlider
                [(value)]="volume"
                [max]="100"
                [disabled]="!enabled()"
              ></div>
            </div>
          </div>
          <div kuiItem size="sm" variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="TimerIcon"
                tabler="IconClock"
                hugeicons="Clock03Icon"
                phosphor="TimerIcon"
                remixicon="RiTimerLine"
              ></svg>
            </div>
            <div kuiItemContent [sx]="styles.itemContent4">
              <div kuiItemTitle [sx]="styles.itemTitle4">Fade</div>
            </div>
            <div kuiItemActions [sx]="styles.itemActions4">
              <div
                kuiSlider
                [(value)]="fade"
                [max]="100"
                [disabled]="!enabled()"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class KitchenIsland {
  protected readonly enabled = signal(true)
  protected readonly scene = signal("cooking")
  protected readonly brightness = signal([90])
  protected readonly colorTemp = signal([70])
  protected readonly volume = signal([30])
  protected readonly fade = signal([0])
  protected readonly styles = styles
  protected readonly handleSceneChange = (value: string) => {
    if (!value) return
    this.scene.set(value)
    const preset = SCENES[value as keyof typeof SCENES]
    this.brightness.set([...preset.brightness])
    this.colorTemp.set([...preset.colorTemp])
    this.volume.set([...preset.volume])
    this.fade.set([...preset.fade])
  }
}
