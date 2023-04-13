import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { ButtonAgGridComponent } from 'src/app/common/components/ag-grid-components/app-button-renderer';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { AgGridFn } from 'src/app/common/function/lib';
import { Customer } from 'src/app/models/customer';
import { MaterialService } from 'src/app/services/material/material.services';
@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss']
  })

export class MaterialComponent implements OnInit, AfterViewInit {
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
  displayAddMaterial: boolean = false;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
  private readonly unsubscribe$: Subject<void> = new Subject();
  private _service = inject(MaterialService);
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
	{ field: "name", header: "Tên vật tư", typeField: 'text' },
	{ field: "unit", header: "Đơn vị", typeField: 'text' },
	{ field: "price_Sell", header: "Đơn giá bán", typeField: 'decimal' },
	{ field: "total_Weight", header: "Tổng KL", typeField: 'decimal' },
	{ field: "total_Weight_Sell", header: "Tổng KL bán", typeField: 'decimal' },
	{ field: "total_Weight_Renaining", header: "Tổng KL còn lại", typeField: 'text' },
	{ field: "total_Invest_Amount", header: "Tổng mức đầu tư", typeField: 'text' },
	{ field: "supplier", header: "NCC", typeField: 'text' },
	{ field: "price_Buy", header: "Đơn giá mua", typeField: 'text' },
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
    this.displayAddMaterial = true;
  }

  delRow($event: any) {
    this._confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này?',
      accept: () => {
        this._service.deleteMaterialById($event.rowData.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((results: any) => {
            if (results) {
              this._messageService.add({ severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công' });
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
      { label: 'vật tư' },
      { label: 'Danh sách vật tư' },
    ];
    this.getLists();

  }

  getLists() {
    this.isLoading = true;
    this.listDatas = [];
    const queryParams = queryString.stringify(this.query);
    this._service.getMaterials(queryParams)
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
	this.idRow = 0
    this.displayAddMaterial = true;
  }

  callback() {
    this.displayAddMaterial = false;
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
