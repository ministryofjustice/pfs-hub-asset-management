// Set up knex using the config file for the environment
var knex = require('knex')(require('./knexfile')[process.env.NODE_ENV])
 
// set up database query tool bookshelf using the knex setup we created above
var dbQuery = require('bookshelf')(knex)
 
// make sure bookshelf is available when importing this file
module.exports = dbQuery