const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;
const watsonSchema = new mongoose.Schema({
  data: {
    type: Array
  },
  post: {
    type: ObjectId,
    ref: "Post"
  },
  author: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Watson", watsonSchema);
