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
