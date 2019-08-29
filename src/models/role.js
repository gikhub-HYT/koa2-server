
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;
  const roleSchema = new Schema({},{ collection: "role"});
  module.exports = mongoose.model("role", roleSchema);
  