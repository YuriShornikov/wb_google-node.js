import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import "dotenv/config";

// Загружаем сервисный аккаунт
const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || "{}");

/**
 * Создает и возвращает экземпляр Google Sheets API.
 *
 * @param {string} spreadsheetId - Идентификатор Google-таблицы.
 * @returns {Promise<GoogleSpreadsheet>} - Экземпляр Google-таблицы с загруженной информацией.
 */

// Функция для создания экземпляра Google Sheets API
export const getGoogleSheet = async (spreadsheetId: string) => {
  	const auth = new JWT({
    	email: credentials.client_email,
    	key: credentials.private_key,
    	scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  	});

  	// Передаем и авторизацию, и ID таблицы
  	const doc = new GoogleSpreadsheet(spreadsheetId, auth);

  	await doc.loadInfo();
  
  	return doc;
};
