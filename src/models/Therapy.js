const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;
const therapySchema = new mongoose.Schema({
  patient: {
    type: ObjectId,
    ref: "User"
  },
  psychologist: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Therapy", therapySchema);
