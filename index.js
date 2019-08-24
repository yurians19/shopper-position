const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();

// Conexion con redisDB
require('./src/utils/redis-db').initRedisDB

app.use(bodyParser.json({ limit: '1mb' }));
app.use('/api/shoppers', routes);

app.listen(8000, () => {
    console.log('Server is running');
});
  

module.exports = app;
