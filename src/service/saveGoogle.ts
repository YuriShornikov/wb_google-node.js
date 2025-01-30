import { getGoogleSheet } from "../api/googleApi.js";
import { Tariff } from '../types/types.js'

/**
 * Обновляет данные в Google Sheets.
 * 
 * @param {string[]} spreadsheetIds - Массив идентификаторов Google-таблиц.
 * @param {Tariff[]} data - Данные, которые нужно загрузить в таблицу.
 * @returns {Promise<void>} - Промис, который завершается после обновления данных в таблицах.
 */

export const updateGoogleSheets = async (spreadsheetIds: string[], data: Tariff[]) => {
  	for (const sheetId of spreadsheetIds) {
    	try {
      		const doc = await getGoogleSheet(sheetId);
      		const sheet = doc.sheetsByTitle["stocks_coefs"];

      	if (!sheet) {
        	console.error(`Лист stocks_coefs не найден в таблице ${sheetId}`);
        	continue;
      	}

      	// Очищаем лист перед записью
      	await sheet.clear();

      	if (data.length > 0) {
        	const headers = Object.keys(data[0]);
        	await sheet.setHeaderRow(headers);
      	}

		// Преобразуем даты
		const CreateTime = (dateStr: string, singl: number) => {
			const date = new Date(dateStr);
			date.setHours(date.getHours() + 3);
			if (singl===0) {
				return date.toISOString().replace("T", " ").split(".")[0];
			} else {
				return date.toISOString().split("T")[0];
			}
		};

      	// Преобразуем объекты Tariff в Record<string, any>
      	const formattedData: Record<string, any>[] = data.map((row) => ({ 
			...row,
			date: CreateTime(row.date, 1),
			dtNextBox: CreateTime(row.dtNextBox, 1),
			dtTillMax: CreateTime(row.dtTillMax, 1),
			createdAt: CreateTime(row.createdAt, 0),
			updatedAt: CreateTime(row.updatedAt, 0),
		}));

      	await sheet.addRows(formattedData);

      	console.log(`Данные загружены в Google-таблицу: ${sheetId}`);
    	} catch (error) {
      		console.error(`Ошибка при обновлении таблицы ${sheetId}:`, error);
    	}
  	}
};