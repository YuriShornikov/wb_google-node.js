import 'dotenv/config';
import knex from 'knex';
import knexfile from './knexfile.cjs';

const db = knex(knexfile.development);

db.migrate.latest()
  .then(() => {
    console.log('Migrations are complete');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error running migrations:', err);
    process.exit(1);
  });
