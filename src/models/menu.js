
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema({
  path: {
    type: String,
    required: true
  },

  menuCode: {
    type: String,
    required: true
  },

  parentId: {
    type: Number,
    required:true,
  },

  children: {
    type: Array,
    required: true
  },



}, { collection: "menu" });
module.exports = mongoose.model("menu", menuSchema);
