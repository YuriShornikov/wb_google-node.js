export interface Warehouse {
    warehouseName: string;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    dtNextBox: string;
    dtTillMax: string;
}

export interface ApiResponse {
    response: {
        data: {
            dtNextBox: string;
            dtTillMax: string;
            warehouseList: Warehouse[];
        };
    };
}

export interface Tariff extends Warehouse {
    id?: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}
