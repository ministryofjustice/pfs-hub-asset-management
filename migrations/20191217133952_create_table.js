exports.up = function(knex) {
    return knex.schema.createTable("digital_hub_laptop_asset_register", function(table) {
      table.increments("id").primary();
      table.text("model");
      table.text("make");
      table.text("serial_number").unique();
      table.text("asset_number").unique();
      table.text("asset_status");
      table.text("build");
      table.text("nomis_id").unique();
      table.timestamps();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("digital_hub_laptop_asset_register");
  };
  
