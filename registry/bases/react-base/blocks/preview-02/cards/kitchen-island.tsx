"use client"

import * as React from "react"

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
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

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

export function KitchenIsland() {
  const [enabled, setEnabled] = React.useState(true)
  const [scene, setScene] = React.useState("cooking")
  const [brightness, setBrightness] = React.useState([90])
  const [colorTemp, setColorTemp] = React.useState([70])
  const [volume, setVolume] = React.useState([30])
  const [fade, setFade] = React.useState([0])

  const handleSceneChange = (value: string) => {
    if (!value) return
    setScene(value)
    const preset = SCENES[value as keyof typeof SCENES]
    setBrightness([...preset.brightness])
    setColorTemp([...preset.colorTemp])
    setVolume([...preset.volume])
    setFade([...preset.fade])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kitchen Island</CardTitle>
        <CardDescription>Hue Color Ambient</CardDescription>
        <CardAction>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          <span sx={styles.span}>Scenes</span>
          <ToggleGroup
            value={[scene]}
            onValueChange={(value) => handleSceneChange(value[0] ?? "cooking")}
            variant="outline"
            spacing={1}
            sx={styles.toggleGroup}
          >
            <ToggleGroupItem value="cooking" disabled={!enabled}>
              Cooking
            </ToggleGroupItem>
            <ToggleGroupItem value="dining" disabled={!enabled}>
              Dining
            </ToggleGroupItem>
            <ToggleGroupItem value="nightlight" disabled={!enabled}>
              Nightlight
            </ToggleGroupItem>
            <ToggleGroupItem value="focus" disabled={!enabled}>
              Focus
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ItemGroup>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="SunIcon"
                tabler="IconSun"
                hugeicons="Sun03Icon"
                phosphor="SunIcon"
                remixicon="RiSunLine"
              />
            </ItemMedia>
            <ItemContent sx={styles.itemContent}>
              <ItemTitle sx={styles.itemTitle}>Brightness</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Slider
                value={brightness}
                onValueChange={(value) =>
                  setBrightness(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
                sx={styles.slider}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="ThermometerIcon"
                tabler="IconThermometer"
                hugeicons="ThermometerWarmIcon"
                phosphor="ThermometerIcon"
                remixicon="RiThermometerLine"
              />
            </ItemMedia>
            <ItemContent sx={styles.itemContent2}>
              <ItemTitle sx={styles.itemTitle2}>Color Temp</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions2}>
              <Slider
                value={colorTemp}
                onValueChange={(value) =>
                  setColorTemp(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="Volume2Icon"
                tabler="IconVolume"
                hugeicons="VolumeHighIcon"
                phosphor="SpeakerHighIcon"
                remixicon="RiVolumeUpLine"
              />
            </ItemMedia>
            <ItemContent sx={styles.itemContent3}>
              <ItemTitle sx={styles.itemTitle3}>Volume</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions3}>
              <Slider
                value={volume}
                onValueChange={(value) =>
                  setVolume(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
          <Item size="sm" variant="outline">
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="TimerIcon"
                tabler="IconClock"
                hugeicons="Clock03Icon"
                phosphor="TimerIcon"
                remixicon="RiTimerLine"
              />
            </ItemMedia>
            <ItemContent sx={styles.itemContent4}>
              <ItemTitle sx={styles.itemTitle4}>Fade</ItemTitle>
            </ItemContent>
            <ItemActions sx={styles.itemActions4}>
              <Slider
                value={fade}
                onValueChange={(value) =>
                  setFade(Array.isArray(value) ? [...value] : [value])
                }
                max={100}
                disabled={!enabled}
              />
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
