const router = require('../src/router');
const chai = require('chai');
const assert = chai.assert;

describe('Router', () => {
  describe('/users/auth', () => {
    let headers;
    let fakeHeaders;

    beforeEach(() => {
      headers = {
        authorization: 'Basic prince.ahugah@outlook.com:Admin123',
      };
      fakeHeaders = {
        authorization: 'Basic hello@example.com:Example1',
      };
    });

    it('should fail when a request is sent without headers', () => {
      const response = router.execute('users/auth');

      assert.isObject(response);
      assert.deepEqual(response.code, 'WRONG_COMBINATION');
    });

    it('should fail when a request is sent fake authentication details', () => {
      const response = router.execute('users/auth', {
        headers: fakeHeaders,
      });

      assert.isObject(response);
      assert.deepEqual(response.code, 'WRONG_COMBINATION');
    });

    it(`should be successful when a request is sent with the correct
      authentication details`, () => {
      const response = router.execute('users/auth', {
        headers,
      });

      assert.isObject(response);
      assert.property(response, 'token');
      assert.deepEqual(response.code, 'SUCCESS');
    });
  });
});