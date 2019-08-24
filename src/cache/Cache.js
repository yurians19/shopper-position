const Cache = module.exports;
const redisClient = require('../utils/redis-db').redisClient
const { promisify } = require('util')
const chalk = require('chalk')
// To complete
// The function to save on cache the data, with the given key
Cache.save = async (key, data) => {
    const getAsync = promisify(redisClient.hmset).bind(redisClient)
    const res = await getAsync(key,data)
    console.log(`${chalk.green('[cache-save]')}`,res)
    return res
};

// To complete
// The function to delete from cache the data with the given key
Cache.delete = async (key) => {
    const getAsync = promisify(redisClient.del).bind(redisClient)
    const res = await getAsync(key)
    console.log(`${chalk.green('[cache-delete]')}`,res)
    return res
};

// To complete
// The function to get from cache the data with the given key
Cache.get = async (key) => {
  const getAsync = promisify(redisClient.hgetall).bind(redisClient)
    const res = await getAsync(key)
    console.log(`${chalk.green('[cache-get]')}`,res)
    return res
};
