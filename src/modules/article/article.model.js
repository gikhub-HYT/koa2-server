const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema({}, { collection: "article" });
module.exports = mongoose.model("article", articleSchema);
