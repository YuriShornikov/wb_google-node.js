import { db } from "../config/db.js";

/**
 * Представление объекта тарифа.
 * 
 * @typedef {Object} Tariff
 * 
 * @returns {Promise<Tariff[]>} - Массив объектов тарифов.
 */

/**
 * Получает отсортированный список тарифов по базовой стоимости доставки.
 * 
 * @returns {Promise<Tariff[]>} - Массив отсортированных объектов тарифов.
 */

export const getSortedTariffs = async () => {
    const tariffs = await db("tariffs").select("*");

    return tariffs.sort((a, b) => parseFloat(a.boxDeliveryBase) - parseFloat(b.boxDeliveryBase));
};
