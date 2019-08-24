const db = require('../utils/DB');
const chalk = require('chalk')
const { shopperPosition } = require('./TableNames');

const ShoppersPositionRepository = module.exports;

// To complete
ShoppersPositionRepository.get = async (data) => {
    const  {shopperId, date} = data 
    let res = 0
        try {
            const timeConnectDay = await db.select('timeConnectDay').from(shopperPosition).where({date: date, shopperId:  shopperId}) 
            if (timeConnectDay.length > 0) {res = timeConnectDay[0].timeConnectDay} else {res = null}
            console.log(`${chalk.green('[sql-get]')} `,res)
            return res 
        } catch (error) {
            console.log('error',error);
            throw Error
        }
};
ShoppersPositionRepository.update = async (data) => {
    const  {shopperId, date, timeConnectDay} = data 
        try {
            const res = await db(shopperPosition).where({shopperId:shopperId,date:date}).update({timeConnectDay:timeConnectDay}) 
            console.log(`${chalk.green('[sql-update]')}`,res)
            return res 
        } catch (error) {
            console.log('error',error);
            throw Error
        }
};
ShoppersPositionRepository.insert = async (data) => {
        try {
            const res = await db.insert(data).returning('*').into(shopperPosition)  
            console.log(`${chalk.green('[sql-insert]')}`,res)
            return res 
        } catch (error) {
            console.log('error',error);
            throw Error
        }
};
