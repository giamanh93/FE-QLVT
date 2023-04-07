import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  template: `
     <div class="table-responsive flex justify-content-center">
 <table class="table table-hover table_detail p-datatable-striped">
   
   <thead>
     <tr *ngFor="let f of field.fieldGroup; let i = index;">
        <th scope="col"  *ngIf="i=== 0">Stt</th>
        <ng-container *ngFor="let f1 of f.fieldGroup; let idx = index;">
            <th scope="col"  *ngIf="i=== 0">{{f1.props.label}}</th>
        </ng-container>
        <th scope="col"  *ngIf="i=== 0">Action</th>

     </tr>
   </thead>
   
   <tbody>
     <tr *ngFor="let f of field.fieldGroup; let i = index;">
     <td class="flex">
            {{i+1}}
       </td>
       <td *ngFor="let f1 of f.fieldGroup; let idx = index;">
         <formly-field class="flex-1"  [field]="f1"></formly-field>
       </td>
       <td class="flex">
            <p-button icon="pi pi-times" styleClass="p-button-sm p-button-danger" (click)="remove(i)"></p-button>
       </td>
     </tr>
   </tbody>

 </table>
</div>
  `,
})
export class ArrayTypeComponent extends FieldArrayType {}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */


