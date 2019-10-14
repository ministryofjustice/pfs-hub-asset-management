require('dotenv').config()

module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'postgres',
        user:     'postgres',
        password: 'asset'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'digital_prison_assets'
      }
    },
   
    production: {
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'postgres',
        user:     'postgres',
        password: 'asset'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'digital_prison_assets'
      }
    },
  };
   
