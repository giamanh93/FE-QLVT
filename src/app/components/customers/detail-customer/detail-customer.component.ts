import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/services/customer/customer.services';


@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent implements OnInit {
  private _apiService = inject(CustomerService);
  private _messageService = inject(MessageService);
  private _spinner = inject(NgxSpinnerService);
  @Input() id: number = 0;
  @Output() saveCallBack = new EventEmitter<any>();
  form = new FormGroup({});
  model: any = {};
  public options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: true,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'field',
      fieldGroup: [
        {
          key: 'id',
          type: 'nzInput',
          expressions: {
            'props.disabled': 'true',
          },
          props: {
            label: `Mã`,
            placeholder: 'Mã tự sinh',
          },
        },
        {
          key: 'name',
          type: 'nzInput',

          props: {
            label: `Tên khách hàng`,
            placeholder: 'Tên khách hàng',
            required: true,
          },
        },
        {
          key: 'phone',
          type: 'nzInput',
          props: {
            label: 'Số điện thoại',
            placeholder: 'Số điện thoại',
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
            placeholder: 'Nhập địa chỉ',
          },
        },
        {
          key: 'active',
          type: 'nzCheckbox',
          props: {
            label: 'trạng thái',
            placeholder: 'Nhập trạng thái',
          },
        },
        {
          key: 'note',
          type: 'nzTextarea',
          props: {
            label: 'Ghi chú',
            placeholder: 'Ghi chú',
          },
        },
      ]

    },

  ];

  ngOnInit() {
    if (this.id > 0) {
      this.getDetailCustomer();
    }
  }

  getDetailCustomer() {
    this._apiService.getCustomersById(this.id).subscribe(results => {
      if (results) {
        this.model = results;
      }
    })
  }

  submitCustomer() {
    if (this.form.valid) {
      this._spinner.show();
      const object: any = this.form.getRawValue()
      this._apiService.createCustomer(this.form.getRawValue(), object.id ? 'put' :'post').subscribe(results => {
        if (results) {
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thành công' });
          this._spinner.hide();
          this.saveCallBack.emit()
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Thất bại' });
          this._spinner.hide();
        }
        console.log(results)
      })
    }
  }

}
