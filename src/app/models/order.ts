export interface Order{
    id?: number,
    code?: string,
    create_date?: string,
    update_date?: string,
    amount?: number,
    cust_id?: number,
    custName?: string,
    note?: string,
    details?: OrderDetail[]
};
export interface OrderDetail{
    id?: number,
    order_id?: number,
    price?: number,
    price_change?: number,
    quantity?: number,
    amount?: number,
    note?: string,
    create_date?: string,
    update_date?: string,
    material_id: number,
    materialName: string,
}