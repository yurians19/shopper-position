const AsyncSave = require('../../src/asyncSave/AsyncSave');

const AsyncSaveMocks = module.exports;

AsyncSaveMocks.send = (key, data) => {
  AsyncSave.receive(data);
};
