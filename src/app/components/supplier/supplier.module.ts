import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { DialogModule } from 'primeng/dialog';
import { NzFormLyModule } from 'src/app/common/components/formLy/nzFormLy.module';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [
    SupplierPageComponent,
    SupplierDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    SupplierRoutingModule,
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
    FormlyModule.forRoot(),
  ],
  providers: [
    SupplierService
  ]
})
export class SupplierModule { }
