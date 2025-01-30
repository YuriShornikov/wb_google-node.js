import knexfile from '../../knexfile.js';
import knex from 'knex';

/**
 * Создает подключение к бд с использованием настроек из knexfile.
 * 
 * @type {Knex}
 */

export const db = knex(knexfile.development);

