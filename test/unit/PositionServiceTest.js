const sandbox = require('sinon').createSandbox();
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../../index');

const PositionServiceData = require('./PositionServiceData');
const Cache = require('../../src/cache/Cache');
const CacheMocks = require('../mocks/CacheMocks');
const AsyncSave = require('../../src/asyncSave/AsyncSave');
const AsyncSaveMocks = require('../mocks/AsyncSaveMocks');
const ShoppersPositionRepository = require('../../src/repositories/ShoppersPositionRepository');
const ShoppersPositionRepositoryMocks = require('../mocks/ShoppersPositionRepositoryMocks');

chai.use(chaiHttp);

const API = '/api/shoppers';

describe('test', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('healthcheck', () => {
    it('success', () => chai.request(app)
      .get(`${API}/health-check`)
      .then(({ status }) => {
        assert.deepEqual(status, 200);
      }));
  });

  describe('error handler', () => {
    it('404', () => chai.request(app)
      .post(`${API}/position/${PositionServiceData.shopperIdError}`)
      .send(PositionServiceData.data0)
      .set('authorization', 'test')
      .then(() => assert.fail('Error'))
      .catch(({ status }) => {
        assert.deepEqual(status, 404);
      }));

    it('400 empty body', () => chai.request(app)
      .post(`${API}/position/${PositionServiceData.shopperId0}`)
      .send(PositionServiceData.emptyData)
      .set('authorization', 'test')
      .then(() => assert.fail('Error'))
      .catch(({ status }) => {
        assert.deepEqual(status, 400);
      }));

    it('400 body error', () => chai.request(app)
      .post(`${API}/position/${PositionServiceData.shopperId0}`)
      .send(PositionServiceData.invalidData)
      .set('authorization', 'test')
      .then(() => assert.fail('Error'))
      .catch(({ status }) => {
        assert.deepEqual(status, 400);
      }));
  });

  describe('endpoint', () => {
    beforeEach(() => {
      CacheMocks.cache = {};
      sandbox.stub(Cache, 'save').callsFake(CacheMocks.save);
      sandbox.stub(Cache, 'delete').callsFake(CacheMocks.delete);
      sandbox.stub(Cache, 'get').callsFake(CacheMocks.get);
      sandbox.stub(AsyncSave, 'send').callsFake(AsyncSaveMocks.send);
      sandbox.stub(ShoppersPositionRepository, 'insert')
        .callsFake(ShoppersPositionRepositoryMocks.insert);
    });

    it('200', () => chai.request(app)
      .post(`${API}/position/${PositionServiceData.shopperId0}`)
      .send(PositionServiceData.data0)
      .set('authorization', 'test')
      .then(({ status }) => {
        assert.deepEqual(status, 200);
        const req0 = ShoppersPositionRepository.insert.getCall(0);

        assert.deepEqual(!req0, false);
      }));

    it('cache', async () => {
      await chai.request(app)
        .post(`${API}/position/${PositionServiceData.shopperId0}`)
        .send(PositionServiceData.data0)
        .set('authorization', 'test')
        .then(({ status }) => {
          assert.deepEqual(status, 200);
        });

      await chai.request(app)
        .post(`${API}/position/${PositionServiceData.shopperId0}`)
        .send(PositionServiceData.data0)
        .set('authorization', 'test')
        .then(({ status }) => {
          assert.deepEqual(status, 200);
        });

      await chai.request(app)
        .post(`${API}/position/${PositionServiceData.shopperId0}`)
        .send(PositionServiceData.data0)
        .set('authorization', 'test')
        .then(({ status }) => {
          assert.deepEqual(status, 200);
        });

      const req0 = ShoppersPositionRepository.insert.getCall(0);
      const req1 = ShoppersPositionRepository.insert.getCall(1);
      const req2 = ShoppersPositionRepository.insert.getCall(2);

      assert.deepEqual(!req0, false);
      assert.deepEqual(!req1, true);
      assert.deepEqual(!req2, true);
    });

    it('async save', async () => {
      await chai.request(app)
        .post(`${API}/position/${PositionServiceData.shopperId0}`)
        .send(PositionServiceData.data0)
        .set('authorization', 'test')
        .then(({ status }) => {
          assert.deepEqual(status, 200);
        });

      const req0 = AsyncSave.send.getCall(0);

      return assert.deepEqual(!req0, false);
    });
  });
});
