exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo', function(table) {
      table.increments();
      table.string('title').notNullable();
      table
        .boolean('is_done')
        .notNullable()
        .defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('todo')]);
};
