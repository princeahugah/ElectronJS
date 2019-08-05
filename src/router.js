const uuidv1 = require('uuid/v1');

module.exports = (() => {
  const users = [{
    email: 'prince.ahugah@outlook.com',
    password: 'Admin123',
  }, {
    email: 'nikita.kudinov@intertempi.com',
    password: 'N1k1t@',
  }];

  const tokens = [];

  const getCredentials = (auth, scheme) => {
    if (scheme === 'Basic') {
      const credentials = auth.replace(/^Basic\s+/, '').split(':');
      return {
        email: credentials[0],
        password: credentials[1],
      };
    } else if (scheme === 'Bearer') {
      return auth.replace(/^Bearer\s+/, '');
    }
    return {};
  };

  const Api = {
    'users/auth': ({
      headers,
    } = {
      headers: {
        authorization: '',
      },
    }) => {
      const auth = getCredentials(headers.authorization, 'Basic');

      if (users.some((user) => user.email === auth.email &&
          user.password === auth.password)) {
        const token = uuidv1();
        tokens.push(token);

        return {
          code: 'SUCCESS',
          token,
        };
      }

      return {
        code: 'WRONG_COMBINATION',
      };
    },
  };

  return {
    execute: (path, data) => Api[path] && Api[path].call(Api, data),
  };
})();
