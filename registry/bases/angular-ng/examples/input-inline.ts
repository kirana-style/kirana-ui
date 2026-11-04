import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { Input } from "../ui/input"

@Component({
  selector: "input-inline",
  imports: [Button, Field, Input, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiField orientation="horizontal">
        <input kuiInput type="search" placeholder="Search..." />
        <button kuiButton>Search</button>
      </div>
    </div>
  `,
})
export default class InputInline {
  protected readonly page = page
}
