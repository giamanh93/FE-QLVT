export const menus = [
  {
    label: 'Khách hàng',
    code: 'customer',
    icon: 'pi pi-user',
    class: 'navigation-header',
    // routerLink: 'early-warning-system',
    items: [
      {label: 'Quản lý khách hàng', routerLink: '/customer/list', class: 'nav-item'},

    ]
  },
  {
    label: 'Nhà cung cấp',
    code: 'supplier',
    icon: 'pi pi-user',
    class: 'navigation-header',
    // routerLink: 'early-warning-system',
    items: [
      {label: 'Danh sách Nhà cung cấp', routerLink: '/supplier/list', class: 'nav-item'},

    ]
  },
  {
    label: 'Vật tư',
    code: 'material',
    icon: 'pi pi-user',
    class: 'navigation-header',
    // routerLink: 'early-warning-system',
    items: [
      {label: 'Quản lý vật tư', routerLink: '/material/list', class: 'nav-item'},

    ]
  },
  {
    label: 'Đơn Nhập/Xuất',
    code: 'order',
    icon: 'pi pi-user',
    class: 'navigation-header',
    // routerLink: 'early-warning-system',
    items: [
      {label: 'Danh sách đơn hàng', routerLink: '/order/list', class: 'nav-item'},

    ]
  },


];



