export interface Responses {
    succeeded?: boolean;
    errors?: boolean;
    message?: string;
    data?: any;
    pageNumber?: number;
    pageSize?: number;
    totalPages: number,
    totalRecords: number,
}