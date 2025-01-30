import { getSortedTariffs } from "../config/dbSort.js";
import { updateGoogleSheets } from "./saveGoogle.js";

/**
 * Синхронизирует данные тарифов с Google Sheets.
 * 
 * @param {string[]} googleSheetIds - Массив идентификаторов Google-таблиц для синхронизации.
 * 
 */

export const saveGoogleSheets = async (googleSheetIds: string[]) => {
  	try {
    	console.log("Начинаем выгрузку данных в Google-таблицы...");

    	const data = await getSortedTariffs();

    	if (data.length === 0) {
      		console.warn("Данных для выгрузки нет.");
      	return;
    }

    await updateGoogleSheets(googleSheetIds, data);

    console.log("Выгрузка завершена.");
  	} catch (error) {
    	console.error("Ошибка при выгрузке:", error);
  	}
};
