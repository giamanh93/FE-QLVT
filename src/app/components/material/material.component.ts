import { Component, OnInit, inject, ChangeDetectorRef, AfterViewInit, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { MessageService } from 'primeng/api';
import queryString from 'query-string';
import { Subject, takeUntil } from 'rxjs';
import { HrmBreadcrumb } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.component';
import { AgGridFn } from 'src/app/common/function/lib';
import { Material } from 'src/app/models/material';
import { MaterialService } from './services/material.services';
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
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };
	private readonly unsubscribe$: Subject<void> = new Subject();
	private $service = inject(MaterialService);
	private $messageService = inject(MessageService);
	private $changeDetech = inject(ChangeDetectorRef);
	public listDatas: Material[] = [];
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
		this.$changeDetech.detectChanges();
	}

	onInitGrid() {
		this.columnDefs = [
			...AgGridFn(this.cols)
		]
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
			{ label: 'Vật tư' },
			{ label: 'Danh sách vật tư' },
		];
		this.getLists();

	}

	getLists() {
		this.isLoading = true;
		this.listDatas = [];
    const queryParams = queryString.stringify(this.query);
		this.$service.getMaterials(queryParams)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(results => {
				if (results.succeeded) {
					this.listDatas = results.data ?? [];
					this.isLoading = false;
					this.fnCountRecord(results.data);
				} else {
					this.listDatas = [];
					this.isLoading = false;
					this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: results.message });
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

	loadjs = 0;
	heightGrid = 0
	ngAfterViewChecked(): void {
		const a: any = document.querySelector(".header");
		const b: any = document.querySelector(".sidebarBody");
		const c: any = document.querySelector(".breadcrumb");
		// const e: any = document.querySelector(".paginator");
		const d: any = document.querySelector(".toolbar");
		this.loadjs++
		if (this.loadjs === 5) {
			if (b && b.clientHeight && d) {
				const totalHeight = a.clientHeight + b.clientHeight + c.clientHeight + d.clientHeight ;
				this.heightGrid = window.innerHeight - totalHeight;
				console.log(this.heightGrid)
				this.$changeDetech.detectChanges();
			} else {
				this.loadjs = 0;
			}
		}
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
