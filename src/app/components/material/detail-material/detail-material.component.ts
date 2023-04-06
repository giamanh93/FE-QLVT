import { MaterialService } from './../services/material.services';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.component.html',
  styleUrls: ['./detail-material.component.scss']
})
export class DetailMaterialComponent implements OnInit {
  private _apiService = inject(MaterialService);
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
          key: 'unit',
          type: 'nzInput',
          props: {
            label: 'Đơn vị',
            placeholder: 'Đơn vị',
            required: true,
          },
        },
        {
          key: 'price_Sell',
          type: 'nzInput',
          props: {
            label: 'Đơn giá bán',
            placeholder: 'Đơn giá bán',
            required: true,
            type: 'number'
          },
        },
        {
          key: 'price_Sell',
          type: 'nzInput',
          props: {
            label: 'Đơn giá bán',
            placeholder: 'Đơn giá bán',
            required: true,
            type: 'number'
          },
        },
        {
          key: 'price_Buy',
          type: 'nzInput',
          props: {
            label: 'Đơn giá mua',
            placeholder: 'Đơn giá mua',
            required: true,
            type: 'number'
          },
        },
        {
          key: 'supplier',
          type: 'nzInput',
          props: {
            label: 'Nhà cung cấp',
            placeholder: 'Nhập địa chỉ',
          },
        },
        {
          key: 'active',
          type: 'nzInput',
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
      this.getDetailMaterial();
    }
  }

  getDetailMaterial() {
    this._apiService.getMaterialsById(this.id).subscribe(results => {
      if (results) {
        this.model = results;
      }
    })
  }

  submitMaterial() {
    if (this.form.valid) {
      this._spinner.show();
      const object: any = this.form.getRawValue()
      this._apiService.createMaterial(this.form.getRawValue(), object.id ? 'put' :'post').subscribe(results => {
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
