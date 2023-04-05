import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
// { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product' },
// { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle' },
// { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value' },
// { label: '4. Theo dõi theo hình thức mua hàng', routerLink: '/customer-mgmt-system/follow-form-shopping' },
// { label: '5. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area' },
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CustomersComponent },
        
    ])],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }
