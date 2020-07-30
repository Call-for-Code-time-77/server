const mongoose = require("mongoose");
const passporLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "O nome é obrigatório"
  },
  email: {
    type: String,
    trim: true,
    required: "O email é obrigatório"
  }
});

userSchema.plugin(passporLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
