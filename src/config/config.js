const dontenv = require('dotenv');

dontenv.config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
  port: process.env.PORT
};
