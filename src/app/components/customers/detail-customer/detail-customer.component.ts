import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { of } from 'rxjs';
import { NzInputComponent } from 'src/app/common/components/formLy/nz-input/nz-input.component';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'field',
      fieldGroup: [
        {
          key: 'name',
          type: 'nzInput',
          props: {
            label: `Tên khách hàng`,
            placeholder: 'Formly is terrific!',
            required: true,
          },
        },
        {
          key: 'phone',
          type: 'nzInput',
          props: {
            label: 'Số điện thoại',
            placeholder: 'Formly is terrific!',
            required: true,
          },
          validators: {
            validation: ['phoneError'],
          },
        },
        {
          key: 'address',
          type: 'nzTextarea',
          props: {
            label: 'Địa chỉ',
            placeholder: 'Formly is terrific!',
            required: true,
          },
        },
        {
          key: 'note',
          type: 'nzTextarea',
          props: {
            label: 'Ghi chú',
            placeholder: 'Formly is terrific!',
            required: true,
          },
        },
      ]

    },

  ];
}
