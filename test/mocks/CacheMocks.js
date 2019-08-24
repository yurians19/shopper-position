const CacheMocks = module.exports;

CacheMocks.cache = {};
CacheMocks.save = (key, data) => {
  CacheMocks.cache[key] = data;
};
CacheMocks.delete = (key) => {
  CacheMocks.cache[key] = undefined;
};
CacheMocks.get = key => CacheMocks.cache[key];
