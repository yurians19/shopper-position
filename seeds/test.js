const { shopperPosition } = require('../src/repositories/TableNames');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(shopperPosition).del()
    .then(function () {
      // Inserts seed entries
      return knex(shopperPosition).insert([
        { shopperId: 1,lat: 36363646,lng: 51335456,date: '2019-08-11',timeConnectDay: 1200 },
        { shopperId: 2,lat: 6584364,lng: 3436843438,date: '2019-08-12',timeConnectDay: 3340 },
        { shopperId: 3,lat: 3666516,lng: 63546516,date: '2019-08-13',timeConnectDay: 4550 },
        { shopperId: 4,lat: 13561651,lng: 36484646,date: '2019-08-14',timeConnectDay: 45550 },
        { shopperId: 5,lat: 13561651,lng: 36484646,date: '2019-08-15',timeConnectDay: 454540 },
        { shopperId: 6,lat: 13561651,lng: 36484646,date: '2019-08-16',timeConnectDay: 233320 },
        { shopperId: 7,lat: 13561651,lng: 36484646,date: '2019-08-17',timeConnectDay: 230 },
        { shopperId: 8,lat: 13561651,lng: 3436843438,date: '2019-08-18',timeConnectDay: 10 },
        { shopperId: 9,lat: 13561651,lng: 3436843438,date: '2019-08-19',timeConnectDay: 560 },
        { shopperId: 10,lat: 13561651,lng: 3436843438,date: '2019-08-21',timeConnectDay: 770 },
        { shopperId: 12,lat: 13561651,lng: 3436843438,date: '2019-08-23',timeConnectDay: 5550 },
        { shopperId: 11,lat: 13561651,lng: 3436843438,date: '2019-08-22',timeConnectDay: 5550 },
        { shopperId: 1,lat: 13561651,lng: 3436843438,date: '2019-08-22',timeConnectDay: 5550 },
        { shopperId: 15,lat: 13561651,lng: 3436843438,date: '2019-08-22',timeConnectDay: 5550 },
      ]);
    });
};
