import "dotenv/config";
import { updateTariffs } from "./service/saveTariffs.js";
import { saveGoogleSheets } from "./service/google.js";

let isUpdating = false;

// Получаем id гугл таблиц
const googleSheetIds = process.env.GOOGLE_SHEET_IDS?.split(",") || [];

/**
 * Запускает процесс обновления тарифов и синхронизации с Google Sheets.
 * Предотвращает повторный запуск, если обновление уже выполняется.
 */

// Функция для старта обновления тарифов
const start = async () => {

    // Если обновление уже в процессе, не запускаем снова
    if (isUpdating) return;
    isUpdating = true;
    try {
        console.log("Обновление тарифов коробов запущено...");

        await updateTariffs();
        console.log("Обновление завершено.");

        // Синхронизируем данные с Google Sheets
        console.log("Выгрузка данных в Google Sheets...");
        await saveGoogleSheets(googleSheetIds);
        
    } catch (error) {
        console.error("Ошибка в процессе обновления:", error);
    } 
};

setInterval(updateTariffs, 60 * 60 * 1000);
setInterval(() => saveGoogleSheets(googleSheetIds), 60 * 60 * 1000);

// Запускаем обновление тарифов
start();
