import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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

@Component({
  selector: "kui-social-links",
  imports: [
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Social Links</div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="spotify-url">Spotify Artist URL</label>
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="CirclePlusIcon"
                  tabler="IconCirclePlus"
                  hugeicons="PlusSignCircleIcon"
                  phosphor="PlusCircleIcon"
                  remixicon="RiAddCircleLine"
                ></svg>
              </div>
              <input
                kuiInputGroupInput
                id="spotify-url"
                default-value="spotify.com/artist/3j...2k"
              />
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="instagram-handle">Instagram Handle</label>
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="CameraIcon"
                  tabler="IconCamera"
                  hugeicons="Camera01Icon"
                  phosphor="CameraIcon"
                  remixicon="RiCameraLine"
                ></svg>
              </div>
              <input
                kuiInputGroupInput
                id="instagram-handle"
                default-value="@julianduryea_music"
              />
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="soundcloud-url">SoundCloud URL</label>
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="CloudIcon"
                  tabler="IconCloud"
                  hugeicons="CloudUploadIcon"
                  phosphor="CloudIcon"
                  remixicon="RiCloudLine"
                ></svg>
              </div>
              <input
                kuiInputGroupInput
                id="soundcloud-url"
                placeholder="soundcloud.com/username"
              />
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="website-url">Website</label>
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <svg
                  iconPlaceholder
                  lucide="GlobeIcon"
                  tabler="IconWorld"
                  hugeicons="Globe02Icon"
                  phosphor="GlobeIcon"
                  remixicon="RiGlobalLine"
                ></svg>
              </div>
              <input
                kuiInputGroupInput
                id="website-url"
                placeholder="https://yoursite.com"
              />
            </div>
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <button kuiButton variant="secondary" [sx]="styles.button">
          Discard
        </button>
        <button kuiButton [sx]="styles.button2">Save Changes</button>
      </div>
    </div>
  `,
})
export class SocialLinks {
  protected readonly styles = styles
}
