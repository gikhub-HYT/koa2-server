const Schema = require("../../db/schema");
exports.loginSchema = new Schema(
  {
    title: {
      type: String
    },
    content: { type: String }
  },
  { collection: "articles" }
);
