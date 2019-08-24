const AsyncSave = module.exports;

const ShoppersPositionRepository = require('../repositories/ShoppersPositionRepository');

// To complete
// The send of the async function

AsyncSave.send = async (/* key, */ data) => {
    try {
      const res = await ShoppersPositionRepository.get(data)
      return res
    } catch (error) {
      console.log('error',error);
      throw Error
    }
};

AsyncSave.update = async (/* key, */ data) => {
    try {
      const res = await ShoppersPositionRepository.update(data)
      return res
    } catch (error) {
      console.log('error',error);
      throw Error
    }
};
// To complete
// The receive of the async function
AsyncSave.receive = async (data) => {
    try {
      const insert = await ShoppersPositionRepository.insert(data)
      return insert
    } catch (error) {
      throw Error
    }
};
