import 'dotenv/config';

/**
 * Настройки подключения к бд на основе knexfile.
 * 
 * @typedef {Object} KnexConfig
 * @property {string} client - Тип бд, 'pg' для PostgreSQL.
 * @property {Object} connection - Параметры подключения.
 * @property {string} connection.host - Хост бд.
 * @property {string} connection.user - Имя пользователя.
 * @property {string} connection.password - Пароль пользователя.
 * @property {string} connection.database - Имя бд.
 * @property {number} connection.port - Порт бд.
 * @property {Object} migrations - Настройки миграций.
 * @property {string} migrations.directory - Путь к папке с миграциями.
 * @property {Object} pool - Настройки пула соединений.
 * @property {number} pool.min - Минимальное количество соединений.
 * @property {number} pool.max - Максимальное количество соединений.
 */

const knexfile = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    },
    migrations: {
      directory: './migrations',
    },
    pool: {
      min: 2,
      max: 20,
    },
  }
};

export default knexfile;