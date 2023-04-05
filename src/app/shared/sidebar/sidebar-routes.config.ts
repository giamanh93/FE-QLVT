export const menus = [
  {
      label: 'Hệ thống cảnh báo sớm',
      code: "early-warning-system",
      icon: 'pi pi-user',
      class: 'navigation-header',
      // routerLink: 'early-warning-system',
      items: [
          { label: '1. Nhóm cảnh báo liên quan đến sản phẩm', routerLink: '/early-warning-system/group-warning-product', class: 'nav-item', },
          { label: '2. Nhóm cảnh báo liên quan đến khách hàng', routerLink: '/early-warning-system/group-warning-customer', class: 'nav-item', },
          { label: '3. Nhóm cảnh báo liên quan đến chốt quầy', routerLink: '/early-warning-system/group-warning-counter', class: 'nav-item', },
          { label: '4. Nhóm cảnh báo liên quan đến nhà cung cấp', routerLink: '/early-warning-system/group-warning-supplier', class: 'nav-item', },
      ]
  },
  {
      label: 'Hệ thống kiểm soát',
      code: 'control-system',
      icon: 'pi pi-qrcode',
      class: 'navigation-header',
      items: [
          { label: '1. Kiểm soát công nợ nhà cung cấp', routerLink: '/control-system/take-control-debt-supplier', class: 'nav-item' },
          { label: '2. Kiểm soát công nợ khách hàng', routerLink: '/control-system/take-control-debt-customer', class: 'nav-item' },
          { label: '3. Kiểm soát thất thoát hàng hóa', routerLink: '/control-system/take-control-loss-product', class: 'nav-item' },
          { label: '4. Kiểm soát thất thoát thu ngân', routerLink: '/control-system/take-control-loss-counter', class: 'nav-item' },
          { label: '5. Kiểm soát chi phí', routerLink: '/control-system/take-control-costs', class: 'nav-item' },
      ] 
  },

  {
      label: 'Hệ thống quản trị nhà cung cấp',
      code: 'supplier-mgmt-system',
      icon: 'pi pi-box',
      class: 'navigation-header',
      items: [
          { label: '1. Theo dõi lợi nhuận sản phẩm nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-profit-product-supplier', class: 'nav-item' },
          { label: '2. Theo dõi sản phẩm hỏng hủy theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-product-cancel-supplier', class: 'nav-item' },
          { label: '3. Theo dõi hiệu quả chiến dịch khuyến mãi từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-effective-promotion-supplier', class: 'nav-item' },
          { label: '4. Theo dõi lượng hàng tồn theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-inventory-supplier', class: 'nav-item' },
      ]
  },
  // 0200f578-4b8e-45e8-99eb-c5446db7efb6

  {
      label: 'Hệ thống quản trị khách hàng',
      code: 'customer-mgmt-system',
      icon: 'pi pi-file',
      class: 'navigation-header',
      items: [
          { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product', class: 'nav-item' },
          { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle', class: 'nav-item' },
          { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value', class: 'nav-item' },
          { label: '4. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area', class: 'nav-item' },
        //   { label: '5. Theo dõi theo hình thức mua hàng', routerLink: '/customer-mgmt-system/follow-form-shopping', class: 'nav-item' },

      ]
  },
  // 7f991b49-4816-4b89-ba83-4996cfc8966e
  
  {
      label: 'Hệ thống đối soát tài chính',
      code: 'financial-control-system',
      icon: 'pi pi-file',
      class: 'navigation-header',
      items: [
          { label: '1. Đối soát dòng tiền với doanh số', routerLink: '/financial-control-system/review-revenue-with-flow-of-money', class: 'nav-item' },
          { label: '2. Đối Soát Thực trả nhà cung cấp', routerLink: '/cai-dat/quan-ly-ngay-nghi', class: 'nav-item' },
          { label: '3. Kiểm soát công nợ nhà cung cấp', routerLink: '/cai-dat/quan-ly-ngay-nghi', class: 'nav-item' },
          { label: '4. Kiểm soát công nợ khách hàng', routerLink: '/cai-dat/quan-ly-ngay-nghi', class: 'nav-item' },
          { label: '5. Theo dõi công nợ nhà cung cấp', routerLink: '/cai-dat/quan-ly-ngay-nghi', class: 'nav-item' },
         
      ]
  },
  // a68dc8d0-707e-4446-b397-622ecc7eceb4


];



