import axios from 'axios';
import { Warehouse } from '../types/types.js';
import { ApiResponse } from '../types/types.js'



const WB_API_URL = process.env.WB_API_URL;
const WB_API_KEY = process.env.WB_API_KEY;

if (!WB_API_URL || !WB_API_KEY) {
  throw new Error("API URL или API-ключ не установлены!");
}

/**
 * Запрашивает тарифы складов из API Wildberries.
 * 
 * @returns {Promise<Warehouse[]>} - Промис с массивом объектов складов.
 */

export const fetchTariffs = async (): Promise<Warehouse[]> => {
  	try {

		// Формируем текущую дату и время
		const now = new Date();
		const currentDate = now.toISOString().split("T")[0];
		const currentTime = now.toLocaleTimeString("ru-RU", { hour12: false });

		console.log(`Дата запроса: ${currentDate}, Время запроса: ${currentTime}`);

		const response = await axios.get<ApiResponse>(WB_API_URL, {
			headers: {
				Authorization: `Bearer ${WB_API_KEY}`,
				Accept: 'application/json',
				'Content-Type': 'application/json', 
				'User-Agent': 'axios/1.7.9',
				'Accept-Encoding': 'gzip, compress, deflate, br'
			},
			params: {
				date: currentDate
			}
    	});
    	return response.data.response.data.warehouseList;
  	} catch (error) {
    	console.error("Error fetching tariffs:", error);
    	return [];
  	}
};