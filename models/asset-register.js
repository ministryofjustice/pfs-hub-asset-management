const dbQuery = require('../dbQuery');
 
// create the Article model, it will include all of the attributes of the table.
// the hasTimestamps: true command will automatically populate the created_at and updated_at columns
const assetRegister = dbQuery.Model.extend({
  tableName: 'moj_asset_register',
  hasTimestamps: true
});
 
module.exports = assetRegister;