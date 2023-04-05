import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CalendarModule} from 'primeng/calendar';
import { AgGridModule } from 'ag-grid-angular';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { ExcelService } from 'src/app/services/excel.service';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerService } from './services/customer.services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CustomersRoutingModule,
        HrmBreadCrumbModule,
        SkeletonModule,
        DropdownModule,
        PaginatorModule,
        ToolbarModule,
        OverlayPanelModule,
        CalendarModule,
        ListGridAngularModule,
        LoadingGridModule,
        AgGridModule
        
    ],
    providers: [
        CustomerService,
        ExcelService
    ],
    declarations: [
        CustomersComponent
     ]
})
export class CustomersModule { }
