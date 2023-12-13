import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { cloneDeep } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { MaterialService } from 'src/app/services/material/material.services';
import { SupplierService } from 'src/app/services/supplier/supplier.service';


@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.component.html',
  styleUrls: ['./detail-material.component.scss']
})
export class DetailMaterialComponent implements OnInit {
  private _apiService = inject(MaterialService);
  private _apiServiceSupplier = inject(SupplierService);
  private _messageService = inject(MessageService);
  private _spinner = inject(NgxSpinnerService);
  @Input() id: number = 0;
  @Output() saveCallBack = new EventEmitter<any>();
  form = new FormGroup({});
  model: any = {};
  public options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: true,
      supplier_options: []
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
          key: 'supplier_Id',
          type: 'nzDropdown',
          props: {
            label: 'Nhà cung cấp',
            placeholder: 'Nhà cung cấp',
          },
          expressionProperties: {
            'props.options': 'formState.supplier_options'
          }
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
          type: 'nzInputNumber',
          props: {
            label: 'Đơn giá bán',
            placeholder: 'Đơn giá bán',
            required: true,
            type: 'number'
          },
        },
        {
          key: 'price_Buy',
          type: 'nzInputNumber',
          props: {
            label: 'Đơn giá mua',
            placeholder: 'Đơn giá mua',
            required: true,
            type: 'number'
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

  onInitFields() {
    this.fields = [
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
            key: 'supplier_Id',
            type: 'nzDropdown',
            props: {
              label: 'Nhà cung cấp',
              placeholder: 'Nhà cung cấp',
            },
            expressionProperties: {
              'templateOptions.options': 'formState.supplier_options'
            }
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

    ]
  }
  ngOnInit() {
    this.getList();
    if (this.id > 0) {
      this.getDetailMaterial();
    }
  }

  getList() {
    const ffields = cloneDeep(this.fields);
    this.fields = [];
    const _suppliers = this._apiServiceSupplier.getSuppliers('')
    forkJoin({ _suppliers: _suppliers, })
      .subscribe((repons: any) => {
        const { _suppliers} = repons
        this.options.formState.supplier_options = _suppliers.data
        this.fields = [...ffields]
      })
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
