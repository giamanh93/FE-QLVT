import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { SupplierService } from 'src/app/services/supplier/supplier.service';


@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  private _apiService = inject(SupplierService);
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
            label: `Tên vật tư`,
            placeholder: 'Tên vật tư',
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
          type: 'nzInput',
          props: {
            label: 'Địa chỉ',
            placeholder: 'Số điện thoại',
            required: true,
          },
        },
        {
          key: 'active',
          type: 'nzCheckbox',
          props: {
            label: 'Trạng thái',
            placeholder: 'Trạng thái',
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
      this.getDetailSupplier();
    }
  }

  getDetailSupplier() {
    this._apiService.getSuppliersById(this.id).subscribe(results => {
      if (results) {
        this.model = results;
      }
    })
  }

  submitMaterial() {
    if (this.form.valid) {
      this._spinner.show();
      const object: any = this.form.getRawValue()
      this._apiService.createSupplier(this.form.getRawValue(), object.id ? 'put' :'post').subscribe(results => {
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
