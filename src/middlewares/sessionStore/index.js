const session = require("koa-session");

const store = {
  storage: {},
  get(key, maxAge) {
    return this.storage[key];
  },
  set(key, sess, maxAge) {
    this.storage[key] = sess;
  },
  destroy(key) {
    delete this.storage[key];
  }
};

const config = {
  key: "qsToken",
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  store
};

const sessionStore = function(app) {
  app.keys = ["qsToken"];
  return session(config, app);
};

module.exports = sessionStore;
