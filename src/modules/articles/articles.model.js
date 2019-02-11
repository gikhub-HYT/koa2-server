const Schema = require("../../db/schema");
const articleSchema = new Schema(
  {
    title: {
      type: String
    },
    content: { type: String }
  },
  { collection: "articles" }
);

module.exports = articleSchema;
