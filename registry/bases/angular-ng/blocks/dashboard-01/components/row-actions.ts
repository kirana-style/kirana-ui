import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { styles } from "./table"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"

@Component({
  selector: "kui-row-actions",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <ng-container kuiDropdownMenu>
      <button
        kuiButton
        kuiDropdownMenuTrigger
        variant="ghost"
        [sx]="styles.button"
        size="icon"
      >
        <svg
          iconPlaceholder
          lucide="EllipsisVerticalIcon"
          tabler="IconDotsVertical"
          hugeicons="MoreVerticalCircle01Icon"
          phosphor="DotsThreeVerticalIcon"
          remixicon="RiMore2Line"
        ></svg>
        <span [sx]="styles.span">Open menu</span>
      </button>
      <div kuiDropdownMenuContent align="end" [sx]="styles.dropdownMenuContent">
        <div kuiDropdownMenuItem>Edit</div>
        <div kuiDropdownMenuItem>Make a copy</div>
        <div kuiDropdownMenuItem>Favorite</div>
        <div kuiDropdownMenuSeparator></div>
        <div kuiDropdownMenuItem variant="destructive">Delete</div>
      </div>
    </ng-container>
  `,
})
export class RowActions {
  protected readonly styles = styles
}
