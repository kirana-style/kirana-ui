import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { space } from "../../../../../core/scales"

const styles = {
  cardFooter: css({
    justifyContent: {
      base: "flex-end",
      [axes.style.sera]: "center",
    },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
  button2: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
}

export function SocialLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="spotify-url">Spotify Artist URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="CirclePlusIcon"
                  tabler="IconCirclePlus"
                  hugeicons="PlusSignCircleIcon"
                  phosphor="PlusCircleIcon"
                  remixicon="RiAddCircleLine"
                />
              </InputGroupAddon>
              <InputGroupInput
                id="spotify-url"
                defaultValue="spotify.com/artist/3j...2k"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="instagram-handle">Instagram Handle</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="CameraIcon"
                  tabler="IconCamera"
                  hugeicons="Camera01Icon"
                  phosphor="CameraIcon"
                  remixicon="RiCameraLine"
                />
              </InputGroupAddon>
              <InputGroupInput
                id="instagram-handle"
                defaultValue="@julianduryea_music"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="soundcloud-url">SoundCloud URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="CloudIcon"
                  tabler="IconCloud"
                  hugeicons="CloudUploadIcon"
                  phosphor="CloudIcon"
                  remixicon="RiCloudLine"
                />
              </InputGroupAddon>
              <InputGroupInput
                id="soundcloud-url"
                placeholder="soundcloud.com/username"
              />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="website-url">Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="GlobeIcon"
                  tabler="IconWorld"
                  hugeicons="Globe02Icon"
                  phosphor="GlobeIcon"
                  remixicon="RiGlobalLine"
                />
              </InputGroupAddon>
              <InputGroupInput
                id="website-url"
                placeholder="https://yoursite.com"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button variant="secondary" sx={styles.button}>
          Discard
        </Button>
        <Button sx={styles.button2}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
