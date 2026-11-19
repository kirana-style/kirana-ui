import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../styles/example.styles"
import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"

const styles = {
  avatarSizesDiv: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarSizesDiv2: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarWithBadgeDiv: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarWithBadgeDiv2: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarWithBadgeIconDiv: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarWithBadgeIconDiv2: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
  }),
  avatarGroupWithIconCountAvatarImage: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  avatarGroupWithIconCountAvatarImage2: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  avatarGroupWithIconCountAvatarImage3: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
  avatarInEmptyEmpty: css({
    width: { "*": null, base: "100%" },
    flex: "none",
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  avatarInEmptyAvatarImage: css({
    filter: "grayscale(100%)",
  }),
  avatarInEmptyAvatarImage2: css({
    filter: "grayscale(100%)",
  }),
  avatarInEmptyAvatarImage3: css({
    filter: "grayscale(100%)",
  }),
}

@Component({
  selector: "avatar-example",
  imports: [
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- AvatarSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.avatarSizesDiv">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
        </div>
        <div [sx]="styles.avatarSizesDiv2">
          <span kuiAvatar size="sm">
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar>
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="lg">
            <span kuiAvatarFallback>CN</span>
          </span>
        </div>
      </div>
      <!-- AvatarWithBadge -->
      <div kuiExample title="Badge">
        <div [sx]="styles.avatarWithBadgeDiv">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/jorgezreik.png"
              alt="@jorgezreik"
            />
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/jorgezreik.png"
              alt="@jorgezreik"
            />
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/jorgezreik.png"
              alt="@jorgezreik"
            />
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
        </div>
        <div [sx]="styles.avatarWithBadgeDiv2">
          <span kuiAvatar size="sm">
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
          <span kuiAvatar>
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
          <span kuiAvatar size="lg">
            <span kuiAvatarFallback>JZ</span>
            <span kuiAvatarBadge></span>
          </span>
        </div>
      </div>
      <!-- AvatarWithBadgeIcon -->
      <div kuiExample title="Badge with Icon">
        <div [sx]="styles.avatarWithBadgeIconDiv">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/pranathip.png"
              alt="@pranathip"
            />
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
            </span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/pranathip.png"
              alt="@pranathip"
            />
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
            </span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/pranathip.png"
              alt="@pranathip"
            />
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
            </span>
          </span>
        </div>
        <div [sx]="styles.avatarWithBadgeIconDiv2">
          <span kuiAvatar size="sm">
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              ></svg>
            </span>
          </span>
          <span kuiAvatar>
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              ></svg>
            </span>
          </span>
          <span kuiAvatar size="lg">
            <span kuiAvatarFallback>PP</span>
            <span kuiAvatarBadge>
              <svg
                iconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              ></svg>
            </span>
          </span>
        </div>
      </div>
      <!-- AvatarGroupExample -->
      <div kuiExample title="Group">
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
        </div>
      </div>
      <!-- AvatarGroupWithCount -->
      <div kuiExample title="Group with Count">
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>+3</div>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>+3</div>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>+3</div>
        </div>
      </div>
      <!-- AvatarGroupWithIconCount -->
      <div kuiExample title="Group with Icon Count">
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="sm">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </div>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar>
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </div>
        </div>
        <div kuiAvatarGroup [sx]="example.row">
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              [sx]="styles.avatarGroupWithIconCountAvatarImage"
            />
            <span kuiAvatarFallback>CN</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
              [sx]="styles.avatarGroupWithIconCountAvatarImage2"
            />
            <span kuiAvatarFallback>LR</span>
          </span>
          <span kuiAvatar size="lg">
            <img
              kuiAvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
              [sx]="styles.avatarGroupWithIconCountAvatarImage3"
            />
            <span kuiAvatarFallback>ER</span>
          </span>
          <div kuiAvatarGroupCount>
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </div>
        </div>
      </div>
      <!-- AvatarInEmpty -->
      <div kuiExample title="In Empty">
        <div kuiEmpty [sx]="styles.avatarInEmptyEmpty">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia>
              <div kuiAvatarGroup>
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    [sx]="styles.avatarInEmptyAvatarImage"
                  />
                  <span kuiAvatarFallback>CN</span>
                </span>
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                    [sx]="styles.avatarInEmptyAvatarImage2"
                  />
                  <span kuiAvatarFallback>LR</span>
                </span>
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                    [sx]="styles.avatarInEmptyAvatarImage3"
                  />
                  <span kuiAvatarFallback>ER</span>
                </span>
                <div kuiAvatarGroupCount>
                  <svg
                    iconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  ></svg>
                </div>
              </div>
            </div>
            <div kuiEmptyTitle>No Team Members</div>
            <div kuiEmptyDescription>
              Invite your team to collaborate on this project.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>
              <svg
                iconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              ></svg>
              Invite Members
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AvatarExample {
  protected readonly styles = styles
  protected readonly example = example
}
