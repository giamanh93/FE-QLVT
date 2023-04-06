import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ExcelService } from 'src/app/services/excel.service';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { NzInputComponent } from 'src/app/common/components/formLy/nz-input/nz-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { NzTextareaComponent } from './nz-textarea/nz-textarea.component';
import { InputTextareaModule } from 'primeng/inputtextarea';




export function phoneValidator(control: AbstractControl): any {
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return (!regex.test(control.value)) ? { phoneError: true } : null;
  }


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StyleClassModule,
        DropdownModule,
        CalendarModule,
        InputTextModule,
        InputTextareaModule,
        FormlyPrimeNGModule,
        
        FormlyModule.forRoot({
            validators: [{ name: 'phoneError', validation: phoneValidator }],
            types: [
                {
                    name: 'nzInput',
                    component: NzInputComponent,
                    extends:'input',
                 
                },
                {
                    name: 'nzTextarea',
                    component: NzTextareaComponent,
                    extends:'textarea',
                 
                }
            ],
            validationMessages: [
                { name: 'required', message: 'This field is required' },
                { name: 'phoneError', message: "Số điện thoại không hợp lệ" },
            ],
        }),

    ],
    providers: [
        ExcelService
    ],
    declarations: [
        NzInputComponent,
        NzTextareaComponent
    ]
})
export class NzFormLyModule { }
