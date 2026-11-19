import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

@Component({
  selector: "dropdown-menu-destructive",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">
          Actions
        </button>
        <div kuiDropdownMenuContent>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="PencilIcon"
                tabler="IconPencil"
                hugeicons="EditIcon"
                phosphor="PencilIcon"
                remixicon="RiPencilLine"
              ></svg>
              Edit
            </div>
            <div kuiDropdownMenuItem>
              <svg
                iconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare2"
                hugeicons="Share03Icon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              ></svg>
              Share
            </div>
          </div>
          <div kuiDropdownMenuSeparator></div>
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuItem variant="destructive">
              <svg
                iconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              ></svg>
              Delete
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuDestructive {
  protected readonly page = page
}
