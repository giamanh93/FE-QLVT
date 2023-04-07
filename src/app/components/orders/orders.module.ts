import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { ExcelService } from 'src/app/services/excel.service';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderService } from './services/order.services';
import { DialogModule } from 'primeng/dialog';
import { NzFormLyModule } from 'src/app/common/components/formLy/nzFormLy.module';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyModule } from '@ngx-formly/core';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { CustomerService } from '../customers/services/customer.services';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MaterialService } from '../material/services/material.services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        ReactiveFormsModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        OrdersRoutingModule,
        HrmBreadCrumbModule,
        SkeletonModule,
        DropdownModule,
        PaginatorModule,
        ToolbarModule,
        OverlayPanelModule,
        CalendarModule,
        ListGridAngularModule,
        LoadingGridModule,
        DialogModule,
        NzFormLyModule,
        FormlyPrimeNGModule,
        CardModule,
        BreadcrumbModule,
        FormlyModule.forRoot(),
    ],
    providers: [
        OrderService,
        CustomerService,
        ExcelService,
        MaterialService
    ],
    declarations: [
        OrdersComponent,
        DetailOrderComponent
     ]
})
export class OrdersModule { }
