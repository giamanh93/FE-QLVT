import { OrderService } from './../services/order.services';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../../customers/services/customer.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {
  private _apiService = inject(OrderService);
  private _service = inject(CustomerService);
  private _messageService = inject(MessageService);
  private _spinner = inject(NgxSpinnerService);
  private _activatedRoute = inject(ActivatedRoute);
  private readonly unsubscribe$: Subject<void> = new Subject();
  @Input() id: number = 0;
  @Output() saveCallBack = new EventEmitter<any>();
  form = new FormGroup({});
  model: any = {
    "id": 0,
    "code": "string",
    "unit": "string",
    "create_Date": "2023-04-07T02:21:12.921Z",
    "update_Date": "2023-04-07T02:21:12.921Z",
    "amount": 0,
    "note": "string",
    "cust_Id": 0,
    "details": [
      {
        "id": 0,
        "order_Id": 0,
        "create_Date": "2023-04-07T02:21:12.921Z",
        "update_Date": "2023-04-07T02:21:12.921Z",
        "price": 0,
        "price_Change": 0,
        "quantity": 0,
        "amount": 0,
        "material_Id": 0,
        "note": "string"
      }
    ]
  };
  public options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: true,
    },
  };
  fields: FormlyFieldConfig[] = [];

  onInitFields() {
    this.fields= [
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
              label: 'Mã',
              placeholder: 'Mã tự sinh',
            },
          },
          {
            key: 'code',
            type: 'nzInput',
            props: {
              label: 'Mã hàng',
              placeholder: 'Mã hàng',
              required: true,
            },
          },
          {
            key: 'cust_Id',
            type: 'nzDropdown',
  
            props: {
              label: 'Khách hàng',
              placeholder: 'Khách hàng',
              required: true,
              options: this.customers
            },
          },
          {
            key: 'create_Date',
            type: 'nzInput',
            props: {
              label: 'Ngày tạo',
              placeholder: 'Ngày tạo',
              required: true,
            },
          },
          {
            key: 'amount',
            type: 'nzInput',
            props: {
              label: 'Tổng tiền hàng',
              placeholder: 'Tổng tiền hàng',
              required: true,
              type: 'number'
            },
          },
          {
            key: 'note',
            type: 'nzInput',
            props: {
              label: 'Ghi chú',
              placeholder: 'Ghi chú',
              required: true,
            },
          },
          {
            key: 'details',
            type: 'repeatDrivers',
            defaultValue: [  {} ],
            fieldArray: {
              fieldGroup: [
                {
                  key: 'id',
                  type: 'nzInput',
                  hide: true,
                  props: {
                    label: 'Mã',
                    placeholder: 'Không cần nhập',
                    required: true,
                  },
                },
                {
                  key: 'order_id',
                  type: 'nzInput',
                  hide: true,
                  props: {
                    label: 'Mã đơn',
                    placeholder: 'Không cần nhập',
                    required: true,
                  },
                },
                {
                  key: 'material_Id',
                  type: 'nzDropdown',
                  props: {
                    label: 'Vật tư',
                    placeholder: 'Vật tư',
                    required: true,
                    options: this.customers
                  },
                },
                {
                  key: 'price',
                  type: 'nzInput',
                  props: {
                    label: 'Đơn giá',
                    placeholder: 'Đơn giá',
                    required: true,
                    type: 'number'
                  },
                },
                {
                  key: 'price_Change',
                  type: 'nzInput',
                  props: {
                    label: 'Đơn giá thay đổi',
                    placeholder: 'Đơn giá thay đổi',
                    required: true,
                    type: 'number'
                  },
                },
                {
                  key: 'quantity',
                  type: 'nzInput',
                  props: {
                    label: 'Số lượng',
                    placeholder: 'Số lượng',
                    required: true,
                    type: 'number'
                  },
                },
                {
                  key: 'amount',
                  type: 'nzInput',
                  props: {
                    label: 'Thành tiền',
                    placeholder: 'Thành tiền',
                    required: true,
                    type: 'number'
                  },
                }
              ]
            }
          },
        ]
  
      },
  
    ];
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  customers: any[] = [];
  itemsMenu: any[] = [];
  titlePage: string = '';
  getLists() {
    this._service.getCustomers('')
      .subscribe(results => {
        if (results.succeeded) {
          this.customers = results.data.map((item: any) => {
            return {
              label: item.name,
              value: item.id
            }
          });
          this.onInitFields();
        } 
      })
  }

  ngOnInit() {
    this.getLists();
    this.itemsMenu =  [
      { label: 'Home' , routerLink: '/home' },
      { label: 'Danh sách đơn hàng', routerLink: '/order/list' },
      { label: 'Thêm ' },
    ]
    if (this.id > 0) {
      this.getDetailMaterial();
    }
  }

  getDetailMaterial() {
    this._apiService.getOrdersById(this.id).subscribe(results => {
      if (results) {
        this.model = results;
      }
    })
  }

  submitMaterial() {
    if (this.form.valid) {
      this._spinner.show();
      const object: any = this.form.getRawValue()
      this._apiService.createOrder(this.form.getRawValue(), object.id ? 'put' :'post').subscribe(results => {
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
