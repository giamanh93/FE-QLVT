import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
export interface OptionDropdown {
  label: string;
  value: string | number
}
@Component({
  selector: 'app-nz-dropdown',
  templateUrl: './nz-dropdown.component.html',
  styleUrls: ['./nz-dropdown.component.scss']
})
export class NzDropdownComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  listOptions: OptionDropdown[] = []
  isFilter = false;
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
    const lists: any = this.field.props.options;
    this.listOptions = lists;
  }
}
