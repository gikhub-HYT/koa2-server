const mongoose = require("mongoose");

exports.start = success => {
  mongoose.connect("mongodb://localhost/blog", { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    // we're connected!
    console.log("connected db: blog");

    if (success && typeof success === "function") {
      success();
    }
  });
};
