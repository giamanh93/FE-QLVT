import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { ButtonAgGridComponent } from 'src/app/common/components/ag-grid-components/app-button-renderer';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { AgGridFn } from 'src/app/common/function/lib';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from './services/customer.services';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit, AfterViewInit {
  itemsBreadcrumb: HrmBreadcrumb[] = [];
  indexTab: number = 0;
  screenWidth: number = 0;
  countRecord: any = {
    totalRecord: 0,
    currentRecordStart: 0,
    currentRecordEnd: 0
  }
  idRow: number = 0;
  loadjs: number = 0;
  heightGrid: number = 0;
  displayAddCustomer: boolean = false;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
  private readonly unsubscribe$: Subject<void> = new Subject();
  private _service = inject(CustomerService);
  private _messageService = inject(MessageService);
  private _changeDetech = inject(ChangeDetectorRef);
  private _confirmationService = inject(ConfirmationService);
  public listDatas: Customer[] = [];
  public listDatasLoading: any[] = Array(20).fill(1).map((x, i) => i);
  public isLoading: boolean = false;
  public query: any = {}
  public autoGroupColumnDef: ColDef = {
    minWidth: 300,
    cellRendererParams: {
      footerValueGetter: (params: any) => {
        const isRootLevel = params.node.level === -1;
        if (isRootLevel) {
          return 'Grand Total';
        }
        return `Sub Total (${params.value})`;
      },
    }
  };
  public columnDefs: ColDef[] = [];
  public cols: any[] = [
    { field: "id", header: "Mã Id", typeField: 'text' },
    { field: "name", header: "Khách hàng", typeField: 'text' },
    { field: "phone", header: "Số điện thoại", typeField: 'text' },
    { field: "total_Purchase_Amount", header: "Tổng tiền mua hàng", typeField: 'decimal' },
    { field: "total_Paid_Amount", header: "Tổng tiền đã trả", typeField: 'decimal' },
    { field: "total_Debt_Amount", header: "Tổng tiền còn thiếu", typeField: 'decimal' },
    { field: "active", header: "Trạng thái", typeField: 'text' },
    { field: "note", header: "Ghi chú", typeField: 'text' },
  ];

  ngAfterViewInit() {
    this._changeDetech.detectChanges();
  }

  onInitGrid() {
    this.columnDefs = [
      ...AgGridFn(this.cols),
      {
        headerName: 'Action',
        width: 100,
        pinned: 'right',
        cellRenderer: ButtonAgGridComponent,
        cellClass: ['border-right', 'no-auto'],
        cellRendererParams: (params: any) => this.showButtons(params),
        checkboxSelection: false,
        field: 'checkbox'
      }
    ]
  }

  showButtons(event: any) {
    return {
      buttons: [
        {
          onClick: this.editRow.bind(this),
          label: 'Xem chi tiết',
          icon: 'pi pi-check',
          class: 'btn-primary mr5',
        },
        {
          onClick: this.delRow.bind(this),
          label: 'Xóa',
          icon: 'pi pi-trash',
          class: 'btn-primary mr5',
        },

      ]
    };
  }

  editRow($event: any) {
    this.idRow = $event.rowData.id;
    this.displayAddCustomer = true;
  }

  delRow($event: any) {
    this._confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này?',
      accept: () => {
        this._service.deleteCustomerById($event.rowData.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((results: any) => {
            if (results.status === 'success') {
              this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: results.data ? results.data : 'Xóa thành công' });
              this.getLists();
            } else {
              this._messageService.add({ severity: 'error', summary: 'Thông báo', detail: results ? results.message : null });
            }
          });
      }
    });
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.onInitGrid()
    this.screenWidth = window.innerWidth;
    this.itemsBreadcrumb = [
      { label: 'Trang chủ', routerLink: '/home' },
      { label: 'Khách hàng' },
      { label: 'Danh sách khách hàng' },
    ];
    this.getLists();

  }

  getLists() {
    this.isLoading = true;
    this.listDatas = [];
    const queryParams = queryString.stringify(this.query);
    this._service.getCustomers(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.succeeded) {
          this.listDatas = results.data ?? [];
          this.isLoading = false;
          this.fnCountRecord(results.data);
        } else {
          this.listDatas = [];
          this.isLoading = false;
          this._messageService.add({ severity: 'error', summary: 'Error Message', detail: results.message });
        }
      })
  }

  first: number = 1;
  paginate(event: any) {
    this.query.page = event.page + 1;
    this.first = event.first;
    this.query.size = event.rows;
    this.getLists();
  }

  fnCountRecord(results: any) {
    this.countRecord.totalRecord = results.totalElements;
    this.countRecord.currentRecordStart = this.query.page === 1 ? this.query.page = 1 : this.countRecord.currentRecordEnd;
    this.countRecord.currentRecordEnd = this.query.page === 1 ? this.query.size : this.query.page * Number(this.query.size)
  }

  ngAfterViewChecked(): void {
    const a: any = document.querySelector(".header");
    const b: any = document.querySelector(".sidebarBody");
    const c: any = document.querySelector(".breadcrumb");
    // const e: any = document.querySelector(".paginator");
    const d: any = document.querySelector(".toolbar");
    this.loadjs++
    if (this.loadjs === 5) {
      if (b && b.clientHeight && d) {
        const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight + 25;
        this.heightGrid = window.innerHeight - totalHeight;
        console.log(this.heightGrid)
        this._changeDetech.detectChanges();
      } else {
        this.loadjs = 0;
      }
    }
  }

  addCustomer() {
    this.displayAddCustomer = true;
  }

  callback() {
    this.displayAddCustomer = false;
    this.getLists();
  }

  getContextMenuItems(params: any) {
    var result = [
      'copy',
      'paste',
      'separator',
      'excelExport'
    ];
    return result;
  }

}
