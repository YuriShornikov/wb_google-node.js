import { fetchTariffs } from '../api/wbApi.js';
import { db } from '../config/db.js';
import { Warehouse, Tariff } from '../types/types.js';

/**
 * Обновляет тарифы коробов в базе данных.
 *
 * @returns {Promise<void>} - Возвращает промис, который завершается после обновления тарифов.
 */

export async function updateTariffs(): Promise<void> {

    try {
        // Запрашиваем данные из API
        const warehouseList: Warehouse[] = await fetchTariffs();

        // Преобразуем данные перед записью в БД
        const formattedData: Tariff[] = warehouseList.map((warehouse) => {
            return {
                warehouseName: warehouse.warehouseName,
                boxDeliveryAndStorageExpr: parseFloat(warehouse.boxDeliveryAndStorageExpr).toString(),
                boxDeliveryBase: parseFloat(warehouse.boxDeliveryBase).toString(),
                boxDeliveryLiter: parseFloat(warehouse.boxDeliveryLiter).toString(),
                boxStorageBase: parseFloat(warehouse.boxStorageBase).toString(),
                boxStorageLiter: parseFloat(warehouse.boxStorageLiter).toString(),
                date: new Date().toISOString().split("T")[0],
                dtNextBox: warehouse.dtNextBox || new Date().toISOString().split("T")[0],
                dtTillMax: warehouse.dtTillMax || new Date().toISOString().split("T")[0],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        });

        await db("tariffs")
            .insert(formattedData)
            .onConflict(["warehouseName", "date"])
            .merge({ 
                updatedAt: new Date().toISOString()
        });

        console.log("Тарифы успешно обновлены.");
    } catch (error) {
        console.error("Ошибка при обновлении тарифов:", error);
    }
}