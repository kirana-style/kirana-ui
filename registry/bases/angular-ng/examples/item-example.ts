import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../ui/item"

const styles = {
  textSmFontMedium: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  objectCoverGrayscale: css({ objectFit: "cover", filter: "grayscale(100%)" }),
}

@Component({
  selector: "item-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- DefaultVariantItems -->
      <div kuiExample title="Default">
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItems -->
      <div kuiExample title="Outline">
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- MutedVariantItems -->
      <div kuiExample title="Muted">
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- DefaultVariantItemsSmall -->
      <div kuiExample title="Small">
        <div kuiItem size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItemsSmall -->
      <div kuiExample title="Outline - Small">
        <div kuiItem variant="outline" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- MutedVariantItemsSmall -->
      <div kuiExample title="Muted - Small">
        <div kuiItem variant="muted" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="sm">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- DefaultVariantItemsExtraSmall -->
      <div kuiExample title="Extra Small">
        <div kuiItem size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItemsExtraSmall -->
      <div kuiExample title="Outline - Extra Small">
        <div kuiItem variant="outline" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- MutedVariantItemsExtraSmall -->
      <div kuiExample title="Muted - Extra Small">
        <div kuiItem variant="muted" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title Only</div>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description</div>
            <p kuiItemDescription>
              This is a description that provides additional context.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Title + Description + Button</div>
            <p kuiItemDescription>
              This item includes a title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title</div>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Button</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description</div>
            <p kuiItemDescription>
              This item includes media, title, and description.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="InboxIcon"
              tabler="IconArchive"
              hugeicons="Archive02Icon"
              phosphor="ArchiveIcon"
              remixicon="RiArchiveLine"
            ></svg>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Media + Title + Description + Button</div>
            <p kuiItemDescription>
              Complete item with all components: media, title, description, and
              button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Action</button>
          </div>
        </div>
        <div kuiItem variant="muted" size="xs">
          <div kuiItemContent>
            <div kuiItemTitle>Multiple Actions</div>
            <p kuiItemDescription>
              Item with multiple action buttons in the actions area.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">Cancel</button>
            <button kuiButton size="sm">Confirm</button>
          </div>
        </div>
      </div>
      <!-- DefaultLinkItems -->
      <div kuiExample title="asChild">
        <div kuiItemGroup>
          <a kuiItem href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title Only (Link)</div>
            </div>
          </a>
          <a kuiItem href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title + Description (Link)</div>
              <p kuiItemDescription>
                Clickable item with title and description.
              </p>
            </div>
          </a>
          <a kuiItem href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title (Link)</div>
            </div>
          </a>
          <a kuiItem href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title + Description (Link)</div>
              <p kuiItemDescription>
                Complete link item with media, title, and description.
              </p>
            </div>
          </a>
          <a kuiItem href="#">
            <div kuiItemContent>
              <div kuiItemTitle>With Actions (Link)</div>
              <p kuiItemDescription>Link item that also has action buttons.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Share</button>
            </div>
          </a>
        </div>
      </div>
      <!-- OutlineLinkItems -->
      <div kuiExample title="Outline - asChild">
        <div kuiItemGroup>
          <a kuiItem variant="outline" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title Only (Link)</div>
            </div>
          </a>
          <a kuiItem variant="outline" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title + Description (Link)</div>
              <p kuiItemDescription>
                Clickable item with title and description.
              </p>
            </div>
          </a>
          <a kuiItem variant="outline" href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title (Link)</div>
            </div>
          </a>
          <a kuiItem variant="outline" href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title + Description (Link)</div>
              <p kuiItemDescription>
                Complete link item with media, title, and description.
              </p>
            </div>
          </a>
          <a kuiItem variant="outline" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>With Actions (Link)</div>
              <p kuiItemDescription>Link item that also has action buttons.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Share</button>
            </div>
          </a>
        </div>
      </div>
      <!-- MutedLinkItems -->
      <div kuiExample title="Muted - asChild">
        <div kuiItemGroup>
          <a kuiItem variant="muted" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title Only (Link)</div>
            </div>
          </a>
          <a kuiItem variant="muted" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>Title + Description (Link)</div>
              <p kuiItemDescription>
                Clickable item with title and description.
              </p>
            </div>
          </a>
          <a kuiItem variant="muted" href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title (Link)</div>
            </div>
          </a>
          <a kuiItem variant="muted" href="#">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Media + Title + Description (Link)</div>
              <p kuiItemDescription>
                Complete link item with media, title, and description.
              </p>
            </div>
          </a>
          <a kuiItem variant="muted" href="#">
            <div kuiItemContent>
              <div kuiItemTitle>With Actions (Link)</div>
              <p kuiItemDescription>Link item that also has action buttons.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Share</button>
            </div>
          </a>
        </div>
      </div>
      <!-- DefaultItemGroup -->
      <div kuiExample title="ItemGroup">
        <div kuiItemGroup>
          <div kuiItem>
            <div kuiItemContent>
              <div kuiItemTitle>Item 1</div>
              <p kuiItemDescription>First item in the group.</p>
            </div>
          </div>
          <div kuiItem>
            <div kuiItemContent>
              <div kuiItemTitle>Item 2</div>
              <p kuiItemDescription>Second item in the group.</p>
            </div>
          </div>
          <div kuiItem>
            <div kuiItemContent>
              <div kuiItemTitle>Item 3</div>
              <p kuiItemDescription>Third item in the group.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- OutlineItemGroup -->
      <div kuiExample title="Outline - ItemGroup">
        <div kuiItemGroup>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Item 1</div>
              <p kuiItemDescription>First item with icon.</p>
            </div>
          </div>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Item 2</div>
              <p kuiItemDescription>Second item with icon.</p>
            </div>
          </div>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Item 3</div>
              <p kuiItemDescription>Third item with icon.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- MutedItemGroup -->
      <div kuiExample title="Muted - ItemGroup">
        <div kuiItemGroup>
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Item 1</div>
              <p kuiItemDescription>First item in muted group.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Action</button>
            </div>
          </div>
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Item 2</div>
              <p kuiItemDescription>Second item in muted group.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Action</button>
            </div>
          </div>
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Item 3</div>
              <p kuiItemDescription>Third item in muted group.</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">Action</button>
            </div>
          </div>
        </div>
      </div>
      <!-- ItemSeparatorExample -->
      <div kuiExample title="ItemSeparator">
        <div kuiItemGroup>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Inbox</div>
              <p kuiItemDescription>View all incoming messages.</p>
            </div>
          </div>
          <div kuiItemSeparator></div>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Sent</div>
              <p kuiItemDescription>View all sent messages.</p>
            </div>
          </div>
          <div kuiItemSeparator></div>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Drafts</div>
              <p kuiItemDescription>View all draft messages.</p>
            </div>
          </div>
          <div kuiItemSeparator></div>
          <div kuiItem variant="outline">
            <div kuiItemMedia variant="icon">
              <svg
                iconPlaceholder
                lucide="InboxIcon"
                tabler="IconArchive"
                hugeicons="Archive02Icon"
                phosphor="ArchiveIcon"
                remixicon="RiArchiveLine"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>Archive</div>
              <p kuiItemDescription>View archived messages.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- ItemHeaderExamples -->
      <div kuiExample title="ItemHeader">
        <div kuiItem>
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Design System</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Component Library</div>
            <p kuiItemDescription>
              A comprehensive collection of reusable UI components for building
              consistent interfaces.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Marketing</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Campaign Analytics</div>
            <p kuiItemDescription>
              Track performance metrics and engagement rates across all
              marketing channels.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Engineering</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>API Documentation</div>
            <p kuiItemDescription>
              Complete reference guide for all available endpoints and
              authentication methods.
            </p>
          </div>
        </div>
      </div>
      <!-- ItemFooterExamples -->
      <div kuiExample title="ItemFooter">
        <div kuiItem>
          <div kuiItemContent>
            <div kuiItemTitle>Quarterly Report Q4 2024</div>
            <p kuiItemDescription>
              Financial overview including revenue, expenses, and growth metrics
              for the fourth quarter.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun"
              >Last updated 2 hours ago</span
            >
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemContent>
            <div kuiItemTitle>User Research Findings</div>
            <p kuiItemDescription>
              Insights from interviews and surveys conducted with 50+ users
              across different demographics.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun"
              >Created by Sarah Chen</span
            >
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemContent>
            <div kuiItemTitle>Product Roadmap</div>
            <p kuiItemDescription>
              Planned features and improvements scheduled for the next three
              months.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun">12 comments</span>
          </div>
        </div>
      </div>
      <!-- ItemHeaderAndFooterExamples -->
      <div kuiExample title="ItemHeader + ItemFooter">
        <div kuiItem>
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Team Project</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Website Redesign</div>
            <p kuiItemDescription>
              Complete overhaul of the company website with modern design
              principles and improved user experience.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun"
              >Updated 5 minutes ago</span
            >
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Client Work</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Mobile App Development</div>
            <p kuiItemDescription>
              Building a cross-platform mobile application for iOS and Android
              with React Native.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun"
              >Status: In Progress</span
            >
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemHeader>
            <span [sx]="styles.textSmFontMedium">Documentation</span>
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>API Integration Guide</div>
            <p kuiItemDescription>
              Step-by-step instructions for integrating third-party APIs with
              authentication and error handling.
            </p>
          </div>
          <div kuiItemFooter>
            <span [sx]="styles.textSmTextMutedForegroun"
              >Category: Technical • 3 attachments</span
            >
          </div>
        </div>
      </div>
      <!-- DefaultVariantItemsWithImage -->
      <div kuiExample title="Default - ItemMedia image">
        <div kuiItem>
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Project"
              alt="Project"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Project Dashboard</div>
            <p kuiItemDescription>
              Overview of project settings and configuration.
            </p>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Document"
              alt="Document"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Document</div>
            <p kuiItemDescription>A document with metadata displayed.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">View</button>
          </div>
        </div>
        <div kuiItem>
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/File"
              alt="File"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>File Attachment</div>
            <p kuiItemDescription>
              Complete file with image, title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Download</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItemsWithImage -->
      <div kuiExample title="Outline - ItemMedia image">
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Project"
              alt="Project"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Project Dashboard</div>
            <p kuiItemDescription>
              Overview of project settings and configuration.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Document"
              alt="Document"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Document</div>
            <p kuiItemDescription>A document with metadata displayed.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">View</button>
          </div>
        </div>
        <div kuiItem variant="outline">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/File"
              alt="File"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>File Attachment</div>
            <p kuiItemDescription>
              Complete file with image, title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Download</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItemsWithImageSmall -->
      <div kuiExample title="Outline - ItemMedia image - Small">
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Project"
              alt="Project"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Project Dashboard</div>
            <p kuiItemDescription>
              Overview of project settings and configuration.
            </p>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Document"
              alt="Document"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Document</div>
            <p kuiItemDescription>A document with metadata displayed.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">View</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="sm">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/File"
              alt="File"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>File Attachment</div>
            <p kuiItemDescription>
              Complete file with image, title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Download</button>
          </div>
        </div>
      </div>
      <!-- OutlineVariantItemsWithImageExtraSmall -->
      <div kuiExample title="Outline - ItemMedia image - Extra Small">
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Project"
              alt="Project"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Project Dashboard</div>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Document"
              alt="Document"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Document</div>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">View</button>
          </div>
        </div>
        <div kuiItem variant="outline" size="xs">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/File"
              alt="File"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>File Attachment</div>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Download</button>
          </div>
        </div>
      </div>
      <!-- MutedVariantItemsWithImage -->
      <div kuiExample title="Muted - ItemMedia image">
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Project"
              alt="Project"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Project Dashboard</div>
            <p kuiItemDescription>
              Overview of project settings and configuration.
            </p>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/Document"
              alt="Document"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>Document</div>
            <p kuiItemDescription>A document with metadata displayed.</p>
          </div>
          <div kuiItemActions>
            <button kuiButton variant="outline" size="sm">View</button>
          </div>
        </div>
        <div kuiItem variant="muted">
          <div kuiItemMedia variant="image">
            <img
              src="https://avatar.vercel.sh/File"
              alt="File"
              [attr.width]="40"
              [attr.height]="40"
              [sx]="styles.objectCoverGrayscale"
            />
          </div>
          <div kuiItemContent>
            <div kuiItemTitle>File Attachment</div>
            <p kuiItemDescription>
              Complete file with image, title, description, and action button.
            </p>
          </div>
          <div kuiItemActions>
            <button kuiButton size="sm">Download</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ItemExample {
  protected readonly styles = styles
}
