const ShopperPositionService = module.exports;

const Cache = require('../cache/Cache');
const AsyncSave = require('../asyncSave/AsyncSave');

const moment = require('moment')


ShopperPositionService.newPosition = async (shopperId, body) => {
      const date = moment().format("YYYY-MM-DD"/*  '2019-08-22' */)
      const timeCurrent = moment(/* "2019-08-22T00:30:10.307" */)
      let res = 'ok'
      const { lat, lng } = body
      const dataCache = {/* date:'2019-08-21', */date, shopperId, lat, lng , timeIni: timeCurrent.toString(), timeFin: timeCurrent.toString()}
      const dataSQL = {shopperId, lat, lng, timeConnectDay: 0, date}
      try {
        const cacheGet =  await Cache.get(shopperId)
        if (cacheGet) {

          const { timeIni, timeFin, date: dateget } = cacheGet
          const _timeIni = moment(/* new Date(timeIni) */ /* "2019-08-22T17:35:50.307" */)
          const _timeFin = moment(/* new Date(timeFin) */ /* "2019-08-22T23:59:50.307" */)
          const timeNoConnect = timeCurrent.diff(_timeFin, 'seconds')
          console.log('dateget',dateget,cacheGet,_timeIni,_timeFin);
          if (date!==dateget) dataSQL.date = dateget

          if ( timeNoConnect >= 120) {

            console.log('existe en cache y el tiempo sin conexion es mayor a 1 minutos');
            await saveOldTime(shopperId,dataCache,dataSQL,_timeIni,_timeFin)

          }else{
            console.log('existe en cache y el tiempo sin conexion es menor a -1 minutos');

            const cacheSave = await Cache.save(shopperId,{/* date:'2019-08-21', */timeFin: timeCurrent.toString(), lat, lng})
            if (date!==dateget) await saveOldTime(shopperId,dataCache,dataSQL,_timeIni,_timeFin)

          }

        } else {
          console.log(' NOO existe en cache y pero si en SQL');
          const cacheSave = await Cache.save(shopperId,dataCache)
          const timeConnectDay = await AsyncSave.send(dataSQL)
          if (!timeConnectDay) {
            
            console.log(' NOO existe en cache y y tampoco en SQL');
            const asyncSave = await AsyncSave.receive(dataSQL)

          }
        }
        return res

      } catch (error) {
        console.log('error',error);
        throw Error
      }
    };

const saveOldTime = async (shopperId,dataCache,dataSQL,_timeIni,_timeFin) => {
    try {
            const cacheSave = await Cache.save(shopperId,dataCache)
            const timeConnectDay = await AsyncSave.send(dataSQL)
            dataSQL.timeConnectDay = Number(timeConnectDay) + Number(_timeFin.diff(_timeIni, 'seconds'))
            console.log(shopperId,dataCache,dataSQL,_timeIni,_timeFin,timeConnectDay);
            
            const asyncSave = await AsyncSave.update(dataSQL)
    } catch (error) {
      throw Error
    }
}

/* casos posibles para acumular tiempo de conexion y guardar su ultima ubicacion del shopper:
1- Si el shopper envia su ubicacion solo una ves dentro del rango de 2min la sumatoria del timeConnectDay sera de 0
2- A partir de la segunda ves que el shopper envia su ubicacion dentro del rango de los 120s solo actualizara su lat,lng y timeFin en cache 
y mientras se repita este evento, se iran actualizando los nuevos dantos entrantes de las posteriores request.
3- Si el shopper envia su ubicacion una ves mas de 120s segundos tarde de su ultimo request  el sistema hace una especie 
de cierre de cache tomando su timeIni y su timeFin para calcular cuanto tiempo estuvo conectado y sumarlo al tiempo 
que esta en la base de datos de ese dia para acumularlo.
4-  Cumplido el final del dia en sistema calcula el tiempo acumulado en cache y lo guarda en base de datos incluyendo
su ultima ubicacion recibida en el mismo registro del dia anterior, esto con el fin de hacer  conteos distintos por dias.
5- En caso de que el shopper manenga la conexion entre un dia y otro, el sistema detecta la hora final del dia
haciendo un cierre del tiempo de conexion del dia anterior y almacenandolo en base de datos.

6- Como podemos notar la gestion del micro servicio hasta el momento es basicamente gestionar la data entre cache(intermediario)
 y base de datos, todo esto en funcion a las solicitudes de los shopper, orientado a la no saturacion del cache
y evitar la mayor cantidad de iteracion de operaciones de base de datos, a menos que esta sea necesaria.
Si bien podemos fijarnos en que podrian existir shopper resagados que no hagan solicitudes durante un tiempo
y mantenerse su data en cache, para esto se recomienda crear un servicio adicional que haga 
seguimiento constante a esta base de datos que actue como depurador, tomando esta data para guardarla en 
base de datos y posteriormente liberar el cache. No ha sido implementado ya que no esteria dentro del
alcance de la prueba.
*/
