const Redis = require("ioredis");
const pub = new Redis();

module.exports = {
  redis: Redis,
  redisPub: pub
};
