/*
 * @Author: yongtian.hong
 * @Date: 2019-01-29 22:32:25
 * @LastEditors: yongtian.hong
 * @LastEditTime: 2019-01-29 22:35:56
 * @Description: 内存数据库
 */
const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis();
  }

  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(
        `SESSION:${sid}`,
        JSON.stringify(session),
        "EX",
        maxAge / 1000
      );
    } catch (e) {}
    return sid;
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}

module.exports = RedisStore;
