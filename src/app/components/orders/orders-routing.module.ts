import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { OrdersComponent } from './orders.component';
// { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product' },
// { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle' },
// { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value' },
// { label: '4. Theo dõi theo hình thức mua hàng', routerLink: '/customer-mgmt-system/follow-form-shopping' },
// { label: '5. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area' },
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrdersComponent },
        { path: 'list', component: OrdersComponent },
        {
            path: 'list/create-order'
            , component: DetailOrderComponent
            , data: {
                title: 'Tạo mới đơn hàng',
                url: 'create-order',
            },
        },
        {
            path: 'list/update-order'
            , component: DetailOrderComponent
            , data: {
                title: 'Chỉnh sửa đơn hàng',
                url: 'create-order',
            },
        },

    ])],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
