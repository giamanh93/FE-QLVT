import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RowNode } from 'ag-grid-community';
import { MessageService } from 'primeng/api';
import { Subject, } from 'rxjs';
import { TotalValueFooterComponent } from '../total-value-component/total-value-component';
@Component({
  selector: 'app-list-grid-angular',
  templateUrl: './list-grid-angular.component.html',
  styleUrls: ['./list-grid-angular.component.css']
})
export class ListGridAngularComponent implements OnInit, OnChanges {
  @Input() listsData: Array<any> = [];
  @Output() FnClick = new EventEmitter<any>();
  @Output() rowDoubleClicked = new EventEmitter<any>();
  @Output() firstDataRendered = new EventEmitter<any>();
  @Output() cellDoubleClicked = new EventEmitter<any>();
  @Output() onRowSelectedCallback = new EventEmitter<any>();
  @Output() rowGroupOpenedCallback = new EventEmitter<any>();
  @Output() onCellClicked = new EventEmitter<any>();
  @Output() callback = new EventEmitter<any>();
  @Output() showConfig = new EventEmitter<any>();
  @Input() columnDefs: Array<any> = [];
  @Input() masterDetail: boolean = false;
  @Input() isConfig: boolean = true;
  @Input() rowSelection: string = 'single';
  @Input() frameworkComponents = {};
  @Input() getRowId:any = null;
  @Input() detailCellRendererParams: any = null;
  @Input() autoGroupColumnDef: any = {};
  @Input() rowClassRules: any;
  @Input() noRowsTemplate: any = 'Không có kết quả phù hợp';
  @Input() floatingFilter: boolean = false;
  @Input() groupDefaultExpanded: number = 1;;
  @Input() buttons = [];
  @Input() isShowButton: boolean = false;
  @Input() isShowTotalBottom: boolean = false;
  @Input() title: string = '';
  @Input() idGrid: string = 'myGrid';
  @Input() typeConfig: string = 'myGrid';
  @Input() columnsWithAggregation: any[] = []; // danh sách sum bottom
  @Input() defaultColDef: any = {
    tooltipComponent: 'customTooltip',
    resizable: true,
    suppressSorting: false,
    sortable: false,
    filter: true,
    // floatingFilter: true,
    flex: 1,
    rowHeight: 90,
    cellClass: [],
    tooltipComponentParams: { color: '#ececec' },
  };;
  @Input() domLayout: string = '';
  @Input() height: number = 0;
  @Input() heightRow: number = 37;
  @Input() headerHeight: number = 35;
  @Input() floatingFiltersHeight: number = 35;
  @Input() getContextMenuItems: any = null;
  @Input() pinnedBottomData: any[] = [];
  @Input() excelStyles: any[] = [
    {
      id: 'stringType',
      dataType: 'string'
    },
    {
      id: 'dateFormat',
      dataType: 'dateTime',
      numberFormat: { format: 'mm/dd/yyyy;@' },
    },
    {
      id: 'text-right',
      dataType: 'number',
      numberFormat: { format: '#,##0' },
    }
  ];
  sideBar: any
  gridApi: any;
  getRowHeight: any;
  gridColumnApi: any;
  heightAuto = 0;
  tooltipShowDelay = 0;
  titlePage = '';
  listsDataCloone = [];
  isRowMaster: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,

  ) {
    this.tooltipShowDelay = 0
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Ẩn hiện cột',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: false,
            suppressValues: false,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
            suppressSyncLayoutWithGrid: true,
            suppressColumnMove: false,
          },
        },
      ],
      defaultToolPanel: '',
    };

    this.getRowHeight = (params: any) => {
      if (params.node && params.node.detail) {
        var offset = 80;
        var allDetailRowHeight = params.data.childrens.length > 5 ? params.data.childrens.length * 37 : 200;
        return allDetailRowHeight + offset;
      } else {
        return 37;
      }
    };

    this.isRowMaster = (dataItem: any) => {
      if (dataItem) {
        if (dataItem.Details) {
          return dataItem && dataItem.Details ? dataItem.Details.length > 0 : false;
        } else {
          return false
        }
      } else {
        return false
      }

    };
  }

  ngOnInit(): void {
  }

  CellClicked(event: any) {
    this.onCellClicked.emit(event);
  }

  rowGroupOpened(event: any) {
    this.rowGroupOpenedCallback.emit(event);
  }

  onRowSelected(event: any) {
    this.rowGroupOpenedCallback.emit(event);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {
      if(this.isShowTotalBottom) {
        let pinnedBottomData = this.generatePinnedBottomData();
        this.gridApi.setPinnedBottomRowData([pinnedBottomData]);
      }
      this.autoSizeAll(false)
    }, 100);
    // window.onresize = () => {
    //   this.gridApi.sizeColumnsToFit();
    // }
  }

  generatePinnedBottomData() {
    // generate a row-data with null values
    let result: any = {};
    this.gridColumnApi.getAllGridColumns().forEach((item: any) => {
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    //**list of columns fo aggregation**
    this.columnsWithAggregation.forEach(element => {
      this.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        //if(rowNode.index < 10){
        //console.log(rowNode);
        //}
        if(element === 'customerName') {
          target[element] = `Khách hàng: ${this.listsData.length} `
        }else if(element === 'areaName') {
          target[element] = `Khu vực: ${this.listsData.length} `
        }else if(element === 'purchaseDate') {
          target[element] = `Count: ${this.listsData.length} `
        }else {
          if (rowNode.data &&  rowNode.data[element])
          target[element] += Number(rowNode.data[element].toFixed(2));
        }
      });
      // if (target[element])
      //     target[element] = target[element].toFixed(2);
    })

    return target;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('groupDefaultExpanded') && this.gridApi) {
      changes['groupDefaultExpanded']['currentValue'] === 1 ? this.gridApi.expandAll() : this.gridApi.collapseAll();
    }
    this.heightAuto = this.height;
  }

  onGridSizeChanged(params: any) {
    // option chưa dùng được
    // get the current grids width
    var gridWidth: any = document.getElementById(this.idGrid);
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth.offsetWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }

    // show/hide columns based on current grid width
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);

    // fill out any available space to ensure there are no gaps
    params.api.sizeColumnsToFit();
  }

  private readonly unsubscribe$: Subject<void> = new Subject();
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFirstDataRendered() {
    this.gridApi.sizeColumnsToFit()
  }


  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

 
}
