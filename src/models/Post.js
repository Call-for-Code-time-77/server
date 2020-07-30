const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "O post precisa de um titulo"
  },
  body: {
    type: String,
    trim: true
  },
  add_at: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Post", postSchema);
