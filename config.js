const { env } = process;
const {
  TIMEZONE = 'America/Bogota',
  COUNTRY,
  DB_CONNECTION = { host: 'localhost', 
                    database: 'shopper-position-db',
                    user : 'postgres',
                    password : '12345'},
  CONNECTION_POOL_SIZE,
} = env;

module.exports = {
  TIMEZONE,
  COUNTRY,
  DB_CONNECTION,
  databaseConfig: {
    client: 'pg',
    connection: DB_CONNECTION,
    pool: {
      min: 1,
      max: parseInt(CONNECTION_POOL_SIZE, 10) || 5,
    },
    acquireConnectionTimeout: 5000,
  },
};
