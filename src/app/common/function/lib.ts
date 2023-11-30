import moment from "moment";

export function AgGridFn(lists: Array<any>) {
  const arrAgGrids = [];
  for (const value of lists) {
    let row: any = null;

    if (value.typeField === 'image') {
      row = {
        headerName: value.header,
        field: value.field,
        // headerClass: 'BGE8E9ED',
        filter: value.isFilter ? 'agTextColumnFilter' : '',
        sortable: false,
        width: value.width,
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        // cellRenderer: "avatarRendererFull",
        headerTooltip: value.note,
        tooltipField: value.field,
        // cellClass: ['text-center', 'text-right', 'border-right', 'd-flex', 'align-items-center', 'justify-content-center'],
        // valueFormatter: value.typeField == 'decimal' ? ""
      };
    } else if (value.typeField === 'image') {
      row = {
        headerName: value.header,
        field: value.field,
        // headerClass: 'BGE8E9ED',
        filter: value.isFilter ? 'agTextColumnFilter' : '',
        sortable: false,
        width: value.width,
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        cellRenderer: 'avatarRendererFull',
        headerTooltip: value.note,
        tooltipField: value.field,
        cellClass: ['text-center', 'text-right', 'border-right', 'd-flex', 'align-items-center', 'justify-content-center'],
        // valueFormatter: value.typeField == 'decimal' ? ""
      };
    } else if (value.typeField === 'check') {
      row = {
        headerName: value.header,
        field: value.field,
        cellClass: value.cellClass,
        // headerClass: 'BGE8E9ED',
        filter: value.isFilter ? 'agTextColumnFilter' : '',
        sortable: false,
        width: value.width,
        cellRenderer: (params: any) => {
          return `<span class="custom-control custom-checkbox float-left" style="margin-top: 7%;">
                    <input type="checkbox" ${params.value ? 'checked' : ''} disabled class="custom-control-input"  >
                    <label class="custom-control-label"></label>
                  </span>`;
        },
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        headerTooltip: value.note,
      };
    } else if (value.typeField === 'decimal') {
      row = {
        headerName: value.header,
        field: value.field,
        cellClass: value.cellClass || [],
        // headerClass: value.headerClass ? value.headerClass : 'BGE8E9ED',
        cellStyle: value.cellStyle,
        // cellClassRules: value.conditionClass,
        // filter: 'agSetColumnFilter',
        sortable: true,
        aggFunc: value.aggFunc,
        width: value.width,
        rowGroup: value.rowGroup,
        rowGroupIndex: value.rowGroupIndex,
        filterParams: {
          caseSensitive: true,
          textFormatter: (r: any) => TextFormatter(r),
          cellRenderer: cellRendererSanPham,
        },
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        cellRenderer: value.masterDetail ? 'agGroupCellRenderer' : '',
        editable: value.editable ? value.editable : false,
        // aggFunc: 'sum',
        tooltipField: value.field,
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
        headerTooltip: value.note,
        headerClass: value.headerClass,
        valueFormatter: formatMargin
      };
    } else if (value.typeField === 'datetime') {
      row = {
        headerName: value.header,
        field: value.field,
        cellClass: value.cellClass || [],
        // headerClass: value.headerClass ? value.headerClass : 'BGE8E9ED',
        cellStyle: value.cellStyle,
        // cellClassRules: value.conditionClass,
        // filter: 'agSetColumnFilter',
        sortable: true,
        aggFunc: value.aggFunc,
        width: value.width,
        rowGroup: value.rowGroup,
        rowGroupIndex: value.rowGroupIndex,
        filterParams: {
          caseSensitive: true,
          textFormatter: (r: any) => TextFormatter(r),
          cellRenderer: cellRendererSanPham,
        },
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        editable: value.editable ? value.editable : false,
        // aggFunc: 'sum',
        tooltipField: value.field,
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
        headerTooltip: value.note,
        headerClass: value.headerClass,
        cellRenderer: (data: any) => {
          return data.value ? moment(new Date(data.value)).format('DD/MM/YYYY HH:mm') : '';
        }
      };
    } else {
      row = {
        width: value.width,
        // headerClass: 'BGE8E9ED',
        headerName: value.header,
        field: value.field,
        cellClass: value.cellClass,
        // filter: 'agSetColumnFilter',
        sortable: true,
        rowGroup: value.rowGroup,
        rowGroupIndex: value.rowGroupIndex,
        editable: value.editable ? value.editable : false,
        filterParams: {
          caseSensitive: true,
          textFormatter: (r: any) => TextFormatter(r),
          cellRenderer: cellRendererSanPham,
        },
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
        columnsMenuParams: {
          suppressColumnFilter: true,
        },
        cellRenderer: value.masterDetail ? 'agGroupCellRenderer' : '',
        hide: value.isHide ? true : false,
        pinned: value.pinned,
        tooltipField: value.field,
        headerTooltip: value.note,
        headerClass: value.headerClass,
      };
    }

    arrAgGrids.push(row);
  }
  return arrAgGrids;
}

export function formatMargin(params: any) {
  const numb = +params.value;
  return Number(numb).toLocaleString('en-GB');
}

export function cellRendererSanPham(params: any) {
  const rowData = [];
  if (!params.value || params.value === '(Select All)') {
    return params.value;
  }
  params.api.forEachNodeAfterFilter((node: any) => {
    rowData.push(node.data);
  });
  return params.value;
}

export function TextFormatter(r: any) {
  if (r == null) {
    return null;
  }
  return r
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/æ/g, 'ae')
    .replace(/ç/g, 'c')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/ñ/g, 'n')
    .replace(/[òóôõö]/g, 'o')
    .replace(/œ/g, 'oe')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y');
}

export function autoSizeAllGrid(skipHeader: boolean, gridColumnApi: any) {
  const allColumnIds: string[] = [];
  gridColumnApi.getColumns()!.forEach((column: any) => {
    allColumnIds.push(column.getId());
  });
  gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
}
