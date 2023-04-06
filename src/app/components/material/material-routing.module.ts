import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialComponent } from './material.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MaterialComponent },
        { path: 'list', component: MaterialComponent },
        
    ])],
    exports: [RouterModule]
})
export class MaterialRoutingModule { }
