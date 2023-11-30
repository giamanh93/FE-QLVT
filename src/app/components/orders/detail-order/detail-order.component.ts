import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { forkJoin, of, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { JSONSchema7 } from 'json-schema';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/services/order/order.services';
import { CustomerService } from 'src/app/services/customer/customer.services';
import { MaterialService } from 'src/app/services/material/material.services';
export interface MySchema {
  hidden: boolean;
  disabled: boolean;
}
export interface Optionss {
  label: string;
  value: any;
}
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit, OnDestroy {

  private _apiService = inject(OrderService);
  private _service = inject(CustomerService);
  private _serviceMaterial = inject(MaterialService);
  private _messageService = inject(MessageService);
  private _spinner = inject(NgxSpinnerService);
  private _activatedRoute = inject(ActivatedRoute);
  private $datepipe = inject(DatePipe);
  private readonly unsubscribe$: Subject<void> = new Subject();
  @Input() id: number = 0;
  @Input() reason: number = 1;
  @Input() isDialog: boolean = false;
  @Output() saveCallBack = new EventEmitter<any>();
  form = new FormGroup({});
  model: any = { };
  dataRouter: any = { };
  public options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: true,
      cust_Id: [],
      material_Id: [],
      reasons: [
        {
          id: 1,
          name: 'Kiểu nhập'
        },
        {
          id: 2,
          name: 'Kiểu xuất'
        },
      ]
    },
  };
  fields: FormlyFieldConfig[] = [];
  customers: Optionss[] = [];
  materials: any[] = [];
  itemsMenu: any[] = [];
  titlePage: string = '';

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
              label: 'Mã',
              placeholder: 'Mã tự sinh',
            },
          },
          {
            key: 'reason',
            type: 'nzDropdown',
            defaultValue: this.dataRouter.url === 'create-order' || this.dataRouter.url === 'update-order' ? 1 : 2,
            props: {
              label: 'Kiểu đơn hàng',
              placeholder: 'Kiểu đơn hàng',
              required: true,
              disabled: true
            },
            expressionProperties: {
              'templateOptions.options': 'formState.reasons'
            }
          },
          {
            key: 'code',
            type: 'nzInput',
            props: {
              label: 'Mã hàng',
              placeholder: 'Mã hàng',
              required: true
            },
          },
          {
            key: 'cust_Id',
            type: 'nzDropdown',
            props: {
              label: 'Khách hàng',
              placeholder: 'Khách hàng',
              required: true,
            },
            expressionProperties: {
              'templateOptions.options': 'formState.customers'
            }
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
            type: 'nzInputNumber',
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
            },
          },
          {
            key: 'details',
            fieldGroupClassName: 'table_list card',
            props: {
              label: 'Vật tư 1'
            },
            type: 'array',
            fieldArray: {
              fieldGroup: [
                // {
                //   key: 'id',
                //   type: 'nzInput',
                //   className: 'hidden',
                //   props: {
                //     label: 'Mã',
                //     placeholder: 'Không cần nhập',
                //   },
                // },
                // {
                //   key: 'order_id',
                //   type: 'nzInput',
                //   className: 'hidden',
                //   props: {
                //     label: 'Mã đơn',
                //     placeholder: 'Không cần nhập',
                //     required: true,
                //   },
                // },
                {
                  key: 'material_Id',
                  type: 'nzDropdown',
                  props: {
                    label: 'Vật tư',
                    placeholder: 'Vật tư',
                    valueProp: 'id',
                    labelProp: 'name',
                    required: true,
                    change: this.onChangeMaterial.bind(this),
                    // options: [
                    //   ...(await this.genericGetOptions(
                    //     'ExpandedApprovalLevel'
                    //   ).toPromise()),
                    // ]
                  },
                  modelOptions: {
                    updateOn: 'change',
                  },
                  hooks: {
                    // onChanges: (field) => this.onChangeMaterial2(field)
                  },
                  expressionProperties: {
                    'templateOptions.options': 'formState.materials'
                  }
                },
                {
                  key: 'unit',
                  type: 'nzInput',
                  props: {
                    label: 'Đơn vị tính',
                    placeholder: 'Đơn vị tính',
                    required: true,
                    disabled: true
                  },
                  // expressions: {
                  //   value: (field: FormlyFieldConfig) => {
                  //     return this.materials.length >0 ? this.materials.filter(d => d.value === field.model.material_Id)[0].unit : ''
                  //   }
                  // }

                },
                {
                  key: 'price',
                  type: 'nzInput',
                  props: {
                    label: 'Đơn giá',
                    placeholder: 'Đơn giá',
                    required: true,
                    disabled: true,
                    type: 'nzInputNumber'
                  },
                },
                {
                  key: 'price_Change',
                  type: 'nzInputNumber',
                  props: {
                    label: 'Đơn giá thay đổi',
                    placeholder: 'Đơn giá thay đổi',
                    required: true,
                    type: 'number',
                    change: this.onChangeQuantity.bind(this),
                  },
                },
                {
                  key: 'quantity',
                  type: 'nzInputNumber',
                  props: {
                    label: 'Số lượng',
                    placeholder: 'Số lượng',
                    required: true,
                    type: 'number',
                    change: this.onChangeQuantity.bind(this),
                  },
                },
                {
                  key: 'amount',
                  type: 'nzInputNumber',
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

  getList() {
    const _customers = this._service.getCustomers('');
    const _materials = this._serviceMaterial.getMaterials('');
    forkJoin({ _customerss: _customers, _materialss: _materials })
      .subscribe((repons: any) => {
        const { _customerss, _materialss } = repons;
        this.customers = _customerss.data;
        this.materials = _materialss.data;
        this.options.formState.customers = this.customers;
        this.options.formState.materials = this.materials;
        this.onInitFields();
      });
  }

  ngOnInit() {
    this.getList();
    const dataRouter: any = this._activatedRoute.data;
    this.dataRouter = this._activatedRoute.data;
    this.itemsMenu = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Danh sách đơn hàng', routerLink: '/order/list' },
      { label: dataRouter['_value'].title },
    ];
    if (this.isDialog) {
      this.getDetailOrder();
    } else {
      this.handleParams();
    }

  }

  handleParams() {
    this._activatedRoute.queryParamMap
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((params) => {
      const paramsObject: any = { ...params.keys, ...params };
      const dataRouter = paramsObject.params;
      this.id = dataRouter.id;
      if (this.id) {
        this.getDetailOrder();
      }
    });
  }
  getDetailOrder() {
    this._apiService.getOrdersById(this.id).subscribe(results => {
      if (results) {
        this.model = results;
      }
    });
  }

  submitOrder() {
    if (this.form.valid) {
      this._spinner.show();
      const object: any = this.form.getRawValue()
      this._apiService.createOrder(this.form.getRawValue(), object.id ? 'put' : 'post').subscribe(results => {
        if (results) {
          this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Thành công' });
          this._spinner.hide();
          this.form.reset();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: 'Thất bại' });
          this._spinner.hide();
        }
      });
    }
  }

  addRowOrder() {
    this.model.details.push({
      id: 0,
      order_Id: 0,
      unit: '',
      create_Date: '2023-04-07T02:21:12.921Z',
      update_Date: '2023-04-07T02:21:12.921Z',
      price: 0,
      price_Change: 0,
      quantity: 0,
      amount: 0,
      material_Id: null,
      note: 'string'
    });
    this.model.details = [...this.model.details];
    this.onInitFields();

  }

  onChangeMaterial(field: any, event: any) {
    if (this.materials.length > 0) {
      const material = this.materials.filter(d => d.id === field.model.material_Id);
      field.model.unit = material.length > 0 ? material[0].unit : '';
      field.model.price = material.length > 0 ? material[0].price_Sell : 0;
      this.onInitFields();
    }
  }

  onChangeQuantity(field: any, event: any) {
    if (field.model.quantity > 0) {
      const amount = field.model.price_Change > 0 ? field.model.price_Change * field.model.quantity : field.model.quantity * field.model.price;
      field.model.amount = amount;
      this.model.amount =  this.model.amount + amount;
      this.onInitFields();
    }
  }
}
