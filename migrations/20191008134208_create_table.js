exports.up = function(knex) {
  return knex.schema.createTable("moj_asset_register", function(table) {
    table.increments("id").primary();
    table.integer("remote_id").unique();
    table.text("model");
    table.text("make");
    table.text("serial_number").unique();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("moj_asset_register");
};
