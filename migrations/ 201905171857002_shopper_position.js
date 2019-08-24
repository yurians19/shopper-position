const { shopperPosition } = require('../src/repositories/TableNames');

exports.up = knex => knex.schema.createTable(shopperPosition, (table) => {
  // To complete
      table.increments().primary()
      table.bigInteger('shopperId').notNullable()
      table.bigInteger('lat').notNullable()
      table.bigInteger('lng').notNullable()
      table.string('date')/* .unique() */.notNullable()
      table.bigInteger('timeConnectDay').defaultTo(0)
});

exports.down = knex => knex.schema.dropTable(shopperPosition);
