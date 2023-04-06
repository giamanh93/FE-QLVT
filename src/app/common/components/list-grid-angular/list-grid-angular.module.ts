import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ListGridAngularComponent } from './list-grid-angular.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { TotalValueFooterComponent } from '../total-value-component/total-value-component';
import { ButtonAgGridComponent } from '../ag-grid-components/app-button-renderer';
import { MenuModule } from 'primeng/menu';
@NgModule({
    declarations: [ListGridAngularComponent, TotalValueFooterComponent, ButtonAgGridComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        AgGridModule,
        ButtonModule,
        DialogModule,
        MenuModule,

    ],
    entryComponents: [],
    exports: [
        ListGridAngularComponent,
        ButtonAgGridComponent
    ],
    providers: []
})
export class ListGridAngularModule {}