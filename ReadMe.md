1. Запустить npm i
2. Создать базу данных
3. Создать файл .env прописать значение:
`
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=пароль
DB_NAME=имя базы данных
DB_PORT=5432
DB_URL=пароль
WB_API_URL=https://common-api.wildberries.ru/api/v1/tariffs/box
WB_API_KEY=ключ
GOOGLE_SHEETS_CREDENTIALS=' - в формате ниже
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\n \n-----END PRIVATE KEY-----\n",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/",
  "universe_domain": "googleapis.com"
}
'
GOOGLE_SHEET_IDS='id1,id2,id3...' - в одинарных кавычках заполнить id каждой необходимой гугл таблицы через запятую без пробелов
`
4. Создание файла для миграции если его нет: `npx knex migrate:make create_tariffs_table --knexfile=knexfile.js`
Прописать внутри:
`
exports.up = function(knex) {
    return knex.schema.createTable('tariffs', function(table) {
      table.increments('id').primary();
      table.date('date').notNullable();
      table.text('warehouseName').notNullable();
      table.text('boxDeliveryAndStorageExpr').notNullable();
      table.text('boxDeliveryBase').notNullable();
      table.text('boxDeliveryLiter').notNullable();
      table.text('boxStorageBase').notNullable();
      table.text('boxStorageLiter').notNullable();
      table.date('dtNextBox').notNullable();
      table.date('dtTillMax').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());

      // Добавление уникальности на комбинацию warehouseName и date
      table.unique(['warehouseName', 'date']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tariffs');
};

`
5. Запускаем команду: `npm start`, которая применяет миграцию, далее создает js файлы, а потом выполняет код
6. Запускаем команду: `docker-compose up --build`
7. Ниже приведены команды для докера при необходимости

docker-compose build - сборка компонентов
docker-compose up -d db - запуск компонента с бд
docker-compose run app npx knex migrate:latest --knexfile knexfile.js - миграция бд
docker-compose up  - запуск всех компонентов с логом
docker-compose down - завершение компонентов
docker-compose logs -f db или app - для вывода логов
docker volume ls - проверка значений
docker ps -a - проверка контейнеров
docker rm - удаление


docker stop $(docker ps -q) - остановить все контейнеры
docker rm $(docker ps -a -q) - удалить все контейнеры
docker volume prune - удалить все значения









