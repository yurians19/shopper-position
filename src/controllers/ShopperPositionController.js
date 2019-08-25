const ShopperPositionController = module.exports;

const ShopperPositionService = require('../services/ShopperPositionService');
const { validationResult } = require('express-validator');

// To complete
/**
 * @api {POST} /api/shoppers/position insert shoppers position
 * @apiName ShoppersPosition
 * @apiGroup Shoppers
 * @apiDescription insert shoppers position
 *
 * @apiParam (body) {number} lat the lat position
 * @apiParam (body) {number} lng the lng position
 * @apiParam (params) {number} shopper_id the id of the shopper
 *
 * @apiSuccessExample Success Response:
 * HTTP/1.1 200
 * { lat: 234234.6, 1: false, 2: false, 3: false, 4: true }
 *
 * @apiError (400) {null} Error if object param is invalid
 * @apiError (500) {Object} Error on internal runtime, should return nothing.
 */

ShopperPositionController.insert = async (req, res) => {
      const { params: { shopperId } = {}, body } = req;
      const {lat, lng} = body;
      const errors = validationResult(req)
      if(Number.isInteger(lat) || Number.isInteger(lng)){
      console.log(!Number.isInteger(lng));
        res.status(400).send({message:'error'})
        }
      else{
          if (!errors.isEmpty()) {
            codeErr = 400
            errors.array().forEach(element => {
                if (element.location !== 'body') codeErr = 404
              });
              res.status(codeErr).send({message:'error'})

          }  else {
              
              try {
                const shopperPositionService = await ShopperPositionService.newPosition(shopperId, body)
                if (shopperPositionService)
                  res.status(200).send({message:shopperPositionService})
                else 
                  res.status(404).send({message:'Not insert'})
              } catch (error) {
                console.log('error',error);
                res.status(500).send({message:'error internal'})
                throw Error
              }
            }
      }
};
