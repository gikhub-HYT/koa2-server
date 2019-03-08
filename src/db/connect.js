const mongoose = require("mongoose");
const config = require("./dbConfig");

exports.start = success => {
  const url = config.host + config.database;
  mongoose.connect(url, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    if (success && typeof success === "function") {
      success();
    }
  });
};
