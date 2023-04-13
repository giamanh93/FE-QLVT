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
import { AgGridModule } from 'ag-grid-angular';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { ExcelService } from 'src/app/services/excel.service';
import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { DetailMaterialComponent } from './detail-material/detail-material.component';
import { DialogModule } from 'primeng/dialog';
import { NzFormLyModule } from 'src/app/common/components/formLy/nzFormLy.module';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyModule } from '@ngx-formly/core';
import { MaterialService } from 'src/app/services/material/material.services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        MaterialRoutingModule,
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
        MaterialService,
        ExcelService
    ],
    declarations: [
      MaterialComponent,
      DetailMaterialComponent
     ]
})
export class MaterialModule { }
