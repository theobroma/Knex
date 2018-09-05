exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo', function(table) {
      table.increments();
      table.string('text').notNullable();
      table
        .boolean('completed')
        .notNullable()
        .defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('todo')]);
};
