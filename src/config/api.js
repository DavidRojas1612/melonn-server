const { create } = require('apisauce');
const configEnv = require('./config');

const api = create({
  baseURL: configEnv.baseUrl,
  headers: {
    ['x-api-key']: configEnv.apiKey
  },
  timeout: 15000
});

module.exports = api;
