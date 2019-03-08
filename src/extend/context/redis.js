const Redis = require("ioredis");
const redis = new Redis();
const pub = new Redis();

module.exports = {
  redis: redis,
  redisPub: pub
};
